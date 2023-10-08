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
import { cva } from "cva";
import { X } from "lucide-react";

import { cx, type VariantProps } from "@/utilities/classname";

export {
  Close as SheetClose,
  Root as Sheet,
  Trigger as SheetTrigger,
} from "@radix-ui/react-dialog";

const sheet = cva({
  base: "fixed z-foreground gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out",
  defaultVariants: {
    side: "right",
  },
  variants: {
    side: {
      bottom:
        "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
      left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
      right:
        "inset-y-0 right-0 h-full w-3/4  border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
      top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
    },
  },
});

export const SheetContent = forwardRef<
  ElementRef<typeof Content>,
  ComponentPropsWithoutRef<typeof Content> & VariantProps<typeof sheet>
>(({ side = "right", className, children, ...props }, ref) => (
  <Portal>
    <SheetOverlay />
    <Content className={sheet({ className, side })} ref={ref} {...props}>
      {children}
      <Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
        <X aria-hidden className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </Close>
    </Content>
  </Portal>
));

export const SheetDescription = forwardRef<
  ElementRef<typeof Description>,
  ComponentPropsWithoutRef<typeof Description>
>(({ className, ...props }, ref) => (
  <Description
    className={cx("text-sm text-muted-foreground", className)}
    ref={ref}
    {...props}
  />
));

export const SheetFooter = ({
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

export const SheetHeader = ({
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) => (
  <div
    className={cx("flex flex-col gap-2 text-center sm:text-left", className)}
    {...props}
  />
);

export const SheetOverlay = forwardRef<
  ElementRef<typeof Overlay>,
  ComponentPropsWithoutRef<typeof Overlay>
>(({ className, ...props }, ref) => (
  <Overlay
    className={cx(
      "fixed inset-0 z-foreground bg-background bg-opacity-80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className,
    )}
    ref={ref}
    {...props}
  />
));

export const SheetTitle = forwardRef<
  ElementRef<typeof Title>,
  ComponentPropsWithoutRef<typeof Title>
>(({ className, ...props }, ref) => (
  <Title
    className={cx("text-lg font-semibold text-foreground", className)}
    ref={ref}
    {...props}
  />
));

SheetContent.displayName = Content.displayName;
SheetDescription.displayName = Description.displayName;
SheetOverlay.displayName = Overlay.displayName;
SheetTitle.displayName = Title.displayName;
