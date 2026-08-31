import { createFileRoute, notFound, useNavigate } from "@tanstack/react-router";
import { nodes } from "@/data/nodes";
import { ModuleLayout } from "@/components/chef/ModuleLayout";
import { reportingRailItems } from "@/components/chef/rails";
import { ClientRunDetailPanel } from "@/components/chef/reporting/ClientRunDetailPanel";
import { getRunDetail, getRunHistory, resolveBaseRunId } from "@/data/clientRunDetail";

const DEFAULT_CRUMBS = [
  { label: "Reporting", to: "/reporting" },
  { label: "Client Reporting", to: "/reporting/client" },
  { label: "Client Run Details" },
];

export const Route = createFileRoute("/reporting/client/$runId")({
  validateSearch: (search: Record<string, unknown>): { node?: string } =>
    typeof search['node'] === "string" ? { node: search['node'] as string } : {},
  loader: ({ params }) => {
    const detail = getRunDetail(params.runId);
    if (!detail) throw notFound();
    return { detail, history: getRunHistory(resolveBaseRunId(params.runId)) };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Unavailable — Client Reporting" }, { name: "robots", content: "noindex" }],
      };
    }
    const title = `Client Run Details ${loaderData.detail.node} — Reporting`;
    const description = `Resources, run list and attributes for Chef Infra Client run ${loaderData.detail.id} on ${loaderData.detail.node}.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary" },
      ],
    };
  },
  component: ClientRunDetailsPage,
});

function ClientRunDetailsPage() {
  const { detail, history } = Route.useLoaderData();
  const { node: nodeId } = Route.useSearch();
  const node = nodeId ? nodes.find((n) => n.id === nodeId) : undefined;
  const crumbs = node
    ? [
        { label: "Reporting", to: "/reporting" },
        { label: "Node Management Reporting", to: "/reporting/node-management" },
        { label: node.hostname, to: `/reporting/node-management/${node.id}` },
        { label: "All Operations/Jobs", to: `/reporting/node-management/${node.id}` },
        { label: "Client Run Details" },
      ]
    : DEFAULT_CRUMBS;
  const navigate = useNavigate();

  return (
    <ModuleLayout
      moduleTitle="Reporting"
      railItems={reportingRailItems}
      crumbs={crumbs}
    >
      <h1 className="text-[24px] font-semibold text-chef-text">Client Run Details</h1>

      <ClientRunDetailPanel
        key={detail.id}
        detail={detail}
        history={history}
        onSelectRun={(runId) => navigate({ to: "/reporting/client/$runId", params: { runId } })}
      />
    </ModuleLayout>
  );
}
