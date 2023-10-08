import "dotenv/config";

import type { Config } from "drizzle-kit";

export default {
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
  driver: "pg",
  schema: "./src/server/database/schema.ts",
} satisfies Config;
