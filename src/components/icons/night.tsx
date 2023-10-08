import type { ComponentPropsWithoutRef } from "react";

export type NightIconProps = Omit<
  ComponentPropsWithoutRef<"svg">,
  "children" | "viewBox" | "xmlns"
>;

export const NightIcon = ({
  fill = "currentColor",
  ...props
}: NightIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill={fill}
    {...props}
  >
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
  </svg>
);
