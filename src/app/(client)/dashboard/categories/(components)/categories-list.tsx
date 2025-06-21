"use client";

import { useState } from "react";

import Image from "next/image";
import { useSearchParams } from "next/navigation";

import loading from "@/../../public/loading-animation.svg";
import { PaginationWithLinks } from "@/app/(client)/(components)/pagination-link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  deletedCategoies,
  fetchCategories,
  updatedCategories,
} from "@/lib/helper/categories/api";
import { CategoriesType } from "@/types";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import DeletedCategoriesMoadal from "./deleted-categories-moadal";
import EditCategoriesModal from "./edit-categories-moadal";

const ListAllCategories = () => {
  const searchParam = useSearchParams();
  const queryClient = useQueryClient();

  // deletd categories state
  const [isOpenModalDeletedCategories, setOpenModalDeletedCategories] =
    useState<boolean>(false);
  const [selectedCategoriesId, setSelectedCategoriesId] = useState<
    number | null
  >(null);
  // edit categories state
  const [isOpenModalEditCategories, setOpenModalEditCategories] =
    useState<boolean>(false);
  const [editCategories, setEditCategories] = useState<CategoriesType | null>(
    null,
  );

  const page = Number.parseInt(searchParam.get("page") || "1");
  const limit = Number.parseInt(searchParam.get("limit") || "10");

  // show modal for deleted categories
  const openModal = (categoriesId: number) => {
    setSelectedCategoriesId(categoriesId);
    setOpenModalDeletedCategories(true);
  };

  // close modal for deleted categories
  const closeModal = () => {
    setOpenModalDeletedCategories(false);
    setSelectedCategoriesId(null);
  };

  // show modal edit categories
  const openEditModal = (categories: CategoriesType) => {
    setEditCategories(categories);
    setOpenModalEditCategories(true);
  };

  // close modal edit categories
  const closeEditModal = () => {
    setOpenModalEditCategories(false);
    setEditCategories(null);
  };

  // function for call deleted categories
  const handleDeleteCategories = () => {
    if (selectedCategoriesId !== null) {
      deleteCategoriesMutation.mutate(selectedCategoriesId);
    }
    closeModal();
  };

  // function for call edit categories
  const handleEditCategories = (updatedCategories: CategoriesType) => {
    editCategoriesMutation.mutate(updatedCategories);
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["categories", page, limit],
    queryFn: () => fetchCategories(page, limit),
  });

  // mutation deleted categories
  const deleteCategoriesMutation = useMutation({
    mutationFn: (categoriesId: number) => deletedCategoies(categoriesId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Categories deleted successfully!");
    },
    onError: () => {
      toast.error("Failed to deleted the categories");
    },
  });

  // edit categories mutaion
  const editCategoriesMutation = useMutation({
    mutationFn: (oldCategories: CategoriesType) =>
      updatedCategories(oldCategories),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Categories updated successfully!");
      closeEditModal();
    },
    onError: () => {
      toast.error("Failed to update the categories");
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
        Failed to load categories. Please try again later.
      </p>
    );
  }

  return (
    <div>
      <Table>
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead className="w-20 border-r p-4">Categories ID</TableHead>
            <TableHead className="border-r">Name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.items.map((category) => (
            <TableRow key={category.id}>
              <TableCell className="p-4">{category.id}</TableCell>
              <TableCell>{category.name}</TableCell>
              <TableCell className="w-44">
                <button
                  className="cursor-pointer pe-3 text-indigo-500 hover:text-indigo-400 hover:underline"
                  type="button"
                  onClick={() => openEditModal(category)}
                >
                  Edit
                </button>
                <button
                  className="cursor-pointer text-red-500 hover:text-red-400 hover:underline"
                  type="button"
                  onClick={() => openModal(category.id)}
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
      <DeletedCategoriesMoadal
        isOpen={isOpenModalDeletedCategories}
        onClose={closeModal}
        onConfirm={handleDeleteCategories}
      />
      {/* moadal for edit */}
      <EditCategoriesModal
        isOpen={isOpenModalEditCategories}
        onClose={closeEditModal}
        onSubmit={handleEditCategories}
        editCategories={editCategories}
      />
    </div>
  );
};

export default ListAllCategories;
