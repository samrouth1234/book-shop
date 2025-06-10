import { HttpStatus } from "@/constants/http-status";
import { db } from "@/db";
import { newBookSchema } from "@/db/shema";
import { BookService } from "@/features/books";
import { NextRequest, NextResponse } from "next/server";

const bookService = new BookService(db);

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");

  const books = await bookService.getAll(page, limit);
  return NextResponse.json(books);
}

export async function POST(req: NextRequest) {
  const json = await req.json();
  const parse = newBookSchema.safeParse(json);

  if (!parse.success) {
    return NextResponse.json(
      { error: parse.error },
      { status: HttpStatus.BAD_REQUEST }
    );
  }

  const book = await bookService.create(parse.data);
  return NextResponse.json({ success: true, data: book });
}
