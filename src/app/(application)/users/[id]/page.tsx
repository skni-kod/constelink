import { Avatar } from "@/components/avatar";
import { Badge } from "@/components/badge";
import { Image } from "@/components/image";
import { LayoutHero, layoutHeroImage } from "@/components/layout/hero";
import { ProjectList } from "@/components/project-list";

import { createServer } from "@/server";

import { typography } from "@/utilities/typography";

type UserProjectsPageProps = {
  params: {
    id: string;
  };
};

const UserPage = async ({ params: { id } }: UserProjectsPageProps) => {
  const server = await createServer();
  const projects = await server.project.getUserProjects({ id });

  const user = await server.user.findById({ id });

  const isGoogleImage = user.image?.includes("=s96-c");

  const image = isGoogleImage
    ? user.image?.replace("=s96-c", "=s256-c")
    : user.image;

  return (
    <LayoutHero
      backgroundImage={
        image ? (
          <Image
            alt={user.name ?? ""}
            className={layoutHeroImage()}
            fill
            src={image}
            unoptimized
          />
        ) : undefined
      }
      image={
        image ? (
          <Avatar
            className={layoutHeroImage({
              className: "h-full w-full rounded-2xl",
              variant: "foreground",
            })}
            rounded={false}
            user={{
              image,
              name: user.name,
            }}
          />
        ) : undefined
      }
      title={user.name}
    >
      <section>
        <div className="container grid md:grid-cols-3">
          <div className="col-span-2 mr-20">
            {user.bio && (
              <>
                <h2
                  className={typography({
                    className: "py-8",
                    variant: "heading-2",
                  })}
                >
                  Bio
                </h2>
                {user.bio}
              </>
            )}
            {projects && (
              <>
                <h2
                  className={typography({
                    className: "py-8",
                    variant: "heading-2",
                  })}
                >
                  Projects
                </h2>
                <ProjectList projects={projects} />
              </>
            )}
          </div>
          <div className="col-span-1">
            <h2
              className={typography({
                className: "py-8",
                variant: "heading-2",
              })}
            >
              Hard Skills
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
              Soft Skills
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
          </div>
        </div>
      </section>
    </LayoutHero>
  );
};

export default UserPage;
