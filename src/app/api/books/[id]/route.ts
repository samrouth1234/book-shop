import { HttpStatus } from "@/constants/http-status";
import { db } from "@/db";
import { newBookSchema } from "@/db/shema";
import { apiHandler } from "@/error";
import { BookService } from "@/features/books";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";

const bookService = new BookService(db);

interface BookIdProps {
  params: {
    id: string;
  };
}

export const GET = apiHandler(
  async (_: NextRequest, { params }: BookIdProps) => {
    const id = Number(params.id);
    const book = await bookService.getById(id);

    if (!book)
      return NextResponse.json(
        { error: "Book Not found" },
        { status: HttpStatus.NOT_FOUND }
      );
    return NextResponse.json(book);
  }
);

export const PUT = apiHandler(
  async (req: NextRequest, { params }: BookIdProps) => {
    const id = Number(params.id);
    const json = await req.json();
    const updateBookData = newBookSchema.partial().safeParse(json);

    if (!updateBookData.success) {
      return NextResponse.json(
        { message: "Invalid data :", error },
        { status: HttpStatus.BAD_REQUEST }
      );
    }

    const updated = await bookService.update(id, updateBookData.data);
    return NextResponse.json(updated);
  }
);

export const DELETE = apiHandler(
  async (_: NextRequest, { params }: BookIdProps) => {
    const id = Number(params.id);
    const deleted = await bookService.delete(id);
    return NextResponse.json(deleted);
  }
);
