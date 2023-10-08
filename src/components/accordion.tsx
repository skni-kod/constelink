"use client";

import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from "react";

import { Content, Header, Item, Trigger } from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

import { cx } from "@/utilities/classname";

export { Root as Accordion } from "@radix-ui/react-accordion";

export const AccordionContent = forwardRef<
  ElementRef<typeof Content>,
  ComponentPropsWithoutRef<typeof Content>
>(({ children, className, ...props }, ref) => (
  <Content
    className={cx(
      "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
      className,
    )}
    ref={ref}
    {...props}
  >
    <div className="pb-4 pt-0">{children}</div>
  </Content>
));

export const AccordionItem = forwardRef<
  ElementRef<typeof Item>,
  ComponentPropsWithoutRef<typeof Item>
>(({ className, ...props }, ref) => (
  <Item className={cx("border-b", className)} ref={ref} {...props} />
));

export const AccordionTrigger = forwardRef<
  ElementRef<typeof Trigger>,
  ComponentPropsWithoutRef<typeof Trigger>
>(({ children, className, ...props }, ref) => (
  <Header className="flex">
    <Trigger
      className={cx(
        "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
        className,
      )}
      ref={ref}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
    </Trigger>
  </Header>
));

AccordionContent.displayName = Content.displayName;
AccordionItem.displayName = "AccordionItem";
AccordionTrigger.displayName = Trigger.displayName;
