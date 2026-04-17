import pypdf
import sys

try:
    reader = pypdf.PdfReader('PRD.pdf')
    with open('prd_text.txt', 'w', encoding='utf-8') as f:
        for page in reader.pages:
            f.write(page.extract_text() + '\n')
    print("Extraction successful")
except Exception as e:
    print(f"Error: {e}")
    sys.exit(1)
