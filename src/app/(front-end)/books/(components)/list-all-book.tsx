"use client";

import { useQuery } from "@tanstack/react-query";
import CardBook from "./card-book";
import SkeletonBookCard from "./skeleton-book-card";
import { useSearchParams } from "next/navigation";
import { PaginationWithLinks } from "../../(components)/pagination-link";

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
  books: BookType[];
  totalBooks: number;
}

const fetchBooks = async (
  page: number,
  limit: number
): Promise<BookResponse> => {
  const response = await fetch(`/api/books?page=${page}&limit=${limit}`);
  if (!response.ok) throw new Error("Failed to fetch books");
  return response.json();
};

export default function ListAllBooks() {
  const searchParam = useSearchParams();
  const page = Number.parseInt(searchParam.get("page") || "1");
  const limit = Number.parseInt(searchParam.get("limit") || "10");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["books", page, limit],
    queryFn: () => fetchBooks(page, limit),
  });

  if (isLoading) {
    return (
      <section className="grid grid-cols-1 md:grid-cols-4 gap-5">
        {Array.from({ length: 8 }).map((_, index) => (
          <SkeletonBookCard key={index} />
        ))}
      </section>
    );
  }

  if (isError) {
    return (
      <p className="text-red-500">
        Failed to load books. Please try again later.
      </p>
    );
  }

  if (!data || !data.books || data.books.length === 0) {
    return <p>No books found for the current selection.</p>;
  }

  return (
    <section className="flex flex-col gap-5">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        {data?.books?.map((book) => (
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
      <div>
        <PaginationWithLinks
          page={page}
          pageSize={limit}
          totalCount={data?.totalBooks}
        />
      </div>
    </section>
  );
}
