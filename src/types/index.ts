export interface BookType {
  bookId: number;
  title: string;
  description: string;
  price: string;
  stock: number;
  categoryName: string;
  authorName: string;
}

export interface AuthorType {
  id: number;
  name: string;
  bio: string;
}

export interface CategoriesType {
  id: number;
  name: string;
}
