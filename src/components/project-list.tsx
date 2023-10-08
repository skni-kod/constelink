import type { RouterOutputs } from "@/api";

import { ProjectCard } from "@/components/project-card";

export type ProjectListProps = {
  projects: RouterOutputs["project"]["getAllProjects"];
};

export const ProjectList = ({ projects }: ProjectListProps) => {
  return (
    <div className="container my-auto flex flex-wrap">
      {projects.map((project) => (
        <div key={project.id} className="m-2">
          <ProjectCard
            src={project.image || "https://picsum.photos/225"}
            width={225}
            height={225}
            alt={project.name}
            title={project.name}
            description={project.description}
            href={`/projects/${project.id}`}
          />
        </div>
      ))}
    </div>
  );
};
