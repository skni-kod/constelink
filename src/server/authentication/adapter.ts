import type { Adapter } from "next-auth/adapters";

import { and, eq } from "drizzle-orm";

import { database } from "@/server/database";
import {
  accounts,
  sessions,
  users,
  verificationTokens,
} from "@/server/database/schema";

export const adapter = {
  createSession: async (session) =>
    (await database.insert(sessions).values(session).returning())[0]!,
  createUser: async (data) =>
    (await database.insert(users).values(data).returning())[0]!,
  createVerificationToken: async (token) =>
    (await database.insert(verificationTokens).values(token).returning())[0]!,
  deleteSession: async (sessionToken) => {
    await database
      .delete(sessions)
      .where(eq(sessions.sessionToken, sessionToken))
      .returning();
  },
  deleteUser: async (id) =>
    (await database.delete(users).where(eq(users.id, id)).returning())[0] ??
    null,
  getSessionAndUser: async (sessionToken) => {
    const sessionWithUser = await database.query.sessions.findFirst({
      where: (session, { eq }) => eq(session.sessionToken, sessionToken),
      with: {
        user: true,
      },
    });

    if (!sessionWithUser) {
      return null;
    }

    const { user, ...session } = sessionWithUser;

    return {
      session,
      user,
    };
  },
  getUser: async (id) =>
    (await database.query.users.findFirst({
      where: (user, { eq }) => eq(user.id, id),
    })) ?? null,
  getUserByAccount: async (account) =>
    (
      await database.query.accounts.findFirst({
        where: and(
          eq(accounts.providerAccountId, account.providerAccountId),
          eq(accounts.provider, account.provider),
        ),
        with: {
          user: true,
        },
      })
    )?.user ?? null,
  getUserByEmail: async (email) =>
    (await database.query.users.findFirst({
      where: (user, { eq }) => eq(user.email, email),
    })) ?? null,
  linkAccount: async ({
    access_token,
    expires_at,
    id_token,
    refresh_token,
    session_state,
    token_type,
    ...account
  }) => {
    const {
      accessToken,
      expiresAt,
      id,
      idToken,
      provider,
      providerAccountId,
      refreshToken,
      scope,
      sessionState,
      tokenType,
      type,
      userId,
    } = (
      await database
        .insert(accounts)
        .values({
          ...account,
          accessToken: access_token,
          expiresAt: expires_at,
          idToken: id_token,
          refreshToken: refresh_token,
          sessionState: session_state,
          tokenType: token_type,
        })
        .returning()
    )[0]!;

    return {
      access_token: accessToken ?? undefined,
      expires_at: expiresAt ?? undefined,
      id,
      id_token: idToken ?? undefined,
      provider,
      providerAccountId,
      refresh_token: refreshToken ?? undefined,
      scope: scope ?? undefined,
      session_state: sessionState ?? undefined,
      token_type: tokenType ?? undefined,
      type,
      userId,
    };
  },
  updateSession: async (session) =>
    (
      await database
        .update(sessions)
        .set(session)
        .where(eq(sessions.sessionToken, session.sessionToken))
        .returning()
    )[0]!,
  updateUser: async (user) =>
    (
      await database
        .update(users)
        .set(user)
        .where(eq(users.id, user.id))
        .returning()
    )[0]!,
  unlinkAccount: async (account) => {
    await database
      .delete(accounts)
      .where(
        and(
          eq(accounts.providerAccountId, account.providerAccountId),
          eq(accounts.provider, account.provider),
        ),
      )
      .returning();
  },
  useVerificationToken: async ({ identifier, token }) =>
    (
      await database
        .delete(verificationTokens)
        .where(
          and(
            eq(verificationTokens.identifier, identifier),
            eq(verificationTokens.token, token),
          ),
        )
        .returning()
    )[0] ?? null,
} satisfies Adapter;
