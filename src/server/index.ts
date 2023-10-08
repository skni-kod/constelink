import { getSession } from "@/server/authentication/session";

import { applicationRouter } from "./router";

export const createServer = async () =>
  applicationRouter.createCaller({
    session: await getSession(),
  });
