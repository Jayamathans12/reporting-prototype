export type ModuleKey =
  | "courier"
  | "nodes"
  | "dsm"
  | "org"
  | "tenant"
  | "downloads"
  | "reporting";

export interface RoleDefinition {
  id: string;
  label: string;
  modules: ModuleKey[];
}

export const organizations = [
  { id: "test-defaults-skills", label: "test defaults skills" },
  { id: "internal-org", label: "internal-org" },
  { id: "chef-demo-org", label: "chef-demo-org" },
];

export const roles: RoleDefinition[] = [
  {
    id: "tenant-admin",
    label: "tenant-admin",
    modules: ["courier", "nodes", "dsm", "org", "tenant", "downloads", "reporting"],
  },
  {
    id: "org-admin",
    label: "org-admin",
    modules: ["courier", "nodes", "dsm", "org", "downloads", "reporting"],
  },
  {
    id: "product-specialist",
    label: "Product Specialist",
    modules: ["nodes", "dsm", "downloads", "reporting"],
  },
];

export const currentUser = {
  name: "Jayamathan.S",
};
