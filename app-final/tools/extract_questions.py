import os
import json
import base64
import time
import sys
import subprocess

# Auto-install dependencies
def install(package):
    subprocess.check_call([sys.executable, "-m", "pip", "install", package])

try:
    import fitz  # PyMuPDF
except ImportError:
    install("pymupdf")
    import fitz

try:
    import google.generativeai as genai
except ImportError:
    install("google-generativeai")
    import google.generativeai as genai

# Configuration
API_KEY = os.environ.get("VITE_GEMINI_API_KEY") or "YOUR_KEY_HERE"
PDF_DIR = r'c:\Users\ideal\OneDrive\Desktop\icet application final\app-final\public\PDF'
OUT_DIR = r'c:\Users\ideal\OneDrive\Desktop\icet application final\app-final\public\data\questions'

genai.configure(api_key=API_KEY)
model = genai.GenerativeModel('models/gemini-flash-latest')

def extract_questions_from_pdf(pdf_name):
    pdf_path = os.path.join(PDF_DIR, pdf_name)
    out_path = os.path.join(OUT_DIR, pdf_name.replace('.pdf', '.json').replace(' ', '_'))
    
    print(f"Processing {pdf_name}...")
    
    doc = fitz.open(pdf_path)
    all_questions = []
    
    # Questions usually start around page 3 in ICET papers
    start_page = 2 
    num_pages = min(len(doc), 30) # Process more pages for better coverage
    
    for i in range(start_page, num_pages):
        print(f"  - Page {i+1}/{num_pages}")
        page = doc.load_page(i)
        pix = page.get_pixmap(matrix=fitz.Matrix(2, 2)) # 2x zoom
        img_data = pix.tobytes("jpeg")
        
        prompt = """
        You are an expert exam paper digitizer. Extract all multiple-choice questions from this ICET exam page.
        The paper contains questions in both Telugu and English. Please focus on the English text for the question and options.
        
        Return ONLY a raw JSON array of objects. Do not include markdown formatting or explanations.
        JSON Structure:
        [
          {
            "number": 1,
            "id": "q1",
            "text": "Question text in English",
            "options": [
              {"id": "a", "text": "Option A text"},
              {"id": "b", "text": "Option B text"},
              {"id": "c", "text": "Option C text"},
              {"id": "d", "text": "Option D text"}
            ],
            "correctAnswer": "a",
            "section": "Analytical"
          }
        ]
        
        Note: If a section header like 'Mathematical Ability' or 'Analytical Ability' is visible, use that for the 'section' field.
        If no questions are found on this page, return [].
        """
        
        try:
            response = model.generate_content([
                prompt,
                {
                    "mime_type": "image/jpeg",
                    "data": img_data
                }
            ])
            
            # Clean response text
            text = response.text.strip()
            if "```json" in text:
                text = text.split("```json")[1].split("```")[0]
            elif "```" in text:
                text = text.split("```")[1].split("```")[0]
            
            questions = json.loads(text.strip())
            if isinstance(questions, list):
                all_questions.extend(questions)
                # Live save after every page
                with open(out_path, 'w', encoding='utf-8') as f:
                    json.dump(all_questions, f, indent=2, ensure_ascii=False)
                    
        except Exception as e:
            print(f"    ERROR on page {i+1}: {e}")
        
        time.sleep(1) # Rate limit protection

    print(f"Finished processing. Total questions: {len(all_questions)}")

if __name__ == "__main__":
    if not os.path.exists(OUT_DIR):
        os.makedirs(OUT_DIR)
        
    # Process priority papers
    priority = ["2024 shift 1.pdf", "2026 Mock EBook.pdf"]
    for pdf in priority:
        extract_questions_from_pdf(pdf)
