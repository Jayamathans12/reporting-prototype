import { createFileRoute } from "@tanstack/react-router";
import { TopBar } from "@/components/chef/TopBar";
import { HubCard } from "@/components/chef/HubCard";
import { hubCards } from "@/data/hubCards";
import { currentUser } from "@/data/orgs";
import { useSession } from "@/context/SessionContext";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Chef 360 Hub — Progress Chef 360 Console" },
      {
        name: "description",
        content:
          "Chef 360 hub for Courier, Node Management, Declarative State Management, Organization and Tenant Management.",
      },
      { property: "og:title", content: "Chef 360 Hub — Progress Chef 360 Console" },
      {
        property: "og:description",
        content:
          "Launch Chef Courier, Node Management, DSM, Organization and Tenant Management from one hub.",
      },
    ],
  }),
  component: HubPage,
});

function HubPage() {
  const { modules } = useSession();
  const cards = hubCards.filter((card) => modules.includes(card.key));

  return (
    <div className="min-h-screen bg-chef-canvas">
      <TopBar />
      <main className="px-[52px] py-8">
        <h1 className="text-[22px] font-bold text-chef-text">
          Welcome {currentUser.name}
        </h1>
        <p className="mt-1 text-[14px] text-chef-text-muted">
          What would you like to do today?
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {cards.map((card) => (
            <HubCard key={card.key} card={card} />
          ))}
        </div>
      </main>
    </div>
  );
}
