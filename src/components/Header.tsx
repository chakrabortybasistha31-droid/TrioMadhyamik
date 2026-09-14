import React from 'react';
import { Sparkles, RotateCcw, HelpCircle, Box, TrendingUp, BookOpen, ShieldCheck, ArrowLeft } from 'lucide-react';

interface HeaderProps {
  onResetToIntro?: () => void;
  onOpenDoubtClear: () => void;
  onOpenThreeDModel: () => void;
  onOpenPerformance?: () => void;
  onOpenSubjects?: () => void;
  activeStudentTab?: 'subjects' | 'performance';
  isAdminMode?: boolean;
  onExitAdmin?: () => void;
  currentTitle?: string;
  badgeText?: string;
}

export const Header: React.FC<HeaderProps> = ({
  onResetToIntro,
  onOpenDoubtClear,
  onOpenThreeDModel,
  onOpenPerformance,
  onOpenSubjects,
  activeStudentTab = 'subjects',
  isAdminMode = false,
  onExitAdmin,
  currentTitle = 'মাধ্যমিক ২০২৭ মক টেস্ট',
  badgeText = 'WBBSE ২০২৭',
}) => {
  return (
    <header
      id="app-main-header"
      className="sticky top-0 z-30 w-full backdrop-blur-md bg-[#070b16]/95 border-b border-indigo-950/70 px-3 py-2.5 sm:px-6 shadow-xl"
    >
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-2">
        {/* Brand & Website Name */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div
            onClick={onOpenSubjects}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 p-[1.5px] shadow-md shadow-indigo-900/30 flex items-center justify-center shrink-0 cursor-pointer"
          >
            <div className="w-full h-full bg-[#0b0f1d] rounded-[10px] flex items-center justify-center">
              <span className="text-xs sm:text-sm font-extrabold bg-gradient-to-r from-cyan-400 via-sky-300 to-purple-400 bg-clip-text text-transparent font-['Outfit',sans-serif]">
                TM
              </span>
            </div>
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span
                onClick={onOpenSubjects}
                className="text-base sm:text-lg font-black text-white tracking-tight leading-none font-['Outfit',sans-serif] cursor-pointer hover:text-cyan-300 transition-colors"
              >
                TrioMadhyamik
              </span>
              <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold shrink-0 ${
                isAdminMode
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
              }`}>
                {isAdminMode ? 'অ্যাডমিন মোড' : badgeText}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium leading-tight mt-0.5 truncate max-w-[150px] sm:max-w-none">
              {currentTitle}
            </p>
          </div>
        </div>

        {/* Navigation & Feature Action Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {isAdminMode ? (
            <button
              onClick={onExitAdmin}
              className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-purple-900/40 cursor-pointer transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">স্টুডেন্ট প্যানেল</span>
              <span className="sm:hidden">প্রস্থান</span>
            </button>
          ) : (
            <>
              {/* Performance Button */}
              {onOpenPerformance && (
                <button
                  id="header-performance-btn"
                  onClick={onOpenPerformance}
                  className={`px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl border transition-all flex items-center gap-1.5 text-xs font-bold cursor-pointer ${
                    activeStudentTab === 'performance'
                      ? 'bg-indigo-600 border-indigo-400 text-white shadow-md shadow-indigo-900/50'
                      : 'bg-indigo-950/40 hover:bg-indigo-900/50 border-indigo-500/40 text-indigo-200 hover:text-white'
                  }`}
                  title="আপনার মক টেস্ট পারফর্ম্যান্স ও প্রগ্রেস গ্রাফ দেখুন"
                >
                  <TrendingUp className="w-3.5 h-3.5 text-cyan-300" />
                  <span className="hidden sm:inline">পারফর্ম্যান্স</span>
                  <span className="sm:hidden">গ্রাফ</span>
                </button>
              )}

              {/* 1. 🔬 3D Models Button */}
              <button
                id="header-3d-model-btn"
                onClick={onOpenThreeDModel}
                className="px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl bg-gradient-to-r from-cyan-600/30 via-blue-600/20 to-indigo-600/30 hover:from-cyan-600/40 hover:to-indigo-600/40 border border-cyan-500/50 hover:border-cyan-400 text-cyan-200 hover:text-white transition-all shadow-md shadow-cyan-950/30 flex items-center gap-1.5 text-xs font-bold cursor-pointer"
                title="ত্রিমাত্রিক বৈজ্ঞানিক 3D Models দেখুন ও অন্বেষণ করুন"
              >
                <span className="text-xs">🔬</span>
                <span className="font-semibold hidden sm:inline">3D Models</span>
                <span className="sm:hidden">3D Models</span>
              </button>

              {/* 2. 🤖 GimiDoubt Clear Button */}
              <button
                id="header-doubt-clear-btn"
                onClick={onOpenDoubtClear}
                className="px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl bg-gradient-to-r from-amber-600/30 via-orange-600/20 to-purple-600/30 hover:from-amber-600/40 hover:to-purple-600/40 border border-amber-500/50 hover:border-amber-400 text-amber-200 hover:text-white transition-all shadow-md shadow-amber-950/30 flex items-center gap-1.5 text-xs font-bold cursor-pointer"
                title="Gemini AI দ্বারা প্রশ্নের সংশয় দূর করতে GimiDoubt Clear ওপেন করুন"
              >
                <span className="text-xs">🤖</span>
                <span className="font-semibold hidden sm:inline">GimiDoubt Clear</span>
                <span className="sm:hidden">GimiDoubt</span>
              </button>

              {/* Replay Intro (Hidden on mobile) */}
              {onResetToIntro && (
                <button
                  id="replay-intro-btn"
                  onClick={onResetToIntro}
                  title="ভূমিকা অ্যানিমেশন"
                  className="hidden md:flex p-2 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-700/50 transition-colors text-xs items-center cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-purple-400" />
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
};

