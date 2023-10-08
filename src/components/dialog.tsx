"use client";

import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from "react";

import {
  Close,
  Content,
  Description,
  Overlay,
  Portal,
  Title,
} from "@radix-ui/react-dialog";
import { X } from "lucide-react";

import { cx } from "@/utilities/classname";

export {
  Root as Dialog,
  Trigger as DialogTrigger,
} from "@radix-ui/react-dialog";

export const DialogContent = forwardRef<
  ElementRef<typeof Content>,
  ComponentPropsWithoutRef<typeof Content>
>(({ children, className, ...props }, ref) => (
  <Portal>
    <DialogOverlay />
    <Content
      className={cx(
        "z-foreground fixed left-1/2 top-1/2 grid w-full max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg md:w-full",
        className,
      )}
      ref={ref}
      {...props}
    >
      {children}
      <Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </Close>
    </Content>
  </Portal>
));

export const DialogDescription = forwardRef<
  ElementRef<typeof Description>,
  ComponentPropsWithoutRef<typeof Description>
>(({ className, ...props }, ref) => (
  <Description
    className={cx("text-sm text-muted-foreground", className)}
    ref={ref}
    {...props}
  />
));

export const DialogFooter = ({
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

export const DialogHeader = ({
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) => (
  <div
    className={cx("flex flex-col gap-1.5 text-center sm:text-left", className)}
    {...props}
  />
);

const DialogOverlay = forwardRef<
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

export const DialogTitle = forwardRef<
  ElementRef<typeof Title>,
  ComponentPropsWithoutRef<typeof Title>
>(({ className, ...props }, ref) => (
  <Title
    className={cx(
      "text-lg font-semibold leading-none tracking-tight",
      className,
    )}
    ref={ref}
    {...props}
  />
));

DialogContent.displayName = Content.displayName;
DialogDescription.displayName = Description.displayName;
DialogHeader.displayName = "DialogHeader";
DialogFooter.displayName = "DialogFooter";
DialogOverlay.displayName = Overlay.displayName;
DialogTitle.displayName = Title.displayName;
