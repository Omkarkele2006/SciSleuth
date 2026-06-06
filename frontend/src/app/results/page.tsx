"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { Misconception } from "@/types/misconception";
import { repairs } from "@/data/repairs";

export default function ResultsPage() {
  const [misconceptions, setMisconceptions] =
    useState<Misconception[]>([]);

  const [aiExplanations, setAiExplanations] =
    useState<
      Record<
        string,
        {
          explanation: string;
          mission: string[];
        }
      >
    >({});
  const [loadingCode, setLoadingCode] =
    useState<string | null>(null);
  const totalConcepts = 5;

  const graphHealth = Math.round(
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
  async function generateExplanation(
    misconception: Misconception
  ) {
    setLoadingCode(
      misconception.code
    );

    try {
      const response =
        await fetch(
          "/api/explain",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              misconceptionName:
                misconception.name,
              brokenConcept:
                misconception.brokenConcept,
              description:
                misconception.description,
            }),
          }
        );

      const data =
        await response.json();

      setAiExplanations(
        (prev) => ({
          ...prev,
          [misconception.code]: {
            explanation:
              data.explanation ??
              "Unable to generate explanation.",

            mission:
              data.mission ?? [],
          },
        })
      );
    } catch {
      setAiExplanations(
        (prev) => ({
          ...prev,
          [misconception.code]: {
            explanation:
              "Unable to generate explanation.",

            mission: [],
          },
        })
      );
    }

    setLoadingCode(null);
  }
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

    if (
      parsedMisconceptions.length > 0
    ) {
      generateExplanation(
        parsedMisconceptions[0]
      );
    }

    async function generateExplanation(
      misconception: Misconception
    ) {
      try {
        const response =
          await fetch(
            "/api/explain",
            {
              method: "POST",
              headers: {
                "Content-Type":
                  "application/json",
              },
              body: JSON.stringify({
                misconceptionName:
                  misconception.name,
                brokenConcept:
                  misconception.brokenConcept,
                description:
                  misconception.description,
              }),
            }
          );

        const data =
          await response.json();

        setAiExplanations(
          (prev) => ({
            ...prev,
            [misconception.code]: {
              explanation:
                data.explanation ??
                "Unable to generate explanation.",

              mission:
                data.mission ?? [],
            },
          })
        );
      } catch {
        setAiExplanations(
          (prev) => ({
            ...prev,
            [misconception.code]: {
              explanation:
                "Unable to generate explanation.",

              mission: [],
            },
          })
        );
      }
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

        <div className="flex justify-between mt-4">
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
                className="border rounded-lg p-6 w-full max-w-2xl space-y-4"
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

                <div className="border-t pt-4">
                  <h3 className="font-semibold mb-2">
                    AI Guidance
                  </h3>

                  {aiExplanations[
                    misconception.code
                  ] ? (
                    <>
                      <p className="text-sm text-zinc-300">
                        {
                          aiExplanations[
                            misconception.code
                          ].explanation
                        }
                      </p>

                      <div className="mt-4">
                        <h4 className="font-medium mb-2">
                          AI Recovery Mission
                        </h4>

                        <ul className="list-disc pl-5 space-y-2 text-sm text-zinc-300">
                          {aiExplanations[
                            misconception.code
                          ].mission.map(
                            (
                              step,
                              index
                            ) => (
                              <li
                                key={index}
                              >
                                {step}
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    </>
                  ) : (
                    <button
                      onClick={() =>
                        generateExplanation(
                          misconception
                        )
                      }
                      disabled={
                        loadingCode ===
                        misconception.code
                      }
                      className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                    >
                      {loadingCode ===
                        misconception.code
                        ? "Generating..."
                        : "Generate AI Guidance"}
                    </button>
                  )}
                </div>
                {repair && (
                  <div className="border-t pt-4">
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