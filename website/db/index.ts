import { drizzle } from "drizzle-orm/d1";
import { getRuntimeEnv } from "../lib/runtime-env";
import * as schema from "./schema";

type D1Binding = Parameters<typeof drizzle>[0];

export async function getDb() {
  const env = await getRuntimeEnv();

  if (!env.DB) {
    throw new Error(
      "Database binding `DB` is unavailable. Configure a Cloudflare D1 binding for the Cloudflare runtime, or replace the order API database adapter before using these routes on Vercel."
    );
  }

  return drizzle(env.DB as D1Binding, { schema });
}
