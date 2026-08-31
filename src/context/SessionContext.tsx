import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { organizations, roles, type ModuleKey, type RoleDefinition } from "@/data/orgs";

interface SessionValue {
  orgId: string;
  roleId: string;
  org: (typeof organizations)[number];
  role: RoleDefinition;
  modules: ModuleKey[];
  setSession: (orgId: string, roleId: string) => void;
}

const SessionContext = createContext<SessionValue | null>(null);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [orgId, setOrgId] = useState(organizations[0]!.id);
  const [roleId, setRoleId] = useState(roles[0]!.id);

  const value = useMemo<SessionValue>(() => {
    const org = organizations.find((o) => o.id === orgId) ?? organizations[0]!;
    const role = roles.find((r) => r.id === roleId) ?? roles[0]!;
    return {
      orgId,
      roleId,
      org,
      role,
      modules: role.modules,
      setSession: (nextOrg: string, nextRole: string) => {
        setOrgId(nextOrg);
        setRoleId(nextRole);
      },
    };
  }, [orgId, roleId]);

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession() {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error("useSession must be used within a SessionProvider");
  return ctx;
}
