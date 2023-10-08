import type { AdapterAccount } from "next-auth/adapters";

import { relations } from "drizzle-orm";
import {
  boolean,
  index,
  integer,
  pgTable,
  text,
  timestamp,
  unique,
  varchar,
} from "drizzle-orm/pg-core";

import { generateId, ID_LENGTH } from "../../utilities/id";

const foreignKey = (name: string) => varchar(name, { length: ID_LENGTH });

const id = varchar("id", { length: ID_LENGTH })
  .primaryKey()
  .$defaultFn(generateId);

const advancement = varchar("advancement", {
  enum: ["advanced", "beginner", "expert", "intermediate"],
});

export const accounts = pgTable(
  "accounts",
  {
    accessToken: text("access_token"),
    expiresAt: integer("expires_at"),
    idToken: text("id_token"),
    id,
    provider: text("provider").notNull(),
    providerAccountId: text("provider_account_id").notNull(),
    refreshToken: text("refresh_token"),
    scope: text("scope"),
    sessionState: text("session_state"),
    tokenType: text("token_type"),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
  },
  (account) => ({
    unique: unique().on(account.provider, account.providerAccountId),
    userIdIndex: index("user_id_index").on(account.userId),
  }),
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
}));

export const chats = pgTable(
  "chats",
  {
    id,
    projectId: foreignKey("project_id")
      .notNull()
      .references(() => projects.id),
    userId: foreignKey("user_id").references(() => users.id),
    isMain: boolean("is_main").default(false),
  },
  (chat) => ({
    projectIdIndex: index("project_id_index").on(chat.projectId),
    userIdIndex: index("user_id_index").on(chat.userId),
  }),
);

export const chatsRelations = relations(chats, ({ many, one }) => ({
  messages: many(messages),
  project: one(projects, {
    fields: [chats.projectId],
    references: [projects.id],
  }),
  user: one(users, {
    fields: [chats.userId],
    references: [users.id],
  }),
}));

export const messages = pgTable(
  "messages",
  {
    chatId: foreignKey("chat_id")
      .notNull()
      .references(() => chats.id),
    createdAt: timestamp("created_at", {
      mode: "date",
      withTimezone: true,
    }).defaultNow(),
    id,
    message: text("message").notNull(),
    userId: foreignKey("user_id")
      .notNull()
      .references(() => users.id),
  },
  (message) => ({
    chatIdIndex: index("chat_id_index").on(message.chatId),
    userIdIndex: index("user_id_index").on(message.userId),
  }),
);

export const messagesRelations = relations(messages, ({ one }) => ({
  chat: one(chats, {
    fields: [messages.chatId],
    references: [chats.id],
  }),
  user: one(users, {
    fields: [messages.userId],
    references: [users.id],
  }),
}));

export const projects = pgTable("projects", {
  createdAt: timestamp("created_at", {
    mode: "date",
    withTimezone: true,
  }).defaultNow(),
  description: text("description").notNull(),
  id,
  image: text("image"),
  name: text("name").notNull(),
});

export const projectsRelations = relations(projects, ({ many, one }) => ({
  chats: many(chats),
  projectSkills: many(projectSkills),
  userComments: many(userComments),
  userProjects: many(userProjects),
}));

export const projectSkills = pgTable(
  "project_skills",
  {
    advancement,
    id,
    projectId: foreignKey("project_id")
      .notNull()
      .references(() => projects.id),
    skillId: foreignKey("skill_id")
      .notNull()
      .references(() => skills.id),
  },
  (projectSkill) => ({
    projectIdIndex: index("project_id_index").on(projectSkill.projectId),
    skillIdIndex: index("skill_id_index").on(projectSkill.skillId),
  }),
);

export const projectSkillsRelations = relations(projectSkills, ({ one }) => ({
  project: one(projects, {
    fields: [projectSkills.projectId],
    references: [projects.id],
  }),
  skill: one(skills, {
    fields: [projectSkills.skillId],
    references: [skills.id],
  }),
}));

export const sessions = pgTable(
  "session",
  {
    expires: timestamp("expires", { mode: "date" }).notNull(),
    id,
    sessionToken: text("session_token").notNull().unique(),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
  },
  (session) => ({
    userIdIndex: index("user_id_index").on(session.userId),
  }),
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));

export const skills = pgTable("skills", {
  id,
  name: text("name").notNull().unique(),
});

export const skillsRelations = relations(skills, ({ many }) => ({
  projectSkills: many(projectSkills),
  userSkills: many(userSkills),
}));

export const softSkills = pgTable("soft_skills", {
  id,
  name: text("name").notNull().unique(),
});

export const softSkillsRelations = relations(skills, ({ many }) => ({
  userSoftSkills: many(userSoftSkills),
}));

export const users = pgTable("users", {
  bio: text("bio"),
  email: varchar("email", { length: 255 }).notNull(),
  emailVerified: timestamp("email_verified", {
    mode: "date",
    withTimezone: true,
  }),
  id,
  image: text("image"),
  name: varchar("name", { length: 191 }),
  walkthrough: boolean("walkthrough").default(true),
});

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  chats: many(chats),
  messages: many(messages),
  projects: many(projects),
  sessions: many(sessions),
  userComments: many(userComments),
  userProjects: many(userProjects),
  userSkills: many(userSkills),
  userSoftSkills: many(userSoftSkills),
}));

export const userComments = pgTable(
  "user_comments",
  {
    comment: text("comment").notNull(),
    id,
    projectId: foreignKey("project_id")
      .notNull()
      .references(() => projects.id),
    type: varchar("type", { enum: ["pro", "con"], length: 3 }).notNull(),
    userId: foreignKey("user_id")
      .notNull()
      .references(() => users.id),
  },
  (userComment) => ({
    projectIdIndex: index("project_id_index").on(userComment.projectId),
    userIdIndex: index("user_id_index").on(userComment.userId),
  }),
);

export const userCommentsRelations = relations(userComments, ({ one }) => ({
  project: one(projects, {
    fields: [userComments.projectId],
    references: [projects.id],
  }),
  user: one(users, {
    fields: [userComments.userId],
    references: [users.id],
  }),
}));

export const userProjects = pgTable(
  "user_projects",
  {
    id,
    projectId: foreignKey("project_id")
      .notNull()
      .references(() => projects.id),
    role: varchar("role", { length: 191 }).notNull(),
    userId: foreignKey("user_id")
      .notNull()
      .references(() => users.id),
    isLeader: boolean("is_leader").default(false),
  },
  (userProject) => ({
    projectIdIndex: index("project_id_index").on(userProject.projectId),
    unique: unique().on(userProject.projectId, userProject.userId),
    userIdIndex: index("user_id_index").on(userProject.userId),
  }),
);

export const userProjectsRelations = relations(userProjects, ({ one }) => ({
  project: one(projects, {
    fields: [userProjects.projectId],
    references: [projects.id],
  }),
  user: one(users, {
    fields: [userProjects.userId],
    references: [users.id],
  }),
}));

export const userSkills = pgTable(
  "user_skills",
  {
    advancement,
    id,
    skillId: foreignKey("skill_id")
      .notNull()
      .references(() => skills.id),
    userId: foreignKey("user_id")
      .notNull()
      .references(() => users.id),
    wantToLearn: boolean("want_to_learn").default(false),
  },
  (userSkill) => ({
    skillIdIndex: index("skill_id_index").on(userSkill.skillId),
    unique: unique().on(userSkill.skillId, userSkill.userId),
    userIdIndex: index("user_id_index").on(userSkill.userId),
  }),
);

export const userSkillsRelations = relations(userSkills, ({ one }) => ({
  skill: one(skills, {
    fields: [userSkills.skillId],
    references: [skills.id],
  }),
  user: one(users, {
    fields: [userSkills.userId],
    references: [users.id],
  }),
}));

export const userSoftSkills = pgTable(
  "user_soft_skills",
  {
    id,
    softSkillId: foreignKey("soft_skill_id")
      .notNull()
      .references(() => softSkills.id),
    userId: foreignKey("user_id")
      .notNull()
      .references(() => users.id),
  },
  (userSoftSkill) => ({
    softSkillIdIndex: index("soft_skill_id_index").on(
      userSoftSkill.softSkillId,
    ),
    userIdIndex: index("user_id_index").on(userSoftSkill.userId),
  }),
);

export const userSoftSkillsRelations = relations(userSoftSkills, ({ one }) => ({
  softSkill: one(softSkills, {
    fields: [userSoftSkills.softSkillId],
    references: [softSkills.id],
  }),
  user: one(users, {
    fields: [userSoftSkills.userId],
    references: [users.id],
  }),
}));

export const verificationTokens = pgTable(
  "verification_token",
  {
    expires: timestamp("expires", { mode: "date" }).notNull(),
    id,
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
  },
  (verificationToken) => ({
    unique: unique().on(verificationToken.identifier, verificationToken.token),
  }),
);
