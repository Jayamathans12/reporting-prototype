import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CalendarSync,
  Network,
  ShieldCheck,
  Landmark,
  Globe,
  Download,
  BarChart3,
} from "lucide-react";
import type { HubCard as HubCardModel } from "@/data/hubCards";

const icons = {
  courier: CalendarSync,
  nodes: Network,
  dsm: ShieldCheck,
  org: Landmark,
  tenant: Globe,
  downloads: Download,
  reporting: BarChart3,
};

export function HubCard({ card }: { card: HubCardModel }) {
  const Icon = icons[card.icon];

  return (
    <article className="flex flex-col rounded-sm border border-chef-line bg-chef-surface p-6">
      <span className="mb-6 flex h-14 w-14 items-center justify-center rounded-sm border border-chef-line">
        <Icon className="h-7 w-7 text-chef-text" strokeWidth={1.5} />
      </span>

      <Link
        to={card.to}
        className="group flex items-start justify-between gap-3 text-[19px] font-semibold leading-snug text-chef-text"
      >
        <span>{card.title}</span>
        <ArrowRight className="mt-1 h-5 w-5 shrink-0 text-chef-text transition-transform group-hover:translate-x-1" />
      </Link>

      <p className="mt-3 text-[13px] leading-relaxed text-chef-text-muted">
        {card.description}
      </p>

      <div className="mt-6 flex items-center justify-between border-t border-chef-line pt-4">
        <h3 className="text-[14px] font-semibold text-chef-text">Resources</h3>
        <Link to={card.to} className="text-[13px] font-medium text-chef-blue hover:underline">
          view all
        </Link>
      </div>

      <ul className="mt-3 space-y-2">
        {card.resources.map((resource, i) => (
          <li key={resource}>
            <Link
              to={card.resourceLinks?.[i] ?? card.to}
              className="block rounded-sm bg-chef-pill px-3 py-2 text-[13px] font-medium text-chef-pill-foreground transition-colors hover:brightness-95"
            >
              {resource}
            </Link>
          </li>
        ))}
      </ul>
    </article>
  );
}
