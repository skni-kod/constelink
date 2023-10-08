import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from "react";

import { cx } from "@/utilities/classname";

export const Card = forwardRef<
  ElementRef<"div">,
  ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    className={cx(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className,
    )}
    ref={ref}
    {...props}
  />
));

export const CardContent = forwardRef<
  ElementRef<"div">,
  ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div className={cx("p-6 pt-0", className)} ref={ref} {...props} />
));

export const CardDescription = forwardRef<
  ElementRef<"p">,
  ComponentPropsWithoutRef<"p">
>(({ className, ...props }, ref) => (
  <p
    className={cx("text-sm text-muted-foreground", className)}
    ref={ref}
    {...props}
  />
));

export const CardFooter = forwardRef<
  ElementRef<"div">,
  ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    className={cx("flex items-center p-6 pt-0", className)}
    ref={ref}
    {...props}
  />
));

export const CardHeader = forwardRef<
  ElementRef<"div">,
  ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    className={cx("flex flex-col gap-1.5 p-6", className)}
    ref={ref}
    {...props}
  />
));

export const CardTitle = forwardRef<
  ElementRef<"h3">,
  ComponentPropsWithoutRef<"h3">
>(({ className, ...props }, ref) => (
  <h3
    className={cx(
      "text-2xl font-semibold leading-none tracking-tight",
      className,
    )}
    ref={ref}
    {...props}
  />
));

Card.displayName = "Card";
CardContent.displayName = "CardContent";
CardDescription.displayName = "CardDescription";
CardFooter.displayName = "CardFooter";
CardHeader.displayName = "CardHeader";
CardTitle.displayName = "CardTitle";
