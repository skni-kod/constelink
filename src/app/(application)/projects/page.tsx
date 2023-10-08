import { Projects } from "@/components/projects";

import { createServer } from "@/server";

import { typography } from "@/utilities/typography";

const ProjectsPage = async () => {
  const server = await createServer();

  const projects = await server.project.getAllProjects();

  return (
    <main className="pt-16">
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
      </section>
      <div className="mt-16">
        <Projects
          className="container my-12 flex flex-col items-center lg:grid lg:grid-cols-2"
          projects={projects}
        />
      </div>
    </main>
  );
};

export default ProjectsPage;
