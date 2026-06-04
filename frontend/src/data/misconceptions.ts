import { Misconception } from "@/types/misconception";

export const misconceptions: Record<
  string,
  Misconception
> = {
  NEWTON_1_FORCE_REQUIRED: {
    code: "NEWTON_1_FORCE_REQUIRED",

    name:
      "Motion Requires Continuous Force",

    description:
      "Students believe objects need a force to keep moving.",

    brokenConcept:
      "Newton's First Law",
  },

  BALANCED_FORCE_MEANS_REST: {
    code:
      "BALANCED_FORCE_MEANS_REST",

    name:
      "Balanced Forces Mean Rest",

    description:
      "Students think balanced forces always make an object stop.",

    brokenConcept:
      "Net Force",
  },

  FORCE_IN_DIRECTION_OF_MOTION: {
    code:
      "FORCE_IN_DIRECTION_OF_MOTION",

    name:
      "Force Must Exist in Direction of Motion",

    description:
      "Students believe moving objects require a forward force.",

    brokenConcept:
      "Newton's First Law",
  },

  FORCE_IMBALANCE_COLLISION: {
    code:
      "FORCE_IMBALANCE_COLLISION",

    name:
      "Larger Object Exerts Larger Force",

    description:
      "Students think heavier objects exert greater forces during collisions.",

    brokenConcept:
      "Newton's Third Law",
  },

  MASS_SPEED_CONFUSION: {
    code:
      "MASS_SPEED_CONFUSION",

    name:
      "More Mass Means More Acceleration",

    description:
      "Students confuse mass with acceleration and force relationships.",

    brokenConcept:
      "Newton's Second Law",
  },
};