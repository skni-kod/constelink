"use client";

import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from "react";

import {
  Action,
  Cancel,
  Content,
  Description,
  Overlay,
  Portal,
  Title,
} from "@radix-ui/react-alert-dialog";

import { cx } from "@/utilities/classname";

import { button } from "./button";

export {
  Root as AlertDialog,
  Trigger as AlertDialogTrigger,
} from "@radix-ui/react-alert-dialog";

export const AlertDialogAction = forwardRef<
  ElementRef<typeof Action>,
  ComponentPropsWithoutRef<typeof Action>
>(({ className, ...props }, ref) => (
  <Action className={button({ className })} ref={ref} {...props} />
));

export const AlertDialogCancel = forwardRef<
  ElementRef<typeof Cancel>,
  ComponentPropsWithoutRef<typeof Cancel>
>(({ className, ...props }, ref) => (
  <Cancel
    className={button({
      className: cx("mt-2 sm:mt-0", className),
      variant: "outline",
    })}
    ref={ref}
    {...props}
  />
));

export const AlertDialogContent = forwardRef<
  ElementRef<typeof Content>,
  ComponentPropsWithoutRef<typeof Content>
>(({ className, ...props }, ref) => (
  <Portal>
    <AlertDialogOverlay />
    <Content
      className={cx(
        "z-foreground fixed left-1/2 top-1/2 grid w-full max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg md:w-full",
        className,
      )}
      ref={ref}
      {...props}
    />
  </Portal>
));

export const AlertDialogDescription = forwardRef<
  ElementRef<typeof Description>,
  ComponentPropsWithoutRef<typeof Description>
>(({ className, ...props }, ref) => (
  <Description
    className={cx("text-sm text-muted-foreground", className)}
    ref={ref}
    {...props}
  />
));

export const AlertDialogFooter = ({
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) => (
  <div
    className={cx(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:gap-2",
      className,
    )}
    {...props}
  />
);

export const AlertDialogHeader = ({
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) => (
  <div
    className={cx("flex flex-col gap-2 text-center sm:text-left", className)}
    {...props}
  />
);

const AlertDialogOverlay = forwardRef<
  ElementRef<typeof Overlay>,
  ComponentPropsWithoutRef<typeof Overlay>
>(({ className, ...props }, ref) => (
  <Overlay
    className={cx(
      "z-foreground fixed inset-0 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className,
    )}
    ref={ref}
    {...props}
  />
));

export const AlertDialogTitle = forwardRef<
  ElementRef<typeof Title>,
  ComponentPropsWithoutRef<typeof Title>
>(({ className, ...props }, ref) => (
  <Title
    className={cx("text-lg font-semibold", className)}
    ref={ref}
    {...props}
  />
));

AlertDialogAction.displayName = Action.displayName;
AlertDialogCancel.displayName = Cancel.displayName;
AlertDialogContent.displayName = Content.displayName;
AlertDialogDescription.displayName = Description.displayName;
AlertDialogFooter.displayName = "AlertDialogFooter";
AlertDialogHeader.displayName = "AlertDialogHeader";
AlertDialogOverlay.displayName = Overlay.displayName;
AlertDialogTitle.displayName = Title.displayName;
