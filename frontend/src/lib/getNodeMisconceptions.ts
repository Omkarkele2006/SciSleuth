import { Misconception } from "@/types/misconception";

export function getNodeMisconceptions(
  nodeId: string,
  misconceptions: Misconception[]
) {
  return misconceptions.filter(
    (misconception) =>
      misconception.graphNodeId === nodeId
  );
}