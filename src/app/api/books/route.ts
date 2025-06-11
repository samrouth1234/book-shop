import { HttpStatus } from "@/constants/http-status";
import { db } from "@/db";
import { newBookSchema } from "@/db/shema";
import { apiHandler } from "@/error";
import { BookService } from "@/features/books";
import { NextRequest, NextResponse } from "next/server";

const bookService = new BookService(db);

export const GET = apiHandler(async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");

  const books = await bookService.getAll(page, limit);
  return NextResponse.json(books);
});

export const POST = apiHandler(async (req: NextRequest) => {
  try {
    const json = await req.json();
    const result = newBookSchema.safeParse(json);
    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors: result.error.flatten().fieldErrors,
        },
        { status: HttpStatus.BAD_REQUEST }
      );
    }
    const book = await bookService.create(result.data);
    return NextResponse.json(
      {
        success: true,
        message: "Book created successfully",
        data: book,
      },
      { status: HttpStatus.CREATED }
    );
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
        error: err instanceof Error ? err.message : "Unexpected error",
      },
      { status: HttpStatus.INTERNAL_SERVER_ERROR }
    );
  }
});
