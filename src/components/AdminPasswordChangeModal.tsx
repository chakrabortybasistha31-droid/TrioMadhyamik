import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, KeyRound, CheckCircle2, AlertCircle, X, ShieldCheck } from 'lucide-react';
import { changeAdminPassword } from '../utils/adminSecurity';

interface AdminPasswordChangeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminPasswordChangeModal: React.FC<AdminPasswordChangeModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleClose = () => {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setErrorMessage('');
    setSuccessMessage('');
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!currentPassword) {
      setErrorMessage('বর্তমান পাসওয়ার্ডটি প্রদান করুন।');
      return;
    }

    if (!newPassword || newPassword.length < 4) {
      setErrorMessage('নতুন পাসওয়ার্ড কমপক্ষে ৪ অক্ষরের হতে হবে।');
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage('নতুন পাসওয়ার্ড ও নিশ্চিতকরণ পাসওয়ার্ডের মিল নেই!');
      return;
    }

    if (currentPassword === newPassword) {
      setErrorMessage('নতুন পাসওয়ার্ডটি বর্তমান পাসওয়ার্ডের থেকে ভিন্ন হতে হবে।');
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await changeAdminPassword(currentPassword, newPassword);
      if (result.success) {
        setSuccessMessage(result.message);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setTimeout(() => {
          handleClose();
        }, 2000);
      } else {
        setErrorMessage(result.message);
      }
    } catch {
      setErrorMessage('পাসওয়ার্ড পরিবর্তনের সময় ত্রুটি ঘটেছে।');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-[#0e1424] border border-purple-500/40 p-6 rounded-2xl max-w-md w-full space-y-4 shadow-2xl relative"
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-300">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-base font-bold text-white flex items-center gap-1.5">
              <span>🔐 অ্যাডমিন পাসওয়ার্ড পরিবর্তন</span>
            </h4>
            <p className="text-[11px] text-slate-400">
              নিরাপদ হ্যাশিং সুরক্ষিত (Salted SHA-256 Encryption)
            </p>
          </div>
        </div>

        {errorMessage && (
          <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5 pt-1">
          {/* Current Password */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              বর্তমান পাসওয়ার্ড (Current Password)
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="বর্তমান পাসওয়ার্ড লিখুন..."
                autoComplete="current-password"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder:text-slate-500 outline-none focus:border-purple-500 font-mono tracking-wider"
              />
            </div>
          </div>

          {/* New Password */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              নতুন পাসওয়ার্ড (New Password)
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="নতুন গোপন পাসওয়ার্ড লিখুন (ন্যূনতম ৪ অক্ষর)..."
                autoComplete="new-password"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder:text-slate-500 outline-none focus:border-purple-500 font-mono tracking-wider"
              />
            </div>
          </div>

          {/* Confirm New Password */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              নতুন পাসওয়ার্ড নিশ্চিত করুন (Confirm Password)
            </label>
            <div className="relative">
              <ShieldCheck className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="পুনরায় নতুন পাসওয়ার্ড লিখুন..."
                autoComplete="new-password"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder:text-slate-500 outline-none focus:border-purple-500 font-mono tracking-wider"
              />
            </div>
          </div>

          <p className="text-[10px] text-slate-400 leading-relaxed bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
            * <strong className="text-slate-300">নিরাপত্তা নোটিশ:</strong> পাসওয়ার্ড কখনো কোনো পৃষ্ঠা বা স্টুডেন্ট প্যানেলে প্রকাশ পায় না। এটি ব্রাউজারে ক্রিপ্টোগ্রাফিক হ্যাশ আকারে সংরক্ষিত হয়।
          </p>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={handleClose}
              className="px-3.5 py-2 rounded-xl bg-slate-800 text-xs font-semibold text-slate-300 hover:text-white cursor-pointer"
            >
              বাতিল
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-xs font-bold text-white shadow-lg shadow-purple-900/40 disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? 'যাচাই হচ্ছে...' : 'পাসওয়ার্ড সংরক্ষণ করুন'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
