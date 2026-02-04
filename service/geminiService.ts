
import { GoogleGenAI } from "@google/genai";
import { JournalEntry } from "../types";

export const getGroundingInsight = async (entries: JournalEntry[]): Promise<string> => {
  if (entries.length === 0) return "Begin writing whenever you feel ready. There is no rush.";

  // Fix: Initialize GoogleGenAI strictly using process.env.API_KEY as per instructions
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const recentEntries = entries.slice(-3).map(e => `[${e.mood}]: ${e.content}`).join("\n---\n");

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a gentle, mature emotional sanctuary guide. Based on these journal entries, provide ONE single sentence of non-cliché, grounding encouragement. Avoid toxic positivity. Focus on acknowledging the current state and providing permission to just 'be'.

Entries:
${recentEntries}`,
      config: {
        temperature: 0.7,
        topP: 0.9,
        maxOutputTokens: 60,
      }
    });

    // Fix: Access .text property directly (not as a method)
    return response.text?.trim() || "Your presence here is enough.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The silence holds space for you today.";
  }
};
