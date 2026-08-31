import { useState, type ReactNode } from "react";
import { TopBar } from "./TopBar";
import { ModuleRail, type RailItem } from "./ModuleRail";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";

export function ModuleLayout({
  moduleTitle,
  railItems,
  crumbs,
  children,
}: {
  moduleTitle: string;
  railItems: RailItem[];
  crumbs: Crumb[];
  children: ReactNode;
}) {
  const [pinned, setPinned] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-chef-canvas">
      <TopBar moduleTitle={moduleTitle} />
      <div className="flex flex-1">
        <ModuleRail
          items={railItems}
          expanded={pinned || hovered}
          onToggle={() => setPinned((v) => !v)}
          onHoverChange={setHovered}
        />
        <main className="min-w-0 flex-1 px-8 py-5">
          <div className="mb-4">
            <Breadcrumbs items={crumbs} />
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
