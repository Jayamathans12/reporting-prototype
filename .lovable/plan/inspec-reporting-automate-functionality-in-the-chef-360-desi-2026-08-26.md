# InSpec Reporting — Automate functionality in the Chef 360 design

Bring the compliance-reporting behaviour from Automate into the existing InSpec Reporting screens, reusing the Chef 360 design system and the patterns already built for Client Reporting (static mock data, no backend).

## What the Automate recording does

- Reports page with three result views: Nodes, Profiles, Controls — each with its own table and columns.
- Status count cards above each table: Total / Failed / Passed / Skipped / Waived, clickable as filters.
- Sortable columns, search/filter box, time-range selector, export.
- Clicking a node opens a node compliance page: scan status banner, Report Information / Node Information / Metadata, count cards, and a control table where each control expands into Results (list of test assertions) and Source (InSpec control code).
- Right-side drawer: "Scan history for node" listing past scans with timestamps/relative times; tapping one loads that scan.
- Right-side drawer also used for drill-down: from the Nodes tab, a node opens its profiles then its controls with Results/Source; from Profiles, a profile opens its nodes/controls; from Controls, a control opens the nodes it ran on.
- Profile detail page: profile metadata (version, maintainer, license, platform) plus its controls list.

## What we will build

### 1. Compliance list page (`/reporting/inspec`)
- Keep the three existing tabs (Nodes, Profiles, Controls); each tab renders its own real table instead of the single static one.
- Add status count cards (Total / Failed / Passed / Skipped / Waived) that act as filters for the active tab.
- Wire the existing search, sort, column chooser and pager using the shared `useTableControls` hook, matching Client Reporting behaviour.
- Nodes tab: node, platform, environment, last scan, node status counts. Profiles tab: profile, version, status, controls counts. Controls tab: control name + description, profile, impact/severity, last scan, node status.
- Row click opens a right drawer (`ScanResultsDrawer`) for quick drill-down: node → controls, profile → controls, control → nodes; each control row expands to Results / Source tabs.

### 2. Compliance scan details (`/reporting/inspec/$scanId`)
- Scan status banner (passed/failed with timestamp) with expandable "View more" section holding Report Information, Node Information and Metadata columns.
- Count cards (Total / Failed / Passed / Skipped / Waived) filtering the control table.
- Control table: sortable, searchable, each row expands into Results (per-test assertion list with pass/fail icons) and Source (InSpec code block).
- "Scan history" drawer listing prior scans for that node; selecting one switches the displayed scan.

### 3. Profile detail (`/reporting/inspec/profile/$profileId`)
- Profile metadata card (version, maintainer, license, platform) and its controls table with impact and node-status counts, controls expandable to Results/Source.

## Technical notes

- New static data module `src/data/complianceDetail.ts` with a deterministic seeded generator: profiles, controls (title, description, impact/severity, code source), per-control test results, per-node scans, and 20–30 entry scan histories. Same approach as `src/data/clientRunDetail.ts`.
- New components under `src/components/chef/reporting/`: `CountCards`, `ControlTable` (expandable Results/Source), `ScanHistoryDrawer`, `ScanResultsDrawer`, `SourceBlock`, reusing `StatusPill`, `SortHeader`, `TableToolbar`, `ItemsPager`.
- Reuse `useTableControls` for all three tabs and the control tables.
- Severity colouring (CRITICAL / MAJOR / MINOR) added as Chef tokens in `src/styles.css`, no hardcoded colours.
- Routes and breadcrumbs unchanged, plus one new leaf: `Home / Reporting / InSpec Reporting / Profile Details`. Each route keeps its own `head()` metadata.
- Client Reporting, Node Management Reporting and the shared node-detail panel are untouched.
