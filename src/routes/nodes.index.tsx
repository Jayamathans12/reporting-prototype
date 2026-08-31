import { createFileRoute } from "@tanstack/react-router";
import { ModuleLayout } from "@/components/chef/ModuleLayout";
import { nodeRailItems } from "@/components/chef/rails";
import { ChefButton } from "@/components/chef/Buttons";
import { NodesTable } from "@/components/chef/NodesTable";

export const Route = createFileRoute("/nodes/")({
  head: () => ({
    meta: [
      { title: "Chef 360 Nodes — Node Management" },
      {
        name: "description",
        content:
          "View, filter, enroll and archive Chef 360 nodes, and inspect installed skills per node.",
      },
      { property: "og:title", content: "Chef 360 Nodes — Node Management" },
      {
        property: "og:description",
        content: "Manage enrolled Chef 360 nodes, node lists and node filters.",
      },
    ],
  }),
  component: NodesPage,
});

function NodesPage() {
  return (
    <ModuleLayout
      moduleTitle="Node Management"
      railItems={nodeRailItems}
      crumbs={[{ label: "Chef 360 Nodes" }]}
    >
      <div className="flex items-center justify-between">
        <h1 className="text-[28px] font-bold text-chef-text">Chef 360 Nodes</h1>
        <div className="flex gap-3">
          <ChefButton>Enroll Nodes</ChefButton>
          <ChefButton>Create Node Filter</ChefButton>
        </div>
      </div>

      <NodesTable />
    </ModuleLayout>
  );
}
