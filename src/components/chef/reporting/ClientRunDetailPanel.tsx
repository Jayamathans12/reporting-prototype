import { useState } from "react";
import { ChevronDown, Download } from "lucide-react";
import { StatusIcon, StatusPill } from "../StatusPill";
import { TabStrip } from "../TabStrip";
import { ResourceTable } from "./ResourceTable";
import { RunListTree } from "./RunListTree";
import { AttributeTree } from "./AttributeTree";
import { RunHistoryPanel } from "./RunHistoryPanel";
import type { RunDetail, RunHistoryItem } from "@/data/clientRunDetail";

function InfoRows({
  rows,
  columns = 1,
}: {
  rows: { label: string; value: string }[];
  columns?: number;
}) {
  return (
    <dl className={`mt-3 grid gap-x-8 gap-y-2 ${columns === 2 ? "sm:grid-cols-2" : ""}`}>
      {rows.map((row) => (
        <div key={row.label} className="grid grid-cols-[140px_1fr] items-start gap-3 text-[12px]">
          <dt className="font-semibold text-chef-text">{row.label}</dt>
          <dd className="break-words text-chef-text-muted">{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function ClientRunDetailPanel({
  detail,
  history,
  onSelectRun,
}: {
  detail: RunDetail;
  history: RunHistoryItem[];
  onSelectRun: (runId: string) => void;
}) {
  const [tab, setTab] = useState("resources");
  const [errorOpen, setErrorOpen] = useState(true);


  const summaryItems = [
    { status: "Success" as const, label: "Successful", value: detail.summary.successful },
    { status: "Failed" as const, label: "Failed", value: detail.summary.failed },
    { status: "Unchanged" as const, label: "Unchanged", value: detail.summary.unchanged },
    { status: "Unprocessed" as const, label: "Unprocessed", value: detail.summary.unprocessed },
  ];

  return (
    <div className="mt-4">
      <div className="flex flex-wrap items-center gap-3">
        <StatusPill status={detail.status} />
        <h2 className="text-[18px] font-semibold text-chef-text">
          {detail.node} • Last run: {detail.startedAt}
        </h2>
      </div>
      <p className="mt-1 text-[12px] text-chef-text-muted">
        Run ID: {detail.id}
      </p>

      <div className="mt-4 grid items-stretch gap-4 xl:grid-cols-[minmax(0,1fr)_340px]">
        <div className="space-y-4">
          {detail.error && (
            <section className="overflow-hidden rounded-sm border border-chef-red/50 bg-chef-red/5">
              <div className="flex items-center justify-between gap-3 border-b border-chef-red/30 bg-chef-red/10 px-4 py-2.5">
                <button
                  type="button"
                  onClick={() => setErrorOpen((v) => !v)}
                  className="inline-flex items-center gap-2 text-[14px] font-semibold text-chef-text"
                >
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${errorOpen ? "" : "-rotate-90"}`}
                  />
                  Error Log and Backtrace
                </button>
                <button
                  type="button"
                  aria-label="Download error log"
                  className="inline-flex h-7 w-7 items-center justify-center rounded-sm border border-chef-red/40 text-chef-text hover:border-chef-red"
                >
                  <Download className="h-4 w-4" />
                </button>
              </div>
              {errorOpen && (
                <div className="px-4 py-3">
                  <p className="text-[13px] text-chef-text">{detail.error.message}</p>
                  <p className="mt-2 text-[13px] font-semibold text-chef-text">Backtrace</p>
                  <pre className="mt-2 overflow-x-auto rounded-sm bg-[#111318] p-4 font-mono text-[12px] leading-6 text-chef-text-muted">
                    {detail.error.backtrace.join("\n")}
                  </pre>
                </div>
              )}
            </section>
          )}
          <div className="grid gap-4 lg:grid-cols-3">

            <section className="rounded-sm border border-chef-line bg-chef-surface p-4">
              <h3 className="text-[14px] font-semibold text-chef-text">Run Information</h3>
              <InfoRows
                rows={[
                  { label: "Duration", value: detail.duration },
                  { label: "Chef Client Version", value: detail.chefVersion },
                ]}
              />
            </section>

            <section className="rounded-sm border border-chef-line bg-chef-surface p-4 lg:col-span-2">
              <h3 className="text-[14px] font-semibold text-chef-text">Resource Overview</h3>
              <ul className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {summaryItems.map((item) => (
                  <li key={item.label}>
                    <span className="flex items-center gap-2 text-[13px] text-chef-text">
                      <StatusIcon status={item.status} className="h-4 w-4" />
                      {item.label}
                    </span>
                    <span className="mt-2 block text-[22px] text-chef-text">{item.value}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <section className="rounded-sm border border-chef-line bg-chef-surface p-4">
              <h3 className="text-[14px] font-semibold text-chef-text">Node Information</h3>
              <InfoRows rows={detail.nodeInformation} />
            </section>
            <section className="rounded-sm border border-chef-line bg-chef-surface p-4">
              <h3 className="text-[14px] font-semibold text-chef-text">Metadata</h3>
              <InfoRows rows={detail.policyEnvironment} columns={1} />
            </section>
          </div>




          <section className="rounded-sm border border-chef-line bg-chef-surface px-4 pb-4">
            <TabStrip
              tabs={[
                { id: "resources", label: "Resources" },
                { id: "runlist", label: "Run List" },
                { id: "attributes", label: "Attributes" },
              ]}
              active={tab}
              onChange={setTab}
            />
            {tab === "resources" && <ResourceTable resources={detail.resources} />}
            {tab === "runlist" && <RunListTree nodes={detail.runList} />}
            {tab === "attributes" && <AttributeTree attributes={detail.attributes} />}
          </section>
        </div>

        <div className="min-h-0 xl:h-full">
          <div className="xl:sticky xl:top-4 xl:max-h-[calc(100vh-6rem)] xl:h-full">
            <RunHistoryPanel history={history} selectedRunId={detail.id} onSelect={onSelectRun} />
          </div>
        </div>


      </div>
    </div>
  );
}
