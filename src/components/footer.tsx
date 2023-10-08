"use client";

import { useTheme } from "next-themes";

import { Monitor, Moon, Sun } from "lucide-react";

import { ConstelinkIcon } from "@/components/icons/constelink";
import { Link } from "@/components/link";

import { environment } from "@/environment.mjs";

import { cx } from "@/utilities/classname";
import { typography } from "@/utilities/typography";

export const Footer = () => {
  const { setTheme, theme } = useTheme();

  return (
    <footer className="mt-32">
      <div className="container flex flex-col gap-4 py-12">
        <div className="flex items-center justify-between">
          <Link
            className="flex items-center gap-3 font-display text-2xl"
            href="/"
          >
            <ConstelinkIcon className="h-8 w-8" />
            {environment.NEXT_PUBLIC_APPLICATION_NAME.toLowerCase()}
          </Link>
          <div className="flex rounded-full border-2 border-accent p-1 text-muted-foreground">
            <button
              className={cx(
                "rounded-full p-2 transition hover:text-foreground",
                theme === "light" && "bg-accent text-accent-foreground",
              )}
              onClick={() => setTheme("light")}
            >
              <Sun className="h-4 w-4" />
            </button>
            <button
              className={cx(
                "rounded-full p-2 transition hover:text-foreground",
                theme === "system" && "bg-accent text-accent-foreground",
              )}
              onClick={() => setTheme("system")}
            >
              <Monitor className="h-4 w-4" />
            </button>
            <button
              className={cx(
                "rounded-full p-2 transition hover:text-foreground",
                theme === "dark" && "bg-accent text-accent-foreground",
              )}
              onClick={() => setTheme("dark")}
            >
              <Moon className="h-4 w-4" />
            </button>
          </div>
        </div>
        <p className={typography({ variant: "muted" })}>
          {new Date().getFullYear()} &copy;{" "}
          {environment.NEXT_PUBLIC_APPLICATION_NAME}
        </p>
      </div>
    </footer>
  );
};
