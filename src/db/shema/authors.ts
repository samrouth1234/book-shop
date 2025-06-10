import { pgTable, serial, text } from "drizzle-orm/pg-core";
import { z } from "zod";

export const authorTable = pgTable("authors", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  bio: text("bio"),
});

// 😒 Define a Zod schema for a new author
export const newAuthorSchema = z.object({
  name: z.string(),
  bio: z.string().optional(),
});

export type newAuthor = z.infer<typeof newAuthorSchema>;
