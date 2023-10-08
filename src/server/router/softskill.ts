import { database } from "@/server/database";
import { publicProcedure, router } from "@/server/trpc";

export const softSkillRouter = router({
  getAllSoftSkills: publicProcedure.query(async () => {
    const softSkills = await database.query.softSkills.findMany();
    return softSkills;
  }),
});
