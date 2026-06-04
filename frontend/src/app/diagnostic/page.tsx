"use client";

import { useState } from "react";

import QuestionCard from "@/components/QuestionCard";
import { questions } from "@/data/questions";

export default function DiagnosticPage() {
    const [currentQuestionIndex, setCurrentQuestionIndex] =
        useState(0);
    const [answers, setAnswers] = useState<
        Record<number, number>
    >({});
    const currentQuestion =
        questions[currentQuestionIndex];

    const handleNext = () => {
        if (
            currentQuestionIndex <
            questions.length - 1
        ) {
            setCurrentQuestionIndex(
                currentQuestionIndex + 1
            );
        } else {
            console.log("Answers:", answers);
        }
    };
    const handleSelectAnswer = (
        optionIndex: number
    ) => {
        setAnswers({
            ...answers,
            [currentQuestion.id]: optionIndex,
        });
    };
    const isFinished =
        currentQuestionIndex ===
        questions.length - 1;
    return (
        <main className="min-h-screen flex flex-col items-center justify-center gap-6">
            <QuestionCard
                question={currentQuestion.question}
                options={currentQuestion.options}
                selectedOption={
                    answers[currentQuestion.id] ?? null
                }
                onSelect={handleSelectAnswer}
            />

            <button disabled={
                answers[currentQuestion.id] === undefined}
                onClick={handleNext}
                className="px-6 py-3 bg-black text-white rounded-lg disabled:opacity-50"
            >
                {isFinished ? "Finish" : "Next"}
            </button>
        </main>
    );
}