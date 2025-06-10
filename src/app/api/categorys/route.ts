import { HttpStatus } from "@/constants/http-status";
import { db } from "@/db";
import { newCategorySchema } from "@/db/shema";
import { apiHandler } from "@/error";
import { CategoryService } from "@/features/categorys";
import { NextRequest, NextResponse } from "next/server";

const categorySerive = new CategoryService(db);

export const GET = apiHandler(async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");

  const categorys = await categorySerive.getAll(page, limit);
  return NextResponse.json(categorys);
});

export const POST = apiHandler(async (req: NextRequest) => {
  const json = await req.json();
  const parse = newCategorySchema.safeParse(json);

  if (!parse.success) {
    return NextResponse.json(
      { error: parse.error.message },
      { status: HttpStatus.BAD_REQUEST }
    );
  }

  const category = await categorySerive.create(parse.data);
  return NextResponse.json({
    success: true,
    data: category,
  });
});
