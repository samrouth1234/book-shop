import { z } from "zod";

export const CategoriesSchemaValidation = z.object({
  name: z.string().min(1, {
    message: "Name is requried",
  })
});

export type CategoriesSchemaValidation = z.infer<typeof CategoriesSchemaValidation>;
