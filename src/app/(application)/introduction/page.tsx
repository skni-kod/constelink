"use client";

import { useCallback, useMemo, useState } from "react";

import { api } from "@/api";

import { Badge } from "@/components/badge";
import { Button } from "@/components/button";
import { Label } from "@/components/label";
import { RadioGroup, RadioGroupItem } from "@/components/radio-group";
import { StepButton, Steps } from "@/components/steps";

import { createServer } from "@/server";

import { InputsGroup } from "./inputs-group";

const IntroductionPage = () => {
  const { data: skills } = api.skill.getAllSkills.useQuery();
  const { data: softSkills } = api.softSkill.getAllSoftSkills.useQuery();

  const [selectedSkills, setSelectedSkills] = useState<
    Exclude<typeof skills, undefined>
  >([]);

  const [selectedSoftSkills, setSelectedSoftSkills] = useState<
    Exclude<typeof skills, undefined>
  >([]);

  const advancements = ["beginner", "intermediate", "advanced", "expert"];

  const unselectedSkills = useMemo(
    () =>
      skills?.filter(
        (skill) =>
          !selectedSkills.some(
            (selectedSkill) => selectedSkill.id === skill.id,
          ),
      ) ?? [],
    [selectedSkills, skills],
  );

  const deselectSkill = (skill: (typeof selectedSkills)[number]) => {
    setSelectedSkills((selectedSkills) =>
      selectedSkills.filter((selectedSkill) => selectedSkill.id !== skill.id),
    );
  };

  const selectSkill = (skill: (typeof selectedSkills)[number]) => {
    setSelectedSkills((selectedSkills) => [...selectedSkills, skill]);
  };

  const unselectedSoftSkills = useMemo(
    () =>
      softSkills?.filter(
        (softSkill) =>
          !selectedSoftSkills.some(
            (selectedSoftSkill) => selectedSoftSkill.id === softSkill.id,
          ),
      ) ?? [],
    [selectedSoftSkills, softSkills],
  );

  const deselectSoftSkill = (
    softSkill: (typeof selectedSoftSkills)[number],
  ) => {
    setSelectedSoftSkills((selectedSoftSkills) =>
      selectedSoftSkills.filter(
        (selectedSoftSkill) => selectedSoftSkill.id !== softSkill.id,
      ),
    );
  };

  const selectSoftSkill = (softSkill: (typeof selectedSoftSkills)[number]) => {
    setSelectedSoftSkills((selectedSoftSkills) => [
      ...selectedSoftSkills,
      softSkill,
    ]);
  };

  const [step, setStep] = useState(1);
  const steps = ["Personality Test", "Hard Skills", "Soft Skills", "Summary"];

  return (
    <main className="pt-16">
      <section>
        <div className="container">
          <Steps onChange={setStep} step={step}>
            <StepButton step={1}>Personality test</StepButton>
            <StepButton step={2}>Hard skills</StepButton>
            <StepButton step={3}>Soft skills</StepButton>
            <StepButton step={4}>Summary</StepButton>
          </Steps>
        </div>
      </section>
      <div className="mx-auto my-12 flex max-w-4xl flex-col items-center gap-2">
        {step === 1 && (
          <>
            <h1 className="from-foreground from-[50%] to-muted bg-clip-text font-display text-4xl [text-wrap:balance] selection:text-foreground dark:from-[25%] sm:text-6xl lg:bg-gradient-to-b lg:text-transparent">
              Personality test
            </h1>
            <p className="my-4 text-xl">
              Let&apos;s get to know each other better
            </p>
            <form className="my-4 flex flex-col items-center gap-8">
              <InputsGroup title="You regularly make new friends." />
              <InputsGroup title="You spend a lot of your free time exploring various random topics that pique your interest." />
              <InputsGroup title="Seeing other people cry can easily make you feel like you want to cry too." />
              <InputsGroup title="You often make a backup plan for a backup plan." />
              <InputsGroup title="You usually stay calm, even under a lot of pressure." />
              <InputsGroup title="At social events, you rarely try to introduce yourself to new people and mostly talk to the ones you already know." />
            </form>
          </>
        )}
        {step === 2 && (
          <>
            <h1 className="from-foreground from-[50%] to-muted bg-clip-text font-display text-4xl [text-wrap:balance] selection:text-foreground dark:from-[25%] sm:text-6xl lg:bg-gradient-to-b lg:text-transparent">
              Hard skills
            </h1>
            <p className="my-4 text-xl">What abilities do you have?</p>
            <div className="flex items-start justify-between">
              <div className="flex w-5/12 flex-wrap gap-2">
                {unselectedSkills.map((skill) => (
                  <Badge key={skill.id} onClick={() => selectSkill(skill)}>
                    {skill.name}
                  </Badge>
                ))}
              </div>
              <div className="flex w-5/12 flex-wrap gap-4">
                {selectedSkills.map((skill) => (
                  <div key={skill.id}>
                    <Badge
                      onClick={() => deselectSkill(skill)}
                      className={"mb-2"}
                    >
                      {skill.name}
                    </Badge>
                    <RadioGroup defaultValue="beginner">
                      {advancements.map((advancement) => (
                        <div
                          className="flex items-center gap-2"
                          key={advancement}
                        >
                          <RadioGroupItem
                            id={`${skill.id}-${advancement}`}
                            value={advancement}
                          />
                          <Label htmlFor={`${skill.id}-${advancement}`}>
                            {advancement}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
        {step === 3 && (
          <>
            <h1 className="from-foreground from-[50%] to-muted bg-clip-text font-display text-4xl [text-wrap:balance] selection:text-foreground dark:from-[25%] sm:text-6xl lg:bg-gradient-to-b lg:text-transparent">
              Soft skills
            </h1>
            <p className="my-4 text-xl">What abilities do you have?</p>
            <div className="flex items-start justify-between">
              <div className="flex w-5/12 flex-wrap gap-2">
                {unselectedSoftSkills.map((softSkill) => (
                  <Badge
                    key={softSkill.id}
                    onClick={() => selectSoftSkill(softSkill)}
                  >
                    {softSkill.name}
                  </Badge>
                ))}
              </div>
              <div className="flex w-5/12 flex-wrap gap-2">
                {selectedSoftSkills.map((softSkill) => (
                  <div key={softSkill.id}>
                    <Badge
                      onClick={() => deselectSoftSkill(softSkill)}
                      className={"mb-2"}
                    >
                      {softSkill.name}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
        <div className="container mt-4 flex justify-center gap-4">
          <Button
            variant="secondary"
            onClick={() => setStep((prev) => Math.max(prev - 1, 1))}
          >
            Previous
          </Button>
          <Button
            onClick={() => setStep((prev) => Math.min(prev + 1, steps.length))}
          >
            Next
          </Button>
        </div>
      </div>
    </main>
  );
};

export default IntroductionPage;
