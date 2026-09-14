import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, Bookmark, Circle, HelpCircle } from 'lucide-react';
import { OptionId } from '../types';
import { toBengaliNumber } from '../utils/bengaliUtils';

interface QuestionPaletteDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  totalQuestions: number;
  currentIndex: number;
  onJumpToQuestion: (index: number) => void;
  answers: { [key: string]: { selectedOptionId: OptionId; isLocked: boolean } };
  markedForReview: number[];
  questionIds: string[];
}

export const QuestionPaletteDrawer: React.FC<QuestionPaletteDrawerProps> = ({
  isOpen,
  onClose,
  totalQuestions,
  currentIndex,
  onJumpToQuestion,
  answers,
  markedForReview,
  questionIds,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-sm">
        {/* Backdrop dismiss */}
        <div className="absolute inset-0" onClick={onClose} />

        <motion.div
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative z-10 w-full max-w-lg rounded-t-3xl sm:rounded-2xl bg-[#0e1424] border border-indigo-900/60 p-5 shadow-2xl space-y-4 max-h-[80vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-base font-bold text-white">প্রশ্ন তালিকা ও স্থিতি</h3>
              <p className="text-xs text-slate-400">যে কোনো প্রশ্নে সরাসরি যেতে নম্বর স্পর্শ করুন</p>
            </div>
            <button
              id="close-palette-drawer-btn"
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Status Legend */}
          <div className="grid grid-cols-3 gap-2 text-[11px] bg-[#070b16] p-2.5 rounded-xl border border-slate-800/80">
            <div className="flex items-center gap-1.5 text-cyan-300">
              <span className="w-3 h-3 rounded-md bg-cyan-500/30 border border-cyan-400 flex items-center justify-center text-[9px]">
                ✓
              </span>
              <span>লক উত্তর</span>
            </div>
            <div className="flex items-center gap-1.5 text-amber-300">
              <span className="w-3 h-3 rounded-md bg-amber-500/30 border border-amber-400" />
              <span>রিভিউ চিহ্নিত</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-400">
              <span className="w-3 h-3 rounded-md bg-slate-800 border border-slate-700" />
              <span>অনুত্তরিত</span>
            </div>
          </div>

          {/* Question Numbers Grid */}
          <div className="overflow-y-auto pr-1 py-2 grid grid-cols-5 sm:grid-cols-6 gap-2.5">
            {Array.from({ length: totalQuestions }).map((_, idx) => {
              const qId = questionIds[idx];
              const isAnswered = answers[qId]?.isLocked;
              const isMarked = markedForReview.includes(idx);
              const isCurrent = currentIndex === idx;

              let style = 'bg-slate-900/90 border-slate-800 text-slate-300 hover:border-slate-700';
              if (isAnswered) {
                style = 'bg-cyan-950/60 border-cyan-500/70 text-cyan-300 font-bold';
              } else if (isMarked) {
                style = 'bg-amber-950/60 border-amber-500/70 text-amber-300 font-bold';
              }

              return (
                <button
                  key={idx}
                  id={`jump-to-q-${idx + 1}`}
                  onClick={() => {
                    onJumpToQuestion(idx);
                    onClose();
                  }}
                  className={`h-11 rounded-xl border flex flex-col items-center justify-center transition-all cursor-pointer relative ${style} ${
                    isCurrent ? 'ring-2 ring-purple-500 ring-offset-2 ring-offset-[#0e1424] scale-105' : ''
                  }`}
                >
                  <span className="text-sm">{toBengaliNumber(idx + 1)}</span>
                  {isAnswered && <span className="text-[9px] text-cyan-400 leading-none">লক</span>}
                  {!isAnswered && isMarked && <span className="text-[9px] text-amber-400 leading-none">রিভিউ</span>}
                </button>
              );
            })}
          </div>

          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold cursor-pointer"
          >
            বন্ধ করুন
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
