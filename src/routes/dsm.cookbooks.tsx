import { createFileRoute } from "@tanstack/react-router";
import { ModuleLayout } from "@/components/chef/ModuleLayout";
import { ListPageShell } from "@/components/chef/ListPageShell";
import { dsmRailItems } from "@/components/chef/rails";
import { getDsmPage } from "@/data/dsm";

const page = getDsmPage("cookbooks")!;

export const Route = createFileRoute("/dsm/cookbooks")({
  head: () => ({
    meta: [
      { title: "Cookbooks — Declarative State Management" },
      { name: "description", content: page.description.slice(0, 155) },
      { property: "og:title", content: "Cookbooks — Declarative State Management" },
      { property: "og:description", content: page.description.slice(0, 155) },
    ],
  }),
  component: DsmCookbooksPage,
});

function DsmCookbooksPage() {
  return (
    <ModuleLayout
      moduleTitle="Declarative State Management (DSM)"
      railItems={dsmRailItems}
      crumbs={[{ label: "Cookbooks" }]}
    >
      <ListPageShell page={page} />
    </ModuleLayout>
  );
}
