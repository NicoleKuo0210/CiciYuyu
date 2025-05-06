import { sql } from "drizzle-orm";
import {
  index,
  integer,
  pgTable,
  serial,
  varchar,
} from "drizzle-orm/pg-core";

export const productsTable = pgTable(
  "products",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 100 }).notNull(),
    description: varchar("description", { length: 280 }).notNull(),
    price: integer("price").notNull(),
    quantity: integer("quantity").notNull(),
    image: varchar("image", { length: 255 }).notNull().unique(), // URL or path to the image
  },
  (table) => ({
    nameIndex: index("name_index").on(table.name),
  })
);
