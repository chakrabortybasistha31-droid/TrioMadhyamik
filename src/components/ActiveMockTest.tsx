import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Clock,
  ChevronLeft,
  ChevronRight,
  Lock,
  Bookmark,
  CheckCircle2,
  AlertTriangle,
  Send,
  ListOrdered,
  Layers,
  HelpCircle
} from 'lucide-react';
import { Question, OptionId, TestConfig, AnswerState, TestResultSummary } from '../types';
import { formatTimerSeconds, toBengaliNumber } from '../utils/bengaliUtils';
import { QuestionPaletteDrawer } from './QuestionPaletteDrawer';

interface ActiveMockTestProps {
  config: TestConfig;
  questions: Question[];
  onFinishTest: (result: TestResultSummary) => void;
  onQuitToMenu: () => void;
}

export const ActiveMockTest: React.FC<ActiveMockTestProps> = ({
  config,
  questions,
  onFinishTest,
  onQuitToMenu,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [questionId: string]: AnswerState }>({});
  const [markedForReview, setMarkedForReview] = useState<number[]>([]);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);

  // Timer calculation
  const totalAllocatedSeconds = useMemo(
    () => config.durationMinutes * 60,
    [config.durationMinutes]
  );
  const [remainingSeconds, setRemainingSeconds] = useState(totalAllocatedSeconds);

  const currentQuestion = questions[currentIndex];
  const questionIds = useMemo(() => questions.map((q) => q.id), [questions]);

  // Real-time Countdown Timer
  useEffect(() => {
    if (remainingSeconds <= 0) {
      // Auto submit on time out
      handleSubmitTest();
      return;
    }

    const interval = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmitTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [remainingSeconds]);

  // Answer selection and immediate locking
  const handleSelectOption = (optionId: OptionId) => {
    if (!currentQuestion) return;

    // Check if already locked
    if (answers[currentQuestion.id]?.isLocked) {
      return;
    }

    // Select and lock answer
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: {
        selectedOptionId: optionId,
        isLocked: true,
      },
    }));
  };

  // Toggle mark for review
  const toggleMarkForReview = (index: number) => {
    setMarkedForReview((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  // Navigation
  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // Compile final results and submit
  const handleSubmitTest = () => {
    const timeSpentSeconds = totalAllocatedSeconds - remainingSeconds;
    let correctCount = 0;
    let wrongCount = 0;
    let unansweredCount = 0;

    const questionDetails = questions.map((q) => {
      const userAns = answers[q.id];
      const isUnanswered = !userAns || !userAns.selectedOptionId;
      const isCorrect = !isUnanswered && userAns.selectedOptionId === q.correctOptionId;

      if (isUnanswered) {
        unansweredCount += 1;
      } else if (isCorrect) {
        correctCount += 1;
      } else {
        wrongCount += 1;
      }

      return {
        question: q,
        selectedOptionId: userAns?.selectedOptionId,
        isCorrect,
        isUnanswered,
      };
    });

    const attemptedCount = questions.length - unansweredCount;
    const score = correctCount; // 1 mark each
    const percentage = Math.round((correctCount / questions.length) * 100);

    const summary: TestResultSummary = {
      subjectName: config.subject.name,
      chapterName: config.chapter ? config.chapter.name : 'সকল অধ্যায় (সম্পূর্ণ সিলেবাস)',
      totalQuestions: questions.length,
      attemptedCount,
      correctCount,
      wrongCount,
      unansweredCount,
      score,
      percentage,
      timeAllocatedSeconds: totalAllocatedSeconds,
      timeSpentSeconds,
      questionDetails,
    };

    onFinishTest(summary);
  };

  const timerFormatted = formatTimerSeconds(remainingSeconds);
  const isTimeCritical = remainingSeconds <= 120; // 2 minutes or less

  const answeredCount = Object.keys(answers).filter((k) => answers[k]?.isLocked).length;
  const currentAnswer = currentQuestion ? answers[currentQuestion.id] : null;
  const isCurrentLocked = !!currentAnswer?.isLocked;
  const isCurrentMarked = markedForReview.includes(currentIndex);

  if (!currentQuestion) {
    return (
      <div className="p-8 text-center text-slate-300">
        কোনো প্রশ্ন পাওয়া যায়নি।
      </div>
    );
  }

  return (
    <div id="active-mock-test-container" className="w-full max-w-3xl mx-auto px-4 py-4 sm:py-6 pb-28">
      {/* Test Top Control Bar */}
      <div className="sticky top-14 z-20 -mx-4 px-4 py-2.5 bg-[#090d16]/95 backdrop-blur-md border-b border-slate-800/80 mb-5 shadow-lg">
        <div className="flex items-center justify-between gap-2">
          {/* Subject/Chapter Badge */}
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-indigo-500/20 text-cyan-300 border border-indigo-500/30 shrink-0">
              {config.subject.name}
            </span>
            <span className="text-xs text-slate-300 truncate hidden sm:inline">
              {config.chapter ? config.chapter.name : 'সম্পূর্ণ সিলেবাস'}
            </span>
          </div>

          {/* Center Question Counter */}
          <button
            id="open-question-palette-header-btn"
            onClick={() => setIsPaletteOpen(true)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 text-xs font-bold text-slate-200 cursor-pointer"
          >
            <ListOrdered className="w-3.5 h-3.5 text-purple-400" />
            <span>
              প্রশ্ন {toBengaliNumber(currentIndex + 1)} / {toBengaliNumber(questions.length)}
            </span>
          </button>

          {/* Real-time Countdown Timer */}
          <div
            id="countdown-timer-display"
            className={`flex items-center gap-1.5 px-3 py-1 rounded-xl border font-mono font-bold text-xs sm:text-sm tracking-wide transition-all ${
              isTimeCritical
                ? 'bg-rose-950/80 text-rose-300 border-rose-500/60 animate-pulse shadow-[0_0_12px_rgba(244,63,94,0.4)]'
                : 'bg-blue-950/60 text-cyan-300 border-cyan-500/40'
            }`}
          >
            <Clock className={`w-3.5 h-3.5 ${isTimeCritical ? 'text-rose-400' : 'text-cyan-400'}`} />
            <span>{timerFormatted.fullBn}</span>
          </div>
        </div>

        {/* Progress bar line */}
        <div className="w-full h-1 bg-slate-800 rounded-full mt-2.5 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Critical time alert if < 2 mins */}
      {isTimeCritical && (
        <div className="mb-4 p-2.5 rounded-xl bg-rose-950/50 border border-rose-500/40 text-rose-200 text-xs flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
          <span>সময় প্রায় শেষ! মাত্র {timerFormatted.fullBn} অবশিষ্ট আছে।</span>
        </div>
      )}

      {/* Question Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion.id}
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -15 }}
          transition={{ duration: 0.25 }}
          className="p-5 sm:p-6 rounded-2xl bg-[#0e1424] border border-indigo-900/40 shadow-xl shadow-black/50 space-y-5"
        >
          {/* Question Header & Status Flag */}
          <div className="flex items-center justify-between gap-2">
            <div className="inline-flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-gradient-to-tr from-blue-600 to-purple-600 text-white font-bold text-xs flex items-center justify-center shadow-md">
                {toBengaliNumber(currentIndex + 1)}
              </span>
              <span className="text-xs font-semibold text-slate-400">MCQ প্রশ্ন</span>
            </div>

            <div className="flex items-center gap-2">
              {isCurrentLocked && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                  <Lock className="w-3 h-3 text-cyan-400" />
                  <span>উত্তর লক করা</span>
                </span>
              )}

              <button
                id={`mark-review-btn-${currentIndex}`}
                onClick={() => toggleMarkForReview(currentIndex)}
                className={`p-1.5 rounded-lg border text-xs flex items-center gap-1 transition-colors cursor-pointer ${
                  isCurrentMarked
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    : 'bg-slate-800/60 text-slate-400 border-slate-700/60 hover:text-slate-200'
                }`}
                title="রিভিউ করার জন্য চিহ্নিত করুন"
              >
                <Bookmark className={`w-3.5 h-3.5 ${isCurrentMarked ? 'fill-amber-400 text-amber-400' : ''}`} />
                <span className="text-[11px] hidden sm:inline">
                  {isCurrentMarked ? 'চিহ্নিত' : 'রিভিউ রাখুন'}
                </span>
              </button>
            </div>
          </div>

          {/* Question Text */}
          <h3 className="text-base sm:text-lg md:text-xl font-bold text-white leading-relaxed font-['Noto_Sans_Bengali']">
            {currentQuestion.question}
          </h3>

          {/* Lock Rule Banner Notice */}
          <div className="text-[11px] text-slate-400 flex items-center gap-1.5 bg-[#080d1a] px-3 py-1.5 rounded-lg border border-slate-800/80">
            <HelpCircle className="w-3.5 h-3.5 text-purple-400 shrink-0" />
            <span>
              {isCurrentLocked
                ? 'এই প্রশ্নের উত্তর লক করা হয়েছে। অন্য কোনো অপশন নির্বাচন করা যাবে না।'
                : 'যে-কোনো একটি অপশনে ক্লিক করামাত্র উত্তরটি লক (Lock) হয়ে যাবে।'}
            </span>
          </div>

          {/* MCQ Options: (i), (ii), (iii), (iv) */}
          <div className="space-y-3 pt-1">
            {currentQuestion.options.map((option) => {
              const isSelected = currentAnswer?.selectedOptionId === option.id;
              const isLocked = isCurrentLocked;

              let buttonClasses = 'p-3.5 sm:p-4 rounded-xl border text-left transition-all relative flex items-center gap-3 ';

              if (isSelected) {
                // Selected and locked style: Vibrant cyan/blue highlight with padlock, strictly NO right/wrong color indicated during test
                buttonClasses += 'bg-cyan-950/50 border-cyan-500 text-white shadow-lg shadow-cyan-950/40 ring-1 ring-cyan-500/40';
              } else if (isLocked) {
                // Other options disabled after locking
                buttonClasses += 'bg-slate-900/40 border-slate-800/60 text-slate-500 cursor-not-allowed opacity-60';
              } else {
                // Unlocked state ready for selection
                buttonClasses += 'bg-slate-900/80 hover:bg-slate-800/80 border-slate-800 hover:border-purple-500/50 text-slate-200 cursor-pointer';
              }

              return (
                <button
                  key={option.id}
                  id={`question-option-${option.id}`}
                  onClick={() => handleSelectOption(option.id)}
                  disabled={isLocked}
                  className={buttonClasses}
                >
                  {/* Option ID: (i), (ii), (iii), (iv) */}
                  <div
                    className={`w-9 h-9 rounded-lg font-bold text-xs flex items-center justify-center shrink-0 border ${
                      isSelected
                        ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md'
                        : 'bg-slate-800/90 text-slate-300 border-slate-700/60'
                    }`}
                  >
                    {option.id}
                  </div>

                  {/* Option Text */}
                  <div className="text-sm sm:text-base font-medium flex-1">
                    {option.text}
                  </div>

                  {/* Locked padlock symbol if selected */}
                  {isSelected && (
                    <div className="shrink-0 flex items-center gap-1 text-cyan-300 text-xs font-semibold pl-2">
                      <Lock className="w-4 h-4 text-cyan-400" />
                      <span className="hidden sm:inline text-[11px]">লকড</span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Sticky Bottom Navigation Toolbar for Mobile Ergonomics */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-[#090d16]/95 backdrop-blur-lg border-t border-slate-800/90 px-4 py-3 shadow-2xl">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-2">
          {/* Previous Question Button */}
          <button
            id="prev-question-btn"
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`px-3 sm:px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-colors ${
              currentIndex === 0
                ? 'bg-slate-900/50 text-slate-600 border-slate-800/50 cursor-not-allowed'
                : 'bg-slate-800/80 hover:bg-slate-700 text-slate-200 border-slate-700/80 cursor-pointer'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>পূর্ববর্তী</span>
          </button>

          {/* Center Palette Toggle */}
          <button
            id="open-palette-bottom-btn"
            onClick={() => setIsPaletteOpen(true)}
            className="px-3 py-2.5 rounded-xl bg-slate-800/70 hover:bg-slate-700/70 border border-slate-700 text-xs font-semibold text-slate-300 flex items-center gap-1.5 cursor-pointer"
          >
            <Layers className="w-4 h-4 text-purple-400" />
            <span className="hidden xs:inline">প্যালেট</span>
            <span className="px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-300 text-[10px] font-mono border border-cyan-800">
              {toBengaliNumber(answeredCount)}/{toBengaliNumber(questions.length)}
            </span>
          </button>

          {/* Next Question or Submit Button */}
          {currentIndex < questions.length - 1 ? (
            <button
              id="next-question-btn"
              onClick={handleNext}
              className="px-4 sm:px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white border border-indigo-400/30 text-xs sm:text-sm font-semibold flex items-center gap-1.5 shadow-md shadow-indigo-950/40 cursor-pointer"
            >
              <span>পরবর্তী</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              id="finish-test-btn"
              onClick={() => setShowSubmitConfirm(true)}
              className="px-4 sm:px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white border border-emerald-400/40 text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-md shadow-emerald-950/40 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>সাবমিট করুন</span>
            </button>
          )}
        </div>
      </div>

      {/* Question Palette Drawer (Mobile/Desktop) */}
      <QuestionPaletteDrawer
        isOpen={isPaletteOpen}
        onClose={() => setIsPaletteOpen(false)}
        totalQuestions={questions.length}
        currentIndex={currentIndex}
        onJumpToQuestion={(idx) => setCurrentIndex(idx)}
        answers={answers}
        markedForReview={markedForReview}
        questionIds={questionIds}
      />

      {/* Submit Confirmation Modal */}
      <AnimatePresence>
        {showSubmitConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-md rounded-2xl bg-[#0e1424] border border-indigo-500/40 p-5 sm:p-6 shadow-2xl space-y-4"
            >
              <div className="flex items-center gap-2.5 text-white">
                <div className="w-9 h-9 rounded-xl bg-purple-600/30 border border-purple-400/40 flex items-center justify-center text-purple-300">
                  <Send className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold">মক টেস্ট সাবমিট করতে চান?</h3>
                  <p className="text-xs text-slate-400">সাবমিটের পর সঠিক উত্তর ও বিশদ ব্যাখ্যা প্রকাশিত হবে</p>
                </div>
              </div>

              {/* Status breakdown */}
              <div className="grid grid-cols-3 gap-2 py-3 bg-[#070b16] rounded-xl border border-slate-800 p-3 text-center">
                <div>
                  <div className="text-xs text-slate-400">মোট প্রশ্ন</div>
                  <div className="text-base font-bold text-white mt-0.5">
                    {toBengaliNumber(questions.length)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-cyan-400">উত্তর দিয়েছেন</div>
                  <div className="text-base font-bold text-cyan-300 mt-0.5">
                    {toBengaliNumber(answeredCount)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-amber-400">বাকি আছে</div>
                  <div className="text-base font-bold text-amber-300 mt-0.5">
                    {toBengaliNumber(questions.length - answeredCount)}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  id="cancel-submit-btn"
                  onClick={() => setShowSubmitConfirm(false)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs sm:text-sm font-semibold text-slate-300 cursor-pointer"
                >
                  পরীক্ষায় ফিরুন
                </button>
                <button
                  id="confirm-submit-btn"
                  onClick={() => {
                    setShowSubmitConfirm(false);
                    handleSubmitTest();
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-indigo-900/40 cursor-pointer"
                >
                  হ্যাঁ, সাবমিট করুন
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
