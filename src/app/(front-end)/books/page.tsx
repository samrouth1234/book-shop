import BookShopLayout from "@/components/layout/book-shop/book-shop-layout";
import ListAllBooks from "./(components)/list-all-book";

export default function page() {
  return (
    <BookShopLayout>
      <ListAllBooks />
    </BookShopLayout>
  );
}
