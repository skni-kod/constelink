"use client";

import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from "react";

import { Root } from "@radix-ui/react-label";

import { cva, type VariantProps } from "@/utilities/classname";

const label = cva({
  base: "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
});

export const Label = forwardRef<
  ElementRef<typeof Root>,
  ComponentPropsWithoutRef<typeof Root> & VariantProps<typeof label>
>(({ className, ...props }, ref) => (
  <Root className={label({ className })} ref={ref} {...props} />
));

Label.displayName = Root.displayName;
