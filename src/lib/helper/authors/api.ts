import { AuthorSchemaValidation } from "@/db/types/author.type";
import { AuthorType } from "@/types";

interface AuthorResponse {
  items: AuthorType[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export async function createAuthor(values: AuthorSchemaValidation) {
  const response = await fetch(`/api/authors`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  if (!response.ok) {
    throw new Error("Failed to create author");
  }

  return response.json();
}

export async function fetchAuthors(
  page: number,
  limit: number,
): Promise<AuthorResponse> {
  const response = await fetch(`/api/authors?page=${page}&limit=${limit}`);
  if (!response.ok) throw new Error("Failed to fetch authors");
  const json = await response.json();
  return json.data;
}

export async function deletedAuthor(authorId: number) {
  const response = await fetch(`/api/authors/${authorId}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to deteled author");
  return response.json();
}

export async function updateAuthor(updatedAuthor: AuthorType) {
  const response = await fetch(`/api/authors/${updatedAuthor.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...updatedAuthor,
    }),
  });
  if (!response.ok) throw new Error("Failed to update author");
  return response.json();
}
