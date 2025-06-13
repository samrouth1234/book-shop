"use client";

import { useState } from "react";

import Image from "next/image";
import { useSearchParams } from "next/navigation";

import loading from "@/../../public/loading-animation.svg";
import { PaginationWithLinks } from "@/app/(front-end)/(components)/pagination-link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deletdBook, fetchBooks, updateBook } from "@/lib/helper/books/api";
import { BookType } from "@/types";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import DeletedBookMoadal from "./deleted-book-modal";
import EditBookModal from "./edit-book-modal";

const ListAllBooks = () => {
  const searchParam = useSearchParams();
  const queryClient = useQueryClient();
  // edit book state
  const [isOpenModalEditBook, setOpenModalEditBook] = useState<boolean>(false);
  const [editBook, setEditBook] = useState<BookType | null>(null);
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
    setEditBook(book);
    setOpenModalEditBook(true);
  };

  // close modal edit book
  const closeEditModal = () => {
    setOpenModalEditBook(false);
    setEditBook(null);
  };

  // function for call deleted book
  const handleDeleteBook = () => {
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
    mutationFn: (updatedBook: BookType) => updateBook(updatedBook),
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
    mutationFn: (bookId: number) => deletdBook(bookId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      toast.success("Book deleted successfully!");
    },
    onError: () => {
      toast.error("Failed to deleted the book");
    },
  });

  if (isLoading) {
    return (
      <p className="m-auto flex justify-center">
        <Image
          src={loading}
          width={100}
          height={100}
          unoptimized={true}
          alt="loading-not-found"
        />
      </p>
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
    <section>
      <Table>
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead className="w-20 border-r-1 p-4">Book ID</TableHead>
            <TableHead className="border-r-1">Title</TableHead>
            <TableHead className="border-r-1">Description</TableHead>
            <TableHead className="w-20 border-r-1">Price</TableHead>
            <TableHead className="w-20 border-r-1">Stock</TableHead>
            <TableHead className="bor der-r-1">Category Name</TableHead>
            <TableHead className="border-r-1">Author Name</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.items.map((book, index) => (
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
                  className="cursor-pointer pe-3 text-indigo-500 hover:text-indigo-400 hover:underline"
                  type="button"
                  onClick={() => openEditModal(book)}
                >
                  Edit
                </button>
                <button
                  className="cursor-pointer text-red-500 hover:text-red-400 hover:underline"
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
            totalCount={data.totalPages}
          />
        </div>
      </section>
      {/* deleted moadal */}
      <DeletedBookMoadal
        isOpen={isOpenModalDeletedBook}
        onClose={closeModal}
        onConfirm={handleDeleteBook}
      />
      {/* edit moadal */}
      <EditBookModal
        isOpen={isOpenModalEditBook}
        onClose={closeEditModal}
        onSubmit={handleEditBook}
        editBook={editBook}
      />
    </section>
  );
};

export default ListAllBooks;
