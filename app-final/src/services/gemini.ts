import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY_STORAGE_KEY = "icet_gemini_api_key";

export const getStoredApiKey = () => localStorage.getItem(API_KEY_STORAGE_KEY) || "";
export const setStoredApiKey = (key: string) => localStorage.setItem(API_KEY_STORAGE_KEY, key.trim());

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
    // Re-initialize if key changed or not yet initialized
    this.genAI = new GoogleGenerativeAI(key);
  }

  async getMotivationalQuote(): Promise<string> {
    this.init();
    if (!this.genAI) return "Education is the most powerful weapon which you can use to change the world.";

    try {
      const model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent("Give a very short, powerful 1-sentence motivational quote for an exam aspirant. No attribution.");
      return result.response.text().trim();
    } catch (error) {
      console.error("Gemini Error:", error);
      return "Believe in yourself and all that you are.";
    }
  }

  async getExplanation(question: string, options: string[], answer: string): Promise<string> {
    this.init();
    if (!this.genAI) return "Please provide a Gemini API key to see AI-powered explanations.";

    try {
      const model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `Solve this question step by step for an AP ICET aspirant.
Question: ${question}
Options: ${options.join(", ")}
Correct Answer: ${answer}

Provide a clear, concise explanation focusing on the logical or mathematical process.`;
      
      const result = await model.generateContent(prompt);
      return result.response.text();
    } catch (error) {
      return "Unable to fetch explanation at this time. Please check your API key.";
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
