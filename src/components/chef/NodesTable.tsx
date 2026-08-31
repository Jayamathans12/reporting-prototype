import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { ChevronDown, MoreVertical, RefreshCw } from "lucide-react";
import { ChefButton } from "./Buttons";
import { Pager } from "./Pager";
import { OverflowBadge, SkillPill } from "./SkillPill";
import { nodeFilterOptions, nodes } from "@/data/nodes";

export function FilterSelect({
  options,
  wide,
}: {
  options?: string[];
  wide?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("Select");

  return (
    <div className={wide ? "relative flex-1" : "relative w-[265px]"}>
      <button
        type="button"
        onClick={() => options && setOpen((v) => !v)}
        className="flex h-10 w-full items-center justify-between rounded-sm border border-chef-line bg-chef-surface px-3 text-[14px] text-chef-text-muted focus:border-chef-blue"
      >
        <span className={value === "Select" ? "" : "text-chef-text"}>{value}</span>
        <ChevronDown className="h-4 w-4" />
      </button>
      {open && options && (
        <ul className="absolute z-30 mt-0.5 w-full border border-chef-line bg-chef-surface shadow-lg">
          {options.map((option) => (
            <li key={option}>
              <button
                type="button"
                onClick={() => {
                  setValue(option);
                  setOpen(false);
                }}
                className={`block w-full px-3 py-2 text-left text-[14px] hover:bg-chef-pill/60 ${
                  option === value ? "bg-chef-pill text-chef-pill-foreground" : "text-chef-text"
                }`}
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function NodesTable({
  heading = "All Nodes",
  detailTo = "/nodes/detail/$nodeId",
}: {
  heading?: string;
  detailTo?: "/nodes/detail/$nodeId" | "/reporting/node-management/$nodeId";
}) {
  const navigate = useNavigate();
  return (
    <>
      <div className="mt-5 flex gap-5">
        <FilterSelect options={nodeFilterOptions} />
        <FilterSelect wide />
      </div>

      <section className="mt-5 rounded-sm border border-chef-line bg-chef-surface">
        <div className="flex items-center justify-between px-4 py-3">
          <h2 className="text-[14px] font-semibold text-chef-text">
            {heading} - 1 - {nodes.length} of {nodes.length}
          </h2>
          <div className="flex items-center gap-2">
            <ChefButton variant="soft">Archive Nodes</ChefButton>
            <ChefButton variant="soft">Save Node List</ChefButton>
            <ChefButton variant="soft">Create Courier Job</ChefButton>
            <ChefButton>Export</ChefButton>
            <button
              type="button"
              aria-label="Refresh nodes"
              className="flex h-9 w-9 items-center justify-center rounded-sm bg-chef-blue text-chef-blue-foreground hover:bg-chef-blue-hover"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
          </div>
        </div>

        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-chef-tablehead">
              <th className="w-12 px-4 py-2.5">
                <input type="checkbox" aria-label="Select all nodes" className="h-4 w-4" />
              </th>
              {["IP Address/FQDN", "Hostname", "Node ID", "Operating System", "Skills Installed"].map(
                (col) => (
                  <th key={col} className="px-4 py-2.5 text-[13px] font-semibold text-chef-text">
                    {col}
                  </th>
                ),
              )}
              <th className="w-20 px-4 py-2.5 text-right text-[13px] font-semibold text-chef-text">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {nodes.map((node) => (
              <tr
                key={node.id}
                onClick={() => navigate({ to: detailTo, params: { nodeId: node.id } })}
                className="cursor-pointer border-t border-chef-line hover:bg-chef-surface-2"
              >
                <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                  <input
                    type="checkbox"
                    aria-label={`Select ${node.ip}`}
                    className="h-4 w-4"
                  />
                </td>
                <td className="px-4 py-3 text-[13px]">
                  <Link
                    to={detailTo}
                    params={{ nodeId: node.id }}
                    className="text-chef-text hover:text-chef-blue hover:underline"
                  >
                    {node.ip}
                  </Link>
                </td>
                <td className="px-4 py-3 text-[13px] text-chef-text">{node.hostname}</td>
                <td className="px-4 py-3 text-[13px] text-chef-text">{node.nodeId}</td>
                <td className="px-4 py-3 text-[13px] text-chef-text">{node.os}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {node.skills.slice(0, 2).map((skill) => (
                      <SkillPill key={skill} label={skill} />
                    ))}
                    {node.skills.length > 2 && (
                      <OverflowBadge count={node.skills.length - 2} />
                    )}
                  </div>
                </td>
                <td className="px-4 py-3 text-right" onClick={(e) => e.stopPropagation()}>
                  <button
                    type="button"
                    aria-label={`Actions for ${node.ip}`}
                    className="text-chef-text-muted hover:text-chef-text"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Pager total={nodes.length} />
      </section>
    </>
  );
}
