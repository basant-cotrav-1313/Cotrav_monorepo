/**
 * Returns page numbers with ellipsis for pagination controls.
 * e.g. getPageNumbers(4, 10) → [1, "…", 3, 4, 5, 6, "…", 10]
 */
export function getPageNumbers(
  current: number,
  total: number
): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages: (number | "…")[] = [];

  // Always show first page
  pages.push(1);

  // Ellipsis after first page if current is far from start
  if (current > 3) pages.push("…");

  // Pages around current
  const start = Math.max(2, current);
  const end = Math.min(total - 1, current + 2);
  for (let i = start; i <= end; i++) pages.push(i);

  // Ellipsis before last page if current is far from end
  if (current < total - 3) pages.push("…");

  // Always show last page
  pages.push(total);

  return pages;
}