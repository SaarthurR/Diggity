import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import OpenAI from "openai";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  app.post("/api/analyze", async (req, res) => {
    try {
      const { image, material, category, condition } = req.body;

      if (!process.env.OPENAI_API_KEY) {
        return res.status(500).json({ message: "OpenAI API key not configured" });
      }

      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: `You are an expert digital archaeologist AI. Your task is to analyze artifact images and provide detailed, structured archaeological data.
            
            Return a JSON object with the following fields:
            - name: A specific, academic name for the artifact (e.g., "Sumerian Cuneiform Tablet")
            - age: Estimated age/period (e.g., "c. 2100 BCE")
            - material: Refined material description
            - purpose: The artifact's function and use
            - location: Probable origin location
            - whyItMatters: Historical significance explanation
            - civilization: Name of the likely civilization
            - civilizationPeriod: Specific period of that civilization
            - confidence: A number between 80-99 indicating confidence level
            `
          },
          {
            role: "user",
            content: [
              { type: "text", text: "Analyze this artifact image." },
              {
                type: "image_url",
                image_url: {
                  url: image,
                },
              },
            ],
          },
        ],
        response_format: { type: "json_object" },
      });

      const content = JSON.parse(response.choices[0].message.content || "{}");
      res.json(content);
    } catch (error: any) {
      console.error("Analysis failed:", error);
      res.status(500).json({ message: error.message || "Analysis failed" });
    }
  });

  return httpServer;
}
