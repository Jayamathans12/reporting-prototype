import { MoreVertical } from "lucide-react";
import { ChefButton } from "./Buttons";
import { Pager } from "./Pager";
import { SearchBar } from "./SearchBar";
import type { DsmListPage } from "@/data/dsm";

export function ListPageShell({ page }: { page: DsmListPage }) {
  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-8">
        <div className="max-w-3xl">
          <h1 className="text-[26px] font-bold text-chef-text">{page.title}</h1>
          <p className="mt-2 text-[13px] leading-relaxed text-chef-text-muted">
            {page.description}
          </p>
        </div>
        {page.primaryAction && <ChefButton>{page.primaryAction}</ChefButton>}
      </div>

      <section className="rounded-sm border border-chef-line bg-chef-surface">
        <div className="flex items-center justify-between border-b border-chef-line bg-chef-tablehead/50 px-4 py-2.5">
          <h2 className="text-[14px] font-semibold text-chef-text">{page.title}</h2>
          <SearchBar placeholder={page.searchPlaceholder} />
        </div>

        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-chef-tablehead">
              {page.columns.map((col) => (
                <th
                  key={col}
                  className="px-4 py-2.5 text-[13px] font-semibold text-chef-text"
                >
                  {col}
                </th>
              ))}
              <th className="w-16 px-4 py-2.5 text-right text-[13px] font-semibold text-chef-text">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {page.rows.length === 0 ? (
              <tr>
                <td
                  colSpan={page.columns.length + 1}
                  className="px-4 py-6 text-center text-[13px] text-chef-text-muted"
                >
                  {page.emptyMessage}
                </td>
              </tr>
            ) : (
              page.rows.map((row) => (
                <tr key={row.join("-")} className="border-t border-chef-line">
                  {row.map((cell, i) => (
                    <td key={i} className="px-4 py-3 text-[13px] text-chef-text">
                      {cell}
                    </td>
                  ))}
                  <td className="px-4 py-3 text-right">
                    <button
                      type="button"
                      aria-label="Row actions"
                      className="text-chef-text-muted hover:text-chef-text"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <Pager total={page.rows.length} />
      </section>
    </div>
  );
}
