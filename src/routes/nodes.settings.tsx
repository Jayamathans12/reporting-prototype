import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/chef/PlaceholderPage";
import { nodeRailItems } from "@/components/chef/rails";

export const Route = createFileRoute("/nodes/settings")({
  head: () => ({
    meta: [
      { title: "Settings — Progress Chef 360" },
      { name: "description", content: "Configure node management defaults, retention and health thresholds." },
      { property: "og:title", content: "Settings — Progress Chef 360" },
      { property: "og:description", content: "Configure node management defaults, retention and health thresholds." },
    ],
  }),
  component: NodesSettingsPage,
});

function NodesSettingsPage() {
  return (
    <PlaceholderPage
      moduleTitle="Node Management"
      title="Settings"
      description="Configure node management defaults, retention and health thresholds."
      railItems={nodeRailItems}
      crumbs={[{ label: "Chef 360 Nodes", to: "/nodes" }, { label: "Settings" }]}
    />
  );
}
