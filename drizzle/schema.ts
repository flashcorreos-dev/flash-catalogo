import { boolean, int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

export const ORDER_STATUSES = ["pending", "confirmed", "dispatched", "completed", "cancelled"] as const;
export type OrderStatus = (typeof ORDER_STATUSES)[number];

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  phone: varchar("phone", { length: 32 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export const orders = mysqlTable("orders", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  orderCode: varchar("orderCode", { length: 32 }).notNull().unique(),
  status: mysqlEnum("status", [...ORDER_STATUSES]).default("pending").notNull(),
  total: int("total").notNull(),
  items: text("items").notNull(),
  note: text("note"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  deletedAt: timestamp("deletedAt"),
});

export const orderStatusHistory = mysqlTable("orderStatusHistory", {
  id: int("id").autoincrement().primaryKey(),
  orderId: int("orderId").notNull(),
  status: mysqlEnum("status", [...ORDER_STATUSES]).notNull(),
  changedByUserId: int("changedByUserId").notNull(),
  note: text("note"),
  isInternal: boolean("isInternal").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const catalogProducts = mysqlTable("catalogProducts", {
  id: int("id").autoincrement().primaryKey(),
  slug: varchar("slug", { length: 160 }).notNull().unique(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  categorySlug: varchar("categorySlug", { length: 120 }).notNull(),
  categoryLabel: varchar("categoryLabel", { length: 160 }).notNull(),
  brand: varchar("brand", { length: 80 }).notNull(),
  image: text("image").notNull(),
  variants: text("variants").notNull(),
  featured: boolean("featured").default(false).notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const catalogSettings = mysqlTable("catalogSettings", {
  id: int("id").autoincrement().primaryKey(),
  featuredSlugs: text("featuredSlugs").notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type Order = typeof orders.$inferSelect;
export type InsertOrder = typeof orders.$inferInsert;
export type OrderStatusHistory = typeof orderStatusHistory.$inferSelect;
export type CatalogProductRow = typeof catalogProducts.$inferSelect;
export type CatalogSetting = typeof catalogSettings.$inferSelect;
export type InsertOrderStatusHistory = typeof orderStatusHistory.$inferInsert;
