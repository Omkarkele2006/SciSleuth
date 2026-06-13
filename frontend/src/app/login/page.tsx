"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ADMIN_EMAILS } from "@/lib/admin";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import {
    Brain,
    Sparkles,
    Network,
    Activity,
    Mail,
    Lock,
    Eye,
    EyeOff,
    ArrowRight,
    ShieldCheck,
    LineChart,
    Atom,
    GraduationCap,
} from "lucide-react";

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const handleLogin = async (
        e: React.FormEvent
    ) => {
        e.preventDefault();
        setLoading(true);

        const { data, error } =
            await supabase.auth.signInWithPassword({
                email,
                password,
            });

        setLoading(false);

        if (error) {
            alert(error.message);
            return;
        }

        const userEmail =
            data.user?.email?.toLowerCase();

        if (
            userEmail &&
            ADMIN_EMAILS.includes(userEmail)
        ) {
            router.replace("/teacher");
        } else {
            router.replace("/diagnostic");
        }
    };
    return (
        <div className="relative min-h-screen overflow-hidden bg-[#06111f] text-slate-100 antialiased">
            {/* Ambient background */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute inset-0 bg-linear-to-br from-[#04101f] via-[#06182b] to-[#020814]" />
                <div className="absolute -top-40 -left-32 h-130 w-130 rounded-full bg-emerald-500/20 blur-[140px]" />
                <div className="absolute top-1/3 -right-40 h-150 w-150 rounded-full bg-teal-400/15 blur-[160px]" />
                <div className="absolute bottom-50 left-1/3 h-125 w-125 rounded-full bg-cyan-500/10 blur-[160px]" />
                <div
                    className="absolute inset-0 opacity-[0.05]"
                    style={{
                        backgroundImage:
                            "linear-gradient(rgba(16,185,129,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.6) 1px, transparent 1px)",
                        backgroundSize: "44px 44px",
                    }}
                />
            </div>

            {/* Header */}
            <header className="relative z-20 border-b border-white/5 backdrop-blur-xl">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                    <Link href="/" className="flex items-center gap-2.5">
                        <Image
                            src="/logo.jpg"
                            alt="SciSleuth"
                            width={40}
                            height={40}
                            className="rounded-lg"
                        />

                        <div className="flex flex-col leading-none">
                            <span className="text-lg font-semibold tracking-tight">
                                SciSleuth
                            </span>

                            <span className="mt-0.5 text-[10px] uppercase tracking-[0.18em] text-slate-400">
                                AI Learning Intelligence
                            </span>
                        </div>
                    </Link>

                    <div className="flex items-center gap-4">
                        <Link
                            href="/"
                            className="hidden text-sm text-slate-300 transition hover:text-emerald-400 md:block"
                        >
                            Home
                        </Link>

                        <Link
                            href="/signup"
                            className="rounded-full border border-emerald-500/30 px-5 py-2 text-sm font-medium text-emerald-300 transition hover:border-emerald-400 hover:bg-emerald-500/10"
                        >
                            Create Account
                        </Link>
                    </div>
                </div>
            </header>

            {/* Main */}
            <main className="relative z-10 mx-auto max-w-7xl px-6 pb-24 pt-12 lg:pt-20">
                {/* Hero */}
                <div className="mx-auto mb-12 max-w-2xl text-center">
                    {/* <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-1.5 text-xs font-medium tracking-wide text-emerald-300 backdrop-blur-md">
                        <Sparkles className="h-3.5 w-3.5" />
                        AI Learning Intelligence
                    </div> */}
                    <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
                        Welcome <span className="bg-linear-to-r from-emerald-300 to-teal-400 bg-clip-text text-transparent">Back</span>
                    </h1>
                    <p className="mx-auto mt-4 max-w-xl text-base text-slate-400 sm:text-lg">
                        Sign in to continue your personalized misconception recovery journey.
                    </p>
                </div>

                {/* Main card */}
                <div className="relative mx-auto max-w-6xl">
                    <div className="absolute -inset-px rounded-3xl bg-linear-to-br from-emerald-400/40 via-transparent to-teal-500/30 opacity-60 blur-md" />
                    <div className="relative grid overflow-hidden rounded-3xl border border-white/10 bg-white/4 backdrop-blur-2xl shadow-2xl shadow-black/40 lg:grid-cols-2">
                        {/* Form */}
                        <div className="p-8 sm:p-12">
                            <div className="mb-8">
                                <h2 className="text-2xl font-semibold tracking-tight">Sign in to SciSleuth</h2>
                                <p className="mt-2 text-sm text-slate-400">
                                    Resume your diagnostics, insights, and recovery plans.
                                </p>
                            </div>

                            <form className="space-y-5" onSubmit={handleLogin}>
                                {/* Email */}
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-xs font-medium uppercase tracking-wider text-slate-400">
                                        Email
                                    </label>
                                    <div className="group relative">
                                        <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500 transition group-focus-within:text-emerald-400" />
                                        <input
                                            id="email"
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="iamom@scisleuth.ai"
                                            className="w-full rounded-xl border border-white/10 bg-white/3 py-3.5 pl-11 pr-4 text-sm text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-emerald-400/60 focus:bg-white/6 focus:ring-2 focus:ring-emerald-400/20"
                                        />
                                    </div>
                                </div>

                                {/* Password */}
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="password" className="text-xs font-medium uppercase tracking-wider text-slate-400">
                                            Password
                                        </label>
                                    </div>
                                    <div className="group relative">
                                        <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500 transition group-focus-within:text-emerald-400" />
                                        <input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="••••••••••••"
                                            className="w-full rounded-xl border border-white/10 bg-white/3 py-3.5 pl-11 pr-12 text-sm text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-emerald-400/60 focus:bg-white/6 focus:ring-2 focus:ring-emerald-400/20"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword((s) => !s)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-slate-500 transition hover:text-emerald-400"
                                            aria-label="Toggle password visibility"
                                        >
                                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        </button>
                                    </div>
                                </div>

                                <label className="flex items-center gap-2 text-xs text-slate-400">
                                    <input
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-white/20 bg-white/5 text-emerald-400 focus:ring-emerald-400/40"
                                    />
                                    Keep me signed in on this device
                                </label>

                                {/* Primary */}
                                <button
                                    type="submit" disabled={loading}
                                    className="group relative flex w-full items-center justify-center gap-2 overflow-hidden disabled:opacity-50 rounded-xl bg-linear-to-r from-emerald-400 to-teal-500 px-6 py-3.5 text-sm font-semibold text-[#04121f] shadow-lg shadow-emerald-500/30 transition hover:shadow-emerald-400/50"
                                >
                                    <span>
                                        {loading
                                            ? "Signing In..."
                                            : "Sign In"}
                                    </span>
                                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                                </button>

                                {/* Divider */}
                                <div className="relative py-1">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-white/10" />
                                    </div>
                                    <div className="relative flex justify-center">
                                        <span className="bg-[#0a1726] px-3 text-[11px] uppercase tracking-[0.2em] text-slate-500">
                                            Or
                                        </span>
                                    </div>
                                </div>

                                {/* Google */}
                                <div className="group relative">
                                    <button
                                        type="button"
                                        disabled
                                        className="flex w-full cursor-not-allowed items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/4 px-6 py-3.5 text-sm font-medium text-slate-400 opacity-50 transition"
                                    >
                                        <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden>
                                            <path
                                                fill="#EA4335"
                                                d="M12 10.2v3.9h5.5c-.24 1.3-1.65 3.8-5.5 3.8a6 6 0 110-12 5.4 5.4 0 013.8 1.5l2.6-2.5A9.3 9.3 0 0012 2a10 10 0 100 20c5.8 0 9.6-4 9.6-9.7 0-.65-.07-1.15-.16-1.6H12z"
                                            />
                                        </svg>
                                        Continue with Google
                                    </button>
                                    <div className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 rounded-lg border border-white/10 bg-[#0e1f33] px-3 py-1.5 text-[11px] text-slate-400 opacity-0 transition group-hover:opacity-100 whitespace-nowrap">
                                        Coming soon
                                    </div>
                                </div>

                                <p className="pt-2 text-center text-sm text-slate-400">
                                    Don't have an account?{" "}
                                    <Link href="/signup" className="font-medium text-emerald-400 hover:text-emerald-300">
                                        Create Account
                                    </Link>
                                </p>
                            </form>
                        </div>

                        {/* Illustration */}
                        <div className="relative hidden overflow-hidden border-l border-white/5 bg-linear-to-br from-[#08203a]/80 via-[#062436]/60 to-[#04162a]/90 p-10 lg:block">
                            {/* Glow */}
                            <div className="absolute -top-24 right-0 h-72 w-72 rounded-full bg-emerald-400/25 blur-[100px]" />
                            <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-teal-500/20 blur-[100px]" />

                            <div className="relative flex h-full flex-col">
                                <div className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-[11px] font-medium text-emerald-300">
                                    <Activity className="h-3 w-3" />
                                    Live Knowledge Graph
                                </div>

                                {/* Concept network SVG */}
                                <div className="relative my-6 flex-1">
                                    <svg viewBox="0 0 400 360" className="h-full w-full">
                                        <defs>
                                            <radialGradient id="nodeCore" cx="50%" cy="50%" r="50%">
                                                <stop offset="0%" stopColor="#6ee7b7" />
                                                <stop offset="100%" stopColor="#0f766e" />
                                            </radialGradient>
                                            <linearGradient id="edge" x1="0" y1="0" x2="1" y2="1">
                                                <stop offset="0%" stopColor="#34d399" stopOpacity="0.7" />
                                                <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.1" />
                                            </linearGradient>
                                        </defs>

                                        {/* Edges */}
                                        {[
                                            [200, 170, 80, 60],
                                            [200, 170, 330, 70],
                                            [200, 170, 70, 280],
                                            [200, 170, 320, 290],
                                            [200, 170, 200, 40],
                                            [200, 170, 200, 320],
                                            [80, 60, 70, 280],
                                            [330, 70, 320, 290],
                                            [200, 40, 330, 70],
                                            [200, 40, 80, 60],
                                        ].map(([x1, y1, x2, y2], i) => (
                                            <line
                                                key={i}
                                                x1={x1}
                                                y1={y1}
                                                x2={x2}
                                                y2={y2}
                                                stroke="url(#edge)"
                                                strokeWidth="1.2"
                                            />
                                        ))}

                                        {/* Outer nodes */}
                                        {[
                                            [80, 60, 8],
                                            [330, 70, 9],
                                            [70, 280, 7],
                                            [320, 290, 10],
                                            [200, 40, 6],
                                            [200, 320, 7],
                                        ].map(([cx, cy, r], i) => (
                                            <g key={i}>
                                                <circle cx={cx} cy={cy} r={Number(r) + 6} fill="#10b981" opacity="0.12" />
                                                <circle cx={cx} cy={cy} r={r} fill="url(#nodeCore)" />
                                            </g>
                                        ))}

                                        {/* Core node */}
                                        <circle cx="200" cy="170" r="28" fill="#10b981" opacity="0.15" />
                                        <circle cx="200" cy="170" r="18" fill="url(#nodeCore)" />
                                        <circle cx="200" cy="170" r="6" fill="#ecfeff" />
                                    </svg>

                                    {/* Floating chips */}
                                    <div className="absolute left-4 top-4 rounded-xl border border-white/10 bg-white/6 px-3 py-2 backdrop-blur-md">
                                        <div className="flex items-center gap-2 text-[11px] text-slate-300">
                                            <Atom className="h-3.5 w-3.5 text-emerald-400" />
                                            Quantum Concept
                                        </div>
                                        <div className="mt-1 text-[10px] text-slate-500">Mastery 86%</div>
                                    </div>

                                    <div className="absolute right-4 top-1/3 rounded-xl border border-white/10 bg-white/6 px-3 py-2 backdrop-blur-md">
                                        <div className="flex items-center gap-2 text-[11px] text-slate-300">
                                            <LineChart className="h-3.5 w-3.5 text-teal-300" />
                                            Recovery Insight
                                        </div>
                                        <div className="mt-1 text-[10px] text-slate-500">+12% this week</div>
                                    </div>

                                    <div className="absolute bottom-4 left-1/4 rounded-xl border border-white/10 bg-white/6 px-3 py-2 backdrop-blur-md">
                                        <div className="flex items-center gap-2 text-[11px] text-slate-300">
                                            <Network className="h-3.5 w-3.5 text-emerald-400" />
                                            3 Misconceptions Linked
                                        </div>
                                    </div>
                                </div>

                                {/* Stats */}
                                <div className="grid grid-cols-3 gap-3">
                                    {[
                                        { icon: GraduationCap, label: "Concepts", value: "142" },
                                        { icon: Activity, label: "Sessions", value: "28" },
                                        { icon: ShieldCheck, label: "Recovered", value: "94%" },
                                    ].map(({ icon: Icon, label, value }) => (
                                        <div
                                            key={label}
                                            className="rounded-xl border border-white/10 bg-white/4 p-3 backdrop-blur-md"
                                        >
                                            <Icon className="mb-2 h-4 w-4 text-emerald-400" />
                                            <div className="text-lg font-semibold text-white">{value}</div>
                                            <div className="text-[10px] uppercase tracking-wider text-slate-500">{label}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
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
    );
}
