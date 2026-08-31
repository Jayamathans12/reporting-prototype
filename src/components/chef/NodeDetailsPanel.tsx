import { Copy } from "lucide-react";
import { ChefButton } from "./Buttons";
import { nodeCohorts, type ChefNode } from "@/data/nodes";

function DetailRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[150px_1fr] gap-4 py-2.5 text-[13px]">
      <span className="font-semibold text-chef-text">{label}</span>
      <div className="text-chef-text">{children}</div>
    </div>
  );
}

export function NodeDetailsPanel({ node }: { node: ChefNode }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <section className="rounded-sm border border-chef-line bg-chef-canvas/60 p-5">
        <h2 className="mb-3 text-[15px] font-semibold text-chef-text">Node Details</h2>
        <DetailRow label="Hostname">{node.hostnameFull}</DetailRow>
        <DetailRow label="Enrolment Level">{node.enrolmentLevel}</DetailRow>
        <DetailRow label="Health Status">{node.healthStatus}</DetailRow>
        <DetailRow label="Node ID">
          <span className="inline-flex items-center gap-2">
            {node.nodeId}
            <button
              type="button"
              aria-label="Copy node ID"
              onClick={() => navigator.clipboard?.writeText(node.nodeId)}
              className="text-chef-text-muted hover:text-chef-blue"
            >
              <Copy className="h-4 w-4" />
            </button>
          </span>
        </DetailRow>
        <DetailRow label="Node FQDN">{node.ip}</DetailRow>
        <DetailRow label="Skill Installed">
          <ul>
            {node.skills.map((skill, i) => (
              <li key={skill}>
                {skill}
                {i < node.skills.length - 1 ? "," : ""}
              </li>
            ))}
          </ul>
        </DetailRow>
        <DetailRow label="Node Cohort">
          <div className="flex items-center gap-3">
            <select
              defaultValue={node.cohort}
              aria-label="Node cohort"
              className="h-9 w-[190px] rounded-sm border border-chef-line bg-chef-surface px-2 text-[13px] text-chef-text outline-none"
            >
              {nodeCohorts.map((cohort) => (
                <option key={cohort}>{cohort}</option>
              ))}
            </select>
            <ChefButton variant="outline" className="h-9">
              Detail
            </ChefButton>
            <ChefButton variant="soft" className="h-9">
              Change
            </ChefButton>
          </div>
        </DetailRow>
        <DetailRow label="Tags">
          <div className="rounded-sm border border-chef-line bg-chef-surface p-3">
            <div className="flex gap-3">
              <input
                placeholder="Key"
                aria-label="Tag key"
                className="h-9 flex-1 rounded-sm border border-chef-line px-2 text-[13px] outline-none focus:border-chef-blue"
              />
              <input
                placeholder="Value"
                aria-label="Tag value"
                className="h-9 flex-1 rounded-sm border border-chef-line px-2 text-[13px] outline-none focus:border-chef-blue"
              />
            </div>
            <ChefButton variant="soft" className="mt-3 h-8">
              Add Tag
            </ChefButton>
          </div>
        </DetailRow>
      </section>

      <section className="rounded-sm border border-chef-line bg-chef-canvas/60 p-5">
        <h2 className="mb-3 text-[15px] font-semibold text-chef-text">Attributes</h2>
        {node.attributes.map((group) => (
          <div key={group.group} className="mb-5">
            <h3 className="mb-2 text-[13px] font-semibold text-chef-text">{group.group}</h3>
            <dl>
              {group.rows.map((row) => (
                <div key={row.label} className="grid grid-cols-[170px_1fr] gap-3 py-1 text-[12px]">
                  <dt className="font-medium text-chef-text">{row.label}</dt>
                  <dd className="break-all text-chef-text-muted">{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </section>
    </div>
  );
}
