import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/chef/PlaceholderPage";
import { nodeRailItems } from "@/components/chef/rails";

export const Route = createFileRoute("/nodes/skills")({
  head: () => ({
    meta: [
      { title: "Skills — Progress Chef 360" },
      { name: "description", content: "Browse and install skills across your enrolled Chef 360 nodes." },
      { property: "og:title", content: "Skills — Progress Chef 360" },
      { property: "og:description", content: "Browse and install skills across your enrolled Chef 360 nodes." },
    ],
  }),
  component: NodesSkillsPage,
});

function NodesSkillsPage() {
  return (
    <PlaceholderPage
      moduleTitle="Node Management"
      title="Skills"
      description="Browse and install skills across your enrolled Chef 360 nodes."
      railItems={nodeRailItems}
      crumbs={[{ label: "Chef 360 Nodes", to: "/nodes" }, { label: "Skills" }]}
    />
  );
}
