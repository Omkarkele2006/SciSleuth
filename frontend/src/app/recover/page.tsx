"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  CheckCircle2,
  ArrowRight,
  Brain,
  Activity,
  Sparkles,
  Network,
  TrendingUp,
  AlertTriangle,
  Microscope,
  Wrench,
} from "lucide-react";
import { Misconception } from "@/types/misconception";

const TOTAL_CONCEPTS = 5;

export default function RecoverPage() {
  const [misconceptions, setMisconceptions] = useState<Misconception[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("misconceptions");
    if (!stored) return;
    try {
      setMisconceptions(JSON.parse(stored));
    } catch {
      console.error("Failed to parse misconceptions");
    }
  }, []);

  const brokenBefore = misconceptions.length;
  const healthBefore = Math.round(((TOTAL_CONCEPTS - brokenBefore) / TOTAL_CONCEPTS) * 100);
  const healthAfter = Math.min(100, healthBefore + Math.round((brokenBefore / TOTAL_CONCEPTS) * 70));
  const repaired = brokenBefore;
  const remaining = TOTAL_CONCEPTS - Math.round((healthAfter / 100) * TOTAL_CONCEPTS);

  const stages = [
    { label: "Diagnose", icon: Microscope },
    { label: "Explain",  icon: Brain     },
    { label: "Repair",   icon: Wrench    },
    { label: "Recover",  icon: Sparkles  },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#020817] text-white antialiased">
      {/* Ambient gradients */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-130 w-130 -translate-x-1/2 rounded-full bg-emerald-500/20 blur-[140px]" />
        <div className="absolute top-1/3 -right-32 h-105 w-105 rounded-full bg-teal-500/15 blur-[140px]" />
        <div className="absolute bottom-0 -left-32 h-105 w-105 rounded-full bg-emerald-700/10 blur-[140px]" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col">
        {/* HEADER */}
        <header className="border-b border-white/10 backdrop-blur-xl">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo.jpg" alt="SciSleuth" width={32} height={32} className="rounded-md" />
              <span className="font-bold">SciSleuth</span>
            </Link>
            <div className="hidden items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-3 py-1.5 text-xs text-emerald-300 md:flex">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Recovery Complete
            </div>
          </div>
        </header>

        <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-12 md:py-16">

          {/* SECTION 1 — HERO */}
          <section className="mb-16 text-center">
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-4 py-1.5 text-xs font-medium tracking-wide text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Concept Recovery Analysis
            </div>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight md:text-6xl">
              Recovery{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(to right, #6ee7b7, #99f6e4)" }}
              >
                Complete
              </span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base text-white/60 md:text-lg">
              You repaired key misconceptions and strengthened your conceptual
              understanding. Your knowledge graph has been restored.
            </p>
          </section>

          {/* SECTION 2 — SCORECARDS */}
          <section className="mb-12 grid gap-5 sm:grid-cols-3">
            {[
              {
                icon: Activity,
                label: "Graph Health",
                value: `${healthAfter}%`,
                sub: healthAfter >= 80 ? "Strongly recovered" : "Partially recovered",
              },
              {
                icon: CheckCircle2,
                label: "Concepts Repaired",
                value: repaired.toString(),
                sub: `Out of ${TOTAL_CONCEPTS} total concepts`,
              },
              {
                icon: Sparkles,
                label: "Recovery Status",
                value: repaired > 0 ? "Ready" : "Healthy",
                sub: "Ready for validation",
              },
            ].map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.label}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/3 p-6 backdrop-blur-xl transition hover:border-emerald-400/30 hover:bg-white/6"
                >
                  <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-emerald-400/10 blur-3xl transition group-hover:bg-emerald-400/20" />
                  <div className="relative">
                    <div className="flex items-center justify-between">
                      <div className="grid h-9 w-9 place-items-center rounded-lg bg-emerald-400/10 ring-1 ring-emerald-400/30">
                        <Icon className="h-4 w-4 text-emerald-300" />
                      </div>
                      <span className="text-[10px] uppercase tracking-[0.18em] text-white/40">Metric</span>
                    </div>
                    <div className="mt-6 text-4xl font-semibold tracking-tight text-white">
                      {card.value}
                    </div>
                    <div className="mt-2 text-sm font-medium text-white/80">{card.label}</div>
                    <div className="mt-1 text-xs text-white/40">{card.sub}</div>
                  </div>
                </div>
              );
            })}
          </section>

          {/* SECTION 3 — AI RECOVERY REPORT */}
          <section className="mb-12">
            <div
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/3 p-8 backdrop-blur-xl sm:p-12"
              style={{
                backgroundImage:
                  "radial-gradient(ellipse at top left, rgba(16,185,129,0.10), transparent 60%)",
              }}
            >
              <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
              <div className="absolute -right-10 bottom-0 h-64 w-64 rounded-full bg-teal-400/10 blur-3xl" />

              <div className="relative grid gap-10 lg:grid-cols-[1.2fr_1fr]">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/4 px-3 py-1 text-xs text-white/60 backdrop-blur">
                    <Brain className="h-3.5 w-3.5 text-emerald-300" />
                    Powered by Gemini
                  </div>
                  <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
                    AI Recovery Assessment
                  </h2>
                  <p className="mt-4 max-w-xl text-base leading-relaxed text-white/60">
                    SciSleuth analyzed your misconception repair journey and
                    measured conceptual improvement across your knowledge graph.
                    Your foundational understanding of Newton&apos;s Laws has
                    been significantly strengthened.
                  </p>

                  {/* Health improvement bar */}
                  <div className="mt-8 space-y-4">
                    {[
                      { label: "Graph Health Before", value: healthBefore, tone: "rose" },
                      { label: "Graph Health After",  value: healthAfter,  tone: "emerald" },
                    ].map((bar) => (
                      <div key={bar.label}>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-white/70">{bar.label}</span>
                          <span className="font-medium text-white/90">{bar.value}%</span>
                        </div>
                        <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                          <div
                            className="h-full rounded-full transition-all duration-700"
                            style={{
                              width: `${bar.value}%`,
                              backgroundImage:
                                bar.tone === "emerald"
                                  ? "linear-gradient(to right, #34d399, #6ee7b7)"
                                  : "linear-gradient(to right, #f87171, #fb923c)",
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Improvement indicator */}
                <div className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-[oklch(0.11_0.018_265/0.6)] p-6 backdrop-blur">
                  <div className="text-[10px] uppercase tracking-[0.18em] text-white/40 mb-6">
                    Health Improvement
                  </div>

                  <div className="flex items-center gap-4">
                    {/* Before */}
                    <div className="text-center">
                      <div className="text-3xl font-semibold text-rose-300">{healthBefore}%</div>
                      <div className="mt-1 text-xs text-white/40">Before</div>
                    </div>

                    {/* Arrow */}
                    <div className="flex flex-col items-center gap-1">
                      <div
                        className="rounded-full p-2"
                        style={{
                          background: "rgba(52,211,153,0.15)",
                          boxShadow: "0 0 20px rgba(52,211,153,0.3)",
                        }}
                      >
                        <TrendingUp className="h-6 w-6 text-emerald-400" />
                      </div>
                      <div className="text-xs font-semibold text-emerald-300">
                        +{healthAfter - healthBefore}%
                      </div>
                    </div>

                    {/* After */}
                    <div className="text-center">
                      <div className="text-3xl font-semibold text-emerald-300">{healthAfter}%</div>
                      <div className="mt-1 text-xs text-white/40">After</div>
                    </div>
                  </div>

                  <div className="mt-6 space-y-3 w-full text-sm">
                    {[
                      { label: "Concepts repaired",       value: `${repaired}` },
                      { label: "Remaining weak concepts", value: `${Math.max(0, remaining)}` },
                      { label: "Diagnostic topic",        value: "Newton's Laws" },
                    ].map((row) => (
                      <div
                        key={row.label}
                        className="flex items-center justify-between border-b border-white/5 pb-2 last:border-0 last:pb-0"
                      >
                        <span className="text-xs text-white/50">{row.label}</span>
                        <span className="text-sm font-medium text-white/90">{row.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 4 — BEFORE VS AFTER */}
          <section className="mb-12 grid gap-5 md:grid-cols-2">
            {/* Before */}
            <div className="overflow-hidden rounded-3xl border border-rose-400/20 bg-rose-400/4 p-7 backdrop-blur-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="grid h-9 w-9 place-items-center rounded-lg bg-rose-400/10 ring-1 ring-rose-400/30">
                  <AlertTriangle className="h-4 w-4 text-rose-300" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.18em] text-white/40">Before Recovery</div>
                  <div className="text-base font-semibold text-white">Initial State</div>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  { label: "Misconceptions detected", value: `${brokenBefore}` },
                  { label: "Graph health",            value: `${healthBefore}%` },
                  { label: "Concept network",         value: "Weak"             },
                  { label: "Understanding",           value: "Incomplete"       },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between rounded-xl border border-rose-400/10 bg-rose-400/6 px-4 py-3"
                  >
                    <span className="text-xs text-white/60">{row.label}</span>
                    <span className="text-sm font-semibold text-rose-200">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* After */}
            <div className="overflow-hidden rounded-3xl border border-emerald-400/20 bg-emerald-400/4 p-7 backdrop-blur-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="grid h-9 w-9 place-items-center rounded-lg bg-emerald-400/10 ring-1 ring-emerald-400/30">
                  <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.18em] text-white/40">After Recovery</div>
                  <div className="text-base font-semibold text-white">Recovered State</div>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  { label: "Concepts repaired",   value: `${repaired}`    },
                  { label: "Graph health",         value: `${healthAfter}%` },
                  { label: "Concept network",      value: "Strengthened"   },
                  { label: "Understanding",        value: "Improved"        },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between rounded-xl border border-emerald-400/10 bg-emerald-400/6 px-4 py-3"
                  >
                    <span className="text-xs text-white/60">{row.label}</span>
                    <span className="text-sm font-semibold text-emerald-200">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 5 — KNOWLEDGE GRAPH IMPACT */}
          <section className="mb-12">
            <div
              className="relative overflow-hidden rounded-3xl border border-emerald-400/20 bg-white/3 p-8 backdrop-blur-xl"
              style={{
                backgroundImage:
                  "radial-gradient(ellipse at top right, rgba(16,185,129,0.12), transparent 60%), radial-gradient(ellipse at bottom left, rgba(20,184,166,0.08), transparent 55%)",
              }}
            >
              <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-emerald-400/10 blur-3xl" />

              <div className="relative grid items-center gap-10 lg:grid-cols-[1.4fr_1fr]">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/4 px-3 py-1 text-xs text-white/60 backdrop-blur">
                    <Network className="h-3.5 w-3.5 text-emerald-300" />
                    Connected concepts
                  </div>
                  <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
                    Knowledge Graph Improvement
                  </h2>
                  <p className="mt-4 max-w-xl text-base leading-relaxed text-white/60">
                    Your recovery missions restored stability across affected
                    concepts. Previously broken nodes are now reconnected to the
                    broader knowledge network.
                  </p>
                  <div className="mt-6 grid grid-cols-3 gap-3">
                    {[
                      { label: "Broken before", value: `${brokenBefore}`, color: "text-rose-300"    },
                      { label: "Broken now",    value: `${Math.max(0, remaining)}`, color: "text-amber-300"  },
                      { label: "Health gain",   value: `+${healthAfter - healthBefore}%`, color: "text-emerald-300" },
                    ].map((stat) => (
                      <div
                        key={stat.label}
                        className="rounded-xl border border-white/10 bg-white/3 p-4 text-center"
                      >
                        <div className={`text-2xl font-semibold ${stat.color}`}>{stat.value}</div>
                        <div className="mt-1 text-[10px] uppercase tracking-wider text-white/40">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mini graph visual */}
                <div className="relative h-52">
                  <GraphPreview repairedCount={repaired} total={TOTAL_CONCEPTS} />
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 6 — CTA */}
          <section className="mb-12">
            <div
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/3 p-10 text-center backdrop-blur-xl md:p-14"
              style={{
                backgroundImage:
                  "radial-gradient(ellipse at top, rgba(16,185,129,0.15), transparent 60%), radial-gradient(ellipse at bottom right, rgba(20,184,166,0.10), transparent 55%)",
              }}
            >
              <div className="pointer-events-none absolute -inset-x-12 -bottom-12 -z-10 h-32 rounded-full bg-emerald-400/15 blur-3xl" />
              <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-4 py-1.5 text-xs font-medium tracking-wide text-emerald-300">
                <Sparkles className="h-3.5 w-3.5" />
                Validation Ready
              </div>
              <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
                Ready to validate your recovery?
              </h2>
              <p className="mx-auto mt-4 max-w-md text-base text-white/60">
                Retake the diagnostic and compare your conceptual growth. See
                how your knowledge graph has transformed.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/diagnostic"
                  className="group inline-flex items-center gap-2 rounded-2xl bg-emerald-400 px-7 py-4 text-sm font-semibold text-[#02201a] shadow-[0_0_40px_rgba(16,185,129,0.35)] transition hover:shadow-[0_0_60px_rgba(16,185,129,0.55)] hover:-translate-y-px"
                >
                  Retake Diagnostic
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/graph"
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/4 px-7 py-4 text-sm font-medium text-white/80 backdrop-blur transition hover:bg-white/8 hover:text-white"
                >
                  View Knowledge Graph
                </Link>
              </div>
            </div>
          </section>

          {/* SECTION 7 — JOURNEY COMPLETE */}
          <section className="mb-4">
            <div className="rounded-3xl border border-white/10 bg-white/3 p-8 backdrop-blur-xl sm:p-10">
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight">
                    Learning Journey Complete
                  </h2>
                  <p className="mt-1.5 text-sm text-white/60">
                    All four stages of the SciSleuth diagnostic loop finished.
                  </p>
                </div>
                <span className="hidden rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300 sm:inline-flex">
                  Journey Completed ✓
                </span>
              </div>

              <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
                {stages.map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <div key={s.label} className="flex flex-1 items-center gap-4">
                      <div className="flex flex-1 flex-col items-center text-center">
                        <div className="grid h-14 w-14 place-items-center rounded-2xl border border-emerald-400/40 bg-emerald-400/10 text-emerald-300 shadow-[0_0_30px_-8px_rgba(16,185,129,0.5)]">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="mt-3 text-sm font-medium text-white/80">{s.label}</div>
                        <div className="mt-0.5 text-[11px] uppercase tracking-[0.18em] text-emerald-400/70">
                          done
                        </div>
                      </div>
                      {i < stages.length - 1 && (
                        <div
                          className="hidden h-px flex-1 sm:block"
                          style={{
                            backgroundImage:
                              "linear-gradient(to right, rgba(52,211,153,0.5), rgba(52,211,153,0.1))",
                          }}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </main>

        {/* FOOTER */}
        <footer className="border-t border-white/10">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-8 text-xs text-white/50 md:flex-row">
            <div className="flex items-center gap-2">
              <Image src="/logo.jpg" alt="SciSleuth" width={32} height={32} className="rounded-md" />
              <span>SciSleuth · Built by Team SkyHi</span>
            </div>
            <p>Diagnose misconceptions, not mistakes.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

/* ---------- Mini graph decoration ---------- */
function GraphPreview({
  repairedCount,
  total,
}: {
  repairedCount: number;
  total: number;
}) {
  const nodes = [
    { cx: 50,  cy: 50,  r: 10 },
    { cx: 140, cy: 30,  r: 7  },
    { cx: 220, cy: 70,  r: 9  },
    { cx: 100, cy: 130, r: 8  },
    { cx: 200, cy: 160, r: 11 },
  ];
  const edges = [
    [0, 1], [0, 3], [1, 2], [2, 4], [3, 4],
  ];
  // repaired nodes are healthy (emerald); remaining broken are rose
  const healthyCount = repairedCount;

  return (
    <svg viewBox="0 0 280 200" className="h-full w-full" preserveAspectRatio="xMidYMid meet">
      <defs>
        <radialGradient id="rg-healthy" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#6ee7b7" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#059669" stopOpacity="0.3" />
        </radialGradient>
        <radialGradient id="rg-broken" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fca5a5" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#dc2626" stopOpacity="0.3" />
        </radialGradient>
      </defs>
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a].cx} y1={nodes[a].cy}
          x2={nodes[b].cx} y2={nodes[b].cy}
          stroke="rgba(52,211,153,0.25)"
          strokeWidth={1}
        />
      ))}
      {nodes.map((n, i) => {
        const isHealthy = i < healthyCount;
        return (
          <g key={i}>
            <circle cx={n.cx} cy={n.cy} r={n.r + 7}
              fill={isHealthy ? "url(#rg-healthy)" : "url(#rg-broken)"}
              opacity={0.5}
            />
            <circle cx={n.cx} cy={n.cy} r={n.r}
              fill={isHealthy ? "#34d399" : "#f87171"}
              stroke={isHealthy ? "#a7f3d0" : "#fca5a5"}
              strokeWidth={1.2}
            />
          </g>
        );
      })}
    </svg>
  );
}