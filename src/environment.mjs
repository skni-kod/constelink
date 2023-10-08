import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

const nodeEnvironmentSchema = z.enum(["development", "production", "test"]);

const urlSchema =
  process.env.NODE_ENV === "development"
    ? z.string().url().default("http://localhost:3000")
    : z.string().url();

const baseClientUrl =
  process.env.NEXT_PUBLIC_BASE_URL ??
  `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;

const baseServerUrl = process.env.NEXTAUTH_URL ?? baseClientUrl;

export const environment = createEnv({
  client: {
    NEXT_PUBLIC_APPLICATION_NAME: z.string().min(1),
    NEXT_PUBLIC_BASE_URL: urlSchema,
    NEXT_PUBLIC_ENVIRONMENT: nodeEnvironmentSchema,
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    NEXT_PUBLIC_APPLICATION_NAME: process.env.NEXT_PUBLIC_APPLICATION_NAME,
    NEXT_PUBLIC_BASE_URL: baseClientUrl,
    NEXT_PUBLIC_ENVIRONMENT: process.env.NODE_ENV,
    NEXTAUTH_URL: baseServerUrl,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NODE_ENV: process.env.NODE_ENV,
  },
  server: {
    DATABASE_URL: z.string().url().startsWith("postgres://"),
    GITHUB_CLIENT_ID: z.string().min(1),
    GITHUB_CLIENT_SECRET: z.string().min(1),
    GOOGLE_CLIENT_ID: z.string().min(1),
    GOOGLE_CLIENT_SECRET: z.string().min(1),
    NEXTAUTH_SECRET: z.string().min(1),
    NEXTAUTH_URL: urlSchema,
    NODE_ENV: nodeEnvironmentSchema,
  },
});
