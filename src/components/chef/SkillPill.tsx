export function SkillPill({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-chef-blue/40 px-2.5 py-0.5 text-[12px] text-chef-blue">
      {label}
    </span>
  );
}

export function OverflowBadge({ count }: { count: number }) {
  return (
    <span className="inline-flex items-center rounded-full bg-chef-blue/85 px-2 py-0.5 text-[12px] font-medium text-chef-blue-foreground">
      +{count}
    </span>
  );
}
