import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/chef/PlaceholderPage";
import { nodeRailItems } from "@/components/chef/rails";

export const Route = createFileRoute("/courier")({
  head: () => ({
    meta: [
      { title: "Chef Courier — Progress Chef 360" },
      { name: "description", content: "Schedule, define and run management operations on your fleet." },
      { property: "og:title", content: "Chef Courier — Progress Chef 360" },
      { property: "og:description", content: "Schedule, define and run management operations on your fleet." },
    ],
  }),
  component: CourierPage,
});

function CourierPage() {
  return (
    <PlaceholderPage
      moduleTitle="Chef Courier"
      title="Chef Courier"
      description="Schedule, define and run management operations on your fleet."
      railItems={nodeRailItems}
      crumbs={[{ label: "Chef Courier" }]}
    />
  );
}
