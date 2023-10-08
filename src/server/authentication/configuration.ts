import type { AuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

import { environment } from "@/environment.mjs";

import { adapter } from "./adapter";

export const configuration: AuthOptions = {
  adapter,
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
  },
  pages: {
    error: "/sign-in",
    signIn: "/sign-in",
  },
  providers: [
    GitHubProvider({
      clientId: environment.GITHUB_CLIENT_ID,
      clientSecret: environment.GITHUB_CLIENT_SECRET,
    }),
    GoogleProvider({
      clientId: environment.GOOGLE_CLIENT_ID,
      clientSecret: environment.GOOGLE_CLIENT_SECRET,
    }),
    // CredentialsProvider({
    //   authorize: async (credentials) => {
    //     if (!credentials?.email || !credentials?.password) {
    //       throw new AuthenticationError("credentials-required");
    //     }

    //     const user = await database.query.users.findFirst({
    //       where: (user, { eq }) => eq(user.email, credentials.email),
    //     });

    //     if (!user) {
    //       throw new AuthenticationError("email-invalid");
    //     }

    //     if (!(await verify(user.password, credentials.password))) {
    //       throw new AuthenticationError("password-invalid");
    //     }

    //     return {
    //       email: user.email,
    //       id: user.id,
    //       image: user.image ?? undefined,
    //       name: user.name,
    //     };
    //   },
    //   credentials: {
    //     email: {
    //       type: "email",
    //     },
    //     password: {
    //       type: "password",
    //     },
    //   },
    //   id: "credentials",
    // }),
  ],
  session: {
    strategy: "database",
  },
};
