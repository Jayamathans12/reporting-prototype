import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/chef/PlaceholderPage";
import { nodeRailItems } from "@/components/chef/rails";

export const Route = createFileRoute("/nodes/enroll")({
  head: () => ({
    meta: [
      { title: "Enroll Nodes — Progress Chef 360" },
      { name: "description", content: "Generate enrollment commands and onboard new nodes into Chef 360." },
      { property: "og:title", content: "Enroll Nodes — Progress Chef 360" },
      { property: "og:description", content: "Generate enrollment commands and onboard new nodes into Chef 360." },
    ],
  }),
  component: NodesEnrollPage,
});

function NodesEnrollPage() {
  return (
    <PlaceholderPage
      moduleTitle="Node Management"
      title="Enroll Nodes"
      description="Generate enrollment commands and onboard new nodes into Chef 360."
      railItems={nodeRailItems}
      crumbs={[{ label: "Chef 360 Nodes", to: "/nodes" }, { label: "Enroll Nodes" }]}
    />
  );
}
