import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/chef/PlaceholderPage";
import { nodeRailItems } from "@/components/chef/rails";

export const Route = createFileRoute("/nodes/cohorts")({
  head: () => ({
    meta: [
      { title: "Node Cohorts — Progress Chef 360" },
      { name: "description", content: "Group enrolled nodes into cohorts for bulk skill and policy management." },
      { property: "og:title", content: "Node Cohorts — Progress Chef 360" },
      { property: "og:description", content: "Group enrolled nodes into cohorts for bulk skill and policy management." },
    ],
  }),
  component: NodesCohortsPage,
});

function NodesCohortsPage() {
  return (
    <PlaceholderPage
      moduleTitle="Node Management"
      title="Node Cohorts"
      description="Group enrolled nodes into cohorts for bulk skill and policy management."
      railItems={nodeRailItems}
      crumbs={[{ label: "Chef 360 Nodes", to: "/nodes" }, { label: "Node Cohorts" }]}
    />
  );
}
