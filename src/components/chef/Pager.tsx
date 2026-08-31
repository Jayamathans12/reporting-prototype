import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

export function Pager({ total, pageSize = 25 }: { total: number; pageSize?: number }) {
  const label =
    total === 0 ? "0 - 0 of 0 items" : `1 - ${total} of ${total} items`;

  return (
    <div className="flex items-center justify-between border-t border-chef-line px-4 py-2.5">
      <div className="flex items-center gap-1.5">
        {[ChevronsLeft, ChevronLeft].map((Icon, i) => (
          <button
            key={i}
            type="button"
            className="flex h-7 w-7 items-center justify-center rounded-sm text-chef-text-muted hover:bg-chef-pill/60"
          >
            <Icon className="h-4 w-4" />
          </button>
        ))}
        {total > 0 && (
          <span className="flex h-7 min-w-7 items-center justify-center rounded-sm bg-chef-pill px-2 text-[13px] font-medium text-chef-blue">
            1
          </span>
        )}
        {[ChevronRight, ChevronsRight].map((Icon, i) => (
          <button
            key={i}
            type="button"
            className="flex h-7 w-7 items-center justify-center rounded-sm text-chef-text-muted hover:bg-chef-pill/60"
          >
            <Icon className="h-4 w-4" />
          </button>
        ))}
        <select
          defaultValue={pageSize}
          className="ml-2 h-8 rounded-sm border border-chef-line bg-chef-surface px-2 text-[13px] text-chef-text outline-none"
          aria-label="Items per page"
        >
          {[10, 25, 50, 100].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
        <span className="ml-2 text-[13px] text-chef-text">items per page</span>
      </div>
      <span className="text-[13px] text-chef-text">{label}</span>
    </div>
  );
}
