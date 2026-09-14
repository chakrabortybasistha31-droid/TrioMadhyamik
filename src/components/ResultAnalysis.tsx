import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Trophy,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Clock,
  RotateCcw,
  BookOpen,
  ArrowRight,
  Filter,
  Lightbulb,
  Sparkles,
  Share2,
  TrendingUp,
} from 'lucide-react';
import { TestResultSummary, OptionId } from '../types';
import { formatTimerSeconds, toBengaliNumber } from '../utils/bengaliUtils';

interface ResultAnalysisProps {
  result: TestResultSummary;
  onRetake: () => void;
  onChooseNewSubject: () => void;
  onOpenPerformance?: () => void;
  onOpenDoubtClear?: (initialQuery?: string) => void;
}

type FilterType = 'all' | 'correct' | 'wrong' | 'unanswered';

export const ResultAnalysis: React.FC<ResultAnalysisProps> = ({
  result,
  onRetake,
  onChooseNewSubject,
  onOpenPerformance,
  onOpenDoubtClear,
}) => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [copied, setCopied] = useState(false);

  const timeSpentFormatted = formatTimerSeconds(result.timeSpentSeconds);

  // Performance message
  const getPerformanceMessage = (percentage: number) => {
    if (percentage >= 80) {
      return {
        title: 'অসাধারণ ফলাফল!',
        subtitle: 'মাধ্যমিক ২০২৭-এ প্রথম সারির স্কোরের নিশ্চিত সম্ভাবনা। এই ধারাবাহিকতা বজায় রাখো!',
        color: 'from-emerald-500 to-teal-400',
        badge: 'চমৎকার প্রস্তুতি'
      };
    } else if (percentage >= 60) {
      return {
        title: 'খুবই ভালো প্রস্তুতি!',
        subtitle: 'অধিকাংশ ধারণা স্পষ্ট। যে ভুলগুলো হয়েছে তার ব্যাখ্যা মন দিয়ে পড়ে নাও।',
        color: 'from-blue-500 to-indigo-400',
        badge: 'সন্তোষজনক অগ্রগতি'
      };
    } else if (percentage >= 40) {
      return {
        title: 'আরও একটু অনুশীলন দরকার!',
        subtitle: 'পাঠ্যবইয়ের গুরুত্বপূর্ণ অংশগুলো পুনরায় রিভিশন দাও এবং মক টেস্ট দিতে থাকো।',
        color: 'from-amber-500 to-orange-400',
        badge: 'মধ্যম প্রস্তুতি'
      };
    } else {
      return {
        title: 'গভীর পাঠাভ্যাস প্রয়োজন!',
        subtitle: 'নিচে দেওয়া বিশদ ব্যাখ্যাগুলো মনোযোগ সহকারে পড়ে নাও এবং আবার চেষ্টা করো।',
        color: 'from-rose-500 to-pink-500',
        badge: 'পুনর্বিবেচনা প্রয়োজন'
      };
    }
  };

  const performance = getPerformanceMessage(result.percentage);

  // Filter questions
  const filteredQuestions = result.questionDetails.filter((item) => {
    if (activeFilter === 'correct') return item.isCorrect;
    if (activeFilter === 'wrong') return !item.isCorrect && !item.isUnanswered;
    if (activeFilter === 'unanswered') return item.isUnanswered;
    return true;
  });

  const handleShare = () => {
    const text = `আমি সৃজন মাধ্যমিক ২০২৭ মক টেস্টে ${result.subjectName}-এ ${toBengaliNumber(result.score)}/${toBengaliNumber(result.totalQuestions)} (${toBengaliNumber(result.percentage)}%) পেয়েছি!`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div id="result-analysis-container" className="w-full max-w-3xl mx-auto px-4 py-6 sm:py-8 space-y-6">
      {/* Top Congratulatory Hero Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#121933] via-[#0d1428] to-[#0a0f1e] border border-indigo-500/30 p-6 sm:p-8 shadow-2xl shadow-indigo-950/60 text-center"
      >
        {/* Glow ambient */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>{performance.badge}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            {performance.title}
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
            {performance.subtitle}
          </p>

          {/* Subject & Chapter tag */}
          <div className="pt-1 text-xs text-cyan-300 font-semibold">
            <span>{result.subjectName}</span> • <span>{result.chapterName}</span>
          </div>

          {/* Large Circular / Highlighted Score Gauge */}
          <div className="pt-4 flex justify-center">
            <div className="w-36 h-36 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 p-1 shadow-[0_0_30px_rgba(99,102,241,0.3)]">
              <div className="w-full h-full bg-[#0b0f1d] rounded-full flex flex-col items-center justify-center">
                <span className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-cyan-400 via-white to-purple-300 bg-clip-text text-transparent font-mono">
                  {toBengaliNumber(result.score)}
                  <span className="text-lg text-slate-400 font-normal">/{toBengaliNumber(result.totalQuestions)}</span>
                </span>
                <span className="text-xs font-bold text-purple-300 mt-0.5">
                  {toBengaliNumber(result.percentage)}% প্রাপ্ত নম্বর
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Metric Breakdown Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* Correct Answers */}
        <div className="p-4 rounded-2xl bg-[#0e1424] border border-emerald-900/50 shadow-md flex flex-col items-center text-center">
          <div className="w-8 h-8 rounded-xl bg-emerald-950/80 border border-emerald-800/60 flex items-center justify-center text-emerald-400 mb-2">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <span className="text-xs text-slate-400">সঠিক উত্তর</span>
          <span className="text-xl font-extrabold text-emerald-300 mt-1">
            {toBengaliNumber(result.correctCount)}
          </span>
          <span className="text-[10px] text-emerald-500 font-medium">
            ({toBengaliNumber(Math.round((result.correctCount / result.totalQuestions) * 100))}%)
          </span>
        </div>

        {/* Wrong Answers */}
        <div className="p-4 rounded-2xl bg-[#0e1424] border border-rose-900/50 shadow-md flex flex-col items-center text-center">
          <div className="w-8 h-8 rounded-xl bg-rose-950/80 border border-rose-800/60 flex items-center justify-center text-rose-400 mb-2">
            <XCircle className="w-4 h-4" />
          </div>
          <span className="text-xs text-slate-400">ভুল উত্তর</span>
          <span className="text-xl font-extrabold text-rose-300 mt-1">
            {toBengaliNumber(result.wrongCount)}
          </span>
          <span className="text-[10px] text-rose-500 font-medium">
            ({toBengaliNumber(Math.round((result.wrongCount / result.totalQuestions) * 100))}%)
          </span>
        </div>

        {/* Unanswered */}
        <div className="p-4 rounded-2xl bg-[#0e1424] border border-slate-800 shadow-md flex flex-col items-center text-center">
          <div className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-700/60 flex items-center justify-center text-slate-400 mb-2">
            <HelpCircle className="w-4 h-4" />
          </div>
          <span className="text-xs text-slate-400">উত্তরহীন</span>
          <span className="text-xl font-extrabold text-slate-300 mt-1">
            {toBengaliNumber(result.unansweredCount)}
          </span>
          <span className="text-[10px] text-slate-500 font-medium">
            ({toBengaliNumber(Math.round((result.unansweredCount / result.totalQuestions) * 100))}%)
          </span>
        </div>

        {/* Time Taken */}
        <div className="p-4 rounded-2xl bg-[#0e1424] border border-blue-900/50 shadow-md flex flex-col items-center text-center">
          <div className="w-8 h-8 rounded-xl bg-blue-950/80 border border-blue-800/60 flex items-center justify-center text-cyan-400 mb-2">
            <Clock className="w-4 h-4" />
          </div>
          <span className="text-xs text-slate-400">ব্যয়িত সময়</span>
          <span className="text-xl font-extrabold text-cyan-300 mt-1 font-mono">
            {timeSpentFormatted.fullBn}
          </span>
          <span className="text-[10px] text-slate-400">মিনিট : সেকেন্ড</span>
        </div>
      </div>

      {/* Action CTA Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          id="retake-test-btn"
          onClick={onRetake}
          className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-950/40 cursor-pointer transition-all"
        >
          <RotateCcw className="w-4 h-4" />
          <span>আবার এই পরীক্ষা দিন</span>
        </button>

        {onOpenPerformance && (
          <button
            id="view-performance-graph-btn"
            onClick={onOpenPerformance}
            className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-purple-950/40 cursor-pointer transition-all"
          >
            <TrendingUp className="w-4 h-4 text-cyan-300" />
            <span>পারফর্ম্যান্স গ্রাফ</span>
          </button>
        )}

        <button
          id="choose-new-subject-btn"
          onClick={onChooseNewSubject}
          className="flex-1 py-3 px-4 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 text-slate-200 font-bold text-sm flex items-center justify-center gap-2 cursor-pointer transition-all"
        >
          <BookOpen className="w-4 h-4 text-purple-400" />
          <span>নতুন বিষয় নির্বাচন</span>
        </button>

        <button
          id="share-result-btn"
          onClick={handleShare}
          className="py-3 px-4 rounded-xl bg-slate-800/60 hover:bg-slate-700/60 border border-slate-700/80 text-slate-300 text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
          title="স্কোর কপি করুন"
        >
          <Share2 className="w-4 h-4 text-cyan-400" />
          <span>{copied ? 'কপি হয়েছে!' : 'শেয়ার'}</span>
        </button>
      </div>

      {/* Section Header: Detailed Question Review & Explanations */}
      <div className="pt-2 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-800">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-amber-400" />
              <span>প্রশ্নের বিশদ বিশ্লেষণ ও পাঠ্যভিত্তিক ব্যাখ্যা</span>
            </h3>
            <p className="text-xs text-slate-400">
              সঠিক উত্তর এবং প্রতিটি প্রশ্নের সঠিক উত্তরের কারণ ভালো করে বুঝে নিন
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1 bg-[#0b101e] p-1 rounded-xl border border-slate-800 self-start sm:self-auto overflow-x-auto max-w-full">
            <button
              id="filter-all-btn"
              onClick={() => setActiveFilter('all')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-purple-600 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              সকল ({toBengaliNumber(result.totalQuestions)})
            </button>
            <button
              id="filter-correct-btn"
              onClick={() => setActiveFilter('correct')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeFilter === 'correct'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              সঠিক ({toBengaliNumber(result.correctCount)})
            </button>
            <button
              id="filter-wrong-btn"
              onClick={() => setActiveFilter('wrong')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeFilter === 'wrong'
                  ? 'bg-rose-600 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              ভুল ({toBengaliNumber(result.wrongCount)})
            </button>
            <button
              id="filter-unanswered-btn"
              onClick={() => setActiveFilter('unanswered')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeFilter === 'unanswered'
                  ? 'bg-slate-700 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              বাকি ({toBengaliNumber(result.unansweredCount)})
            </button>
          </div>
        </div>

        {/* Question Review Cards List */}
        <div className="space-y-4">
          {filteredQuestions.length === 0 ? (
            <div className="p-8 text-center text-slate-400 bg-[#0e1424] rounded-2xl border border-slate-800 text-xs">
              এই ফিল্টারে কোনো প্রশ্ন পাওয়া যায়নি।
            </div>
          ) : (
            filteredQuestions.map((detail, idx) => {
              const q = detail.question;
              const isCorrect = detail.isCorrect;
              const isUnanswered = detail.isUnanswered;

              let statusBadge = (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>সঠিক উত্তর</span>
                </span>
              );

              if (isUnanswered) {
                statusBadge = (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-800 text-slate-400 border border-slate-700">
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>উত্তর দেওয়া হয়নি</span>
                  </span>
                );
              } else if (!isCorrect) {
                statusBadge = (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-500/10 text-rose-400 border border-rose-500/30">
                    <XCircle className="w-3.5 h-3.5" />
                    <span>ভুল উত্তর</span>
                  </span>
                );
              }

              return (
                <div
                  key={q.id}
                  id={`review-question-card-${q.id}`}
                  className="p-5 sm:p-6 rounded-2xl bg-[#0e1424] border border-slate-800/90 shadow-lg space-y-4"
                >
                  {/* Question header */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="w-6 h-6 rounded-md bg-purple-950/80 border border-purple-800/50 text-purple-300 font-bold text-xs flex items-center justify-center">
                      {toBengaliNumber(idx + 1)}
                    </span>
                    {statusBadge}
                  </div>

                  {/* Context passage if present */}
                  {q.bengaliBeforeText && (
                    <p className="text-xs text-slate-400 italic bg-[#080d1a] p-2 rounded-lg border border-slate-800">
                      {q.bengaliBeforeText}
                    </p>
                  )}

                  {/* Question text */}
                  <div>
                    <h4 className="text-base sm:text-lg font-bold text-white leading-relaxed">
                      {q.question}
                    </h4>
                    {q.englishTerm && (
                      <span className="text-xs text-cyan-300 font-mono">
                        ({q.englishTerm})
                      </span>
                    )}
                  </div>

                  {/* Question Image if present */}
                  {q.imageUrl && (
                    <div className="max-w-sm rounded-xl overflow-hidden border border-slate-700 my-2">
                      <img src={q.imageUrl} alt="Question Visual" className="w-full h-auto object-cover" />
                    </div>
                  )}

                  {/* Option list displaying user's choice and the correct option */}
                  <div className="space-y-2 pt-1">
                    {q.options.map((opt) => {
                      const isOptionCorrect = opt.id === q.correctOptionId;
                      const isOptionSelected = detail.selectedOptionId === opt.id;

                      let optClasses = 'p-3 rounded-xl border text-xs sm:text-sm flex items-center justify-between gap-3 ';

                      if (isOptionCorrect) {
                        // Correct Answer style (Always highlighted clearly in green)
                        optClasses += 'bg-emerald-950/50 border-emerald-500/80 text-emerald-200 font-medium';
                      } else if (isOptionSelected && !isOptionCorrect) {
                        // User's wrong selection
                        optClasses += 'bg-rose-950/50 border-rose-500/80 text-rose-200 line-through decoration-rose-400';
                      } else {
                        // Normal option
                        optClasses += 'bg-slate-900/60 border-slate-800/60 text-slate-400';
                      }

                      return (
                        <div key={opt.id} className={optClasses}>
                          <div className="flex items-center gap-2.5">
                            <span className="font-bold text-xs px-2 py-0.5 rounded bg-slate-800/80 text-slate-200">
                              {opt.id}
                            </span>
                            <span>{opt.text}</span>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0 text-xs">
                            {isOptionSelected && (
                              <span
                                className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                  isOptionCorrect
                                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                    : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                                }`}
                              >
                                আপনার উত্তর
                              </span>
                            )}
                            {isOptionCorrect && (
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500 text-slate-950 flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3" />
                                সঠিক উত্তর
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Detailed Explanation Box */}
                  <div className="mt-3 p-4 rounded-xl bg-[#090e1c] border border-indigo-950/80 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-300">
                        <Lightbulb className="w-4 h-4 text-amber-400" />
                        <span>বিশদ ব্যাখ্যা (Explanation):</span>
                      </div>
                      {onOpenDoubtClear && (
                        <button
                          onClick={() => onOpenDoubtClear(q.question)}
                          className="text-[11px] font-semibold text-amber-300 hover:text-amber-200 bg-amber-950/40 hover:bg-amber-950/70 px-2 py-1 rounded-lg border border-amber-500/30 flex items-center gap-1 cursor-pointer transition-colors"
                        >
                          <span>❓ ডাউট ক্লিয়ার</span>
                        </button>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pl-1">
                      {q.explanation}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
