# Node-centric reporting: one page per node

Make the node the central entity in Reporting. Clicking a node in Node Management Reporting opens a single page that shows everything about that node: its details and attributes, its full Client Run detail view, and its full Compliance (InSpec) scan detail view — reusing exactly the screens already built.

## What changes

### 1. Node Management Reporting list

Rows keep the current Chef 360 Nodes table, but clicking a row now opens the reporting node page (`/reporting/node-management/<node>`) instead of the Node Management module's node detail screen. The `/nodes` module page is untouched and still links to its own detail screen.

### 2. New node reporting page

Breadcrumb: `Reporting / Node Management Reporting / <node hostname>`, inside the Reporting shell (same top bar and rail).

Header: node FQDN with status, plus the node's key facts.

Content is organised as three tabs (same TabStrip used elsewhere), so a user sees all events for the node on one page without losing the detail fidelity we already built:

1. **Node Details & Attributes** — the Node Details card (hostname, enrolment level, health status, node ID, FQDN, installed skills, cohort, tags) and the grouped attributes exactly as they appear on the existing node detail screen.
2. **Client Run** — the existing Client Run Details view for this node: status header, Run Information / Resource Overview, Node Information, Policy & Environment, error log, Resources / Run List / Attributes tabs, and the Run History panel. Selecting a run in Run History swaps the run in place on this page (it stays on the node page rather than jumping to `/reporting/client/...`).
3. **Compliance** — the existing Compliance Scan Details view for this node: scan/node/environment info, control count filters, searchable and severity-filtered control table with expandable Results/Source, export, and Scan History.

The standalone Client Reporting and InSpec Reporting feeds stay exactly as they are today (all runs / all scans across nodes, drilling into their own detail routes).

## Linking node to its runs and scans

The three mock datasets currently use different identifiers (nodes are keyed by IP, client runs by names like `web-prod-01`, compliance scans by names like `chef-client-1`). A small resolver module maps each Chef 360 node to one client-run series and one compliance-scan series deterministically (stable by node index, with a wrap-around so every node resolves to data). When a node has no compliance scan of its own, the tab shows the mapped scan for that node so the screen is always populated; no empty placeholder states.

## Technical notes

- Extract the current node detail body (`Node Details` card + attributes section) from `src/routes/nodes.detail.$nodeId.tsx` into `src/components/chef/NodeDetailsPanel.tsx`, and render it from both the existing node detail route and the new reporting page — no duplicated markup.
- Extract the Compliance Scan Details body from `src/routes/reporting/inspec.$scanId.tsx` into `src/components/chef/reporting/ComplianceScanDetailPanel.tsx` (props: `detail`, `history`), so the scan route and the node page render the identical component. `ClientRunDetailPanel` is already a component and is reused as-is.
- New route `src/routes/reporting/node-management.$nodeId.tsx` with its own `head()` metadata; loader resolves node + mapped run detail/history + mapped scan detail/history.
- New `src/data/nodeReporting.ts` holding the node→run and node→scan resolver helpers.
- `src/components/chef/NodesTable.tsx` gains an optional `detailTo` prop so `/nodes` keeps `/nodes/detail/$nodeId` while Node Management Reporting points at the new route.
- Everything remains static mock data; no backend.
