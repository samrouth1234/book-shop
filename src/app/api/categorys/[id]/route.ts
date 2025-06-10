import { HttpStatus } from "@/constants/http-status";
import { db } from "@/db";
import { newBookSchema, newCategorySchema } from "@/db/shema";
import { apiHandler } from "@/error";
import { CategoryService } from "@/features/categorys";
import Error from "next/error";
import { NextRequest, NextResponse } from "next/server";

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
        { error: "Category Not found" },
        { status: HttpStatus.NOT_FOUND }
      );
    return NextResponse.json(category);
  }
);

export const PUT = apiHandler(
  async (req: NextRequest, { params }: CategoryIdProps) => {
    const id = Number(params.id);
    const json = await req.json();
    const updateCategoryData = newCategorySchema.partial().safeParse(json);

    if (!updateCategoryData.success) {
      return NextResponse.json(
        { message: "Invalid data :", Error },
        { status: HttpStatus.BAD_REQUEST }
      );
    }

    const updated = await categorySerive.update(id, updateCategoryData.data);
    return NextResponse.json(updated);
  }
);

export const DELETE = apiHandler(
  async (_: NextRequest, { params }: CategoryIdProps) => {
    const id = Number(params.id);
    const deleted = await categorySerive.deleted(id);
    return NextResponse.json(deleted);
  }
);
