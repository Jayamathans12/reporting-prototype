import { createFileRoute } from "@tanstack/react-router";
import { ModuleLayout } from "@/components/chef/ModuleLayout";
import { ListPageShell } from "@/components/chef/ListPageShell";
import { dsmRailItems } from "@/components/chef/rails";
import { getDsmPage } from "@/data/dsm";

const page = getDsmPage("policy-groups")!;

export const Route = createFileRoute("/dsm/policy-groups")({
  head: () => ({
    meta: [
      { title: "Policy Groups — Declarative State Management" },
      { name: "description", content: page.description.slice(0, 155) },
      { property: "og:title", content: "Policy Groups — Declarative State Management" },
      { property: "og:description", content: page.description.slice(0, 155) },
    ],
  }),
  component: DsmPolicyGroupsPage,
});

function DsmPolicyGroupsPage() {
  return (
    <ModuleLayout
      moduleTitle="Declarative State Management (DSM)"
      railItems={dsmRailItems}
      crumbs={[{ label: "Policy Groups" }]}
    >
      <ListPageShell page={page} />
    </ModuleLayout>
  );
}
