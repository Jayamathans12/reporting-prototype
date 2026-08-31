export type RunStatus =
  | "Success"
  | "Failed"
  | "Passed"
  | "Skipped"
  | "Unchanged"
  | "Unprocessed";

export interface ResourceSummary {
  successful: number;
  failed: number;
  unchanged: number;
  unprocessed: number;
}

export interface ClientRun {
  id: string;
  lastRun: string;
  status: "Success" | "Failed";
  node: string;
  uptime: string;
  policyGroup: string;
  platform: string;
  environment: string;
  infraClientVersion: string;
  summary: ResourceSummary;
}

export const clientRuns: ClientRun[] = [
  {
    id: "CR-69dcefb8-2d09-44f9",
    lastRun: "12 minutes ago",
    status: "Success",
    node: "web-prod-01",
    uptime: "5 months",
    policyGroup: "web-prod-critical",
    platform: "ubuntuHM 8.9",
    environment: "",
    infraClientVersion: "18.8.11",
    summary: { successful: 1, failed: 1, unchanged: 1, unprocessed: 1 },
  },
  {
    id: "CR-71aa02c1-8f31-4b02",
    lastRun: "28 minutes ago",
    status: "Failed",
    node: "web-prod-02",
    uptime: "2m 05s",
    policyGroup: "",
    platform: "ubuntuOS 8.9",
    environment: "Production",
    infraClientVersion: "18.7.10",
    summary: { successful: 1, failed: 1, unchanged: 1, unprocessed: 1 },
  },
  {
    id: "CR-2c8f1de5-1140-4a7d",
    lastRun: "37 minutes ago",
    status: "Success",
    node: "web-prod-02",
    uptime: "3m 11s",
    policyGroup: "web_prod_policy",
    platform: "ubuntuFC 8.9",
    environment: "",
    infraClientVersion: "18.8.11",
    summary: { successful: 1, failed: 1, unchanged: 1, unprocessed: 1 },
  },
  {
    id: "CR-4bd90a77-33c1-49e0",
    lastRun: "37 minutes ago",
    status: "Failed",
    node: "app-stage-03",
    uptime: "3m 11s",
    policyGroup: "",
    platform: "ubuntuUK 8.9",
    environment: "Production",
    infraClientVersion: "17.10.95",
    summary: { successful: 1, failed: 1, unchanged: 1, unprocessed: 1 },
  },
  {
    id: "CR-9f2b61ac-77de-4c58",
    lastRun: "44 minutes ago",
    status: "Success",
    node: "db-prod-01",
    uptime: "3m 11s",
    policyGroup: "db_prod_policy",
    platform: "ubuntuAR 8.9",
    environment: "",
    infraClientVersion: "18.6.2",
    summary: { successful: 1, failed: 1, unchanged: 1, unprocessed: 1 },
  },
  {
    id: "CR-06e5c3d8-9a14-4f22",
    lastRun: "45 minutes ago",
    status: "Success",
    node: "app-prod-04",
    uptime: "3m 11s",
    policyGroup: "",
    platform: "ubuntuUD 10.11.5",
    environment: "Development",
    infraClientVersion: "18.8.11",
    summary: { successful: 1, failed: 1, unchanged: 1, unprocessed: 1 },
  },
  {
    id: "CR-c1470bb2-5ed8-4931",
    lastRun: "37 minutes ago",
    status: "Failed",
    node: "app-prod-04",
    uptime: "3m 11s",
    policyGroup: "web_dev_policy",
    platform: "ubuntuEX 8.9",
    environment: "",
    infraClientVersion: "17.10.95",
    summary: { successful: 1, failed: 1, unchanged: 1, unprocessed: 1 },
  },
  {
    id: "CR-58ad7f10-6b90-4de6",
    lastRun: "an hour ago",
    status: "Failed",
    node: "web-dev-01",
    uptime: "58s",
    policyGroup: "",
    platform: "ubuntu 24.04",
    environment: "Development",
    infraClientVersion: "18.7.10",
    summary: { successful: 1, failed: 1, unchanged: 1, unprocessed: 1 },
  },
];

export interface RunHistoryEntry {
  timestamp: string;
  relative: string;
  status: "Success" | "Failed" | "Unprocessed";
}

export const runHistory: RunHistoryEntry[] = [
  { timestamp: "12 Jan 2026, 14:35 UTC", relative: "3 minutes ago", status: "Success" },
  { timestamp: "12 Jan 2026, 14:40 UTC", relative: "8 minutes ago", status: "Failed" },
  { timestamp: "12 Jan 2026, 14:45 UTC", relative: "13 minutes ago", status: "Unprocessed" },
  { timestamp: "12 Jan 2026, 14:40 UTC", relative: "8 minutes ago", status: "Failed" },
  { timestamp: "12 Jan 2026, 14:35 UTC", relative: "3 minutes ago", status: "Success" },
  { timestamp: "12 Jan 2026, 14:35 UTC", relative: "3 minutes ago", status: "Success" },
  { timestamp: "12 Jan 2026, 15:10 UTC", relative: "38 minutes ago", status: "Unprocessed" },
  { timestamp: "12 Jan 2026, 15:10 UTC", relative: "38 minutes ago", status: "Unprocessed" },
  { timestamp: "12 Jan 2026, 14:35 UTC", relative: "3 minutes ago", status: "Success" },
  { timestamp: "12 Jan 2026, 14:40 UTC", relative: "8 minutes ago", status: "Failed" },
  { timestamp: "12 Jan 2026, 14:35 UTC", relative: "3 minutes ago", status: "Success" },
];

export const runHistoryCounts = { all: 123, successful: 119, failed: 4 };

export interface ResourceExecutionRow {
  step: string;
  name: string;
  type: string;
  cookbook: string;
  action: string;
  status: "Failed" | "Unchanged" | "Unprocessed" | "Success";
}

export const resourceExecution: ResourceExecutionRow[] = [
  { step: "1/62", name: "install apache2", type: "package", cookbook: "apache2", action: "install", status: "Failed" },
  { step: "2/62", name: "create /etc/apache2/apache2.conf", type: "template", cookbook: "apache2", action: "create", status: "Unchanged" },
  { step: "3/62", name: "enable apache2", type: "service", cookbook: "apache2", action: "enable", status: "Unprocessed" },
  { step: "4/62", name: "start apache2", type: "template", cookbook: "apache2", action: "create", status: "Failed" },
  { step: "5/62", name: "enable apache2", type: "service", cookbook: "apache2", action: "enable", status: "Unprocessed" },
  { step: "6/62", name: "enable apache2", type: "service", cookbook: "apache2", action: "enable", status: "Unprocessed" },
  { step: "7/62", name: "start apache2", type: "template", cookbook: "apache2", action: "create", status: "Failed" },
  { step: "8/62", name: "enable apache2", type: "service", cookbook: "apache2", action: "enable", status: "Unprocessed" },
  { step: "9/62", name: "start apache2", type: "template", cookbook: "apache2", action: "create", status: "Failed" },
  { step: "10/62", name: "enable apache2", type: "service", cookbook: "apache2", action: "enable", status: "Unprocessed" },
];

export interface RunListRow {
  name: string;
  version: string;
  position: string;
  depth: number;
  kind: "role" | "recipe" | "cookbook";
  expandable?: boolean;
}

export const runListRows: RunListRow[] = [
  { name: "role-chef-client", version: "-", position: "-", depth: 0, kind: "role", expandable: true },
  { name: "recipe-chef-client", version: "v0.1.0", position: "1", depth: 1, kind: "recipe", expandable: true },
  { name: "recipe-chef-client", version: "v0.1.0", position: "1", depth: 2, kind: "recipe" },
  { name: "cookbook-run-chef-client", version: "v0.1.0", position: "1", depth: 1, kind: "cookbook", expandable: true },
  { name: "recipe-chef", version: "v0.1.0", position: "1", depth: 0, kind: "recipe" },
  { name: "cookbook-chef-client", version: "v0.1.0", position: "1", depth: 0, kind: "cookbook", expandable: true },
  { name: "cookbook-chef-client", version: "v0.1.0", position: "1", depth: 0, kind: "cookbook" },
];

export const attributeCounts = [
  { label: "All", count: 10 },
  { label: "Default", count: 2 },
  { label: "Normal", count: 2 },
  { label: "Override", count: 3 },
  { label: "Automatic", count: 3 },
];

export const attributeKeys = [
  '"audit" : {-},',
  '"chef-ingredient": {-},',
  '"chef_client" : {-},',
  '"chef_handler" : {-},',
  '"chef packages" : {-},',
  '"cloud" : {-},',
  '"chef_client" : {-},',
  '"chef_handler" : {-},',
  '"kernel" : {-},',
  '"platform" : {-},',
];

export const runInformation = [
  { label: "Duration", value: "1m 42 sec" },
  { label: "Chef Client Version", value: "17.5.22" },
  { label: "Resources Total", value: "62" },
];

export const nodeInformation = [
  { label: "Node Name", value: "Web-Prod-01" },
  { label: "FQDN", value: "ubuntu02.chef.lab" },
  { label: "IP Address", value: "10.128.1.133" },
  { label: "Platform", value: "Ubuntu 20.04" },
  { label: "Node Uptime", value: "5 months" },
];

export const policyEnvironment = [
  { label: "Environment", value: "Production" },
  { label: "Policy Group", value: "Web_prod" },
  { label: "Policy Name", value: "Web_prod" },
  { label: "Policy Revision", value: "8d4ac90c255dbc4126ec90897029" },
  { label: "Organization", value: "lab" },
  { label: "Chef Server", value: "automate.chef.lab" },
  { label: "Deprecations", value: "None" },
];

export const resourceOverview: ResourceSummary = {
  successful: 1,
  failed: 1,
  unchanged: 0,
  unprocessed: 1,
};

export const errorLog = {
  message:
    "Undefined local variable or method 'passwords' for cookbook: lamp2, recipe: database :chef::Recipe",
  backtrace: [
    "/var/chef/cache/cookbooks/lamp2/recipes/database.rb:14:in `from_file'",
    "/opt/chef/embedded/lib/ruby/gems/3.1.0/gems/chef-17.5.22/lib/chef/run_context.rb:294:in `load_recipe'",
    "/opt/chef/embedded/lib/ruby/gems/3.1.0/gems/chef-17.5.22/lib/chef/policy_builder/policyfile.rb:190:in `block in expand_run_list'",
    "/opt/chef/embedded/lib/ruby/gems/3.1.0/gems/chef-17.5.22/lib/chef/client.rb:281:in `run_ohai'",
  ],
};

export function getClientRun(runId: string): ClientRun | undefined {
  return clientRuns.find((r) => r.id === runId);
}

/* -------------------------------- InSpec -------------------------------- */

export type { ComplianceScan } from "./complianceDetail";
export { complianceScans, getComplianceScan } from "./complianceDetail";


export interface ComplianceControl {
  control: string;
  status: "Passed" | "Failed" | "Skipped";
  severity: string;
  rootProfile: string;
  testResults: string;
}

const controlTitles = [
  "Apache should be enabled",
  "Apache should be enabled",
  "Apache should start max. 1 root-task",
  "Disable Apache's follows Symbolic Links for directories in alias.conf",
];

export const complianceControls: ComplianceControl[] = Array.from({ length: 20 }, (_, i) => {
  const variant = i % 4;
  const status: ComplianceControl["status"] =
    variant === 2 ? "Skipped" : variant === 1 && i % 8 === 1 ? "Passed" : "Failed";
  return {
    control: `apache-${String(i + 1).padStart(2, "0")}: ${controlTitles[variant]}`,
    status,
    severity: variant === 2 ? "Major (0.5)" : "Critical (1.0)",
    rootProfile: "DevSec Apache BaselineZPFGXL",
    testResults: "1",
  };
});

