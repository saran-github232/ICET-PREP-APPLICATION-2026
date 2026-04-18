import sys
import os

try:
    import PyPDF2
except ImportError:
    print("PyPDF2 not found. Installing...")
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "PyPDF2"])
    import PyPDF2

pdf_dir = r'c:\Users\ideal\OneDrive\Desktop\icet application final\app-final\public\PDF'
pdf_files = [f for f in os.listdir(pdf_dir) if f.endswith('.pdf')]

print(f"Analyzing {len(pdf_files)} PDF files...")

for pdf_file in pdf_files[:5]: # Check first 5
    path = os.path.join(pdf_dir, pdf_file)
    try:
        with open(path, 'rb') as f:
            reader = PyPDF2.PdfReader(f)
            page = reader.pages[0]
            text = page.extract_text()
            searchable = "YES" if text and len(text.strip()) > 50 else "NO"
            print(f"- {pdf_file}: Searchable: {searchable} (Length: {len(text) if text else 0})")
    except Exception as e:
        print(f"- {pdf_file}: ERROR ({str(e)})")
