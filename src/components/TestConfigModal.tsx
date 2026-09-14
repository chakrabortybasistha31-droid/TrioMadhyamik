import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Clock,
  CheckCircle2,
  Lock,
  EyeOff,
  FileCheck,
  Play,
  ArrowLeft,
  AlertCircle,
  HelpCircle,
  ShieldAlert
} from 'lucide-react';
import { Subject, Chapter, TimerDurationMinutes, TestConfig } from '../types';
import { toBengaliNumber } from '../utils/bengaliUtils';

interface TestConfigModalProps {
  subject: Subject;
  chapter: Chapter | null;
  availableQuestionsCount: number;
  onBack: () => void;
  onStart: (config: TestConfig) => void;
}

const TIMER_OPTIONS: { duration: TimerDurationMinutes; labelBn: string; desc: string }[] = [
  { duration: 10, labelBn: '১০ মিনিট', desc: 'দ্রুত প্র্যাকটিস' },
  { duration: 20, labelBn: '২০ মিনিট', desc: 'স্ট্যান্ডার্ড স্পিড' },
  { duration: 30, labelBn: '৩০ মিনিট', desc: 'মধ্যম প্রস্তুতি' },
  { duration: 45, labelBn: '৪৫ মিনিট', desc: 'গভীর অনুশীলন' },
  { duration: 60, labelBn: '৬০ মিনিট', desc: '১ ঘণ্টা পূর্ণাঙ্গ' },
  { duration: 90, labelBn: '৯০ মিনিট', desc: 'বোর্ড স্টাইল মক' },
];

export const TestConfigModal: React.FC<TestConfigModalProps> = ({
  subject,
  chapter,
  availableQuestionsCount,
  onBack,
  onStart,
}) => {
  const [selectedDuration, setSelectedDuration] = useState<TimerDurationMinutes>(20);
  const [selectedCount, setSelectedCount] = useState<number>(availableQuestionsCount);

  const handleStart = () => {
    onStart({
      subject,
      chapter,
      durationMinutes: selectedDuration,
      questionCount: selectedCount,
    });
  };

  return (
    <div id="test-config-screen" className="w-full max-w-2xl mx-auto px-4 py-6 sm:py-8 space-y-6">
      {/* Back button and title */}
      <div className="flex items-center justify-between">
        <button
          id="back-to-chapter-selection-btn"
          onClick={onBack}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/70 hover:bg-slate-700/70 border border-slate-700/60 text-xs font-semibold text-slate-200 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-purple-400" />
          <span>অধ্যায় পরিবর্তন করুন</span>
        </button>

        <span className="text-xs text-slate-400 font-mono">MADHYAMIK 2027</span>
      </div>

      {/* Selected Target Summary Card */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-950/70 via-indigo-950/60 to-purple-950/70 border border-indigo-500/30 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
              নির্বাচিত বিষয়
            </span>
            <h3 className="text-lg font-bold text-white">{subject.name}</h3>
          </div>
          <p className="text-sm font-semibold text-cyan-300 flex items-center gap-1.5">
            <span>অধ্যায়:</span>
            <span>{chapter ? chapter.name : 'সকল অধ্যায় (সম্পূর্ণ সিলেবাস)'}</span>
          </p>
          <p className="text-xs text-slate-400">
            উপলব্ধ প্রশ্ন সংখ্যা: <span className="font-bold text-white">{toBengaliNumber(availableQuestionsCount)}</span>টি
          </p>
        </div>
      </div>

      {/* 1. Timer Selection (10 / 20 / 30 / 45 / 60 / 90 মিনিট) */}
      <div className="p-5 rounded-2xl bg-[#0e1424]/90 border border-slate-800/90 shadow-lg space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-cyan-400" />
            <h4 className="text-sm sm:text-base font-bold text-slate-100">
              সময়সীমা নির্ধারণ করুন (টাইমার)
            </h4>
          </div>
          <span className="text-xs font-semibold text-cyan-400">
            বাছাইকৃত: {toBengaliNumber(selectedDuration)} মিনিট
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {TIMER_OPTIONS.map((opt) => {
            const isSelected = selectedDuration === opt.duration;
            return (
              <button
                key={opt.duration}
                id={`timer-option-${opt.duration}`}
                onClick={() => setSelectedDuration(opt.duration)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer relative ${
                  isSelected
                    ? 'bg-gradient-to-r from-blue-600/30 to-purple-600/30 border-purple-500 text-white shadow-md shadow-purple-900/30'
                    : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/60'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.9)]" />
                )}
                <div className="text-sm font-bold">{opt.labelBn}</div>
                <div className="text-[11px] text-slate-400 mt-0.5">{opt.desc}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Official Rules & System Details */}
      <div className="p-5 rounded-2xl bg-[#0e1424]/90 border border-slate-800/90 shadow-lg space-y-3">
        <div className="flex items-center gap-2 text-slate-200">
          <ShieldAlert className="w-4 h-4 text-purple-400" />
          <h4 className="text-sm sm:text-base font-bold">মক টেস্টের গুরুত্বপূর্ণ নির্দেশাবলী</h4>
        </div>

        <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <span>
              <strong>(i), (ii), (iii), (iv) অপশন:</strong> প্রতিটি প্রশ্নে চারটি বিকল্প দেওয়া থাকবে।
            </span>
          </li>
          <li className="flex items-start gap-2">
            <Lock className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
            <span>
              <strong>উত্তর লক সিস্টেম:</strong> একটি প্রশ্নে কেবল একটি উত্তর নির্বাচন করা যাবে এবং সিলেক্ট করামাত্র তা নিশ্চিতভাবে <strong>লক</strong> হয়ে যাবে।
            </span>
          </li>
          <li className="flex items-start gap-2">
            <EyeOff className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
            <span>
              <strong>গোপনীয়তা:</strong> টেস্ট চলাকালীন কোনো সঠিক বা ভুল উত্তরের সংকেত দেখানো হবে না।
            </span>
          </li>
          <li className="flex items-start gap-2">
            <FileCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>
              <strong>ফলাফল ও ব্যাখ্যা:</strong> টেস্ট সাবমিটের সঙ্গে সঙ্গে মোট স্কোর, সঠিক, ভুল, অনুত্তরিত এবং প্রতিটি প্রশ্নের <strong>বিশদ পাঠ্যভিত্তিক ব্যাখ্যা</strong> প্রকাশিত হবে।
            </span>
          </li>
        </ul>
      </div>

      {/* Start Button */}
      <motion.button
        id="start-mock-test-btn"
        onClick={handleStart}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-base sm:text-lg flex items-center justify-center gap-2 shadow-xl shadow-indigo-900/40 cursor-pointer border border-indigo-400/30 transition-all"
      >
        <Play className="w-5 h-5 fill-white" />
        <span>মক টেস্ট শুরু করুন</span>
      </motion.button>
    </div>
  );
};
