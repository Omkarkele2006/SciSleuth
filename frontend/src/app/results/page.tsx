"use client";

import { useEffect, useState } from "react";

import { Misconception } from "@/types/misconception";
import { repairs } from "@/data/repairs";
import Link from "next/link";

export default function ResultsPage() {
    const [misconceptions, setMisconceptions] =
        useState<Misconception[]>([]);
    const totalConcepts = 5;

    const graphHealth =
        Math.round(
            ((totalConcepts -
                misconceptions.length) /
                totalConcepts) *
            100
        );

    const riskLevel =
        misconceptions.length >= 4
            ? "High"
            : misconceptions.length >= 2
                ? "Moderate"
                : "Low";
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
            <div className="border rounded-lg p-4 w-125">
                <div className="flex justify-between">
                    <span>
                        Detected Misconceptions
                    </span>

                    <strong>
                        {misconceptions.length}
                    </strong>
                </div>

                <div className="mt-4">
                    <div className="flex justify-between mb-2">
                        <span>Graph Health</span>

                        <strong>
                            {graphHealth}%
                        </strong>
                    </div>

                    <div className="w-full bg-zinc-800 rounded-full h-4">
                        <div
                            className="bg-green-500 h-4 rounded-full"
                            style={{
                                width: `${graphHealth}%`,
                            }}
                        />
                    </div>
                </div>

                <div className="flex justify-between mt-2">
                    <span>Risk Level</span>

                    <strong>
                        {riskLevel}
                    </strong>
                </div>
            </div>
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