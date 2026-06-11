import { Misconception } from "@/types/misconception";

export const misconceptions: Record<string, Misconception> = {
  NEWTON_1_FORCE_REQUIRED: {
    code: "NEWTON_1_FORCE_REQUIRED",
    name: "Motion Requires Continuous Force",
    description:
      "Students believe objects need a force to keep moving.",
    brokenConcept: "Newton's First Law",
    graphNodeId: "newton_first_law",
  },

  BALANCED_FORCE_MEANS_REST: {
    code: "BALANCED_FORCE_MEANS_REST",
    name: "Balanced Forces Mean Rest",
    description:
      "Students think balanced forces always make an object stop.",
    brokenConcept: "Balanced Forces",
    graphNodeId: "balanced_forces",
  },

  BALANCED_FORCE_DIRECTION_CHANGE: {
    code: "BALANCED_FORCE_DIRECTION_CHANGE",
    name: "Balanced Forces Change Direction",
    description:
      "Students believe balanced forces can change the direction of motion.",
    brokenConcept: "Balanced Forces",
    graphNodeId: "balanced_forces",
  },

  NET_FORCE_NONZERO_CONSTANT_SPEED: {
    code: "NET_FORCE_NONZERO_CONSTANT_SPEED",
    name: "Constant Speed Requires Net Force",
    description:
      "Students think a moving object must have a non-zero net force.",
    brokenConcept: "Net Force",
    graphNodeId: "net_force",
  },

  FORCE_IMBALANCE_COLLISION: {
    code: "FORCE_IMBALANCE_COLLISION",
    name: "Larger Object Exerts Larger Force",
    description:
      "Students think heavier objects exert greater forces during collisions.",
    brokenConcept: "Newton's Third Law",
    graphNodeId: "newton_third_law",
  },

  MASS_SPEED_CONFUSION: {
    code: "MASS_SPEED_CONFUSION",
    name: "More Mass Means More Acceleration",
    description:
      "Students confuse mass with acceleration and force relationships.",
    brokenConcept: "Newton's Second Law",
    graphNodeId: "newton_second_law",
  },
};