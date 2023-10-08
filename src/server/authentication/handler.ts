import NextAuth from "next-auth";

import { configuration } from "./configuration";

const handler = NextAuth(configuration) as (
  request: Request,
) => Response | Promise<Response>;

export { handler as GET, handler as POST };
