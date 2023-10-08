import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { database } from "@/server/database";
import { procedure, publicProcedure, router } from "@/server/trpc";

export const softSkillRouter = router({
  getAllSoftSkills: publicProcedure.query(async () => {
    const softSkills = await database.query.softSkills.findMany();
    return softSkills;
  }),
});
