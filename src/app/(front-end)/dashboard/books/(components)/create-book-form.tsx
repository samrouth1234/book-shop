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
import { Textarea } from "@/components/ui/textarea";
import { BookSchemaValidation } from "@/db/types/book.type";
import { createBook } from "@/lib/helper/books/api";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function CreateBookForm() {
  const router = useRouter();

  const createBookMutation = useMutation({
    mutationFn: createBook,
    onSuccess: (data) => {
      if (data.success) {
        form.reset();
        toast.success("Book created successfully");
        router.push("/dashboard/books");
      } else {
        toast.error(data.error || "Failed to create book");
      }
    },
  });

  const form = useForm<BookSchemaValidation>({
    resolver: zodResolver(BookSchemaValidation),
    defaultValues: {
      title: "",
      description: "",
      price: "",
      stock: 0,
      categoryName: "",
      authorName: "",
    },
  });

  const { mutate } = createBookMutation;

  const onSubmit = useCallback(
    (values: BookSchemaValidation) => {
      mutate(values);
    },
    [mutate],
  );

  return (
    <section className="p-4">
      <h2 className="mb-2 text-2xl font-bold">Create Book</h2>
      <p className="text-muted-foreground mb-6">
        Please provide all required information for the new book.
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          {/* Title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Book title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Brief description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Price */}
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="e.g. 9.99" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Stock */}
          <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stock</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="e.g. 100" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Category Name */}
          <FormField
            control={form.control}
            name="categoryName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category Name</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="e.g. Fiction" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Author Name */}
          <FormField
            control={form.control}
            name="authorName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Author Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="e.g. J.K. Rowling"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* create book */}
          <section className="flex justify-end md:col-span-2">
            <Button
              type="submit"
              className="cursor-pointer"
              disabled={createBookMutation.isPending}
            >
              {createBookMutation.isPending ? "Creating..." : "Create Book"}
            </Button>
          </section>
        </form>
      </Form>
    </section>
  );
}
