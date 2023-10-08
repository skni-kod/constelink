import type { User as InternalUser } from "@/types";

declare module "next-auth" {
  interface Session {
    user: InternalUser;
  }

  interface User extends InternalUser {}
}

export {};
