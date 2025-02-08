import { type Config, defineConfig } from "drizzle-kit";
import { env } from "~/env";

export default defineConfig({
  schema: "./src/server/db/schema.ts",
  //Assert the dialect as "singlestore" even if TS doesn't expect it
  dialect: 'singlestore' as Config['dialect'], 
  tablesFilter: ["drive-clone_*"],
  dbCredentials: {
    host: env.SINGLESTORE_HOST,
    port: parseInt(env.SINGLESTORE_PORT),
    user: env.SINGLESTORE_USER,
    password: env.SINGLESTORE_PASS,
    database: env.SINGLESTORE_DB_NAME,
    ssl: {},
  }
});
