import type { ComponentPropsWithoutRef } from "react";

export type ConstelinkIconProps = Omit<
  ComponentPropsWithoutRef<"svg">,
  "children" | "viewBox" | "xmlns"
>;

export const ConstelinkIcon = ({
  fill = "currentColor",
  ...props
}: ConstelinkIconProps) => (
  <svg
    fill={fill}
    viewBox="0 0 23.448 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22.365 7.021 14.71.917 5.165 3.095.916 11.917l4.249 8.821 9.545 2.179 7.655-6.105" />
      <path d="m22.365 7.021-17.2-3.926v17.643l17.2-3.925" />
      <path d="m14.71.917-13.794 11 13.794 11" />
    </g>
    <circle cx="22.448" cy="7.104" r="1" />
    <circle cx="14.794" cy="1" r="1" />
    <circle cx="5.165" cy="3.095" r="1" />
    <circle cx="1" cy="12" r="1" />
    <circle cx="5.165" cy="20.738" r="1" />
    <circle cx="14.794" cy="23" r="1" />
    <circle cx="22.448" cy="16.896" r="1" />
  </svg>
);
