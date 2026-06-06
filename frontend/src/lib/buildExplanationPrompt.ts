export function buildExplanationPrompt(
  misconceptionName: string,
  brokenConcept: string,
  description: string
) {
  return `
You are an expert physics tutor and learning scientist.

A student has been diagnosed with:

Misconception:
${misconceptionName}

Broken Concept:
${brokenConcept}

Description:
${description}

Return ONLY valid JSON.

Format:

{
  "explanation": "short beginner-friendly explanation",
  "mission": [
    "step 1",
    "step 2",
    "step 3"
  ]
}

Rules:

- explanation under 120 words
- mission must contain exactly 3 steps
- mission steps must be actionable
- mission steps should help repair the misconception
- no markdown
- no code blocks
- output JSON only
`;
}