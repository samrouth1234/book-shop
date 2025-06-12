import { config } from "dotenv";
import { Config, defineConfig } from "drizzle-kit";

import { env } from "./src/env";

// Load environment variables from .env file
config({ path: ".env" });

export default defineConfig({
  // schema: "./src/db/schema/index.ts",
  schema: "./src/db/shema/index.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  migrations: {
    prefix: "timestamp",
    table: "__drizzle_migrations",
    schema: "public",
  },
}) satisfies Config;
