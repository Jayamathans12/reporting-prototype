import { ChevronDown, ChevronsUpDown, ChevronUp } from "lucide-react";
import type { SortDirection } from "@/hooks/useTableControls";

export function SortHeader({
  label,
  columnKey,
  sortKey,
  sortDirection,
  onSort,
  className = "",
}: {
  label: string;
  columnKey: string;
  sortKey: string | null;
  sortDirection: SortDirection;
  onSort: (key: string) => void;
  className?: string;
}) {
  const active = sortKey === columnKey && sortDirection !== null;
  const Icon = !active ? ChevronsUpDown : sortDirection === "asc" ? ChevronUp : ChevronDown;
  return (
    <th className={`px-4 py-3 text-left text-[13px] font-semibold text-chef-text ${className}`}>
      <button
        type="button"
        onClick={() => onSort(columnKey)}
        aria-label={`Sort by ${label}`}
        className="inline-flex items-center gap-1.5 hover:text-chef-blue"
      >
        {label}
        <Icon className={`h-3.5 w-3.5 ${active ? "text-chef-blue" : "text-chef-text-muted"}`} />
      </button>
    </th>
  );
}
