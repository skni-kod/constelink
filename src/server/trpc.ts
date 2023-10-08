import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";

import { getSession } from "@/server/authentication/session";

export const createContext = async () => ({
  session: await getSession(),
});

export const {
  middleware,
  procedure: publicProcedure,
  router,
} = initTRPC.context<typeof createContext>().create({
  errorFormatter: ({ error, shape }) => ({
    ...shape,
    data: {
      ...shape.data,
      zodError: error.cause instanceof ZodError ? error.cause.flatten() : null,
    },
  }),
  transformer: superjson,
});

const authenticationMiddleware = middleware(({ ctx: { session }, next }) => {
  if (!session?.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return next({
    ctx: {
      session: {
        ...session,
        user: session.user,
      },
    },
  });
});

export const procedure = publicProcedure.use(authenticationMiddleware);
