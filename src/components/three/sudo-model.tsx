"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useFaceTexture } from "@/lib/sudo/use-face-texture";
import type { Mood } from "@/lib/sudo/face-engine";

const MODEL_URL = "/sudo.glb";

// face plane on the screen panel (screen-local space)
const SCREEN_CENTER = new THREE.Vector3(3.5, 0.2, -2.5);
const SCREEN_W = 8.4;
const SCREEN_H = 6.4;
const FACE_INSET = 0.9;
const FACE_LIFT = 0.08;
const FACE_SIDE = -1;
const FLIP_X = false;
const FLIP_Y = false;

// head follow
const HEAD_YAW = 0.45;
const HEAD_PITCH = 0.25;
const YAW_SIGN = -1;
const PITCH_SIGN = 1;
const HEAD_DELAY = 0.13;
const FOLLOW_EASE = 2.6;
const IDLE_AFTER = 2.2;
const IDLE_SWAY_SPEED = 0.7;
// where the head pivots: 0 = bottom of the head (neck joint), 0.5 = center.
const PIVOT_HEIGHT = 0.12;

// model orientation + fit
const MODEL_YAW = Math.PI;
const TARGET_HEIGHT = 3.0;
const MODEL_LIFT = 0.1;

const CREAM_PLASTIC = new THREE.Color("#e6dcc8");

useGLTF.preload(MODEL_URL);

/**
 * Find an object by name, tolerant of loader name-mangling.
 * three-stdlib's GLTFLoader rewrites whitespace to underscores, so
 * "head before iteration" becomes "head_before_iteration". Normalize both
 * sides (spaces/underscores, case) before comparing.
 */
function findByName(root: THREE.Object3D, name: string): THREE.Object3D | null {
  const norm = (s: string) => s.replace(/[\s_]+/g, " ").trim().toLowerCase();
  const target = norm(name);
  let found: THREE.Object3D | null = null;
  root.traverse((o) => {
    if (!found && norm(o.name) === target) found = o;
  });
  return found;
}

type Sample = { t: number; x: number; y: number };

type SudoModelProps = {
  scale?: number;
  /** when set, drives the face engine mood (curious, smug, etc.) */
  mood?: Mood;
};

export default function SudoModel({ scale = 1, mood }: SudoModelProps) {
  const { scene } = useGLTF(MODEL_URL);
  const { texture, face } = useFaceTexture();

  const model = useMemo(() => scene.clone(true), [scene]);

  // Per-instance material tuning. The GLB's cream/white plastics are very
  // bright; with product lighting they blow out. Clone materials so we can
  // lower env response and warm/darken plastics without mutating the cached GLB.
  useEffect(() => {
    const tuneMaterial = (material: THREE.Material) => {
      const mat = material.clone();
      if (
        mat instanceof THREE.MeshStandardMaterial ||
        mat instanceof THREE.MeshPhysicalMaterial
      ) {
        mat.envMapIntensity = 0.22;
        mat.roughness = Math.max(mat.roughness ?? 0.55, 0.72);

        const name = mat.name.toLowerCase();
        if (
          name.includes("nylon") ||
          name.includes("aluminum_nitride") ||
          name.includes("aln")
        ) {
          mat.color.lerp(CREAM_PLASTIC, 0.5);
        }

        if (name.includes("glass")) {
          mat.envMapIntensity = 0.08;
          mat.roughness = Math.max(mat.roughness ?? 0.35, 0.48);
        }
      }
      return mat;
    };

    model.traverse((o) => {
      const m = o as THREE.Mesh;
      if (m.isMesh) {
        m.castShadow = true;
        m.receiveShadow = true;
        m.material = Array.isArray(m.material)
          ? m.material.map(tuneMaterial)
          : tuneMaterial(m.material);
      }
    });
  }, [model]);

  const fit = useMemo(() => {
    const box = new THREE.Box3().setFromObject(model);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    const s = TARGET_HEIGHT / (size.y || 1);
    return {
      s,
      offset: new THREE.Vector3(
        -center.x * s,
        -center.y * s + MODEL_LIFT,
        -center.z * s,
      ),
    };
  }, [model]);

  // grab head + screen and rotate them about a chosen pivot (the GLB node
  // origin sits at the head's bottom corner, so rotating the node in place
  // swings the head wrongly). We rotate about the head's bottom-center instead.
  const headRef = useRef<THREE.Object3D | null>(null);
  const screenRef = useRef<THREE.Object3D | null>(null);
  const headBase = useRef({
    pos: new THREE.Vector3(),
    quat: new THREE.Quaternion(),
  });
  const screenBase = useRef({
    pos: new THREE.Vector3(),
    quat: new THREE.Quaternion(),
  });
  const pivot = useRef<THREE.Vector3 | null>(null); // in the nodes' parent space

  useEffect(() => {
    const head = findByName(model, "head before iteration");
    const screen = findByName(model, "face_screen");
    if (!head || !screen) {
      console.warn(
        "[SudoModel] could not find head/screen nodes. Available names:",
        (() => {
          const names: string[] = [];
          model.traverse((o) => o.name && names.push(o.name));
          return names;
        })(),
      );
      return;
    }

    headRef.current = head;
    screenRef.current = screen;

    // remember the rest transform of both nodes (they share it)
    headBase.current.pos.copy(head.position);
    headBase.current.quat.copy(head.quaternion);
    screenBase.current.pos.copy(screen.position);
    screenBase.current.quat.copy(screen.quaternion);
    pivot.current = null; // recomputed on the first frame (needs world matrices)

    // mount the face plane on the screen
    if (FLIP_X || FLIP_Y) {
      texture.center.set(0.5, 0.5);
      texture.repeat.set(FLIP_X ? -1 : 1, FLIP_Y ? -1 : 1);
    }
    const geo = new THREE.PlaneGeometry(SCREEN_W * FACE_INSET, SCREEN_H * FACE_INSET);
    const mat = new THREE.MeshBasicMaterial({
      map: texture,
      toneMapped: false,
      side: THREE.DoubleSide,
      depthTest: false,
      depthWrite: false,
    });
    const facePlane = new THREE.Mesh(geo, mat);
    facePlane.name = "sudo_face_plane";
    facePlane.rotation.x = -Math.PI / 2;
    facePlane.position.set(
      SCREEN_CENTER.x,
      SCREEN_CENTER.y + FACE_SIDE * FACE_LIFT,
      SCREEN_CENTER.z,
    );
    facePlane.renderOrder = 2;
    screen.add(facePlane);

    return () => {
      screen.remove(facePlane);
      geo.dispose();
      mat.dispose();
    };
  }, [model, texture]);

  // --- external mood control (from MeetSudo fact cards) ----------------
  useEffect(() => {
    if (mood) face.setMood(mood);
  }, [mood, face]);

  // --- cursor tracking with delayed follow -------------------------------
  const history = useRef<Sample[]>([]);
  const lastInputTime = useRef(-10);
  const cur = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (clientX: number, clientY: number) => {
      const nx = (clientX / window.innerWidth) * 2 - 1;
      const ny = (clientY / window.innerHeight) * 2 - 1;
      const t = performance.now() / 1000;
      history.current.push({ t, x: nx, y: ny });
      lastInputTime.current = t;
      face.lookAt(nx, ny, t);
    };
    const onPointer = (e: PointerEvent) => onMove(e.clientX, e.clientY);
    const onTouch = (e: TouchEvent) => {
      const tch = e.touches[0];
      if (tch) onMove(tch.clientX, tch.clientY);
    };
    window.addEventListener("pointermove", onPointer);
    window.addEventListener("touchmove", onTouch, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("touchmove", onTouch);
    };
  }, [face]);

  // reusable scratch objects for the pivot rotation
  const scratch = useMemo(
    () => ({
      delta: new THREE.Quaternion(),
      euler: new THREE.Euler(0, 0, 0, "YXZ"),
      box: new THREE.Box3(),
    }),
    [],
  );

  // --- animate: rotate head + screen about the neck pivot ----------------
  useFrame((st, dt) => {
    const head = headRef.current;
    const screen = screenRef.current;
    if (!head || !screen) return;

    // Use the same clock as pointer events. Pointer samples are stamped with
    // performance.now(), so comparing them to st.clock.elapsedTime freezes the
    // delayed lookup on the first sample.
    const now = performance.now() / 1000;
    const elapsed = st.clock.elapsedTime;

    // read delayed target
    const delayed = now - HEAD_DELAY;
    let tx = 0;
    let ty = 0;
    const h = history.current;
    if (h.length > 0) {
      let picked = h[h.length - 1];
      for (let i = h.length - 1; i >= 0; i--) {
        if (h[i].t <= delayed) {
          picked = h[i];
          break;
        }
        picked = h[i];
      }
      tx = picked.x;
      ty = picked.y;
      while (h.length > 0 && h[0].t < now - 1) h.shift();
    }

    // idle sway
    const idle = now - lastInputTime.current > IDLE_AFTER;
    if (idle) {
      tx = Math.sin(elapsed * IDLE_SWAY_SPEED) * 0.35;
      ty = Math.sin(elapsed * IDLE_SWAY_SPEED * 0.6) * 0.22;
    }

    // smooth toward target
    const e = Math.min(1, dt * FOLLOW_EASE);
    cur.current.x += (tx - cur.current.x) * e;
    cur.current.y += (ty - cur.current.y) * e;

    const yaw = YAW_SIGN * cur.current.x * HEAD_YAW;
    const pitch = PITCH_SIGN * cur.current.y * HEAD_PITCH;

    // compute the pivot once, from the head's rest-pose world bounding box.
    // (the GLB node origin is at the head's corner, so we pick a better pivot:
    //  bottom-center of the head = the neck joint.)
    if (!pivot.current && head.parent) {
      scratch.box.setFromObject(head);
      const worldPivot = new THREE.Vector3(
        (scratch.box.min.x + scratch.box.max.x) / 2,
        THREE.MathUtils.lerp(scratch.box.min.y, scratch.box.max.y, PIVOT_HEIGHT),
        (scratch.box.min.z + scratch.box.max.z) / 2,
      );
      head.parent.worldToLocal(worldPivot); // into the nodes' parent space
      pivot.current = worldPivot;
    }
    const p = pivot.current;
    if (!p) return;

    // delta rotation, then rotate each node ABOUT the pivot:
    //   pos  = p + R * (basePos - p)
    //   quat = R * baseQuat
    scratch.euler.set(pitch, yaw, 0);
    scratch.delta.setFromEuler(scratch.euler);

    head.position
      .copy(headBase.current.pos)
      .sub(p)
      .applyQuaternion(scratch.delta)
      .add(p);
    head.quaternion.copy(headBase.current.quat).premultiply(scratch.delta);

    screen.position
      .copy(screenBase.current.pos)
      .sub(p)
      .applyQuaternion(scratch.delta)
      .add(p);
    screen.quaternion.copy(screenBase.current.quat).premultiply(scratch.delta);
  });

  // --- render: mount the whole scene, no extraction ----------------------
  return (
    <group scale={scale} rotation={[0, MODEL_YAW, 0]}>
      <group position={fit.offset} scale={fit.s}>
        <primitive object={model} />
      </group>
    </group>
  );
}
