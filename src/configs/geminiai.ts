import { GoogleGenAI } from "@google/genai";

export const geminiai = new GoogleGenAI({ apiKey: process.env.GEMINIAI_API_KEY });