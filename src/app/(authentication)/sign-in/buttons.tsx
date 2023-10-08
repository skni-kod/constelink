"use client";

import { signIn } from "next-auth/react";

import { Button } from "@/components/button";
import { GithubIcon } from "@/components/icons/github";
import { GoogleIcon } from "@/components/icons/google";

export const SignInButtons = () => (
  <div className="mt-8 flex w-full flex-col flex-wrap gap-2">
    <Button
      onClick={() =>
        void signIn("github", {
          callbackUrl: "/me",
        })
      }
      size="sm"
    >
      <GithubIcon aria-hidden className="h-4 w-4" />
      Sign in with GitHub
    </Button>
    <Button
      onClick={() =>
        void signIn("google", {
          callbackUrl: "/me",
        })
      }
      size="sm"
    >
      <GoogleIcon aria-hidden className="h-4 w-4" />
      Sign in with Google
    </Button>
  </div>
);
