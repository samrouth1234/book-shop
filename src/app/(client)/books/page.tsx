import BookShopLayout from "@/components/layout/book-shop/book-shop-layout";

import ListAllBooks from "./(components)/book-list";

export default function page() {
  return (
    <BookShopLayout>
      <ListAllBooks />
    </BookShopLayout>
  );
}
