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
import { questions } from "@/data/questions";

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

                {/* Question Review */}

                <div className="rounded-3xl border border-white/10 bg-white/5 p-8">

                    <h2 className="mb-6 text-3xl font-bold">
                        Question Review
                    </h2>
                           
                    <div className="space-y-6">

                        {questions.map((question) => {

                            const selectedAnswer = Number(
                                attempt.answers?.[
                                question.id.toString()
                                ]
                            );

                            console.log({
                                questionId: question.id,
                                selectedAnswer,
                                correctAnswer:
                                    question.correctAnswer,
                            });

                            const isCorrect =
                                selectedAnswer ===
                                question.correctAnswer;

                            const misconceptionCode =
                                !isCorrect
                                    ? question.misconceptions[
                                    selectedAnswer
                                    ]
                                    : null;

                            const misconception =
                                attempt.misconceptions.find(
                                    (m) =>
                                        m.code ===
                                        misconceptionCode
                                );

                            return (
                                <div
                                    key={question.id}
                                    className={`rounded-2xl border p-6 ${isCorrect
                                        ? "border-emerald-500/20 bg-emerald-500/5"
                                        : "border-red-500/20 bg-red-500/5"
                                        }`}
                                >
                                    <div className="mb-4 flex items-center justify-between">

                                        <h3 className="text-lg font-semibold">
                                            Question {question.id}
                                        </h3>

                                        <span
                                            className={`rounded-full px-3 py-1 text-xs font-medium ${isCorrect
                                                ? "bg-emerald-500/10 text-emerald-300"
                                                : "bg-red-500/10 text-red-300"
                                                }`}
                                        >
                                            {isCorrect
                                                ? "✓ Correct"
                                                : "✗ Incorrect"}
                                        </span>

                                    </div>

                                    <p className="mb-4 text-slate-200">
                                        {question.question}
                                    </p>

                                    <div className="space-y-2 text-sm">

                                        <p>
                                            <span className="text-slate-400">
                                                Your Answer:
                                            </span>{" "}
                                            <span className="text-emerald-300">
                                                {
                                                    question.options[
                                                    selectedAnswer
                                                    ]
                                                }
                                            </span>
                                        </p>

                                        <p>
                                            <span className="text-slate-400">
                                                Correct Answer:
                                            </span>{" "}
                                            <span className="text-emerald-300">
                                                {
                                                    question.options[
                                                    question.correctAnswer
                                                    ]
                                                }
                                            </span>
                                        </p>

                                        {!isCorrect &&
                                            misconception && (
                                                <div className="mt-4 rounded-xl border border-red-500/20 bg-red-500/5 p-4">

                                                    <p className="font-medium text-red-300">
                                                        Triggered Misconception
                                                    </p>

                                                    <p className="mt-2">
                                                        {misconception.name}
                                                    </p>

                                                    <p className="mt-1 text-sm text-slate-400">
                                                        {misconception.description}
                                                    </p>

                                                    <p className="mt-2 text-sm text-emerald-300">
                                                        Broken Concept:{" "}
                                                        {
                                                            misconception.brokenConcept
                                                        }
                                                    </p>

                                                </div>
                                            )}

                                    </div>
                                </div>
                            );
                        })}

                    </div>

                </div>

            </section>
        </main>
    );
}