import type { ReactNode } from "react";

import dynamic from "next/dynamic";

import { Header } from "@/components/header";

import { getSession } from "@/server/authentication/session";

const Footer = dynamic(
  () =>
    import("@/components/footer").then(({ Footer }) => ({
      default: Footer,
    })),
  {
    ssr: false,
  },
);

type ApplicationLayoutProps = {
  children: ReactNode;
};

const ApplicationLayout = async ({ children }: ApplicationLayoutProps) => {
  const session = await getSession();

  return (
    <>
      <Header initialUser={session?.user} />
      {children}
      <Footer />
    </>
  );
};

export default ApplicationLayout;
