import { ChevronDown, Columns2, Filter, Search } from "lucide-react";

export function SplitButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="inline-flex h-10 items-center gap-3 rounded-sm bg-chef-blue px-4 text-[14px] font-medium text-chef-blue-foreground transition-colors hover:bg-chef-blue-hover"
    >
      {label}
      <ChevronDown className="h-4 w-4" />
    </button>
  );
}

export function TableToolbar({
  title,
  resultLabel,
}: {
  title: string;
  resultLabel: string;
}) {
  return (
    <div className="flex items-center justify-between px-1 pb-3">
      <div className="flex items-baseline gap-3">
        <h2 className="text-[16px] font-semibold text-chef-text">{title}</h2>
        <span className="text-[13px] text-chef-text-muted">{resultLabel}</span>
      </div>
      <div className="flex items-center gap-3 text-chef-text-muted">
        <button type="button" aria-label="Search" className="hover:text-chef-blue">
          <Search className="h-[18px] w-[18px]" />
        </button>
        <button type="button" aria-label="Filter" className="hover:text-chef-blue">
          <Filter className="h-[18px] w-[18px]" />
        </button>
        <button type="button" aria-label="Choose columns" className="hover:text-chef-blue">
          <Columns2 className="h-[18px] w-[18px]" />
        </button>
      </div>
    </div>
  );
}

export function ItemsPager({ shown, total }: { shown: number; total: number }) {
  return (
    <div className="mt-4 flex items-center justify-end gap-4 text-[13px] text-chef-text">
      <span>
        <span className="font-semibold">1 – {shown}</span> of {total} items
      </span>
      <div className="flex items-center gap-3 text-chef-text-muted">
        <button type="button" aria-label="Previous page" className="hover:text-chef-blue">
          ←
        </button>
        <button type="button" aria-label="Next page" className="hover:text-chef-blue">
          →
        </button>
      </div>
      <select
        aria-label="Items per page"
        defaultValue={10}
        className="h-9 rounded-sm border border-chef-line bg-chef-surface px-2 text-[13px] text-chef-text outline-none"
      >
        {[10, 25, 50].map((n) => (
          <option key={n} value={n}>
            {n} items per page
          </option>
        ))}
      </select>
    </div>
  );
}
