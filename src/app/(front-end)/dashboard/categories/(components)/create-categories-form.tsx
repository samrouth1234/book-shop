"use client";

import { useCallback } from "react";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CategoriesSchemaValidation } from "@/db/types/categories.type";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const createCategories = async (values: CategoriesSchemaValidation) => {
  const response = await fetch(`/api/categories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  if (!response.ok) {
    throw new Error("Failed to create categories");
  }

  return response.json();
};

export default function CreateCategoryForm() {
  const router = useRouter();

  const createCategoriesMutation = useMutation({
    mutationFn: createCategories,
    onSuccess: (data) => {
      if (data.success) {
        form.reset();
        toast.success("Categories create successfully");
        router.push("/dashboard/categories");
      } else {
        toast.error(data.error || "Failed to create categories");
      }
    },
  });

  const form = useForm<CategoriesSchemaValidation>({
    resolver: zodResolver(CategoriesSchemaValidation),
    defaultValues: {
      name: "",
    },
  });

  const { mutate } = createCategoriesMutation;

  const onSubmit = useCallback(
    (values: CategoriesSchemaValidation) => {
      mutate(values);
    },
    [mutate],
  );

  return (
    <section className="p-4">
      <h2 className="mb-2 text-2xl font-bold">Create Categories</h2>
      <p className="text-muted-foreground mb-6">
        Please provide all required information for the new category.
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5"
        >
          {/* Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Create author */}
          <section className="flex justify-end md:col-span-2">
            <Button
              type="submit"
              className="cursor-pointer"
              disabled={createCategoriesMutation.isPending}
            >
              {createCategoriesMutation.isPending
                ? "Creating..."
                : "Create Book"}
            </Button>
          </section>
        </form>
      </Form>
    </section>
  );
}
