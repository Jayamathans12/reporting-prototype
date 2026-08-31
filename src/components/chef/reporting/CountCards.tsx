import { StatusIcon } from "../StatusPill";
import type { ControlStatus } from "@/data/complianceDetail";

export type CountFilter = "all" | ControlStatus;

export function CountCards({
  noun,
  counts,
  active,
  onChange,
}: {
  noun: string;
  counts: { total: number; failed: number; passed: number; skipped: number; waived: number };
  active: CountFilter;
  onChange: (value: CountFilter) => void;
}) {
  const cards: { key: CountFilter; label: string; value: number; status?: ControlStatus }[] = [
    { key: "all", label: `Total ${noun}`, value: counts.total },
    { key: "Failed", label: `Failed ${noun}`, value: counts.failed, status: "Failed" },
    { key: "Passed", label: `Passed ${noun}`, value: counts.passed, status: "Passed" },
    { key: "Skipped", label: `Skipped ${noun}`, value: counts.skipped, status: "Skipped" },
    { key: "Waived", label: `Waived ${noun}`, value: counts.waived, status: "Waived" },
  ];

  return (
    <div className="flex flex-wrap gap-3">
      {cards.map((card) => (
        <button
          key={card.key}
          type="button"
          onClick={() => onChange(card.key)}
          className={`flex min-w-[140px] flex-col rounded-sm border px-3 py-2 text-left transition-colors ${
            active === card.key
              ? "border-chef-blue bg-chef-pill/50"
              : "border-chef-line bg-chef-surface hover:border-chef-blue"
          }`}
        >
          <span className="text-[13px] text-chef-text-muted">{card.label}</span>
          <span className="inline-flex items-center gap-1.5 text-[20px] text-chef-text">
            {card.status && <StatusIcon status={card.status} className="h-4 w-4" />}
            {card.value}
          </span>
        </button>
      ))}
    </div>
  );
}

export function SeverityLabel({
  severity,
  impact,
}: {
  severity: "Critical" | "Major" | "Minor";
  impact: number;
}) {
  const tone =
    severity === "Critical"
      ? "text-chef-sev-critical"
      : severity === "Major"
        ? "text-chef-sev-major"
        : "text-chef-sev-minor";
  return (
    <span className={`text-[13px] font-medium uppercase ${tone}`}>
      {severity} ({impact.toFixed(1)})
    </span>
  );
}
