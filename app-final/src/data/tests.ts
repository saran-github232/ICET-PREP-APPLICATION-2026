import type { TestMetadata } from '../types';

export const TESTS: TestMetadata[] = [
  // Shift Papers (90 Questions each / 120 Min)
  { id: '2024-s1', title: '2024 Shift 1', year: '2024', type: 'shift', pdfPath: '/PDF/2024 shift 1.pdf', isReady: true },
  { id: '2024-s2', title: '2024 Shift 2', year: '2024', type: 'shift', pdfPath: '/PDF/2024 shift 2.pdf', isReady: true },
  { id: '2023-s1', title: '2023 Shift 1', year: '2023', type: 'shift', pdfPath: '/PDF/2023 shift 1.pdf', isReady: true },
  { id: '2023-s2', title: '2023 Shift 2', year: '2023', type: 'shift', pdfPath: '/PDF/2023 shift 2.pdf', isReady: true },
  { id: '2022-s1', title: '2022 Shift 1', year: '2022', type: 'shift', pdfPath: '/PDF/2022 shift 1.pdf', isReady: true },
  { id: '2022-s2', title: '2022 Shift 2', year: '2022', type: 'shift', pdfPath: '/PDF/2022 shift 2.pdf', isReady: true },
  { id: 'mock-ebook', title: '2026 Mock EBook', year: '2026', type: 'shift', pdfPath: '/PDF/2026 Mock EBook.pdf', isReady: true },
  { id: '2021-s1', title: '2021 Shift 1', year: '2021', type: 'shift', pdfPath: '/PDF/2021 shift 1.pdf', isReady: true },
  { id: '2021-s2', title: '2021 Shift 2', year: '2021', type: 'shift', pdfPath: '/PDF/2021 shift 2.pdf', isReady: true },
  { id: '2021-s3', title: '2021 Shift 3', year: '2021', type: 'shift', pdfPath: '/PDF/2021 shift 3.pdf', isReady: true },
  { id: '2021-s4', title: '2021 Shift 4', year: '2021', type: 'shift', pdfPath: '/PDF/2021 shift 4.pdf', isReady: true },
  { id: '2020-s1', title: '2020 Shift 1', year: '2020', type: 'shift', pdfPath: '/PDF/2020 shift 1.pdf', isReady: true },
  { id: '2020-s2', title: '2020 Shift 2', year: '2020', type: 'shift', pdfPath: '/PDF/2020 shift 2.pdf', isReady: true },
  { id: '2020-s3', title: '2020 Shift 3', year: '2020', type: 'shift', pdfPath: '/PDF/2020 shift 3.pdf', isReady: true },
  { id: '2019-s1', title: '2019 Shift 1', year: '2019', type: 'shift', pdfPath: '/PDF/2019 shift 1.pdf', isReady: true },
  { id: '2019-s2', title: '2019 Shift 2', year: '2019', type: 'shift', pdfPath: '/PDF/2019 shift 2.pdf', isReady: true },
  { id: 'model-2025', title: '2025 Model Papers', year: '2025', type: 'shift', pdfPath: '/PDF/2025 Model papers.pdf', isReady: true },
  { id: 'sample-2026', title: '2026 Sample Pattern', year: '2026', type: 'shift', pdfPath: '/PDF/2026 sample pattern.pdf', isReady: true },
  { id: 'exam-pattern', title: '2026 Exam Pattern', year: '2026', type: 'shift', pdfPath: '/PDF/2026 exam pattern.pdf', isReady: true },

  // Practice Tests (90 Questions each / 120 Min)
  { id: 'practice-1', title: 'Practice Set 1', year: '2026', type: 'shift', pdfPath: '/PDF/2026 Mock EBook.pdf', isReady: true },
  { id: 'practice-2', title: 'Practice Set 2', year: '2026', type: 'shift', pdfPath: '/PDF/2026 Mock EBook.pdf', isReady: true },
  { id: 'practice-3', title: 'Practice Set 3', year: '2026', type: 'shift', pdfPath: '/PDF/2026 Mock EBook.pdf', isReady: true },
  { id: 'practice-4', title: 'Practice Set 4', year: '2026', type: 'shift', pdfPath: '/PDF/2026 Mock EBook.pdf', isReady: true },
  { id: 'practice-5', title: 'Practice Set 5', year: '2026', type: 'shift', pdfPath: '/PDF/2026 Mock EBook.pdf', isReady: true },
  { id: 'practice-6', title: 'Practice Set 6', year: '2026', type: 'shift', pdfPath: '/PDF/2026 Mock EBook.pdf', isReady: true },
  { id: 'practice-7', title: 'Practice Set 7', year: '2026', type: 'shift', pdfPath: '/PDF/2026 Mock EBook.pdf', isReady: true },
  { id: 'practice-8', title: 'Practice Set 8', year: '2026', type: 'shift', pdfPath: '/PDF/2026 Mock EBook.pdf', isReady: true },
  { id: 'practice-9', title: 'Practice Set 9', year: '2026', type: 'shift', pdfPath: '/PDF/2026 Mock EBook.pdf', isReady: true },
  { id: 'practice-10', title: 'Practice Set 10', year: '2026', type: 'shift', pdfPath: '/PDF/2026 Mock EBook.pdf', isReady: true },
  { id: 'practice-11', title: 'Practice Set 11', year: '2026', type: 'shift', pdfPath: '/PDF/2026 Mock EBook.pdf', isReady: true },
  { id: 'practice-12', title: 'Practice Set 12', year: '2026', type: 'shift', pdfPath: '/PDF/2026 Mock EBook.pdf', isReady: true },

  // Grand Tests
  { id: 'grand-previous', title: 'APICET Previous Year Solved', year: 'Historical', type: 'grand', pdfPath: '/PDF/APICET previous yr solved papers.pdf', isReady: true },
  { id: 'grand-business', title: 'Business & Terminology Mock', year: '2026', type: 'grand', pdfPath: '/PDF/Business & C Terminology.pdf' }
];
