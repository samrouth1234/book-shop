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
import { AuthorSchemaValidation } from "@/db/types/author.type";
import { createAuthor } from "@/lib/helper/authors/api";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function CreateAuthorForm() {
  const router = useRouter();

  const createAuthorMutation = useMutation({
    mutationFn: createAuthor,
    onSuccess: (data) => {
      if (data.success) {
        form.reset();
        toast.success("Author created successfully");
        router.push("/dashboard/authors");
      } else {
        toast.error(data.error || "Failed to create author");
      }
    },
  });

  const form = useForm<AuthorSchemaValidation>({
    resolver: zodResolver(AuthorSchemaValidation),
    defaultValues: {
      name: "",
      bio: "",
    },
  });

  const { mutate } = createAuthorMutation;

  const onSubmit = useCallback(
    (values: AuthorSchemaValidation) => {
      mutate(values);
    },
    [mutate],
  );

  return (
    <section className="p-4">
      <h2 className="mb-2 text-2xl font-bold">Create Authors</h2>
      <p className="text-muted-foreground mb-6">
        Please provide all required information for the new author.
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

          {/* Bio */}
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea placeholder="Brief bio" {...field} />
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
              disabled={createAuthorMutation.isPending}
            >
              {createAuthorMutation.isPending ? "Creating..." : "Create Book"}
            </Button>
          </section>
        </form>
      </Form>
    </section>
  );
}
