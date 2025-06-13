// src/lib/api-response.ts

export type SuccessResponse<T> = {
  success: true;
  data: T;
  message?: string;
};

export type ErrorResponse = {
  success: false;
  error: string;
  statusCode?: number;
};

export function Success<T>(data: T, message?: string): SuccessResponse<T> {
  return {
    success: true,
    data,
    ...(message && { message }),
  };
}

export function Error(message: string, statusCode?: number): ErrorResponse {
  return {
    success: false,
    error: message,
    ...(statusCode && { statusCode }),
  };
}

export function paginatedResponse<T>(
  items: T[],
  total: number,
  page: number,
  limit: number,
) {
  return Success({
    items,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  });
}
