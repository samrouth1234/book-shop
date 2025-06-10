import { DbType } from "@/db";
import { authorTable, newAuthor } from "@/db/shema";
import { count, eq } from "drizzle-orm";

export class AuthorRepository {
  constructor(private readonly db: DbType) {}

  // Create author
  async create(data: newAuthor) {
    const [author] = await this.db
      .insert(authorTable)
      .values(data)
      .returning();

    return author;
  }

  // Find all author
  async findAll({ limit, offset }: { limit: number; offset: number }) {
    const [authors] = await this.db
      .select()
      .from(authorTable)
      .limit(limit)
      .offset(offset);

    const [{ total }] = await this.db
      .select({ total: count() })
      .from(authorTable);

    return { authors, totalAuthors: Number(total) };
  }

  // Find author by id
  async findById(authorId: number) {
    const [author] = await this.db
      .select()
      .from(authorTable)
      .where(eq(authorTable.id, authorId));

    return author;
  }

  // Update author
  async update(authorId: number, data: Partial<newAuthor>) {
    const [author] = await this.db
      .update(authorTable)
      .set(data)
      .where(eq(authorTable.id, authorId))
      .returning();

    return author;
  }

  // Deleted author by id
  async deleted(bookId: number) {
    const [deletedAuthor] = await this.db
      .delete(authorTable)
      .where(eq(authorTable.id, bookId))
      .returning();
    
    return deletedAuthor;
  }
}
