import { BookOpen, FileText, Layers } from "lucide-react";
import type { RunListNode } from "@/data/clientRunDetail";

function flatten(nodes: RunListNode[], acc: RunListNode[] = []): RunListNode[] {
  for (const node of nodes) {
    acc.push(node);
    if (node.children?.length) flatten(node.children, acc);
  }
  return acc;
}

function KindIcon({ kind }: { kind: RunListNode["kind"] }) {
  const cls = "h-4 w-4 text-chef-text-muted";
  if (kind === "cookbook") return <BookOpen className={cls} />;
  if (kind === "role") return <Layers className={cls} />;
  return <FileText className={cls} />;
}

export function RunListTree({ nodes }: { nodes: RunListNode[] }) {
  const rows = flatten(nodes);

  return (
    <div className="pt-4">
      <div className="flex items-baseline gap-3 pb-3">
        <h3 className="text-[15px] text-chef-text">Run List</h3>
        <span className="text-[13px] text-chef-text-muted">Showing {rows.length} results</span>
      </div>
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="border-y border-chef-line bg-chef-canvas">
            <th className="px-4 py-2.5 text-[13px] font-semibold text-chef-text">Name</th>
            <th className="w-[200px] px-4 py-2.5 text-[13px] font-semibold text-chef-text">Type</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((node) => (
            <tr key={node.id} className="border-b border-chef-line last:border-0 hover:bg-chef-canvas/60">
              <td className="px-4 py-2.5 text-[13px] text-chef-text">
                <span className="flex items-center gap-2">
                  <KindIcon kind={node.kind} />
                  {node.name}
                </span>
              </td>
              <td className="px-4 py-2.5 text-[13px] capitalize text-chef-text">{node.kind}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
