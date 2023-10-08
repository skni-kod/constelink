"use client";

import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from "react";

import { Indicator, Item, Root } from "@radix-ui/react-radio-group";
import { Circle } from "lucide-react";

import { cx } from "@/utilities/classname";

export const RadioGroup = forwardRef<
  ElementRef<typeof Root>,
  ComponentPropsWithoutRef<typeof Root>
>(({ className, ...props }, ref) => (
  <Root className={cx("grid gap-2", className)} ref={ref} {...props} />
));

export const RadioGroupItem = forwardRef<
  ElementRef<typeof Item>,
  Omit<ComponentPropsWithoutRef<typeof Item>, "children">
>(({ className, ...props }, ref) => (
  <Item
    className={cx(
      "aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
    ref={ref}
    {...props}
  >
    <Indicator className="flex items-center justify-center">
      <Circle className="h-2.5 w-2.5 fill-current text-current" />
    </Indicator>
  </Item>
));

RadioGroup.displayName = Root.displayName;
RadioGroupItem.displayName = Item.displayName;
