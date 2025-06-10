import { DbType } from "@/db";
import { CategoryRepository } from "./category.repository";
import { ne } from "drizzle-orm";
import { newCategory } from "@/db/shema";

export class CategoryService {
  private readonly categoryRepository: CategoryRepository;

  constructor(private readonly dbInstance: DbType) {
    this.categoryRepository = new CategoryRepository(this.dbInstance);
  }

  // Create Category
  async create(data: newCategory) {
    return this.categoryRepository.create(data);
  }

  // Find all category
  async getAll(page: number = 1, limit: number = 10) {
    const offset = (page - 1) * limit;
    return this.categoryRepository.findAll({ limit, offset });
  }

  // Find categroy by id
  async getById(categoryId: number) {
    return this.categoryRepository.findById(categoryId);
  }

  // Update category id
  async update(categoryId: number, data: Partial<newCategory>) {
    return this.categoryRepository.update(categoryId, data);
  }

  // Deleted category id
  async deleted(categoryId: number) {
    return this.categoryRepository.deleted(categoryId);
  }
}
