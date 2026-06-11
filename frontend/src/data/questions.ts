import { Question } from "@/types/question";

export const questions: Question[] = [
  {
    id: 1,
    question: "What is Newton's First Law?",
    options: [
      "Motion requires force",
      "Objects resist changes in motion",
      "Force equals speed",
      "Mass causes acceleration",
    ],
    correctAnswer: 1,
    misconceptions: {
      0: "NEWTON_1_FORCE_REQUIRED",
      2: "NEWTON_1_FORCE_REQUIRED",
      3: "MASS_SPEED_CONFUSION",
    },
  },

  {
    id: 2,
    question:
      "What happens when balanced forces act on a moving object?",
    options: [
      "It stops",
      "It keeps moving at constant velocity",
      "It speeds up",
      "It changes direction",
    ],
    correctAnswer: 1,
    misconceptions: {
      0: "BALANCED_FORCE_MEANS_REST",
      2: "BALANCED_FORCE_DIRECTION_CHANGE",
      3: "BALANCED_FORCE_DIRECTION_CHANGE",
    },
  },

  {
    id: 3,
    question:
      "A car moves at constant speed on a straight road. The net force is:",
    options: [
      "Forward",
      "Backward",
      "Zero",
      "Increasing",
    ],
    correctAnswer: 2,
    misconceptions: {
      0: "NET_FORCE_NONZERO_CONSTANT_SPEED",
      1: "NET_FORCE_NONZERO_CONSTANT_SPEED",
      3: "NET_FORCE_NONZERO_CONSTANT_SPEED",
    },
  },

  {
    id: 4,
    question:
      "A truck collides with a car. During the collision the forces are:",
    options: [
      "Truck exerts more force",
      "Car exerts more force",
      "Equal and opposite",
      "Depends on speed",
    ],
    correctAnswer: 2,
    misconceptions: {
      0: "FORCE_IMBALANCE_COLLISION",
      1: "FORCE_IMBALANCE_COLLISION",
      3: "FORCE_IMBALANCE_COLLISION",
    },
  },

  {
    id: 5,
    question:
      "Same force applied to light and heavy carts. Which accelerates more?",
    options: [
      "Light cart",
      "Heavy cart",
      "Same acceleration",
      "Cannot determine",
    ],
    correctAnswer: 0,
    misconceptions: {
      1: "MASS_SPEED_CONFUSION",
      2: "MASS_SPEED_CONFUSION",
      3: "MASS_SPEED_CONFUSION",
    },
  },
];