import { HelpingHand, Plus } from "lucide-react";

import { Badge } from "@/components/badge";
import { button } from "@/components/button";
import { Image } from "@/components/image";
import { LayoutHero, layoutHeroImage } from "@/components/layout/hero";
import { Link } from "@/components/link";
import { Members } from "@/components/members";

import { createServer } from "@/server";

import { typography } from "@/utilities/typography";

export type ProjectPageProps = {
  params: {
    id: string;
  };
};

const ProjectPage = async ({ params: { id } }: ProjectPageProps) => {
  const server = await createServer();
  const project = await server.project.getProject({ id });

  return (
    <LayoutHero
      backgroundImage={
        project.image ? (
          <Image
            alt={project.name}
            className={layoutHeroImage()}
            fill
            src={project.image}
            unoptimized
          />
        ) : undefined
      }
      image={
        project.image ? (
          <Image
            alt={project.name}
            className={layoutHeroImage({ variant: "foreground" })}
            fill
            src={project.image}
            unoptimized
          />
        ) : undefined
      }
      title={project.name}
    >
      <section>
        <div className="container grid md:grid-cols-3">
          <div className="col-span-2">
            <h2
              className={typography({
                className: "py-8",
                variant: "heading-2",
              })}
            >
              Description
            </h2>
            <p className="max-w-prose text-muted-foreground">
              {project.description}
            </p>
            <div className="my-6 flex flex-col gap-2 sm:flex-row">
              <Link className={button()} href={`/projects/${id}/chat`}>
                <Plus className="h-5 w-5" />
                Join
              </Link>
              <Link
                className={button({ variant: "secondary" })}
                href={`/projects/${id}/contact`}
              >
                <HelpingHand className="h-5 w-5" />
                Invest
              </Link>
            </div>
          </div>
          <div className="col-span-1">
            <h2
              className={typography({
                className: "py-8",
                variant: "heading-2",
              })}
            >
              Hard skills
            </h2>
            <ul className="flex flex-wrap gap-2">
              <Badge>HTML</Badge>
              <Badge>CSS</Badge>
              <Badge>JavaScript</Badge>
              <Badge>Smarty</Badge>
              <Badge>React.js</Badge>
              <Badge>Angu*ar</Badge>
              <Badge>Next.js</Badge>
            </ul>
            <h2
              className={typography({
                className: "py-8",
                variant: "heading-2",
              })}
            >
              Soft skills
            </h2>
            <ul className="flex flex-wrap gap-2">
              <Badge>Communication</Badge>
              <Badge>Teamwork</Badge>
              <Badge>Problem-solving</Badge>
              <Badge>Time management</Badge>
              <Badge>Leadership</Badge>
              <Badge>Adaptability</Badge>
              <Badge>Creativity</Badge>
            </ul>
            <h2
              className={typography({
                className: "py-8",
                variant: "heading-2",
              })}
            >
              Members
            </h2>
            <Members
              members={project.userProjects.map(({ isLeader, role, user }) => ({
                id: user.id,
                image: user.image,
                isLeader,
                name: user.name,
                role,
              }))}
            />
          </div>
        </div>
      </section>
    </LayoutHero>
  );
};

export default ProjectPage;
