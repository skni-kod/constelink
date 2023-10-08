import { database } from "@/server/database";
import { publicProcedure, router } from "@/server/trpc";

export const skillRouter = router({
  getAllSkills: publicProcedure.query(async () => {
    const skills = await database.query.skills.findMany();
    return skills;
  }),
});
