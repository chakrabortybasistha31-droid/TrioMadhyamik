import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  BookOpen,
  Languages,
  Calculator,
  Atom,
  Dna,
  Landmark,
  Globe2,
  ChevronRight,
  ArrowLeft,
  Layers,
  Sparkles,
  HelpCircle,
  Clock,
  Box
} from 'lucide-react';
import { Subject, Chapter, Question } from '../types';
import { SUBJECTS, MOCK_QUESTIONS } from '../data/mockData';
import { toBengaliNumber } from '../utils/bengaliUtils';

interface SubjectSelectorProps {
  subjects?: Subject[];
  questions?: Question[];
  onSelect: (subject: Subject, chapter: Chapter | null) => void;
  onOpenDoubtClear?: () => void;
  onOpenThreeDModel?: () => void;
  onOpenPerformance?: () => void;
}

const getSubjectIcon = (iconName: string) => {
  switch (iconName) {
    case 'BookOpen':
      return <BookOpen className="w-6 h-6 text-cyan-400" />;
    case 'Languages':
      return <Languages className="w-6 h-6 text-sky-400" />;
    case 'Calculator':
      return <Calculator className="w-6 h-6 text-pink-400" />;
    case 'Atom':
      return <Atom className="w-6 h-6 text-teal-400" />;
    case 'Dna':
      return <Dna className="w-6 h-6 text-emerald-400" />;
    case 'Landmark':
      return <Landmark className="w-6 h-6 text-violet-400" />;
    case 'Globe2':
      return <Globe2 className="w-6 h-6 text-blue-400" />;
    default:
      return <BookOpen className="w-6 h-6 text-indigo-400" />;
  }
};

export const SubjectSelector: React.FC<SubjectSelectorProps> = ({
  subjects = SUBJECTS,
  questions = MOCK_QUESTIONS,
  onSelect,
  onOpenDoubtClear,
  onOpenThreeDModel,
  onOpenPerformance,
}) => {
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);

  // Calculate question count for subject
  const getSubjectQuestionCount = (subjectId: string) => {
    return questions.filter((q) => q.subjectId === subjectId).length;
  };

  // Calculate question count for chapter
  const getChapterQuestionCount = (chapterId: string) => {
    return questions.filter((q) => q.chapterId === chapterId).length;
  };

  return (
    <div id="subject-selection-container" className="w-full max-w-4xl mx-auto px-4 py-5 sm:py-7 space-y-6">
      <AnimatePresence mode="wait">
        {!selectedSubject ? (
          // STEP 1: Select Subject
          <motion.div
            key="subject-list"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Top Prompt Banner */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-950/70 via-indigo-950/60 to-purple-950/70 border border-indigo-500/30 p-5 sm:p-6 shadow-xl shadow-indigo-950/30">
              <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-cyan-300 text-xs font-semibold">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    <span>TrioMadhyamik • পদক্ষেপ ১ : বিষয় নির্বাচন</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                    যে বিষয়ের মক টেস্ট দিতে চান তা বেছে নিন
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    পশ্চিমবঙ্গ মধ্যশিক্ষা পর্ষদের (WBBSE) মাধ্যমিক ২০২৭ সিলেবাস অনুযায়ী ৭টি আবশ্যক বিষয়
                  </p>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-center bg-[#070b16]/80 px-3.5 py-2 rounded-xl border border-slate-700/50 shrink-0">
                  <Clock className="w-4 h-4 text-purple-400 shrink-0" />
                  <span className="text-xs text-slate-300 font-medium">১০-৯০ মিনিট টাইমার ও লক সুবিধা</span>
                </div>
              </div>
            </div>

            {/* Quick Action Highlights for Performance, Doubt Clear and 3D Model */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Performance Quick Card */}
              {onOpenPerformance && (
                <button
                  id="home-performance-card"
                  onClick={onOpenPerformance}
                  className="p-4 rounded-2xl bg-gradient-to-r from-indigo-950/40 via-[#0e1424] to-[#0e1424] hover:from-indigo-950/60 border border-indigo-500/30 hover:border-indigo-400/70 text-left transition-all group flex items-center justify-between shadow-lg cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-xl shrink-0 group-hover:scale-110 transition-transform">
                      📊
                    </div>
                    <div>
                      <div className="text-xs font-bold text-indigo-300 flex items-center gap-1">
                        <span>পারফর্ম্যান্স গ্রাফ</span>
                      </div>
                      <p className="text-[11px] text-slate-400 line-clamp-1">
                        মক টেস্ট স্কোর ও ধারাবাহিক অগ্রগতির রূপরেখা
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-indigo-400 group-hover:translate-x-1 transition-transform shrink-0 ml-2" />
                </button>
              )}

              {/* 1. 🔬 3D Models Quick Card */}
              {onOpenThreeDModel && (
                <button
                  id="home-3d-model-card"
                  onClick={onOpenThreeDModel}
                  className="p-4 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-[#0e1424] to-[#0e1424] hover:from-cyan-950/60 border border-cyan-500/30 hover:border-cyan-400/70 text-left transition-all group flex items-center justify-between shadow-lg cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-xl shrink-0 group-hover:scale-110 transition-transform">
                      🔬
                    </div>
                    <div>
                      <div className="text-xs font-bold text-cyan-300 flex items-center gap-1">
                        <span>🔬 3D Models</span>
                      </div>
                      <p className="text-[11px] text-slate-400 line-clamp-1">
                        পছন্দের subject/topic অনুযায়ী 3D model, English term ও গুরুত্বপূর্ণ অংশ
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform shrink-0 ml-2" />
                </button>
              )}

              {/* 2. 🤖 GimiDoubt Clear Quick Card */}
              {onOpenDoubtClear && (
                <button
                  id="home-doubt-clear-card"
                  onClick={onOpenDoubtClear}
                  className="p-4 rounded-2xl bg-gradient-to-r from-amber-950/40 via-[#0e1424] to-[#0e1424] hover:from-amber-950/60 border border-amber-500/30 hover:border-amber-400/70 text-left transition-all group flex items-center justify-between shadow-lg cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-xl shrink-0 group-hover:scale-110 transition-transform">
                      🤖
                    </div>
                    <div>
                      <div className="text-xs font-bold text-amber-300 flex items-center gap-1">
                        <span>🤖 GimiDoubt Clear</span>
                      </div>
                      <p className="text-[11px] text-slate-400 line-clamp-1">
                        Gemini AI-এর সাহায্যে Subject doubt ক্লিয়ার • 3D/2D visual ও graph
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform shrink-0 ml-2" />
                </button>
              )}
            </div>

            {/* Subjects Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
              {subjects.map((sub, index) => {
                const totalQ = getSubjectQuestionCount(sub.id);
                return (
                  <motion.button
                    key={sub.id}
                    id={`subject-card-${sub.id}`}
                    onClick={() => setSelectedSubject(sub)}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`group relative text-left p-4 sm:p-5 rounded-2xl bg-[#0e1424]/90 hover:bg-[#131b32] border border-slate-800/80 ${sub.borderGlow} transition-all duration-300 shadow-lg shadow-black/40 flex flex-col justify-between cursor-pointer min-h-[140px]`}
                  >
                    {/* Top gradient accent line */}
                    <div
                      className={`absolute top-0 left-4 right-4 h-[2px] bg-gradient-to-r ${sub.accentGradient} opacity-60 group-hover:opacity-100 transition-opacity rounded-full`}
                    />

                    <div>
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <div className="w-12 h-12 rounded-xl bg-slate-900/90 border border-slate-700/50 flex items-center justify-center group-hover:border-indigo-500/40 transition-colors shadow-inner">
                          {getSubjectIcon(sub.iconName)}
                        </div>
                        <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md border ${sub.badgeColor}`}>
                          {toBengaliNumber(sub.chapters.length)}টি অধ্যায়
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {sub.name}
                      </h3>
                      <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                        {sub.subtitle}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 group-hover:text-slate-200">
                      <span className="flex items-center gap-1 text-[11px]">
                        <HelpCircle className="w-3.5 h-3.5 text-purple-400" />
                        <span>{toBengaliNumber(totalQ)}টি সংরক্ষিত MCQ</span>
                      </span>
                      <span className="inline-flex items-center font-semibold text-purple-400 group-hover:translate-x-1 transition-transform">
                        অধ্যায় দেখুন <ChevronRight className="w-4 h-4 ml-0.5" />
                      </span>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        ) : (
          // STEP 2: Select Chapter for Selected Subject
          <motion.div
            key="chapter-list"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-5"
          >
            {/* Subject Context Header & Back Button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <button
                id="back-to-subjects-btn"
                onClick={() => setSelectedSubject(null)}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800/70 hover:bg-slate-700/70 border border-slate-700/60 text-xs font-semibold text-slate-200 transition-colors self-start cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4 text-purple-400" />
                <span>সকল বিষয়</span>
              </button>

              <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-slate-900/90 border border-indigo-900/40">
                <div className="w-6 h-6 rounded-lg bg-slate-800 flex items-center justify-center">
                  {getSubjectIcon(selectedSubject.iconName)}
                </div>
                <span className="text-sm font-bold text-white">{selectedSubject.name}</span>
                <span className="text-xs text-slate-400">({selectedSubject.subtitle})</span>
              </div>
            </div>

            {/* Instruction banner */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-purple-950/40 via-indigo-950/50 to-blue-950/40 border border-purple-500/20 shadow-lg">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-purple-300 mb-1">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span>পদক্ষেপ ২ : অধ্যায় নির্বাচন</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                মক টেস্টের জন্য নির্দিষ্ট অধ্যায় নির্বাচন করুন
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                আপনি একটি নির্দিষ্ট অধ্যায় নির্বাচন করতে পারেন অথবা পুরো বিষয়ের সম্পূর্ণ সিলেবাস পরীক্ষা দিতে পারেন।
              </p>
            </div>

            {/* Option to test All Chapters together */}
            <motion.button
              id="select-all-chapters-btn"
              onClick={() => onSelect(selectedSubject, null)}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="w-full text-left p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-900/40 via-indigo-900/50 to-purple-900/40 hover:from-blue-900/60 hover:to-purple-900/60 border-2 border-indigo-500/40 hover:border-indigo-400 transition-all shadow-xl shadow-indigo-950/40 flex items-center justify-between group cursor-pointer"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-indigo-600/30 border border-indigo-400/40 flex items-center justify-center shrink-0">
                  <Layers className="w-6 h-6 text-cyan-300" />
                </div>
                <div>
                  <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 mb-1">
                    সম্পূর্ণ সিলেবাস
                  </div>
                  <h4 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-200">
                    সকল অধ্যায় সংমিশ্রিত সম্পূর্ণ মক টেস্ট
                  </h4>
                  <p className="text-xs text-slate-300">
                    {selectedSubject.name}-এর সকল অধ্যায় থেকে প্রশ্ন নিয়ে চূড়ান্ত মাধ্যমিক প্রস্তুতি
                  </p>
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-1 text-xs font-bold text-cyan-400 group-hover:translate-x-1 transition-transform shrink-0 pl-2">
                <span>টেস্ট শুরু করুন</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </motion.button>

            {/* Chapter List */}
            <div className="space-y-2.5">
              <div className="text-xs font-semibold text-slate-400 px-1 uppercase tracking-wider flex items-center justify-between">
                <span>নির্দিষ্ট অধ্যায়সমূহ ({toBengaliNumber(selectedSubject.chapters.length)}টি)</span>
                <span>নির্বাচন করুন</span>
              </div>

              <div className="grid grid-cols-1 gap-2.5">
                {selectedSubject.chapters.map((chapter, idx) => {
                  const qCount = getChapterQuestionCount(chapter.id);
                  return (
                    <motion.button
                      key={chapter.id}
                      id={`chapter-card-${chapter.id}`}
                      onClick={() => onSelect(selectedSubject, chapter)}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.04, duration: 0.25 }}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="w-full text-left p-4 rounded-xl bg-[#0e1424]/90 hover:bg-[#141d33] border border-slate-800/80 hover:border-purple-500/40 transition-all flex items-center justify-between group shadow-md cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-purple-950/60 border border-purple-800/50 flex items-center justify-center font-bold text-xs text-purple-300 shrink-0">
                          {toBengaliNumber(idx + 1)}
                        </div>
                        <div>
                          <h4 className="text-sm sm:text-base font-bold text-slate-100 group-hover:text-purple-300 transition-colors">
                            {chapter.name}
                          </h4>
                          <span className="text-[11px] text-slate-400">
                            অধ্যায় ভিত্তিক প্রশ্ন ব্যাংক • {toBengaliNumber(qCount > 0 ? qCount : 'একাধিক')}টি MCQ
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-xs text-slate-400 group-hover:text-cyan-400 font-semibold shrink-0 pl-2">
                        <span className="hidden sm:inline">বাছাই করুন</span>
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
