"use client";

import { useEffect, useState } from "react";

import { Misconception } from "@/types/misconception";
import { repairs } from "@/data/repairs";
import Link from "next/link";

export default function ResultsPage() {
    const [misconceptions, setMisconceptions] =
        useState<Misconception[]>([]);

    useEffect(() => {
        const stored =
            localStorage.getItem(
                "misconceptions"
            );

        if (stored) {
            setMisconceptions(
                JSON.parse(stored)
            );
        }
    }, []);

    return (
        <main className="min-h-screen flex flex-col items-center gap-6 p-8">
            <h1 className="text-4xl font-bold">
                Diagnostic Results
            </h1>

            {misconceptions.length === 0 ? (
                <p>No misconceptions detected.</p>
            ) : (
                misconceptions.map(
                    (misconception) => {
                        const repair =
                            repairs[
                            misconception.code
                            ];

                        return (
                            <div
                                key={
                                    misconception.code
                                }
                                className="border rounded-lg p-6 w-full max-w-2xl space-y-3"
                            >
                                <h2 className="font-bold text-xl">
                                    {misconception.name}
                                </h2>

                                <p>
                                    {
                                        misconception.description
                                    }
                                </p>

                                <p className="text-sm text-gray-400">
                                    Broken Concept:{" "}
                                    {
                                        misconception.brokenConcept
                                    }
                                </p>

                                {repair && (
                                    <div className="mt-4 border-t pt-4">
                                        <h3 className="font-semibold">
                                            Repair Path
                                        </h3>

                                        <p className="font-medium mt-2">
                                            {repair.title}
                                        </p>

                                        <p className="text-sm mt-2">
                                            {
                                                repair.explanation
                                            }
                                        </p>
                                    </div>
                                )}
                            </div>
                        );
                    }
                )
            )}
            <div className="mt-8">
                <Link
                    href="/graph"
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    View Knowledge Graph
                </Link>
            </div>
        </main>
    );
}