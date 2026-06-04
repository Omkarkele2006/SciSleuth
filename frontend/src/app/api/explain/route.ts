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

    return NextResponse.json({
      success: true,
      explanation:
        response.text,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to generate explanation",
      },
      {
        status: 500,
      }
    );
  }
}