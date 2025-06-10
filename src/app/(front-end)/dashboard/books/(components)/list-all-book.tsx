"use client";

import { PaginationWithLinks } from "@/app/(front-end)/(components)/pagination-link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import DeletedBookMoadal from "./deleted-book-modal";
import EditBookModal from "./edit-book-modal";

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

const ListAllBooks = () => {
  const searchParam = useSearchParams();
  const queryClient = useQueryClient();
  // edit book state
  const [isOpenModalEditBook, setOpenModalEditBook] = useState<boolean>(false);
  const [editinBook, setEditinBook] = useState<BookType | null>(null);
  // deletd book state
  const [isOpenModalDeletedBook, setOpenModalDeletedBook] =
    useState<boolean>(false);
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);
  // pagination
  const page = Number.parseInt(searchParam.get("page") || "1");
  const limit = Number.parseInt(searchParam.get("limit") || "10");

  // show modal for deleted book
  const openModal = (bookId: number) => {
    setSelectedBookId(bookId);
    setOpenModalDeletedBook(true);
  };

  // close modal for deleted book
  const closeModal = () => {
    setOpenModalDeletedBook(false);
    setSelectedBookId(null);
  };

  // show modal edit book
  const openEditModal = (book: BookType) => {
    setEditinBook(book);
    setOpenModalEditBook(true);
  };

  // close modal edit book
  const closeEditModal = () => {
    setOpenModalEditBook(false);
    setEditinBook(null);
  };

  // function for call deleted book
  const handleConfirmDelete = () => {
    if (selectedBookId !== null) {
      deleteBookMutation.mutate(selectedBookId);
    }
    closeModal();
  };
  // function for call edit book
  const handleEditBook = (updatedBook: BookType) => {
    editBookMutation.mutate(updatedBook);
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["books", page, limit],
    queryFn: () => fetchBooks(page, limit),
  });

  const editBookMutation = useMutation({
    mutationFn: async (updatedBook: BookType) => {
      const response = await fetch(`/api/books/${updatedBook.bookId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...updatedBook,
          // Convert Types Before Sending the Payload
          stock: Number(updatedBook.stock),
        }),
      });
      console.log(JSON.stringify(updatedBook));
      if (!response.ok) throw new Error("Failed to update book");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      toast.success("Book updated successfully!");
      closeEditModal();
    },
    onError: () => {
      toast.error("Failed to update the book");
    },
  });

  // mutation deleted book
  const deleteBookMutation = useMutation({
    mutationFn: async (bookId: number) => {
      const response = await fetch(`/api/books/${bookId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to deteled book");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      toast.success("Book deleted successfully!");
    },
    onError: () => {
      toast.error("Failed to deleted the book");
    },
  });

  if (isLoading) {
    return <p className="text-center text-red-400">Loading ...</p>;
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
    <div>
      <Table>
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead className="border-r-1 p-4 w-20">Book ID</TableHead>
            <TableHead className="border-r-1">Title</TableHead>
            <TableHead className="border-r-1">Description</TableHead>
            <TableHead className="border-r-1 w-20">Price</TableHead>
            <TableHead className="w-20 border-r-1">Stock</TableHead>
            <TableHead className="border-r-1">Category Name</TableHead>
            <TableHead className="border-r-1">Author Name</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.books.map((book, index) => (
            <TableRow key={index}>
              <TableCell className="p-4">{book.bookId}</TableCell>
              <TableCell>{book.title}</TableCell>
              <TableCell>{book.description}</TableCell>
              <TableCell>$ {book.price}</TableCell>
              <TableCell>{book.stock}</TableCell>
              <TableCell>{book.categoryName}</TableCell>
              <TableCell>{book.authorName}</TableCell>
              <TableCell>
                <button
                  className="cursor-pointer pe-3 text-indigo-500 hover:underline hover:text-indigo-400"
                  type="button"
                  onClick={() => openEditModal(book)}
                >
                  Edit
                </button>
                <button
                  className="cursor-pointer text-red-500 hover:underline hover:text-red-400"
                  type="button"
                  onClick={() => openModal(book.bookId)}
                >
                  Delete
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* pagination */}
      <section className="flex justify-end">
        <div className="cursor-pointer">
          <PaginationWithLinks
            page={page}
            pageSize={limit}
            totalCount={data?.totalBooks}
          />
        </div>
      </section>
      {/* deleted moadal */}
      <DeletedBookMoadal
        isOpen={isOpenModalDeletedBook}
        onClose={closeModal}
        onConfirm={handleConfirmDelete}
      />
      {/* edit moadal */}
      <EditBookModal
        isOpen={isOpenModalEditBook}
        onClose={closeEditModal}
        onSubmit={handleEditBook}
        editBook={editinBook}
      />
    </div>
  );
};

export default ListAllBooks;
