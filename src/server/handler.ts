import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

import { applicationRouter as router } from "./router";
import { createContext } from "./trpc";

const handler = (request: Request) =>
  fetchRequestHandler({
    createContext,
    endpoint: "/api/trpc",
    req: request,
    router,
  });

export { handler as GET, handler as POST };
