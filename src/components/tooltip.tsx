"use client";

import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from "react";

import { Content } from "@radix-ui/react-tooltip";

import { cx } from "@/utilities/classname";

export {
  Provider as TooltipProvider,
  Root as Tooltip,
  Trigger as TooltipTrigger,
} from "@radix-ui/react-tooltip";

export const TooltipContent = forwardRef<
  ElementRef<typeof Content>,
  ComponentPropsWithoutRef<typeof Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <Content
    className={cx(
      "z-foreground overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className,
    )}
    ref={ref}
    sideOffset={sideOffset}
    {...props}
  />
));

TooltipContent.displayName = Content.displayName;
