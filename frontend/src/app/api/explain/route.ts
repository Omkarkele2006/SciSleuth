import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function GET() {
  try {
    const response =
      await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents:
          "Explain Newton's First Law to a beginner student in under 100 words.",
      });

    return NextResponse.json({
      success: true,
      text: response.text,
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