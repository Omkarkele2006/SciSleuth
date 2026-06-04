import { Question } from "@/types/question";

type Answers = Record<number, number>;

export function evaluateDiagnostic(
  questions: Question[],
  answers: Answers
) {
  const detectedMisconceptions: string[] = [];

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
        detectedMisconceptions.push(
          misconception
        );
      }
    }
  });

  return detectedMisconceptions;
}