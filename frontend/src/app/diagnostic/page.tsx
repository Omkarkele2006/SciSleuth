import QuestionCard from "@/components/QuestionCard";
import { questions } from "@/data/questions";

export default function DiagnosticPage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <QuestionCard
        question={questions[0].question}
        options={questions[0].options}
      />
    </main>
  );
}