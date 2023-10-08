"use client";

import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from "react";

import { Indicator, Root } from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";

import { cx } from "@/utilities/classname";

export const Checkbox = forwardRef<
  ElementRef<typeof Root>,
  Omit<ComponentPropsWithoutRef<typeof Root>, "children">
>(({ className, ...props }, ref) => (
  <Root
    className={cx(
      "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      className,
    )}
    ref={ref}
    {...props}
  >
    <Indicator className="flex items-center justify-center text-current">
      <Check className="h-4 w-4" />
    </Indicator>
  </Root>
));

Checkbox.displayName = Root.displayName;
