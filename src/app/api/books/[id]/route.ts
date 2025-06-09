import { HttpStatus } from "@/constants/http-status";
import { db } from "@/db";
import { newBookSchema } from "@/db/shema";
import { BadRequestException } from "@/error";
import { BookService } from "@/features/books";
import { NextRequest, NextResponse } from "next/server";

const bookService = new BookService(db);

interface BookIdProps {
  params: {
    id: number;
  };
}

export async function GET(_: NextRequest, { params }: BookIdProps) {
  const { id } = await params;
  const book = await bookService.getById(id);

  if (!book)
    return NextResponse.json(
      { error: "Book Not found" },
      { status: HttpStatus.NOT_FOUND }
    );
  return NextResponse.json(book);
}

export async function PUT(req: NextRequest, { params }: BookIdProps) {
  const { id } = await params;
  const json = await req.json();
  const updateData = newBookSchema.partial().safeParse(json);

  if (!updateData.success) {
    return NextResponse.json(BadRequestException);
  }

  const updated = await bookService.update(id, updateData.data);
  return NextResponse.json(updated);
}

export async function DELETE(_: NextRequest, { params }: BookIdProps) {
  const { id } = await params;
  const deleted = await bookService.delete(id);
  return NextResponse.json(deleted);
}
