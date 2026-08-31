import { CheckCircle2, XCircle, MinusSquare, HelpCircle, ShieldOff } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type StatusKind =
  | "Success"
  | "Passed"
  | "Failed"
  | "Skipped"
  | "Unchanged"
  | "Unprocessed"
  | "Waived";

const config: Record<
  StatusKind,
  { icon: LucideIcon; icon_class: string; pill: string }
> = {
  Success: {
    icon: CheckCircle2,
    icon_class: "text-chef-green",
    pill: "bg-chef-success-bg text-chef-text",
  },
  Passed: {
    icon: CheckCircle2,
    icon_class: "text-chef-green",
    pill: "bg-chef-success-bg text-chef-text",
  },
  Failed: {
    icon: XCircle,
    icon_class: "text-chef-red",
    pill: "bg-chef-danger-bg text-chef-text",
  },
  Skipped: {
    icon: MinusSquare,
    icon_class: "text-chef-amber",
    pill: "bg-chef-amber-bg text-chef-text",
  },
  Unchanged: {
    icon: MinusSquare,
    icon_class: "text-chef-blue",
    pill: "bg-chef-pill text-chef-pill-foreground",
  },
  Waived: {
    icon: ShieldOff,
    icon_class: "text-chef-text-muted",
    pill: "bg-chef-pill text-chef-pill-foreground",
  },
  Unprocessed: {
    icon: HelpCircle,
    icon_class: "text-chef-amber",
    pill: "bg-chef-amber-bg text-chef-text",
  },
};

export function StatusIcon({ status, className = "h-4 w-4" }: { status: StatusKind; className?: string }) {
  const { icon: Icon, icon_class } = config[status];
  return <Icon className={`${className} ${icon_class}`} aria-hidden />;
}

export function StatusPill({ status }: { status: StatusKind }) {
  const { pill } = config[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] font-medium ${pill}`}
    >
      <StatusIcon status={status} className="h-3.5 w-3.5" />
      {status}
    </span>
  );
}
