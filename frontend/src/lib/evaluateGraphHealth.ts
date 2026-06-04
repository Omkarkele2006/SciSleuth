import { Misconception } from "@/types/misconception";

export function evaluateGraphHealth(
  misconceptions: Misconception[]
) {
  const brokenNodes = new Set<string>();

  misconceptions.forEach(
    (misconception) => {
      brokenNodes.add(
        misconception.graphNodeId
      );
    }
  );

  return Array.from(brokenNodes);
}