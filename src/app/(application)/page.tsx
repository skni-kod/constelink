import dynamic from "next/dynamic";

import { button } from "@/components/button";
import { Link } from "@/components/link";
import { Projects } from "@/components/projects";

import { environment } from "@/environment.mjs";

import { createServer } from "@/server";
import { getSession } from "@/server/authentication/session";

import { typography } from "@/utilities/typography";

const Space = dynamic(
  () =>
    import("@/components/space").then(({ Space }) => ({
      default: Space,
    })),
  {
    ssr: false,
  },
);

const Home = async () => {
  const session = await getSession();
  const server = await createServer();

  const projects = await server.project.getHomepageProjects();

  return (
    <main>
      <section className="relative">
        <Space />
        <div className="container relative flex h-screen items-center justify-center text-center">
          <div>
            <h1 className="from-foreground from-[50%] to-muted bg-clip-text font-display text-4xl [text-wrap:balance] selection:text-foreground dark:from-[25%] sm:text-6xl lg:bg-gradient-to-b lg:text-transparent">
              Where people and science unite
            </h1>
            <div
              className={typography({
                className: "mx-auto my-8 max-w-2xl [text-wrap:balance]",
                variant: "lead",
              })}
            >
              At {environment.NEXT_PUBLIC_APPLICATION_NAME} we are connecting
              project creators with interested collaborators who possess the
              skills required to contribute.
            </div>
            <div className="flex items-center justify-center gap-2">
              <Link className={button()} href="/projects">
                Browse projects
              </Link>
              {!session && (
                <Link
                  className={button({
                    variant: "secondary",
                  })}
                  href="/sign-in"
                >
                  Sign in
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
      {projects && (
        <section>
          <div className="container my-12 text-center">
            <h2 className="from-foreground from-[50%] to-muted bg-clip-text font-display text-4xl [text-wrap:balance] selection:text-foreground dark:from-[25%] sm:text-5xl xl:bg-gradient-to-b xl:text-transparent">
              Connecting the dots in the open-source universe
            </h2>
            <p
              className={typography({
                className: "mx-auto my-8 max-w-prose [text-wrap:balance]",
                variant: "lead",
              })}
            >
              Seamlessly navigate the galaxies of open-source projects with
              Constelink. We&apos;re your cosmic compass for connecting creators
              and contributors.
            </p>
          </div>
          <Projects
            className="container my-12 flex flex-col items-center lg:grid lg:grid-cols-2"
            projects={projects}
          />
        </section>
      )}
    </main>
  );
};

export default Home;
