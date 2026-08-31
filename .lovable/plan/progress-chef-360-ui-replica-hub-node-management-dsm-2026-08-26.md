# Progress Chef 360 — UI Replica (Hub + Node Management + DSM)

A pixel-faithful React replica of the Chef 360 console using static mock data, structured so the code can be exported and run outside Lovable.

## What gets built

### Global chrome
- Dark top bar: app-launcher grid icon, "Progress Chef 360" logo lockup, module title divider ("Node Management", "Declarative State Management (DSM)"), green AI/plus circle, avatar icon, and role block ("tenant-admin" over org/role name) with chevron.
- Org switcher panel (opens from the chevron): Organization select, Role select, blue "Proceed" button. Functional — choosing an org/role updates the header label and the module list available in the hub/sidebar.
- Dark collapsible icon rail on module pages, with a blue round expand toggle; expanded state shows labels (DSM Nodes, Cookbooks, Roles, Data Bags, Environments, Clients, Policyfiles, Policy Groups).
- Breadcrumb row (home icon > page trail).

### Home hub (`/`)
Light gray canvas, "Welcome Jayamathan.S / What would you like to do today?", then the 6 white cards in the exact order and copy from the screenshot: Chef Courier, Chef Node Management, Declarative State Management (DSM), Organization Management, Tenant Management, Download Centre. Each card: outlined square icon tile, title with right arrow link, description, "Resources / view all" row, and the light-blue resource pills. Only Node Management and DSM cards route to live pages; the rest keep their arrow but land on a simple placeholder page.

### Node Management
- `/nodes` — "Chef 360 Nodes" with Enroll Nodes / Create Node Filter buttons, two Select dropdowns (first opens to Select / All Node Lists / All Node Filters), a table card headed "All Nodes - 1 - 2 of 2" with Archive Nodes, Save Node List, Create Courier Job, Export and refresh buttons. Table columns: checkbox, IP Address/FQDN, Hostname, Node ID, Operating System, Skills Installed (outlined pills + "+4" overflow badge), Actions (kebab). Footer pager with first/prev/page/next/last, "25 items per page" select, "1 - 2 of 2 items".
- `/nodes/$nodeId` — "Node FQDN: <ip>" with Archive Node / Restart Node / Create Courier Job. Left "Node Details" panel (Hostname, Enrolment Level, Health Status, Node ID with copy icon, Node FQDN, Skill Installed list, Node Cohort select with Detail/Change buttons, Tags key/value inputs). Right "Attributes" panel with Agent and AWS attribute groups as label/value rows.

### DSM
- Left expandable sidebar as above; each item is a route.
- `/dsm/nodes` — description paragraph + "Nodes" card with search box, refresh, "No nodes have been found." empty state, pager.
- `/dsm/clients` — description paragraph, "Create Client" button, search by client name, one validator row with kebab, pager.
- Cookbooks, Roles, Data Bags, Environments, Policyfiles, Policy Groups — same list-page shell (title, description, search, table/empty state, pager) with small mock datasets.

## Technical notes

- Routes under `src/routes/` (TanStack Router, file-based): `index.tsx`, `nodes.index.tsx`, `nodes.$nodeId.tsx`, `dsm.tsx` layout + `dsm.*.tsx` leaves. Each content route gets its own `head()` metadata.
- Reusable presentation components in `src/components/chef/`: `TopBar`, `OrgSwitcher`, `ModuleRail`, `Breadcrumbs`, `PageHeader`, `DataTable`, `Pager`, `SearchBar`, `SkillPill`, `HubCard`, `ListPageShell`.
- Mock data isolated in `src/data/` (`hubCards.ts`, `nodes.ts`, `dsm.ts`, `orgs.ts`) so swapping in a real API later means changing one folder.
- Org/role selection held in a small React context (`src/context/SessionContext.tsx`).
- Design tokens added to `src/styles.css`: Chef dark chrome (#1b1e23-family), Progress blue accent (#0d6efd-family), light-blue pill background, table header tint, 4px radii, and the compact Aptos/Inter-style UI type scale. No hard-coded color utilities in components.
- Icons via lucide-react, chosen to match the outlined glyphs in the screenshots.
- Export-friendly: standard Vite + React + TypeScript project, no Lovable-only runtime dependencies, no backend.
