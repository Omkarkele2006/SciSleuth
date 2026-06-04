"use client";

import { useEffect, useState } from "react";

import { nodes } from "@/data/graph";
import { evaluateGraphHealth } from "@/lib/evaluateGraphHealth";
import { Misconception } from "@/types/misconception";
import GraphCanvas from "@/components/GraphCanvas";
export default function GraphPage() {
    const [brokenNodes, setBrokenNodes] =
        useState<string[]>([]);

    useEffect(() => {
        const stored =
            localStorage.getItem(
                "misconceptions"
            );

        if (!stored) return;

        const misconceptions: Misconception[] =
            JSON.parse(stored);

        const result =
            evaluateGraphHealth(
                misconceptions
            );

        setBrokenNodes(result);
    }, []);

    return (
        <main className="min-h-screen flex flex-col items-center justify-center gap-8 p-8">
            <h1 className="text-4xl font-bold">
                Knowledge Graph
            </h1>

            <GraphCanvas
                brokenNodes={brokenNodes}
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