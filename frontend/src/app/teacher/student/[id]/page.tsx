"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Brain,
  Activity,
} from "lucide-react";

import { supabase } from "@/lib/supabase";

type Attempt = {
  id: string;
  graph_health: number;
  misconception_count: number;
  created_at: string;
};

export default function TeacherStudentPage() {
  const params = useParams();
  const router = useRouter();

  const [loading, setLoading] =
    useState(true);

  const [studentName, setStudentName] =
    useState("");

  const [attempts, setAttempts] =
    useState<Attempt[]>([]);

  useEffect(() => {
    async function loadData() {
      const userId =
        params.id as string;

      const { data: profile } =
        await supabase
          .from("profiles")
          .select("*")
          .eq("id", userId)
          .single();

      if (profile) {
        setStudentName(
          profile.full_name
        );
      }

      const {
        data: studentAttempts,
      } = await supabase
        .from("attempts")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", {
          ascending: false,
        });

      if (studentAttempts) {
        setAttempts(
          studentAttempts
        );
      }

      setLoading(false);
    }

    loadData();
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#020817] text-white">
        Loading Student...
      </div>
    );
  }

  const avgHealth =
    attempts.length > 0
      ? Math.round(
          attempts.reduce(
            (sum, a) =>
              sum +
              a.graph_health,
            0
          ) / attempts.length
        )
      : 0;

  return (
    <main className="min-h-screen bg-[#020817] text-slate-100">

      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">

          <Link
            href="/teacher"
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

        <h1 className="text-6xl font-bold">
          Student{" "}
          <span className="text-emerald-400">
            Analytics
          </span>
        </h1>

        <p className="mt-4 text-slate-400">
          {studentName}
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <Brain className="mb-4 text-emerald-400" />

            <h3 className="text-4xl font-bold">
              {attempts.length}
            </h3>

            <p className="text-slate-400">
              Attempts
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <Activity className="mb-4 text-emerald-400" />

            <h3 className="text-4xl font-bold">
              {avgHealth}%
            </h3>

            <p className="text-slate-400">
              Average Graph Health
            </p>
          </div>

        </div>

        <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-8">

          <h2 className="mb-6 text-3xl font-bold">
            Attempt History
          </h2>

          <div className="space-y-4">

            {attempts.map(
              (
                attempt,
                index
              ) => (
                <div
                  key={attempt.id}
                  onClick={() =>
                    router.push(
                      `/attempt/${attempt.id}`
                    )
                  }
                  className="cursor-pointer rounded-2xl border border-white/10 p-5 transition hover:border-emerald-500/40 hover:bg-white/5"
                >
                  <div className="flex items-center justify-between">

                    <div>
                      <h3 className="font-semibold">
                        Attempt #
                        {attempts.length -
                          index}
                      </h3>

                      <p className="text-sm text-slate-400">
                        {new Date(
                          attempt.created_at
                        ).toLocaleString()}
                      </p>
                    </div>

                    <div className="text-right">

                      <p>
                        Health:
                        <span className="ml-2 text-emerald-400">
                          {
                            attempt.graph_health
                          }
                          %
                        </span>
                      </p>

                      <p className="text-slate-400">
                        Misconceptions:
                        {" "}
                        {
                          attempt.misconception_count
                        }
                      </p>

                    </div>

                  </div>
                </div>
              )
            )}

          </div>

        </div>

      </section>

    </main>
  );
}