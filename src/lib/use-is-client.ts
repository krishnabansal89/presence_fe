"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/**
 * Returns true only on the client, after hydration. Uses useSyncExternalStore
 * so it never triggers a hydration mismatch and never calls setState in an effect.
 */
export function useIsClient(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
}
