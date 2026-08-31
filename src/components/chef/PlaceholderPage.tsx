import { ModuleLayout } from "./ModuleLayout";
import type { RailItem } from "./ModuleRail";

export function PlaceholderPage({
  moduleTitle,
  title,
  description,
  railItems,
  crumbs,
}: {
  moduleTitle: string;
  title: string;
  description: string;
  railItems: RailItem[];
  crumbs: { label: string; to?: string }[];
}) {
  return (
    <ModuleLayout moduleTitle={moduleTitle} railItems={railItems} crumbs={crumbs}>
      <h1 className="text-[28px] font-bold text-chef-text">{title}</h1>
      <p className="mt-2 max-w-3xl text-[13px] leading-relaxed text-chef-text-muted">
        {description}
      </p>
      <div className="mt-6 rounded-sm border border-chef-line bg-chef-surface px-4 py-10 text-center text-[13px] text-chef-text-muted">
        This module is not part of the current prototype scope.
      </div>
    </ModuleLayout>
  );
}
