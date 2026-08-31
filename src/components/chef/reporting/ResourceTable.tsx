import { useMemo, useState } from "react";
import { Columns2, Filter, Plus, RotateCcw, Search, X } from "lucide-react";
import { StatusPill } from "../StatusPill";
import { SortHeader } from "./SortHeader";
import { useTableControls } from "@/hooks/useTableControls";
import type { RunResource } from "@/data/clientRunDetail";

const COLUMNS = [
  { id: "step", label: "Step" },
  { id: "name", label: "Resource Name" },
  { id: "type", label: "Type" },
  { id: "cookbook", label: "Cookbook" },
  { id: "action", label: "Resource Action" },
  { id: "status", label: "Status" },
] as const;

type ColumnId = (typeof COLUMNS)[number]["id"];

const FILTER_FIELDS = [
  { id: "status", label: "Status" },
  { id: "cookbook", label: "Cookbook" },
  { id: "type", label: "Type" },
  { id: "action", label: "Resource Action" },
  { id: "name", label: "Resource Name" },
] as const;

type FilterField = (typeof FILTER_FIELDS)[number]["id"];

type ActiveFilter = { id: number; field: FilterField; value: string };

let filterSeq = 0;

export function ResourceTable({ resources }: { resources: RunResource[] }) {
  const [panel, setPanel] = useState<"search" | "columns" | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<ActiveFilter[]>([
    { id: ++filterSeq, field: "status", value: "all" },
    { id: ++filterSeq, field: "cookbook", value: "all" },
    { id: ++filterSeq, field: "type", value: "all" },
    { id: ++filterSeq, field: "action", value: "all" },
  ]);
  const [visibleColumns, setVisibleColumns] = useState<ColumnId[]>(COLUMNS.map((c) => c.id));

  const optionsFor = useMemo(() => {
    const map = {} as Record<FilterField, string[]>;
    for (const f of FILTER_FIELDS) {
      map[f.id] = Array.from(new Set(resources.map((r) => String(r[f.id] ?? "")))).filter(Boolean).sort();
    }
    return map;
  }, [resources]);

  const filtered = useMemo(
    () =>
      resources.filter((r) =>
        filters.every((f) => f.value === "all" || String(r[f.field] ?? "") === f.value),
      ),
    [resources, filters],
  );

  const table = useTableControls({
    rows: filtered as unknown as Record<string, unknown>[],
    searchFields: ["name", "type", "cookbook", "action"],
    initialPageSize: 10,
  });
  const rows = table.rows as unknown as RunResource[];

  const shown = COLUMNS.filter((c) => visibleColumns.includes(c.id));
  const hasActiveFilter = filters.some((f) => f.value !== "all");

  function updateFilter(id: number, patch: Partial<ActiveFilter>) {
    setFilters((prev) => prev.map((f) => (f.id === id ? { ...f, ...patch } : f)));
    table.setPage(1);
  }

  function addFilter() {
    const used = new Set(filters.map((f) => f.field));
    const next = FILTER_FIELDS.find((f) => !used.has(f.id)) ?? FILTER_FIELDS[0];
    setFilters((prev) => [...prev, { id: ++filterSeq, field: next.id, value: "all" }]);
  }

  function iconClass(active: boolean) {
    return `flex h-8 w-8 items-center justify-center rounded-sm ${
      active ? "text-chef-blue" : "text-chef-text-muted"
    } hover:text-chef-blue`;
  }

  function cellValue(row: RunResource, id: ColumnId) {
    if (id === "step") return `${row.step}/${row.total}`;
    if (id === "status") return <StatusPill status={row.status} />;
    return row[id];
  }


  return (
    <div className="pt-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-baseline gap-3">
          <h3 className="text-[15px] text-chef-text">Resource Execution</h3>
          <span className="text-[13px] text-chef-text-muted">Showing {table.total} results</span>
        </div>
        <div className="relative flex items-center gap-1">
          {panel === "search" && (
            <div className="relative">
              <input
                autoFocus
                aria-label="Search resources"
                placeholder="Search resources..."
                value={table.query}
                onChange={(e) => table.search(e.target.value)}
                className="h-8 w-[220px] rounded-sm border border-chef-line bg-chef-surface px-2.5 pr-7 text-[13px] text-chef-text outline-none focus:border-chef-blue"
              />
              {table.query && (
                <button
                  type="button"
                  aria-label="Clear resource search"
                  onClick={() => table.search("")}
                  className="absolute right-2 top-2 text-chef-text-muted hover:text-chef-blue"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          )}
          <button
            type="button"
            aria-label="Search"
            onClick={() => setPanel(panel === "search" ? null : "search")}
            className={iconClass(panel === "search")}
          >
            <Search className="h-[18px] w-[18px]" />
          </button>
          <button
            type="button"
            aria-label="Filter"
            onClick={() => setShowFilters((v) => !v)}
            className={`flex h-8 w-8 items-center justify-center rounded-sm border ${
              showFilters || hasActiveFilter
                ? "border-chef-blue text-chef-blue"
                : "border-transparent text-chef-text-muted"
            } hover:text-chef-blue`}
          >
            <Filter className="h-[18px] w-[18px]" />
          </button>
          <button
            type="button"
            aria-label="Customize columns"
            onClick={() => setPanel(panel === "columns" ? null : "columns")}
            className={iconClass(panel === "columns")}
          >
            <Columns2 className="h-[18px] w-[18px]" />
          </button>

          {panel === "columns" && (
            <div className="absolute right-0 top-9 z-20 w-[210px] rounded-sm border border-chef-line bg-chef-surface p-2 shadow-lg">
              {COLUMNS.map((col) => (
                <label
                  key={col.id}
                  className="flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-[13px] text-chef-text hover:bg-chef-pill/50"
                >
                  <input
                    type="checkbox"
                    checked={visibleColumns.includes(col.id)}
                    onChange={(e) =>
                      setVisibleColumns((prev) =>
                        e.target.checked ? [...prev, col.id] : prev.filter((c) => c !== col.id),
                      )
                    }
                  />
                  {col.label}
                </label>
              ))}
            </div>
          )}
        </div>
      </div>

      {showFilters && (
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {filters.map((f) => (
            <div
              key={f.id}
              className="group flex items-center gap-1 rounded-sm border border-chef-line bg-chef-surface pl-2 pr-1 text-[13px] text-chef-text"
            >
              <select
                aria-label="Filter field"
                value={f.field}
                onChange={(e) => updateFilter(f.id, { field: e.target.value as FilterField, value: "all" })}
                className="h-8 bg-transparent text-[13px] text-chef-text outline-none"
              >
                {FILTER_FIELDS.map((field) => (
                  <option key={field.id} value={field.id}>
                    {field.label}
                  </option>
                ))}
              </select>
              <span className="text-chef-text-muted">:</span>
              <select
                aria-label="Filter value"
                value={f.value}
                onChange={(e) => updateFilter(f.id, { value: e.target.value })}
                className="h-8 max-w-[160px] bg-transparent text-[13px] text-chef-text outline-none"
              >
                <option value="all">All</option>
                {optionsFor[f.field].map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
              <button
                type="button"
                aria-label="Remove filter"
                onClick={() => setFilters((prev) => prev.filter((x) => x.id !== f.id))}
                className="text-chef-text-muted hover:text-chef-blue"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addFilter}
            className="flex items-center gap-1 rounded-sm px-2 py-1.5 text-[13px] text-chef-green hover:text-chef-blue"
          >
            <Plus className="h-4 w-4" /> Filter
          </button>
          <button
            type="button"
            onClick={() => {
              setFilters((prev) => prev.map((f) => ({ ...f, value: "all" })));
              table.setPage(1);
            }}
            className="flex items-center gap-1 rounded-sm px-2 py-1.5 text-[13px] text-chef-text-muted hover:text-chef-blue"
          >
            <RotateCcw className="h-4 w-4" /> Reset
          </button>
        </div>
      )}

      <table className="mt-3 w-full border-collapse text-left">

        <thead>
          <tr className="border-y border-chef-line bg-chef-canvas">
            {shown.map((col) => (
              <SortHeader
                key={col.id}
                label={col.label}
                columnKey={col.id}
                sortKey={table.sortKey}
                sortDirection={table.sortDirection}
                onSort={table.toggleSort}
              />
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-b border-chef-line hover:bg-chef-canvas/60">
              {shown.map((col) => (
                <td key={col.id} className="px-4 py-2.5 text-[13px] text-chef-text">
                  {cellValue(row, col.id)}
                </td>
              ))}
            </tr>
          ))}
          {rows.length === 0 && (
            <tr>
              <td colSpan={shown.length} className="px-4 py-8 text-center text-[13px] text-chef-text-muted">
                No resources match the current filters.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="mt-4 flex items-center justify-end gap-4 text-[13px] text-chef-text">
        <span>
          <span className="font-semibold">
            {table.rangeStart} – {table.rangeEnd}
          </span>{" "}
          of {table.total} items
        </span>
        <div className="flex items-center gap-3 text-chef-text-muted">
          <button
            type="button"
            aria-label="Previous page"
            disabled={table.page === 1}
            onClick={() => table.setPage(table.page - 1)}
            className="disabled:opacity-40 hover:text-chef-blue"
          >
            ←
          </button>
          <button
            type="button"
            aria-label="Next page"
            disabled={table.page === table.pageCount}
            onClick={() => table.setPage(table.page + 1)}
            className="disabled:opacity-40 hover:text-chef-blue"
          >
            →
          </button>
        </div>
        <select
          aria-label="Resources per page"
          value={table.pageSize}
          onChange={(e) => table.setPageSize(Number(e.target.value))}
          className="h-9 rounded-sm border border-chef-line bg-chef-surface px-2 text-[13px] text-chef-text outline-none"
        >
          {[10, 25, 50].map((n) => (
            <option key={n} value={n}>
              {n} items per page
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
