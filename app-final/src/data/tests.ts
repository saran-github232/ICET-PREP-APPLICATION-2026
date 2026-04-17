import type { TestMetadata } from '../types';

export const TESTS: TestMetadata[] = [
  // Shift Papers
  { id: '2024-s1', title: '2024 Shift 1', year: '2024', type: 'shift', pdfPath: '/PDF/2024 shift 1.pdf' },
  { id: '2024-s2', title: '2024 Shift 2', year: '2024', type: 'shift', pdfPath: '/PDF/2024 shift 2.pdf' },
  { id: '2023-s1', title: '2023 Shift 1', year: '2023', type: 'shift', pdfPath: '/PDF/2023 shift 1.pdf' },
  { id: '2023-s2', title: '2023 Shift 2', year: '2023', type: 'shift', pdfPath: '/PDF/2023 shift 2.pdf' },
  { id: '2022-s1', title: '2022 Shift 1', year: '2022', type: 'shift', pdfPath: '/PDF/2022 shift 1.pdf' },
  { id: '2022-s2', title: '2022 Shift 2', year: '2022', type: 'shift', pdfPath: '/PDF/2022 shift 2.pdf' },
  { id: '2021-s1', title: '2021 Shift 1', year: '2021', type: 'shift', pdfPath: '/PDF/2021 shift 1.pdf' },
  { id: '2021-s2', title: '2021 Shift 2', year: '2021', type: 'shift', pdfPath: '/PDF/2021 shift 2.pdf' },
  { id: '2020-s1', title: '2020 Shift 1', year: '2020', type: 'shift', pdfPath: '/PDF/2020 shift 1.pdf' },
  { id: '2020-s2', title: '2020 Shift 2', year: '2020', type: 'shift', pdfPath: '/PDF/2020 shift 2.pdf' },
  { id: '2019-s1', title: '2019 Shift 1', year: '2019', type: 'shift', pdfPath: '/PDF/2019 shift 1.pdf' },
  { id: '2019-s2', title: '2019 Shift 2', year: '2019', type: 'shift', pdfPath: '/PDF/2019 shift 2.pdf' },
  
  // Grand Mocks (Model Papers)
  { id: 'model-1', title: 'ICET Model Paper 1', year: '2026', type: 'grand', pdfPath: '/PDF/2026 model paper 1.pdf' },
  { id: 'model-2', title: 'ICET Model Paper 2', year: '2026', type: 'grand', pdfPath: '/PDF/2026 model paper 2.pdf' },
  
  // Previous Year Sets (Splitting the large PDF logic will handle paths)
  { id: 'prev-set-1', title: 'Historical Set 1 (2014-2018)', year: '2014-2018', type: 'previous', pdfPath: '/PDF/APICET previous yr solved papers.pdf' },
  { id: 'prev-set-2', title: 'Historical Set 2 (2019-2023)', year: '2019-2023', type: 'previous', pdfPath: '/PDF/APICET previous yr solved papers.pdf' },
];
