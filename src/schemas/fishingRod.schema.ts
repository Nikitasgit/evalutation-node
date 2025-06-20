import { integer, pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { users } from "./user.schema";

export const fishingRods = pgTable("fishing_rods", {
  id: uuid("id").defaultRandom().primaryKey(),
  catchRate: integer("catch_rate").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  createdById: uuid("created_by_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});
