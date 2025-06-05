import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { users } from "./user.schema";

export const places = pgTable("places", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull().unique(),
  createdById: uuid("created_by_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});
