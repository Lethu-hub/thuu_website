import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";
let database: ReturnType<typeof drizzle<typeof schema>> | undefined;
/** The only database integration. Any standard PostgreSQL URL works here. */
export function db() {
  if (!database) {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) throw new Error("DATABASE_URL is required. Add it to Vercel or .env.local before running the app.");
    const client = postgres(connectionString, { max: 5, prepare: false });
    database = drizzle(client, { schema });
  }
  return database;
}
