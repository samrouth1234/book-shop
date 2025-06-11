import { DbType } from "@/db";
import { categoriesTable, newCategory } from "@/db/shema";
import { count, eq } from "drizzle-orm";

export class CategoryRepository {
  constructor(private readonly db: DbType) {}

  // Create category
  async create(data: newCategory) {
    const [category] = await this.db
      .insert(categoriesTable)
      .values(data)
      .returning();

    return category;
  }

  // Find all category
  async findAll({ limit, offset }: { limit: number; offset: number }) {
    const categorys = await this.db
      .select()
      .from(categoriesTable)
      .limit(limit)
      .offset(offset);

    const [{ total }] = await this.db
      .select({ total: count() })
      .from(categoriesTable);

    return { categorys, totalCategorys: Number(total) };
  }

  // Find category by id
  async findById(categoryId: number) {
    const [category] = await this.db
      .select()
      .from(categoriesTable)
      .where(eq(categoriesTable.id, categoryId));

    return category;
  }

  // Update categoy
  async update(categoryId: number, data: Partial<newCategory>) {
    const [category] = await this.db
      .update(categoriesTable)
      .set(data)
      .where(eq(categoriesTable.id, categoryId))
      .returning();

    return category;
  }

  async deleted(categoryId: number) {
    const [deletedCategory] = await this.db
      .delete(categoriesTable)
      .where(eq(categoriesTable.id, categoryId))
      .returning();

    return deletedCategory;
  }
}
