
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

export function createSuccessResponse<T>(
  data: T,
  message?: string,
): SuccessResponse<T> {
  return {
    success: true,
    data,
    ...(message && { message }),
  };
}

export function paginatedResponse<T>(
  items: T[],
  total: number,
  page: number,
  limit: number,
) {
  return createSuccessResponse({
    items,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  });
}
