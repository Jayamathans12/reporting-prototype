import { useState } from "react";
import { ChevronDown, ChevronRight, Download, FileText, BookOpen, Plus, RotateCcw, Search, X } from "lucide-react";
import { StatusIcon, StatusPill } from "./StatusPill";
import { TabStrip } from "./TabStrip";
import { ItemsPager } from "./TableToolbar";
import {
  attributeCounts,
  attributeKeys,
  errorLog,
  nodeInformation,
  policyEnvironment,
  resourceExecution,
  resourceOverview,
  runHistory,
  runHistoryCounts,
  runInformation,
  runListRows,
} from "@/data/reporting";

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-sm border border-chef-line bg-chef-surface p-4">
      <h3 className="mb-3 text-[15px] text-chef-text">{title}</h3>
      {children}
    </section>
  );
}

function KeyValues({ rows }: { rows: { label: string; value: string }[] }) {
  return (
    <dl className="space-y-2">
      {rows.map((row) => (
        <div key={row.label} className="grid grid-cols-[150px_1fr] gap-3 text-[13px]">
          <dt className="font-semibold text-chef-text">{row.label}</dt>
          <dd className="break-all text-chef-text-muted">{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function RunHistoryPanel() {
  return (
    <section className="flex h-full flex-col rounded-sm border border-chef-line bg-chef-surface p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-[15px] text-chef-text">Run History</h3>
        <button type="button" className="inline-flex items-center gap-1.5 text-[13px] text-chef-text hover:text-chef-blue">
          <Download className="h-4 w-4" />
          Download
        </button>
      </div>

      <div className="mb-3 flex gap-3">
        <div className="flex h-[52px] w-[62px] flex-col items-center justify-center rounded-sm border border-chef-line bg-chef-canvas">
          <span className="text-[12px] text-chef-text">All</span>
          <span className="text-[13px] font-semibold text-chef-text">{runHistoryCounts.all}</span>
        </div>
        <div className="flex h-[52px] w-[62px] flex-col items-center justify-center rounded-sm border border-chef-line">
          <StatusIcon status="Success" />
          <span className="text-[13px] font-semibold text-chef-text">{runHistoryCounts.successful}</span>
        </div>
        <div className="flex h-[52px] w-[62px] flex-col items-center justify-center rounded-sm border border-chef-line">
          <StatusIcon status="Failed" />
          <span className="text-[13px] font-semibold text-chef-text">
            {String(runHistoryCounts.failed).padStart(2, "0")}
          </span>
        </div>
      </div>

      <select
        aria-label="Run history range"
        defaultValue="Last 24hours"
        className="mb-3 h-9 w-full rounded-sm border border-chef-line bg-chef-surface px-2 text-[13px] text-chef-text outline-none"
      >
        <option>Last 24hours</option>
        <option>Last 7 days</option>
        <option>Last 30 days</option>
      </select>

      <ul className="max-h-[420px] space-y-2 overflow-y-auto pr-1">
        {runHistory.map((entry, i) => (
          <li key={i}>
            <button
              type="button"
              className={`flex w-full items-start gap-2.5 rounded-sm border px-3 py-2.5 text-left ${
                i === 0 ? "border-chef-blue" : "border-chef-line"
              } hover:border-chef-blue`}
            >
              <StatusIcon status={entry.status} className="mt-0.5 h-4 w-4" />
              <span>
                <span className="block text-[13px] text-chef-text">{entry.timestamp}</span>
                <span className="block text-[12px] text-chef-text-muted">{entry.relative}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

function ResourceOverviewCard() {
  const items = [
    { label: "Successful", value: resourceOverview.successful, status: "Success" as const },
    { label: "Failed", value: resourceOverview.failed, status: "Failed" as const },
    { label: "Unchanged", value: resourceOverview.unchanged, status: "Unchanged" as const },
    { label: "Unprocessed", value: resourceOverview.unprocessed, status: "Unprocessed" as const },
  ];
  return (
    <Card title="Resource Overview">
      <div className="grid grid-cols-4 gap-4">
        {items.map((item) => (
          <div key={item.label}>
            <div className="flex items-center gap-2">
              <StatusIcon status={item.status} className="h-[18px] w-[18px]" />
              <span className="text-[14px] text-chef-text">{item.label}</span>
            </div>
            <div className="mt-2 text-[22px] text-chef-text">{item.value}</div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function FilterChip({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="inline-flex h-8 items-center gap-2 rounded-sm border border-chef-line bg-chef-surface px-2.5 text-[13px] text-chef-text"
    >
      {label}
      <ChevronDown className="h-3.5 w-3.5 text-chef-text-muted" />
    </button>
  );
}

function ResourcesTab() {
  return (
    <div>
      <div className="flex items-center justify-between px-1 py-3">
        <div className="flex items-baseline gap-3">
          <h3 className="text-[15px] text-chef-text">Resource Execution</h3>
          <span className="text-[13px] text-chef-text-muted">Showing 62 results</span>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2.5 pb-3">
        {["Status: All", "Cookbook: All", "Type: All", "Resource Action: All", "Label: All", "Label: All"].map(
          (label, i) => (
            <FilterChip key={`${label}-${i}`} label={label} />
          ),
        )}
        <button type="button" className="inline-flex items-center gap-1.5 text-[13px] text-chef-text hover:text-chef-blue">
          <Plus className="h-4 w-4" /> Filter
        </button>
        <button type="button" className="inline-flex items-center gap-1.5 text-[13px] text-chef-text hover:text-chef-blue">
          <RotateCcw className="h-4 w-4" /> Reset
        </button>
      </div>

      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="border-y border-chef-line bg-chef-canvas">
            {["Step", "Resource Name", "Type", "Cookbook", "Resource Action", "Status"].map((col) => (
              <th key={col} className="px-4 py-2.5 text-[13px] font-semibold text-chef-text">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {resourceExecution.map((row, i) => (
            <tr key={i} className={i % 2 ? "bg-chef-canvas/60" : ""}>
              <td className="px-4 py-2.5 text-[13px] text-chef-text">{row.step}</td>
              <td className="px-4 py-2.5 text-[13px] text-chef-text">{row.name}</td>
              <td className="px-4 py-2.5 text-[13px] text-chef-text">{row.type}</td>
              <td className="px-4 py-2.5 text-[13px] text-chef-text">{row.cookbook}</td>
              <td className="px-4 py-2.5 text-[13px] text-chef-text">{row.action}</td>
              <td className="px-4 py-2.5">
                <StatusPill status={row.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ItemsPager shown={10} total={62} />
    </div>
  );
}

function RunListTab() {
  return (
    <div className="pt-3">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="border-y border-chef-line bg-chef-canvas">
            <th className="w-12 px-4 py-2.5" />
            <th className="px-4 py-2.5 text-[13px] font-semibold text-chef-text">Name ↓</th>
            <th className="w-[180px] px-4 py-2.5 text-[13px] font-semibold text-chef-text">Version</th>
            <th className="w-[180px] px-4 py-2.5 text-[13px] font-semibold text-chef-text">Position</th>
          </tr>
        </thead>
        <tbody>
          {runListRows.map((row, i) => (
            <tr key={i} className={i % 2 ? "bg-chef-canvas/60" : ""}>
              <td className="px-4 py-2.5">
                {row.expandable && (
                  <button type="button" aria-label={`Expand ${row.name}`} className="text-chef-text-muted">
                    {i === 0 || i === 1 ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </button>
                )}
              </td>
              <td className="px-4 py-2.5 text-[13px] text-chef-text">
                <span className="flex items-center gap-2" style={{ paddingLeft: row.depth * 22 }}>
                  {row.kind === "cookbook" ? (
                    <BookOpen className="h-4 w-4 text-chef-text-muted" />
                  ) : (
                    <FileText className="h-4 w-4 text-chef-text-muted" />
                  )}
                  {row.name}
                </span>
              </td>
              <td className="px-4 py-2.5 text-[13px] text-chef-text">{row.version}</td>
              <td className="px-4 py-2.5 text-[13px] text-chef-text">{row.position}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function AttributesTab() {
  return (
    <div className="pt-4">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
        {attributeCounts.map((item, i) => (
          <div
            key={item.label}
            className={`rounded-sm border p-4 ${
              i === 0 ? "border-chef-text/50 bg-chef-canvas" : "border-chef-line bg-chef-surface"
            }`}
          >
            <div className="text-[13px] font-semibold text-chef-text">{item.label}</div>
            <div className="mt-2 text-[26px] text-chef-text">{item.count}</div>
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between">
        <div className="flex items-baseline gap-3">
          <h3 className="text-[15px] text-chef-text">All Attributes</h3>
          <span className="text-[13px] text-chef-text-muted">Showing 10 results</span>
        </div>
        <div className="relative">
          <Search className="pointer-events-none absolute left-2.5 top-2.5 h-4 w-4 text-chef-text-muted" />
          <input
            aria-label="Search attributes"
            className="h-9 w-[240px] rounded-sm border border-chef-line pl-8 pr-8 text-[13px] outline-none focus:border-chef-blue"
          />
          <X className="pointer-events-none absolute right-2.5 top-2.5 h-4 w-4 text-chef-text-muted" />
        </div>
      </div>

      <div className="mt-3 flex gap-6 text-[13px] text-chef-text">
        <button type="button" className="hover:text-chef-blue">Expand All</button>
        <button type="button" className="hover:text-chef-blue">Collapse All</button>
      </div>

      <ul className="mt-3 border-t border-chef-line">
        {attributeKeys.map((key, i) => (
          <li
            key={`${key}-${i}`}
            className={`flex items-center gap-3 border-b border-chef-line px-3 py-2.5 ${
              i % 2 ? "bg-chef-canvas/60" : ""
            }`}
          >
            <ChevronRight className="h-4 w-4 text-chef-text-muted" />
            <span className="font-mono text-[13px] text-chef-text">{key}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ClientRunPanel({
  title = "Client Run",
  showErrorLog = false,
}: {
  title?: string;
  showErrorLog?: boolean;
}) {
  const [tab, setTab] = useState("resources");

  return (
    <section className="mt-6">
      <h2 className="mb-3 text-[18px] text-chef-text">{title}</h2>

      <div className="grid gap-4 xl:grid-cols-[280px_1fr_330px]">
        <Card title="Run Information">
          <KeyValues rows={runInformation} />
        </Card>
        <ResourceOverviewCard />
        <div className="xl:row-span-2">
          <RunHistoryPanel />
        </div>
        <Card title="Node Information">
          <KeyValues rows={nodeInformation} />
        </Card>
        <Card title="Policy & Environment">
          <KeyValues rows={policyEnvironment} />
        </Card>
      </div>

      {showErrorLog && (
        <section className="mt-4 rounded-sm border border-chef-line bg-chef-surface p-4">
          <h3 className="text-[15px] font-semibold text-chef-text">Error Log and Backtrace</h3>
          <p className="mt-2 text-[13px] text-chef-red">{errorLog.message}</p>
          <h4 className="mt-3 text-[13px] font-semibold text-chef-text">Backtrace</h4>
          <pre className="mt-2 overflow-x-auto rounded-sm bg-chef-canvas p-3 font-mono text-[12px] text-chef-text-muted">
            {errorLog.backtrace.join("\n")}
          </pre>
        </section>
      )}

      <div className="mt-4 rounded-sm border border-chef-line bg-chef-surface p-4">
        <TabStrip
          tabs={[
            { id: "resources", label: "Resources" },
            { id: "runlist", label: "Run List" },
            { id: "attributes", label: "Attributes" },
          ]}
          active={tab}
          onChange={setTab}
        />
        {tab === "resources" && <ResourcesTab />}
        {tab === "runlist" && <RunListTab />}
        {tab === "attributes" && <AttributesTab />}
      </div>
    </section>
  );
}
