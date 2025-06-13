import { BookSchemaValidation } from "@/db/types/book.type";
import { BookType } from "@/types";

interface BookResponse {
  items: BookType[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export async function createBook(values: BookSchemaValidation) {
  const response = await fetch(`/api/books`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  if (!response.ok) {
    throw new Error("Failed to create book");
  }

  return response.json();
}

export async function fetchBooks(
  page: number,
  limit: number,
): Promise<BookResponse> {
  const response = await fetch(`/api/books?page=${page}&limit=${limit}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) throw new Error("Failed to fetch books");
  const json = await response.json();
  return json.data;
}

export async function updateBook(updatedBook: BookType) {
  const response = await fetch(`/api/books/${updatedBook.bookId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...updatedBook,
      // Convert Types Before Sending the Payload
      stock: Number(updatedBook.stock),
    }),
  });
  if (!response.ok) throw new Error("Failed to update book");
  const json = await response.json();
  return json.data;
}

export async function deletdBook(bookId: number) {
  const response = await fetch(`/api/books/${bookId}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to deteled book");
  return response.json();
}
