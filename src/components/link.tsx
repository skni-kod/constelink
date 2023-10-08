import { forwardRef, type ComponentPropsWithoutRef } from "react";

import {
  default as NextLink,
  type LinkProps as NextLinkProps,
} from "next/link";

export type LinkProps = Omit<
  ComponentPropsWithoutRef<"a">,
  keyof NextLinkProps
> &
  NextLinkProps;

const noreferrer = "noreferrer";

const noReferrerRel = (href: LinkProps["href"], rel: LinkProps["rel"]) => {
  if (
    typeof href === "string" &&
    (href.startsWith("/") || href.startsWith("#"))
  ) {
    return rel;
  }

  if (rel?.split(" ").includes(noreferrer)) {
    return rel;
  }

  return rel ? `${rel} ${noreferrer}` : noreferrer;
};

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ href, rel, ...props }, ref) => (
    <NextLink href={href} ref={ref} rel={noReferrerRel(href, rel)} {...props} />
  ),
);

Link.displayName = NextLink.displayName;
