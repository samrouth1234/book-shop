import { NextRequest, NextResponse } from "next/server";

import { HttpStatus } from "@/constants/http-status";
import { db } from "@/db";
import { newCategorySchema } from "@/db/shema";
import { CategoryService } from "@/features/categories";
import { paginatedResponse } from "@/lib/api-response";

const categorySerive = new CategoryService(db);

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");

  const { categorys, totalCategorys } = await categorySerive.getAll(
    page,
    limit,
  );

  return NextResponse.json(
    paginatedResponse(categorys, totalCategorys, page, limit),
  );
};

export const POST = async (req: NextRequest) => {
  try {
    const json = await req.json();
    const result = newCategorySchema.safeParse(json);

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

    const category = await categorySerive.create(result.data);
    return NextResponse.json(
      {
        success: true,
        message: "Categories created successfully",
        data: category,
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
