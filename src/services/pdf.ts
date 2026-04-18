import * as pdfjs from 'pdfjs-dist';
import type { Question, QuestionSection } from '../types';
import { geminiService } from './gemini';

// Set worker path for pdfjs
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;

class PDFService {
  async getDocument(url: string) {
    return pdfjs.getDocument(url).promise;
  }

  async extractQuestionsFromPage(pdf: any, pageNumber: number): Promise<Question[]> {
    const page = await pdf.getPage(pageNumber);
    const textContent = await page.getTextContent();
    const text = textContent.items.map((item: any) => item.str).join(' ');

    if (!text.trim() || text.includes("Question Number :")) {
      // If structured metadata exists but questions are blank (as seen in audit),
      // we might need to use Gemini OCR.
      return this.extractViaGemini(page);
    }

    // Logic to parse standard text-searchable ICET papers
    // (This will be refined as we find searchable papers)
    return [];
  }

  private async extractViaGemini(page: any): Promise<Question[]> {
    // Convert page to image (canvas)
    const viewport = page.getViewport({ scale: 2.0 });
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    if (context) {
      await page.render({ canvasContext: context, viewport }).promise;
      const imageData = canvas.toDataURL('image/jpeg');
      return geminiService.parseImageForQuestions(imageData);
    }
    return [];
  }

  /**
   * High-level method to load a test
   */
  async loadTest(pdfPath: string): Promise<Question[]> {
    try {
      const pdf = await this.getDocument(pdfPath);
      let allQuestions: Question[] = [];
      
      // For now, let's limit to first 10 pages for testing to save tokens/time
      // In production, we iterate through the whole document or specific ranges
      const numPages = Math.min(pdf.numPages, 10);
      
      for (let i = 1; i <= numPages; i++) {
        const questions = await this.extractQuestionsFromPage(pdf, i);
        allQuestions = [...allQuestions, ...questions];
      }
      
      return allQuestions;
    } catch (error) {
      console.error("PDF Load Error:", error);
      return [];
    }
  }

  /**
   * Helper to determine section based on question number or text
   */
  getSection(qNum: number): QuestionSection {
    if (qNum <= 75) return 'Analytical';
    if (qNum <= 150) return 'Mathematical';
    return 'Communication';
  }
}

export const pdfService = new PDFService();
