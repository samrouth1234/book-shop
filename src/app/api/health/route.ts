import { NextResponse } from "next/server";

import { getDb } from "@/db";
import { logger } from "@/lib/logger";

export async function GET() {
  try {
    // Initialize database connection
    const db = await getDb();

    // Perform a simple query to check database connectivity
    await db.execute("SELECT 1");

    // Return success response
    return NextResponse.json(
      {
        status: "healthy",
        timestamp: new Date().toISOString(),
        services: {
          database: "connected",
        },
      },
      { status: 200 },
    );
  } catch (error) {
    // Log the error for debugging
    const errorMessage =
      typeof error === "object" && error !== null && "message" in error
        ? (error as { message?: string }).message
        : String(error);
    logger.error("Health check failed", { error: errorMessage });

    // Return error response
    return NextResponse.json(
      {
        status: "unhealthy",
        timestamp: new Date().toISOString(),
        services: {
          database: "disconnected",
        },
        error: errorMessage || "Internal Server Error",
      },
      { status: 503 },
    );
  }
}
