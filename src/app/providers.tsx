"use client";

import { useState, type ReactNode } from "react";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "sonner";

import { api } from "@/api";
import { createClient } from "@/api/client";

export type ProvidersProps = {
  children: ReactNode;
};

export const Providers = ({ children }: ProvidersProps) => {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() => createClient());

  return (
    <api.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            disableTransitionOnChange
            defaultTheme="dark"
          >
            {children}
            <Toaster />
            <ReactQueryDevtools />
          </ThemeProvider>
        </SessionProvider>
      </QueryClientProvider>
    </api.Provider>
  );
};
