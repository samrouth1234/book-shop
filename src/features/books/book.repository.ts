import { DbType } from "@/db";
import { authorTable, bookTable, categoriesTable, newBook } from "@/db/shema";
import { eq, count } from "drizzle-orm";

export class BookRepository {
  constructor(private readonly db: DbType) {}

  async create(data: newBook) {
    // 1. Find or Create Category
    let category = await this.db.query.categoriesTable.findFirst({
      where: eq(categoriesTable.name, data.categoryName),
    });

    if (!category) {
      [category] = await this.db
        .insert(categoriesTable)
        .values({ name: data.categoryName })
        .returning();
    }

    // 2.Find or Create author
    let author = await this.db.query.authorTable.findFirst({
      where: eq(authorTable.name, data.categoryName),
    });

    // Check author
    if (!author) {
      [author] = await this.db
        .insert(authorTable)
        .values({ name: data.authorName })
        .returning();
    }

    // 3. Insert book
    const [book] = await this.db
      .insert(bookTable)
      .values({
        title: data.title,
        description: data.description,
        price: data.price,
        stock: data.stock,
        categoryId: category.id,
        authorId: author.id,
      })
      .returning();

    return book;
  }

  async findAll({ limit, offset }: { limit: number; offset: number }) {
    const books = await this.db
      .select({
        bookId: bookTable.bookId,
        title: bookTable.title,
        description: bookTable.description,
        price: bookTable.price,
        stock: bookTable.stock,
        categoryName: categoriesTable.name,
        authorName: authorTable.name,
      })
      .from(bookTable)
      .leftJoin(categoriesTable, eq(bookTable.categoryId, categoriesTable.id))
      .leftJoin(authorTable, eq(bookTable.authorId, authorTable.id))
      .limit(limit)
      .offset(offset);

    const [{ total }] = await this.db
      .select({ total: count() })
      .from(bookTable);

    return { books, totalBooks: Number(total) };
  }

  async findById(_bookId: number) {
    const [book] = await this.db
      .select({
        bookId: bookTable.bookId,
        title: bookTable.title,
        description: bookTable.description,
        price: bookTable.price,
        stock: bookTable.stock,
        categoryName: categoriesTable.name,
        authorName: authorTable.name,
      })
      .from(bookTable)
      .leftJoin(categoriesTable, eq(bookTable.categoryId, categoriesTable.id))
      .leftJoin(authorTable, eq(bookTable.authorId, authorTable.id))
      .where(eq(bookTable.bookId, _bookId));
    return book;
  }

  async update(bookId: number, data: Partial<newBook>) {
    let authorId: number | undefined = undefined;
    let categoryId: number | undefined = undefined;

    // Look up authorId by name if authorName is provided
    if (data.authorName) {
      const [author] = await this.db
        .select({ id: authorTable.id })
        .from(authorTable)
        .where(eq(authorTable.name, data.authorName));
      if (author) authorId = author.id;
    }

    // Look up categoryId by name if categoryName is provided
    if (data.categoryName) {
      const [category] = await this.db
        .select({ id: categoriesTable.id })
        .from(categoriesTable)
        .where(eq(categoriesTable.name, data.categoryName));
      if (category) categoryId = category.id;
    }

    // Prepare final update object
    const updateData: Partial<newBook> & {
      authorId?: number;
      categoryId?: number;
    } = {
      title: data.title,
      description: data.description,
      price: data.price,
      stock: data.stock,
      ...(authorId !== undefined && { authorId }),
      ...(categoryId !== undefined && { categoryId }),
    };

    const [book] = await this.db
      .update(bookTable)
      .set(updateData)
      .where(eq(bookTable.bookId, bookId))
      .returning();

    return book;
  }

  async deleted(bookId: number) {
    const [deletedBook] = await this.db
      .delete(bookTable)
      .where(eq(bookTable.bookId, bookId))
      .returning();
    return deletedBook;
  }
}
