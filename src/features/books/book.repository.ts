import { DbType } from "@/db";
import { authors, bookTable, categories, newBook } from "@/db/shema";
import { eq } from "drizzle-orm";

export class BookRepository {
  constructor(private readonly db: DbType) {}

  async create(data: newBook) {
    // 1. Find or Create Category
    let category = await this.db.query.categories.findFirst({
      where: eq(categories.name, data.categoryName),
    });

    if (!category) {
      [category] = await this.db
        .insert(categories)
        .values({ name: data.categoryName })
        .returning();
    }

    // 2.Find or Create author
    let author = await this.db.query.authors.findFirst({
      where: eq(authors.name, data.categoryName),
    });

    // Check author
    if (!author) {
      [author] = await this.db
        .insert(authors)
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

  async findAll() {
    return this.db
      .select({
        bookId: bookTable.bookId,
        title: bookTable.title,
        description: bookTable.description,
        price: bookTable.price,
        stock: bookTable.stock,
        categoryName: categories.name,
        authorName: authors.name,
      })
      .from(bookTable)
      .leftJoin(categories, eq(bookTable.categoryId, categories.id))
      .leftJoin(authors, eq(bookTable.authorId, authors.id));
  }

  async findById(_bookId: number) {
    const [book] = await this.db
      .select({
        bookId: bookTable.bookId,
        title: bookTable.title,
        description: bookTable.description,
        price: bookTable.price,
        stock: bookTable.stock,
        categoryName: categories.name,
        authorName: authors.name,
      })
      .from(bookTable)
      .leftJoin(categories, eq(bookTable.categoryId, categories.id))
      .leftJoin(authors, eq(bookTable.authorId, authors.id))
      .where(eq(bookTable.bookId, _bookId));
    return book;
  }

  async update(bookId: number, date: Partial<newBook>) {
    const [book] = await this.db
      .update(bookTable)
      .set(date)
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
