import type { HTMLAttributes } from "react";

import { Image, type ImageProps } from "@/components/image";

import type { User } from "@/types";

import { cva, type VariantProps } from "@/utilities/classname";

export type AvatarProps = HTMLAttributes<HTMLDivElement> &
  Pick<ImageProps, "sizes"> &
  VariantProps<typeof avatar> & {
    user?: Pick<User, "image" | "name">;
  };

const avatar = cva({
  base: "relative flex overflow-hidden rounded-full bg-zinc-100 text-zinc-300",
  defaultVariants: {
    rounded: true,
  },
  variants: {
    rounded: {
      false: "",
      true: "rounded-full",
    },
  },
});

export const Avatar = ({
  className,
  rounded,
  sizes,
  user,
  ...props
}: AvatarProps) => (
  <span className={avatar({ className, rounded })} {...props}>
    {user?.image ? (
      <Image
        alt={user.name ?? ""}
        className="absolute object-cover"
        fill
        quality={100}
        src={user.image}
        sizes={sizes}
      />
    ) : (
      <svg
        aria-hidden
        className="h-full w-full"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    )}
  </span>
);
