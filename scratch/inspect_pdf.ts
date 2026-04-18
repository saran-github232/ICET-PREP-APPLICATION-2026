import * as pdfjs from 'pdfjs-dist';
import fs from 'fs';

// Node environment setup for pdfjs
const pdfPath = 'c:/Users/ideal/OneDrive/Desktop/icet application final/app-final/public/PDF/2024 shift 1.pdf';

async function inspectPdf() {
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const loadingTask = pdfjs.getDocument({ data });
  const pdf = await loadingTask.promise;
  
  console.log(`PDF Loaded: ${pdfPath}`);
  console.log(`Pages: ${pdf.numPages}`);
  
  // Inspect first 3 pages
  for (let i = 1; i <= 3; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const text = textContent.items.map((item: any) => item.str).join(' ');
    console.log(`--- Page ${i} ---`);
    console.log(text.substring(0, 500)); // Print first 500 chars
  }
}

inspectPdf().catch(console.error);
