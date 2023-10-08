"use client";

import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from "react";

import { Content } from "@radix-ui/react-collapsible";

import { cx } from "@/utilities/classname";

export {
  Root as Collapsible,
  Trigger as CollapsibleTrigger,
} from "@radix-ui/react-collapsible";

export const CollapsibleContent = forwardRef<
  ElementRef<typeof Content>,
  ComponentPropsWithoutRef<typeof Content>
>(({ className, ...props }, ref) => (
  <Content
    className={cx(
      "overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down",
      className,
    )}
    ref={ref}
    {...props}
  />
));

CollapsibleContent.displayName = Content.displayName;
