"use client";

import { useEffect, useState } from "react";
import { User } from "lucide-react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { LogOut } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import {
    Activity,
    AlertTriangle,
    ArrowLeft,
    ArrowRight,
    CheckCircle2,
    Network,
    Sparkles,
    ShieldCheck,
    Workflow,
    Gauge,
} from "lucide-react";

import { nodes } from "@/data/graph";
import { evaluateGraphHealth } from "@/lib/evaluateGraphHealth";
import { Misconception } from "@/types/misconception";
import GraphCanvas from "@/components/GraphCanvas";

export default function GraphPage() {
    const [brokenNodes, setBrokenNodes] =
        useState<string[]>([]);
    const router = useRouter();
    const handleLogout = async () => {
        localStorage.removeItem("misconceptions");
        localStorage.removeItem("original_misconceptions");
        localStorage.removeItem("latest_attempt_id");
        localStorage.removeItem("recovery_authorized");
        await supabase.auth.signOut();
        router.push("/login");
    };
    const [misconceptions, setMisconceptions] =
        useState<Misconception[]>([]);
    useEffect(() => {
        const checkAuth = async () => {
            const { data } = await supabase.auth.getUser();

            if (!data.user) {
                router.replace("/login");
                return;
            }

            const stored = localStorage.getItem("misconceptions");
            if (!stored) return;

            const parsed: Misconception[] = JSON.parse(stored);

            setMisconceptions(parsed);
            setBrokenNodes(evaluateGraphHealth(parsed));
        };

        checkAuth();
    }, [router]);

    const totalNodes = nodes.length;
    const brokenCount = brokenNodes.length;
    const healthyCount = totalNodes - brokenCount;
    const graphHealth = Math.round((healthyCount / totalNodes) * 100);

    const status =
        graphHealth >= 70
            ? {
                label: "Strong conceptual foundation",
                tone: "emerald",
                desc: "Your knowledge network is stable. Connected concepts reinforce each other with minimal interference from misconceptions.",
                Icon: ShieldCheck,
            }
            : graphHealth >= 40
                ? {
                    label: "Moderate conceptual gaps",
                    tone: "amber",
                    desc: "Several concepts show signs of weakened understanding. Targeted recovery on broken nodes will restore stability across the graph.",
                    Icon: Activity,
                }
                : {
                    label: "Critical concepts require repair",
                    tone: "rose",
                    desc: "Misconceptions are propagating through your network. Prioritize repair on broken concepts before building further knowledge.",
                    Icon: AlertTriangle,
                };

    const toneRing =
        status.tone === "emerald"
            ? "from-emerald-500/20 to-teal-500/10 border-emerald-400/30 text-emerald-300"
            : status.tone === "amber"
                ? "from-amber-500/20 to-orange-500/10 border-amber-400/30 text-amber-300"
                : "from-rose-500/20 to-red-500/10 border-rose-400/30 text-rose-300";

    return (
        <div className="relative min-h-screen overflow-hidden bg-[#020817] text-slate-100 antialiased">
            {/* Ambient linears */}
            <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute -top-40 left-1/2 h-150 w-225 -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[140px]" />
                <div className="absolute top-1/3 -right-40 h-125 w-125 rounded-full bg-teal-500/10 blur-[120px]" />
                <div className="absolute bottom-0 -left-40 h-125 w-125 rounded-full bg-cyan-500/10 blur-[120px]" />
                <div
                    className="absolute inset-0 opacity-[0.04]"
                    style={{
                        backgroundImage:
                            "linear-linear(rgba(255,255,255,.6) 1px, transparent 1px), linear-linear(90deg, rgba(255,255,255,.6) 1px, transparent 1px)",
                        backgroundSize: "56px 56px",
                        maskImage:
                            "radial-linear(ellipse at center, black 40%, transparent 80%)",
                    }}
                />
            </div>

            {/* Top nav */}
            <header className="sticky top-0 z-30 border-b border-white/5 bg-[#020817]/70 backdrop-blur-xl">
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
                        <div className="hidden items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-3 py-1.5 text-xs text-emerald-300 md:flex">
                            <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                            </span>
                            Knowledge Graph · live analysis
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
                            className="inline-flex items-center gap-2 rounded-full border border-red-500/20 px-4 py-2 text-sm text-red-300 transition hover:bg-red-500/10"
                        >
                            <LogOut className="h-4 w-4" />
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            <main className="mx-auto max-w-6xl px-6 pb-24 pt-16">
                {/* SECTION 1 — HERO */}
                <section className="text-center">
                    <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-500/5 px-4 py-1.5 text-xs font-medium text-emerald-300">
                        <Network className="h-3.5 w-3.5" />
                        Concept Network Intelligence
                    </div>
                    <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-6xl">
                        Knowledge Graph{" "}
                        <span className="bg-linear-to-r from-emerald-300 via-teal-200 to-cyan-300 bg-clip-text text-transparent">
                            Analysis
                        </span>
                    </h1>
                    <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg">
                        Visualize how misconceptions impact connected concepts across your
                        learning network.
                    </p>

                    {/* Metric cards */}
                    <div className="mt-12 grid gap-5 sm:grid-cols-3">
                        <MetricCard
                            label="Broken Concepts"
                            value={brokenCount}
                            accent="rose"
                            Icon={AlertTriangle}
                            caption="Affected by misconceptions"
                        />
                        <MetricCard
                            label="Healthy Concepts"
                            value={healthyCount}
                            accent="emerald"
                            Icon={CheckCircle2}
                            caption="Currently understood"
                        />
                        <MetricCard
                            label="Concept Health"
                            value={`${graphHealth}%`}
                            accent="teal"
                            Icon={Gauge}
                            caption="Overall network stability"
                        />
                    </div>
                </section>

                {/* SECTION 2 — AI GRAPH INSIGHT */}
                <section className="mt-20">
                    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-linear-to-br from-white/6 to-white/2 p-8 backdrop-blur-xl shadow-2xl shadow-emerald-500/5 sm:p-10">
                        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
                        <div className="relative">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-400/30 bg-emerald-500/10">
                                    <Workflow className="h-5 w-5 text-emerald-300" />
                                </div>
                                <div>
                                    <p className="text-xs uppercase tracking-widest text-emerald-300/80">
                                        AI insight
                                    </p>
                                    <h2 className="text-2xl font-semibold tracking-tight">
                                        Concept Network Status
                                    </h2>
                                </div>
                            </div>

                            <p className="mt-5 max-w-3xl text-sm leading-relaxed text-slate-400 sm:text-base">
                                SciSleuth traces misconceptions through connected concepts to
                                reveal where understanding is strongest and weakest.
                            </p>

                            <div className="mt-8 grid gap-4 md:grid-cols-3">
                                <InsightTile
                                    title="Concept Health Score"
                                    value={`${graphHealth}%`}
                                    hint={`${healthyCount} of ${totalNodes} concepts stable`}
                                />
                                <InsightTile
                                    title="Connected Concept Analysis"
                                    value={`${brokenCount} affected`}
                                    hint={`${totalNodes} nodes traced across network`}
                                />
                                <InsightTile
                                    title="Learning Stability Indicator"
                                    value={status.label.split(" ")[0]}
                                    hint={status.label}
                                />
                            </div>

                            {/* Health bar */}
                            <div className="mt-8">
                                <div className="mb-2 flex items-center justify-between text-xs text-slate-400">
                                    <span>Network stability</span>
                                    <span className="font-medium text-slate-200">
                                        {graphHealth}%
                                    </span>
                                </div>
                                <div className="h-2 w-full overflow-hidden rounded-full bg-white/5">
                                    <div
                                        className="h-full rounded-full bg-linear-to-r from-emerald-400 via-teal-400 to-cyan-400 shadow-[0_0_20px_rgba(16,185,129,0.5)] transition-all duration-700"
                                        style={{ width: `${graphHealth}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SECTION 3 — KNOWLEDGE GRAPH */}
                <section className="mt-20">
                    <div className="mb-6 flex items-end justify-between">
                        <div>
                            <p className="text-xs uppercase tracking-widest text-emerald-300/80">
                                Visualization
                            </p>
                            <h2 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
                                Interactive Knowledge Graph
                            </h2>
                            <p className="mt-2 max-w-xl text-sm text-slate-400">
                                Hover over concepts to see how misconceptions affect your
                                understanding.
                            </p>
                        </div>
                        <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-400 md:flex">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                            AI Concept Network
                        </div>
                    </div>

                    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-linear-to-br from-white/5 to-white/1 p-2 backdrop-blur-xl shadow-2xl shadow-black/40">
                        <div className="absolute inset-0 -z-10 opacity-40">
                            <div className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-3xl" />
                        </div>
                        <div className="rounded-[1.4rem] border border-white/5 bg-[#030B1C]/60 p-4 sm:p-6">
                            <GraphCanvas
                                brokenNodes={brokenNodes}
                                misconceptions={misconceptions}
                            />
                        </div>
                    </div>
                </section>

                {/* SECTION 4 — LEGEND */}
                <section className="mt-16 grid gap-5 sm:grid-cols-2">
                    <LegendCard
                        tone="emerald"
                        title="Healthy Concepts"
                        count={healthyCount}
                        desc="Nodes the diagnostic confirmed are well understood."
                    />
                    <LegendCard
                        tone="rose"
                        title="Broken Concepts"
                        count={brokenCount}
                        desc="Nodes affected by one or more detected misconceptions."
                    />
                </section>

                {/* SECTION 5 — RECOVERY INSIGHT */}
                <section className="mt-16">
                    <div
                        className={`relative overflow-hidden rounded-3xl border bg-linear-to-br ${toneRing} p-8 backdrop-blur-xl sm:p-10`}
                    >
                        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-start gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                                    <status.Icon className="h-6 w-6" />
                                </div>
                                <div>
                                    <p className="text-xs uppercase tracking-widest opacity-80">
                                        Recovery insight
                                    </p>
                                    <h3 className="mt-1 text-2xl font-semibold tracking-tight text-white">
                                        {status.label}
                                    </h3>
                                    <p className="mt-2 max-w-xl text-sm text-slate-300/90">
                                        {status.desc}
                                    </p>
                                </div>
                            </div>
                            <div className="shrink-0 rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-center">
                                <div className="text-3xl font-semibold text-white">
                                    {graphHealth}%
                                </div>
                                <div className="mt-1 text-[11px] uppercase tracking-widest text-slate-300/80">
                                    Graph health
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SECTION 6 — ACTIONS */}
                <section className="mt-16 flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <Link
                        href="/results"
                        className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-slate-200 backdrop-blur transition hover:border-white/20 hover:bg-white/10"
                    >
                        <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-0.5" />
                        Back to Results
                    </Link>
                    <Link
                        href="/diagnostic"
                        className="group inline-flex items-center gap-2 rounded-full bg-linear-to-r from-emerald-400 to-teal-500 px-6 py-3 text-sm font-semibold text-[#020817] shadow-lg shadow-emerald-500/30 transition hover:shadow-emerald-400/50"
                    >
                        Retake Diagnostic
                        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                    </Link>
                </section>
            </main>

            {/* SECTION 7 — FOOTER */}
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

function MetricCard({
    label,
    value,
    caption,
    accent,
    Icon,
}: {
    label: string;
    value: number | string;
    caption: string;
    accent: "emerald" | "rose" | "teal";
    Icon: React.ComponentType<{ className?: string }>;
}) {
    const palette = {
        emerald: {
            ring: "border-emerald-400/20 hover:border-emerald-400/40",
            glow: "from-emerald-500/15 to-transparent",
            icon: "text-emerald-300 bg-emerald-500/10 border-emerald-400/30",
            value: "text-emerald-300",
        },
        rose: {
            ring: "border-rose-400/20 hover:border-rose-400/40",
            glow: "from-rose-500/15 to-transparent",
            icon: "text-rose-300 bg-rose-500/10 border-rose-400/30",
            value: "text-rose-300",
        },
        teal: {
            ring: "border-teal-400/20 hover:border-teal-400/40",
            glow: "from-teal-500/15 to-transparent",
            icon: "text-teal-300 bg-teal-500/10 border-teal-400/30",
            value: "text-teal-300",
        },
    }[accent];

    return (
        <div
            className={`group relative overflow-hidden rounded-2xl border bg-white/3 p-6 text-left backdrop-blur-xl transition hover:-translate-y-0.5 ${palette.ring}`}
        >
            <div
                className={`absolute inset-0 -z-10 bg-linear-to-br ${palette.glow} opacity-0 transition group-hover:opacity-100`}
            />
            <div className="flex items-center justify-between">
                <span className="text-xs font-medium uppercase tracking-widest text-slate-400">
                    {label}
                </span>
                <div
                    className={`flex h-9 w-9 items-center justify-center rounded-lg border ${palette.icon}`}
                >
                    <Icon className="h-4 w-4" />
                </div>
            </div>
            <div className={`mt-6 text-5xl font-semibold tracking-tight ${palette.value}`}>
                {value}
            </div>
            <p className="mt-2 text-xs text-slate-500">{caption}</p>
        </div>
    );
}

function InsightTile({
    title,
    value,
    hint,
}: {
    title: string;
    value: string;
    hint: string;
}) {
    return (
        <div className="rounded-2xl border border-white/10 bg-white/3 p-5 backdrop-blur">
            <div className="text-[11px] uppercase tracking-widest text-slate-400">
                {title}
            </div>
            <div className="mt-3 text-2xl font-semibold tracking-tight text-white">
                {value}
            </div>
            <div className="mt-1 text-xs text-slate-500">{hint}</div>
        </div>
    );
}

function LegendCard({
    tone,
    title,
    count,
    desc,
}: {
    tone: "emerald" | "rose";
    title: string;
    count: number;
    desc: string;
}) {
    const styles =
        tone === "emerald"
            ? {
                dot: "bg-emerald-400 shadow-[0_0_16px_rgba(16,185,129,0.7)]",
                ring: "border-emerald-400/20",
                text: "text-emerald-300",
            }
            : {
                dot: "bg-rose-400 shadow-[0_0_16px_rgba(244,63,94,0.7)]",
                ring: "border-rose-400/20",
                text: "text-rose-300",
            };

    return (
        <div
            className={`flex items-center justify-between rounded-2xl border bg-white/3 p-6 backdrop-blur-xl ${styles.ring}`}
        >
            <div className="flex items-center gap-4">
                <span className={`h-3.5 w-3.5 rounded-full ${styles.dot}`} />
                <div>
                    <div className="text-sm font-semibold text-white">{title}</div>
                    <p className="mt-1 text-xs text-slate-400">{desc}</p>
                </div>
            </div>
            <div className={`text-3xl font-semibold ${styles.text}`}>{count}</div>
        </div>
    );
}
