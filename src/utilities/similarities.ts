import { TRPCError } from "@trpc/server";

import { getSession } from "@/server/authentication/session";
import { database } from "@/server/database";

const MATCH_THRESHOLD = 0.5;

const calculateMatchScore = (userSkills: string[], projectSkills: string[]) => {
  const intersection = userSkills.filter((skill) =>
    projectSkills.includes(skill),
  );

  return intersection.length / projectSkills.length;
};

export const getSimilarities = async () => {
  const session = await getSession();

  if (!session) {
    throw new Error("Unauthorized");
  }

  const user = await database.query.users.findFirst({
    where: (user, { eq }) => eq(user.id, session.user.id),
    with: {
      userSkills: {
        with: {
          skill: true,
        },
      },
    },
  });

  if (!user) {
    throw new TRPCError({
      code: "NOT_FOUND",
    });
  }

  const userSkills = user.userSkills.map((userSkill) => userSkill.skill.name);

  const projects = await database.query.projects.findMany({
    with: {
      projectSkills: {
        with: {
          skill: true,
        },
      },
    },
  });

  // get projects that have any skills
  const projectsWithSkills = projects.filter(
    (project) => project.projectSkills.length > 0,
  );

  const matches = projectsWithSkills.map((project) => {
    const projectSkills = project.projectSkills.map(({ skill }) => skill.name);

    const score = calculateMatchScore(userSkills, projectSkills);

    return {
      project,
      score,
    };
  });

  const scoredMatches = matches.filter(({ score }) => score >= MATCH_THRESHOLD);
  return scoredMatches;
};
