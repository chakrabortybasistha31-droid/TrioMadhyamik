import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Key, X, AlertCircle } from 'lucide-react';
import { verifyAdminPassword } from '../utils/adminSecurity';

interface AdminAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminAuthModal: React.FC<AdminAuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcode) {
      setError('পাসওয়ার্ড প্রবেশ করান।');
      return;
    }

    setIsVerifying(true);
    setError('');

    try {
      const isValid = await verifyAdminPassword(passcode);
      if (isValid) {
        setError('');
        setPasscode('');
        onSuccess();
      } else {
        setError('ভুল পাসওয়ার্ড! সঠিক অ্যাডমিন পাসওয়ার্ড দিয়ে পুনরায় চেষ্টা করুন।');
      }
    } catch {
      setError('যাচাইকরণে ত্রুটি হয়েছে। পুনরায় চেষ্টা করুন।');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleClose = () => {
    setPasscode('');
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-[#0e1424] border border-purple-500/40 p-6 rounded-2xl max-w-sm w-full space-y-4 shadow-2xl relative"
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-300">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-base font-bold text-white">অ্যাডমিন যাচাইকরণ</h4>
            <p className="text-[11px] text-slate-400">TrioMadhyamik Question Control Portal</p>
          </div>
        </div>

        {error && (
          <div className="p-2.5 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              অ্যাডমিন পাসওয়ার্ড (Admin Password)
            </label>
            <div className="relative">
              <Key className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                placeholder="গোপন পাসওয়ার্ড লিখুন..."
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                autoComplete="current-password"
                autoFocus
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder:text-slate-500 outline-none focus:border-purple-500 font-mono tracking-wider"
              />
            </div>
            <p className="text-[10px] text-slate-500 mt-1.5">
              * নিরাপত্তা বিধিবদ্ধ: পাসওয়ার্ড সুরক্ষিত এবং কখনোই সাধারণ ব্যবহারকারীর দৃশ্যমান নয়।
            </p>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={handleClose}
              className="px-3.5 py-1.5 rounded-xl bg-slate-800 text-xs font-semibold text-slate-300 hover:text-white cursor-pointer"
            >
              বাতিল
            </button>
            <button
              type="submit"
              disabled={isVerifying}
              className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-xs font-bold text-white shadow-lg shadow-purple-900/40 cursor-pointer disabled:opacity-50"
            >
              {isVerifying ? 'যাচাই হচ্ছে...' : 'প্রবেশ করুন'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
