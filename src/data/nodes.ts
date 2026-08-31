export interface ChefNode {
  id: string;
  ip: string;
  hostname: string;
  hostnameFull: string;
  nodeId: string;
  os: string;
  skills: string[];
  enrolmentLevel: string;
  healthStatus: string;
  cohort: string;
  attributes: {
    group: string;
    rows: { label: string; value: string }[];
  }[];
}

export const nodes: ChefNode[] = [
  {
    id: "3.145.97.7",
    ip: "3.145.97.7",
    hostname: "ip-172-31-13-11...",
    hostnameFull: "ip-172-31-13-118.us-east-2.compute.internal",
    nodeId: "540ef5ea-4a00-4874-b784-c163f2b0ec2a",
    os: "Amazon Linux 2023",
    skills: [
      "chef-client-interpreter 1.0.6",
      "chef-gohai 1.2.4",
      "inspec-interpreter 1.0.7",
      "node-management-agent 1.0.6",
      "restart-interpreter 1.0.4",
      "shell-interpreter 1.0.5",
    ],
    enrolmentLevel: "enrolled",
    healthStatus: "reachable",
    cohort: "sample-node-cohort",
    attributes: [
      {
        group: "Agent",
        rows: [
          { label: "architecture", value: "x86_64" },
          { label: "hostname", value: "ip-172-31-13-118.us-east-2.compute.internal" },
          { label: "kernel_name", value: "Linux" },
          { label: "kernel_version", value: "6.1.134-152.225.amzn2023.x86_64" },
          { label: "netmask", value: "255.255.0.0" },
          { label: "os_name", value: "Amazon Linux" },
          { label: "os_version", value: "2023" },
          { label: "primary_ip", value: "172.31.13.118" },
          { label: "time_zone", value: "UTC+0000" },
        ],
      },
      {
        group: "AWS",
        rows: [
          { label: "account-id", value: "834902008322" },
          { label: "ami-id", value: "ami-06c8f2ec674c67112" },
          { label: "architecture", value: "x86_64" },
          { label: "availability-zone", value: "us-east-2a" },
          { label: "hostname", value: "ip-172-31-13-118.us-east-2.compute.internal" },
          { label: "instance-id", value: "i-04ea5db5092ca8759" },
          { label: "instance-type", value: "t2.micro" },
          { label: "local-hostname", value: "ip-172-31-13-118.us-east-2.compute.internal" },
          { label: "local-ipv4", value: "172.31.13.118" },
          { label: "region", value: "us-east-2" },
        ],
      },
    ],
  },
  {
    id: "18.219.4.158",
    ip: "18.219.4.158",
    hostname: "ip-172-31-11-59....",
    hostnameFull: "ip-172-31-11-59.us-east-2.compute.internal",
    nodeId: "da84bf32-56b6-4ff3-86f8-ec38fb3eeec4",
    os: "Amazon Linux 2023",
    skills: [
      "chef-client-interpreter 1.0.6",
      "courier-runner 1",
      "chef-gohai 1.2.4",
      "inspec-interpreter 1.0.7",
      "node-management-agent 1.0.6",
      "shell-interpreter 1.0.5",
    ],
    enrolmentLevel: "enrolled",
    healthStatus: "reachable",
    cohort: "sample-node-cohort",
    attributes: [
      {
        group: "Agent",
        rows: [
          { label: "architecture", value: "x86_64" },
          { label: "hostname", value: "ip-172-31-11-59.us-east-2.compute.internal" },
          { label: "kernel_name", value: "Linux" },
          { label: "kernel_version", value: "6.1.134-152.225.amzn2023.x86_64" },
          { label: "netmask", value: "255.255.0.0" },
          { label: "os_name", value: "Amazon Linux" },
          { label: "os_version", value: "2023" },
          { label: "primary_ip", value: "172.31.11.59" },
          { label: "time_zone", value: "UTC+0000" },
        ],
      },
      {
        group: "AWS",
        rows: [
          { label: "account-id", value: "834902008322" },
          { label: "ami-id", value: "ami-06c8f2ec674c67112" },
          { label: "architecture", value: "x86_64" },
          { label: "availability-zone", value: "us-east-2b" },
          { label: "hostname", value: "ip-172-31-11-59.us-east-2.compute.internal" },
          { label: "instance-id", value: "i-0b12c8f8e4a2d6631" },
          { label: "instance-type", value: "t2.micro" },
          { label: "local-hostname", value: "ip-172-31-11-59.us-east-2.compute.internal" },
          { label: "local-ipv4", value: "172.31.11.59" },
          { label: "region", value: "us-east-2" },
        ],
      },
    ],
  },
];

export const nodeCohorts = ["sample-node-cohort", "default-cohort", "linux-cohort"];

export const nodeFilterOptions = ["Select", "All Node Lists", "All Node Filters"];
