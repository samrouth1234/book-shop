import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

interface BookProps {
  bookId: number;
  title: string;
  description: string;
  price: string;
  stock: number;
  categoryName: string;
  authorName: string;
}

export default function CardBook({
  bookId,
  title,
  description,
  price,
  stock,
  categoryName,
  authorName,
}: BookProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title ?? "Title Unknow"}</CardTitle>
        <CardDescription>{description ?? "Description Unknow"}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          <strong>Price:</strong> $ {price}
        </p>
        <p>
          <strong>Stock:</strong> {stock}
        </p>
        <p>
          <strong>Category:</strong> {categoryName}
        </p>
        <p>
          <strong>Author:</strong> {authorName}
        </p>
      </CardContent>
      <CardFooter>
        <Link href={`/books/${bookId}`}>
          <Button onClick={() => console.log(bookId)}>View</Button>
        </Link>{" "}
      </CardFooter>
    </Card>
  );
}
