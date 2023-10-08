import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { database } from "@/server/database";
import { procedure, publicProcedure, router } from "@/server/trpc";

import { nullToUndefined } from "@/utilities/object";
import { idSchema } from "@/utilities/schema";
import { getSimilarities } from "@/utilities/similarities";

export const projectRouter = router({
  getAllProjects: publicProcedure.query(async () => {
    const projects = await database.query.projects.findMany();
    return projects.map(({ image, ...project }) => ({
      ...project,
      image: image ?? undefined,
    }));
  }),

  getMyProjects: procedure.query(async ({ ctx: { session } }) => {
    const user = await database.query.users.findFirst({
      where: (user, { eq }) => eq(user.id, session.user.id),
      with: {
        userProjects: {
          with: {
            project: true,
          },
        },
      },
    });

    if (!user) {
      throw new TRPCError({
        code: "NOT_FOUND",
      });
    }

    return user.userProjects.map(({ project }) => project);
  }),

  getProjectUsers: publicProcedure
    .input(
      z.object({
        id: idSchema,
      }),
    )
    .query(async ({ input: { id } }) => {
      const project = await database.query.projects.findFirst({
        where: (project, { eq }) => eq(project.id, id),
        with: {
          userProjects: {
            with: {
              user: true,
            },
          },
        },
      });

      if (!project) {
        throw new TRPCError({
          code: "NOT_FOUND",
        });
      }

      return project.userProjects.map(({ user }) => user);
    }),

  getProjectSkills: publicProcedure
    .input(
      z.object({
        id: idSchema,
      }),
    )
    .query(async ({ input: { id } }) => {
      const project = await database.query.projects.findFirst({
        where: (project, { eq }) => eq(project.id, id),
        with: {
          projectSkills: {
            with: {
              skill: true,
            },
          },
        },
      });

      if (!project) {
        throw new TRPCError({
          code: "NOT_FOUND",
        });
      }

      return project.projectSkills.map(({ skill }) => skill);
    }),

  getHomepageProjects: publicProcedure.query(async () => {
    const projects = await database.query.projects.findMany({
      limit: 4,
      orderBy: (projects, { desc }) => [desc(projects.createdAt)],
    });

    return projects;
  }),

  getSimilarProjects: procedure.query(async () => {
    return getSimilarities();
  }),

  getUserProjects: publicProcedure
    .input(
      z.object({
        id: idSchema,
      }),
    )
    .query(async ({ input: { id } }) => {
      const user = await database.query.users.findFirst({
        where: (user, { eq }) => eq(user.id, id),
        with: {
          userProjects: {
            with: {
              project: true,
            },
          },
        },
      });

      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
        });
      }

      return user.userProjects.map(({ project }) => project);
    }),

  getProject: publicProcedure
    .input(
      z.object({
        id: idSchema,
      }),
    )
    .query(async ({ input: { id } }) => {
      const project = await database.query.projects.findFirst({
        where: (project, { eq }) => eq(project.id, id),
        with: {
          userProjects: {
            with: {
              user: {
                columns: {
                  id: true,
                  image: true,
                  name: true,
                },
              },
            },
          },
        },
      });

      if (!project) {
        throw new TRPCError({
          code: "NOT_FOUND",
        });
      }

      return nullToUndefined(project);
    }),
  isProjectLeader: publicProcedure
    .input(
      z.object({
        id: idSchema,
        userId: idSchema,
      }),
    )
    .query(async ({ input: { id, userId: userId } }) => {
      const project = await database.query.userProjects.findFirst({
        where: (userProject, { and, eq }) =>
          and(
            eq(userProject.projectId, id),
            eq(userProject.userId, userId),
            eq(userProject.isLeader, true),
          ),
      });

      if (!project) {
        return false;
      }

      return Boolean(project);
    }),
});
