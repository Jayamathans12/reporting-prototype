import { createFileRoute } from "@tanstack/react-router";
import { ModuleLayout } from "@/components/chef/ModuleLayout";
import { ListPageShell } from "@/components/chef/ListPageShell";
import { dsmRailItems } from "@/components/chef/rails";
import { getDsmPage } from "@/data/dsm";

const page = getDsmPage("policyfiles")!;

export const Route = createFileRoute("/dsm/policyfiles")({
  head: () => ({
    meta: [
      { title: "Policyfiles — Declarative State Management" },
      { name: "description", content: page.description.slice(0, 155) },
      { property: "og:title", content: "Policyfiles — Declarative State Management" },
      { property: "og:description", content: page.description.slice(0, 155) },
    ],
  }),
  component: DsmPolicyfilesPage,
});

function DsmPolicyfilesPage() {
  return (
    <ModuleLayout
      moduleTitle="Declarative State Management (DSM)"
      railItems={dsmRailItems}
      crumbs={[{ label: "Policyfiles" }]}
    >
      <ListPageShell page={page} />
    </ModuleLayout>
  );
}
