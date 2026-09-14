import { Subject, Question } from '../types';
import { OFFICIAL_SUBJECTS, ALL_CURRICULUM_QUESTIONS } from './curriculumData';

// Official TrioMadhyamik 7 Subjects with exact chapter syllabus
export const SUBJECTS: Subject[] = OFFICIAL_SUBJECTS.map((s) => {
  // Add styling properties for UI badges and card glows
  let accentGradient = 'from-blue-600 via-indigo-600 to-purple-600';
  let borderGlow = 'hover:border-indigo-500/50';
  let badgeColor = 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30';

  if (s.id === 'bengali') {
    accentGradient = 'from-amber-600 via-orange-600 to-amber-700';
    borderGlow = 'hover:border-amber-500/50';
    badgeColor = 'bg-amber-500/10 text-amber-300 border-amber-500/30';
  } else if (s.id === 'english') {
    accentGradient = 'from-sky-600 via-blue-600 to-indigo-700';
    borderGlow = 'hover:border-sky-500/50';
    badgeColor = 'bg-sky-500/10 text-sky-300 border-sky-500/30';
  } else if (s.id === 'mathematics') {
    accentGradient = 'from-emerald-600 via-teal-600 to-cyan-700';
    borderGlow = 'hover:border-emerald-500/50';
    badgeColor = 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30';
  } else if (s.id === 'physical_science') {
    accentGradient = 'from-blue-600 via-cyan-600 to-teal-500';
    borderGlow = 'hover:border-cyan-500/50';
    badgeColor = 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30';
  } else if (s.id === 'life_science') {
    accentGradient = 'from-green-600 via-emerald-600 to-teal-600';
    borderGlow = 'hover:border-green-500/50';
    badgeColor = 'bg-green-500/10 text-green-300 border-green-500/30';
  } else if (s.id === 'history') {
    accentGradient = 'from-rose-600 via-red-600 to-orange-700';
    borderGlow = 'hover:border-rose-500/50';
    badgeColor = 'bg-rose-500/10 text-rose-300 border-rose-500/30';
  } else if (s.id === 'geography') {
    accentGradient = 'from-violet-600 via-purple-700 to-indigo-800';
    borderGlow = 'hover:border-violet-500/50';
    badgeColor = 'bg-violet-500/10 text-violet-300 border-violet-500/30';
  }

  return {
    ...s,
    accentGradient,
    borderGlow,
    badgeColor,
    chapters: s.chapters.map((ch) => ({
      ...ch,
      subjectId: s.id,
    })),
  };
});

// Comprehensive Mock Question Bank for Madhyamik
export const MOCK_QUESTIONS: Question[] = ALL_CURRICULUM_QUESTIONS;
