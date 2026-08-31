export function ProgressRing({
  successful,
  failed,
  unchanged,
  unprocessed,
}: {
  successful: number;
  failed: number;
  unchanged: number;
  unprocessed: number;
}) {
  const total = Math.max(1, successful + failed + unchanged + unprocessed);
  const segments = [
    { value: successful, color: "var(--chef-green)" },
    { value: failed, color: "var(--chef-red)" },
    { value: unchanged, color: "var(--chef-blue, #1f5faa)" },
    { value: unprocessed, color: "var(--chef-line, #c9ced6)" },
  ];
  const radius = 46;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  return (
    <div className="relative h-[120px] w-[120px]">
      <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
        <circle cx="60" cy="60" r={radius} fill="none" stroke="var(--chef-line, #e2e5ea)" strokeWidth="12" />
        {segments.map((seg, i) => {
          const length = (seg.value / total) * circumference;
          const dash = `${length} ${circumference - length}`;
          const el = (
            <circle
              key={i}
              cx="60"
              cy="60"
              r={radius}
              fill="none"
              stroke={seg.color}
              strokeWidth="12"
              strokeDasharray={dash}
              strokeDashoffset={-offset}
            />
          );
          offset += length;
          return el;
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[22px] font-semibold text-chef-text">{successful + failed + unchanged + unprocessed}</span>
        <span className="text-[11px] text-chef-text-muted">Resources</span>
      </div>
    </div>
  );
}
