import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { database } from "@/server/database";
import { users } from "@/server/database/schema";
import { procedure, publicProcedure, router } from "@/server/trpc";

import { nullToUndefined } from "@/utilities/object";
import { idSchema } from "@/utilities/schema";

export const userRouter = router({
  findById: publicProcedure
    .input(
      z.object({
        id: idSchema,
      }),
    )
    .query(async ({ input: { id } }) => {
      const user = await database.query.users.findFirst({
        where: (user, { eq }) => eq(user.id, id),
      });

      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found.",
        });
      }

      return nullToUndefined(user);
    }),
  isOnboarded: procedure.query(async ({ ctx: { session } }) => {
    const user = await database.query.users.findFirst({
      where: (user, { eq }) => eq(user.id, session.user.id),
    });

    if (!user) {
      throw new TRPCError({
        code: "CONFLICT",
        message: `User ${session.user.name} does not exist.`,
      });
    }

    return user.onboarded;
  }),
  markAsOnboarded: procedure.mutation(async ({ ctx: { session } }) => {
    await database
      .update(users)
      .set({ onboarded: true })
      .where(eq(users.id, session.user.id));
  }),
});
