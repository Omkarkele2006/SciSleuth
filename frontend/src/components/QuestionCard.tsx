"use client";

import { useState } from "react";

type QuestionCardProps = {
  question: string;
  options: string[];
};

export default function QuestionCard({
  question,
  options,
}: QuestionCardProps) {
  const [selectedOption, setSelectedOption] =
    useState<number | null>(null);

  return (
    <div className="border rounded-lg p-6 max-w-xl w-full">
      <h2 className="text-xl font-semibold mb-4">
        {question}
      </h2>

      <div className="space-y-2">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => setSelectedOption(index)}
            className={`w-full text-left border rounded p-3 ${
              selectedOption === index
                ? "bg-blue-600 text-white"
                : ""
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}