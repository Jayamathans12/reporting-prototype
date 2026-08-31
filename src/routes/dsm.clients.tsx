import { createFileRoute } from "@tanstack/react-router";
import { ModuleLayout } from "@/components/chef/ModuleLayout";
import { ListPageShell } from "@/components/chef/ListPageShell";
import { dsmRailItems } from "@/components/chef/rails";
import { getDsmPage } from "@/data/dsm";

const page = getDsmPage("clients")!;

export const Route = createFileRoute("/dsm/clients")({
  head: () => ({
    meta: [
      { title: "Clients — Declarative State Management" },
      { name: "description", content: page.description.slice(0, 155) },
      { property: "og:title", content: "Clients — Declarative State Management" },
      { property: "og:description", content: page.description.slice(0, 155) },
    ],
  }),
  component: DsmClientsPage,
});

function DsmClientsPage() {
  return (
    <ModuleLayout
      moduleTitle="Declarative State Management (DSM)"
      railItems={dsmRailItems}
      crumbs={[{ label: "Clients" }]}
    >
      <ListPageShell page={page} />
    </ModuleLayout>
  );
}
