import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { database } from "@/server/database";
import { publicProcedure, router } from "@/server/trpc";

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
});
