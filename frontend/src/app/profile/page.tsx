"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ADMIN_EMAILS } from "@/lib/admin";
import Image from "next/image";
import {
    User,
    Activity,
    Brain,
    Calendar,
    LogOut,
} from "lucide-react";

import { supabase } from "@/lib/supabase";

type Attempt = {
    id: string;
    graph_health: number;
    misconception_count: number;
    created_at: string;
};

export default function ProfilePage() {
    const router = useRouter();

    const [loading, setLoading] = useState(true);

    const [fullName, setFullName] =
        useState("");

    const [email, setEmail] =
        useState("");

    const [attempts, setAttempts] =
        useState<Attempt[]>([]);

    const handleLogout = async () => {
        localStorage.removeItem("misconceptions");
        localStorage.removeItem("original_misconceptions");
        localStorage.removeItem("latest_attempt_id");
        localStorage.removeItem("recovery_authorized");
        await supabase.auth.signOut();
        router.push("/login");
    };

    useEffect(() => {
        async function loadProfile() {
            const {
                data: { user },
            } = await supabase.auth.getUser();

            if (!user) {
                router.replace("/login");
                return;
            }

            setEmail(user.email || "");
            if (
                user.email &&
                ADMIN_EMAILS.includes(
                    user.email.toLowerCase()
                )
            ) {
                router.replace("/teacher");
                return;
            }
            const { data: profile } =
                await supabase
                    .from("profiles")
                    .select("*")
                    .eq("id", user.id)
                    .single();

            if (profile) {
                setFullName(profile.full_name);
            }

            const { data: userAttempts } =
                await supabase
                    .from("attempts")
                    .select("*")
                    .eq("user_id", user.id)
                    .order("created_at", {
                        ascending: false,
                    });

            if (userAttempts) {
                setAttempts(userAttempts);
            }

            setLoading(false);
        }

        loadProfile();
    }, [router]);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#020817] text-white">
                Loading Profile...
            </div>
        );
    }

    const totalAttempts =
        attempts.length;

    const averageHealth =
        totalAttempts > 0
            ? Math.round(
                attempts.reduce(
                    (sum, a) =>
                        sum + a.graph_health,
                    0
                ) / totalAttempts
            )
            : 0;

    const bestHealth =
        totalAttempts > 0
            ? Math.max(
                ...attempts.map(
                    (a) => a.graph_health
                )
            )
            : 0;

    return (
        <main className="min-h-screen overflow-hidden bg-[#020817] text-slate-100">

            {/* Header */}

            <header className="border-b border-white/10 backdrop-blur-xl">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">

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

                    <div className="flex items-center gap-3">

                        <Link
                            href="/results"
                            className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 px-4 py-2 text-sm text-emerald-300 hover:bg-emerald-500/10"
                        >
                            Results
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

            <section className="mx-auto max-w-6xl px-6 py-16">

                <div className="mb-12">
                    <h1 className="text-6xl font-bold">
                        Learner{" "}
                        <span className="text-emerald-400">
                            Profile
                        </span>
                    </h1>

                    <p className="mt-4 text-slate-400">
                        Track your diagnostic
                        progress and conceptual
                        growth.
                    </p>
                </div>

                {/* Profile Card */}

                <div className="mb-10 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">

                    <div className="flex items-center gap-4">

                        <div className="rounded-2xl bg-emerald-500/10 p-4">
                            <User className="h-8 w-8 text-emerald-400" />
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold">
                                {fullName}
                            </h2>

                            <p className="text-slate-400">
                                {email}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Metrics */}

                <div className="mb-10 grid gap-6 md:grid-cols-3">

                    <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                        <Activity className="mb-4 text-emerald-400" />
                        <h3 className="text-4xl font-bold">
                            {totalAttempts}
                        </h3>
                        <p className="text-slate-400">
                            Total Attempts
                        </p>
                    </div>

                    <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                        <Brain className="mb-4 text-emerald-400" />
                        <h3 className="text-4xl font-bold">
                            {averageHealth}%
                        </h3>
                        <p className="text-slate-400">
                            Average Graph Health
                        </p>
                    </div>

                    <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                        <Calendar className="mb-4 text-emerald-400" />
                        <h3 className="text-4xl font-bold">
                            {bestHealth}%
                        </h3>
                        <p className="text-slate-400">
                            Best Score
                        </p>
                    </div>

                </div>

                {/* Attempt History */}

                <div className="rounded-3xl border border-white/10 bg-white/5 p-8">

                    <h2 className="mb-6 text-3xl font-bold">
                        Attempt History
                    </h2>

                    <div className="space-y-4">

                        {attempts.map(
                            (attempt, index) => (
                                <div
                                    key={attempt.id}
                                    onClick={() =>
                                        router.push(
                                            `/attempt/${attempt.id}`
                                        )
                                    }
                                    className="cursor-pointer rounded-2xl border border-white/10 p-5 transition hover:border-emerald-400/30 hover:bg-white/5"
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
                                                Graph Health:{" "}
                                                <span className="text-emerald-400">
                                                    {
                                                        attempt.graph_health
                                                    }
                                                    %
                                                </span>
                                            </p>

                                            <p className="text-slate-400">
                                                Misconceptions:{" "}
                                                {
                                                    attempt.misconception_count
                                                }
                                            </p>

                                        </div>
                                    </div>
                                </div>
                            )
                        )}

                        {attempts.length === 0 && (
                            <p className="text-slate-400">
                                No attempts yet.
                            </p>
                        )}

                    </div>
                </div>

            </section>
        </main>
    );
}