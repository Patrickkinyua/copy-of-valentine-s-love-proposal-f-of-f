
import { GoogleGenAI, Type } from "@google/genai";
import { DatePlan, LoveLetter } from "../types";

/* Using a factory function to create a new instance for each call as per guidelines */
const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateLoveLetter = async (targetName: string, memories: string, tone: string): Promise<string> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    /* Using gemini-3-pro-preview for creative and high-quality letter generation */
    model: 'gemini-3-pro-preview',
    contents: `Write a deeply romantic, poetic, and personalized Valentine's love letter to ${targetName}. 
               Include these memories/details: ${memories}. 
               The tone should be ${tone}. Keep it heartfelt and about 150-200 words.`,
  });
  return response.text || "My heart is full of words I cannot speak, but know that I love you deeply.";
};

export const curateMemory = async (imageBase64: string, context: string): Promise<string> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    /* Using gemini-3-flash-preview for image analysis and creative captioning */
    model: 'gemini-3-flash-preview',
    contents: {
      parts: [
        { inlineData: { data: imageBase64.split(',')[1], mimeType: 'image/jpeg' } },
        { text: `Analyze this image which is a special memory for a couple. 
                 Write a captivating, short (2-3 sentences), and deeply romantic caption or poetic description of this moment. 
                 Context provided by user: ${context}. Make it feel timeless and magical.` }
      ]
    }
  });
  return response.text || "This moment, captured forever, speaks volumes of a love that knows no bounds.";
};

export const generateDatePlan = async (preferences: string): Promise<DatePlan> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    /* Using gemini-3-pro-preview for structured JSON plan generation */
    model: 'gemini-3-pro-preview',
    contents: `Create a magical and unique Valentine's date plan based on these preferences: ${preferences}. 
               Return the plan in JSON format with properties: title, activities (array of strings), vibe, surpriseTip.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          activities: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING } 
          },
          vibe: { type: Type.STRING },
          surpriseTip: { type: Type.STRING }
        },
        required: ["title", "activities", "vibe", "surpriseTip"]
      }
    }
  });

  try {
    const jsonStr = (response.text || '{}').trim();
    return JSON.parse(jsonStr) as DatePlan;
  } catch (e) {
    return {
      title: "A Night Under the Stars",
      activities: ["Stargazing", "Picnic", "Slow Dancing"],
      vibe: "Intimate and serene",
      surpriseTip: "Bring a warm blanket and their favorite dessert."
    };
  }
};
