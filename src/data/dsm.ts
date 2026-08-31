export interface DsmListPage {
  slug: string;
  title: string;
  description: string;
  searchPlaceholder: string;
  columns: string[];
  rows: string[][];
  emptyMessage: string;
  primaryAction?: string;
}

export const dsmPages: DsmListPage[] = [
  {
    slug: "nodes",
    title: "DSM Nodes",
    description:
      "A Node in Declarative State Management is a single machine (physical, virtual, or cloud instance) managed by Chef Infra Server. Each node runs the Chef client, belongs to one environment, and has a run-list that defines which cookbooks to apply. Nodes continuously converge to match the desired configuration state.",
    searchPlaceholder: "Search by Node Name",
    columns: ["Name", "Environment", "Platform", "Last Check-in"],
    rows: [],
    emptyMessage: "No nodes have been found.",
  },
  {
    slug: "cookbooks",
    title: "Cookbooks",
    description:
      "A Cookbook is the fundamental unit of configuration and policy distribution in Declarative State Management. Each cookbook bundles recipes, attributes, templates, and files that define how a part of the system should be configured.",
    searchPlaceholder: "Search by Cookbook Name",
    columns: ["Name", "Version", "Updated"],
    rows: [
      ["audit", "9.5.0", "12 Aug 2026"],
      ["chef-client", "18.3.1", "02 Aug 2026"],
    ],
    emptyMessage: "No cookbooks have been found.",
    primaryAction: "Upload Cookbook",
  },
  {
    slug: "roles",
    title: "Roles",
    description:
      "A Role defines patterns and processes that exist across nodes in an organization that belong to a single job function. Each role has a run-list and role-specific attributes applied to every node assigned to it.",
    searchPlaceholder: "Search by Role Name",
    columns: ["Name", "Description", "Run-list"],
    rows: [["web-server", "Base web tier role", "recipe[nginx]"]],
    emptyMessage: "No roles have been found.",
    primaryAction: "Create Role",
  },
  {
    slug: "data-bags",
    title: "Data Bags",
    description:
      "A Data Bag is a global variable store, saved as JSON and indexed for search. Data bags hold items such as credentials, users, and application configuration that recipes can look up at converge time.",
    searchPlaceholder: "Search by Data Bag Name",
    columns: ["Name", "Items"],
    rows: [["users", "3"]],
    emptyMessage: "No data bags have been found.",
    primaryAction: "Create Data Bag",
  },
  {
    slug: "environments",
    title: "Environments",
    description:
      "An Environment maps an organization's real-life workflow — such as development, staging, and production — to what is managed by Declarative State Management. Environments pin cookbook versions and set environment-specific attributes.",
    searchPlaceholder: "Search by Environment Name",
    columns: ["Name", "Description", "Cookbook Constraints"],
    rows: [["_default", "The default Chef environment", "0"]],
    emptyMessage: "No environments have been found.",
    primaryAction: "Create Environment",
  },
  {
    slug: "clients",
    title: "Clients",
    description:
      "A Client in Declarative State Management is an API identity that authenticates with the server using an RSA key pair. Each node has a corresponding client that chef-client uses to securely communicate with Declarative State Management, fetch cookbooks and policies, and report back node data. Clients have specific permissions, enabling secure and controlled access to Declarative State Management resources.",
    searchPlaceholder: "Search by Client Name",
    columns: ["Name"],
    rows: [["c9d2f1a5-8bd7-25729a4e34b2-validator"]],
    emptyMessage: "No clients have been found.",
    primaryAction: "Create Client",
  },
  {
    slug: "policyfiles",
    title: "Policyfiles",
    description:
      "A Policyfile is a single document that specifies the cookbooks, attributes, and run-list a node uses. Compiling a Policyfile produces a lock file that pins exact cookbook versions for repeatable converges.",
    searchPlaceholder: "Search by Policyfile Name",
    columns: ["Name", "Revision ID", "Policy Group"],
    rows: [["base", "a91f3c7e", "production"]],
    emptyMessage: "No policyfiles have been found.",
  },
  {
    slug: "policy-groups",
    title: "Policy Groups",
    description:
      "A Policy Group is a set of nodes that share the same policy revisions. Policy groups let you promote a tested policy revision from one stage of your workflow to the next.",
    searchPlaceholder: "Search by Policy Group Name",
    columns: ["Name", "Policies"],
    rows: [["production", "1"]],
    emptyMessage: "No policy groups have been found.",
  },
];

export function getDsmPage(slug: string) {
  return dsmPages.find((page) => page.slug === slug);
}
