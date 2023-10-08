"use client";

import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from "react";

import {
  CheckboxItem,
  Content,
  Item,
  ItemIndicator,
  Label,
  Portal,
  RadioItem,
  Separator,
  SubContent,
  SubTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Check, ChevronRight, Circle } from "lucide-react";

import { cx } from "@/utilities/classname";

export {
  Group as DropdownMenuGroup,
  Portal as DropdownMenuPortal,
  RadioGroup as DropdownMenuRadioGroup,
  Root as DropdownMenu,
  Sub as DropdownMenuSub,
  Trigger as DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";

export const DropdownMenuCheckboxItem = forwardRef<
  ElementRef<typeof CheckboxItem>,
  ComponentPropsWithoutRef<typeof CheckboxItem>
>(({ children, className, ...props }, ref) => (
  <CheckboxItem
    className={cx(
      "relative flex select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
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
    {children}
  </CheckboxItem>
));

export const DropdownMenuContent = forwardRef<
  ElementRef<typeof Content>,
  ComponentPropsWithoutRef<typeof Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <Portal>
    <Content
      className={cx(
        "z-foreground min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className,
      )}
      ref={ref}
      sideOffset={sideOffset}
      {...props}
    />
  </Portal>
));

export const DropdownMenuItem = forwardRef<
  ElementRef<typeof Item>,
  ComponentPropsWithoutRef<typeof Item> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <Item
    className={cx(
      "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className,
    )}
    ref={ref}
    {...props}
  />
));

export const DropdownMenuLabel = forwardRef<
  ElementRef<typeof Label>,
  ComponentPropsWithoutRef<typeof Label> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <Label
    className={cx(
      "px-2 py-1.5 text-sm font-semibold",
      inset && "pl-8",
      className,
    )}
    ref={ref}
    {...props}
  />
));

export const DropdownMenuRadioItem = forwardRef<
  ElementRef<typeof RadioItem>,
  ComponentPropsWithoutRef<typeof RadioItem>
>(({ children, className, ...props }, ref) => (
  <RadioItem
    className={cx(
      "relative flex select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className,
    )}
    ref={ref}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </ItemIndicator>
    </span>
    {children}
  </RadioItem>
));

export const DropdownMenuSeparator = forwardRef<
  ElementRef<typeof Separator>,
  ComponentPropsWithoutRef<typeof Separator>
>(({ className, ...props }, ref) => (
  <Separator
    className={cx("-mx-1 my-1 h-px bg-muted", className)}
    ref={ref}
    {...props}
  />
));

export const DropdownMenuSubContent = forwardRef<
  ElementRef<typeof SubContent>,
  ComponentPropsWithoutRef<typeof SubContent>
>(({ className, ...props }, ref) => (
  <SubContent
    className={cx(
      "z-foreground min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className,
    )}
    ref={ref}
    {...props}
  />
));

export const DropdownMenuSubTrigger = forwardRef<
  ElementRef<typeof SubTrigger>,
  ComponentPropsWithoutRef<typeof SubTrigger> & {
    inset?: boolean;
  }
>(({ children, className, inset, ...props }, ref) => (
  <SubTrigger
    className={cx(
      "flex select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent",
      inset && "pl-8",
      className,
    )}
    ref={ref}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto h-4 w-4" />
  </SubTrigger>
));

export const DropdownMenuShortcut = ({
  className,
  ...props
}: ComponentPropsWithoutRef<"span">) => (
  <span
    className={cx("ml-auto text-xs tracking-widest opacity-60", className)}
    {...props}
  />
);

DropdownMenuCheckboxItem.displayName = CheckboxItem.displayName;
DropdownMenuContent.displayName = Content.displayName;
DropdownMenuItem.displayName = Item.displayName;
DropdownMenuLabel.displayName = Label.displayName;
DropdownMenuRadioItem.displayName = RadioItem.displayName;
DropdownMenuSeparator.displayName = Separator.displayName;
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";
DropdownMenuSubContent.displayName = SubContent.displayName;
DropdownMenuSubTrigger.displayName = SubTrigger.displayName;
