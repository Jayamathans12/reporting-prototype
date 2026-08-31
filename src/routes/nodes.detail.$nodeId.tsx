import { useState } from "react";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { ModuleLayout } from "@/components/chef/ModuleLayout";
import { nodeRailItems } from "@/components/chef/rails";
import { ChefButton } from "@/components/chef/Buttons";
import { NodeDetailsPanel } from "@/components/chef/NodeDetailsPanel";
import { nodes } from "@/data/nodes";
import { ClientRunDetailPanel } from "@/components/chef/reporting/ClientRunDetailPanel";
import { ComplianceScanDetailPanel } from "@/components/chef/reporting/ComplianceScanDetailPanel";
import { getRunDetail, getRunHistory, resolveBaseRunId } from "@/data/clientRunDetail";
import { getScanDetail, getScanHistory } from "@/data/complianceDetail";
import { getRunIdForNode, getScanIdForNode } from "@/data/nodeReporting";

export const Route = createFileRoute("/nodes/detail/$nodeId")({
  loader: ({ params }) => {
    const node = nodes.find((n) => n.id === params.nodeId);
    if (!node) throw notFound();
    return {
      node,
      runId: getRunIdForNode(node.id) ?? null,
      scanId: getScanIdForNode(node.id) ?? null,
    };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Node not found — Node Management" }, { name: "robots", content: "noindex" }],
      };
    }
    const title = `Node ${loaderData.node.ip} — Node Management`;
    const description = `Details, attributes, Chef Infra Client run and compliance scan for Chef 360 node ${loaderData.node.ip}.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: NodeDetailPage,
});

function NodeDetailPage() {
  const { node, runId, scanId } = Route.useLoaderData();
  const scanDetail = scanId ? getScanDetail(scanId) : undefined;

  return (
    <ModuleLayout
      moduleTitle="Node Management"
      railItems={nodeRailItems}
      crumbs={[
        { label: "Node Management", to: "/nodes" },
        { label: "All nodes", to: "/nodes" },
        { label: node.hostname },
      ]}
    >
      <div className="flex items-center justify-between">
        <h1 className="text-[26px] font-bold text-chef-text">Node FQDN: {node.ip}</h1>
        <div className="flex gap-3">
          <ChefButton variant="outline">Archive Node</ChefButton>
          <ChefButton>Restart Node</ChefButton>
          <ChefButton>Create Courier Job</ChefButton>
        </div>
      </div>

      <div className="mt-5">
        <NodeDetailsPanel node={node} />
      </div>

      <SectionHeading title="Chef Infra Client Run" />
      {runId ? (
        <ClientRunSection initialRunId={runId} />
      ) : (
        <EmptyState label="No Chef Infra Client runs for this node." />
      )}

      <SectionHeading title="Compliance Scan" />
      {scanDetail ? (
        <ComplianceScanDetailPanel
          key={scanDetail.scan.id}
          detail={scanDetail}
          history={getScanHistory(scanDetail.scan.id)}
          showHeader={false}
        />
      ) : (
        <EmptyState label="No compliance scans for this node." />
      )}
    </ModuleLayout>
  );
}

function SectionHeading({ title }: { title: string }) {
  return (
    <h2 className="mt-8 mb-3 text-[18px] font-bold text-chef-text">{title}</h2>
  );
}

function EmptyState({ label }: { label: string }) {
  return (
    <p className="rounded-sm border border-chef-line bg-chef-surface px-4 py-10 text-center text-[13px] text-chef-text-muted">
      {label}
    </p>
  );
}

function ClientRunSection({ initialRunId }: { initialRunId: string }) {
  const [runId, setRunId] = useState(initialRunId);
  const detail = getRunDetail(runId);
  if (!detail) return <EmptyState label="No Chef Infra Client runs for this node." />;
  const history = getRunHistory(resolveBaseRunId(runId));
  return (
    <ClientRunDetailPanel key={runId} detail={detail} history={history} onSelectRun={setRunId} />
  );
}
