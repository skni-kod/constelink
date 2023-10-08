import { redirect, RedirectType } from "next/navigation";

import { createServer } from "@/server";

import { OnboardingMain } from "./main";

const OnboardingPage = async () => {
  const server = await createServer();

  const skills = await server.skill.getAllSkills();
  const softSkills = await server.softSkill.getAllSoftSkills();

  const onboarded = await server.user.isOnboarded();

  if (onboarded) {
    redirect("/projects", RedirectType.replace);
  }

  return <OnboardingMain skills={skills} softSkills={softSkills} />;
};

export default OnboardingPage;
