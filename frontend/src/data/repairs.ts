import { Repair } from "@/types/repair";

export const repairs: Record<
  string,
  Repair
> = {
  NEWTON_1_FORCE_REQUIRED: {
    misconceptionCode:
      "NEWTON_1_FORCE_REQUIRED",

    title:
      "Motion Does Not Require Continuous Force",

    explanation:
      "An object will continue moving at a constant velocity unless acted upon by an unbalanced force. Forces are needed to change motion, not maintain it.",
  },

  BALANCED_FORCE_MEANS_REST: {
    misconceptionCode:
      "BALANCED_FORCE_MEANS_REST",

    title:
      "Balanced Forces Mean Zero Acceleration",

    explanation:
      "Balanced forces produce zero net force. A moving object can continue moving at constant velocity even when forces are balanced.",
  },

  FORCE_IN_DIRECTION_OF_MOTION: {
    misconceptionCode:
      "FORCE_IN_DIRECTION_OF_MOTION",

    title:
      "Motion and Force Are Not the Same",

    explanation:
      "An object can move without a force acting in the direction of motion. Force is required only when velocity changes in magnitude or direction.",
  },

  FORCE_IMBALANCE_COLLISION: {
    misconceptionCode:
      "FORCE_IMBALANCE_COLLISION",

    title:
      "Collision Forces Are Equal and Opposite",

    explanation:
      "According to Newton's Third Law, interacting objects exert forces of equal magnitude and opposite direction on each other, regardless of their masses.",
  },

  MASS_SPEED_CONFUSION: {
    misconceptionCode:
      "MASS_SPEED_CONFUSION",

    title:
      "Mass Reduces Acceleration for the Same Force",

    explanation:
      "Newton's Second Law states that acceleration depends on both force and mass. For the same force, a larger mass produces a smaller acceleration.",
  },
};