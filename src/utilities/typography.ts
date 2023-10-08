import { cva } from "@/utilities/classname";

export const typography = cva({
  variants: {
    variant: {
      blockquote: "mt-6 border-l-2 pl-6 italic",
      code: "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
      "heading-1":
        "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
      "heading-2":
        "scroll-m-20 text-3xl font-semibold tracking-tight transition-colors first:mt-0",
      "heading-3": "scroll-m-20 text-2xl font-semibold tracking-tight",
      "heading-4": "scroll-m-20 text-xl font-semibold tracking-tight",
      large: "text-lg font-semibold",
      lead: "text-lg text-muted-foreground sm:text-xl",
      list: "my-6 ml-6 list-disc [&>li]:mt-2",
      muted: "text-sm text-muted-foreground",
      paragraph: "leading-7 [&:not(:first-child)]:mt-6",
      small: "text-sm font-medium leading-none",
    },
  },
});
