"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  Network,
  Activity,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  LineChart,
  Atom,
  GraduationCap,
  BrainCircuit,
} from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!fullName.trim()) return setError("Please enter your full name.");
    if (!email.trim()) return setError("Please enter your email.");
    if (password.length < 8) return setError("Password must be at least 8 characters.");
    if (password !== confirmPassword) return setError("Passwords do not match.");
    if (!agreed) return setError("Please agree to the Terms and Privacy Policy.");

    setLoading(true);
    // TODO: replace with real auth (Firebase, NextAuth, etc.)
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    router.push("/diagnostic");
  };

  const inputClass =
    "w-full rounded-xl border border-white/10 bg-white/[0.03] py-3.5 pl-11 pr-4 text-sm text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-emerald-400/60 focus:bg-white/[0.06] focus:ring-2 focus:ring-emerald-400/20";

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#06111f] text-slate-100 antialiased">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-linear-to-br from-[#04101f] via-[#06182b] to-[#020814]" />
        <div className="absolute -top-40 -left-32 h-130 w-130 rounded-full bg-emerald-500/20 blur-[140px]" />
        <div className="absolute top-1/3 -right-40 h-150 w-150 rounded-full bg-teal-400/15 blur-[160px]" />
        <div className="absolute bottom-0 left-1/3 h-130 w-130 rounded-full bg-cyan-500/10 blur-[160px]" />
        <div
          className="absolute inset-0 opacity-4"
          style={{
            backgroundImage:
              "linear-gradient(rgba(16,185,129,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.6) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
      </div>

      {/* Header — matches all other pages */}
      <header className="relative z-20 border-b border-white/10 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
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
          <div className="hidden items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-3 py-1.5 text-xs text-emerald-300 md:flex">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Create your account
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="relative z-10 mx-auto w-full max-w-7xl flex-1 px-6 pb-24 pt-12 lg:pt-20">
        {/* Hero */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          {/* <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-4 py-1.5 text-xs font-medium tracking-wide text-emerald-300 backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5" />
            AI Learning Intelligence
          </div> */}
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
            Create Your{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(to right, #6ee7b7, #2dd4bf)" }}
            >
              Account
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-slate-400 sm:text-lg">
            Start your personalized misconception diagnosis and recovery journey.
          </p>
        </div>

        {/* Card wrapper with border glow */}
        <div className="relative mx-auto max-w-6xl">
          <div className="absolute -inset-px rounded-3xl bg-linear-to-br from-emerald-400/40 via-transparent to-teal-500/30 opacity-60 blur-md pointer-events-none" />

          <div className="relative grid overflow-hidden rounded-3xl border border-white/10 bg-white/4 shadow-2xl shadow-black/40 backdrop-blur-2xl lg:grid-cols-2">

            {/* ── FORM SIDE ── */}
            <div className="p-8 sm:p-12">
              <div className="mb-8">
                <h2 className="text-2xl font-semibold tracking-tight">Join SciSleuth</h2>
                <p className="mt-2 text-sm text-slate-400">
                  Build your knowledge graph and unlock AI-guided recovery.
                </p>
              </div>

              <form className="space-y-5" onSubmit={handleSubmit} noValidate>
                {/* Full Name */}
                <div className="space-y-2">
                  <label htmlFor="fullName" className="text-xs font-medium uppercase tracking-wider text-slate-400">
                    Full Name
                  </label>
                  <div className="group relative">
                    <User className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500 transition group-focus-within:text-emerald-400" />
                    <input
                      id="fullName"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Om Karkele"
                      autoComplete="name"
                      className={inputClass}
                    />
                  </div>
                </div>

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
                      autoComplete="email"
                      className={inputClass}
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <label htmlFor="password" className="text-xs font-medium uppercase tracking-wider text-slate-400">
                    Password
                  </label>
                  <div className="group relative">
                    <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500 transition group-focus-within:text-emerald-400" />
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Min. 8 characters"
                      autoComplete="new-password"
                      className={inputClass.replace("pr-4", "pr-12")}
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

                {/* Confirm Password */}
                <div className="space-y-2">
                  <label htmlFor="confirmPassword" className="text-xs font-medium uppercase tracking-wider text-slate-400">
                    Confirm Password
                  </label>
                  <div className="group relative">
                    <ShieldCheck className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500 transition group-focus-within:text-emerald-400" />
                    <input
                      id="confirmPassword"
                      type={showConfirm ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Repeat your password"
                      autoComplete="new-password"
                      className={inputClass.replace("pr-4", "pr-12")}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm((s) => !s)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-slate-500 transition hover:text-emerald-400"
                      aria-label="Toggle confirm password visibility"
                    >
                      {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {/* Terms checkbox */}
                <label className="flex cursor-pointer items-start gap-2.5 text-xs text-slate-400">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-white/20 bg-white/5 accent-emerald-400"
                  />
                  <span>
                    I agree to the{" "}
                    <Link href="/terms" className="text-emerald-400 hover:text-emerald-300 transition">Terms</Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-emerald-400 hover:text-emerald-300 transition">Privacy Policy</Link>.
                  </span>
                </label>

                {/* Error message */}
                {error && (
                  <div className="rounded-xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-xs text-rose-300">
                    {error}
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl px-6 py-3.5 text-sm font-semibold text-[#04121f] shadow-lg transition disabled:cursor-not-allowed disabled:opacity-60"
                  style={{
                    backgroundImage: "linear-gradient(to right, #34d399, #2dd4bf)",
                    boxShadow: loading ? "none" : "0 0 40px rgba(52,211,153,0.35)",
                  }}
                >
                  {loading ? (
                    <>
                      <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                      </svg>
                      Creating account…
                    </>
                  ) : (
                    <>
                      Create Account
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                    </>
                  )}
                </button>

                {/* Divider — no hardcoded bg color */}
                <div className="relative py-1">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/10" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="px-3 text-[11px] uppercase tracking-[0.2em] text-slate-500"
                      style={{ background: "linear-gradient(to bottom, #0e2035, #09182a)" }}>
                      Or
                    </span>
                  </div>
                </div>

                {/* Google — disabled with tooltip */}
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
                  Already have an account?{" "}
                  <Link href="/login" className="font-medium text-emerald-400 transition hover:text-emerald-300">
                    Sign In
                  </Link>
                </p>
              </form>
            </div>

            {/* ── ILLUSTRATION SIDE ── */}
            <div className="relative hidden overflow-hidden border-l border-white/5 bg-linear-to-br from-[#08203a]/80 via-[#062436]/60 to-[#04162a]/90 p-10 lg:block">
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
                      <radialGradient id="nodeCoreSignup" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#6ee7b7" />
                        <stop offset="100%" stopColor="#0f766e" />
                      </radialGradient>
                      <linearGradient id="edgeSignup" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#34d399" stopOpacity="0.7" />
                        <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.1" />
                      </linearGradient>
                    </defs>

                    {[
                      [200,170, 80, 60], [200,170, 330,70],  [200,170, 70,280],
                      [200,170, 320,290],[200,170, 200,40],  [200,170, 200,320],
                      [80, 60,  70,280], [330,70,  320,290], [200,40,  330,70],
                      [200,40,  80, 60],
                    ].map(([x1,y1,x2,y2], i) => (
                      <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
                        stroke="url(#edgeSignup)" strokeWidth="1.2" />
                    ))}

                    {[
                      [80,60,8],[330,70,9],[70,280,7],[320,290,10],[200,40,6],[200,320,7],
                    ].map(([cx,cy,r], i) => (
                      <g key={i}>
                        <circle cx={cx} cy={cy} r={Number(r)+6} fill="#10b981" opacity="0.12" />
                        <circle cx={cx} cy={cy} r={r} fill="url(#nodeCoreSignup)" />
                      </g>
                    ))}

                    <circle cx="200" cy="170" r="28" fill="#10b981" opacity="0.15" />
                    <circle cx="200" cy="170" r="18" fill="url(#nodeCoreSignup)" />
                    <circle cx="200" cy="170" r="6"  fill="#ecfeff" />
                  </svg>

                  {/* Floating chips */}
                  {[
                    { className: "absolute left-4 top-4",     icon: BrainCircuit, color: "text-emerald-400", title: "AI Learning Signal",        sub: "Adaptive · Real-time"   },
                    { className: "absolute right-4 top-1/3",  icon: LineChart,    color: "text-teal-300",    title: "Recovery Forecast",          sub: "+18% projected"         },
                    { className: "absolute bottom-4 left-1/4",icon: Network,      color: "text-emerald-400", title: "Concept Mesh Initialized",   sub: null                     },
                    { className: "absolute right-6 bottom-10",icon: Atom,         color: "text-emerald-400", title: "Student Progress · 72%",     sub: null                     },
                  ].map(({ className, icon: Icon, color, title, sub }) => (
                    <div key={title} className={`${className} rounded-xl border border-white/10 bg-white/6 px-3 py-2 backdrop-blur-md`}>
                      <div className={`flex items-center gap-2 text-[11px] text-slate-300`}>
                        <Icon className={`h-3.5 w-3.5 ${color}`} />
                        {title}
                      </div>
                      {sub && <div className="mt-1 text-[10px] text-slate-500">{sub}</div>}
                    </div>
                  ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { icon: GraduationCap, label: "Learners",  value: "12K+" },
                    { icon: Activity,      label: "Diagnoses", value: "48K"  },
                    { icon: ShieldCheck,   label: "Recovery",  value: "96%"  },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="rounded-xl border border-white/10 bg-white/4 p-3 backdrop-blur-md">
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