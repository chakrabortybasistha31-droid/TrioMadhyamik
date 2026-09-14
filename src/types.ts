export type SubjectId = string;

export type OptionId = '(i)' | '(ii)' | '(iii)' | '(iv)';

export interface Option {
  id: OptionId;
  text: string;
}

export type DifficultyLevel = 'সহজ' | 'সাধারণ' | 'কঠিন';

export interface Question {
  id: string;
  subjectId: SubjectId;
  chapterId: string;
  question: string;
  options: Option[];
  correctOptionId: OptionId;
  explanation: string;
  // Admin-provided fields:
  difficulty?: DifficultyLevel | string;
  imageUrl?: string;
  date?: string;
  time?: string;
  englishTerm?: string;
  extraNote?: string;
  bengaliBeforeText?: string;
  bengaliAfterText?: string;
  comment?: string;
  review?: string;
  createdAt?: number;
  isCustom?: boolean;
}

export interface Chapter {
  id: string;
  subjectId?: SubjectId;
  name: string;
  description?: string;
  questionsCount?: number;
  isCustom?: boolean;
}

export interface Subject {
  id: SubjectId;
  name: string;
  subtitle: string;
  iconName: string;
  accentGradient?: string; // Tailwind gradient classes
  borderGlow?: string;
  badgeColor?: string;
  themeColor?: string;
  borderColor?: string;
  totalMarks?: number;
  chapters: Chapter[];
  isCustom?: boolean;
}

export type TimerDurationMinutes = 10 | 20 | 30 | 45 | 60 | 90;

export interface TestConfig {
  subject: Subject;
  chapter: Chapter | null; // null means 'সম্পূর্ণ সিলেবাস' (All Chapters)
  durationMinutes: TimerDurationMinutes;
  questionCount: number;
}

export interface AnswerState {
  selectedOptionId: OptionId;
  isLocked: boolean;
}

export interface TestResultSummary {
  subjectName: string;
  chapterName: string;
  totalQuestions: number;
  attemptedCount: number;
  correctCount: number;
  wrongCount: number;
  unansweredCount: number;
  score: number;
  percentage: number;
  timeAllocatedSeconds: number;
  timeSpentSeconds: number;
  questionDetails: {
    question: Question;
    selectedOptionId?: OptionId;
    isCorrect: boolean;
    isUnanswered: boolean;
  }[];
}

export interface StudentMockRecord {
  id: string;
  mockNumber: number; // 1, 2, 3...
  date: string; // e.g. "14 Sep, 2026"
  timestamp: number;
  subjectId: string;
  subjectName: string;
  chapterName: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  correctCount: number;
  wrongCount: number;
  unansweredCount: number;
  timeSpentSeconds: number;
}

