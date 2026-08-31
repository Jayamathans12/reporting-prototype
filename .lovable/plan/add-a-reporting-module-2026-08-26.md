# Add a Reporting module

Adds a seventh card to the home hub, placed after Download Centre, plus a Reporting section with its own side menu.

## Hub card

- Title: Reporting
- Description: "View and manage reports"
- Resources: Client Reporting, InSpec Reporting, Node Management Reporting
- Clicking the card (or the arrow) opens Reporting; each resource pill deep-links to its own page

## Reporting section

Same chrome as the other modules (dark top bar, collapsible icon rail, breadcrumbs). Side menu with three items:

1. Client Reporting — `/reporting/client`
2. InSpec Reporting — `/reporting/inspec`
3. Node Management Reporting — `/reporting/node-management`

Client Reporting and InSpec Reporting use the existing list-page shell (title, description, search, table with mock rows, pager) so they look consistent with the DSM pages.

Node Management Reporting renders the exact Chef 360 Nodes table already used on `/nodes` — same columns, skill pills, checkboxes, action buttons and pager, driven by the same mock node data. Clicking a node's IP/FQDN navigates to the existing node detail page (`/nodes/detail/$nodeId`), reusing that screen unchanged.

## Technical notes

- New `ModuleKey` `"reporting"` in `src/data/orgs.ts`, granted to all three roles so the card shows for every role; new entry appended to `src/data/hubCards.ts` with a chart icon.
- Extract the nodes table out of `src/routes/nodes.index.tsx` into `src/components/chef/NodesTable.tsx` so both `/nodes` and `/reporting/node-management` render one shared component — no duplicated markup.
- New routes: `reporting.index.tsx` (redirects to `/reporting/node-management`), `reporting.client.tsx`, `reporting.inspec.tsx`, `reporting.node-management.tsx`, each with its own `head()` metadata.
- New `reportingRailItems` in `src/components/chef/rails.ts`; mock rows for the two report pages added to `src/data/` (new `reporting.ts`).
- No backend; everything stays static mock data.
