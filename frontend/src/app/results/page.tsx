"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Brain,
  Sparkles,
  Activity,
  AlertTriangle,
  ChevronDown,
  Microscope,
  Lightbulb,
  Wrench,
  Network,
  ArrowRight,
  CheckCircle2,
  Target,
  Workflow,
  ShieldAlert,
  Loader,
} from "lucide-react";
import { Misconception } from "@/types/misconception";
import { misconceptions as misconceptionsData } from "@/data/misconceptions";
import { repairs } from "@/data/repairs";

const TOTAL_CONCEPTS = 5;

function getSeverity(misconceptionCount: number): "High" | "Medium" | "Low" {
  if (misconceptionCount >= 4) return "High";
  if (misconceptionCount >= 2) return "Medium";
  return "Low";
}

function severityStyle(severity: "High" | "Medium" | "Low") {
  if (severity === "High")
    return "bg-rose-500/10 text-rose-300 ring-1 ring-rose-400/30";
  if (severity === "Medium")
    return "bg-amber-500/10 text-amber-300 ring-1 ring-amber-400/30";
  return "bg-emerald-500/10 text-emerald-300 ring-1 ring-emerald-400/30";
}

export default function ResultsPage() {
  const [misconceptions, setMisconceptions] = useState<Misconception[]>([]);
  const [aiExplanations, setAiExplanations] = useState<
    Record<string, { explanation: string; mission?: string[] }>
  >({});
  const [open, setOpen] = useState<string | null>(null);

  const graphHealth = Math.round(
    ((TOTAL_CONCEPTS - misconceptions.length) / TOTAL_CONCEPTS) * 100
  );
  const riskLevel = getSeverity(misconceptions.length);

  useEffect(() => {
    const stored = localStorage.getItem("misconceptions");
    if (!stored) return;

    try {
      const parsed: Misconception[] = JSON.parse(stored);
      setMisconceptions(parsed);
      loadExplanations(parsed);
    } catch {
      console.error("Failed to parse misconceptions");
    }

    async function loadExplanations(miscs: Misconception[]) {
      const explanations: Record<string, { explanation: string }> = {};

      for (const misconception of miscs) {
        try {
          const response = await fetch("/api/explain", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              misconceptionName: misconception.name,
              brokenConcept: misconception.brokenConcept,
              description: misconception.description,
            }),
          });

          const data = await response.json();
          explanations[misconception.code] = {
            explanation: data.explanation ?? "AI service temporarily unavailable. Review the repair path.",
          };
        } catch {
          explanations[misconception.code] = {
            explanation: "AI service temporarily unavailable. Review the repair path.",
          };
        }
      }

      setAiExplanations(explanations);
    }
  }, []);

  const metrics = [
    {
      label: "Misconceptions Detected",
      value: misconceptions.length.toString(),
      sub: `Out of ${TOTAL_CONCEPTS} concepts`,
      icon: Microscope,
    },
    {
      label: "Concept Health",
      value: `${graphHealth}%`,
      sub:
        graphHealth >= 80
          ? "Mostly healthy"
          : graphHealth >= 50
          ? "Moderate damage"
          : "Foundational repair needed",
      icon: Activity,
    },
    {
      label: "Risk Level",
      value: riskLevel,
      sub:
        riskLevel === "High"
          ? "Cascading impact likely"
          : riskLevel === "Medium"
          ? "Targeted repair needed"
          : "Low impact",
      icon: ShieldAlert,
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-[oklch(0.16_0.018_265)] text-[oklch(0.97_0.005_250)] font-sans antialiased">
      {/* Ambient gradients — matches page.tsx */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at top, oklch(0.78 0.17 165 / 0.18), transparent 60%), radial-gradient(ellipse at bottom right, oklch(0.7 0.18 280 / 0.15), transparent 55%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "linear-gradient(to right, oklch(1 0 0 / 0.04) 1px, transparent 1px), linear-gradient(to bottom, oklch(1 0 0 / 0.04) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />

      {/* Nav — matches page.tsx */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[oklch(0.16_0.018_265/0.6)] border-b border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.jpg"
              alt="SciSleuth"
              width={32}
              height={32}
              className="rounded-md"
            />
            <span className="font-bold">SciSleuth</span>
          </Link>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60 backdrop-blur">
            Diagnostic Report
          </span>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-6xl px-6 pb-24">
        {/* SECTION 1 — HERO SUMMARY */}
        <section className="pt-16 pb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Analysis complete
          </div>

          <h1 className="mt-6 text-5xl leading-[1.05] tracking-tight sm:text-6xl md:text-7xl font-serif">
            Diagnostic{" "}
            <span className="italic bg-linear-to-br from-white to-emerald-300 bg-clip-text text-transparent">
              Complete
            </span>
          </h1>
          <p className="mt-5 max-w-2xl text-base text-white/60 sm:text-lg">
            We identified the misconceptions affecting your understanding and
            generated a personalized recovery plan tailored to how you think.
          </p>

          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            {metrics.map((m) => {
              const Icon = m.icon;
              return (
                <div
                  key={m.label}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition hover:border-emerald-400/30 hover:bg-white/10"
                >
                  <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-emerald-400/10 blur-3xl transition group-hover:bg-emerald-400/20" />
                  <div className="relative">
                    <div className="flex items-center justify-between">
                      <div className="grid h-9 w-9 place-items-center rounded-lg bg-emerald-400/10 ring-1 ring-emerald-400/30">
                        <Icon className="h-4 w-4 text-emerald-300" />
                      </div>
                      <span className="text-[10px] uppercase tracking-[0.18em] text-white/40">
                        Metric
                      </span>
                    </div>
                    <div className="mt-6 text-4xl font-serif tracking-tight">
                      {m.value}
                    </div>
                    <div className="mt-2 text-sm font-medium text-white/80">
                      {m.label}
                    </div>
                    <div className="mt-1 text-xs text-white/40">{m.sub}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 2 — AI INSIGHT PANEL */}
        <section className="pb-20">
          <div
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl sm:p-12"
            style={{
              backgroundImage:
                "radial-gradient(ellipse at top left, oklch(0.78 0.17 165 / 0.10), transparent 60%)",
            }}
          >
            <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
            <div className="absolute -right-10 bottom-0 h-64 w-64 rounded-full bg-teal-400/10 blur-3xl" />

            <div className="relative grid gap-10 lg:grid-cols-[1.2fr_1fr]">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60 backdrop-blur">
                  <Brain className="h-3.5 w-3.5 text-emerald-300" />
                  Powered by Gemini
                </div>
                <h2 className="mt-5 text-4xl leading-tight tracking-tight font-serif">
                  AI Cognitive Analysis
                </h2>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-white/60">
                  SciSleuth doesn&apos;t grade your answers — it models the
                  reasoning behind them. We detect the underlying belief
                  structures driving each mistake and trace them to the concepts
                  most at risk.
                </p>

                <div className="mt-8 space-y-5">
                  <HealthBar
                    label="Concept Health Score"
                    value={graphHealth}
                    tone="rose"
                  />
                  <HealthBar
                    label="Recovery Potential"
                    value={Math.min(100, 100 - misconceptions.length * 15)}
                    tone="emerald"
                  />
                  <HealthBar
                    label="Diagnostic Accuracy"
                    value={85}
                    tone="amber"
                  />
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[oklch(0.11_0.018_265/0.6)] p-6 backdrop-blur">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-[0.18em] text-white/40">
                    Learning Status
                  </span>
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ${
                      riskLevel === "High"
                        ? "bg-rose-400/10 text-rose-300 ring-rose-400/30"
                        : riskLevel === "Medium"
                        ? "bg-amber-400/10 text-amber-300 ring-amber-400/30"
                        : "bg-emerald-400/10 text-emerald-300 ring-emerald-400/30"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        riskLevel === "High"
                          ? "bg-rose-400"
                          : riskLevel === "Medium"
                          ? "bg-amber-400"
                          : "bg-emerald-400"
                      }`}
                    />
                    {riskLevel === "High"
                      ? "Repair Phase"
                      : riskLevel === "Medium"
                      ? "Review Phase"
                      : "Assessment Complete"}
                  </span>
                </div>

                <div className="mt-6 space-y-4 text-sm">
                  <InsightRow
                    icon={Target}
                    label="Topic"
                    value="Newton's Laws"
                  />
                  <InsightRow
                    icon={Workflow}
                    label="Assessment"
                    value={`${misconceptions.length} misconception${
                      misconceptions.length !== 1 ? "s" : ""
                    } detected`}
                  />
                  <InsightRow
                    icon={Lightbulb}
                    label="Repair strategy"
                    value="Conceptual re-anchoring"
                  />
                  <InsightRow
                    icon={CheckCircle2}
                    label="Next step"
                    value="View knowledge graph"
                  />
                </div>

                <div
                  className={`mt-6 rounded-xl border p-4 text-sm leading-relaxed ${
                    riskLevel === "High"
                      ? "border-rose-400/20 bg-rose-400/10 text-rose-100/90"
                      : riskLevel === "Medium"
                      ? "border-amber-400/20 bg-amber-400/10 text-amber-100/90"
                      : "border-emerald-400/20 bg-emerald-400/10 text-emerald-100/90"
                  }`}
                >
                  {misconceptions.length === 0
                    ? "No misconceptions detected. Your understanding is solid!"
                    : `You have ${misconceptions.length} misconception${
                        misconceptions.length !== 1 ? "s" : ""
                      } affecting your physics understanding. Targeted repair missions can shift these into formal scientific frameworks.`}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3 — MISCONCEPTION CARDS */}
        <section className="pb-20">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-4xl leading-tight tracking-tight font-serif">
                Identified Misconceptions
              </h2>
              <p className="mt-2 text-white/60">
                Each card explains the broken concept and your personalized
                repair path.
              </p>
            </div>
            <span className="hidden text-sm text-white/40 sm:block">
              {misconceptions.length} finding
              {misconceptions.length !== 1 ? "s" : ""}
            </span>
          </div>

          {misconceptions.length === 0 ? (
            <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-8 text-center">
              <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-300" />
              <h3 className="mt-4 text-xl font-serif">
                No Misconceptions Detected
              </h3>
              <p className="mt-2 text-white/60">
                Your understanding of Newton&apos;s Laws is strong!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {misconceptions.map((m, idx) => {
                const repair = repairs[m.code];
                const explanation = aiExplanations[m.code]?.explanation;
                const isOpen = open === m.code;
                const severity = getSeverity(1);
                return (
                  <div
                    key={m.code}
                    className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl transition hover:border-emerald-400/30"
                  >
                    <button
                      onClick={() => setOpen(isOpen ? null : m.code)}
                      className="flex w-full items-center justify-between gap-6 p-6 text-left"
                    >
                      <div className="flex items-start gap-4">
                        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-emerald-400/10 text-sm font-serif text-emerald-200">
                          {String(idx + 1).padStart(2, "0")}
                        </div>
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-lg font-serif tracking-tight">
                              {m.name}
                            </h3>
                            <span
                              className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${severityStyle(
                                severity
                              )}`}
                            >
                              {severity} severity
                            </span>
                          </div>
                          <p className="mt-1.5 max-w-2xl text-sm text-white/60">
                            {m.description}
                          </p>
                          <div className="mt-3 inline-flex items-center gap-2 text-xs text-white/40">
                            <AlertTriangle className="h-3.5 w-3.5 text-amber-400/80" />
                            Broken concept:{" "}
                            <span className="text-white/70">
                              {m.brokenConcept}
                            </span>
                          </div>
                        </div>
                      </div>
                      <ChevronDown
                        className={`h-5 w-5 shrink-0 text-white/40 transition-transform ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="border-t border-white/10 bg-[oklch(0.11_0.018_265/0.6)] p-6 sm:p-8">
                        <div className="grid gap-6 lg:grid-cols-2">
                          {/* AI Guidance */}
                          <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-emerald-300">
                              <Brain className="h-3.5 w-3.5" />
                              AI Guidance
                            </div>
                            {explanation ? (
                              <p className="mt-3 text-sm leading-relaxed text-white/70">
                                {explanation}
                              </p>
                            ) : (
                              <div className="mt-3 flex items-center gap-2 text-sm text-white/50">
                                <Loader className="h-4 w-4 animate-spin" />
                                Generating explanation...
                              </div>
                            )}
                          </div>

                          {/* Repair Path */}
                          <div className="rounded-xl border border-emerald-400/20 bg-emerald-400/10 p-5">
                            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-emerald-300">
                              <Wrench className="h-3.5 w-3.5" />
                              Repair Path
                            </div>
                            {repair ? (
                              <>
                                <h4 className="mt-3 text-lg font-serif tracking-tight">
                                  {repair.title}
                                </h4>
                                <p className="mt-2 text-sm leading-relaxed text-white/70">
                                  {repair.explanation}
                                </p>
                              </>
                            ) : (
                              <p className="mt-3 text-sm text-white/50">
                                No repair pathway available.
                              </p>
                            )}

                            <button className="mt-6 inline-flex items-center gap-2 rounded-full bg-emerald-400 px-5 py-2.5 text-sm font-medium text-[oklch(0.16_0.02_265)] shadow-[0_0_60px_-10px_oklch(0.78_0.17_165/0.35)] transition hover:opacity-90">
                              Start repair mission
                              <ArrowRight className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* SECTION 4 — RECOVERY JOURNEY */}
        <section className="pb-20">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl sm:p-10">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl leading-tight tracking-tight font-serif">
                  Recovery Journey
                </h2>
                <p className="mt-2 text-sm text-white/60">
                  Where you are in the SciSleuth diagnostic-to-repair loop.
                </p>
              </div>
              <span className="hidden rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60 sm:inline-flex">
                Stage 3 of 4
              </span>
            </div>

            <div className="mt-10 flex flex-col items-stretch gap-6 sm:flex-row sm:items-center">
              {[
                { label: "Diagnose", icon: Microscope, status: "done" },
                { label: "Explain", icon: Brain, status: "done" },
                { label: "Repair", icon: Wrench, status: "active" },
                { label: "Recover", icon: Sparkles, status: "pending" },
              ].map((s, i) => {
                const Icon = s.icon;
                const isDone = s.status === "done";
                const isActive = s.status === "active";
                return (
                  <div
                    key={s.label}
                    className="flex flex-1 items-center gap-6"
                  >
                    <div className="flex flex-1 flex-col items-center text-center">
                      <div
                        className={`grid h-14 w-14 place-items-center rounded-2xl border transition ${
                          isDone
                            ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-300"
                            : isActive
                            ? "border-emerald-400/60 bg-emerald-400 text-[oklch(0.16_0.02_265)]"
                            : "border-white/10 bg-white/5 text-white/30"
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="mt-3 text-sm font-medium text-white/80">
                        {s.label}
                      </div>
                      <div className="mt-0.5 text-[11px] uppercase tracking-[0.18em] text-white/40">
                        {s.status}
                      </div>
                    </div>
                    {i < 3 && (
                      <div className="hidden h-px flex-1 bg-linear-to-r from-emerald-400/40 via-white/10 to-white/5 sm:block" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 5 — KNOWLEDGE GRAPH CTA */}
        <section className="pb-20">
          <div
            className="relative overflow-hidden rounded-3xl border border-emerald-400/20 bg-white/5 p-10 backdrop-blur-xl sm:p-14"
            style={{
              backgroundImage:
                "radial-gradient(ellipse at top right, oklch(0.78 0.17 165 / 0.15), transparent 60%), radial-gradient(ellipse at bottom left, oklch(0.7 0.18 280 / 0.10), transparent 55%)",
            }}
          >
            <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-emerald-400/15 blur-3xl" />
            <div className="absolute -left-10 bottom-0 h-64 w-64 rounded-full bg-teal-400/10 blur-3xl" />

            <div className="relative grid items-center gap-10 lg:grid-cols-[1.4fr_1fr]">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60 backdrop-blur">
                  <Network className="h-3.5 w-3.5 text-emerald-300" />
                  Connected concepts
                </div>
                <h2 className="mt-5 text-4xl leading-tight tracking-tight font-serif">
                  View Your Knowledge Graph
                </h2>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-white/60">
                  Visualize how misconceptions affect connected concepts. See
                  which ideas are at risk, which are stable, and where to focus
                  next.
                </p>
                <Link
                  href="/graph"
                  className="mt-7 inline-flex items-center gap-2 rounded-full bg-emerald-400 px-6 py-3 text-sm font-medium text-[oklch(0.16_0.02_265)] shadow-[0_0_60px_-10px_oklch(0.78_0.17_165/0.35)] transition hover:-translate-y-px hover:opacity-90"
                >
                  Open Knowledge Graph
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="relative h-64">
                <GraphPreview />
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
              <footer className="border-t border-white/10">
                <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-8 text-xs text-white/50 md:flex-row">
                  <div className="flex items-center gap-2">
                    <Image
                      src="/logo.jpg"
                      alt="SciSleuth"
                      width={32}
                      height={32}
                      className="rounded-md"
                    />
                    <span>SciSleuth · Built by Team SkyHi</span>
                  </div>
                  <p>Diagnose misconceptions, not mistakes.</p>
                </div>
              </footer>
      </main>
    </div>
  );
}

/* ---------- helpers ---------- */

function HealthBar({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: "emerald" | "rose" | "amber";
}) {
  const bar =
    tone === "emerald"
      ? "from-emerald-400 to-teal-400"
      : tone === "rose"
      ? "from-rose-400 to-orange-400"
      : "from-amber-300 to-yellow-400";
  return (
    <div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-white/70">{label}</span>
        <span className="font-medium text-white/90">{value}%</span>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
        <div
          className={`h-full rounded-full bg-linear-to-r ${bar}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

function InsightRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between border-b border-white/5 pb-3 last:border-0 last:pb-0">
      <div className="flex items-center gap-2.5 text-white/50">
        <Icon className="h-4 w-4 text-emerald-300/80" />
        <span className="text-xs uppercase tracking-wider">{label}</span>
      </div>
      <span className="text-sm font-medium text-white/90">{value}</span>
    </div>
  );
}

function GraphPreview() {
  const nodes = [
    { cx: 50, cy: 50, r: 10, on: true },
    { cx: 140, cy: 30, r: 7, on: false },
    { cx: 220, cy: 70, r: 9, on: true },
    { cx: 100, cy: 130, r: 8, on: false },
    { cx: 200, cy: 160, r: 11, on: true },
    { cx: 60, cy: 210, r: 7, on: false },
    { cx: 170, cy: 220, r: 8, on: true },
  ];
  const edges = [
    [0, 1],
    [0, 3],
    [1, 2],
    [2, 4],
    [3, 4],
    [3, 5],
    [4, 6],
    [5, 6],
  ];
  return (
    <svg
      viewBox="0 0 280 260"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <radialGradient id="g1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#34d399" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#0d9488" stopOpacity="0.2" />
        </radialGradient>
      </defs>
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a].cx}
          y1={nodes[a].cy}
          x2={nodes[b].cx}
          y2={nodes[b].cy}
          stroke="rgba(255,255,255,0.15)"
          strokeWidth={1}
        />
      ))}
      {nodes.map((n, i) => (
        <g key={i}>
          <circle
            cx={n.cx}
            cy={n.cy}
            r={n.r + 6}
            fill={n.on ? "url(#g1)" : "rgba(255,255,255,0.04)"}
            opacity={n.on ? 0.6 : 0.4}
          />
          <circle
            cx={n.cx}
            cy={n.cy}
            r={n.r}
            fill={n.on ? "#34d399" : "oklch(0.16 0.018 265)"}
            stroke={n.on ? "#a7f3d0" : "rgba(255,255,255,0.2)"}
            strokeWidth={1.2}
          />
        </g>
      ))}
    </svg>
  );
}