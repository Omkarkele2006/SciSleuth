"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
    Users,
    Activity,
    Brain,
    AlertTriangle,
    ArrowLeft,
} from "lucide-react";

import { supabase } from "@/lib/supabase";
import { ADMIN_EMAILS } from "@/lib/admin";

export default function TeacherProfilePage() {
    const router = useRouter();

    const [loading, setLoading] =
        useState(true);
    const [adminName, setAdminName] =
        useState("");
    const [totalStudents, setTotalStudents] =
        useState(0);

    const [totalAttempts, setTotalAttempts] =
        useState(0);

    const [averageHealth, setAverageHealth] =
        useState(0);

    const [topMisconception, setTopMisconception] =
        useState("No data");

    const [studentStats, setStudentStats] =
        useState<any[]>([]);

    const [topMisconceptions, setTopMisconceptions] =
        useState<any[]>([]);

    useEffect(() => {
        async function loadAdminData() {
            const {
                data: { user },
            } = await supabase.auth.getUser();

            if (
                !user ||
                !ADMIN_EMAILS.includes(user.email ?? "")
            ) {
                router.replace("/");
                return;
            }
            const { data: adminProfile } =
                await supabase
                    .from("profiles")
                    .select("full_name")
                    .eq("id", user.id)
                    .single();

            if (adminProfile) {
                setAdminName(
                    adminProfile.full_name
                );}
                const { data: attempts } =
                    await supabase
                        .from("attempts")
                        .select("*");

                const { data: profiles } =
                    await supabase
                        .from("profiles")
                        .select("*");

                if (!attempts) {
                    setLoading(false);
                    return;
                }

                setTotalAttempts(
                    attempts.length
                );

                const users = new Set(
                    attempts.map(
                        (a) => a.user_id
                    )
                );

                setTotalStudents(
                    users.size
                );

                const avg =
                    attempts.length > 0
                        ? Math.round(
                            attempts.reduce(
                                (
                                    sum,
                                    attempt
                                ) =>
                                    sum +
                                    attempt.graph_health,
                                0
                            ) /
                            attempts.length
                        )
                        : 0;

                setAverageHealth(avg);

                const misconceptionCounts:
                    Record<string, number> =
                    {};

                attempts.forEach(
                    (attempt) => {
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
                    }
                );

                const misconceptionArray =
                    Object.entries(
                        misconceptionCounts
                    )
                        .map(
                            ([name, count]) => ({
                                name,
                                count,
                            })
                        )
                        .sort(
                            (a, b) =>
                                b.count - a.count
                        );

                if (
                    misconceptionArray.length >
                    0
                ) {
                    setTopMisconception(
                        misconceptionArray[0]
                            .name
                    );
                }

                setTopMisconceptions(
                    misconceptionArray.slice(
                        0,
                        5
                    )
                );

                const profileMap =
                    Object.fromEntries(
                        (profiles || []).map(
                            (p) => [
                                p.id,
                                p.full_name,
                            ]
                        )
                    );
                const studentMap:
                    Record<
                        string,
                        any
                    > = {};
                    
                attempts.forEach(
                    (attempt) => {
                        const userId =
                            attempt.user_id;

                        if (
                            !studentMap[userId]
                        ) {
                            studentMap[userId] =
                            {
                                userId,
                                fullName:
                                    profileMap[
                                    userId
                                    ] ||
                                    "Unknown Student",
                                attempts: 0,
                                totalHealth: 0,
                                worstHealth:
                                    attempt.graph_health,
                            };
                        }

                        studentMap[
                            userId
                        ].attempts++;

                        studentMap[
                            userId
                        ].totalHealth +=
                            attempt.graph_health;

                        studentMap[
                            userId
                        ].worstHealth =
                            Math.min(
                                studentMap[
                                    userId
                                ].worstHealth,
                                attempt.graph_health
                            );
                    }
                );

                const students =
                    Object.values(
                        studentMap
                    )
                        .map(
                            (
                                student: any
                            ) => ({
                                ...student,
                                averageHealth:
                                    Math.round(
                                        student.totalHealth /
                                        student.attempts
                                    ),
                            })
                        )
                        .sort(
                            (a: any, b: any) =>
                                a.averageHealth -
                                b.averageHealth
                        );

                setStudentStats(
                    students
                );

                setLoading(false);
            }

            loadAdminData();
        }, [router]);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#020817] text-white">
                Loading Intelligence Center...
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-[#020817] text-slate-100">

            <header className="border-b border-white/10">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

                    <Link
                        href="/teacher"
                        className="inline-flex items-center gap-2 text-slate-300 hover:text-white"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Dashboard
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

            <section className="mx-auto max-w-7xl px-6 py-16">

                <h1 className="text-6xl font-bold">
                    Administrator{" "}
                    <span className="text-emerald-400">
                        Intelligence Center
                    </span>
                </h1>
                <p className="mt-3 text-slate-400">
                    Welcome back,{" "}
                    <span className="text-emerald-400 font-medium">
                        {adminName}
                    </span>
                </p>
                <p className="mt-4 text-slate-400">
                    Executive overview of classroom learning health.
                </p>

                <div className="mt-10 grid gap-6 md:grid-cols-4">

                    <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                        <Users className="mb-4 text-emerald-400" />
                        <h3 className="text-4xl font-bold">
                            {totalStudents}
                        </h3>
                        <p className="text-slate-400">
                            Students
                        </p>
                    </div>

                    <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                        <Activity className="mb-4 text-emerald-400" />
                        <h3 className="text-4xl font-bold">
                            {totalAttempts}
                        </h3>
                        <p className="text-slate-400">
                            Attempts
                        </p>
                    </div>

                    <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                        <Brain className="mb-4 text-emerald-400" />
                        <h3 className="text-4xl font-bold">
                            {averageHealth}%
                        </h3>
                        <p className="text-slate-400">
                            Avg Health
                        </p>
                    </div>

                    <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                        <AlertTriangle className="mb-4 text-red-400" />
                        <p className="font-semibold">
                            {topMisconception}
                        </p>
                        <p className="text-slate-400">
                            Top Misconception
                        </p>
                    </div>

                </div>

                {/* Most Struggling Students */}

                <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-8">

                    <h2 className="mb-6 text-3xl font-bold">
                        Most Struggling Students
                    </h2>

                    <div className="space-y-4">

                        {studentStats
                            .slice(0, 5)
                            .map(
                                (
                                    student
                                ) => (
                                    <div
                                        key={
                                            student.userId
                                        }
                                        className="flex items-center justify-between rounded-xl border border-white/10 p-4"
                                    >
                                        <div>
                                            <p className="font-semibold">
                                                {
                                                    student.fullName
                                                }
                                            </p>

                                            <p className="text-sm text-slate-400">
                                                Avg Health:
                                                {" "}
                                                {
                                                    student.averageHealth
                                                }
                                                %
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
                                            View
                                        </button>

                                    </div>
                                )
                            )}

                    </div>

                </div>

                {/* Top Misconceptions */}

                <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-8">

                    <h2 className="mb-6 text-3xl font-bold">
                        Top Classroom Misconceptions
                    </h2>

                    <div className="space-y-4">

                        {topMisconceptions.map(
                            (
                                misconception
                            ) => (
                                <div
                                    key={
                                        misconception.name
                                    }
                                    className="flex items-center justify-between rounded-xl border border-red-500/20 bg-red-500/5 p-4"
                                >
                                    <span>
                                        {
                                            misconception.name
                                        }
                                    </span>

                                    <span className="text-red-300">
                                        {
                                            misconception.count
                                        }{" "}
                                        occurrences
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