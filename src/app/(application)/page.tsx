import dynamic from "next/dynamic";

import { button } from "@/components/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/card";
import { Image } from "@/components/image";
import { Link } from "@/components/link";

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
      <section>
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
      <section>
        <div className="container my-12 text-center">
          <h2 className="from-foreground from-[50%] to-muted bg-clip-text font-display text-4xl [text-wrap:balance] selection:text-foreground dark:from-[25%] sm:text-5xl lg:bg-gradient-to-b lg:text-transparent">
            Let projects find you
          </h2>
          <p
            className={typography({
              className: "mx-auto my-8 max-w-prose [text-wrap:balance]",
              variant: "lead",
            })}
          >
            We will adjust projects to your skills and interests. Everybody
            wins!
          </p>
        </div>
        <ul className="container my-12 flex flex-col items-center gap-4 lg:grid lg:grid-cols-2">
          {projects.map((project) => (
            <li key={project.id}>
              <Link className="group flex" href={`/projects/${project.id}`}>
                <Card className="relative flex h-40 transition group-hover:border-accent group-focus-visible:border-accent">
                  {project.image && (
                    <>
                      <div className="absolute bottom-0 left-0 right-0 top-0 overflow-hidden">
                        <div className="absolute bottom-0 left-0 right-0 top-0 opacity-25 blur-3xl saturate-[1.8] transition focus-visible:opacity-50 group-hover:opacity-50">
                          <Image
                            alt={project.name}
                            className="object-cover"
                            fill
                            src={project.image}
                            unoptimized
                          />
                        </div>
                      </div>
                      <div className="relative hidden h-full w-32 shrink-0 overflow-hidden rounded-l-lg sm:flex">
                        <Image
                          alt={project.name}
                          className="object-cover"
                          fill
                          src={project.image}
                          unoptimized
                        />
                      </div>
                    </>
                  )}
                  <CardHeader className="relative">
                    <CardTitle>{project.name}</CardTitle>
                    <CardDescription className="line-clamp-3 max-w-prose [text-wrap:balance]">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default Home;
