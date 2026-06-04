export function buildExplanationPrompt(
    misconceptionName: string,
    brokenConcept: string,
    description: string
) {
    return `
You are an expert physics tutor and learning scientist.

A student has been diagnosed with the following misconception.

Misconception:
${misconceptionName}

Broken Concept:
${brokenConcept}

Description:
${description}

Task:

1. Explain why students commonly develop this misconception.
2. Explain the correct physics concept.
3. Use a simple real-world example.
4. Keep the explanation beginner friendly.
5. Use less than 120 words.
6. Do not use equations.
7. Write directly to the student.

Return only the explanation text.
`;
}