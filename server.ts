import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK with telemetry header
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("GEMINI_API_KEY is not defined in environment variables. Chatbot will run in simulation mode.");
    return null;
  }
  return new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
};

const ai = getGeminiClient();

// System instruction for the MCT Aligned chatbot assistant
const SYSTEM_INSTRUCTION = `
You are the interactive AI Assistant for MCT Aligned LLC, representing the company with professionalism, integrity, and warmth.
Your goal is to answer queries about MCT Aligned LLC, its services, vision, and core values clearly and directly.

Company Information:
- Company Name: MCT Aligned LLC
- Contact Phone: 580-826-7475
- Contact Email: brian@mctaligned.com
- Main Website: https://iwebnext.com (or developed by iWebNext)

Brand Positioning & Mission:
MCT Aligned LLC believes that business value should flow directly to the people creating it (workers) and the customers paying for it (buyers).
By streamlining processes, analyzing value chains, and eliminating unnecessary overhead and middleman layers, the company creates highly efficient, transparent business models.

Service Offerings:
1. Business Process Optimization: Eliminating bottlenecks and simplifying operations.
2. Value Chain Analysis: Highlighting where unnecessary middleman markups occur and keeping value centered.
3. Strategic Alignment Consulting: Crafting structures that align incentives between buyers, suppliers, and workers.
4. Cost Reduction Initiatives: Removing wasteful expenditures and middlemen commissions.
5. Operational Efficiency Solutions: Fine-tuning resource allocation and execution.

About:
The company's core values are Integrity, Transparency, Efficiency, Partnership, and Long-Term Value Creation.

Instructions for responses:
1. Be direct, professional, value-focused, and friendly. Avoid excessive corporate buzzwords.
2. If asked about contact info, provide the email (brian@mctaligned.com) and phone (580-826-7475) directly.
3. Limit your replies to be brief and conversational (1-3 short paragraphs max), suitable for a sleek chatbot popover.
4. If GEMINI_API_KEY is active, you are answering live. Always remain supportive and prompt.
`;

// API endpoint for chatbot communication
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required." });
    }

    if (!ai) {
      // Simulation mode if key is missing (for local testing without keys)
      const simulatedResponses = [
        "That's a great question! At MCT Aligned LLC, we specialize in reducing middleman costs so that more value goes directly to workers and buyers. What services are you most interested in?",
        "To get in touch with Brian directly, please give us a call at 580-826-7475 or write to brian@mctaligned.com to discuss aligning value inside your company.",
        "We focus on Business Process Optimization, Value Chain Analysis, and Cost Reduction Initiatives. Each service is tailored to maximize operational efficiency.",
        "Our core principles are simple: integrity, transparency, and fairness. By streamlining the flow of goods and services, both workers and buyers win."
      ];
      const randomReply = simulatedResponses[Math.floor(Math.random() * simulatedResponses.length)];
      return res.json({
        reply: `[Simulation Mode] ${randomReply}\n\n(Note: To enable live AI support, please add your GEMINI_API_KEY inside the Secrets panel.)`
      });
    }

    // Format chat history for the modern SDK
    const contents: any[] = [];
    if (history && Array.isArray(history)) {
      history.slice(-10).forEach((item: any) => {
        contents.push({
          role: item.role === "user" ? "user" : "model",
          parts: [{ text: item.text }],
        });
      });
    }

    // Append current user message
    contents.push({
      role: "user",
      parts: [{ text: message }],
    });

    // Call Gemini API utilizing 'gemini-3.5-flash'
    const aiResponse = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    const reply = aiResponse.text || "I am here to help you coordinate your business alignment goals. Feel free to ask more specifics.";
    return res.json({ reply });
  } catch (error: any) {
    console.error("Gemini API Error in backend:", error);
    return res.status(500).json({
      error: "Failed to communicate with AI model.",
      details: error.message || error,
    });
  }
});

// Mock lead submission API (for Contact Form)
app.post("/api/contact", (req, res) => {
  const { name, email, phone, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Please fill out all required fields (Name, Email, Message)." });
  }
  // Log locally for demonstration
  console.log(`[Lead Received] Name: ${name}, Email: ${email}, Phone: ${phone || "N/A"}, Message: ${message}`);
  return res.json({
    success: true,
    message: "Thank you for reaching out! We will contact you at your provided email very shortly to align your value goals.",
  });
});

async function startServer() {
  // Vite integration
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve production static assets
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`MCT Aligned server running on http://0.0.0.0:${PORT} in ${process.env.NODE_ENV || "development"} mode.`);
  });
}

startServer();
