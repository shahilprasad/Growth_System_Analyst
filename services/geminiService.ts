import { GoogleGenAI, Type } from "@google/genai";
import { ClinicianLog, InterventionSignal } from "../types";

const SYSTEM_INSTRUCTION = `
You are a Senior Growth Engineer at Heidi Health. Your goal is to minimize clinician friction and maximize retention.
You will be provided with a JSON list of clinician activity logs.
Your task is to analyze these logs to identify "High-Potential" or "At-Risk" users based on these signals:

1. **Friction**: High session count (>50) but Low Template Usage (< 0.2). These users are working hard but inefficiently.
2. **Reactivation**: Surgeons or Specialists who haven't logged in for > 3 days.
3. **Power User**: High session count (>80) and High Template Usage (> 0.7). These are potential champions.

For each identified signal, generate a personalized intervention (email draft).
The email should be short, empathetic, and use clinical language appropriate for their specialty.
If a user is "Stable", do not include them in the output list.
`;

export const analyzeGrowthSignals = async (logs: ClinicianLog[]): Promise<InterventionSignal[]> => {
  if (!process.env.API_KEY) {
    throw new Error("API Key is missing");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  // Batching: Gemini Flash can handle large contexts, but let's send 50 at a time.
  const serializedLogs = JSON.stringify(logs);

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze the following user logs and identify growth signals:\n${serializedLogs}`,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              userId: { type: Type.STRING },
              category: { 
                type: Type.STRING, 
                enum: ["Friction", "Reactivation", "Power User"] 
              },
              confidence: { type: Type.NUMBER, description: "Confidence score between 0 and 100" },
              reasoning: { type: Type.STRING },
              emailDraft: { type: Type.STRING, description: "The content of the email intervention" },
            },
            required: ["userId", "category", "confidence", "reasoning", "emailDraft"]
          }
        }
      }
    });

    const text = response.text;
    if (!text) return [];
    
    const data = JSON.parse(text) as InterventionSignal[];
    return data;

  } catch (error) {
    console.error("Gemini Analysis Failed:", error);
    throw error;
  }
};