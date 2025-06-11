"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import loading from "@/../../public/loading-animation.svg";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PaginationWithLinks } from "@/app/(front-end)/(components)/pagination-link";
import { useState } from "react";
import { toast } from "sonner";
import DeletedAuthorMoadal from "./deleted-author-modal";
import EditAuthorModal from "./edit-author-modal";

interface AuthorType {
  id: number;
  name: string;
  bio: string;
}

interface AuthorResponse {
  authors: AuthorType[];
  totalAuthors: number;
}

const fetchAuthors = async (
  page: number,
  limit: number
): Promise<AuthorResponse> => {
  const response = await fetch(`/api/authors?page=${page}&limit=${limit}`);
  if (!response.ok) throw new Error("Failed to fetch authors");
  return response.json();
};

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

  const { data, isLoading, isError } = useQuery<AuthorResponse>({
    queryKey: ["authors", page, limit],
    queryFn: () => fetchAuthors(page, limit),
  });

  // mutation deleted author
  const deleteAuthorMutation = useMutation({
    mutationFn: async (authorId: number) => {
      const response = await fetch(`/api/authors/${authorId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to deteled author");
      return response.json();
    },
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
    mutationFn: async (updatedAuthor: AuthorType) => {
      const response = await fetch(`/api/authors/${updatedAuthor.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...updatedAuthor,
        }),
      });
      console.log(JSON.stringify(updatedAuthor));
      if (!response.ok) throw new Error("Failed to update author");
      return response.json();
    },
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
      <p className="text-red-500 text-center">
        Failed to load authors. Please try again later.
      </p>
    );
  }

  return (
    <div>
      <Table>
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead className="border-r p-4 w-20">Author ID</TableHead>
            <TableHead className="border-r">Name</TableHead>
            <TableHead className="border-r">Bio</TableHead>
            <TableHead className="w-44">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.authors.map((author) => (
            <TableRow key={author.id}>
              <TableCell className="p-4">{author.id}</TableCell>
              <TableCell>{author.name}</TableCell>
              <TableCell>{author.bio || "Unknown"}</TableCell>
              <TableCell>
                <button
                  className="cursor-pointer pe-3 text-indigo-500 hover:underline hover:text-indigo-400"
                  type="button"
                  onClick={() => openEditModal(author)}
                >
                  Edit
                </button>
                <button
                  className="cursor-pointer text-red-500 hover:underline hover:text-red-400"
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
      <section className="flex justify-end mt-5">
        <div className="cursor-pointer">
          <PaginationWithLinks
            page={page}
            pageSize={limit}
            totalCount={data?.totalAuthors}
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
