import { useEffect, useState } from "react";
import { BarChart3, ChevronLeft, ChevronRight, X } from "lucide-react";
import { ControlResults } from "./ControlTable";
import { StatusIcon, StatusPill } from "../StatusPill";
import type { ControlDetail } from "@/data/complianceDetail";

export interface DrawerItem {
  id: string;
  label: string;
  sublabel?: string;
  status: "Passed" | "Failed";
}

export function ScanResultsDrawer({
  open,
  onClose,
  title,
  subtitle,
  controls,
  items,
  getControlsForItem,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle: string;
  controls: ControlDetail[];
  /** When provided, the drawer first lists items and only shows controls after one is picked. */
  items?: DrawerItem[] | undefined;
  getControlsForItem?: ((item: DrawerItem) => ControlDetail[]) | undefined;
}) {
  const [selected, setSelected] = useState<DrawerItem | null>(null);

  useEffect(() => {
    if (!open) setSelected(null);
  }, [open]);

  useEffect(() => {
    setSelected(null);
  }, [title, subtitle]);

  if (!open) return null;

  const listMode = Array.isArray(items);
  const shownControls = listMode
    ? selected
      ? (getControlsForItem?.(selected) ?? [])
      : []
    : controls;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button type="button" aria-label="Close results" className="flex-1 bg-black/40" onClick={onClose} />
      <aside className="flex h-full w-full max-w-[560px] flex-col bg-chef-surface shadow-xl">
        <header className="flex items-start justify-between gap-3 border-b border-chef-line px-5 py-4">
          <div className="flex min-w-0 items-start gap-3">
            <BarChart3 className="mt-0.5 h-5 w-5 shrink-0 text-chef-text-muted" />
            <div className="min-w-0">
              <h2 className="truncate text-[15px] font-semibold text-chef-text">{title}</h2>
              <p className="truncate text-[13px] text-chef-text-muted">{subtitle}</p>
            </div>
          </div>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="rounded-sm border border-chef-blue p-1 text-chef-blue hover:bg-chef-blue/10"
          >
            <X className="h-4 w-4" />
          </button>
        </header>

        {listMode && !selected && (
          <div className="border-b border-chef-line bg-chef-canvas px-5 py-3 text-[13px] text-chef-text-muted">
            Tap on an item to view detailed scan results
          </div>
        )}

        {listMode && selected && (
          <div className="flex items-center gap-3 border-b border-chef-line bg-chef-canvas px-5 py-3">
            <button
              type="button"
              aria-label="Back"
              onClick={() => setSelected(null)}
              className="rounded-sm border border-chef-blue p-1 text-chef-blue hover:bg-chef-blue/10"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="truncate text-[13px] font-medium text-chef-text">{selected.label}</span>
          </div>
        )}

        {listMode && !selected ? (
          <div className="flex-1 overflow-y-auto">
            {items!.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelected(item)}
                className="flex w-full items-center justify-between gap-3 border-b border-chef-line px-5 py-4 text-left hover:bg-chef-canvas/70"
              >
                <span className="flex min-w-0 items-center gap-3">
                  <StatusIcon status={item.status} className="h-4 w-4 shrink-0" />
                  <span className="min-w-0">
                    <span className="block truncate text-[13px] font-medium text-chef-text">
                      {item.label}
                    </span>
                    <span className="block text-[12px] text-chef-text-muted">{item.sublabel}</span>
                  </span>
                </span>
                <span className="rounded-sm border border-chef-blue p-1 text-chef-blue">
                  <ChevronRight className="h-4 w-4" />
                </span>
              </button>
            ))}
            {items!.length === 0 && (
              <p className="py-10 text-center text-[13px] text-chef-text-muted">
                Nothing to show here.
              </p>
            )}
          </div>
        ) : (
          <div className="flex-1 space-y-4 overflow-y-auto px-5 py-4">
            {shownControls.map((control) => (
              <section key={control.id} className="rounded-sm border border-chef-line p-4">
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-[13px] font-semibold text-chef-text">{control.key}</h3>
                    <p className="text-[13px] text-chef-text-muted">{control.title}</p>
                  </div>
                  <StatusPill status={control.status} />
                </div>
                <ControlResults control={control} />
              </section>
            ))}
            {shownControls.length === 0 && (
              <p className="py-10 text-center text-[13px] text-chef-text-muted">
                No control results available.
              </p>
            )}
          </div>
        )}
      </aside>
    </div>
  );
}
