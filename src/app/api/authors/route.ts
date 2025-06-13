import { NextRequest, NextResponse } from "next/server";

import { HttpStatus } from "@/constants/http-status";
import { db } from "@/db";
import { newAuthorSchema } from "@/db/shema";
import { AuthorService } from "@/features/authors";
import { paginatedResponse } from "@/lib/api-response";

const authorService = new AuthorService(db);

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");

  const { authors, totalAuthors } = await authorService.getAll(page, limit);
  return NextResponse.json(
    paginatedResponse(authors, totalAuthors, page, limit),
  );
};

export const POST = async (req: NextRequest) => {
  try {
    const json = await req.json();
    const result = newAuthorSchema.safeParse(json);
    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors: result.error.flatten().fieldErrors,
        },
        { status: HttpStatus.BAD_REQUEST },
      );
    }

    const author = await authorService.create(result.data);
    return NextResponse.json(
      {
        success: true,
        message: "Author created successfully",
        data: author,
      },
      { status: HttpStatus.CREATED },
    );
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
        error: err instanceof Error ? err.message : "Unexpected error",
      },
      { status: HttpStatus.INTERNAL_SERVER_ERROR },
    );
  }
};
