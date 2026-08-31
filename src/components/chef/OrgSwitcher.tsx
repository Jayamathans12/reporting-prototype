import { useEffect, useRef, useState } from "react";
import { ChevronDown, Building2, IdCard } from "lucide-react";
import { organizations, roles } from "@/data/orgs";
import { useSession } from "@/context/SessionContext";

export function OrgSwitcher() {
  const { org, role, setSession } = useSession();
  const [open, setOpen] = useState(false);
  const [draftOrg, setDraftOrg] = useState(org.id);
  const [draftRole, setDraftRole] = useState(role.id);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  const openPanel = () => {
    setDraftOrg(org.id);
    setDraftRole(role.id);
    setOpen((v) => !v);
  };

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={openPanel}
        className="flex items-center gap-3 rounded px-2 py-1 text-right transition-colors hover:bg-white/5"
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <span className="leading-tight">
          <span className="block text-[11px] text-chef-chrome-muted">{role.label}</span>
          <span className="block text-[15px] font-semibold text-chef-chrome-foreground">
            {org.label}
          </span>
        </span>
        <ChevronDown
          className={`h-4 w-4 text-chef-chrome-muted transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Switch organization and role"
          className="absolute right-0 top-full z-50 w-[220px] bg-chef-chrome p-3 shadow-xl"
        >
          <label className="mb-1 flex items-center gap-1.5 text-[11px] text-chef-chrome-muted">
            <Building2 className="h-3.5 w-3.5" /> Organization
          </label>
          <select
            value={draftOrg}
            onChange={(e) => setDraftOrg(e.target.value)}
            className="mb-3 h-8 w-full rounded-sm bg-white/10 px-2 text-[13px] text-chef-chrome-foreground outline-none"
          >
            {organizations.map((o) => (
              <option key={o.id} value={o.id} className="text-chef-text">
                {o.label}
              </option>
            ))}
          </select>

          <label className="mb-1 flex items-center gap-1.5 text-[11px] text-chef-chrome-muted">
            <IdCard className="h-3.5 w-3.5" /> Role
          </label>
          <select
            value={draftRole}
            onChange={(e) => setDraftRole(e.target.value)}
            className="mb-3 h-8 w-full rounded-sm bg-white/10 px-2 text-[13px] text-chef-chrome-foreground outline-none"
          >
            {roles.map((r) => (
              <option key={r.id} value={r.id} className="text-chef-text">
                {r.label}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={() => {
              setSession(draftOrg, draftRole);
              setOpen(false);
            }}
            className="h-8 w-full rounded-sm bg-chef-blue text-[13px] font-medium text-chef-blue-foreground transition-colors hover:bg-chef-blue-hover"
          >
            Proceed
          </button>
        </div>
      )}
    </div>
  );
}
