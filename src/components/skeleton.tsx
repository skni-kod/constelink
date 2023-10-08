import type { ComponentPropsWithoutRef } from "react";

import { cx } from "@/utilities/classname";

export type SkeletonProps = ComponentPropsWithoutRef<"div">;

export const Skeleton = ({ className, ...props }: SkeletonProps) => (
  <div
    className={cx("animate-pulse rounded-md bg-muted", className)}
    {...props}
  />
);
