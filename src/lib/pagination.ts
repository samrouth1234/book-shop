/**
 *
 * @param page is the number of items .
 * @param limit  is the number of items limit .
 * @param offset is the number of items to skip before starting to return results from a database.
 * @param => offset = (page - 1) * limit , example : offset = (3 - 1) * 10 = 20 .
 *
 */

export function getPagination(page: number = 1, limit: number = 10) {
  const safePage = Math.max(1, page);
  const safeLimit = Math.max(1, limit);
  const offset = (safePage - 1) * safeLimit;

  return {
    page: safePage,
    limit: safeLimit,
    offset,
  };
}
