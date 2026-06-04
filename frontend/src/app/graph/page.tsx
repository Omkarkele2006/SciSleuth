"use client";

import { useEffect, useState } from "react";

import { nodes } from "@/data/graph";
import { evaluateGraphHealth } from "@/lib/evaluateGraphHealth";
import { Misconception } from "@/types/misconception";

export default function GraphPage() {
  const [brokenNodes, setBrokenNodes] =
    useState<string[]>([]);

  useEffect(() => {
    const stored =
      localStorage.getItem(
        "misconceptions"
      );

    if (!stored) return;

    const misconceptions: Misconception[] =
      JSON.parse(stored);

    const result =
      evaluateGraphHealth(
        misconceptions
      );

    setBrokenNodes(result);
  }, []);

  return (
    <main className="min-h-screen p-8 space-y-8">
      <h1 className="text-4xl font-bold">
        Graph Debug View
      </h1>

      <div>
        <h2 className="text-2xl font-semibold mb-4">
          All Nodes
        </h2>

        <ul className="space-y-2">
          {nodes.map((node) => (
            <li key={node.id}>
              {node.label}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">
          Broken Nodes
        </h2>

        <ul className="space-y-2">
          {brokenNodes.map((nodeId) => (
            <li key={nodeId}>
              {nodeId}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}