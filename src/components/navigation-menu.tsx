import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from "react";

import {
  Content,
  Indicator,
  List,
  Link as RadixUiNavigationMenuLink,
  Root,
  Trigger,
  Viewport,
} from "@radix-ui/react-navigation-menu";
import { ChevronDown } from "lucide-react";

import { Link } from "@/components/link";

import { cva, cx } from "@/utilities/classname";

export { Item as NavigationMenuItem } from "@radix-ui/react-navigation-menu";

export const navigationMenuTrigger = cva({
  base: "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
});

export const NavigationMenu = forwardRef<
  ElementRef<typeof Root>,
  ComponentPropsWithoutRef<typeof Root>
>(({ children, className, ...props }, ref) => (
  <Root
    className={cx(
      "relative z-navigation flex max-w-max flex-1 items-center justify-center",
      className,
    )}
    ref={ref}
    {...props}
  >
    {children}
    <NavigationMenuViewport />
  </Root>
));

export const NavigationMenuContent = forwardRef<
  ElementRef<typeof Content>,
  ComponentPropsWithoutRef<typeof Content>
>(({ className, ...props }, ref) => (
  <Content
    className={cx(
      "left-0 top-0 w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute md:w-auto ",
      className,
    )}
    ref={ref}
    {...props}
  />
));

export const NavigationMenuLink = forwardRef<
  ElementRef<typeof Link>,
  ComponentPropsWithoutRef<typeof Link>
>(({ className, ...props }, ref) => (
  <RadixUiNavigationMenuLink asChild>
    <Link
      className={navigationMenuTrigger({ className })}
      ref={ref}
      {...props}
    />
  </RadixUiNavigationMenuLink>
));

export const NavigationMenuList = forwardRef<
  ElementRef<typeof List>,
  ComponentPropsWithoutRef<typeof List>
>(({ className, ...props }, ref) => (
  <List
    className={cx(
      "group flex flex-1 list-none items-center justify-center gap-1",
      className,
    )}
    ref={ref}
    {...props}
  />
));

export const NavigationMenuTrigger = forwardRef<
  ElementRef<typeof Trigger>,
  ComponentPropsWithoutRef<typeof Trigger>
>(({ children, className, ...props }, ref) => (
  <Trigger
    className={navigationMenuTrigger({ className: cx("group", className) })}
    ref={ref}
    {...props}
  >
    {children}{" "}
    <ChevronDown
      className="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180"
      aria-hidden="true"
    />
  </Trigger>
));

export const NavigationMenuViewport = forwardRef<
  ElementRef<typeof Viewport>,
  ComponentPropsWithoutRef<typeof Viewport>
>(({ className, ...props }, ref) => (
  <div className="absolute left-0 top-full flex justify-center">
    <Viewport
      className={cx(
        "origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)]",
        className,
      )}
      ref={ref}
      {...props}
    />
  </div>
));

export const NavigationMenuIndicator = forwardRef<
  ElementRef<typeof Indicator>,
  ComponentPropsWithoutRef<typeof Indicator>
>(({ className, ...props }, ref) => (
  <Indicator
    className={cx(
      "top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in",
      className,
    )}
    ref={ref}
    {...props}
  >
    <div className="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md" />
  </Indicator>
));

NavigationMenu.displayName = Root.displayName;
NavigationMenuContent.displayName = Content.displayName;
NavigationMenuIndicator.displayName = Indicator.displayName;
NavigationMenuLink.displayName = RadixUiNavigationMenuLink.displayName;
NavigationMenuList.displayName = List.displayName;
NavigationMenuTrigger.displayName = Trigger.displayName;
NavigationMenuViewport.displayName = Viewport.displayName;
