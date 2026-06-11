"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Brain,
  Activity,
  Calendar,
  AlertTriangle,
  ArrowLeft,
} from "lucide-react";

import { supabase } from "@/lib/supabase";

type Misconception = {
  code: string;
  name: string;
  description: string;
  brokenConcept: string;
  graphNodeId: string;
};

type Attempt = {
  id: string;
  graph_health: number;
  misconception_count: number;
  misconceptions: Misconception[];
  answers: Record<string, number>;
  created_at: string;
};

export default function AttemptPage() {
  const params = useParams();
  const router = useRouter();

  const [loading, setLoading] =
    useState(true);

  const [attempt, setAttempt] =
    useState<Attempt | null>(null);

  useEffect(() => {
    async function loadAttempt() {
      const { data, error } =
        await supabase
          .from("attempts")
          .select("*")
          .eq("id", params.id)
          .single();

      if (error || !data) {
        router.push("/profile");
        return;
      }

      setAttempt(data);
      setLoading(false);
    }

    loadAttempt();
  }, [params.id, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#020817] text-white">
        Loading Attempt...
      </div>
    );
  }

  if (!attempt) return null;

  return (
    <main className="min-h-screen bg-[#020817] text-slate-100">

      {/* Header */}

      <header className="border-b border-white/10 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">

          <Link
            href="/profile"
            className="inline-flex items-center gap-2 text-slate-300 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>

          <Link
            href="/"
            className="flex items-center gap-2"
          >
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
          </Link>

        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-16">

        {/* Hero */}

        <div className="mb-12">

          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 px-4 py-2 text-sm text-emerald-300">
            Attempt Analysis
          </div>

          <h1 className="text-6xl font-bold">
            Attempt{" "}
            <span className="text-emerald-400">
              Report
            </span>
          </h1>

          <p className="mt-4 text-slate-400">
            Detailed breakdown of your diagnostic attempt.
          </p>

        </div>

        {/* Metrics */}

        <div className="mb-10 grid gap-6 md:grid-cols-3">

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <Activity className="mb-4 text-emerald-400" />

            <h3 className="text-4xl font-bold">
              {attempt.graph_health}%
            </h3>

            <p className="text-slate-400">
              Graph Health
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <Brain className="mb-4 text-emerald-400" />

            <h3 className="text-4xl font-bold">
              {attempt.misconception_count}
            </h3>

            <p className="text-slate-400">
              Misconceptions
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <Calendar className="mb-4 text-emerald-400" />

            <p className="font-semibold">
              {new Date(
                attempt.created_at
              ).toLocaleString()}
            </p>

            <p className="text-slate-400">
              Attempt Date
            </p>
          </div>

        </div>

        {/* Misconceptions */}

        <div className="mb-10 rounded-3xl border border-white/10 bg-white/5 p-8">

          <h2 className="mb-6 text-3xl font-bold">
            Detected Misconceptions
          </h2>

          <div className="space-y-4">

            {attempt.misconceptions.map(
              (m) => (
                <div
                  key={m.code}
                  className="rounded-2xl border border-red-500/20 bg-red-500/5 p-5"
                >
                  <div className="mb-3 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-400" />

                    <h3 className="font-semibold">
                      {m.name}
                    </h3>
                  </div>

                  <p className="text-sm text-slate-300">
                    {m.description}
                  </p>

                  <p className="mt-2 text-sm text-emerald-300">
                    Broken Concept: {m.brokenConcept}
                  </p>

                </div>
              )
            )}

            {attempt.misconceptions.length ===
              0 && (
              <p className="text-emerald-400">
                No misconceptions detected.
              </p>
            )}

          </div>

        </div>

        {/* Answers */}

        <div className="rounded-3xl border border-white/10 bg-white/5 p-8">

          <h2 className="mb-6 text-3xl font-bold">
            Submitted Answers
          </h2>

          <div className="space-y-3">

            {Object.entries(
              attempt.answers || {}
            ).map(
              ([question, answer]) => (
                <div
                  key={question}
                  className="flex items-center justify-between rounded-xl border border-white/10 p-4"
                >
                  <span>
                    Question {question}
                  </span>

                  <span className="text-emerald-400">
                    Selected Option{" "}
                    {String.fromCharCode(
                      65 + Number(answer)
                    )}
                  </span>

                </div>
              )
            )}

          </div>

        </div>

      </section>
    </main>
  );
}