"use client";

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
  return (
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
          <g key={node.id}>
            <circle
              cx={position.x}
              cy={position.y}
              r={40}
              fill={
                isBroken
                  ? "#ef4444"
                  : "#22c55e"
              }
            />

            <text
              x={position.x}
              y={position.y}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="white"
              fontSize="10"
            >
              {node.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}