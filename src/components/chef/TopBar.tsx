import { Link } from "@tanstack/react-router";
import { Grid3x3, Sparkles, CircleUserRound } from "lucide-react";
import { Logo } from "./Logo";
import { OrgSwitcher } from "./OrgSwitcher";

export function TopBar({ moduleTitle }: { moduleTitle?: string }) {
  return (
    <header className="flex h-[72px] items-stretch bg-chef-chrome">
      <Link
        to="/"
        aria-label="App launcher"
        className="flex w-[72px] shrink-0 items-center justify-center bg-chef-blue text-chef-blue-foreground transition-colors hover:bg-chef-blue-hover"
      >
        <Grid3x3 className="h-6 w-6" />
      </Link>

      <div className="flex flex-1 items-center gap-5 px-6">
        <Link to="/" className="shrink-0">
          <Logo />
        </Link>
        {moduleTitle && (
          <>
            <span className="h-6 w-px bg-white/20" aria-hidden="true" />
            <span className="text-[17px] font-medium text-chef-chrome-foreground">
              {moduleTitle}
            </span>
          </>
        )}

        <div className="ml-auto flex items-center gap-5">
          <button
            type="button"
            aria-label="Chef AI assistant"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-chef-green text-chef-chrome"
          >
            <Sparkles className="h-5 w-5" />
          </button>
          <span className="h-8 w-px bg-white/20" aria-hidden="true" />
          <CircleUserRound className="h-8 w-8 text-chef-chrome-foreground" aria-hidden="true" />
          <OrgSwitcher />
        </div>
      </div>
    </header>
  );
}
