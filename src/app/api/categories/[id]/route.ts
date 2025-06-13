import { NextRequest, NextResponse } from "next/server";

import { HttpStatus } from "@/constants/http-status";
import { db } from "@/db";
import { newCategorySchema } from "@/db/shema";
import { CategoryService } from "@/features/categories";
import { Success } from "@/lib/api-response";

const categorySerive = new CategoryService(db);

interface CategoryIdProps {
  params: Promise<{
    id: string;
  }>;
}

export const GET = async (_: NextRequest, { params }: CategoryIdProps) => {
  const { id: AuthorId } = await params;
  const id = Number(AuthorId);

  const category = await categorySerive.getById(id);

  if (!category)
    return NextResponse.json(
      { message: `Category with ID ${id} not found.` },
      { status: HttpStatus.NOT_FOUND },
    );
  return NextResponse.json(Success(category));
};

export const PUT = async (req: NextRequest, { params }: CategoryIdProps) => {
  const { id: AuthorId } = await params;
  const id = Number(AuthorId);

  const json = await req.json();
  const updateCategoryData = newCategorySchema.partial().safeParse(json);

  if (!updateCategoryData.success) {
    return NextResponse.json(
      {
        message: "Invalid data for category update.",
        errors: updateCategoryData.error.flatten().fieldErrors,
      },
      { status: HttpStatus.UNPROCESSABLE_ENTITY },
    );
  }

  const updated = await categorySerive.update(id, updateCategoryData.data);
  return NextResponse.json(Success(updated));
};

export const DELETE = async (_: NextRequest, { params }: CategoryIdProps) => {
  const { id: AuthorId } = await params;
  const id = Number(AuthorId);

  const deleted = await categorySerive.deleted(id);
  return NextResponse.json(deleted);
};
