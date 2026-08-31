import { createFileRoute } from "@tanstack/react-router";
import { ModuleLayout } from "@/components/chef/ModuleLayout";
import { reportingRailItems } from "@/components/chef/rails";
import { ClientRunsList } from "@/components/chef/reporting/ClientRunsList";

export const Route = createFileRoute("/reporting/client/")({
  head: () => ({
    meta: [
      { title: "Client Runs — Reporting — Progress Chef 360" },
      {
        name: "description",
        content:
          "Chef Infra Client run records with status, policy group, platform, environment and resource summary.",
      },
      { property: "og:title", content: "Client Runs — Reporting — Progress Chef 360" },
      {
        property: "og:description",
        content: "Review client run history and drill into an individual run's resources.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ClientReportingPage,
});

function ClientReportingPage() {
  return (
    <ModuleLayout
      moduleTitle="Reporting"
      railItems={reportingRailItems}
      crumbs={[{ label: "Reporting", to: "/reporting" }, { label: "Client Reporting" }]}
    >
      <ClientRunsList />
    </ModuleLayout>
  );
}
