import BookShopLayout from "@/components/layout/book-shop/book-shop-layout";
import { db } from "@/db";
import { BookService } from "@/features/books";
import Image from "next/image";

interface ViewBookDetailProps {
  params: {
    bookId: number;
  };
}

const bookService = new BookService(db);

export default async function ViewBookDetails({ params }: ViewBookDetailProps) {
  const { bookId } = await params;
  console.log("Book ID", bookId);

  if (!bookId) {
    return (
      <section className="p-6">
        <h1 className="text-2xl font-semibold text-red-500">Invalid Book ID</h1>
      </section>
    );
  }

  const book = await bookService.getById(bookId);
  console.log(book);

  if (!book) {
    return (
      <section className="p-6">
        <h1 className="text-2xl font-semibold text-red-500">Book not found</h1>
      </section>
    );
  }

  return (
    <BookShopLayout>
      <section className="grid grid-cols-3 gap-5 pt-5">
        <section className="">
          <Image
            src={"/placeholder.svg"}
            alt={book.title}
            width={400}
            height={300}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
        </section>
        <section className="col-span-2 overflow-y-auto h-96">
          <h2 className="text-5xl font-semibold py-2">{book.title}</h2>
          <p>{book.categoryName}</p>
          <p>{book.authorName}</p>
        </section>
      </section>
    </BookShopLayout>
  );
}
