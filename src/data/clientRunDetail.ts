import { clientRuns } from "./reporting";

/* ------------------------------------------------------------------ */
/* Deterministic pseudo-random helpers so mock data is stable per run   */
/* ------------------------------------------------------------------ */

function hash(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function rng(seed: string) {
  let a = hash(seed);
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pick<T>(list: readonly T[], r: number): T {
  return list[Math.floor(r * list.length) % list.length]!;
}

/* ------------------------------------------------------------------ */
/* Types                                                                */
/* ------------------------------------------------------------------ */

export type ResourceStatus = "Success" | "Failed" | "Unchanged" | "Unprocessed";

export interface RunResource {
  id: string;
  step: number;
  total: number;
  name: string;
  type: string;
  cookbook: string;
  action: string;
  status: ResourceStatus;
  duration: string;
  delta: string;
  error?: string;
}

export interface RunListNode {
  id: string;
  name: string;
  version: string;
  position: string;
  kind: "role" | "recipe" | "cookbook";
  children?: RunListNode[];
}

export type AttributeSource = "default" | "normal" | "override" | "automatic";

export interface AttributeNode {
  key: string;
  source: AttributeSource;
  value?: string;
  children?: AttributeNode[];
}

export interface RunHistoryItem {
  runId: string;
  timestamp: string;
  relative: string;
  hoursAgo: number;
  duration: string;
  status: "Success" | "Failed";
}

export interface RunDetail {
  id: string;
  node: string;
  status: "Success" | "Failed";
  startedAt: string;
  duration: string;
  chefVersion: string;
  triggeredBy: string;
  resources: RunResource[];
  summary: { successful: number; failed: number; unchanged: number; unprocessed: number };
  nodeInformation: { label: string; value: string }[];
  policyEnvironment: { label: string; value: string }[];
  runList: RunListNode[];
  attributes: AttributeNode[];
  error?: { message: string; backtrace: string[] };
}

/* ------------------------------------------------------------------ */
/* Generators                                                           */
/* ------------------------------------------------------------------ */

const RESOURCE_TYPES = [
  "package",
  "template",
  "service",
  "execute",
  "file",
  "directory",
  "systemd_unit",
  "apt_package",
  "cron_d",
  "log",
] as const;

const ACTIONS = ["install", "create", "enable", "start", "run", "delete", "write", "add"] as const;

const COOKBOOKS = ["apache2", "chef-client", "blue-green-app", "lamp2", "nginx", "audit"] as const;

const NAMES = [
  "install apache2",
  "/etc/apache2/apache2.conf",
  "enable apache2",
  "start apache2",
  "apt-get-update",
  "/etc/cron.d/chef_client_run",
  "chef-client.service",
  "chef-client.timer",
  "/var/www/html/index.html",
  "nginx",
] as const;

const DELTAS = [
  "no changes required",
  "updated file mode from 0644 to 0755",
  "installed version 2.4.52-1ubuntu4",
  "content changed (3 lines added, 1 removed)",
  "service restarted",
] as const;

function buildResources(runId: string, status: "Success" | "Failed"): RunResource[] {
  const r = rng(`${runId}:resources`);
  const total = 20 + Math.floor(r() * 43); // 20 – 62
  const failIndex = status === "Failed" ? Math.floor(r() * total) : -1;
  const out: RunResource[] = [];

  for (let i = 0; i < total; i++) {
    let rowStatus: ResourceStatus;
    if (i === failIndex) rowStatus = "Failed";
    else if (failIndex >= 0 && i > failIndex) rowStatus = "Unprocessed";
    else rowStatus = r() > 0.82 ? "Success" : "Unchanged";

    out.push({
      id: `${runId}-r${i + 1}`,
      step: i + 1,
      total,
      name: pick(NAMES, r()),
      type: pick(RESOURCE_TYPES, r()),
      cookbook: pick(COOKBOOKS, r()),
      action: pick(ACTIONS, r()),
      status: rowStatus,
      duration: `${Math.floor(r() * 1400) + 12} ms`,
      delta: rowStatus === "Unchanged" ? "no changes required" : pick(DELTAS, r()),
      ...(rowStatus === "Failed"
        ? {
            error:
              "Undefined local variable or method 'passwords' for cookbook: lamp2, recipe: database :chef::Recipe",
          }
        : {}),
    });
  }
  return out;
}

function buildRunList(runId: string): RunListNode[] {
  const r = rng(`${runId}:runlist`);
  const version = () => `v0.${Math.floor(r() * 9)}.${Math.floor(r() * 9)}`;
  const entries = [
    "recipe[chef-client::default]",
    "recipe[chef-client::config]",
    "recipe[chef-client]",
    "recipe[chef-client::cron]",
    "recipe[blue-green-app]",
    "recipe[blue-green-app::default]",
    "recipe[blue-green-app::nginx]",
  ];
  return entries.map((name, i) => ({
    id: `runlist-${i + 1}`,
    name,
    version: version(),
    position: String(i + 1),
    kind: "recipe" as const,
  }));
}


function buildAttributes(run: { node: string; platform: string; environment: string; policyGroup: string }): AttributeNode[] {
  return [
    {
      key: "audit",
      source: "default",
      children: [
        { key: "reporter", source: "default", value: '"chef-server-automate"' },
        { key: "fetcher", source: "default", value: '"chef-server"' },
        { key: "profiles", source: "normal", value: "[]" },
      ],
    },
    {
      key: "chef_client",
      source: "default",
      children: [
        { key: "interval", source: "default", value: '"1800"' },
        { key: "splay", source: "override", value: '"300"' },
        {
          key: "config",
          source: "normal",
          children: [
            { key: "log_level", source: "normal", value: '":info"' },
            { key: "ssl_verify_mode", source: "override", value: '":verify_peer"' },
          ],
        },
      ],
    },
    {
      key: "chef-vault",
      source: "default",
      children: [{ key: "databag_fallback", source: "default", value: "false" }],
    },
    {
      key: "cloud",
      source: "automatic",
      children: [
        { key: "provider", source: "automatic", value: '"aws"' },
        { key: "public_ipv4", source: "automatic", value: '"10.128.1.133"' },
        { key: "local_hostname", source: "automatic", value: `"${run.node}.chef.lab"` },
      ],
    },
    {
      key: "kernel",
      source: "automatic",
      children: [
        { key: "name", source: "automatic", value: '"Linux"' },
        { key: "release", source: "automatic", value: '"5.15.0-91-generic"' },
        { key: "machine", source: "automatic", value: '"x86_64"' },
      ],
    },
    {
      key: "platform",
      source: "automatic",
      children: [
        { key: "name", source: "automatic", value: `"${run.platform.split(" ")[0]}"` },
        { key: "version", source: "automatic", value: `"${run.platform.split(" ")[1] ?? "24.04"}"` },
        { key: "family", source: "automatic", value: '"debian"' },
      ],
    },
    {
      key: "apache",
      source: "override",
      children: [
        { key: "listen_ports", source: "override", value: '["80","443"]' },
        { key: "docroot_dir", source: "normal", value: '"/var/www/html"' },
      ],
    },
    {
      key: "policy",
      source: "normal",
      children: run.policyGroup
        ? [{ key: "group", source: "normal" as const, value: `"${run.policyGroup}"` }]
        : [{ key: "environment", source: "normal" as const, value: `"${run.environment || "_default"}"` }],
    },
  ];
}

export function countAttributes(nodes: AttributeNode[]): Record<AttributeSource | "all", number> {
  const counts = { all: 0, default: 0, normal: 0, override: 0, automatic: 0 };
  const walk = (list: AttributeNode[]) => {
    for (const n of list) {
      if (n.children) walk(n.children);
      else {
        counts.all += 1;
        counts[n.source] += 1;
      }
    }
  };
  walk(nodes);
  return counts;
}

/* ------------------------------------------------------------------ */
/* Run history + detail lookup                                          */
/* ------------------------------------------------------------------ */

const HISTORY_LENGTH = 30;

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function formatTimestamp(hoursAgo: number): string {
  const base = Date.UTC(2026, 7, 26, 16, 26, 0); // 26 Aug 2026 16:26 UTC
  const d = new Date(base - hoursAgo * 3600_000);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${d.getUTCDate()} ${months[d.getUTCMonth()]} ${d.getUTCFullYear()}, ${pad(d.getUTCHours())}:${pad(
    d.getUTCMinutes(),
  )} UTC`;
}

function relativeLabel(hoursAgo: number): string {
  if (hoursAgo < 1) return `${Math.max(1, Math.round(hoursAgo * 60))} minutes ago`;
  if (hoursAgo < 24) return `${Math.round(hoursAgo)} hours ago`;
  return `${Math.round(hoursAgo / 24)} days ago`;
}

export function getRunHistory(baseRunId: string): RunHistoryItem[] {
  const base = clientRuns.find((r) => r.id === baseRunId);
  const r = rng(`${baseRunId}:history`);
  const items: RunHistoryItem[] = [];
  let hoursAgo = 0;

  for (let i = 0; i < HISTORY_LENGTH; i++) {
    const status: "Success" | "Failed" =
      i === 0 ? (base?.status ?? "Success") : r() > 0.85 ? "Failed" : "Success";
    items.push({
      runId: i === 0 ? baseRunId : `${baseRunId}--h${i}`,
      timestamp: formatTimestamp(hoursAgo),
      relative: relativeLabel(hoursAgo),
      hoursAgo,
      duration: `${Math.floor(r() * 3) + 1}m ${Math.floor(r() * 59)}s`,
      status,
    });
    hoursAgo += 0.4 + r() * 6;
  }
  return items;
}

export function resolveBaseRunId(runId: string): string {
  return runId.split("--h")[0]!;
}

export function getRunDetail(runId: string): RunDetail | undefined {
  const baseId = resolveBaseRunId(runId);
  const base = clientRuns.find((r) => r.id === baseId);
  if (!base) return undefined;

  const history = getRunHistory(baseId);
  const entry = history.find((h) => h.runId === runId) ?? history[0]!;
  const resources = buildResources(runId, entry.status);

  const summary = {
    successful: resources.filter((x) => x.status === "Success").length,
    failed: resources.filter((x) => x.status === "Failed").length,
    unchanged: resources.filter((x) => x.status === "Unchanged").length,
    unprocessed: resources.filter((x) => x.status === "Unprocessed").length,
  };

  return {
    id: runId,
    node: base.node,
    status: entry.status,
    startedAt: entry.timestamp,
    duration: entry.duration,
    chefVersion: "17.5.22",
    triggeredBy: "Scheduled",
    resources,
    summary,
    nodeInformation: [
      { label: "Node Name", value: base.node },
      { label: "FQDN", value: `${base.node}.chef.lab` },
      { label: "IP Address", value: "10.128.1.133" },
      { label: "Platform", value: base.platform },
      { label: "Node Uptime", value: base.uptime },
    ],
    policyEnvironment: [
      { label: "Chef Organization", value: "connector-test-org" },
      { label: "Chef Server", value: "connector-test.cloud.chef.io" },
      { label: "Cookbook Deprecations", value: "None" },
      ...(base.policyGroup
        ? [
            { label: "Policy Name", value: base.policyGroup },
            { label: "Policy Group", value: base.policyGroup },
          ]
        : [{ label: "Environment", value: base.environment || "_default" }]),
    ],
    runList: buildRunList(runId),
    attributes: buildAttributes(base),
    ...(entry.status === "Failed"
      ? {
          error: {
            message:
              "Undefined local variable or method 'passwords' for cookbook: lamp2, recipe: database :chef::Recipe",
            backtrace: [
              "/var/chef/cache/cookbooks/lamp2/recipes/database.rb:14:in `from_file'",
              "/opt/chef/embedded/lib/ruby/gems/3.1.0/gems/chef-17.5.22/lib/chef/run_context.rb:294:in `load_recipe'",
              "/opt/chef/embedded/lib/ruby/gems/3.1.0/gems/chef-17.5.22/lib/chef/policy_builder/policyfile.rb:190:in `block in expand_run_list'",
              "/opt/chef/embedded/lib/ruby/gems/3.1.0/gems/chef-17.5.22/lib/chef/client.rb:281:in `run_ohai'",
            ],
          },
        }
      : {}),
  };
}
