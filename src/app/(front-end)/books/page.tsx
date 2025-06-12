import { Suspense } from "react";

import BookShopLayout from "@/components/layout/book-shop/book-shop-layout";

import ListAllBooks from "./(components)/list-all-book";

export default function page() {
  return (
    <BookShopLayout>
      <Suspense fallback={<div>Loading book...</div>}>
        <ListAllBooks />
      </Suspense>
    </BookShopLayout>
  );
}
