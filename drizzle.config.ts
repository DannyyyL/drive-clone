import { type Config, defineConfig } from "drizzle-kit";

import { env } from "~/env";

export default {
  schema: "./src/server/db/schema.ts",
  dialect: 'mysql',
  tablesFilter: ["drive-clone_*"],
} satisfies Config;
