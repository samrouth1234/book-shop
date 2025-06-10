import { HttpStatus } from "@/constants/http-status";
import { db } from "@/db";
import { newAuthorSchema } from "@/db/shema";
import { apiHandler } from "@/error";
import { AuthorService } from "@/features/authors";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";

interface AuthorProps {
  params: {
    id: string;
  };
}

const authorService = new AuthorService(db);

export const GET = apiHandler(
  async (_: NextRequest, { params }: AuthorProps) => {
    const id = Number(params.id);
    const author = await authorService.getById(id);

    if (!author)
      return NextResponse.json(
        { error: "Author Not found" },
        { status: HttpStatus.NOT_FOUND }
      );

    return NextResponse.json(author);
  }
);

export const PUT = apiHandler(
  async (req: NextRequest, { params }: AuthorProps) => {
    const id = Number(params.id);
    const json = await req.json();
    const updateAuthorData = newAuthorSchema.partial().safeParse(json);

    if (!updateAuthorData.success) {
      return NextResponse.json(
        { message: "Invalid data :", error },
        { status: HttpStatus.BAD_REQUEST }
      );
    }

    const updated = await authorService.update(id, updateAuthorData.data);
    return NextResponse.json(updated);
  }
);

export const DELETE = apiHandler(
  async (_: NextRequest, { params }: AuthorProps) => {
    const id = Number(params.id);
    const deleted = await authorService.deleted(id);
    return NextResponse.json(deleted);
  }
);
