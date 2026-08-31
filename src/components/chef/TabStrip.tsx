export interface Tab {
  id: string;
  label: string;
  count?: number;
}

export function TabStrip({
  tabs,
  active,
  onChange,
}: {
  tabs: Tab[];
  active: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="flex items-center gap-7 border-b border-chef-line">
      {tabs.map((tab) => {
        const isActive = tab.id === active;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={`-mb-px flex items-center gap-2 border-b-2 px-1 pb-2.5 pt-2 text-[14px] transition-colors ${
              isActive
                ? "border-chef-blue font-semibold text-chef-text"
                : "border-transparent text-chef-text-muted hover:text-chef-text"
            }`}
          >
            {tab.label}
            {tab.count !== undefined && (
              <span className="rounded-sm bg-chef-pill/70 px-1.5 py-0.5 text-[12px] text-chef-pill-foreground">
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
