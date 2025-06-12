import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    NODE_ENV: z
      .enum(["development", "production", "test"])
      .default("development"),
    DATABASE_URL: z.string(),
  },
  client: {
    NEXT_PUBLIC_BASE_DOMAIN: z.string(),
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_BASE_DOMAIN: process.env.NEXT_PUBLIC_BASE_DOMAIN,
    DATABASE_URL: process.env.DATABASE_URL,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION || !!process.env.CI,
});

/**
 *
 * @param { @t3-oss/env-nextjs }, is a small TypeScript library created by the T3 community (same folks behind the T3 Stack) to make safe, type-checked environment variable management easy in Next.js projects.
 * ✅ Validate your .env variables using Zod.
 * ✅ Ensure you never access a missing or malformed variable.
 * ✅ Cleanly separate server-only and client-exposed variables.
 * ✅ Avoid runtime bugs due to bad .env configs.
 *
 */

/**
 * 😍 What is Zod?
 * @param { Zod }, is a TypeScript-first schema validation library.
 * It lets you define the shape and type of data (objects, strings, arrays, etc.)
 * and then validate data at runtime — all with TypeScript type safety.
 *
 * 🧠 Why Use Zod?
 *
 * ✅ Type-safe	Automatically infers TypeScript types from schemas
 * ⚡ Fast	Lightweight and performant
 * 🔄 Runtime + compile-time	Validates at runtime + provides TS types at compile-time
 * 🧩 Composable	Easily build nested schemas and reusable validators
 */
