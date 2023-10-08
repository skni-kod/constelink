"use client";

import type { Session } from "next-auth";
import { useSession } from "next-auth/react";

export { signIn, signOut, useSession } from "next-auth/react";

export const useSessionUser = <InitialUser extends Session["user"] | undefined>(
  initialUser: InitialUser,
) => {
  const session = useSession();
  return (session.data?.user ?? initialUser) as InitialUser extends undefined
    ? Session["user"] | undefined
    : Session["user"];
};
