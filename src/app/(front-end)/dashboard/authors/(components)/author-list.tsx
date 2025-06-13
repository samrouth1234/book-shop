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
import {
  deletedAuthor,
  fetchAuthors,
  updateAuthor,
} from "@/lib/helper/authors/api";
import { AuthorType } from "@/types";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import DeletedAuthorMoadal from "./deleted-author-modal";
import EditAuthorModal from "./edit-author-modal";

const ListAllAuthors = () => {
  const searchParam = useSearchParams();
  const queryClient = useQueryClient();

  // deletd author state
  const [isOpenModalDeletedAuthor, setOpenModalDeletedAuthor] =
    useState<boolean>(false);
  const [selectedAuthorId, setSelectedAuthorId] = useState<number | null>(null);
  // edit book state
  const [isOpenModalEditAuthor, setOpenModalEditAuthor] =
    useState<boolean>(false);
  const [editAuthor, setEditAuthor] = useState<AuthorType | null>(null);

  const page = Number.parseInt(searchParam.get("page") || "1");
  const limit = Number.parseInt(searchParam.get("limit") || "10");

  // show modal for deleted author
  const openModal = (authorId: number) => {
    setSelectedAuthorId(authorId);
    setOpenModalDeletedAuthor(true);
  };

  // close modal for deleted author
  const closeModal = () => {
    setOpenModalDeletedAuthor(false);
    setSelectedAuthorId(null);
  };

  // show modal edit author
  const openEditModal = (author: AuthorType) => {
    setEditAuthor(author);
    setOpenModalEditAuthor(true);
  };

  // close modal edit author
  const closeEditModal = () => {
    setOpenModalEditAuthor(false);
    setEditAuthor(null);
  };

  // function for call deleted author
  const handleDeleteAuthor = () => {
    if (selectedAuthorId !== null) {
      deleteAuthorMutation.mutate(selectedAuthorId);
    }
    closeModal();
  };

  // function for call edit author
  const handleEditAuthor = (updatedAuthor: AuthorType) => {
    editAuthorMutation.mutate(updatedAuthor);
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["authors", page, limit],
    queryFn: () => fetchAuthors(page, limit),
  });

  // mutation deleted author
  const deleteAuthorMutation = useMutation({
    mutationFn: (authorId: number) => deletedAuthor(authorId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authors"] });
      toast.success("Author deleted successfully!");
    },
    onError: () => {
      toast.error("Failed to deleted the author");
    },
  });

  // edit author mutaion
  const editAuthorMutation = useMutation({
    mutationFn: (updatedAuthor: AuthorType) => updateAuthor(updatedAuthor),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authors"] });
      toast.success("Author updated successfully!");
      closeEditModal();
    },
    onError: () => {
      toast.error("Failed to update the author");
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <Image
          src={loading}
          width={100}
          height={100}
          unoptimized
          alt="Loading animation"
        />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <p className="text-center text-red-500">
        Failed to load authors. Please try again later.
      </p>
    );
  }

  return (
    <div>
      <Table>
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead className="w-20 border-r p-4">Author ID</TableHead>
            <TableHead className="border-r">Name</TableHead>
            <TableHead className="border-r">Bio</TableHead>
            <TableHead className="w-44">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.items.map((author) => (
            <TableRow key={author.id}>
              <TableCell className="p-4">{author.id}</TableCell>
              <TableCell>{author.name}</TableCell>
              <TableCell>{author.bio || "Unknown"}</TableCell>
              <TableCell>
                <button
                  className="cursor-pointer pe-3 text-indigo-500 hover:text-indigo-400 hover:underline"
                  type="button"
                  onClick={() => openEditModal(author)}
                >
                  Edit
                </button>
                <button
                  className="cursor-pointer text-red-500 hover:text-red-400 hover:underline"
                  type="button"
                  onClick={() => openModal(author.id)}
                >
                  Delete
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* pagination */}
      <section className="mt-5 flex justify-end">
        <div className="cursor-pointer">
          <PaginationWithLinks
            page={page}
            pageSize={limit}
            totalCount={data.totalPages}
          />
        </div>
      </section>
      {/* moadal for deleted */}
      <DeletedAuthorMoadal
        isOpen={isOpenModalDeletedAuthor}
        onClose={closeModal}
        onConfirm={handleDeleteAuthor}
      />
      {/* moadal for edit */}
      <EditAuthorModal
        isOpen={isOpenModalEditAuthor}
        onClose={closeEditModal}
        onSubmit={handleEditAuthor}
        editAuthor={editAuthor}
      />
    </div>
  );
};

export default ListAllAuthors;
