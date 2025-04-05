import * as pg from "drizzle-orm/pg-core";

/**
 * Hypothetical scenario:
 * 
 * - Shared users across multiple apps (sharing same database, shared user access)
 * - Public Schema: shared users and other auth related tables
 * - App-1 Schema: app-1 specific tables
 * - App-2 Schema: app-2 specific tables
 */


export const user = pg.pgTable("user", {
    id: pg.text("id").primaryKey(),
    name: pg.text("name").notNull(),
  });
  


const app1Schema = pg.pgSchema("app-1");

export const tasks = app1Schema.table("tasks", {
    id: pg.text("id").primaryKey(),
    title: pg.text("title").notNull(),
    completed: pg.boolean("completed").notNull(),
  });


const app2Schema = pg.pgSchema("app-2");

export const posts = app2Schema.table("posts", {
    id: pg.text("id").primaryKey(),
    title: pg.text("title").notNull(),
  });
  
  
// import { relations } from "drizzle-orm";
// import { pgTable, text, jsonb } from "drizzle-orm/pg-core";

// export const users = pgTable("user", {
//   id: text("id").primaryKey(),
//   name: text("name"),
// });

// export const usersRelations = relations(users, ({ many }) => ({
//   posts: many(posts),
// }));

// export const posts = pgTable("post", {
//   id: text("id").primaryKey(),
//   // this JSON type will be passed to Zero
//   content: jsonb("content").$type<{ textValue: string }>().notNull(),
//   authorId: text("author_id").references(() => users.id),
// });

// export const postsRelations = relations(posts, ({ one }) => ({
//   author: one(users, {
//     fields: [posts.authorId],
//     references: [users.id],
//   }),
// }));