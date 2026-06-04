import QuestionCard from "@/components/QuestionCard";
import { Question } from "@/types/question";

export default function DiagnosticPage() {
    const question: Question = {
        id: 1,
        question: "What is Newton's First Law?",
        options: [
            "Motion requires force",
            "Objects resist changes in motion",
            "Force equals speed",
            "Mass causes acceleration"
        ],
    };

    return (
        <main className="min-h-screen flex items-center justify-center">
            <QuestionCard
                question={question.question}
                options={question.options}
            />
        </main>
    );
}