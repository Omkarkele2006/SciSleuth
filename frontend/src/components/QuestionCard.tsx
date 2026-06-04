"use client";

type QuestionCardProps = {
  question: string;
  options: string[];
  selectedOption: number | null;
  onSelect: (index: number) => void;
};

export default function QuestionCard({
  question,
  options,
  selectedOption,
  onSelect,
}: QuestionCardProps) {

  return (
    <div className="border rounded-lg p-6 max-w-xl w-full">
      <h2 className="text-xl font-semibold mb-4">
        {question}
      </h2>

      <div className="space-y-2">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => onSelect(index)}
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