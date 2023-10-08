"use client";

import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from "react";

import {
  Content,
  Icon,
  Item,
  ItemIndicator,
  ItemText,
  Label,
  Portal,
  Separator,
  Trigger,
  Viewport,
} from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";

import { cx } from "@/utilities/classname";

export {
  Group as SelectGroup,
  Root as Select,
  Value as SelectValue,
} from "@radix-ui/react-select";

export const SelectContent = forwardRef<
  ElementRef<typeof Content>,
  ComponentPropsWithoutRef<typeof Content>
>(({ children, className, position = "popper", ...props }, ref) => (
  <Portal>
    <Content
      className={cx(
        "relative z-foreground min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className,
      )}
      position={position}
      ref={ref}
      {...props}
    >
      <Viewport
        className={cx(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]",
        )}
      >
        {children}
      </Viewport>
    </Content>
  </Portal>
));

export const SelectItem = forwardRef<
  ElementRef<typeof Item>,
  ComponentPropsWithoutRef<typeof Item>
>(({ children, className, ...props }, ref) => (
  <Item
    className={cx(
      "relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className,
    )}
    ref={ref}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <ItemIndicator>
        <Check className="h-4 w-4" />
      </ItemIndicator>
    </span>

    <ItemText>{children}</ItemText>
  </Item>
));

export const SelectLabel = forwardRef<
  ElementRef<typeof Label>,
  ComponentPropsWithoutRef<typeof Label>
>(({ className, ...props }, ref) => (
  <Label
    className={cx("py-1.5 pl-8 pr-2 text-sm font-semibold", className)}
    ref={ref}
    {...props}
  />
));

export const SelectSeparator = forwardRef<
  ElementRef<typeof Separator>,
  ComponentPropsWithoutRef<typeof Separator>
>(({ className, ...props }, ref) => (
  <Separator
    className={cx("-mx-1 my-1 h-px bg-muted", className)}
    ref={ref}
    {...props}
  />
));

export const SelectTrigger = forwardRef<
  ElementRef<typeof Trigger>,
  ComponentPropsWithoutRef<typeof Trigger>
>(({ children, className, ...props }, ref) => (
  <Trigger
    className={cx(
      "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
    ref={ref}
    {...props}
  >
    {children}
    <Icon asChild>
      <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
    </Icon>
  </Trigger>
));

SelectContent.displayName = Content.displayName;
SelectItem.displayName = Item.displayName;
SelectLabel.displayName = Label.displayName;
SelectSeparator.displayName = Separator.displayName;
SelectTrigger.displayName = Trigger.displayName;
