import { DbType } from "@/db";

import { BookRepository } from "./book.repository";
import { NewBook } from "./book.types";

export class BookService {
  private readonly bookRepository: BookRepository;

  constructor(private readonly dbInstance: DbType) {
    this.bookRepository = new BookRepository(this.dbInstance);
  }

  async create(data: NewBook) {
    return this.bookRepository.create(data);
  }

  async getAll(page: number = 1, limit: number = 10) {
    const offset = (page - 1) * limit;
    return this.bookRepository.findAll({ limit, offset });
  }

  async getById(bookId: number) {
    return this.bookRepository.findById(bookId);
  }

  async update(bookId: number, data: Partial<NewBook>) {
    return this.bookRepository.update(bookId, data);
  }

  async delete(bookId: number) {
    return this.bookRepository.deleted(bookId);
  }
}
