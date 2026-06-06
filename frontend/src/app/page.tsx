// src/app/page.tsx
import Link from "next/link";
import Image from "next/image";
import {
  Microscope,
  Brain,
  Sparkles,
  Target,
  Workflow,
  LineChart,
  Network,
  Activity,
  ArrowRight,
} from "lucide-react";

export const metadata = {
  title: "SciSleuth",
  description:
    "SciSleuth runs diagnostic assessments, detects physics misconceptions, and maps them onto a knowledge graph with AI-generated explanations and recovery missions.",
  openGraph: {
    title: "SciSleuth: Diagnose misconceptions, not mistakes.",
    description:
      "Diagnostic assessments, misconception detection, and a knowledge graph powered by Gemini.",
  },
};

export default function Page() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[oklch(0.16_0.018_265)] text-[oklch(0.97_0.005_250)] font-sans antialiased">
      {/* Ambient glow */}
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

      {/* Nav */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[oklch(0.16_0.018_265/0.6)] border-b border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2">

            <div className="flex items-center gap-2">
              <Image
                src="/logo.jpg"
                alt="SciSleuth"
                width={32}
                height={32}
                className="rounded-md"
              />

              <span className="font-bold">
                SciSleuth
              </span>
            </div>
          </Link>
          <nav className="hidden items-center gap-8 text-sm text-white/60 md:flex">
            <Link href="#problem" className="hover:text-white transition">
              Problem
            </Link>
            <Link href="#how" className="hover:text-white transition">
              How it works
            </Link>
            <Link href="#features" className="hover:text-white transition">
              Features
            </Link>
            <Link href="/teacher" className="hover:text-white transition">
              Analytics
            </Link>
          </nav>
          <Link
            href="/diagnostic"
            className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400 px-4 py-2 text-sm font-medium text-[oklch(0.16_0.02_265)] transition hover:opacity-90"
          >
            Start Diagnostic <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative mx-auto max-w-6xl px-6 pt-24 pb-32 text-center">
        <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60 backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          AI-Powered Concept Diagnostics
        </div>

        <h1 className="text-5xl leading-[1.05] tracking-tight sm:text-6xl md:text-7xl font-serif">
          Diagnose{" "}
          <span className="italic bg-linear-to-br from-white to-emerald-300 bg-clip-text text-transparent">
            misconceptions
          </span>
          ,<br /> not mistakes.
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-base text-white/60 sm:text-lg">
          SciSleuth runs short diagnostic assessments, detects the specific
          physics misconceptions behind each wrong answer, and maps them onto a
          live knowledge graph.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/diagnostic"
            className="group inline-flex items-center gap-2 rounded-full bg-emerald-400 px-6 py-3 text-sm font-medium text-[oklch(0.16_0.02_265)] shadow-[0_0_60px_-10px_oklch(0.78_0.17_165/0.35)] transition hover:-translate-y-px"
          >
            Start Diagnostic
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="#how"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-white/90 backdrop-blur transition hover:bg-white/10"
          >
            See how it works
          </Link>
        </div>

        {/* Visual: diagnostic card */}
        <div className="relative mx-auto mt-20 max-w-3xl">
          <div className="rounded-2xl border border-white/10 bg-white/4 p-6 text-left backdrop-blur-xl shadow-[0_1px_0_0_oklch(1_0_0/4%)_inset,0_20px_40px_-20px_oklch(0_0_0/50%)]">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2 text-xs text-white/60">
                <span className="h-2 w-2 rounded-full bg-rose-400/70" />
                <span className="h-2 w-2 rounded-full bg-emerald-400/70" />
                <span className="h-2 w-2 rounded-full bg-violet-400/70" />
                <span className="ml-3">Diagnostic response · Mechanics</span>
              </div>
              <span className="rounded-full bg-emerald-400/10 px-2 py-0.5 text-[10px] font-medium text-emerald-300 ring-1 ring-emerald-400/30">
                Analyzed by Gemini
              </span>
            </div>

            <div className="grid gap-4 pt-5 md:grid-cols-2">
              <div>
                <p className="text-[11px] uppercase tracking-wider text-white/50">
                  Student answer
                </p>
                <p className="mt-2 text-sm leading-relaxed text-white/90">
                  &ldquo;Heavier objects fall faster because gravity pulls more
                  on them.&rdquo;
                </p>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-wider text-emerald-300">
                  SciSleuth diagnosis
                </p>
                <p className="mt-2 text-sm leading-relaxed">
                  Misconception detected:{" "}
                  <span className="text-emerald-300">
                    force confused with acceleration
                  </span>
                  . Knowledge graph node{" "}
                  <span className="text-emerald-300">Newton&apos;s 2nd law</span>{" "}
                  flagged unhealthy.
                </p>
              </div>
            </div>
          </div>
          <div className="pointer-events-none absolute -inset-x-12 -bottom-12 -z-10 h-32 rounded-full bg-emerald-400/20 blur-3xl" />
        </div>
      </section>

      {/* Problem */}
      <section id="problem" className="mx-auto max-w-6xl px-6 py-32">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <p className="text-xs uppercase tracking-widest text-emerald-300">
              The problem
            </p>
            <h2 className="mt-3 text-4xl leading-tight tracking-tight sm:text-5xl font-serif">
              Grading marks the answer. <br />
              <span className="text-white/50">Nobody marks the thinking.</span>
            </h2>
            <p className="mt-6 max-w-md text-white/60">
              A wrong answer is just a symptom. Underneath it lives a
              misconception — a stubborn mental model that keeps producing wrong
              answers across topics. Standard grading never surfaces it, and
              teachers have no view of which ideas are actually broken.
            </p>
          </div>

          <div className="grid gap-4">
            {[
              {
                v: "1 score",
                l: "Tests give a single number — no signal about which underlying concept failed.",
              },
              {
                v: "0 maps",
                l: "Teachers have no map of which concepts in a unit are healthy vs. broken.",
              },
              {
                v: "Hours",
                l: "Diagnosing a single student's misconceptions by hand takes a 1-on-1 conversation.",
              },
            ].map((s) => (
              <div
                key={s.v}
                className="rounded-xl border border-white/10 bg-white/4 p-6 backdrop-blur transition hover:border-emerald-400/40"
              >
                <p className="text-4xl font-serif bg-linear-to-br from-white to-emerald-300 bg-clip-text text-transparent">
                  {s.v}
                </p>
                <p className="mt-2 text-sm text-white/60">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="mx-auto max-w-6xl px-6 py-32">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-widest text-emerald-300">
            How it works
          </p>
          <h2 className="mt-3 text-4xl leading-tight tracking-tight sm:text-5xl font-serif">
            From a diagnostic quiz to a recovery mission.
          </h2>
        </div>

        <div className="relative mt-16 grid gap-6 md:grid-cols-3">
          {[
            {
              icon: Workflow,
              title: "Run a diagnostic",
              body: "Students take a short diagnostic assessment designed to trigger specific misconceptions, not just measure correctness.",
            },
            {
              icon: Brain,
              title: "Detect & explain",
              body: "Gemini analyzes each response, names the underlying misconception, and writes a plain-language explanation of the flawed reasoning.",
            },
            {
              icon: Sparkles,
              title: "Recover",
              body: "SciSleuth generates a targeted AI recovery mission per student and updates their knowledge graph health score.",
            },
          ].map((s, i) => (
            <div
              key={s.title}
              className="relative rounded-2xl border border-white/10 bg-white/4 p-7 backdrop-blur transition hover:-translate-y-1 hover:border-emerald-400/40"
            >
              <div className="absolute -top-3 left-7 rounded-full border border-white/10 bg-[oklch(0.16_0.018_265)] px-2 py-0.5 text-[10px] font-mono text-white/60">
                0{i + 1}
              </div>
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-emerald-400/10 ring-1 ring-emerald-400/30">
                <s.icon className="h-5 w-5 text-emerald-300" />
              </div>
              <h3 className="mt-5 text-lg font-semibold tracking-tight">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-6xl px-6 py-32">
        <div className="grid items-end gap-6 md:grid-cols-[1fr_auto]">
          <div>
            <p className="text-xs uppercase tracking-widest text-emerald-300">
              What ships today
            </p>
            <h2 className="mt-3 text-4xl leading-tight tracking-tight sm:text-5xl font-serif">
              Seven pieces, <br /> one diagnostic loop.
            </h2>
          </div>
          <p className="max-w-sm text-sm text-white/60">
            Every feature listed here is implemented in the current SciSleuth
            build.
          </p>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-2">
          {[
            {
              icon: Target,
              title: "Diagnostic assessment",
              body: "Short, targeted quizzes engineered to expose specific physics misconceptions rather than just measure correctness.",
            },
            {
              icon: Brain,
              title: "Misconception detection",
              body: "Each response is classified against a misconception catalog so wrong answers are tagged with the idea behind them.",
            },
            {
              icon: Network,
              title: "Knowledge graph",
              body: "Concepts and their prerequisites are linked in a graph so a broken node visibly affects everything downstream of it.",
            },
            {
              icon: Activity,
              title: "Graph health scoring",
              body: "Each node carries a health score that updates as the student answers, giving an at-a-glance view of conceptual mastery.",
            },
            {
              icon: Sparkles,
              title: "AI explanations",
              body: "Gemini generates a plain-language explanation of the flawed reasoning behind every detected misconception.",
            },
            {
              icon: Workflow,
              title: "AI recovery missions",
              body: "Per-student missions are generated to directly target the misconceptions that scored lowest on the knowledge graph.",
            },
            {
              icon: LineChart,
              title: "Teacher analytics",
              body: "Teachers see which misconceptions are most common across the cohort and which knowledge graph nodes need intervention.",
            },
          ].map((f) => (
            <div
              key={f.title}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/4 p-7 backdrop-blur transition hover:border-emerald-400/40"
            >
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-emerald-400/10 ring-1 ring-emerald-400/30">
                  <f.icon className="h-5 w-5 text-emerald-300" />
                </div>
                <h3 className="text-lg font-semibold tracking-tight">
                  {f.title}
                </h3>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-white/60">
                {f.body}
              </p>
              <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-emerald-400/10 opacity-0 blur-2xl transition group-hover:opacity-100" />
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="mx-auto max-w-6xl px-6 py-32">
        <div
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/4 p-12 text-center backdrop-blur-xl md:p-20"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at top, oklch(0.78 0.17 165 / 0.18), transparent 60%), radial-gradient(ellipse at bottom right, oklch(0.7 0.18 280 / 0.15), transparent 55%)",
          }}
        >
          <h2 className="mx-auto max-w-2xl text-4xl leading-tight tracking-tight sm:text-5xl font-serif">
            Stop grading mistakes. <br />
            <span className="italic bg-linear-to-br from-white to-emerald-300 bg-clip-text text-transparent">
              Start diagnosing minds.
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-md text-white/60">
            Try the live SciSleuth diagnostic — take a quiz, see your
            knowledge graph update, and get an AI recovery mission.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/diagnostic"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-6 py-3 text-sm font-medium text-[oklch(0.16_0.02_265)] shadow-[0_0_60px_-10px_oklch(0.78_0.17_165/0.35)] transition hover:-translate-y-px"
            >
              Start Diagnostic <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="https://github.com/Omkarkele2006/SciSleuth"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-white/90 transition hover:bg-white/10"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.185 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.026 2.747-1.026.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.338 4.695-4.566 4.944.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.744 0 .267.18.578.688.48C19.138 20.203 22 16.447 22 12.021 22 6.484 17.523 2 12 2z" />
              </svg>
              View on GitHub
            </Link>
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
    </div>
  );
}
