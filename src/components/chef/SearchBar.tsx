import { RefreshCw, Search } from "lucide-react";

export function SearchBar({ placeholder }: { placeholder: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <input
          type="search"
          placeholder={placeholder}
          aria-label={placeholder}
          className="h-9 w-[190px] rounded-sm border border-chef-line bg-chef-surface pl-3 pr-8 text-[13px] text-chef-text outline-none placeholder:text-chef-text-muted focus:border-chef-blue"
        />
        <Search className="pointer-events-none absolute right-2.5 top-2.5 h-4 w-4 text-chef-text-muted" />
      </div>
      <button
        type="button"
        aria-label="Refresh"
        className="flex h-9 w-9 items-center justify-center rounded-sm bg-chef-blue text-chef-blue-foreground transition-colors hover:bg-chef-blue-hover"
      >
        <RefreshCw className="h-4 w-4" />
      </button>
    </div>
  );
}
