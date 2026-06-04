export type Question = {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;

  misconceptions: {
    [optionIndex: number]: string;
  };
};