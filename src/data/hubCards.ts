import type { ModuleKey } from "./orgs";

export interface HubCard {
  key: ModuleKey;
  title: string;
  description: string;
  icon:
    | "courier"
    | "nodes"
    | "dsm"
    | "org"
    | "tenant"
    | "downloads"
    | "reporting";
  to: string;
  resources: string[];
  resourceLinks?: string[];
}

export const hubCards: HubCard[] = [
  {
    key: "courier",
    title: "Chef Courier",
    description: "Schedule define and run management operations on your fleet.",
    icon: "courier",
    to: "/courier",
    resources: ["Quick Start", "Create A Job", "Create Jobs With Multiple Actions"],
  },
  {
    key: "nodes",
    title: "Chef Node Management",
    description: "Enroll and manage your nodes with ease.",
    icon: "nodes",
    to: "/nodes",
    resources: ["Quick Start", "Install Skills", "Enroll Nodes"],
  },
  {
    key: "dsm",
    title: "Declarative State Management (DSM)",
    description:
      "Manage cookbooks, policies, and node metadata for configuration management.",
    icon: "dsm",
    to: "/dsm/nodes",
    resources: ["Overview", "Manage Nodes", "Policies"],
  },
  {
    key: "org",
    title: "Organization Management",
    description: "Manage Org units, Users and their Roles.",
    icon: "org",
    to: "/organization",
    resources: [
      "Overview Of Org Management",
      "How to Manage Users",
      "How to Manage Roles",
    ],
  },
  {
    key: "tenant",
    title: "Tenant Management",
    description: "Add and manage Org Units, Users, Licenses and SSO Configurations.",
    icon: "tenant",
    to: "/tenant",
    resources: ["Overview", "Manage Users"],
  },
  {
    key: "downloads",
    title: "Download Centre",
    description:
      "Download Courier, node management, Chef platform AUTH CLI tools and Audit Logs.",
    icon: "downloads",
    to: "/downloads",
    resources: ["Download Auth CLI"],
  },
  {
    key: "reporting",
    title: "Reporting",
    description: "View and manage reports",
    icon: "reporting",
    to: "/reporting/client",
    resources: ["Client Reporting", "InSpec Reporting", "Node Management Reporting"],
    resourceLinks: ["/reporting/client", "/reporting/inspec", "/reporting/node-management"],
  },
];
