import { z } from "zod";

export const AuthorSchemaValidation = z.object({
  name: z.string().min(1, {
    message: "Name is requried",
  }),
  bio: z.string().optional(),
});

export type AuthorSchemaValidation = z.infer<typeof AuthorSchemaValidation>;
