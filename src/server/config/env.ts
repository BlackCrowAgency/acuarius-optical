// src/server/config/env.ts
import { z } from "zod";

const EnvSchema = z.object({
  REVALIDATE_SECRET: z.string().min(1, "Set REVALIDATE_SECRET in your env"),
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
});

export const env = EnvSchema.parse({
  REVALIDATE_SECRET: process.env.REVALIDATE_SECRET,
  NODE_ENV: process.env.NODE_ENV,
});

export const REVALIDATE_SECRET = env.REVALIDATE_SECRET;
export const IS_PROD = env.NODE_ENV === "production";

/** Lanza error si el secreto no coincide (útil en rutas /api/revalidate) */
export function assertRevalidateSecret(secret: string | null | undefined) {
  if (secret !== REVALIDATE_SECRET) throw new Error("Invalid revalidation secret");
}
