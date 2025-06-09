import { z } from "zod";

export const BookSchemaValidation = z.object({
  title: z.string().min(1, {
    message: "Title is requried",
  }),
  description: z.string().optional(),
  price: z.string().min(1, {
    message: "Price is requried",
  }),
  stock: z.coerce.number().min(1, {
    message: "Stock is requried",
  }),
  categoryName: z.string().min(1, {
    message: "Category name is requried",
  }),
  authorName: z.string().min(1, {
    message: "Author name is requried",
  }),
});

export interface Books {
  title: string;
  description: string;
  price: string;
  stock: number;
  categoryName: string;
  authorName: string;
}

export type BookSchemaValidation = z.infer<typeof BookSchemaValidation>;
