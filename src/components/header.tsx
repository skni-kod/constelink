"use client";

import { useEffect, useState } from "react";

import type { Session } from "next-auth";
import { signOut } from "next-auth/react";

import { Avatar } from "@/components/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/dropdown-menu";
import { ConstelinkIcon } from "@/components/icons/constelink";
import { Link } from "@/components/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/navigation-menu";

import { environment } from "@/environment.mjs";

import { useSessionUser } from "@/utilities/authentication";
import { cx } from "@/utilities/classname";

export type HeaderProps = {
  initialUser?: Session["user"];
};

export const Header = ({ initialUser }: HeaderProps) => {
  const user = useSessionUser(initialUser);

  const [top, setTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setTop(window.scrollY === 0);
    };

    document.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => document.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cx(
        "fixed left-0 right-0 top-0 z-header border-b bg-background transition-colors duration-500 dark:transition",
        top
          ? "border-opacity-0 bg-opacity-0"
          : "border-opacity-100 bg-opacity-80 backdrop-blur-sm backdrop-saturate-[1.8]",
      )}
    >
      <div className="container flex h-16 items-center">
        <Link
          className="flex items-center gap-3 font-display text-2xl"
          href="/"
        >
          <ConstelinkIcon className="h-8 w-8" />
          {environment.NEXT_PUBLIC_APPLICATION_NAME.toLowerCase()}
        </Link>
        <NavigationMenu className="ml-auto">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink href="/projects">Projects</NavigationMenuLink>
            </NavigationMenuItem>
            {!user && (
              <NavigationMenuItem>
                <NavigationMenuLink href="/sign-in">Sign in</NavigationMenuLink>
              </NavigationMenuItem>
            )}
          </NavigationMenuList>
        </NavigationMenu>
        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger className="ml-4">
              <Avatar className="h-8 w-8" user={user} />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="mt-2">
              <DropdownMenuItem asChild>
                <Link href={`/users/${user.id}`}>Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/users/${user.id}/projects`}>My projects</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => void signOut()}>
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
};
