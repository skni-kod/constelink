import { notFound, redirect, RedirectType } from "next/navigation";

import { createServer } from "@/server";
import { getSession } from "@/server/authentication/session";

const MePage = async () => {
  const session = await getSession();
  const server = await createServer();

  const isOnboarded = await server.user.isOnboarded();

  if (!isOnboarded) {
    redirect("/onboarding", RedirectType.replace);
  }

  if (session) {
    redirect(`/users/${session.user.id}`, RedirectType.replace);
  }

  notFound();
};

export default MePage;
