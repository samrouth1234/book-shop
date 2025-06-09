import {
  integer,
  numeric,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

import { categories } from "./categories";
import { authors } from "./authors";
import { z } from "zod";

export const bookTable = pgTable("books", {
  bookId: serial("bookId").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  stock: integer("stock").notNull(),
  categoryId: integer("category_id").references(() => categories.id),
  authorId: integer("author_id").references(() => authors.id),

  // New fields for file paths/URLs
  documentPath: text("document_path"), // Stores the path to the DOCX/PDF file
  thumbnailPath: text("thumbnail_path"), // Stores the path to the thumbnail image

  createdAt: timestamp("created_at").defaultNow(),
});

// 😒 Define a Zod schema for a new book
export const newBookSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  price: z.string(),
  stock: z.number(),
  categoryName: z.string(),
  authorName: z.string(),
  createdAt: z.date().optional(),
});

export type newBook = z.infer<typeof newBookSchema>;
