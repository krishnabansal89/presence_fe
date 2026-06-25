"use server";

import { getDb } from "@/lib/db";

export async function submitEmail(
  email: string
): Promise<{ success: boolean; message: string }> {
  const trimmed = email.trim().toLowerCase();

  if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
    return { success: false, message: "That doesn't look like a valid email." };
  }

  const db = await getDb();
  const col = db.collection("waitlist");

  const existing = await col.findOne({ email: trimmed });
  if (existing) {
    return { success: true, message: "You're already on the early access list." };
  }

  await col.insertOne({ email: trimmed, createdAt: new Date() });

  return { success: true, message: "You're on the early access list." };
}
