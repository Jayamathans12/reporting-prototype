import { useState } from "react";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { FileText, Pencil } from "lucide-react";
import { ModuleLayout } from "@/components/chef/ModuleLayout";
import { dsmRailItems } from "@/components/chef/rails";
import { TabStrip } from "@/components/chef/TabStrip";
import { ChefButton } from "@/components/chef/Buttons";
import { AttributeTree } from "@/components/chef/reporting/AttributeTree";
import { getDsmNode } from "@/data/dsmNodes";

export const Route = createFileRoute("/dsm/nodes/$nodeId")({
  loader: ({ params }) => {
    const node = getDsmNode(params.nodeId);
    if (!node) throw notFound();
    return { node };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Unavailable — DSM Nodes" }, { name: "robots", content: "noindex" }] };
    }
    const title = `Node Details: ${loaderData.node.name} — DSM Nodes`;
    const description = `Run list, general details and node attributes for the DSM managed node ${loaderData.node.name}.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary" },
      ],
    };
  },
  component: DsmNodeDetailsPage,
});

function DetailRow({ label, value, editable }: { label: string; value: string; editable?: boolean }) {
  return (
    <div className="grid grid-cols-[120px_1fr] items-start gap-2 py-1 text-[13px]">
      <dt className="text-chef-text-muted">{label}</dt>
      <dd className="flex items-center gap-2 break-words text-chef-text">
        <span>: {value}</span>
        {editable && <Pencil className="h-3.5 w-3.5 text-chef-blue" aria-hidden />}
      </dd>
    </div>
  );
}

function DsmNodeDetailsPage() {
  const { node } = Route.useLoaderData();
  const [tab, setTab] = useState("runlist");

  return (
    <ModuleLayout
      moduleTitle="Declarative State Management (DSM)"
      railItems={dsmRailItems}
      crumbs={[{ label: "DSM Nodes", to: "/dsm/nodes" }, { label: "Node Details" }]}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-[22px] font-semibold text-chef-text">Node Details: {node.name}</h1>
        <div className="flex items-center gap-3">
          <ChefButton variant="outline">Reset Key</ChefButton>
          <ChefButton variant="outline" className="border-chef-red/50 text-chef-red">
            Delete Node
          </ChefButton>
        </div>
      </div>

      <div className="mt-4">
        <TabStrip
          tabs={[
            { id: "runlist", label: "Run List" },
            { id: "details", label: "Node Details" },
          ]}
          active={tab}
          onChange={setTab}
        />
      </div>

      {tab === "runlist" && (
        <section className="mt-4 rounded-sm border border-chef-line bg-chef-surface">
          <div className="flex items-center justify-between border-b border-chef-line bg-chef-tablehead/50 px-4 py-2.5">
            <h2 className="text-[14px] font-semibold text-chef-text">Run List</h2>
            <ChefButton>Update Run List</ChefButton>
          </div>
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-chef-tablehead">
                <th className="px-4 py-2.5 text-[13px] font-semibold text-chef-text">Roles/Recipes</th>
                <th className="w-40 px-4 py-2.5 text-[13px] font-semibold text-chef-text">Version</th>
                <th className="w-32 px-4 py-2.5 text-[13px] font-semibold text-chef-text">Position</th>
              </tr>
            </thead>
            <tbody>
              {node.runList.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-4 py-6 text-center text-[13px] text-chef-text-muted">
                    No run list items have been found.
                  </td>
                </tr>
              ) : (
                node.runList.map((item) => (
                  <tr key={`${item.name}-${item.position}`} className="border-t border-chef-line">
                    <td className="px-4 py-3 text-[13px] text-chef-text">
                      <span className="inline-flex items-center gap-2">
                        <FileText className="h-4 w-4 text-chef-text-muted" aria-hidden />
                        {item.name}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[13px] text-chef-text">{item.version}</td>
                    <td className="px-4 py-3 text-[13px] text-chef-text">{item.position}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </section>
      )}

      {tab === "details" && (
        <div className="mt-4 grid items-start gap-4 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)]">
          <section className="rounded-sm border border-chef-line bg-chef-surface">
            <div className="border-b border-chef-line bg-chef-tablehead/50 px-4 py-2.5">
              <h2 className="text-[14px] font-semibold text-chef-text">General Node Details</h2>
            </div>
            <dl className="px-4 py-3">
              <DetailRow label="FQDN" value={node.fqdn} />
              <DetailRow label="Platform" value={node.platform} />
              <DetailRow label="Last Check In" value={node.lastCheckIn} />
              <DetailRow label="Uptime" value={node.uptime} />
              <DetailRow label="Idle Time" value={node.idleTime} />
              {node.policyGroup ? (
                <DetailRow label="Policy Group" value={node.policyGroup} editable />
              ) : (
                <DetailRow label="Environment" value={node.environment || "_default"} editable />
              )}
              <DetailRow label="Tags" value={node.tags.length ? node.tags.join(", ") : "-"} editable />
            </dl>
          </section>

          <section className="rounded-sm border border-chef-line bg-chef-surface">
            <div className="flex items-center justify-between border-b border-chef-line bg-chef-tablehead/50 px-4 py-2.5">
              <h2 className="text-[14px] font-semibold text-chef-text">Node Attributes</h2>
              <ChefButton>Update Attributes</ChefButton>
            </div>
            <div className="px-4 pb-4">
              <AttributeTree attributes={node.attributes} showHeading={false} />
            </div>
          </section>
        </div>
      )}
    </ModuleLayout>
  );
}
