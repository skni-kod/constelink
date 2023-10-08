"use client";

import {
  createContext,
  useContext,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";

import { Link } from "@/components/link";

import { cva } from "@/utilities/classname";

export type StepProps = {
  description?: string;
  step: number;
};

export type StepButtonProps = StepProps & ComponentPropsWithoutRef<"button">;

export type StepLinkProps = StepProps & ComponentPropsWithoutRef<typeof Link>;

export type StepsProps = StepContextState & {
  children?: ReactNode;
};

type StepContextState = {
  onChange?: (step: number) => void;
  step: number;
};

const StepContext = createContext<StepContextState | null>(null);

const useSteps = () => {
  const state = useContext(StepContext);

  if (!state) {
    throw new Error("`useSteps` must be used within `StepContext.Provider`.");
  }

  return state;
};

const step = cva({
  base: "flex flex-col border-l-4 py-2 pl-4 transition enabled:cursor-pointer enabled:hover:border-muted-foreground md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4",
  variants: {
    variant: {
      completed: "border-primary",
    },
  },
});

export const StepButton = ({
  children,
  className,
  onClick,
  step: index,
  ...props
}: StepButtonProps) => {
  const { onChange, step: currentStep } = useSteps();

  return (
    <li className="flex w-full flex-col">
      <button
        className={step({
          className,
          variant: index <= currentStep ? "completed" : undefined,
        })}
        onClick={(event) => {
          onChange?.(index);
          onClick?.(event);
        }}
        {...props}
      >
        <span>Step {index}</span>
        <span className="text-muted-foreground">{children}</span>
      </button>
    </li>
  );
};

export const StepLink = ({
  children,
  className,
  step: index,
  ...props
}: StepLinkProps) => {
  const { step: currentStep } = useSteps();

  return (
    <li className="flex w-full flex-col">
      <Link
        className={step({
          className,
          variant: index <= currentStep ? "completed" : undefined,
        })}
        {...props}
      >
        <span>Step {index}</span>
        <span className="text-muted-foreground">{children}</span>
      </Link>
    </li>
  );
};

export const Steps = ({ children, onChange, step }: StepsProps) => (
  <StepContext.Provider value={{ onChange, step }}>
    <div className="py-6 text-sm font-medium">
      <ol className="flex flex-col gap-4 md:flex-row md:gap-8">{children}</ol>
    </div>
  </StepContext.Provider>
);
