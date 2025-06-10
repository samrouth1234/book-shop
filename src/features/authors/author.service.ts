import { DbType } from "@/db";
import { AuthorRepository } from "./author.repository";
import { newAuthor } from "@/db/shema";

export class AuthorService {
  private readonly authorRepository: AuthorRepository;

  constructor(private readonly dbInstance: DbType) {
    this.authorRepository = new AuthorRepository(this.dbInstance);
  }

  // Create author
  async create(date: newAuthor) {
    return this.authorRepository.create(date);
  }

  // Find all author
  async getAll(page: number = 1, limit: number = 10) {
    const offset = (page - 1) * limit;
    return this.authorRepository.findAll({ limit, offset });
  }

  // Find author by id
  async getById(authorId: number) {
    return this.authorRepository.findById(authorId);
  }

  // Update author
  async update(authorId: number, data: Partial<newAuthor>) {
    return this.authorRepository.update(authorId, data);
  }

  // Deleted author
  async deleted(authorId: number) {
    return this.authorRepository.deleted(authorId);
  }
}
