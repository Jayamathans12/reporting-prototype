import { createFileRoute } from "@tanstack/react-router";
import { ModuleLayout } from "@/components/chef/ModuleLayout";
import { ListPageShell } from "@/components/chef/ListPageShell";
import { dsmRailItems } from "@/components/chef/rails";
import { getDsmPage } from "@/data/dsm";

const page = getDsmPage("environments")!;

export const Route = createFileRoute("/dsm/environments")({
  head: () => ({
    meta: [
      { title: "Environments — Declarative State Management" },
      { name: "description", content: page.description.slice(0, 155) },
      { property: "og:title", content: "Environments — Declarative State Management" },
      { property: "og:description", content: page.description.slice(0, 155) },
    ],
  }),
  component: DsmEnvironmentsPage,
});

function DsmEnvironmentsPage() {
  return (
    <ModuleLayout
      moduleTitle="Declarative State Management (DSM)"
      railItems={dsmRailItems}
      crumbs={[{ label: "Environments" }]}
    >
      <ListPageShell page={page} />
    </ModuleLayout>
  );
}
