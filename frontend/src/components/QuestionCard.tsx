type QuestionCardProps = {
  question: string;
};

export default function QuestionCard({
  question,
}: QuestionCardProps) {
  return (
    <div className="border rounded-lg p-6 max-w-xl w-full">
      <h2 className="text-xl font-semibold">{question}</h2>
    </div>
  );
}