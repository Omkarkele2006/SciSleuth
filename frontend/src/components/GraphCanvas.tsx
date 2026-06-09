"use client";

import { useState } from "react";
import { nodes, edges } from "@/data/graph";
import { Misconception } from "@/types/misconception";
import { getNodeMisconceptions } from "@/lib/getNodeMisconceptions";

type GraphCanvasProps = {
  brokenNodes: string[];
  misconceptions: Misconception[];
};

const positions: Record<string, { x: number; y: number }> = {
  newton_first_law:  { x: 300, y: 80  },
  net_force:         { x: 300, y: 220 },
  balanced_forces:   { x: 120, y: 380 },
  newton_second_law: { x: 300, y: 380 },
  newton_third_law:  { x: 480, y: 380 },
};

export default function GraphCanvas({ brokenNodes, misconceptions }: GraphCanvasProps) {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const nodeMisconceptions = hoveredNode
    ? getNodeMisconceptions(hoveredNode, misconceptions)
    : [];

  const isBroken = (id: string) => brokenNodes.includes(id);

  return (
    <div className="relative font-sans">
      {/* Canvas */}
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[oklch(0.13_0.018_265)] backdrop-blur-xl">
        <svg
          width="600"
          height="500"
          viewBox="0 0 600 500"
          className="w-full"
        >
          <defs>
            {/* Glow filter for healthy nodes */}
            <filter id="glow-green" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            {/* Glow filter for broken nodes */}
            <filter id="glow-red" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            {/* Radial gradient for healthy nodes */}
            <radialGradient id="grad-healthy" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#6ee7b7" />
              <stop offset="100%" stopColor="#059669" />
            </radialGradient>
            {/* Radial gradient for broken nodes */}
            <radialGradient id="grad-broken" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#fca5a5" />
              <stop offset="100%" stopColor="#dc2626" />
            </radialGradient>
            {/* Hovered healthy */}
            <radialGradient id="grad-healthy-hover" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#a7f3d0" />
              <stop offset="100%" stopColor="#10b981" />
            </radialGradient>
            {/* Hovered broken */}
            <radialGradient id="grad-broken-hover" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#fecaca" />
              <stop offset="100%" stopColor="#ef4444" />
            </radialGradient>
          </defs>

          {/* Grid dots for atmosphere */}
          {Array.from({ length: 8 }).map((_, row) =>
            Array.from({ length: 10 }).map((_, col) => (
              <circle
                key={`dot-${row}-${col}`}
                cx={col * 67 + 10}
                cy={row * 63 + 10}
                r={1}
                fill="rgba(255,255,255,0.06)"
              />
            ))
          )}

          {/* Edges */}
          {edges.map((edge) => {
            const source = positions[edge.source];
            const target = positions[edge.target];
            const bothBroken = isBroken(edge.source) && isBroken(edge.target);
            const eitherBroken = isBroken(edge.source) || isBroken(edge.target);

            return (
              <line
                key={`${edge.source}-${edge.target}`}
                x1={source.x}
                y1={source.y}
                x2={target.x}
                y2={target.y}
                stroke={
                  bothBroken
                    ? "rgba(239,68,68,0.5)"
                    : eitherBroken
                    ? "rgba(251,191,36,0.4)"
                    : "rgba(52,211,153,0.3)"
                }
                strokeWidth={eitherBroken ? 1.5 : 1}
                strokeDasharray={eitherBroken ? "4 3" : undefined}
              />
            );
          })}

          {/* Nodes */}
          {nodes.map((node) => {
            const pos = positions[node.id];
            const broken = isBroken(node.id);
            const hovered = hoveredNode === node.id;

            const r = hovered ? 50 : 45;
            const gradId = broken
              ? hovered ? "grad-broken-hover" : "grad-broken"
              : hovered ? "grad-healthy-hover" : "grad-healthy";
            const filterId = broken ? "url(#glow-red)" : "url(#glow-green)";
            const ringColor = broken ? "rgba(239,68,68,0.6)" : "rgba(52,211,153,0.5)";

            return (
              <g
                key={node.id}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                style={{ cursor: "pointer" }}
              >
                {/* Outer glow ring */}
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={r + 10}
                  fill="none"
                  stroke={ringColor}
                  strokeWidth={1}
                  opacity={hovered ? 0.9 : 0.4}
                />
                {/* Pulse ring (visible on hover) */}
                {hovered && (
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={r + 20}
                    fill="none"
                    stroke={broken ? "rgba(239,68,68,0.2)" : "rgba(52,211,153,0.2)"}
                    strokeWidth={1}
                  />
                )}
                {/* Main circle */}
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={r}
                  fill={`url(#${gradId})`}
                  filter={hovered ? filterId : undefined}
                  style={{ transition: "r 0.15s ease" }}
                />
                {/* Status dot */}
                <circle
                  cx={pos.x + r * 0.65}
                  cy={pos.y - r * 0.65}
                  r={5}
                  fill={broken ? "#fca5a5" : "#a7f3d0"}
                  stroke={broken ? "#dc2626" : "#059669"}
                  strokeWidth={1.5}
                />
                {/* Label */}
                <text
                  x={pos.x}
                  y={pos.y + r + 18}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="rgba(255,255,255,0.85)"
                  fontSize="12"
                  fontWeight="500"
                  style={{ fontFamily: "inherit" }}
                >
                  {node.label}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Legend */}
        <div className="flex items-center gap-5 border-t border-white/10 px-5 py-3">
          <div className="flex items-center gap-2 text-xs text-white/50">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
            Healthy concept
          </div>
          <div className="flex items-center gap-2 text-xs text-white/50">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
            Misconception detected
          </div>
          <div className="flex items-center gap-2 text-xs text-white/50">
            <span className="h-px w-5 border-t border-dashed border-amber-400/60" />
            Affected link
          </div>
        </div>
      </div>

      {/* Tooltip panel */}
      {hoveredNode && (
        <div className="absolute right-0 top-0 w-64 overflow-hidden rounded-2xl border border-white/10 bg-[oklch(0.13_0.018_265/0.95)] backdrop-blur-xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)]">
          {/* Header */}
          <div
            className={`px-4 py-3 text-xs font-medium uppercase tracking-[0.18em] ${
              isBroken(hoveredNode)
                ? "bg-rose-400/10 text-rose-300 border-b border-rose-400/20"
                : "bg-emerald-400/10 text-emerald-300 border-b border-emerald-400/20"
            }`}
          >
            {isBroken(hoveredNode) ? "⚠ Misconception Detected" : "✓ Concept Healthy"}
          </div>

          <div className="p-4">
            <h3 className="font-serif text-base font-semibold tracking-tight text-white">
              {nodes.find((n) => n.id === hoveredNode)?.label}
            </h3>

            <div className="mt-2 flex items-center gap-2">
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  isBroken(hoveredNode) ? "bg-rose-400" : "bg-emerald-400"
                }`}
              />
              <span className="text-xs text-white/50">
                Status:{" "}
                <span
                  className={
                    isBroken(hoveredNode) ? "text-rose-300" : "text-emerald-300"
                  }
                >
                  {isBroken(hoveredNode) ? "Broken" : "Healthy"}
                </span>
              </span>
            </div>

            {nodeMisconceptions.length > 0 && (
              <div className="mt-4">
                <p className="mb-2 text-[10px] uppercase tracking-[0.18em] text-white/40">
                  Triggered By
                </p>
                <ul className="space-y-2">
                  {nodeMisconceptions.map((m) => (
                    <li
                      key={m.code}
                      className="flex items-start gap-2 rounded-lg border border-rose-400/20 bg-rose-400/10 px-3 py-2"
                    >
                      <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-400" />
                      <span className="text-xs leading-relaxed text-rose-100/80">
                        {m.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {nodeMisconceptions.length === 0 && !isBroken(hoveredNode) && (
              <p className="mt-3 text-xs text-white/40">
                No misconceptions linked to this concept.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}