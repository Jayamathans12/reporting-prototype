import { Link } from "@tanstack/react-router";
import { ChevronRight, Home } from "lucide-react";

export interface Crumb {
  label: string;
  to?: string;
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[13px]">
      <Link to="/" aria-label="Home" className="text-chef-blue">
        <Home className="h-4 w-4" />
      </Link>
      {items.map((item) => (
        <span key={item.label} className="flex items-center gap-2">
          <ChevronRight className="h-3.5 w-3.5 text-chef-text-muted" />
          {item.to ? (
            <Link to={item.to} className="text-chef-blue hover:underline">
              {item.label}
            </Link>
          ) : (
            <span className="text-chef-text">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
