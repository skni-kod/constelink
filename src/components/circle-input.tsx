import type { ComponentPropsWithoutRef } from "react";

import { Item } from "@radix-ui/react-radio-group";

import { cx } from "@/utilities/classname";

type CircleInputProps = {
  size: string;
  checked: boolean;
  onClick: ComponentPropsWithoutRef<"button">["onClick"];
};

export const CircleInput = ({ size, checked, onClick }: CircleInputProps) => {
  return (
    <button
      className={cx(
        "border-background-primary rounded-full border-2 transition hover:cursor-pointer hover:bg-primary",
        checked && "bg-primary",
      )}
      onClick={onClick}
      style={{ width: size, height: size }}
      type="button"
    />
  );
};
