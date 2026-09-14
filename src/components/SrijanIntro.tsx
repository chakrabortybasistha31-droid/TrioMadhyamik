import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, GraduationCap } from 'lucide-react';

interface SrijanIntroProps {
  onComplete: () => void;
}

export const SrijanIntro: React.FC<SrijanIntroProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 300);
          return 100;
        }
        return prev + 2.5;
      });
    }, 45);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div
      id="srijan-intro-screen"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#070a12] text-white overflow-hidden px-6 selection:bg-purple-600"
    >
      {/* Ambient background glows with colourful blue, purple & dark tones */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-600/25 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] bg-indigo-500/10 rounded-full blur-[130px] pointer-events-none" />

      {/* Decorative Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293d15_1px,transparent_1px),linear-gradient(to_bottom,#1f293d15_1px,transparent_1px)] bg-[size:28px_28px] opacity-40 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 flex flex-col items-center max-w-sm w-full text-center"
      >
        {/* Animated Brand Emblem */}
        <div className="relative mb-6">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
            className="w-28 h-28 rounded-3xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-purple-600 p-[2px] shadow-[0_0_40px_rgba(99,102,241,0.4)]"
          >
            <div className="w-full h-full bg-[#0b0f1d] rounded-3xl flex items-center justify-center backdrop-blur-xl" />
          </motion.div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center"
          >
            <GraduationCap className="w-10 h-10 text-cyan-400 drop-shadow-[0_0_12px_rgba(34,211,238,0.8)]" />
          </motion.div>

          <motion.div
            animate={{ scale: [1, 1.25, 1], opacity: [0.4, 0.9, 0.4] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-blue-500 to-purple-500 -z-10 blur-md opacity-40"
          />
        </div>

        {/* Brand Name */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="space-y-2"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-medium tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>সৃজন এডুকেশন উপস্থাপিত</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white via-cyan-100 to-purple-200 bg-clip-text text-transparent font-['Outfit',sans-serif]">
            TrioMadhyamik
          </h1>

          <p className="text-base sm:text-lg font-semibold text-slate-300">
            মাধ্যমিক ২০২৭ মক টেস্ট ও লার্নিং প্ল্যাটফর্ম
          </p>

          <p className="text-xs text-slate-400 max-w-xs mx-auto">
            মক টেস্ট • ❓ ডাউট ক্লিয়ার • 🔬 3D মডেল সহায়িকা
          </p>
        </motion.div>

        {/* Progress bar */}
        <div className="w-full mt-8 space-y-2">
          <div className="w-full h-1.5 bg-slate-800/80 rounded-full overflow-hidden border border-slate-700/40 p-[1px]">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full shadow-[0_0_12px_rgba(99,102,241,0.8)]"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'linear' }}
            />
          </div>

          <div className="flex justify-between items-center text-[11px] text-slate-500">
            <span>প্রস্তুতি যাচাই হচ্ছে...</span>
            <span className="font-mono text-purple-400">{Math.round(progress)}%</span>
          </div>
        </div>

        {/* Quick Skip Button */}
        <motion.button
          id="skip-intro-btn"
          onClick={onComplete}
          whileTap={{ scale: 0.96 }}
          className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 text-xs font-semibold text-slate-200 transition-colors shadow-lg cursor-pointer"
        >
          <span>সরাসরি প্রবেশ করুন</span>
          <ArrowRight className="w-3.5 h-3.5 text-purple-400" />
        </motion.button>
      </motion.div>

      {/* Footer Year Tag */}
      <div className="absolute bottom-6 text-center text-xs text-slate-600 font-mono">
        WBBSE MADHYAMIK 2027 • BENGALI MEDIUM
      </div>
    </div>
  );
};
