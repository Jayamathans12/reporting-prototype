import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface RailItem {
  label: string;
  to: string;
  icon: LucideIcon;
}

export function ModuleRail({
  items,
  expanded,
  onToggle,
  onHoverChange,
}: {
  items: RailItem[];
  expanded: boolean;
  onToggle: () => void;
  onHoverChange?: (hovered: boolean) => void;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <aside
      onMouseEnter={() => onHoverChange?.(true)}
      onMouseMove={() => onHoverChange?.(true)}
      onWheel={() => onHoverChange?.(true)}
      onMouseLeave={() => onHoverChange?.(false)}
      className={cn(
        "relative shrink-0 bg-chef-rail pt-16 transition-[width] duration-200",
        expanded ? "w-[200px]" : "w-[72px]",
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-label={expanded ? "Collapse navigation" : "Expand navigation"}
        className="absolute -right-3 top-5 z-20 flex h-6 w-6 items-center justify-center rounded-full bg-chef-blue text-chef-blue-foreground shadow"
      >
        <ChevronRight className={cn("h-4 w-4 transition-transform", expanded && "rotate-180")} />
      </button>

      <nav className="flex flex-col">
        {items.map((item) => {
          const active = pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              title={item.label}
              className={cn(
                "flex items-center gap-3 py-3 text-[13px] text-chef-chrome-muted transition-colors hover:bg-chef-rail-active hover:text-chef-chrome-foreground",
                expanded ? "px-4" : "justify-center px-0",
                active &&
                  "bg-chef-rail-active text-chef-chrome-foreground shadow-[inset_3px_0_0_var(--chef-blue)]",
              )}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {expanded && <span className="truncate">{item.label}</span>}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
