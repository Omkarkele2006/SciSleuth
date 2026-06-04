"use client";

import { useEffect, useState } from "react";
import { Misconception } from "@/types/misconception";

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
        <main className="min-h-screen flex flex-col items-center justify-center gap-4">
            <h1 className="text-4xl font-bold">
                Diagnostic Results
            </h1>

            {misconceptions.length === 0 ? (
                <p>No misconceptions detected.</p>
            ) : (
                misconceptions.map(
                    (misconception) => (
                        <div
                            key={misconception.code}
                            className="border rounded-lg p-4 w-96 space-y-2"
                        >
                            <h2 className="font-bold text-lg">
                                {misconception.name}
                            </h2>

                            <p>
                                {misconception.description}
                            </p>

                            <p className="text-sm text-gray-500">
                                Broken Concept:{" "}
                                {misconception.brokenConcept}
                            </p>
                        </div>
                    )
                )
            )}
        </main>
    );
}