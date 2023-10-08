import type { ReactNode } from "react";

import { cva } from "@/utilities/classname";

export type LayoutHeroProps = {
  backgroundImage?: ReactNode;
  children?: ReactNode;
  image?: ReactNode;
  title: ReactNode;
};

export const layoutHeroImage = cva({
  base: "object-cover",
  defaultVariants: {
    round: false,
  },
  variants: {
    round: {
      false: "rounded-2xl",
      true: "rounded-full",
    },
    variant: {
      foreground: "shadow-lg",
    },
  },
});

export const LayoutHero = ({
  backgroundImage,
  children,
  image,
  title,
}: LayoutHeroProps) => (
  <main className="grow">
    <section className="relative pt-16">
      {backgroundImage && (
        <div className="absolute bottom-0 left-0 right-0 top-0 overflow-hidden">
          <div className="absolute bottom-0 left-0 right-0 top-0 opacity-50 blur-3xl saturate-[1.8] dark:opacity-25">
            {backgroundImage}
          </div>
          <div className="absolute bottom-0 left-0 right-0 top-0 bg-gradient-to-b from-transparent from-[80%] to-background" />
        </div>
      )}
      <div className="container relative flex h-64 items-center justify-between gap-6 sm:h-[32rem]">
        <h1 className="font-display text-4xl [text-wrap:balance] sm:text-6xl">
          {title}
        </h1>
        <div className="relative hidden h-64 w-64 sm:flex">{image}</div>
      </div>
    </section>
    {children}
  </main>
);
