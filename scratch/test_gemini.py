import os
import json
import base64
import fitz
import google.generativeai as genai

import os
API_KEY = os.environ.get("VITE_GEMINI_API_KEY") or "YOUR_KEY_HERE"
genai.configure(api_key=API_KEY)
model = genai.GenerativeModel('models/gemini-1.5-flash')

pdf_path = r'c:\Users\ideal\OneDrive\Desktop\icet application final\app-final\public\PDF\2024 shift 1.pdf'
doc = fitz.open(pdf_path)
page = doc.load_page(0)
pix = page.get_pixmap(matrix=fitz.Matrix(2, 2))
img_data = pix.tobytes("jpeg")

prompt = "Extract questions from this EXAM page. Return ONLY a JSON array of objects. Keys: number, id, text, options (list of {id, text}), correctAnswer, section. Return empty [] if no questions."

print("Sending to Gemini...")
response = model.generate_content([
    prompt,
    {"mime_type": "image/jpeg", "data": img_data}
])

print("RAW RESPONSE:")
print(response.text)
