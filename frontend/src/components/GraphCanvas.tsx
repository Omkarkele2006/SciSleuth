"use client";

import { useState } from "react";

import { nodes, edges } from "@/data/graph";

type GraphCanvasProps = {
  brokenNodes: string[];
};

const positions: Record<
  string,
  { x: number; y: number }
> = {
  newton_first_law: {
    x: 300,
    y: 80,
  },

  net_force: {
    x: 300,
    y: 220,
  },

  balanced_forces: {
    x: 120,
    y: 380,
  },

  newton_second_law: {
    x: 300,
    y: 380,
  },

  newton_third_law: {
    x: 480,
    y: 380,
  },
};

export default function GraphCanvas({
  brokenNodes,
}: GraphCanvasProps) {
  const [hoveredNode, setHoveredNode] =
    useState<string | null>(null);

  return (
    <div className="relative">
      <svg
        width="600"
        height="500"
        className="border rounded-lg"
      >
        {edges.map((edge) => {
          const source =
            positions[edge.source];

          const target =
            positions[edge.target];

          return (
            <line
              key={`${edge.source}-${edge.target}`}
              x1={source.x}
              y1={source.y}
              x2={target.x}
              y2={target.y}
              stroke="white"
            />
          );
        })}

        {nodes.map((node) => {
          const position =
            positions[node.id];

          const isBroken =
            brokenNodes.includes(
              node.id
            );

          return (
            <g
              key={node.id}
              onMouseEnter={() =>
                setHoveredNode(node.id)
              }
              onMouseLeave={() =>
                setHoveredNode(null)
              }
              style={{
                cursor: "pointer",
              }}
            >
              <circle
                cx={position.x}
                cy={position.y}
                r={45}
                fill={
                  isBroken
                    ? "#ef4444"
                    : "#22c55e"
                }
              />

              <text
                x={position.x}
                y={position.y + 65}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="white"
                fontSize="15"
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>

      {hoveredNode && (
        <div className="absolute top-4 right-4 w-64 border rounded-lg bg-black p-4 shadow-lg">
          <h3 className="font-bold mb-2">
            {
              nodes.find(
                (node) =>
                  node.id === hoveredNode
              )?.label
            }
          </h3>

          <p className="text-sm text-zinc-400">
            Status:
            {" "}
            {brokenNodes.includes(
              hoveredNode
            )
              ? "Broken"
              : "Healthy"}
          </p>
        </div>
      )}
    </div>
  );
}