"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface BookType {
  bookId: number;
  title: string;
  description: string;
  price: string;
  stock: number;
  categoryName: string;
  authorName: string;
}

interface EditBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (book: BookType) => void;
  editBook: BookType | null;
}

const EditBookModal: React.FC<EditBookModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  editBook,
}) => {
  const [book, setBook] = useState<BookType>({
    bookId: 0,
    title: "",
    description: "",
    price: "",
    stock: 0,
    categoryName: "",
    authorName: "",
  });

  useEffect(() => {
    if (editBook) {
      setBook(editBook);
    }
  }, [editBook]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBook((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <form>
        <DialogContent className="md:max-w-5xl">
          <DialogHeader>
            <DialogTitle>Edit Book</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {/* Title */}
            <div className="grid flex-1 gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                name="title"
                value={book.title}
                onChange={handleChange}
                placeholder="Title"
              />
            </div>
            {/* Description */}
            <div className="grid flex-1 gap-2">
              <Label htmlFor="description">Description</Label>
              <Input
                name="description"
                value={book.description}
                onChange={handleChange}
                placeholder="Description"
              />
            </div>
            {/* Price */}
            <div className="grid flex-1 gap-2">
              <Label htmlFor="price">Price</Label>
              <Input
                name="price"
                value={book.price}
                onChange={handleChange}
                placeholder="Price"
              />
            </div>
            {/* Stock */}
            <div className="grid flex-1 gap-2">
              <Label htmlFor="stock">Stock</Label>
              <Input
                name="stock"
                type="number"
                value={book.stock}
                onChange={handleChange}
                placeholder="Stock"
              />
            </div>
            {/* Category Name */}
            <div className="grid flex-1 gap-2">
              <Label htmlFor="categoryName">Category Name</Label>
              <Input
                name="categoryName"
                value={book.categoryName}
                onChange={handleChange}
                placeholder="Category Name"
              />
            </div>
            {/* Author Name */}
            <div className="grid flex-1 gap-2">
              <Label htmlFor="authorName">Author Name</Label>
              <Input
                name="authorName"
                value={book.authorName}
                onChange={handleChange}
                placeholder="Author Name"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="button" onClick={() => onSubmit(book)}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};
export default EditBookModal;
