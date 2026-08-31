import { createFileRoute } from "@tanstack/react-router";
import { ModuleLayout } from "@/components/chef/ModuleLayout";
import { reportingRailItems } from "@/components/chef/rails";
import { NodesTable } from "@/components/chef/NodesTable";

export const Route = createFileRoute("/reporting/node-management/")({
  head: () => ({
    meta: [
      { title: "Node Management Reporting — Progress Chef 360" },
      { name: "description", content: "Reporting view of all enrolled Chef 360 nodes, their operating systems and installed skills." },
      { property: "og:title", content: "Node Management Reporting — Progress Chef 360" },
      { property: "og:description", content: "Report on enrolled Chef 360 nodes and drill into individual node details." },
    ],
  }),
  component: NodeManagementReportingPage,
});

function NodeManagementReportingPage() {
  return (
    <ModuleLayout
      moduleTitle="Reporting"
      railItems={reportingRailItems}
      crumbs={[{ label: "Reporting" }, { label: "Node Management Reporting" }]}
    >
      <div className="max-w-3xl">
        <h1 className="text-[28px] font-bold text-chef-text">Node Management Reporting</h1>
        <p className="mt-2 text-[13px] leading-relaxed text-chef-text-muted">
          Report on every node enrolled in Chef 360. Select a node to open its full details,
          installed skills and attributes.
        </p>
      </div>

      <NodesTable heading="All Nodes" detailTo="/reporting/node-management/$nodeId" />
    </ModuleLayout>
  );
}
