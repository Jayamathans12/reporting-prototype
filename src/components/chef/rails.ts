import {
  Boxes,
  LayoutGrid,
  Workflow,
  History,
  FilePlus2,
  Settings,
  Server,
  BookOpen,
  IdCard,
  Database,
  Layers,
  KeyRound,
  FileCode2,
  FolderGit2,
  Users,
  ShieldCheck,
  BarChart3,
} from "lucide-react";
import type { RailItem } from "./ModuleRail";

export const nodeRailItems: RailItem[] = [
  { label: "Chef 360 Nodes", to: "/nodes", icon: Boxes },
  { label: "Node Cohorts", to: "/nodes/cohorts", icon: LayoutGrid },
  { label: "Skills", to: "/nodes/skills", icon: Workflow },
  { label: "Activity", to: "/nodes/activity", icon: History },
  { label: "Enroll Nodes", to: "/nodes/enroll", icon: FilePlus2 },
  { label: "Settings", to: "/nodes/settings", icon: Settings },
];

export const dsmRailItems: RailItem[] = [
  { label: "DSM Nodes", to: "/dsm/nodes", icon: Server },
  { label: "Cookbooks", to: "/dsm/cookbooks", icon: BookOpen },
  { label: "Roles", to: "/dsm/roles", icon: IdCard },
  { label: "Data Bags", to: "/dsm/data-bags", icon: Database },
  { label: "Environments", to: "/dsm/environments", icon: Layers },
  { label: "Clients", to: "/dsm/clients", icon: KeyRound },
  { label: "Policyfiles", to: "/dsm/policyfiles", icon: FileCode2 },
  { label: "Policy Groups", to: "/dsm/policy-groups", icon: FolderGit2 },
];

export const reportingRailItems: RailItem[] = [
  { label: "Client Reporting", to: "/reporting/client", icon: Users },
  { label: "InSpec Reporting", to: "/reporting/inspec", icon: ShieldCheck },
  { label: "Node Management Reporting", to: "/reporting/node-management", icon: BarChart3 },
];
