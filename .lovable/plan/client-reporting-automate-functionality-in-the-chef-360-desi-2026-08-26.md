# Client Reporting — Automate functionality in the Chef 360 design system

Goal: reproduce what Chef Automate's Client Runs does, using the existing Chef 360 layout, tokens and components. No Automate visual styling is copied.

## What Automate does (from the recording)

1. Client Runs list — sortable columns, column chooser, status filter, search, row select, pagination, row drill-in.
2. Run detail — run/node/policy info, run-progress indicator, and a Run History drawer.
3. Run History drawer — All / Failed / Successful counters, time-range filter, download, and selecting an entry reloads the whole detail for that run.
4. Resources tab — Total / Failed / Successful / Unchanged / Unprocessed cards act as filters, table of step, type, name, action, cookbook, with per-row expand for detail.
5. Run List tab — role → recipe → cookbook hierarchy, expandable.
6. Attributes tab — search, All / Default / Normal / Override / Automatic counters, expand-all / collapse-all JSON tree.

## What gets built in Chef 360

Scope: the Reporting module's Client Reporting screens only. The Node Management node-detail page keeps its current simpler panel.

### Client Runs list (`/reporting/client`)
- Sort on every column (click header, asc/desc/none).
- Status filter tabs (All / Success / Failed) with live counts.
- Search box filtering node, policy group, platform, environment.
- Column chooser popover to show/hide columns; filter panel for environment and platform.
- Row checkboxes with select-all and a selection count.
- Working pagination with page-size select; the "Showing N results" label reflects filters.

### Client Run Details (`/reporting/client/$runId`)
- Header keeps the current Chef 360 card layout (Run Information, Resource Overview, Node Information, Policy & Environment).
- Resource Overview gains a compact run-progress ring showing percent of resources that completed.
- New "Run History" button opens a right-side drawer: counters for all/success/failed, time-range select (24 hours / 7 days / 30 days), download action, scrollable run list. Selecting a run switches the page to that run's data without leaving the screen, and the header timestamp, duration and all three tabs update.
- Resources tab: the five count cards become toggle filters; table sortable by step/type/name/action/cookbook; each row expands to show the resource's duration, delta/diff text, and failure message when present.
- Run List tab: expand/collapse per node, plus expand-all / collapse-all.
- Attributes tab: search filters keys and values, the five source counters filter the tree, and expand-all / collapse-all works on a real nested JSON structure.
- Failed runs keep the Error Log & Backtrace panel.

### Mock data
`src/data/reporting.ts` is expanded so all of the above behaves for real: per-run resource lists with statuses, durations and diffs; a 30-entry run history per node with distinct timestamps, durations and statuses; a nested attribute object with default/normal/override/automatic sources; a nested run-list tree.

## Technical notes

- New state lives in components; data stays static under `src/data/`. No backend.
- New pieces: `RunHistoryDrawer`, `ResourceTable` (sort + expand), `AttributeTree`, `RunListTree`, and a `useTableControls` hook for sort/filter/paginate reused by the list page.
- `ClientRunPanel` is parameterised by run id so the drawer can swap runs; the node-detail page keeps calling it in its current read-only mode.
- Existing tokens (`chef-blue`, `chef-line`, `chef-pill`, status colours) are used throughout; no new colours unless a status is missing one.
- Routes and breadcrumbs are unchanged.
