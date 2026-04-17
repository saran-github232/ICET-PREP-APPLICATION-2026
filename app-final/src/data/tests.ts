import type { TestMetadata } from '../types';

export const TESTS: TestMetadata[] = [
  // THE CORE 6 (Working with PDF) - Reordered to top
  { id: '2024-s1', title: '2024 Shift 1', year: '2024', type: 'shift', pdfPath: '/PDF/2024 shift 1.pdf', isReady: true },
  { id: '2024-s2', title: '2024 Shift 2', year: '2024', type: 'shift', pdfPath: '/PDF/2024 shift 2.pdf', isReady: true },
  { id: '2023-s1', title: '2023 Shift 1', year: '2023', type: 'shift', pdfPath: '/PDF/2023 shift 1.pdf', isReady: true },
  { id: '2023-s2', title: '2023 Shift 2', year: '2023', type: 'shift', pdfPath: '/PDF/2023 shift 2.pdf', isReady: true },
  { id: '2022-s1', title: '2022 Shift 1', year: '2022', type: 'shift', pdfPath: '/PDF/2022 shift 1.pdf', isReady: true },
  { id: 'mock-ebook', title: '2026 Mock EBook', year: '2026', type: 'shift', pdfPath: '/PDF/2026 Mock EBook.pdf', isReady: true },

  // Remaining shifts (Coming soon)
  { id: '2022-s2', title: '2022 Shift 2', year: '2022', type: 'shift', pdfPath: '/PDF/2022 shift 2.pdf' },
  { id: '2021-s1', title: '2021 Shift 1', year: '2021', type: 'shift', pdfPath: '/PDF/2021 shift 1.pdf' },
  { id: '2021-s2', title: '2021 Shift 2', year: '2021', type: 'shift', pdfPath: '/PDF/2021 shift 2.pdf' },
  { id: '2021-s3', title: '2021 Shift 3', year: '2021', type: 'shift', pdfPath: '/PDF/2021 shift 3.pdf' },
  { id: '2021-s4', title: '2021 Shift 4', year: '2021', type: 'shift', pdfPath: '/PDF/2021 shift 4.pdf' },
  { id: '2020-s1', title: '2020 Shift 1', year: '2020', type: 'shift', pdfPath: '/PDF/2020 shift 1.pdf' },
  { id: '2020-s2', title: '2020 Shift 2', year: '2020', type: 'shift', pdfPath: '/PDF/2020 shift 2.pdf' },
  { id: '2020-s3', title: '2020 Shift 3', year: '2020', type: 'shift', pdfPath: '/PDF/2020 shift 3.pdf' },
  { id: '2019-s1', title: '2019 Shift 1', year: '2019', type: 'shift', pdfPath: '/PDF/2019 shift 1.pdf' },
  { id: '2019-s2', title: '2019 Shift 2', year: '2019', type: 'shift', pdfPath: '/PDF/2019 shift 2.pdf' },
  { id: 'model-2025', title: '2025 Model Papers', year: '2025', type: 'shift', pdfPath: '/PDF/2025 Model papers.pdf' },
  { id: 'sample-2026', title: '2026 Sample Pattern', year: '2026', type: 'shift', pdfPath: '/PDF/2026 sample pattern.pdf' },
  { id: 'exam-pattern', title: '2026 Exam Pattern', year: '2026', type: 'shift', pdfPath: '/PDF/2026 exam pattern.pdf' },
  
  // Grand Tests
  { 
    id: 'grand-previous', 
    title: 'APICET Previous Year Solved', 
    year: 'Historical', 
    type: 'grand', 
    pdfPath: '/PDF/APICET previous yr solved papers.pdf' 
  },
  { 
    id: 'grand-business', 
    title: 'Business & Terminology Mock', 
    year: '2026', 
    type: 'grand', 
    pdfPath: '/PDF/Business & C Terminology.pdf' 
  },
];
