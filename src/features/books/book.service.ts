import { DbType } from "@/db";
import { BookRepository } from "./book.repository";
import { newBook } from "@/db/shema";

export class BookService {
  private readonly bookRepository: BookRepository;

  constructor(private readonly dbInstance: DbType) {
    this.bookRepository = new BookRepository(this.dbInstance);
  }

  async create(data: newBook) {
    return this.bookRepository.create(data);
  }

  async getAll() {
    return this.bookRepository.findAll();
  }

  async getById(bookId: number) {
    return this.bookRepository.findById(bookId);
  }

  async update(bookId: number, data: Partial<newBook>) {
    return this.bookRepository.update(bookId, data);
  }

  async delete(bookId: number) {
    return this.bookRepository.deleted(bookId);
  }
}
