import { Subject, Question } from '../types';
import { BENGALI_QUESTIONS } from './questions/bengaliQuestions';
import { ENGLISH_QUESTIONS } from './questions/englishQuestions';
import { MATH_QUESTIONS } from './questions/mathQuestions';
import { SCIENCE_QUESTIONS } from './questions/scienceQuestions';
import { HUMANITIES_QUESTIONS } from './questions/humanitiesQuestions';

export const OFFICIAL_SUBJECTS: Subject[] = [
  {
    id: 'bengali',
    name: 'বাংলা',
    subtitle: 'প্রথম ভাষা • সাহিত্য সঞ্চয়ন ও ব্যাকরণ',
    iconName: 'BookOpen',
    themeColor: 'from-amber-500 to-orange-600',
    borderColor: 'border-amber-500/30',
    totalMarks: 90,
    chapters: [
      { id: 'beng-1', name: 'জ্ঞানচক্ষু' },
      { id: 'beng-2', name: 'অসুখী একজন' },
      { id: 'beng-3', name: 'আয় আরো বেঁধে বেঁধে থাকি' },
      { id: 'beng-4', name: 'আফ্রিকা' },
      { id: 'beng-5', name: 'হারিয়ে যাওয়া কালি কলম' },
      { id: 'beng-6', name: 'বহুরূপী' },
      { id: 'beng-7', name: 'অভিষেক' },
      { id: 'beng-8', name: 'সিরাজদ্দৌলা' },
      { id: 'beng-9', name: 'প্রলয়োল্লাস' },
      { id: 'beng-10', name: 'পথের দাবী' },
      { id: 'beng-11', name: 'সিন্ধুতীরে' },
      { id: 'beng-12', name: 'অদল বদল' },
      { id: 'beng-13', name: 'বাংলা ভাষায় বিজ্ঞান' },
      { id: 'beng-14', name: 'অস্ত্রের বিরুদ্ধে গান' },
      { id: 'beng-15', name: 'নদীর বিদ্রোহ' },
      { id: 'beng-16', name: 'কারক ও অ-কারক সম্পর্ক' },
      { id: 'beng-17', name: 'সমাস' },
      { id: 'beng-18', name: 'বাক্য' },
      { id: 'beng-19', name: 'বাচ্য' }
    ]
  },
  {
    id: 'english',
    name: 'ইংরেজি',
    subtitle: 'Second Language • Grammar & Practice',
    iconName: 'Languages',
    themeColor: 'from-blue-500 to-indigo-600',
    borderColor: 'border-blue-500/30',
    totalMarks: 90,
    chapters: [
      { id: 'eng-1', name: 'Grammar — Tense' },
      { id: 'eng-2', name: 'Grammar — Voice Change' },
      { id: 'eng-3', name: 'Grammar — Narration' },
      { id: 'eng-4', name: 'Grammar — Transformation of Sentences' },
      { id: 'eng-5', name: 'Grammar — Articles' },
      { id: 'eng-6', name: 'Grammar — Prepositions' },
      { id: 'eng-7', name: 'Grammar — Right Form of Verb' },
      { id: 'eng-8', name: 'Grammar — Subject–Verb Agreement' },
      { id: 'eng-9', name: 'Grammar — Conjunction' },
      { id: 'eng-10', name: 'Grammar — Degree' },
      { id: 'eng-11', name: 'Grammar — অন্যান্য পরীক্ষাভিত্তিক Grammar' },
      { id: 'eng-12', name: 'Phrasal Verb' }
    ]
  },
  {
    id: 'mathematics',
    name: 'গণিত',
    subtitle: 'পাটিগণিত, বীজগণিত, জ্যামিতি, ত্রিকোণমিতি ও রাশিবিজ্ঞান',
    iconName: 'Calculator',
    themeColor: 'from-emerald-500 to-teal-600',
    borderColor: 'border-emerald-500/30',
    totalMarks: 90,
    chapters: [
      { id: 'math-1', name: 'একচলবিশিষ্ট দ্বিঘাত সমীকরণ' },
      { id: 'math-2', name: 'সরল সুদকষা' },
      { id: 'math-3', name: 'বৃত্ত সম্পর্কিত উপপাদ্য' },
      { id: 'math-4', name: 'আয়তঘন' },
      { id: 'math-5', name: 'অনুপাত ও সমানুপাত' },
      { id: 'math-6', name: 'চক্রবৃদ্ধি সুদ ও সমহার বৃদ্ধি বা হ্রাস' },
      { id: 'math-7', name: 'বৃত্তস্থ কোণ সম্পর্কিত উপপাদ্য' },
      { id: 'math-8', name: 'লম্ব বৃত্তাকার চোঙ' },
      { id: 'math-9', name: 'দ্বিঘাত করণী' },
      { id: 'math-10', name: 'বৃত্তস্থ চতুর্ভুজ সংক্রান্ত উপপাদ্য' },
      { id: 'math-11', name: 'সম্পাদ্য: ত্রিভুজের পরিবৃত্ত ও অন্তর্বৃত্ত অঙ্কন' },
      { id: 'math-12', name: 'গোলক' },
      { id: 'math-13', name: 'ভেদ' },
      { id: 'math-14', name: 'অংশীদারি কারবার' },
      { id: 'math-15', name: 'বৃত্তের স্পর্শক সংক্রান্ত উপপাদ্য' },
      { id: 'math-16', name: 'লম্ব বৃত্তাকার শঙ্কু' },
      { id: 'math-17', name: 'সম্পাদ্য: বৃত্তের স্পর্শক অঙ্কন' },
      { id: 'math-18', name: 'সদৃশ্যতা' },
      { id: 'math-19', name: 'বিভিন্ন ঘনবস্তু সংক্রান্ত বাস্তব সমস্যা' },
      { id: 'math-20', name: 'ত্রিকোণমিতি: কোণ পরিমাপের ধারণা' },
      { id: 'math-21', name: 'সম্পাদ্য: মধ্যসমানুপাতী নির্ণয়' },
      { id: 'math-22', name: 'পিথাগোরাসের উপপাদ্য' },
      { id: 'math-23', name: 'ত্রিকোণমিতিক অনুপাত এবং ত্রিকোণমিতিক অভেদাবলি' },
      { id: 'math-24', name: 'পূরক কোণের ত্রিকোণমিতিক অনুপাত' },
      { id: 'math-25', name: 'ত্রিকোণমিতির প্রয়োগ: উচ্চতা ও দূরত্ব' },
      { id: 'math-26', name: 'পরিসংখ্যান: গড়, মধ্যমা, ওজাইভ, সংখ্যাগুরু মান' }
    ]
  },
  {
    id: 'physical_science',
    name: 'ভৌতবিজ্ঞান ও পরিবেশ',
    subtitle: 'পদার্থবিদ্যা, রসায়ন ও পরিবেশগত ধারণা',
    iconName: 'Atom',
    themeColor: 'from-cyan-500 to-blue-600',
    borderColor: 'border-cyan-500/30',
    totalMarks: 90,
    chapters: [
      { id: 'phys-1', name: 'পরিবেশের জন্য ভাবনা' },
      { id: 'phys-2', name: 'গ্যাসের আচরণ' },
      { id: 'phys-3', name: 'রাসায়নিক গণনা' },
      { id: 'phys-4', name: 'তাপের ঘটনাসমূহ' },
      { id: 'phys-5', name: 'আলো' },
      { id: 'phys-6', name: 'চলতড়িৎ' },
      { id: 'phys-7', name: 'পরমাণুর নিউক্লিয়াস' },
      { id: 'phys-8', name: 'পর্যায় সারণি এবং মৌলের ধর্মের পর্যাবৃত্ততা' },
      { id: 'phys-9', name: 'আয়নিক ও সমযোজী বন্ধন' },
      { id: 'phys-10', name: 'তড়িৎপ্রবাহ এবং রাসায়নিক বিক্রিয়া' },
      { id: 'phys-11', name: 'পরীক্ষাগারে ও রাসায়নিক শিল্পে অজৈব রসায়ন' },
      { id: 'phys-12', name: 'ধাতুবিদ্যা' },
      { id: 'phys-13', name: 'জৈব রসায়ন' },
      { id: 'phys-14', name: 'অধ্যায়ে ব্যবহৃত পরিভাষা' }
    ]
  },
  {
    id: 'life_science',
    name: 'জীবনবিজ্ঞান',
    subtitle: 'নিয়ন্ত্রণ, প্রবাহমানতা, বংশগতি ও অভিযোজন',
    iconName: 'Dna',
    themeColor: 'from-green-500 to-emerald-600',
    borderColor: 'border-green-500/30',
    totalMarks: 90,
    chapters: [
      { id: 'life-1', name: 'জীবজগতে নিয়ন্ত্রণ ও সমন্বয়' },
      { id: 'life-2', name: 'জীবনের প্রবাহমানতা' },
      { id: 'life-3', name: 'বংশগতি এবং কয়েকটি সাধারণ জিনগত রোগ' },
      { id: 'life-4', name: 'অভিব্যক্তি ও অভিযোজন' },
      { id: 'life-5', name: 'পরিবেশ, তার সম্পদ এবং তার সংরক্ষণ' }
    ]
  },
  {
    id: 'history',
    name: 'ইতিহাস',
    subtitle: 'ভারতের জাতীয় আন্দোলন ও সামাজিক রূপান্তর',
    iconName: 'Clock',
    themeColor: 'from-rose-500 to-red-600',
    borderColor: 'border-rose-500/30',
    totalMarks: 90,
    chapters: [
      { id: 'hist-1', name: 'ইতিহাসের ধারণা' },
      { id: 'hist-2', name: 'সংস্কার: বৈশিষ্ট্য ও পর্যালোচনা' },
      { id: 'hist-3', name: 'প্রতিরোধ ও বিদ্রোহ: বৈশিষ্ট্য ও বিশ্লেষণ' },
      { id: 'hist-4', name: 'সংঘবদ্ধতার গোড়ার কথা: বৈশিষ্ট্য ও বিশ্লেষণ' },
      { id: 'hist-5', name: 'বিকল্প চিন্তা ও উদ্যোগ' },
      { id: 'hist-6', name: 'বিশ শতকের ভারতে কৃষক, শ্রমিক ও বামপন্থী আন্দোলন' },
      { id: 'hist-7', name: 'বিশ শতকের ভারতে নারী, ছাত্র ও প্রান্তিক জনগোষ্ঠীর আন্দোলন' },
      { id: 'hist-8', name: 'উত্তর-ঔপনিবেশিক ভারত: বিশ শতকের দ্বিতীয় পর্ব (১৯৪৭–১৯৬৪)' }
    ]
  },
  {
    id: 'geography',
    name: 'ভূগোল',
    subtitle: 'প্রাকৃতিক পরিবেশ, আঞ্চলিক ভূগোল ও ভারত',
    iconName: 'Globe',
    themeColor: 'from-violet-500 to-purple-600',
    borderColor: 'border-violet-500/30',
    totalMarks: 90,
    chapters: [
      { id: 'geog-1', name: 'বহির্জাত প্রক্রিয়া ও সৃষ্ট ভূমিরূপ' },
      { id: 'geog-2', name: 'বায়ুমণ্ডল' },
      { id: 'geog-3', name: 'বারিমণ্ডল' },
      { id: 'geog-4', name: 'বর্জ্য ব্যবস্থাপনা' },
      { id: 'geog-5', name: 'ভারত' },
      { id: 'geog-6', name: 'উপগ্রহচিত্র ও ভূবৈচিত্রসূচক মানচিত্র' }
    ]
  }
];

export const ALL_CURRICULUM_QUESTIONS: Question[] = [
  ...BENGALI_QUESTIONS,
  ...ENGLISH_QUESTIONS,
  ...MATH_QUESTIONS,
  ...SCIENCE_QUESTIONS,
  ...HUMANITIES_QUESTIONS
];
