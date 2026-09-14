import { Question, Subject, Chapter, StudentMockRecord, TestResultSummary } from '../types';
import { SUBJECTS, MOCK_QUESTIONS } from '../data/mockData';

const STORAGE_KEYS = {
  CUSTOM_QUESTIONS: 'trio_madhyamik_custom_questions_v2',
  DELETED_QUESTION_IDS: 'trio_madhyamik_deleted_questions_v2',
  CUSTOM_SUBJECTS: 'trio_madhyamik_custom_subjects_v2',
  STUDENT_HISTORY: 'trio_madhyamik_student_history_v1',
  ADMIN_AUTH: 'trio_madhyamik_admin_auth_v1',
};

// ----------------------
// QUESTIONS REPOSITORY
// ----------------------

export function getStoredQuestions(): Question[] {
  try {
    const customJson = localStorage.getItem(STORAGE_KEYS.CUSTOM_QUESTIONS);
    const deletedJson = localStorage.getItem(STORAGE_KEYS.DELETED_QUESTION_IDS);

    const customQuestions: Question[] = customJson ? JSON.parse(customJson) : [];
    const deletedIds: string[] = deletedJson ? JSON.parse(deletedJson) : [];

    // Filter out deleted from default
    const filteredDefault = MOCK_QUESTIONS.filter((q) => !deletedIds.includes(q.id));

    // Merge: custom questions can be new or edits of default questions
    const questionMap = new Map<string, Question>();
    filteredDefault.forEach((q) => questionMap.set(q.id, q));
    customQuestions.forEach((q) => {
      if (!deletedIds.includes(q.id)) {
        questionMap.set(q.id, q);
      }
    });

    return Array.from(questionMap.values());
  } catch (err) {
    console.error('Failed to load questions from storage:', err);
    return MOCK_QUESTIONS;
  }
}

export function saveQuestion(question: Question): Question[] {
  try {
    const customJson = localStorage.getItem(STORAGE_KEYS.CUSTOM_QUESTIONS);
    let customQuestions: Question[] = customJson ? JSON.parse(customJson) : [];

    const existingIndex = customQuestions.findIndex((q) => q.id === question.id);
    if (existingIndex >= 0) {
      customQuestions[existingIndex] = { ...question, isCustom: true };
    } else {
      customQuestions.push({ ...question, isCustom: true });
    }

    localStorage.setItem(STORAGE_KEYS.CUSTOM_QUESTIONS, JSON.stringify(customQuestions));

    // If it was in deleted list, remove it
    const deletedJson = localStorage.getItem(STORAGE_KEYS.DELETED_QUESTION_IDS);
    if (deletedJson) {
      const deletedIds: string[] = JSON.parse(deletedJson);
      const filtered = deletedIds.filter((id) => id !== question.id);
      localStorage.setItem(STORAGE_KEYS.DELETED_QUESTION_IDS, JSON.stringify(filtered));
    }

    return getStoredQuestions();
  } catch (err) {
    console.error('Failed to save question:', err);
    return getStoredQuestions();
  }
}

export function deleteQuestion(questionId: string): Question[] {
  try {
    // 1. Remove from custom questions if present
    const customJson = localStorage.getItem(STORAGE_KEYS.CUSTOM_QUESTIONS);
    if (customJson) {
      const customQuestions: Question[] = JSON.parse(customJson);
      const filtered = customQuestions.filter((q) => q.id !== questionId);
      localStorage.setItem(STORAGE_KEYS.CUSTOM_QUESTIONS, JSON.stringify(filtered));
    }

    // 2. Add to deleted IDs list
    const deletedJson = localStorage.getItem(STORAGE_KEYS.DELETED_QUESTION_IDS);
    const deletedIds: string[] = deletedJson ? JSON.parse(deletedJson) : [];
    if (!deletedIds.includes(questionId)) {
      deletedIds.push(questionId);
      localStorage.setItem(STORAGE_KEYS.DELETED_QUESTION_IDS, JSON.stringify(deletedIds));
    }

    return getStoredQuestions();
  } catch (err) {
    console.error('Failed to delete question:', err);
    return getStoredQuestions();
  }
}

// ----------------------
// SUBJECTS REPOSITORY
// ----------------------

export function getStoredSubjects(): Subject[] {
  try {
    const customJson = localStorage.getItem(STORAGE_KEYS.CUSTOM_SUBJECTS);
    if (!customJson) {
      return SUBJECTS;
    }
    const customSubjects: Subject[] = JSON.parse(customJson);

    // Merge default subjects with custom subjects or chapters added to defaults
    const subjectMap = new Map<string, Subject>();
    SUBJECTS.forEach((s) => subjectMap.set(s.id, { ...s, chapters: [...s.chapters] }));

    customSubjects.forEach((cs) => {
      if (subjectMap.has(cs.id)) {
        // Merge chapters
        const existing = subjectMap.get(cs.id)!;
        const chapterMap = new Map<string, Chapter>();
        existing.chapters.forEach((ch) => chapterMap.set(ch.id, ch));
        cs.chapters.forEach((ch) => chapterMap.set(ch.id, ch));
        subjectMap.set(cs.id, {
          ...existing,
          ...cs,
          chapters: Array.from(chapterMap.values()),
        });
      } else {
        // Completely new subject added by admin
        subjectMap.set(cs.id, cs);
      }
    });

    return Array.from(subjectMap.values());
  } catch (err) {
    console.error('Failed to load subjects:', err);
    return SUBJECTS;
  }
}

export function saveSubject(subject: Subject): Subject[] {
  try {
    const currentSubjects = getStoredSubjects();
    const existingIndex = currentSubjects.findIndex((s) => s.id === subject.id);
    let updated: Subject[];

    if (existingIndex >= 0) {
      updated = [...currentSubjects];
      updated[existingIndex] = { ...subject, isCustom: true };
    } else {
      updated = [...currentSubjects, { ...subject, isCustom: true }];
    }

    localStorage.setItem(STORAGE_KEYS.CUSTOM_SUBJECTS, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Failed to save subject:', err);
    return getStoredSubjects();
  }
}

export function addChapterToSubject(subjectId: string, chapter: Chapter): Subject[] {
  try {
    const currentSubjects = getStoredSubjects();
    const target = currentSubjects.find((s) => s.id === subjectId);
    if (!target) return currentSubjects;

    const chapterExists = target.chapters.some((c) => c.id === chapter.id);
    let updatedChapters: Chapter[];
    if (chapterExists) {
      updatedChapters = target.chapters.map((c) => (c.id === chapter.id ? { ...chapter, isCustom: true } : c));
    } else {
      updatedChapters = [...target.chapters, { ...chapter, isCustom: true }];
    }

    const updatedSubject: Subject = {
      ...target,
      chapters: updatedChapters,
      isCustom: true,
    };

    return saveSubject(updatedSubject);
  } catch (err) {
    console.error('Failed to add chapter:', err);
    return getStoredSubjects();
  }
}

// ----------------------
// STUDENT PERFORMANCE REPOSITORY
// ----------------------

const INITIAL_DEMO_RECORDS: StudentMockRecord[] = [
  {
    id: 'mock-sample-1',
    mockNumber: 1,
    date: '১০ সেপ্টেম্বর, ২০২৬',
    timestamp: Date.now() - 4 * 86400000,
    subjectId: 'physical_science',
    subjectName: 'ভৌতবিজ্ঞান ও পরিবেশ',
    chapterName: 'পরিবেশের জন্য ভাবনা',
    score: 9,
    totalQuestions: 20,
    percentage: 45,
    correctCount: 9,
    wrongCount: 8,
    unansweredCount: 3,
    timeSpentSeconds: 540,
  },
  {
    id: 'mock-sample-2',
    mockNumber: 2,
    date: '১১ সেপ্টেম্বর, ২০২৬',
    timestamp: Date.now() - 3 * 86400000,
    subjectId: 'life_science',
    subjectName: 'জীবনবিজ্ঞান',
    chapterName: 'জীবজগতে নিয়ন্ত্রণ ও সমন্বয়',
    score: 12,
    totalQuestions: 20,
    percentage: 60,
    correctCount: 12,
    wrongCount: 6,
    unansweredCount: 2,
    timeSpentSeconds: 610,
  },
  {
    id: 'mock-sample-3',
    mockNumber: 3,
    date: '১২ সেপ্টেম্বর, ২০২৬',
    timestamp: Date.now() - 2 * 86400000,
    subjectId: 'mathematics',
    subjectName: 'গণিত',
    chapterName: 'একচলবিশিষ্ট দ্বিঘাত সমীকরণ',
    score: 14,
    totalQuestions: 20,
    percentage: 70,
    correctCount: 14,
    wrongCount: 4,
    unansweredCount: 2,
    timeSpentSeconds: 780,
  },
  {
    id: 'mock-sample-4',
    mockNumber: 4,
    date: '১৩ সেপ্টেম্বর, ২০২৬',
    timestamp: Date.now() - 1 * 86400000,
    subjectId: 'history',
    subjectName: 'ইতিহাস',
    chapterName: 'সংস্কার: বৈশিষ্ট্য ও পর্যালোচনা',
    score: 16,
    totalQuestions: 20,
    percentage: 80,
    correctCount: 16,
    wrongCount: 3,
    unansweredCount: 1,
    timeSpentSeconds: 520,
  },
];

export function getStudentHistory(): StudentMockRecord[] {
  try {
    const historyJson = localStorage.getItem(STORAGE_KEYS.STUDENT_HISTORY);
    if (!historyJson) {
      // Initialize with sample practice mocks so student immediately sees how the performance graph works
      localStorage.setItem(STORAGE_KEYS.STUDENT_HISTORY, JSON.stringify(INITIAL_DEMO_RECORDS));
      return INITIAL_DEMO_RECORDS;
    }
    return JSON.parse(historyJson);
  } catch (err) {
    console.error('Failed to get student history:', err);
    return INITIAL_DEMO_RECORDS;
  }
}

export function saveStudentMockResult(
  result: TestResultSummary,
  subjectId: string
): StudentMockRecord[] {
  try {
    const current = getStudentHistory();
    const nextMockNumber = current.length + 1;

    const today = new Date();
    const months = [
      'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
      'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'
    ];
    const dateFormatted = `${today.getDate()} ${months[today.getMonth()]}, ${today.getFullYear()}`;

    const newRecord: StudentMockRecord = {
      id: `mock-${Date.now()}`,
      mockNumber: nextMockNumber,
      date: dateFormatted,
      timestamp: Date.now(),
      subjectId: subjectId || 'general',
      subjectName: result.subjectName,
      chapterName: result.chapterName,
      score: result.score,
      totalQuestions: result.totalQuestions,
      percentage: result.percentage,
      correctCount: result.correctCount,
      wrongCount: result.wrongCount,
      unansweredCount: result.unansweredCount,
      timeSpentSeconds: result.timeSpentSeconds,
    };

    const updated = [...current, newRecord];
    localStorage.setItem(STORAGE_KEYS.STUDENT_HISTORY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Failed to save student result:', err);
    return getStudentHistory();
  }
}

export function clearStudentHistory(): StudentMockRecord[] {
  try {
    localStorage.removeItem(STORAGE_KEYS.STUDENT_HISTORY);
    return [];
  } catch (err) {
    console.error('Failed to clear student history:', err);
    return [];
  }
}

// Convenient export aliases
export const getAllQuestions = getStoredQuestions;
export const saveCustomQuestion = saveQuestion;
export const deleteQuestionById = deleteQuestion;
export const getAllSubjects = getStoredSubjects;
export const saveCustomSubject = saveSubject;

