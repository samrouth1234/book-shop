import { bookTable, newBookSchema } from "@/db/shema";

import { z } from "zod";

export type Book = (typeof bookTable)["$inferSelect"];
export type NewBook = z.infer<typeof newBookSchema>;
