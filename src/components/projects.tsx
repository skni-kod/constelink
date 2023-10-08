import type { ComponentPropsWithoutRef } from "react";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/card";
import { Image } from "@/components/image";
import { Link } from "@/components/link";

import { cx } from "@/utilities/classname";

export type ProjectsProps = ComponentPropsWithoutRef<"ul"> & {
  projects: {
    description: string;
    id: string;
    image?: string;
    name: string;
  }[];
};

export const Projects = ({ className, projects, ...props }: ProjectsProps) => (
  <ul className={cx("gap-4", className)} {...props}>
    {projects.map((project) => (
      <li key={project.id}>
        <Link className="group flex" href={`/projects/${project.id}`}>
          <Card className="relative flex h-40 transition group-hover:border-accent group-focus-visible:border-accent">
            {project.image && (
              <>
                <div className="absolute bottom-0 left-0 right-0 top-0 overflow-hidden rounded-lg">
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
);
