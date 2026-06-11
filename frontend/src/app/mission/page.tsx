"use client";

import Image from "next/image";
import Link from "next/link";
import { User } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  CheckCircle2,
  Circle,
  ArrowRight,
  Brain,
  Wrench,
  Sparkles,
  AlertTriangle,
  ChevronRight,
} from "lucide-react";
import { repairs } from "@/data/repairs";
import { Misconception } from "@/types/misconception";

export default function MissionPage() {
  const [misconceptions, setMisconceptions] = useState<Misconception[]>([]);
  const [completed, setCompleted] = useState<Record<string, Record<number, boolean>>>({});
  const router = useRouter();
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        router.replace("/login");
      }
    });
  }, [router]);
  useEffect(() => {
    const stored = localStorage.getItem("misconceptions");
    if (!stored) return;
    try {
      setMisconceptions(JSON.parse(stored));
    } catch {
      console.error("Failed to parse misconceptions");
    }
  }, []);

  // Each misconception has 3 steps
  const STEPS_PER = 3;
  const totalSteps = misconceptions.length * STEPS_PER;
  const completedSteps = misconceptions.reduce((acc, m) => {
    const steps = completed[m.code] ?? {};
    return acc + Object.values(steps).filter(Boolean).length;
  }, 0);
  const progress = totalSteps === 0 ? 0 : Math.round((completedSteps / totalSteps) * 100);
  const allDone = totalSteps > 0 && completedSteps === totalSteps;

  const toggleStep = (code: string, stepIdx: number) => {
    setCompleted((prev) => ({
      ...prev,
      [code]: {
        ...(prev[code] ?? {}),
        [stepIdx]: !(prev[code]?.[stepIdx] ?? false),
      },
    }));
  };

  const missionCompletedFor = (code: string) => {
    const steps = completed[code] ?? {};
    return Object.values(steps).filter(Boolean).length === STEPS_PER;
  };

  const letters = ["A", "B", "C", "D", "E"];

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#020817] text-white antialiased">
      {/* Ambient gradients — matches diagnostic page */}
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
            <div className="flex items-center gap-4">
              <div className="hidden items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-3 py-1.5 text-xs text-emerald-300 md:flex">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                Repair Mission Active
              </div>
              <Link
                href="/profile"
                className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 px-4 py-2 text-sm text-emerald-300 hover:bg-emerald-500/10"
              >
                <User className="h-4 w-4" />
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-2 rounded-full border border-red-500/20 px-4 py-2 text-sm text-red-300 hover:bg-red-500/10"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          </div>
        </header>

        <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-12 md:py-16">
          {/* HERO */}
          <section className="mb-12 text-center">
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-4 py-1.5 text-xs font-medium tracking-wide text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Personalized Recovery Path
            </div>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight md:text-6xl">
              Repair your{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: "linear-gradient(to right, #6ee7b7, #99f6e4)",
                }}
              >
                understanding.
              </span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base text-white/60 md:text-lg">
              SciSleuth identified {misconceptions.length} misconception
              {misconceptions.length !== 1 ? "s" : ""} in your reasoning. Work
              through each mission to rebuild your conceptual foundation.
            </p>
          </section>

          {/* PROGRESS PANEL */}
          <section className="mb-8 rounded-2xl border border-white/10 bg-white/3 p-6 backdrop-blur-xl">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <div className="text-xs uppercase tracking-widest text-white/40">
                  Mission Progress
                </div>
                <div className="mt-1 text-lg font-medium">
                  <span className="text-emerald-300">{completedSteps}</span>
                  <span className="text-white/40"> of {totalSteps} steps complete</span>
                </div>
              </div>
              <div className="flex items-center gap-6 text-sm">
                <div className="text-white/60">
                  <span className="font-semibold text-white">{progress}%</span> repaired
                </div>
                <div className="hidden h-4 w-px bg-white/10 md:block" />
                <div className="text-white/50">
                  {misconceptions.length - misconceptions.filter((m) => missionCompletedFor(m.code)).length} missions remaining
                </div>
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-5 h-2 w-full overflow-hidden rounded-full bg-white/6">
              <div
                className="h-full rounded-full transition-all duration-700 ease-out"
                style={{
                  width: `${progress}%`,
                  backgroundImage: "linear-gradient(to right, #34d399, #6ee7b7, #99f6e4)",
                  boxShadow: progress > 0 ? "0 0 20px rgba(16,185,129,0.5)" : "none",
                }}
              />
            </div>

            {/* Step indicators per mission */}
            <div className="mt-4 flex gap-1.5">
              {misconceptions.map((m) =>
                Array.from({ length: STEPS_PER }).map((_, i) => (
                  <div
                    key={`${m.code}-${i}`}
                    className={`h-1 flex-1 rounded-full transition-all ${completed[m.code]?.[i] ? "bg-emerald-400/70" : "bg-white/10"
                      }`}
                  />
                ))
              )}
            </div>
          </section>

          {/* MISSION CARDS */}
          <section className="mb-10 space-y-6">
            {misconceptions.length === 0 && (
              <div className="rounded-3xl border border-emerald-400/20 bg-emerald-400/5 p-12 text-center">
                <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-300" />
                <h3 className="mt-4 text-xl font-semibold">No missions to complete</h3>
                <p className="mt-2 text-white/60">No misconceptions were detected in your diagnostic.</p>
                <Link
                  href="/"
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-400 px-6 py-3 text-sm font-medium text-[#020817] transition hover:opacity-90"
                >
                  Back to Home <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            )}

            {misconceptions.map((m, mIdx) => {
              const repair = repairs[m.code];
              const done = missionCompletedFor(m.code);
              const stepsCompleted = Object.values(completed[m.code] ?? {}).filter(Boolean).length;

              const steps = [
                {
                  icon: Brain,
                  label: "Read and understand the repair explanation",
                  detail: repair?.explanation ?? "Review the core concept to correct the misconception.",
                },
                {
                  icon: Wrench,
                  label: repair?.title ?? "Apply the repair pathway",
                  detail: "Work through the repair strategy step by step.",
                },
                {
                  icon: Sparkles,
                  label: "Apply the concept to a real-world example",
                  detail: "Find one example from daily life that confirms the correct concept.",
                },
              ];

              return (
                <div
                  key={m.code}
                  className={`relative overflow-hidden rounded-3xl border backdrop-blur-xl transition-all ${done
                      ? "border-emerald-400/30 bg-emerald-400/4"
                      : "border-white/10 bg-white/3"
                    }`}
                >
                  {/* Glow for active card */}
                  {!done && (
                    <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />
                  )}

                  {/* Card header */}
                  <div className="relative flex items-start justify-between gap-4 p-6 md:p-8">
                    <div className="flex items-start gap-4">
                      <div
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border text-sm font-semibold transition-all ${done
                            ? "border-emerald-400/40 bg-emerald-400/20 text-emerald-200"
                            : "border-white/10 bg-white/4 text-white/60"
                          }`}
                      >
                        {done ? (
                          <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                        ) : (
                          String(mIdx + 1).padStart(2, "0")
                        )}
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h2 className="text-xl font-semibold tracking-tight">{m.name}</h2>
                          <span
                            className={`rounded-full px-2 py-0.5 text-[11px] font-medium ring-1 ${done
                                ? "bg-emerald-500/10 text-emerald-300 ring-emerald-400/30"
                                : "bg-amber-500/10 text-amber-300 ring-amber-400/30"
                              }`}
                          >
                            {done ? "Complete" : `${stepsCompleted}/${STEPS_PER} steps`}
                          </span>
                        </div>
                        <div className="mt-1.5 flex items-center gap-2 text-xs text-white/40">
                          <AlertTriangle className="h-3.5 w-3.5 text-amber-400/80" />
                          Broken concept:{" "}
                          <span className="text-white/70">{m.brokenConcept}</span>
                        </div>
                      </div>
                    </div>

                    {/* Mini progress dots */}
                    <div className="hidden shrink-0 items-center gap-1.5 md:flex">
                      {Array.from({ length: STEPS_PER }).map((_, i) => (
                        <div
                          key={i}
                          className={`h-2 w-2 rounded-full transition-all ${completed[m.code]?.[i]
                              ? "bg-emerald-400"
                              : "bg-white/15"
                            }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Steps */}
                  <div className="relative border-t border-white/10 px-6 pb-6 pt-5 md:px-8 md:pb-8">
                    <div className="space-y-3">
                      {steps.map((step, sIdx) => {
                        const isChecked = completed[m.code]?.[sIdx] ?? false;
                        const Icon = step.icon;
                        return (
                          <button
                            key={sIdx}
                            onClick={() => toggleStep(m.code, sIdx)}
                            className={`group relative flex w-full items-start gap-4 overflow-hidden rounded-2xl border p-5 text-left transition-all duration-300 ${isChecked
                                ? "border-emerald-400/30 bg-emerald-400/6 shadow-[0_0_20px_rgba(16,185,129,0.12)]"
                                : "border-white/10 bg-white/2 hover:border-white/20 hover:bg-white/4"
                              }`}
                          >
                            {/* Step number / check */}
                            <div
                              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border text-sm font-semibold transition-all ${isChecked
                                  ? "border-emerald-400/50 bg-emerald-400/20 text-emerald-200"
                                  : "border-white/10 bg-white/4 text-white/50 group-hover:border-white/20 group-hover:text-white/70"
                                }`}
                            >
                              {isChecked ? (
                                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                              ) : (
                                <Icon className="h-4 w-4" />
                              )}
                            </div>

                            <div className="flex-1 min-w-0">
                              <div
                                className={`text-sm font-medium leading-snug ${isChecked ? "text-emerald-200 line-through decoration-emerald-400/40" : "text-white/90"
                                  }`}
                              >
                                {step.label}
                              </div>
                              <div className="mt-1 text-xs leading-relaxed text-white/40">
                                {step.detail}
                              </div>
                            </div>

                            {/* Checkmark indicator */}
                            <div
                              className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-all ${isChecked
                                  ? "border-emerald-300 bg-emerald-400/80 text-[#020817]"
                                  : "border-white/15 bg-transparent text-transparent"
                                }`}
                            >
                              <svg
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                              >
                                <path d="M20 6L9 17l-5-5" />
                              </svg>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </section>

          {/* CTA */}
          <section className="flex flex-col-reverse items-stretch justify-between gap-4 md:flex-row md:items-center">
            <Link
              href="/results"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/3 px-7 py-4 text-sm font-medium text-white/70 transition hover:bg-white/6 hover:text-white"
            >
              ← Back to Results
            </Link>
            <Link
              href="/recover"
              className={`group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-2xl px-7 py-4 text-sm font-semibold transition-all ${allDone
                  ? "bg-linear-to-r from-emerald-400 to-teal-300 text-[#02201a] shadow-[0_0_40px_rgba(16,185,129,0.35)] hover:shadow-[0_0_60px_rgba(16,185,129,0.55)]"
                  : "cursor-not-allowed bg-white/6 text-white/30"
                }`}
              onClick={(e) => { if (!allDone) e.preventDefault(); }}
              aria-disabled={!allDone}
            >
              <span>{allDone ? "Continue to Recovery" : `Complete all missions to continue`}</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </section>
        </main>

        {/* FOOTER */}
        <footer className="border-t border-white/10 mt-20">
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