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
API_KEY = os.environ.get("VITE_GEMINI_API_KEY") 
if not API_KEY:
    print("FATAL: VITE_GEMINI_API_KEY not found in environment.")
    sys.exit(1)

PDF_DIR = r'c:\Users\ideal\OneDrive\Desktop\icet application final\app-final\public\PDF'
OUT_DIR = r'c:\Users\ideal\OneDrive\Desktop\icet application final\app-final\public\data\questions'

genai.configure(api_key=API_KEY)
# Switch to the most reliable model for OCR/Parsing
model = genai.GenerativeModel('models/gemini-1.5-flash-latest')

def extract_questions_from_pdf(pdf_name):
    pdf_path = os.path.join(PDF_DIR, pdf_name)
    out_name = pdf_name.replace('.pdf', '.json').replace(' ', '_')
    out_path = os.path.join(OUT_DIR, out_name)
    
    if not os.path.exists(pdf_path):
        print(f"Skipping {pdf_name}: File not found at {pdf_path}")
        return

    print(f"\nProcessing {pdf_name}...")
    
    # Check for existing data to resume
    existing_questions = []
    if os.path.exists(out_path):
        try:
            with open(out_path, 'r', encoding='utf-8') as f:
                existing_questions = json.load(f)
            print(f"  - Found {len(existing_questions)} existing questions. Resuming...")
        except:
            print("  - Corruption detected in existing JSON. Starting fresh.")
            existing_questions = []

    doc = fitz.open(pdf_path)
    all_questions = existing_questions
    
    # Start/End Page Logic
    start_page = 2 
    num_pages = min(len(doc), 35) # Expanded range for full coverage
    
    # Calculate which page to start from based on question count (approx 6 questions per page)
    # We'll just overlap a bit to be safe
    resume_index = max(start_page, start_page + (len(all_questions) // 6) - 1)

    for i in range(resume_index, num_pages):
        print(f"  - Page {i+1}/{num_pages} (Current Pool: {len(all_questions)})")
        page = doc.load_page(i)
        pix = page.get_pixmap(matrix=fitz.Matrix(2.5, 2.5)) # Higher res for better OCR
        img_data = pix.tobytes("jpeg")
        
        prompt = """
        Extract ALL multiple-choice questions from this ICET exam page.
        Paper format: Telugu text followed by English text.
        RULE: Focus ONLY on the English version of the questions and options.
        
        Return a raw JSON array of objects. No markdown. No intro.
        JSON Structure:
        [
          {
            "number": 1,
            "id": "SHIFT_YEAR_NUM",
            "text": "English Question",
            "options": [{"id": "a", "text": "Opt A"}, {"id": "b", "text": "Opt B"}, {"id": "c", "text": "Opt C"}, {"id": "d", "text": "Opt D"}],
            "correctAnswer": "a",
            "section": "Analytical/Mathematical/Communication"
          }
        ]
        If no questions are on the page, return [].
        """
        
        backoff = 2
        for attempt in range(3): # Retry logic for 429s
            try:
                response = model.generate_content([
                    prompt,
                    {
                        "mime_type": "image/jpeg",
                        "data": img_data
                    }
                ])
                
                text = response.text.strip()
                # Remove markdown fences
                if "```json" in text: text = text.split("```json")[1].split("```")[0]
                elif "```" in text: text = text.split("```")[1].split("```")[0]
                
                batch = json.loads(text.strip())
                if isinstance(batch, list):
                    # Filter out duplicates by ID or text if needed, for now just append
                    # We look for duplicates by comparing question text
                    new_questions = [q for q in batch if q['text'] not in [ex['text'] for ex in all_questions]]
                    all_questions.extend(new_questions)
                    
                    # Live save
                    with open(out_path, 'w', encoding='utf-8') as f:
                        json.dump(all_questions, f, indent=2, ensure_ascii=False)
                
                break # Success, exit retry loop
                
            except Exception as e:
                err_str = str(e)
                if "429" in err_str:
                    print(f"    Rate limit hit. Sleeping {backoff}s (Attempt {attempt+1}/3)...")
                    time.sleep(backoff)
                    backoff *= 4 # Exponential backoff
                else:
                    print(f"    ERROR on page {i+1}: {e}")
                    break
        
        time.sleep(2) # Base sleep between pages to stay under RPM limit

    print(f"✅ Finished {pdf_name}. Total questions: {len(all_questions)}")

if __name__ == "__main__":
    if not os.path.exists(OUT_DIR):
        os.makedirs(OUT_DIR)
        
    # The Core 6 Priority List as requested by user
    priority = [
        "2024 shift 1.pdf",
        "2024 shift 2.pdf",
        "2023 shift 1.pdf",
        "2023 shift 2.pdf",
        "2022 shift 1.pdf",
        "2026 Mock EBook.pdf"
    ]
    
    print("Starting Core 6 Extraction Batch...")
    for pdf in priority:
        try:
            extract_questions_from_pdf(pdf)
        except Exception as e:
            print(f"CRITICAL ERROR processing {pdf}: {e}")
    
    print("\nALL PRIORITY PAPERS PROCESSED.")
