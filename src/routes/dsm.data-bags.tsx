import { createFileRoute } from "@tanstack/react-router";
import { ModuleLayout } from "@/components/chef/ModuleLayout";
import { ListPageShell } from "@/components/chef/ListPageShell";
import { dsmRailItems } from "@/components/chef/rails";
import { getDsmPage } from "@/data/dsm";

const page = getDsmPage("data-bags")!;

export const Route = createFileRoute("/dsm/data-bags")({
  head: () => ({
    meta: [
      { title: "Data Bags — Declarative State Management" },
      { name: "description", content: page.description.slice(0, 155) },
      { property: "og:title", content: "Data Bags — Declarative State Management" },
      { property: "og:description", content: page.description.slice(0, 155) },
    ],
  }),
  component: DsmDataBagsPage,
});

function DsmDataBagsPage() {
  return (
    <ModuleLayout
      moduleTitle="Declarative State Management (DSM)"
      railItems={dsmRailItems}
      crumbs={[{ label: "Data Bags" }]}
    >
      <ListPageShell page={page} />
    </ModuleLayout>
  );
}
