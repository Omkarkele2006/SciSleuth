"use client";

import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import { questions } from "@/data/questions";
import { evaluateDiagnostic } from "@/lib/evaluateDiagnostic";

export default function DiagnosticPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const currentQuestion = questions[currentQuestionIndex];
  const router = useRouter();
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const handleNext = async () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      const misconceptions =
        evaluateDiagnostic(
          questions,
          answers
        );

      localStorage.setItem(
        "misconceptions",
        JSON.stringify(misconceptions)
      );

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const totalConcepts = 5;

        const graphHealth = Math.round(
          ((totalConcepts -
            misconceptions.length) /
            totalConcepts) *
          100
        );

        await supabase
          .from("attempts")
          .insert({
            user_id: user.id,
            graph_health: graphHealth,
            misconception_count:
              misconceptions.length,
            misconceptions,
          });
      }

      router.push("/results");
    }
  };

  const handleSelectAnswer = (optionIndex: number) => {
    setAnswers({ ...answers, [currentQuestion.id]: optionIndex });
  };

  const isFinished = currentQuestionIndex === questions.length - 1;
  const total = questions.length;
  const answered = Object.keys(answers).length;
  const progress = Math.round(((currentQuestionIndex + (answers[currentQuestion.id] !== undefined ? 1 : 0)) / total) * 100);
  const remainingMin = Math.max(1, Math.ceil((total - currentQuestionIndex) * 0.5));
  const selected = answers[currentQuestion.id];
  const letters = ["A", "B", "C", "D", "E", "F"];

  const analysisSteps = [
    { label: "Concept Mapping", desc: "Linking answers to core concepts", active: true },
    { label: "Misconception Detection", desc: "Surfacing reasoning gaps", active: answered > 0 },
    { label: "Knowledge Graph Update", desc: "Rebuilding your concept network", active: answered > 1 },
  ];
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        router.replace("/login");
      }
    });
  }, [router]);
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#020817] text-white antialiased">
      {/* Ambient gradients */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-130 w-130 -translate-x-1/2 rounded-full bg-emerald-500/20 blur-[140px]" />
        <div className="absolute top-1/3 -right-32 h-105 w-105 rounded-full bg-teal-500/15 blur-[140px]" />
        <div className="absolute bottom-0 -left-32 h-105 w-105 rounded-full bg-emerald-700/10 blur-[140px]" />
        <div
          className="absolute inset-0 opacity-4"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col">
        {/* HEADER */}
        <header className="border-b border-white/10 backdrop-blur-xl">
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
                Diagnostic in progress
              </div>

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

        <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-12 md:py-16">
          {/* HERO */}
          <section className="mb-12 text-center">
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-4 py-1.5 text-xs font-medium tracking-wide text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Cognitive Diagnostic Session
            </div>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight md:text-6xl">
              Understand how you <span className="bg-linear-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent">think.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base text-white/60 md:text-lg">
              SciSleuth identifies misconceptions behind your answers and maps them to your knowledge graph.
            </p>
          </section>

          {/* PROGRESS */}
          <section className="mb-8 rounded-2xl border border-white/10 bg-white/3 p-6 backdrop-blur-xl">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <div className="text-xs uppercase tracking-widest text-white/40">Progress</div>
                <div className="mt-1 text-lg font-medium">
                  Question <span className="text-emerald-300">{currentQuestionIndex + 1}</span>
                  <span className="text-white/40"> of {total}</span>
                </div>
              </div>
              <div className="flex items-center gap-6 text-sm">
                <div className="text-white/60">
                  <span className="font-semibold text-white">{progress}%</span> complete
                </div>
                <div className="hidden h-4 w-px bg-white/10 md:block" />
                <div className="text-white/50">~{remainingMin} min remaining</div>
              </div>
            </div>
            <div className="mt-5 h-2 w-full overflow-hidden rounded-full bg-white/6">
              <div
                className="h-full rounded-full bg-linear-to-r from-emerald-400 via-emerald-300 to-teal-300 shadow-[0_0_20px_rgba(16,185,129,0.5)] transition-all duration-700 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="mt-4 flex gap-1.5">
              {questions.map((_, i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 rounded-full transition-all ${i < currentQuestionIndex
                    ? "bg-emerald-400/70"
                    : i === currentQuestionIndex
                      ? "bg-emerald-300"
                      : "bg-white/10"
                    }`}
                />
              ))}
            </div>
          </section>

          {/* QUESTION PANEL */}
          <section className="relative mb-6 overflow-hidden rounded-3xl border border-white/10 bg-white/4 p-8 backdrop-blur-xl md:p-10">
            <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-400/10 text-sm font-semibold text-emerald-300">
                  {String(currentQuestionIndex + 1).padStart(2, "0")}
                </div>
                <div className="text-xs uppercase tracking-widest text-white/40">Diagnostic Prompt</div>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-3 py-1 text-[11px] font-medium text-emerald-300">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                </svg>
                AI Diagnostic
              </div>
            </div>

            <h2 className="mt-6 text-2xl font-medium leading-snug tracking-tight text-white md:text-3xl">
              {currentQuestion.question}
            </h2>

            {/* ANSWER OPTIONS */}
            <div className="mt-8 grid gap-3">
              {currentQuestion.options.map((option, index) => {
                const isSelected = selected === index;
                return (
                  <button
                    key={index}
                    onClick={() => handleSelectAnswer(index)}
                    className={`group relative flex w-full items-center gap-4 overflow-hidden rounded-2xl border p-5 text-left transition-all duration-300 ${isSelected
                      ? "border-emerald-400/50 bg-emerald-400/8 shadow-[0_0_30px_rgba(16,185,129,0.25)]"
                      : "border-white/10 bg-white/2 hover:border-white/20 hover:bg-white/5"
                      }`}
                  >
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border text-sm font-semibold transition-all ${isSelected
                        ? "border-emerald-400/50 bg-emerald-400/20 text-emerald-200"
                        : "border-white/10 bg-white/4 text-white/60 group-hover:border-white/20 group-hover:text-white/80"
                        }`}
                    >
                      {letters[index]}
                    </div>
                    <div className={`flex-1 text-base ${isSelected ? "text-white" : "text-white/80"}`}>
                      {option}
                    </div>
                    <div
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-all ${isSelected
                        ? "border-emerald-300 bg-emerald-400/80 text-[#020817]"
                        : "border-white/15 bg-transparent text-transparent"
                        }`}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          {/* AI ANALYSIS PREVIEW */}
          <section className="mb-8 rounded-2xl border border-white/10 bg-white/3 p-6 backdrop-blur-xl">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-emerald-400/20 bg-emerald-400/10">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgb(110,231,183)" strokeWidth="2">
                    <path d="M12 2a10 10 0 100 20 10 10 0 000-20z" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-medium text-white">Live Analysis</div>
                  <div className="text-xs text-white/50">
                    SciSleuth is building a model of your understanding as you answer.
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {analysisSteps.map((step) => (
                <div
                  key={step.label}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/2 p-4"
                >
                  <span className="relative flex h-2.5 w-2.5">
                    {step.active && (
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                    )}
                    <span
                      className={`relative inline-flex h-2.5 w-2.5 rounded-full ${step.active ? "bg-emerald-400" : "bg-white/20"
                        }`}
                    />
                  </span>
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-white/90">{step.label}</div>
                    <div className="truncate text-xs text-white/45">{step.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* NAVIGATION */}
          <section className="flex flex-col-reverse items-stretch justify-between gap-4 md:flex-row md:items-center">
            <div className="text-xs text-white/40">
              Take your time — accuracy of reasoning matters more than speed.
            </div>
            <button
              disabled={answers[currentQuestion.id] === undefined}
              onClick={handleNext}
              className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-2xl bg-linear-to-r from-emerald-400 to-teal-300 px-7 py-4 text-sm font-semibold text-[#02201a] shadow-[0_0_40px_rgba(16,185,129,0.35)] transition-all hover:shadow-[0_0_60px_rgba(16,185,129,0.55)] disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
            >
              <span>{isFinished ? "Generate Diagnostic Report" : "Next Analysis"}</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                className="transition-transform group-hover:translate-x-1"
              >
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </button>
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
