"use client";

import { useQuery } from "@tanstack/react-query";
import CardBook from "./card-book";
import SkeletonBookCard from "./skeleton-book-card";

interface BookType {
  bookId: number;
  title: string;
  description: string;
  price: string;
  stock: number;
  categoryName: string;
  authorName: string;
}

const fetchBooks = async (): Promise<BookType[]> => {
  const response = await fetch("/api/books");
  if (!response.ok) throw new Error("Failed to fetch books");
  return response.json();
};

export default function ListAllBooks() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["books"],
    queryFn: fetchBooks,
  });

  if (isLoading) {
    return (
      <section className="grid grid-cols-1 md:grid-cols-4 gap-5">
        {Array.from({ length: 8 }).map(
          (
            _,
            index
          ) => (
            <SkeletonBookCard key={index} />
          )
        )}
      </section>
    );
  }
  if (isError) return <p>Error Loading Book ...</p>;

  return (
    <section className="grid grid-cols-1 md:grid-cols-4 gap-5">
      {data?.map((book) => (
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
    </section>
  );
}
