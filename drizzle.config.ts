import dotenv from "dotenv";
import type { Config } from "drizzle-kit";

// this file is for drizzle-kit, which is used to do our database migrations
dotenv.config({ path: "./.env.local" });

if (!process.env.POSTGRES_URL) {
  throw new Error("POSTGRES_URL must be defined in .env.local");
}

export default {
  schema: "./src/app/db/schema.ts",
  out: "./drizzle",
  //driver: "pg",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.POSTGRES_URL,
  },
} satisfies Config;
