"use client";

import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from "react";

import { Root } from "@radix-ui/react-separator";

import { cx } from "@/utilities/classname";

export const Separator = forwardRef<
  ElementRef<typeof Root>,
  ComponentPropsWithoutRef<typeof Root>
>(
  (
    { className, decorative = true, orientation = "horizontal", ...props },
    ref,
  ) => (
    <Root
      className={cx(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
        className,
      )}
      decorative={decorative}
      orientation={orientation}
      ref={ref}
      {...props}
    />
  ),
);

Separator.displayName = Root.displayName;
