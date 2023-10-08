"use client";

import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from "react";

import { Command as Cmdk } from "cmdk";
import { Search } from "lucide-react";

import { Dialog, DialogContent } from "@/components/dialog";

import { cx } from "@/utilities/classname";

export const Command = forwardRef<
  ElementRef<typeof Cmdk>,
  ComponentPropsWithoutRef<typeof Cmdk>
>(({ className, ...props }, ref) => (
  <Cmdk
    className={cx(
      "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
      className,
    )}
    ref={ref}
    {...props}
  />
));

export const CommandEmpty = forwardRef<
  ElementRef<typeof Cmdk.Empty>,
  ComponentPropsWithoutRef<typeof Cmdk.Empty>
>((props, ref) => (
  <Cmdk.Empty className="py-6 text-center text-sm" ref={ref} {...props} />
));

export const CommandDialog = ({
  children,
  ...props
}: ComponentPropsWithoutRef<typeof Dialog>) => (
  <Dialog {...props}>
    <DialogContent className="overflow-hidden p-0 shadow-lg">
      <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
        {children}
      </Command>
    </DialogContent>
  </Dialog>
);

export const CommandInput = forwardRef<
  ElementRef<typeof Cmdk.Input>,
  ComponentPropsWithoutRef<typeof Cmdk.Input>
>(({ className, ...props }, ref) => (
  <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
    <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
    <Cmdk.Input
      className={cx(
        "flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      ref={ref}
      {...props}
    />
  </div>
));

export const CommandItem = forwardRef<
  ElementRef<typeof Cmdk.Item>,
  ComponentPropsWithoutRef<typeof Cmdk.Item>
>(({ className, ...props }, ref) => (
  <Cmdk.Item
    className={cx(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className,
    )}
    ref={ref}
    {...props}
  />
));

export const CommandList = forwardRef<
  ElementRef<typeof Cmdk.List>,
  ComponentPropsWithoutRef<typeof Cmdk.List>
>(({ className, ...props }, ref) => (
  <Cmdk.List
    className={cx("max-h-80 overflow-y-auto overflow-x-hidden", className)}
    ref={ref}
    {...props}
  />
));

export const CommandGroup = forwardRef<
  ElementRef<typeof Cmdk.Group>,
  ComponentPropsWithoutRef<typeof Cmdk.Group>
>(({ className, ...props }, ref) => (
  <Cmdk.Group
    className={cx(
      "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
      className,
    )}
    ref={ref}
    {...props}
  />
));

export const CommandSeparator = forwardRef<
  ElementRef<typeof Cmdk.Separator>,
  ComponentPropsWithoutRef<typeof Cmdk.Separator>
>(({ className, ...props }, ref) => (
  <Cmdk.Separator
    className={cx("-mx-1 h-px bg-border", className)}
    ref={ref}
    {...props}
  />
));

export const CommandShortcut = ({
  className,
  ...props
}: ComponentPropsWithoutRef<"span">) => (
  <span
    className={cx(
      "ml-auto text-xs tracking-widest text-muted-foreground",
      className,
    )}
    {...props}
  />
);

Command.displayName = Cmdk.displayName;
CommandEmpty.displayName = Cmdk.Empty.displayName;
CommandGroup.displayName = Cmdk.Group.displayName;
CommandInput.displayName = Cmdk.Input.displayName;
CommandItem.displayName = Cmdk.Item.displayName;
CommandList.displayName = Cmdk.List.displayName;
CommandSeparator.displayName = Cmdk.Separator.displayName;
CommandShortcut.displayName = "CommandShortcut";
