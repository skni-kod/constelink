import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { database } from "@/server/database";
import { procedure, publicProcedure, router } from "@/server/trpc";

export const skillRouter = router({
  getAllSkills: publicProcedure.query(async () => {
    const skills = await database.query.skills.findMany();
    return skills;
  }),
});
