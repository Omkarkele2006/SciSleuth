import {
  GraphNode,
  GraphEdge,
} from "@/types/graph";

export const nodes: GraphNode[] = [
  {
    id: "newton_first_law",
    label: "Newton's First Law",
  },

  {
    id: "net_force",
    label: "Net Force",
  },

  {
    id: "balanced_forces",
    label: "Balanced Forces",
  },

  {
    id: "newton_second_law",
    label: "Newton's Second Law",
  },

  {
    id: "newton_third_law",
    label: "Newton's Third Law",
  },
];

export const edges: GraphEdge[] = [
  {
    source: "newton_first_law",
    target: "net_force",
  },

  {
    source: "net_force",
    target: "balanced_forces",
  },

  {
    source: "net_force",
    target: "newton_second_law",
  },

  {
    source: "net_force",
    target: "newton_third_law",
  },
];  