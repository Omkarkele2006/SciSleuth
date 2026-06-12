"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { User } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import Image from "next/image";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  Brain,
  GraduationCap,
  LineChart,
  Microscope,
  Network,
  ShieldAlert,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Workflow,
} from "lucide-react";

type Severity = "low" | "medium" | "high" | "critical";

type AnalyticsItem = {
  name: string;
  count: number;
  severity: Severity;
};
// NOTE: existing analytics array — do not modify.

const severityWeight: Record<Severity, number> = {
  low: 1,
  medium: 2,
  high: 3,
  critical: 4,
};

const severityStyles: Record<
  Severity,
  { chip: string; dot: string; bar: string; ring: string; label: string }
> = {
  low: {
    chip: "bg-emerald-400/10 text-emerald-300 ring-emerald-400/30",
    dot: "bg-emerald-400",
    bar: "from-emerald-400/80 to-teal-400/60",
    ring: "ring-emerald-400/20",
    label: "Low",
  },
  medium: {
    chip: "bg-amber-300/10 text-amber-200 ring-amber-300/30",
    dot: "bg-amber-300",
    bar: "from-amber-300/80 to-amber-500/60",
    ring: "ring-amber-300/20",
    label: "Medium",
  },
  high: {
    chip: "bg-orange-400/10 text-orange-300 ring-orange-400/30",
    dot: "bg-orange-400",
    bar: "from-orange-400/80 to-rose-400/60",
    ring: "ring-orange-400/20",
    label: "High",
  },
  critical: {
    chip: "bg-rose-400/10 text-rose-300 ring-rose-400/30",
    dot: "bg-rose-400",
    bar: "from-rose-500/90 to-rose-400/70",
    ring: "ring-rose-400/25",
    label: "Critical",
  },
};

export default function TeacherAnalyticsPage() {
  const router = useRouter();
  const [analytics, setAnalytics] =
    useState<AnalyticsItem[]>([]);
  const [insight, setInsight] =
    useState("");
  const [attempts, setAttempts] =
    useState<any[]>([]);
  const [studentStats, setStudentStats] =
    useState<any[]>([]);
  const [totalStudents, setTotalStudents] =
    useState(0);
  const generateInsight =
    async () => {
      const averageHealth =
        Math.round(
          attempts.reduce(
            (
              sum: number,
              a: any
            ) => sum + a.graph_health,
            0
          ) / attempts.length
        );

      const response =
        await fetch(
          "/api/teacher-insight",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              analytics,
              totalStudents,
              averageHealth,
            }),
          }
        );

      const data =
        await response.json();

      setInsight(data.insight);
    };
  const [loadingAnalytics, setLoadingAnalytics] =
    useState(true);
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        router.replace("/login");
        return;
      }

      if (
        data.user.email !==
        "omavkarkele@gmail.com"
      ) {
        router.replace("/");
      }
    });
  }, [router]);
  useEffect(() => {
    async function loadAnalytics() {
      const { data, error } =
        await supabase
          .from("attempts")
          .select("*");
      console.log("ATTEMPTS:", data);
      console.log("ERROR:", error);
      if (error || !data) {
        console.error(error);
        return;
      }
      setAttempts(data);
      const { data: profiles } =
        await supabase
          .from("profiles")
          .select("*");

      const profileMap = Object.fromEntries(
        (profiles || []).map((p) => [
          p.id,
          p.full_name,
        ])
      );

      const studentMap: Record<
        string,
        {
          userId: string;
          fullName: string;
          attempts: number;
          totalHealth: number;
          bestHealth: number;
          worstHealth: number;
        }
      > = {};

      data.forEach((attempt) => {
        const userId = attempt.user_id;

        if (!studentMap[userId]) {
          studentMap[userId] = {
            userId,
            fullName:
              profileMap[userId] ||
              "Unknown Student",
            attempts: 0,
            totalHealth: 0,
            bestHealth:
              attempt.graph_health,
            worstHealth:
              attempt.graph_health,
          };
        }

        studentMap[userId].attempts++;

        studentMap[userId].totalHealth +=
          attempt.graph_health;

        studentMap[userId].bestHealth =
          Math.max(
            studentMap[userId].bestHealth,
            attempt.graph_health
          );

        studentMap[userId].worstHealth =
          Math.min(
            studentMap[userId].worstHealth,
            attempt.graph_health
          );
      });

      const students = Object.values(
        studentMap
      ).map((student) => ({
        ...student,
        averageHealth: Math.round(
          student.totalHealth /
          student.attempts
        ),
      }));

      setStudentStats(students);
      const users = new Set(
        data.map(
          (attempt) => attempt.user_id
        )
      );

      setTotalStudents(users.size);

      const misconceptionCounts:
        Record<string, number> = {};

      data.forEach((attempt) => {
        attempt.misconceptions?.forEach(
          (m: any) => {
            misconceptionCounts[
              m.name
            ] =
              (misconceptionCounts[
                m.name
              ] || 0) + 1;
          }
        );
      });

      const generatedAnalytics =
        Object.entries(
          misconceptionCounts
        )
          .map(
            ([name, count]) => ({
              name,
              count,
              severity:
                count >= 5
                  ? ("critical" as Severity)
                  : count >= 4
                    ? ("high" as Severity)
                    : count >= 2
                      ? ("medium" as Severity)
                      : ("low" as Severity),
            }))
          .sort(
            (a, b) =>
              b.count - a.count
          );

      setAnalytics(
        generatedAnalytics
      );

      setLoadingAnalytics(
        false
      );
    }

    loadAnalytics();
  }, []);

  const stats = useMemo(() => {
    if (analytics.length === 0) {
      return {
        top: {
          name: "No data",
          count: 0,
          severity: "low" as Severity,
        },
        avgSeverityLabel: "Low",
        atRisk: 0,
        stability: 100,
      };
    }

    const top = analytics.reduce(
      (a, b) => (b.count > a.count ? b : a)
    );

    const avgSeverityNum =
      analytics.reduce(
        (sum, m) => sum + severityWeight[m.severity],
        0
      ) / analytics.length;

    const avgSeverityLabel =
      avgSeverityNum >= 3.25
        ? "Critical"
        : avgSeverityNum >= 2.5
          ? "High"
          : avgSeverityNum >= 1.75
            ? "Medium"
            : "Low";

    const atRisk = analytics
      .filter(
        (m) =>
          m.severity === "high" ||
          m.severity === "critical"
      )
      .reduce((s, m) => s + m.count, 0);

    const stability = Math.max(
      0,
      Math.min(
        100,
        Math.round(
          100 - (avgSeverityNum / 4) * 100
        )
      )
    );

    return {
      top,
      avgSeverityLabel,
      atRisk,
      stability,
    };
  }, [analytics]);

  const distribution = useMemo(() => {
    const buckets: Record<Severity, number> = { low: 0, medium: 0, high: 0, critical: 0 };
    analytics.forEach((m) => (buckets[m.severity] += m.count));
    const total = Object.values(buckets).reduce((a, b) => a + b, 0) || 1;
    return (Object.keys(buckets) as Severity[]).map((sev) => ({
      severity: sev,
      count: buckets[sev],
      pct: Math.round((buckets[sev] / total) * 100),
    }));
  }, [analytics]);
  if (loadingAnalytics) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading Analytics...
      </div>
    );
  }


  return (
    <div className="relative min-h-screen overflow-hidden bg-[#020817] text-slate-100 antialiased">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 h-144 w-5xl -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[140px]" />
        <div className="absolute top-1/3 -right-40 h-112 w-md rounded-full bg-teal-500/10 blur-[120px]" />
        <div className="absolute bottom-0 -left-40 h-112 w-md rounded-full bg-cyan-500/10 blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-linear(to right, #94a3b8 1px, transparent 1px), linear-linear(to bottom, #94a3b8 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage:
              "radial-linear(ellipse at center, black 30%, transparent 75%)",
          }}
        />
      </div>

      {/* Nav */}
      <header className="sticky top-0 z-40 border-b border-white/5 bg-[#020817]/70 backdrop-blur-xl">
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
          <div className="flex items-center gap-4">
            <nav className="hidden gap-8 text-sm text-slate-400 md:flex">
              <Link href="#student-performance" className="hover:text-slate-100">
                Results
              </Link>
              {/* <Link href="/graph" className="hover:text-slate-100">
                Knowledge Graph
              </Link> */}
              {/* <span className="text-emerald-300">
                Analytics
              </span> */}
            </nav>
            <Link
              href="/teacher/profile"
              className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 px-4 py-2 text-sm text-emerald-300 hover:bg-emerald-500/10"
            >
              <User className="h-4 w-4" />
              AIC
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

      <main className="mx-auto max-w-6xl px-6 pb-32 pt-20">
        {/* SECTION 1 — Hero */}
        <section className="relative">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-3 py-1 text-xs text-emerald-200">
                <GraduationCap className="h-3.5 w-3.5" />
                Cohort overview · {totalStudents} students
              </div>
              <h1 className="mt-6 text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
                Classroom <span className="bg-linear-to-r from-emerald-300 via-teal-200 to-emerald-400 bg-clip-text text-transparent italic">Intelligence</span>
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-400">
                Analyze misconception patterns across your students and identify
                where conceptual intervention is needed.
              </p>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3.5 py-1.5 text-xs text-emerald-200 shadow-[0_0_40px_-12px_rgba(16,185,129,0.55)]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Live cohort analytics
            </div>
          </div>
        </section>

        {/* SECTION 2 — Overview metrics */}
        <section className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            icon={<AlertTriangle className="h-4 w-4" />}
            tone="rose"
            label="Most common misconception"
            value={stats.top.name}
            sub={`${stats.top.count} students affected`}
          />
          <MetricCard
            icon={<Activity className="h-4 w-4" />}
            tone="amber"
            label="Average severity"
            value={stats.avgSeverityLabel}
            sub="Across all detected patterns"
          />
          <MetricCard
            icon={<Users className="h-4 w-4" />}
            tone="emerald"
            label="Students at risk"
            value={`${stats.atRisk}`}
            sub={`of ${totalStudents} in this cohort`}
          />
          <MetricCard
            icon={<ShieldAlert className="h-4 w-4" />}
            tone="teal"
            label="Concept stability"
            value={`${stats.stability}%`}
            sub="Composite health score"
          />
        </section>

        {/* SECTION 3 — Heatmap */}
        <section className="mt-20">
          <SectionHeader
            kicker="Misconception heatmap"
            title="Where the cohort is struggling"
            sub="Each card represents a detected misconception, ranked by spread and severity."
          />

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {analytics.map((m) => {
              const pct = Math.round((m.count / totalStudents) * 100);
              const risk = Math.min(
                100,
                Math.round((severityWeight[m.severity] / 4) * 60 + pct * 0.4)
              );
              const s = severityStyles[m.severity];
              return (
                <div
                  key={m.name}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/3 p-6 backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-emerald-400/30 hover:bg-white/5"
                >
                  <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-emerald-400/5 opacity-0 blur-3xl transition group-hover:opacity-100" />

                  <div className="flex items-start justify-between gap-4">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider ring-1 ${s.chip} ${s.ring}`}
                    >
                      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
                      {s.label} severity
                    </span>
                    <div className="flex items-center gap-1 text-[11px] text-slate-400">
                      <TrendingUp className="h-3 w-3 text-emerald-300" />
                      Trending
                    </div>
                  </div>

                  <h3 className="mt-5 text-base font-semibold leading-snug tracking-tight text-slate-100">
                    {m.name}
                  </h3>

                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-slate-500">
                        Affected
                      </p>
                      <p className="mt-1 font-mono text-2xl tracking-tight text-slate-100">
                        {pct}
                        <span className="text-base text-slate-500">%</span>
                      </p>
                      <p className="mt-0.5 text-[11px] text-slate-500">
                        {m.count} of {totalStudents} students
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-slate-500">
                        Risk score
                      </p>
                      <p className="mt-1 font-mono text-2xl tracking-tight text-slate-100">
                        {risk}
                        <span className="text-base text-slate-500">/100</span>
                      </p>
                      <p className="mt-0.5 text-[11px] text-slate-500">
                        Composite priority
                      </p>
                    </div>
                  </div>

                  <div className="mt-5">
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                      <div
                        className={`h-full rounded-full bg-linear-to-r ${s.bar}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 4 — Distribution */}
        <section className="mt-20">
          <SectionHeader
            kicker="Distribution analysis"
            title="Severity distribution across cohort"
            sub="Aggregated student exposure by severity tier."
          />

          <div className="mt-8 rounded-3xl border border-white/10 bg-white/3 p-8 backdrop-blur-xl">
            <div className="space-y-6">
              {distribution.map((d) => {
                const s = severityStyles[d.severity];
                return (
                  <div key={d.severity}>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${s.dot}`} />
                        <span className="text-slate-200">{s.label} severity</span>
                      </div>
                      <div className="flex items-center gap-3 font-mono text-xs text-slate-400">
                        <span>{d.count} students</span>
                        <span className="text-slate-500">·</span>
                        <span className="text-slate-200">{d.pct}%</span>
                      </div>
                    </div>
                    <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/5">
                      <div
                        className={`h-full rounded-full bg-linear-to-r ${s.bar} transition-[width] duration-700 ease-out`}
                        style={{ width: `${d.pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
        <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-8">

          <h2 className="mb-6 text-3xl font-bold" id="student-performance">
            Student Performance Overview
          </h2>

          <div className="space-y-4">

            {studentStats.map(
              (student) => (
                <div
                  key={student.userId}
                  className="flex items-center justify-between rounded-2xl border border-white/10 p-5"
                >
                  <div>
                    <h3 className="font-semibold text-lg">
                      {student.fullName}
                    </h3>

                    <p className="text-slate-400">
                      Attempts: {student.attempts}
                    </p>
                  </div>

                  <div className="text-right">
                    <p>
                      Avg Health:
                      <span className="ml-2 text-emerald-400">
                        {student.averageHealth}%
                      </span>
                    </p>

                    <p className="text-slate-400">
                      Worst:
                      {" "}
                      {student.worstHealth}%
                    </p>
                  </div>

                  <button
                    onClick={() =>
                      router.push(
                        `/teacher/student/${student.userId}`
                      )
                    }
                    className="rounded-full border border-emerald-500/20 px-4 py-2 text-sm text-emerald-300 hover:bg-emerald-500/10"
                  >
                    View Attempts
                  </button>
                </div>
              )
            )}

          </div>

        </div>
        {/* SECTION 5 — AI Insight */}
        <section className="mt-20">
          <div className="relative overflow-hidden rounded-3xl border border-emerald-400/20 bg-linear-to-br from-emerald-400/8 via-white/2 to-teal-400/5 p-10 backdrop-blur-xl">
            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-emerald-400/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-32 -left-24 h-72 w-72 rounded-full bg-teal-400/10 blur-3xl" />

            <div className="relative flex items-start gap-4">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-emerald-400/10 ring-1 ring-emerald-400/30">
                <Sparkles className="h-5 w-5 text-emerald-300" />
              </div>
              <div className="flex-1">
                <p className="text-[11px] uppercase tracking-widest text-emerald-300">
                  Gemini · Cohort synthesis</p>
                <button
                  onClick={generateInsight}
                  className="rounded-full border mt-4 border-emerald-500/20 px-4 py-2 text-emerald-300 hover:bg-emerald-500/10 text-sm font-medium transition"
                >
                  Generate AI Insight
                </button>

                <p className="mt-4 text-slate-300">
                  {insight ||
                    "Generate AI classroom analysis using Gemini."}
                </p>

                {/* <div className="mt-6 flex flex-wrap gap-2">
                  {["Newtonian mechanics", "Force ≠ motion", "Energy conservation", "Circuit flow"].map(
                    (tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-slate-300"
                      >
                        {tag}
                      </span>
                    )
                  )}
                </div> */}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6 — Interventions */}
        <section className="mt-20">
          <SectionHeader
            kicker="Recommended interventions"
            title="Next moves for this cohort"
            sub="AI-suggested actions, ranked by expected impact."
          />

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <InterventionCard
              icon={<Brain className="h-4 w-4" />}
              title="Concept reinforcement"
              body="Re-teach Newton's first law using contrast cases that target the 'force keeps things moving' misconception."
              tag="High impact"
              onClick={() =>
                router.push("/mission")
              }
            />
            <InterventionCard
              icon={<Target className="h-4 w-4" />}
              title="Targeted recovery missions"
              body={`Auto-assign micro-missions to the ${stats.atRisk} students flagged as high or critical severity.`}
              tag="Personalized"
              onClick={() => {
                document
                  .getElementById(
                    "student-performance"
                  )
                  ?.scrollIntoView({
                    behavior: "smooth",
                  });
              }}
            />
            <InterventionCard
              icon={<Users className="h-4 w-4" />}
              title="Peer learning sessions"
              body="Pair students with conflicting mental models so they surface and resolve each other's misconceptions."
              tag="Discussion-based"
              onClick={() =>
                alert(
                  "Students with similar misconceptions should be grouped together for discussion."
                )
              }
            />
            <InterventionCard
              icon={<Network className="h-4 w-4" />}
              title="Knowledge graph review"
              body="Walk the class through the broken concepts on the shared knowledge graph to repair foundational links."
              tag="Whole class"
              onClick={() =>
                router.push("/graph")
              }
            />
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-3">

            <Link
              href="#student-performance"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-slate-200 transition hover:bg-white/10"
            >
              <LineChart className="h-4 w-4" />
              View individual results
            </Link>
          </div>
        </section>
      </main>

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
    </div>
  );
}

/* ---------- Subcomponents ---------- */

function SectionHeader({
  kicker,
  title,
  sub,
}: {
  kicker: string;
  title: string;
  sub: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-[11px] uppercase tracking-widest text-emerald-300">
        {kicker}
      </p>
      <h2 className="text-3xl font-semibold tracking-tight text-slate-100 sm:text-4xl">
        {title}
      </h2>
      <p className="max-w-2xl text-sm text-slate-400">{sub}</p>
    </div>
  );
}

function MetricCard({
  icon,
  label,
  value,
  sub,
  tone,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub: string;
  tone: "emerald" | "teal" | "amber" | "rose";
}) {
  const tones: Record<string, string> = {
    emerald: "from-emerald-400/15 to-transparent text-emerald-300 ring-emerald-400/30",
    teal: "from-teal-400/15 to-transparent text-teal-300 ring-teal-400/30",
    amber: "from-amber-300/15 to-transparent text-amber-200 ring-amber-300/30",
    rose: "from-rose-400/15 to-transparent text-rose-300 ring-rose-400/30",
  };
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/3 p-5 backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-white/20">
      <div
        className={`pointer-events-none absolute inset-0 bg-linear-to-br opacity-60 ${tones[tone]}`}
        style={{ maskImage: "radial-linear(circle at top right, black, transparent 70%)" }}
      />
      <div className="relative flex items-center gap-2">
        <div className={`grid h-7 w-7 place-items-center rounded-md bg-white/5 ring-1 ${tones[tone]}`}>
          {icon}
        </div>
        <p className="text-[11px] uppercase tracking-wider text-slate-400">{label}</p>
      </div>
      <p className="relative mt-4 line-clamp-2 text-lg font-semibold leading-tight tracking-tight text-slate-100">
        {value}
      </p>
      <p className="relative mt-1 text-[11px] text-slate-500">{sub}</p>
    </div>
  );
}

function InterventionCard({
  icon,
  title,
  body,
  tag,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
  tag: string;
  onClick: () => void;
}) {
  return (
    <div onClick={onClick} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/3 p-6 backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-emerald-400/30">
      <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-emerald-400/10 opacity-0 blur-3xl transition group-hover:opacity-100" />
      <div className="flex items-center justify-between">
        <div className="grid h-9 w-9 place-items-center rounded-lg bg-emerald-400/10 text-emerald-300 ring-1 ring-emerald-400/30">
          {icon}
        </div>
        <span className="rounded-full border border-emerald-400/20 bg-emerald-400/5 px-2.5 py-0.5 text-[10px] uppercase tracking-wider text-emerald-200">
          {tag}
        </span>
      </div>
      <h3 className="mt-5 text-base font-semibold tracking-tight text-slate-100">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-400">{body}</p>
      <div className="mt-5 inline-flex items-center gap-1.5 text-xs text-emerald-300">
        Apply intervention
        <Workflow className="h-3.5 w-3.5" />
      </div>
    </div>
  );
}
