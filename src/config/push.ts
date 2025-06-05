import { Pool } from "pg";
import { NodePgDatabase, drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";

import { env } from "./env";
const { DATABASE_URL } = env;

async function main() {
  const pool = new Pool({ connectionString: DATABASE_URL });
  const db: NodePgDatabase = drizzle(pool);

  console.log("Pushing schema changes...");

  await migrate(db, {
    migrationsFolder: "src/migrations",
  });

  console.log("Schema changes pushed successfully!");

  await pool.end();
}

main();
