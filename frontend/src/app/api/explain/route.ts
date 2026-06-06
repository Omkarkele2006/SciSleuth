import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

import { buildExplanationPrompt } from "@/lib/buildExplanationPrompt";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function POST(
  request: NextRequest
) {
  try {
    const {
      misconceptionName,
      brokenConcept,
      description,
    } = await request.json();

    const prompt =
      buildExplanationPrompt(
        misconceptionName,
        brokenConcept,
        description
      );

    const response =
      await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

    if (!response.text) {
      throw new Error(
        "Gemini returned empty response"
      );
    }

    const text = response.text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const parsed =
      JSON.parse(text);

    return NextResponse.json({
      success: true,
      explanation:
        parsed.explanation,
      mission:
        parsed.mission,
    });
  } catch (error: any) {
  console.error(error);

  const isQuotaError =
    error?.status === 429;

  return NextResponse.json(
    {
      success: false,

      explanation: isQuotaError
        ? "AI service temporarily unavailable. Gemini quota exceeded. Review the repair path."
        : "AI service temporarily unavailable. Review the repair path.",

      mission: [],
    },
    {
      status: isQuotaError
        ? 429
        : 500,
    }
  );
}
}