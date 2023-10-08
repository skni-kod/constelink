import { ProjectList } from "@/components/project-list";
import { SearchBar } from "@/components/searchbar";

import { createServer } from "@/server";

const ProjectsPage = async () => {
  const server = await createServer();

  const projects = await server.project.getAllProjects();

  return (
    <>
      <div className="mt-16">
        <SearchBar />
        <ProjectList projects={projects} />
      </div>
    </>
  );
};

export default ProjectsPage;
