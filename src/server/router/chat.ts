import { TRPCError } from "@trpc/server";
import { and, or } from "drizzle-orm";
import { z } from "zod";

import { database } from "@/server/database";
import { procedure, publicProcedure, router } from "@/server/trpc";

import { idSchema } from "@/utilities/schema";

export const chatRouter = router({
  getProjectChat: procedure
    .input(
      z.object({
        id: idSchema,
      }),
    )
    .query(async ({ ctx: { session }, input: { id } }) => {
      if (!session.user) {
        return null;
      }

      const isMemberOfAProject = Boolean(
        await database.query.userProjects.findFirst({
          where: (userProject, { and, eq }) =>
            and(
              eq(userProject.projectId, id),
              eq(userProject.userId, session.user.id),
            ),
        }),
      );

      if (isMemberOfAProject) {
        return await database.query.chats.findFirst({
          where: (chat, { eq }) =>
            and(eq(chat.projectId, id), eq(chat.isMain, true)),
        });
      } else {
        return await database.query.chats.findFirst({
          where: (chat, { eq }) =>
            and(eq(chat.projectId, id), eq(chat.userId, session.user.id)),
        });
      }
    }),
  getChatMessages: procedure
    .input(
      z.object({
        id: idSchema,
      }),
    )
    .query(async ({ ctx: { session }, input: { id } }) => {
      if (!session.user) {
        return null;
      }

      const isMemberOfAProject = Boolean(
        await database.query.userProjects.findFirst({
          where: (userProject, { and, eq }) =>
            and(
              eq(userProject.projectId, id),
              eq(userProject.userId, session.user.id),
            ),
        }),
      );

      if (isMemberOfAProject) {
        return await database.query.messages.findMany({
          where: (message, { eq }) => eq(message.chatId, id),
        });
      } else {
        return await database.query.messages.findMany({
          where: (message, { eq }) =>
            and(eq(message.chatId, id), eq(message.userId, session.user.id)),
        });
      }
    }),
});
