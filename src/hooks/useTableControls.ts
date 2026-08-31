import { useMemo, useState } from "react";

export type SortDirection = "asc" | "desc" | null;

export interface TableControlsOptions<T> {
  rows: T[];
  /** Fields included in the free-text search. */
  searchFields: (keyof T)[];
  /** Optional value accessor used for sorting a given column key. */
  sortAccessor?: (row: T, key: string) => string | number;
  initialPageSize?: number;
}

export function useTableControls<T extends object>({
  rows,
  searchFields,
  sortAccessor,
  initialPageSize = 10,
}: TableControlsOptions<T>) {
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSizeState] = useState(initialPageSize);

  function toggleSort(key: string) {
    setPage(1);
    if (sortKey !== key) {
      setSortKey(key);
      setSortDirection("asc");
      return;
    }
    if (sortDirection === "asc") setSortDirection("desc");
    else if (sortDirection === "desc") {
      setSortDirection(null);
      setSortKey(null);
    } else setSortDirection("asc");
  }

  function setPageSize(size: number) {
    setPageSizeState(size);
    setPage(1);
  }

  function search(value: string) {
    setQuery(value);
    setPage(1);
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((row) =>
      searchFields.some((field) => String(row[field] ?? "").toLowerCase().includes(q)),
    );
  }, [rows, query, searchFields]);

  const sorted = useMemo(() => {
    if (!sortKey || !sortDirection) return filtered;
    const accessor = sortAccessor ?? ((row: T, key: string) => String(row[key as keyof T] ?? ""));
    const copy = [...filtered];
    copy.sort((a, b) => {
      const av = accessor(a, sortKey);
      const bv = accessor(b, sortKey);
      const cmp =
        typeof av === "number" && typeof bv === "number"
          ? av - bv
          : String(av).localeCompare(String(bv), undefined, { numeric: true });
      return sortDirection === "asc" ? cmp : -cmp;
    });
    return copy;
  }, [filtered, sortKey, sortDirection, sortAccessor]);

  const pageCount = Math.max(1, Math.ceil(sorted.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const paged = useMemo(
    () => sorted.slice((currentPage - 1) * pageSize, currentPage * pageSize),
    [sorted, currentPage, pageSize],
  );

  return {
    query,
    search,
    sortKey,
    sortDirection,
    toggleSort,
    page: currentPage,
    setPage,
    pageCount,
    pageSize,
    setPageSize,
    total: sorted.length,
    rows: paged,
    allFiltered: sorted,
    rangeStart: sorted.length === 0 ? 0 : (currentPage - 1) * pageSize + 1,
    rangeEnd: Math.min(currentPage * pageSize, sorted.length),
  };
}
