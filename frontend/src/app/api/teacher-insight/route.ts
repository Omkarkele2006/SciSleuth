import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function POST(
  request: NextRequest
) {
  try {
    const {
      analytics,
      totalStudents,
      averageHealth,
    } = await request.json();

    const prompt = `
You are an educational data analyst.

Analyze this classroom data:

Students: ${totalStudents}

Average Graph Health:
${averageHealth}%

Misconceptions:

${analytics
  .map(
    (m: any) =>
      `${m.name}: ${m.count} students`
  )
  .join("\n")}

Return ONLY a short paragraph
(3-5 sentences) explaining:

1. Main learning problem
2. Likely root cause
3. Teacher intervention suggestion
`;

    const response =
      await ai.models.generateContent({
        model:
          "gemini-2.5-flash-lite",
        contents: prompt,
      });

    return NextResponse.json({
      success: true,
      insight: response.text,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json({
      success: false,
      insight:
        "AI classroom insight unavailable.",
    });
  }
}