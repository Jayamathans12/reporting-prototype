import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/chef/PlaceholderPage";
import { nodeRailItems } from "@/components/chef/rails";

export const Route = createFileRoute("/organization")({
  head: () => ({
    meta: [
      { title: "Organization Management — Progress Chef 360" },
      { name: "description", content: "Manage Org units, Users and their Roles." },
      { property: "og:title", content: "Organization Management — Progress Chef 360" },
      { property: "og:description", content: "Manage Org units, Users and their Roles." },
    ],
  }),
  component: OrganizationPage,
});

function OrganizationPage() {
  return (
    <PlaceholderPage
      moduleTitle="Organization Management"
      title="Organization Management"
      description="Manage Org units, Users and their Roles."
      railItems={nodeRailItems}
      crumbs={[{ label: "Organization Management" }]}
    />
  );
}
