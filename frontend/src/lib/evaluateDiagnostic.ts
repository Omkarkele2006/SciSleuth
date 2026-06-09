import { Question } from "@/types/question";
import { misconceptions } from "@/data/misconceptions";
import { Misconception } from "@/types/misconception";

type Answers = Record<number, number>;

export function evaluateDiagnostic(
  questions: Question[],
  answers: Answers
) {
  const detectedMisconceptions: Misconception[] = [];
  const seen = new Set<string>();

  questions.forEach((question) => {
    const selectedAnswer = answers[question.id];

    if (
      selectedAnswer !== undefined &&
      selectedAnswer !== question.correctAnswer
    ) {
      const misconceptionCode =
        question.misconceptions[selectedAnswer];

      if (misconceptionCode && !seen.has(misconceptionCode)) {
        const misconceptionData = misconceptions[misconceptionCode];

        if (misconceptionData) {
          seen.add(misconceptionCode);
          detectedMisconceptions.push(misconceptionData);
        }
      }
    }
  });

  return detectedMisconceptions;
}