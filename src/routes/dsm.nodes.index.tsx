import { useEffect, useMemo, useRef, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { MoreVertical, Search, X } from "lucide-react";
import { ModuleLayout } from "@/components/chef/ModuleLayout";
import { dsmRailItems } from "@/components/chef/rails";
import { Pager } from "@/components/chef/Pager";
import { dsmNodes } from "@/data/dsmNodes";
import { getDsmPage } from "@/data/dsm";

const page = getDsmPage("nodes")!;

const ROW_ACTIONS = [
  "Update Run List",
  "Update Attributes",
  "Update Environment",
  "Update Policy Group",
  "Reset Key",
  "Manage Tags",
  "Delete",
];

export const Route = createFileRoute("/dsm/nodes/")({
  head: () => ({
    meta: [
      { title: "DSM Nodes — Declarative State Management — Chef 360" },
      {
        name: "description",
        content:
          "DSM managed nodes with platform, FQDN and environment. Open a node for its run list and node attributes.",
      },
      { property: "og:title", content: "DSM Nodes — Declarative State Management — Chef 360" },
      {
        property: "og:description",
        content: "Browse DSM nodes and drill into node details, run list and attributes.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: DsmNodesPage,
});

function DsmNodesPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [menuFor, setMenuFor] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onDown(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuFor(null);
    }
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q
      ? dsmNodes.filter((n) =>
          [n.name, n.platform, n.fqdn, n.environment].some((v) => v.toLowerCase().includes(q)),
        )
      : dsmNodes;
  }, [query]);

  const open = (id: string) => navigate({ to: "/dsm/nodes/$nodeId", params: { nodeId: id } });

  return (
    <ModuleLayout
      moduleTitle="Declarative State Management (DSM)"
      railItems={dsmRailItems}
      crumbs={[{ label: "DSM Nodes" }]}
    >
      <div className="space-y-4">
        <div className="max-w-3xl">
          <h1 className="text-[26px] font-bold text-chef-text">{page.title}</h1>
          <p className="mt-2 text-[13px] leading-relaxed text-chef-text-muted">{page.description}</p>
        </div>

        <section className="rounded-sm border border-chef-line bg-chef-surface">
          <div className="flex items-center justify-between border-b border-chef-line bg-chef-tablehead/50 px-4 py-2.5">
            <h2 className="text-[14px] font-semibold text-chef-text">
              Nodes{" "}
              <span className="font-normal text-chef-text-muted">
                - 1 - {rows.length} of {rows.length}
              </span>
            </h2>
            <div className="relative">
              <Search className="pointer-events-none absolute left-2.5 top-2.5 h-4 w-4 text-chef-text-muted" />
              <input
                aria-label="Search DSM nodes"
                placeholder={page.searchPlaceholder}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="h-9 w-[240px] rounded-sm border border-chef-line bg-chef-surface pl-8 pr-8 text-[13px] text-chef-text outline-none focus:border-chef-blue"
              />
              {query && (
                <button
                  type="button"
                  aria-label="Clear search"
                  onClick={() => setQuery("")}
                  className="absolute right-2.5 top-2.5 text-chef-text-muted hover:text-chef-blue"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-chef-tablehead">
                {["Node Name", "Platform", "FQDN", "Environment"].map((col) => (
                  <th key={col} className="px-4 py-2.5 text-[13px] font-semibold text-chef-text">
                    {col}
                  </th>
                ))}
                <th className="w-20 px-4 py-2.5 text-right text-[13px] font-semibold text-chef-text">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-6 text-center text-[13px] text-chef-text-muted">
                    {page.emptyMessage}
                  </td>
                </tr>
              ) : (
                rows.map((node) => (
                  <tr
                    key={node.id}
                    tabIndex={0}
                    role="link"
                    aria-label={`Open node details for ${node.name}`}
                    onClick={() => open(node.id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        open(node.id);
                      }
                    }}
                    className="cursor-pointer border-t border-chef-line hover:bg-chef-canvas/70"
                  >
                    <td className="px-4 py-3 text-[13px] text-chef-text">{node.name}</td>
                    <td className="px-4 py-3 text-[13px] text-chef-text">{node.platform}</td>
                    <td className="px-4 py-3 text-[13px] text-chef-text">{node.fqdn}</td>
                    <td className="px-4 py-3 text-[13px] text-chef-text">{node.environment || "—"}</td>
                    <td className="px-4 py-3 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="relative inline-block" ref={menuFor === node.id ? menuRef : undefined}>
                        <button
                          type="button"
                          aria-label={`Actions for ${node.name}`}
                          onClick={() => setMenuFor((v) => (v === node.id ? null : node.id))}
                          className="text-chef-text-muted hover:text-chef-text"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </button>
                        {menuFor === node.id && (
                          <div className="absolute right-0 top-6 z-20 w-[190px] rounded-sm border border-chef-line bg-chef-surface py-1 text-left shadow-lg">
                            {ROW_ACTIONS.map((action) => (
                              <button
                                key={action}
                                type="button"
                                onClick={() => setMenuFor(null)}
                                className="block w-full px-3 py-1.5 text-left text-[13px] text-chef-text hover:bg-chef-pill/50"
                              >
                                {action}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          <Pager total={rows.length} />
        </section>
      </div>
    </ModuleLayout>
  );
}
