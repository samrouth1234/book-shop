import { NextRequest, NextResponse } from "next/server";

import { HttpStatus } from "@/constants/http-status";
import { db } from "@/db";
import { newCategorySchema } from "@/db/shema";
import { apiHandler } from "@/error";
import { CategoryService } from "@/features/categories";

const categorySerive = new CategoryService(db);

interface CategoryIdProps {
  params: {
    id: string;
  };
}

export const GET = apiHandler(
  async (_: NextRequest, { params }: CategoryIdProps) => {
    const id = Number(params.id);
    const category = await categorySerive.getById(id);

    if (!category)
      return NextResponse.json(
        { message: `Category with ID ${id} not found.` },
        { status: HttpStatus.NOT_FOUND },
      );
    return NextResponse.json(category);
  },
);

export const PUT = apiHandler(
  async (req: NextRequest, { params }: CategoryIdProps) => {
    const id = Number(params.id);
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
    return NextResponse.json(updated);
  },
);

export const DELETE = apiHandler(
  async (_: NextRequest, { params }: CategoryIdProps) => {
    const id = Number(params.id);
    const deleted = await categorySerive.deleted(id);
    return NextResponse.json(deleted);
  },
);
