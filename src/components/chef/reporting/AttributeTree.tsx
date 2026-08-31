import { useMemo, useState } from "react";
import { ChevronDown, ChevronRight, Filter as FilterIcon, Search, X } from "lucide-react";
import { FilterChipBar } from "./FilterChipBar";
import { countAttributes } from "@/data/clientRunDetail";
import type { AttributeNode, AttributeSource } from "@/data/clientRunDetail";

type Filter = "all" | AttributeSource;

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "default", label: "Default" },
  { id: "normal", label: "Normal" },
  { id: "override", label: "Override" },
  { id: "automatic", label: "Automatic" },
];

function filterTree(nodes: AttributeNode[], source: Filter, query: string): AttributeNode[] {
  const q = query.trim().toLowerCase();
  const out: AttributeNode[] = [];
  for (const node of nodes) {
    if (node.children) {
      const kids = filterTree(node.children, source, query);
      if (kids.length || node.key.toLowerCase().includes(q)) {
        const kept = kids.length ? kids : filterTree(node.children, source, "");
        if (kept.length) out.push({ ...node, children: kept });
      }
      continue;
    }
    const matchesSource = source === "all" || node.source === source;
    const matchesQuery =
      !q || node.key.toLowerCase().includes(q) || (node.value ?? "").toLowerCase().includes(q);
    if (matchesSource && matchesQuery) out.push(node);
  }
  return out;
}

function collectIds(nodes: AttributeNode[], prefix = "", acc: string[] = []): string[] {
  for (const n of nodes) {
    const id = `${prefix}/${n.key}`;
    if (n.children) {
      acc.push(id);
      collectIds(n.children, id, acc);
    }
  }
  return acc;
}

function Branch({
  nodes,
  prefix,
  depth,
  expanded,
  toggle,
}: {
  nodes: AttributeNode[];
  prefix: string;
  depth: number;
  expanded: Set<string>;
  toggle: (id: string) => void;
}) {
  return (
    <>
      {nodes.map((node) => {
        const id = `${prefix}/${node.key}`;
        const isOpen = expanded.has(id);
        return (
          <li key={id}>
            <div
              className="flex items-center gap-2 border-b border-chef-line px-3 py-2 font-mono text-[13px]"
              style={{ paddingLeft: 12 + depth * 20 }}
            >
              {node.children ? (
                <button
                  type="button"
                  aria-label={`${isOpen ? "Collapse" : "Expand"} ${node.key}`}
                  onClick={() => toggle(id)}
                  className="text-chef-text-muted hover:text-chef-blue"
                >
                  {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                </button>
              ) : (
                <span className="w-4" />
              )}
              <span className="text-chef-blue">&quot;{node.key}&quot;</span>
              <span className="text-chef-text-muted">:</span>
              {node.children ? (
                <span className="text-chef-text-muted">{isOpen ? "{" : "{ … },"}</span>
              ) : (
                <>
                  <span className="text-chef-text">{node.value}</span>
                  <span className="ml-2 rounded-sm bg-chef-pill px-1.5 py-0.5 font-sans text-[11px] text-chef-pill-foreground">
                    {node.source}
                  </span>
                </>
              )}
            </div>
            {node.children && isOpen && (
              <ul>
                <Branch
                  nodes={node.children}
                  prefix={id}
                  depth={depth + 1}
                  expanded={expanded}
                  toggle={toggle}
                />
              </ul>
            )}
          </li>
        );
      })}
    </>
  );
}

export function AttributeTree({
  attributes,
  showHeading = true,
}: {
  attributes: AttributeNode[];
  showHeading?: boolean;
}) {
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const counts = useMemo(() => countAttributes(attributes), [attributes]);
  const tree = useMemo(() => filterTree(attributes, filter, query), [attributes, filter, query]);
  const visibleLeaves = useMemo(() => countAttributes(tree).all, [tree]);

  function toggle(id: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <div className="pt-4">
      <div className="mt-1 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-baseline gap-3">
          {showHeading && <h3 className="text-[15px] text-chef-text">Node Attributes</h3>}
          <span className="text-[13px] text-chef-text-muted">Showing {visibleLeaves} results</span>
        </div>
        <div className="relative flex items-center gap-1">
          <div className="relative">
            <Search className="pointer-events-none absolute left-2.5 top-2.5 h-4 w-4 text-chef-text-muted" />
            <input
              aria-label="Search attributes"
              placeholder="Search attributes..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                if (e.target.value) setExpanded(new Set(collectIds(attributes)));
              }}
              className="h-9 w-[260px] rounded-sm border border-chef-line bg-chef-surface pl-8 pr-8 text-[13px] text-chef-text outline-none focus:border-chef-blue"
            />
            {query && (
              <button
                type="button"
                aria-label="Clear attribute search"
                onClick={() => setQuery("")}
                className="absolute right-2.5 top-2.5 text-chef-text-muted hover:text-chef-blue"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <button
            type="button"
            aria-label="Filter attributes"
            onClick={() => setFilterOpen((v) => !v)}
            className={`flex h-8 w-8 items-center justify-center rounded-sm hover:text-chef-blue ${
              filterOpen || filter !== "all" ? "text-chef-blue" : "text-chef-text-muted"
            }`}
          >
            <FilterIcon className="h-[18px] w-[18px]" />
          </button>
        </div>
      </div>

      {filterOpen && (
        <div className="mt-3">
          <FilterChipBar
            groups={[
              {
                id: "source",
                label: "Source",
                value: filter,
                onChange: (value) => setFilter(value as Filter),
                options: FILTERS.map((item) => ({
                  key: item.id,
                  label: item.label,
                  count: counts[item.id],
                })),
              },
            ]}
          />
        </div>
      )}

      <div className="mt-3 flex gap-6 text-[13px] text-chef-text">
        <button type="button" className="hover:text-chef-blue" onClick={() => setExpanded(new Set(collectIds(attributes)))}>
          Expand All
        </button>
        <button type="button" className="hover:text-chef-blue" onClick={() => setExpanded(new Set())}>
          Collapse All
        </button>
      </div>

      <ul className="mt-3 border-t border-chef-line">
        <Branch nodes={tree} prefix="" depth={0} expanded={expanded} toggle={toggle} />
        {tree.length === 0 && (
          <li className="px-3 py-8 text-center text-[13px] text-chef-text-muted">No attributes match.</li>
        )}
      </ul>
    </div>
  );
}
