import { NextRequest, NextResponse } from "next/server";

import { HttpStatus } from "@/constants/http-status";
import { db } from "@/db";
import { newAuthorSchema } from "@/db/shema";
import { AuthorService } from "@/features/authors";
import { Success } from "@/lib/api-response";

interface AuthorProps {
  params: Promise<{
    id: string;
  }>;
}

const authorService = new AuthorService(db);

export const GET = async (_: NextRequest, { params }: AuthorProps) => {
  const { id: AuthorId } = await params;
  const id = Number(AuthorId);

  const author = await authorService.getById(id);

  if (!author)
    return NextResponse.json(
      { message: `Author with ID ${id} not found.` },
      { status: HttpStatus.NOT_FOUND },
    );

  return NextResponse.json(Success(author));
};

export const PUT = async (req: NextRequest, { params }: AuthorProps) => {
  const { id: AuthorId } = await params;
  const id = Number(AuthorId);

  const json = await req.json();
  const updateAuthorData = newAuthorSchema.partial().safeParse(json);

  if (!updateAuthorData.success) {
    return NextResponse.json(
      {
        message: "Invalid data for author update.",
        errors: updateAuthorData.error.flatten().fieldErrors,
      },
      { status: HttpStatus.UNPROCESSABLE_ENTITY },
    );
  }

  const updated = await authorService.update(id, updateAuthorData.data);
  return NextResponse.json(Success(updated));
};

export const DELETE = async (_: NextRequest, { params }: AuthorProps) => {
  const { id: AuthorId } = await params;
  const id = Number(AuthorId);

  const deleted = await authorService.deleted(id);
  return NextResponse.json(deleted);
};
