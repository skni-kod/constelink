import { notFound, redirect } from "next/navigation";

import { getSession } from "@/server/authentication/session";

const MePage = async () => {
  const session = await getSession();

  if (session) {
    redirect(`/users/${session.user.id}`);
  }

  notFound();
};

export default MePage;
