"use client";

import { useMemo, useState } from "react";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

import { CommandGroup, CommandItem } from "cmdk";
import { MousePointerSquare, SearchX } from "lucide-react";

import { api, type RouterOutputs } from "@/api";

import { Badge } from "@/components/badge";
import { button, Button } from "@/components/button";
import { Command, CommandEmpty, CommandInput } from "@/components/command";
import { Label } from "@/components/label";
import { RadioGroup, RadioGroupItem } from "@/components/radio-group";
import { StepButton, Steps } from "@/components/steps";
import { toast } from "@/components/toast";

import { typography } from "@/utilities/typography";

import { InputsGroup } from "./inputs-group";

const OnboardingAlertDialog = dynamic(
  () =>
    import("./alert").then(({ OnboardingAlertDialog }) => ({
      default: OnboardingAlertDialog,
    })),
  {
    ssr: false,
  },
);

const personalities = [
  {
    name: "Architect",
    code: "INTJ",
    description:
      "Imaginative and strategic thinkers, with a plan for everything.",
  },
  {
    name: "Logician",
    code: "INTP",
    description:
      "Innovative inventors with an unquenchable thirst for knowledge.",
  },
  {
    name: "Commander",
    code: "ENTJ",
    description:
      "Bold, imaginative and strong-willed leaders, always finding a way – or making one.",
  },
  {
    name: "Debater",
    code: "ENTP",
    description:
      "Smart and curious thinkers who cannot resist an intellectual challenge.",
  },
  {
    name: "Advocate",
    code: "INFJ",
    description:
      "Quiet and mystical, yet very inspiring and tireless idealists.",
  },
  {
    name: "Mediator",
    code: "INFP",
    description:
      "Poetic, kind and altruistic people, always eager to help a good cause.",
  },
  {
    name: "Protagonist",
    code: "ENFJ",
    description:
      "Charismatic and inspiring leaders, able to mesmerize their listeners.",
  },
  {
    name: "Campaigner",
    code: "ENFP",
    description:
      "Enthusiastic, creative and sociable free spirits, who can always find a reason to smile.",
  },
  {
    name: "Logistician",
    code: "ISTJ",
    description:
      "Practical and fact-minded individuals, whose reliability cannot be doubted.",
  },
  {
    name: "Defender",
    code: "ISFJ",
    description:
      "Very dedicated and warm protectors, always ready to defend their loved ones.",
  },
  {
    name: "Executive",
    code: "ESTJ",
    description:
      "Excellent administrators, unsurpassed at managing things – or people.",
  },
  {
    name: "Consul",
    code: "ESFJ",
    description:
      "Extraordinarily caring, social and popular people, always eager to help.",
  },
  {
    name: "Virtuoso",
    code: "ISTP",
    description:
      "Bold and practical experimenters, masters of all kinds of tools.",
  },
  {
    name: "Adventurer",
    code: "ISFP",
    description:
      "Flexible and charming artists, always ready to explore and experience something new.",
  },
  {
    name: "Entrepreneur",
    code: "ESTP",
    description:
      "Smart, energetic and very perceptive people, who truly enjoy living on the edge.",
  },
  {
    name: "Entertainer",
    code: "ESFP",
    description:
      "Spontaneous, energetic and enthusiastic people – life is never boring around them.",
  },
];

export type OnboardingMainProps = {
  skills: RouterOutputs["skill"]["getAllSkills"];
  softSkills: RouterOutputs["softSkill"]["getAllSoftSkills"];
};

export const OnboardingMain = ({
  skills: initialSkills,
  softSkills: initialSoftSkills,
}: OnboardingMainProps) => {
  const personality =
    personalities[Math.floor(Math.random() * personalities.length)];

  const router = useRouter();

  const { data: skills } = api.skill.getAllSkills.useQuery(undefined, {
    initialData: initialSkills,
  });

  const { data: softSkills } = api.softSkill.getAllSoftSkills.useQuery(
    undefined,
    {
      initialData: initialSoftSkills,
    },
  );

  const { mutate: markAsOnboarded } = api.user.markAsOnboarded.useMutation({
    onError: (error) => {
      toast.error("Something went wrong", {
        description: error.message,
      });
    },
    onSuccess: () => {
      router.replace("/projects");
    },
  });

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
    <>
      <OnboardingAlertDialog />
      <main className="pt-16">
        <section>
          <div className="container">
            <Steps step={step}>
              <StepButton disabled step={1}>
                Personality test
              </StepButton>
              <StepButton disabled step={2}>
                Hard skills
              </StepButton>
              <StepButton disabled step={3}>
                Soft skills
              </StepButton>
              <StepButton disabled step={4}>
                Summary
              </StepButton>
            </Steps>
          </div>
        </section>
        {step === 1 && (
          <section>
            <div className="container">
              <h1 className="mt-16 from-foreground from-[50%] to-muted bg-clip-text text-center font-display text-4xl [text-wrap:balance] selection:text-foreground dark:from-[25%] sm:text-5xl lg:bg-gradient-to-b lg:text-transparent">
                Personality test
              </h1>
              <p
                className={typography({
                  className:
                    "mx-auto mt-4 max-w-prose text-center [text-wrap:balance]",
                  variant: "lead",
                })}
              >
                Let&apos;s get to know each other better
              </p>
              <form className="mt-16 flex flex-col items-center gap-8">
                <InputsGroup title="You regularly make new friends." />
                <InputsGroup title="You spend a lot of your free time exploring various random topics that pique your interest." />
                <InputsGroup title="Seeing other people cry can easily make you feel like you want to cry too." />
                <InputsGroup title="You often make a backup plan for a backup plan." />
                <InputsGroup title="You usually stay calm, even under a lot of pressure." />
                <InputsGroup title="At social events, you rarely try to introduce yourself to new people and mostly talk to the ones you already know." />
              </form>
            </div>
          </section>
        )}
        {step === 2 && (
          <section>
            <div className="container">
              <h1 className="mt-16 from-foreground from-[50%] to-muted bg-clip-text text-center font-display text-4xl [text-wrap:balance] selection:text-foreground dark:from-[25%] sm:text-5xl lg:bg-gradient-to-b lg:text-transparent">
                Hard skills
              </h1>
              <p
                className={typography({
                  className:
                    "mx-auto mt-4 max-w-prose text-center [text-wrap:balance]",
                  variant: "lead",
                })}
              >
                What abilities do you have?
              </p>
              <div className="mt-16 grid w-full grid-cols-1 gap-8 lg:grid-cols-2">
                <div>
                  <h2
                    className={typography({
                      className: "my-8 text-center",
                      variant: "heading-2",
                    })}
                  >
                    Skills
                  </h2>
                  <Command>
                    <CommandInput placeholder="Search skills..." />
                    <CommandEmpty className="flex h-full w-full flex-col items-center justify-center gap-4">
                      <SearchX
                        aria-hidden
                        className="h-12 w-12 text-muted-foreground"
                      />
                      <p className={typography({ variant: "heading-4" })}>
                        No skills found
                      </p>
                    </CommandEmpty>
                    <CommandGroup className="mt-4 flex flex-wrap gap-2 [&>*]:contents">
                      {unselectedSkills.map((skill) => (
                        <CommandItem
                          key={skill.id}
                          onSelect={(value) => {
                            selectSkill(
                              skills.find(
                                (skill) => skill.name.toLowerCase() === value,
                              )!,
                            );
                          }}
                        >
                          <Badge className="cursor-pointer">{skill.name}</Badge>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </div>
                <div>
                  <h2
                    className={typography({
                      className: "my-8 text-center",
                      variant: "heading-2",
                    })}
                  >
                    Selected skills
                  </h2>
                  <div className="flex h-full flex-wrap items-start gap-4">
                    {selectedSkills.length > 0 ? (
                      selectedSkills.map((skill) => (
                        <div key={skill.id}>
                          <Badge
                            className="mb-2 cursor-pointer"
                            onClick={() => deselectSkill(skill)}
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
                      ))
                    ) : (
                      <div className="flex h-full w-full flex-col items-center justify-center gap-4">
                        <MousePointerSquare
                          aria-hidden
                          className="h-12 w-12 text-muted-foreground"
                        />
                        <p className={typography({ variant: "heading-4" })}>
                          Select your skills
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
        {step === 3 && (
          <section>
            <div className="container">
              <h1 className="mt-16 from-foreground from-[50%] to-muted bg-clip-text text-center font-display text-4xl [text-wrap:balance] selection:text-foreground dark:from-[25%] sm:text-5xl lg:bg-gradient-to-b lg:text-transparent">
                Soft skills
              </h1>
              <p
                className={typography({
                  className:
                    "mx-auto mt-4 max-w-prose text-center [text-wrap:balance]",
                  variant: "lead",
                })}
              >
                What abilities do you have?
              </p>
              <div className="mt-16 grid w-full grid-cols-1 gap-8 lg:grid-cols-2">
                <div>
                  <h2
                    className={typography({
                      className: "my-8 text-center",
                      variant: "heading-2",
                    })}
                  >
                    Skills
                  </h2>
                  <Command>
                    <CommandInput placeholder="Search skills..." />
                    <CommandEmpty className="flex h-full w-full flex-col items-center justify-center gap-4">
                      <SearchX
                        aria-hidden
                        className="h-12 w-12 text-muted-foreground"
                      />
                      <p className={typography({ variant: "heading-4" })}>
                        No skills found
                      </p>
                    </CommandEmpty>
                    <CommandGroup className="mt-4 flex flex-wrap gap-2 [&>*]:contents">
                      {unselectedSoftSkills.map((skill) => (
                        <CommandItem
                          key={skill.id}
                          onSelect={(value) => {
                            selectSoftSkill(
                              softSkills.find(
                                (skill) => skill.name.toLowerCase() === value,
                              )!,
                            );
                          }}
                        >
                          <Badge className="cursor-pointer">{skill.name}</Badge>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </div>
                <div>
                  <h2
                    className={typography({
                      className: "my-8 text-center",
                      variant: "heading-2",
                    })}
                  >
                    Selected skills
                  </h2>
                  <div className="flex h-full flex-wrap items-start gap-4">
                    {selectedSoftSkills.length > 0 ? (
                      selectedSoftSkills.map((skill) => (
                        <Badge
                          className="mb-2 cursor-pointer"
                          key={skill.id}
                          onClick={() => deselectSoftSkill(skill)}
                        >
                          {skill.name}
                        </Badge>
                      ))
                    ) : (
                      <div className="flex h-full w-full flex-col items-center justify-center gap-4">
                        <MousePointerSquare
                          aria-hidden
                          className="h-12 w-12 text-muted-foreground"
                        />
                        <p className={typography({ variant: "heading-4" })}>
                          Select your skills
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
        {step === 4 && (
          <section>
            <div className="container">
              <h1 className="mt-16 from-foreground from-[50%] to-muted bg-clip-text text-center font-display text-4xl [text-wrap:balance] selection:text-foreground dark:from-[25%] sm:text-5xl lg:bg-gradient-to-b lg:text-transparent">
                Summary
              </h1>
              <p
                className={typography({
                  className:
                    "mx-auto mt-4 max-w-prose text-center [text-wrap:balance]",
                  variant: "lead",
                })}
              >
                Please check all information
              </p>

              <div className="mt-16 grid w-full grid-cols-1 gap-8 lg:grid-cols-2">
                <div>
                  <h2
                    className={typography({
                      className: "my-8 text-center",
                      variant: "heading-2",
                    })}
                  >
                    Hard skills
                  </h2>
                  <div className="flex h-full flex-wrap items-start justify-center gap-4">
                    {selectedSkills.map((skill) => (
                      <div key={skill.id}>
                        <Badge className="mb-2">{skill.name}</Badge>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h2
                    className={typography({
                      className: "my-8 text-center",
                      variant: "heading-2",
                    })}
                  >
                    Soft skills
                  </h2>
                  <div className="flex h-full flex-wrap items-start justify-center gap-4">
                    {selectedSoftSkills.map((softSkill) => (
                      <div key={softSkill.id}>
                        <Badge className="mb-2">{softSkill.name}</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <h3
                className={typography({
                  className: "mb-2 mt-16 text-center",
                  variant: "heading-4",
                })}
              >
                Personality type - {personality?.code}: {personality?.name}
              </h3>
              <p className="text-l md-4 text-center text-muted-foreground">
                {personality?.description}
              </p>
            </div>
          </section>
        )}
        <div className="container mt-16 flex justify-center gap-2">
          {step === steps.length ? (
            <Button className={button()} onClick={() => void markAsOnboarded()}>
              Begin browsing projects
            </Button>
          ) : (
            <>
              {step > 1 && (
                <Button
                  disabled={step === 1}
                  onClick={() =>
                    setStep((previous) => Math.max(previous - 1, 1))
                  }
                  variant="secondary"
                >
                  Previous
                </Button>
              )}
              <Button
                disabled={step === steps.length}
                onClick={() =>
                  setStep((previous) => Math.min(previous + 1, steps.length))
                }
              >
                Next
              </Button>
            </>
          )}
        </div>
      </main>
    </>
  );
};
