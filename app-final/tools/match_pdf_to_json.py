import fitz
import json
import os
import re

def get_first_question_text(pdf_path):
    try:
        doc = fitz.open(pdf_path)
        # Check first 2 pages in case Q1 is on page 2
        for i in range(min(2, len(doc))):
            text = doc[i].get_text()
            # Look for typical ICET question patterns
            # Often it starts with "1. " or "Data Sufficiency"
            match = re.search(r'(?<=1\.\s)(.*?)(?=\s[A-D]\s)', text, re.DOTALL)
            if match:
                return match.group(1).strip()
            # Fallback: just get the first 50 chars of text after "Data Sufficiency"
            if "Data Sufficiency" in text:
                idx = text.find("Data Sufficiency")
                return text[idx:idx+100].strip()
        doc.close()
    except Exception as e:
        return f"Error: {str(e)}"
    return "Not Found"

def analyze_mapping():
    json_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../questions.json"))
    pdf_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "../public/PDF"))
    
    with open(json_path, 'r', encoding='utf-8') as f:
        questions = json.load(f)
    
    results = {}
    pdfs = [f for f in os.listdir(pdf_dir) if f.endswith('.pdf')]
    
    for pdf in pdfs:
        print(f"Fingerprinting {pdf}...")
        q1_text = get_first_question_text(os.path.join(pdf_dir, pdf))
        
        # Match against JSON
        found_idx = -1
        for i, q in enumerate(questions):
            # Fuzzy match check
            # We check if 50% of the fingerprint text exists in the JSON question text
            if i < 20 or i % 100 == 0: # Optimize: most likely to start every 100-200 qs
                clean_q = re.sub(r'\s+', ' ', q['text'].lower())
                clean_f = re.sub(r'\s+', ' ', q1_text.lower())
                if clean_f[:30] in clean_q or clean_q[:30] in clean_f:
                    found_idx = i
                    break
        
        results[pdf] = {
            "fingerprint": q1_text[:50],
            "json_index": found_idx
        }
    
    print("\n--- MAPPING RESULTS ---")
    for pdf, data in results.items():
        print(f"{pdf} -> Index {data['json_index']} (Matches '{data['fingerprint']}')")

if __name__ == "__main__":
    analyze_mapping()
