import { router } from "@/server/trpc";

import { projectRouter as project } from "./project";
import { skillRouter as skill } from "./skill";
import { softSkillRouter as softSkill } from "./softskill";
import { userRouter as user } from "./user";

export type ApplicationRouter = typeof applicationRouter;

export const applicationRouter = router({
  project,
  user,
  skill,
  softSkill,
});
