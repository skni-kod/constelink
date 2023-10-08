import { createTRPCReact } from "@trpc/react-query";
import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";

import type { ApplicationRouter } from "@/server/router";

export type RouterInputs = inferRouterInputs<ApplicationRouter>;
export type RouterOutputs = inferRouterOutputs<ApplicationRouter>;

export const api = createTRPCReact<ApplicationRouter>();
