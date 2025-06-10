import { pgTable, serial, text } from "drizzle-orm/pg-core";
import { z } from "zod";

export const categoriesTable = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
});

// 😒 Define a Zod schema for a new author
export const newCategorySchema = z.object({
  name: z.string(),
  bio: z.string().optional(),
});

export type newCategory = z.infer<typeof newCategorySchema>;
