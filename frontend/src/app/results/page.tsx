"use client";

import { useEffect, useState } from "react";

export default function ResultsPage() {
  const [misconceptions, setMisconceptions] =
    useState<string[]>([]);

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
              key={misconception}
              className="border rounded-lg p-4 w-96"
            >
              {misconception}
            </div>
          )
        )
      )}
    </main>
  );
}