import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/chef/PlaceholderPage";
import { nodeRailItems } from "@/components/chef/rails";

export const Route = createFileRoute("/tenant")({
  head: () => ({
    meta: [
      { title: "Tenant Management — Progress Chef 360" },
      { name: "description", content: "Add and manage Org Units, Users, Licenses and SSO Configurations." },
      { property: "og:title", content: "Tenant Management — Progress Chef 360" },
      { property: "og:description", content: "Add and manage Org Units, Users, Licenses and SSO Configurations." },
    ],
  }),
  component: TenantPage,
});

function TenantPage() {
  return (
    <PlaceholderPage
      moduleTitle="Tenant Management"
      title="Tenant Management"
      description="Add and manage Org Units, Users, Licenses and SSO Configurations."
      railItems={nodeRailItems}
      crumbs={[{ label: "Tenant Management" }]}
    />
  );
}
