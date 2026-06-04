type QuestionCardProps = {
  question: string;
  options: string[];
};

export default function QuestionCard({
  question,
  options,
}: QuestionCardProps) {
  return (
    <div className="border rounded-lg p-6 max-w-xl w-full">
      <h2 className="text-xl font-semibold mb-4">
        {question}
      </h2>

      <div className="space-y-2">
        {options.map((option, index) => (
          <div
            key={index}
            className="border rounded p-3"
          >
            {option}
          </div>
        ))}
      </div>
    </div>
  );
}