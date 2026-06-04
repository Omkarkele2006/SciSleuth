"use client";

import { useEffect, useState } from "react";

import { nodes } from "@/data/graph";
import { evaluateGraphHealth } from "@/lib/evaluateGraphHealth";
import { Misconception } from "@/types/misconception";
import GraphCanvas from "@/components/GraphCanvas";

export default function GraphPage() {
    const [brokenNodes, setBrokenNodes] =
        useState<string[]>([]);
    const [misconceptions, setMisconceptions] =
        useState<Misconception[]>([]);
    useEffect(() => {
        const stored =
            localStorage.getItem(
                "misconceptions"
            );

        if (!stored) return;

        const parsedMisconceptions:
            Misconception[] =
            JSON.parse(stored);

        setMisconceptions(
            parsedMisconceptions
        );

        const result =
            evaluateGraphHealth(
                parsedMisconceptions
            );

        setBrokenNodes(result);
    }, []);

    const totalNodes =
        nodes.length;

    const brokenCount =
        brokenNodes.length;

    const healthyCount =
        totalNodes - brokenCount;

    const graphHealth =
        Math.round(
            (healthyCount /
                totalNodes) *
            100
        );

    return (
        <main className="min-h-screen flex flex-col items-center gap-8 p-8">
            <h1 className="text-4xl font-bold">
                Knowledge Graph
            </h1>

            <div className="flex gap-8 text-lg">
                <div>
                    Broken Concepts:{" "}
                    <strong>
                        {brokenCount}
                    </strong>
                </div>

                <div>
                    Healthy Concepts:{" "}
                    <strong>
                        {healthyCount}
                    </strong>
                </div>

                <div>
                    Total Concepts:{" "}
                    <strong>
                        {totalNodes}
                    </strong>
                </div>
            </div>

            <div className="w-150 border rounded-lg p-4">
                <div className="flex justify-between mb-2">
                    <span>
                        Concept Health
                    </span>

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

            <div className="text-center max-w-2xl text-zinc-400">
                Red nodes represent concepts affected by
                detected misconceptions. <br />
                Green nodes represent concepts currently understood
                correctly.
            </div>

            <GraphCanvas
                brokenNodes={brokenNodes}
                misconceptions={misconceptions}
            />

            <div className="flex gap-6">
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-500 rounded-full" />
                    <span>Healthy</span>
                </div>

                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-500 rounded-full" />
                    <span>Broken</span>
                </div>
            </div>
        </main>
    );
}