import { Question } from "@/types/question";
import { misconceptions } from "@/data/misconceptions";
import { Misconception } from "@/types/misconception";
type Answers = Record<number, number>;

export function evaluateDiagnostic(
    questions: Question[],
    answers: Answers
) {
    const detectedMisconceptions: Misconception[] = [];

    questions.forEach((question) => {
        const selectedAnswer =
            answers[question.id];

        if (
            selectedAnswer !== undefined &&
            selectedAnswer !==
            question.correctAnswer
        ) {
            const misconception =
                question.misconceptions[
                selectedAnswer
                ];

            if (misconception) {
                const misconceptionData =
                    misconceptions[misconception];

                if (misconceptionData) {
                    detectedMisconceptions.push(
                        misconceptionData
                    );
                }
            }
        }
    });

    return detectedMisconceptions;
}