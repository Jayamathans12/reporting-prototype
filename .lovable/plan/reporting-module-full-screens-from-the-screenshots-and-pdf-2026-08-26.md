# Reporting module — full screens from the screenshots and PDF

## What the sources show

The PDF and screenshots describe three report areas, each a **list screen** that drills into a **detail screen**. The breadcrumb in each artefact tells us exactly how the screens nest:

| Source | Breadcrumb in artefact | Meaning |
|---|---|---|
| PDF p.1 | DSM / Client Runs | list of client runs |
| PDF p.5–8 | DSM / Client Runs / Client Run Details | one run, with tabs + error log |
| PDF p.9, 11 | DSM / Compliance Scan | scan list, tabs Nodes / Profiles / Controls |
| PDF p.10 | DSM / Compliance Scan / Compliance Scan Details | controls of one scan |
| image-3 | Node Management / All nodes / Node Name | node detail + Client Run panel |

Since these all sit under the Reporting card in this app, the same nesting is reproduced with **Reporting** as the module root.

## Screen map and breadcrumbs

```text
Reporting  (module)
├─ Client Reporting              /reporting/client
│   Home / Reporting / Client Reporting
│   └─ Client Run Details        /reporting/client/$runId
│       Home / Reporting / Client Reporting / Client Run Details
├─ InSpec Reporting              /reporting/inspec
│   Home / Reporting / InSpec Reporting
│   └─ Compliance Scan Details   /reporting/inspec/$scanId
│       Home / Reporting / InSpec Reporting / Compliance Scan Details
└─ Node Management Reporting     /reporting/node-management
    Home / Reporting / Node Management Reporting
    └─ Node Detail               /nodes/detail/$nodeId   (existing screen, reused)
        Home / Node Management / All nodes / <Node Name>
```

Every crumb except the last is a link; the last is plain text — same `Breadcrumbs` component already used across the app.

## 1. Client Reporting (list) — PDF p.1

Replaces the current placeholder table. Title "Client Runs", blue **Download** split-button top right. Card header "Run Records — Showing 9 results" with search / filter / column icons. Columns: Last Run, Status (green Success / red Failed pill), DSM Node, Uptime, Policy Group, Platform, Environment, Resource Summary (four coloured count chips: successful, failed, unchanged, unprocessed). Rows come from the PDF (web-prod-01, web-prod-02, app-stage-03, db-prod-01, app-prod-04, web-dev-01…). Clicking a row opens Client Run Details.

## 2. Client Run Details — PDF p.5–8

Header strip: status pill, `Web-Prod-01 • Last run: 12 Jan 2026, 14:32 UTC`, sub-line `Run ID: CR-69dcefb8-2d09-44f9 • Duration: 1m 42s • Triggered: Scheduled`.

Body, three columns as in the PDF:
- **Run Information** card — Duration, Chef Client Version, Resources Total.
- **Resource Overview** card — Successful 1, Failed 1, Unchanged 0, Unprocessed 1 with the four status icons.
- **Run History** rail on the right — Download link, All 123 / Successful 119 / Failed 04 chips, "Last 24hours" select, scrollable list of timestamped runs with status icons.
- Below: **Node Information** and **Policy & Environment** detail cards.

Tab strip **Resources | Run List | Attributes**:
- Resources — "Resource Execution, showing 62 results", filter chips (Status, Cookbook, Type, Resource Action, Label, + Filter, Reset), table Step / Resource Name / Type / Cookbook / Resource Action / Status with Failed / Unchanged / Unprocessed pills, pager "1 – 10 of 62 items, 10 items per page".
- Run List — tree table Name / Version / Position with expandable role → recipe → cookbook rows.
- Attributes — count cards All 10, Default 2, Normal 2, Override 3, Automatic 3, search box, Expand All / Collapse All, list of collapsible attribute keys.

When the run status is Failed, an **Error Log and Backtrace** panel is shown (PDF p.8) with the undefined-local-variable message and backtrace.

## 3. InSpec Reporting (list) — PDF p.9/11

Title "Compliance Scan", blue **Export** split-button. Tabs **Nodes 20 | Profiles 40 | Controls 276**. Card header "Scan Results — Showing 6 results" with search / filter / column icons. Columns: Last Scan, Status (Passed / Failed pill), Nodes, Platform, Environment, Control Failures. Rows from the PDF (chef-test-violet-waxwing-yellow-AJTNYW, baker-test-emerald-owl-red-ZXYLKT, …). Pager "1 – 10 of 20 items". Row click → Compliance Scan Details.

## 4. Compliance Scan Details — PDF p.10

Controls table: Control (sortable), Status (Passed / Failed / Skipped), Severity (Critical (1.0) / Major (0.5)), Root Profile, Test Results. Rows apache-01 … apache-19 from the PDF, pager "1 – 10 of 20 items".

## 5. Node Management Reporting — image-3

Stays as the shared Chef 360 Nodes table; clicking a node still opens the existing `/nodes/detail/$nodeId` screen unchanged. Image-3 shows that node detail page also carries a **Client Run** section (Run Information, Resource Overview, Run History, Resources/Run List/Attributes tabs) — the same block built for Client Run Details will be reused there so the two screens stay identical.

## Technical notes

- New data file `src/data/reporting.ts` (rewritten): `clientRuns`, `clientRunDetail` (run info, resource overview, run history, node info, policy, resources, run list, attributes, error log), `complianceScans`, `complianceControls`.
- New shared components in `src/components/chef/`: `StatusPill` (success/failed/skipped/unchanged/unprocessed), `TabStrip`, `RunHistoryPanel`, `ClientRunPanel` (the whole Client Run block, reused by run details and node detail), `ResourceOverview`, `SplitButton`, `TableToolbar` (search/filter/column icons + "Showing N results").
- New routes: `reporting/client.$runId.tsx`, `reporting/inspec.$scanId.tsx`; existing `reporting/client.tsx` and `reporting/inspec.tsx` rewritten from `ListPageShell` to the richer tables above. Each route gets its own `head()` metadata.
- Rail, hub card and `/reporting/node-management` unchanged.
- All static mock data; no backend.
