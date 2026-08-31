import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/chef/PlaceholderPage";
import { nodeRailItems } from "@/components/chef/rails";

export const Route = createFileRoute("/nodes/activity")({
  head: () => ({
    meta: [
      { title: "Activity — Progress Chef 360" },
      { name: "description", content: "Review recent enrollment, skill install and restart activity on your fleet." },
      { property: "og:title", content: "Activity — Progress Chef 360" },
      { property: "og:description", content: "Review recent enrollment, skill install and restart activity on your fleet." },
    ],
  }),
  component: NodesActivityPage,
});

function NodesActivityPage() {
  return (
    <PlaceholderPage
      moduleTitle="Node Management"
      title="Activity"
      description="Review recent enrollment, skill install and restart activity on your fleet."
      railItems={nodeRailItems}
      crumbs={[{ label: "Chef 360 Nodes", to: "/nodes" }, { label: "Activity" }]}
    />
  );
}
