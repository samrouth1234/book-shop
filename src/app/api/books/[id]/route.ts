import { NextRequest, NextResponse } from "next/server";

import { HttpStatus } from "@/constants/http-status";
import { db } from "@/db";
import { newBookSchema } from "@/db/shema";
import { BookService } from "@/features/books";
import { createSuccessResponse } from "@/lib/api-response";

const bookService = new BookService(db);

interface BookIdProps {
  params: Promise<{
    id: string;
  }>;
}

export const GET = async (_: NextRequest, { params }: BookIdProps) => {
  const { id: bookIdParam } = await params;
  const id = Number(bookIdParam);

  const book = await bookService.getById(id);

  if (!book)
    return NextResponse.json(
      { message: `Book with ID ${id} not found.` },
      { status: HttpStatus.NOT_FOUND },
    );
  return NextResponse.json(
    createSuccessResponse({ data: book, status: HttpStatus.CREATED }),
  );
};

export const PUT = async (req: NextRequest, { params }: BookIdProps) => {
  const { id: bookIdParam } = await params;
  const id = Number(bookIdParam);

  const json = await req.json();
  const updateBookData = newBookSchema.partial().safeParse(json);

  if (!updateBookData.success) {
    return NextResponse.json(
      {
        message: "Invalid data for book update.",
        errors: updateBookData.error.flatten().fieldErrors,
      },
      { status: HttpStatus.UNPROCESSABLE_ENTITY },
    );
  }

  const updated = await bookService.update(id, updateBookData.data);
  return NextResponse.json(
    createSuccessResponse({ data: updated, status: HttpStatus.NO_CONTENT }),
  );
};

export const DELETE = async (_: NextRequest, { params }: BookIdProps) => {
  const { id: bookIdParam } = await params;
  const id = Number(bookIdParam);

  const deleted = await bookService.delete(id);
  return NextResponse.json(deleted);
};
