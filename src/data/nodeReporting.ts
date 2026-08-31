import { nodes } from "./nodes";
import { clientRuns } from "./reporting";
import { complianceScans } from "./complianceDetail";

/**
 * The mock datasets use different identifiers (nodes by IP, client runs by node
 * name, compliance scans by node name). These resolvers map each Chef 360 node
 * to one client-run series and one compliance-scan series deterministically so
 * every node page is populated.
 */
function nodeIndex(nodeId: string): number {
  const idx = nodes.findIndex((n) => n.id === nodeId);
  return idx < 0 ? 0 : idx;
}

export function getRunIdForNode(nodeId: string): string | undefined {
  if (clientRuns.length === 0) return undefined;
  return clientRuns[nodeIndex(nodeId) % clientRuns.length]!.id;
}

export function getScanIdForNode(nodeId: string): string | undefined {
  if (complianceScans.length === 0) return undefined;
  return complianceScans[nodeIndex(nodeId) % complianceScans.length]!.id;
}
