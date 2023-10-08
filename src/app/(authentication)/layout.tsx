import type { ReactNode } from "react";

import { ConstelinkIcon } from "@/components/icons/constelink";
import { Link } from "@/components/link";

import { environment } from "@/environment.mjs";

type AuthenticationLayoutProps = {
  children: ReactNode;
};

const AuthenticationLayout = ({ children }: AuthenticationLayoutProps) => (
  <main className="flex grow flex-col justify-center md:flex-row-reverse">
    <section className="container flex items-start md:w-1/3 md:items-center md:px-0">
      <div className="relative mx-auto my-auto flex w-full min-w-min max-w-sm origin-left transform flex-row items-center bg-background py-8 md:-left-6 md:mx-0">
        <Link
          className="font-display flex items-center gap-4 text-3xl"
          href="/"
        >
          <ConstelinkIcon className="h-10 w-10" />
          {environment.NEXT_PUBLIC_APPLICATION_NAME.toLowerCase()}
        </Link>
      </div>
    </section>
    <section className="container justify-center md:flex md:w-2/3 md:border-r md:px-0">
      <div className="mx-auto my-auto w-full min-w-min max-w-sm py-8 md:w-7/12 md:py-8">
        {children}
      </div>
    </section>
  </main>
);

export default AuthenticationLayout;
