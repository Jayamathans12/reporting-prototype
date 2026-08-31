import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/chef/PlaceholderPage";
import { nodeRailItems } from "@/components/chef/rails";

export const Route = createFileRoute("/downloads")({
  head: () => ({
    meta: [
      { title: "Download Centre — Progress Chef 360" },
      { name: "description", content: "Download Courier, node management, Chef platform AUTH CLI tools and Audit Logs." },
      { property: "og:title", content: "Download Centre — Progress Chef 360" },
      { property: "og:description", content: "Download Courier, node management, Chef platform AUTH CLI tools and Audit Logs." },
    ],
  }),
  component: DownloadsPage,
});

function DownloadsPage() {
  return (
    <PlaceholderPage
      moduleTitle="Download Centre"
      title="Download Centre"
      description="Download Courier, node management, Chef platform AUTH CLI tools and Audit Logs."
      railItems={nodeRailItems}
      crumbs={[{ label: "Download Centre" }]}
    />
  );
}
