import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY_STORAGE_KEY = "icet_gemini_api_key";

// Priority: Local Storage (Manual Input) > .env File > Hardcoded Fallback
export const getStoredApiKey = () => 
  localStorage.getItem(API_KEY_STORAGE_KEY) || 
  import.meta.env.VITE_GEMINI_API_KEY || 
  "";

export const setStoredApiKey = (key: string) => localStorage.setItem(API_KEY_STORAGE_KEY, key.trim());

const LOCAL_QUOTES = [
  "Success is not final, failure is not fatal: it is the courage to continue that counts.",
  "Your time is limited, don't waste it living someone else's life.",
  "The only way to do great work is to love what you do.",
  "Believe in yourself and all that you are.",
  "Education is the most powerful weapon which you can use to change the world.",
  "Don't watch the clock; do what it does. Keep going.",
  "The future depends on what you do today.",
  "Your ambition is the path to your success. Persistence is the vehicle you arrive in."
];

class GeminiService {
  private genAI: GoogleGenerativeAI | null = null;

  public isInitialized(): boolean {
    return !!getStoredApiKey();
  }

  private init() {
    const key = getStoredApiKey();
    if (!key) {
      this.genAI = null;
      return;
    }
    this.genAI = new GoogleGenerativeAI(key);
  }

  async getMotivationalQuote(): Promise<string> {
    const randomLocal = LOCAL_QUOTES[Math.floor(Math.random() * LOCAL_QUOTES.length)];
    
    this.init();
    if (!this.genAI) return randomLocal;

    try {
      const model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent("Give a very short, powerful 1-sentence motivational quote for an exam aspirant. No attribution.");
      return result.response.text().trim();
    } catch (error) {
      console.error("Gemini Error:", error);
      return randomLocal;
    }
  }

  async getExplanation(question: string, options: string[], answer: string): Promise<string> {
    this.init();
    if (!this.genAI) return "⚠️ API Key not detected. Please add your Gemini API Key in Settings to enable AI explanations.";

    try {
      const model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `You are a professional AP ICET (Integrated Common Entrance Test) Tutor.
Analyze this question and provide a structured explanation:

---
QUESTION: ${question}
OPTIONS: ${options.join(", ")}
CORRECT OPTION: ${answer}
---

Structure your response exactly as follows:
### 💡 Core Concept
One sentence explaining the topic.

### 🔢 Step-by-Step Logic
Break down the steps clearly.

### ✅ Conclusion
Why the selected option is correct.`;
      
      const result = await model.generateContent(prompt);
      return result.response.text();
    } catch (error: any) {
      const status = error?.status || error?.response?.status;
      const message = error?.message || "";
      
      console.error("Gemini Detailed Error:", {
        message,
        status,
        error
      });
      
      if (status === 429 || message.includes('429')) 
        return "⚠️ Daily AI Quota reached. Please try again in a few minutes or use a different API key.";
      
      if (status === 403 || status === 401 || message.includes('403') || message.includes('API_KEY_INVALID')) 
        return "⚠️ Invalid API Key. Please verify your key in the Settings modal (Landing Page).";
        
      if (message.includes('billing') || message.includes('quota')) 
        return "⚠️ Gemini Billing/Quota issue detected. Check your Google Cloud Console.";

      if (message.includes('safety') || message.includes('blocked'))
        return "⚠️ AI response blocked by safety filters. This sometimes happens with complex logic questions.";
      
      return "⚠️ AI connection failed. If you're on the live site, ensure you've added your API Key in Settings.";
    }
  }

  async testConnection(key: string): Promise<boolean> {
    try {
      const tempAI = new GoogleGenerativeAI(key);
      const model = tempAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent("echo ok");
      return result.response.text().toLowerCase().includes("ok");
    } catch (e) {
      return false;
    }
  }

  async parseImageForQuestions(imageData: string): Promise<any[]> {
    this.init();
    if (!this.genAI) throw new Error("API Key required for image parsing.");

    try {
      const model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = "Analyze this page from an ICET exam question paper. Extract all questions, their question IDs, options, and the correct answer (if visible/marked). Format as a JSON array of objects with keys: number, id, text, options (array of {id, text}), correctAnswer, and section.";
      
      const result = await model.generateContent([
        prompt,
        {
          inlineData: {
            data: imageData.split(',')[1],
            mimeType: "image/jpeg"
          }
        }
      ]);
      
      const responseText = result.response.text();
      const jsonMatch = responseText.match(/\[[\s\S]*\]/);
      return jsonMatch ? JSON.parse(jsonMatch[0]) : [];
    } catch (error) {
      console.error("Gemini Parse Error:", error);
      return [];
    }
  }
}

export const geminiService = new GeminiService();
