import { clientRuns } from "./reporting";
import { getRunDetail } from "./clientRunDetail";
import type { AttributeNode, RunListNode } from "./clientRunDetail";

export interface DsmRunListEntry {
  name: string;
  version: string;
  position: number;
  kind: "role" | "recipe" | "cookbook";
}

export interface DsmNode {
  id: string;
  name: string;
  platform: string;
  fqdn: string;
  environment: string;
  policyGroup: string;
  lastCheckIn: string;
  uptime: string;
  idleTime: string;
  tags: string[];
  runList: DsmRunListEntry[];
  attributes: AttributeNode[];
}

function flattenRunList(nodes: RunListNode[], out: DsmRunListEntry[] = []): DsmRunListEntry[] {
  for (const node of nodes) {
    out.push({
      name: node.name,
      version: node.version || "default",
      position: out.length,
      kind: node.kind,
    });
    if (node.children) flattenRunList(node.children, out);
  }
  return out;
}

function slugify(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export const dsmNodes: DsmNode[] = (() => {
  const seen = new Set<string>();
  const nodes: DsmNode[] = [];

  for (const run of clientRuns) {
    if (seen.has(run.node)) continue;
    seen.add(run.node);
    const detail = getRunDetail(run.id);
    const info = new Map((detail?.nodeInformation ?? []).map((i) => [i.label, i.value]));

    nodes.push({
      id: slugify(run.node),
      name: run.node,
      platform: run.platform,
      fqdn: info.get("FQDN") ?? `${run.node}.${slugify(run.environment || run.policyGroup || "default")}.compute.internal`,
      environment: run.environment,
      policyGroup: run.policyGroup,
      lastCheckIn: run.lastRun,
      uptime: run.uptime,
      idleTime: info.get("Idle Time") ?? "3 days 19 hours 51 minutes 09 seconds",
      tags: [],
      runList: flattenRunList(detail?.runList ?? []),
      attributes: detail?.attributes ?? [],
    });
  }

  return nodes;
})();

export function getDsmNode(id: string): DsmNode | undefined {
  return dsmNodes.find((n) => n.id === id || n.name === id);
}
