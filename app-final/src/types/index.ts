export type QuestionSection = 'Analytical' | 'Mathematical' | 'Communication';

export interface Option {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  number: number;
  section: QuestionSection;
  text: string;
  options: Option[];
  correctAnswer: string;
  explanation?: string;
}

export interface ExamState {
  testId: string;
  testName: string;
  questions: Question[];
  userAnswers: Record<string, string>; // questionId -> optionId
  status: Record<string, 'not-visited' | 'answered' | 'marked' | 'marked-answered'>;
  timeLeft: number; // in seconds
  startTime: number;
  endTime?: number;
  isPaused: boolean;
}

export interface UserPreferences {
  name: string;
  apiKey: string;
  hasOnboarded: boolean;
}

export interface TestMetadata {
  id: string;
  title: string;
  year: string;
  type: 'shift' | 'grand' | 'previous';
  pdfPath: string;
}
