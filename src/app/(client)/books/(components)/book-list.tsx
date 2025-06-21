"use client";

import { useSearchParams } from "next/navigation";

import { useQuery } from "@tanstack/react-query";

import { PaginationWithLinks } from "../../(components)/pagination-link";
import CardBook from "./book-card";
import SkeletonBookCard from "./book-card-skeleton";

interface BookType {
  bookId: number;
  title: string;
  description: string;
  price: string;
  stock: number;
  categoryName: string;
  authorName: string;
}

interface BookResponse {
  items: BookType[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

const fetchBooks = async (
  page: number,
  limit: number,
): Promise<BookResponse> => {
  const response = await fetch(`/api/books?page=${page}&limit=${limit}`);
  if (!response.ok) throw new Error("Failed to fetch books");
  const json = await response.json();
  return json.data;
};

export default function ListAllBooks() {
  const searchParam = useSearchParams();
  const page = Number.parseInt(searchParam.get("page") || "1");
  const limit = Number.parseInt(searchParam.get("limit") || "10");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["books", page, limit],
    queryFn: () => fetchBooks(page, limit),
  });
  console.log("data",data);

  if (isLoading) {
    return (
      <section className="grid grid-cols-1 gap-5 md:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <SkeletonBookCard key={index} />
        ))}
      </section>
    );
  }

  if (isError || !data) {
    return (
      <p className="text-center text-red-500">
        Failed to load books. Please try again later.
      </p>
    );
  }

  return (
    <section className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
        {data?.items.map((book) => (
          <CardBook
            key={book.bookId}
            bookId={book.bookId}
            title={book.title}
            description={book.description}
            price={book.price}
            stock={book.stock}
            authorName={book.authorName}
            categoryName={book.categoryName}
          />
        ))}
      </div>
      <PaginationWithLinks
        page={page}
        pageSize={limit}
        totalCount={data.totalPages}
      />
    </section>
  );
}
