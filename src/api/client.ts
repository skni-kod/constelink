import { httpBatchLink, loggerLink } from "@trpc/client";
import superjson from "superjson";

import { environment } from "@/environment.mjs";

import { api } from ".";

const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    return "";
  }

  return environment.NEXT_PUBLIC_BASE_URL;
};

export const createClient = () =>
  api.createClient({
    links: [
      loggerLink({
        enabled: (options) =>
          process.env.NODE_ENV === "development" ||
          (options.direction === "down" && options.result instanceof Error),
      }),
      httpBatchLink({
        url: `${getBaseUrl()}/api/trpc`,
      }),
    ],
    transformer: superjson,
  });
