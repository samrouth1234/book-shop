import { CategoriesSchemaValidation } from "@/db/types/categories.type";
import { CategoriesType } from "@/types";

interface CategoriesResponse {
  items: CategoriesType[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export async function createCategories(values: CategoriesSchemaValidation) {
  const response = await fetch(`/api/categories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  if (!response.ok) {
    throw new Error("Failed to create categories");
  }

  return response.json();
}

export async function fetchCategories(
  page: number,
  limit: number,
): Promise<CategoriesResponse> {
  const response = await fetch(`/api/categories?page=${page}&limit=${limit}`);
  if (!response.ok) throw new Error("Failed to fetch categories");
  const json = await response.json();
  return json.data;
}

export async function deletedCategoies(categoriesId: number) {
  const response = await fetch(`/api/categories/${categoriesId}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to deteled categories");
  return response.json();
}

export async function updatedCategories(updatedCategories: CategoriesType) {
  const response = await fetch(`/api/categories/${updatedCategories.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...updatedCategories,
    }),
  });
  if (!response.ok) throw new Error("Failed to update categories");
  return response.json();
}
