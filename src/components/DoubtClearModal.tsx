import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Search,
  HelpCircle,
  Sparkles,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  Send,
  Camera,
  Image as ImageIcon,
  Trash2,
  ExternalLink,
  ArrowRight,
  Layers,
  CheckCircle2,
  FileQuestion,
  Share2,
  Copy,
  Check,
  MessageCircle,
  Link2
} from 'lucide-react';
import { SUBJECTS } from '../data/mockData';
import { VisualDoubtRenderer } from './VisualDoubtRenderer';
import {
  CURATED_VISUAL_DOUBTS,
  VisualDoubtItem,
  synthesizeVisualDoubt
} from '../data/doubtDatabase';

interface DoubtClearModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
  initialSubject?: string;
  onOpen3DModel?: (modelId: string) => void;
}

export const DoubtClearModal: React.FC<DoubtClearModalProps> = ({
  isOpen,
  onClose,
  initialQuery = '',
  initialSubject = 'সব বিষয়',
  onOpen3DModel
}) => {
  const [selectedSubjectName, setSelectedSubjectName] = useState(initialSubject);
  const [selectedChapterName, setSelectedChapterName] = useState('সব অধ্যায়');
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [customQuestion, setCustomQuestion] = useState(initialQuery);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadedImageName, setUploadedImageName] = useState<string>('');

  const [activeDoubt, setActiveDoubt] = useState<VisualDoubtItem>(CURATED_VISUAL_DOUBTS[0]);
  const [expandedCuratedId, setExpandedCuratedId] = useState<string | null>('vd-phys-boyle');
  const [isAiGenerating, setIsAiGenerating] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Social Sharing & Copy States
  const [copySuccess, setCopySuccess] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync when initialQuery changes
  useEffect(() => {
    if (initialQuery) {
      setCustomQuestion(initialQuery);
      setSearchQuery(initialQuery);
      const syn = synthesizeVisualDoubt(initialQuery, initialSubject);
      setActiveDoubt(syn);
    }
  }, [initialQuery, initialSubject]);

  // Dynamic chapters based on subject
  const currentSubjectObj = useMemo(() => {
    return SUBJECTS.find((s) => s.name === selectedSubjectName);
  }, [selectedSubjectName]);

  const availableChapters = useMemo(() => {
    if (!currentSubjectObj) return [];
    return currentSubjectObj.chapters.map((c) => c.name);
  }, [currentSubjectObj]);

  // Filter curated doubts
  const filteredCuratedDoubts = useMemo(() => {
    return CURATED_VISUAL_DOUBTS.filter((d) => {
      const matchSubj =
        selectedSubjectName === 'সব বিষয়' ||
        d.subjectName.includes(selectedSubjectName) ||
        (selectedSubjectName === 'ভৌতবিজ্ঞান' && d.subjectName.includes('ভৌতবিজ্ঞান')) ||
        (selectedSubjectName === 'জীবনবিজ্ঞান' && d.subjectName === 'জীবনবিজ্ঞান');

      if (!matchSubj) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        d.questionBn.toLowerCase().includes(q) ||
        d.chapterName.toLowerCase().includes(q) ||
        d.scientificTermEn.toLowerCase().includes(q) ||
        d.keywords.some((k) => k.toLowerCase().includes(q))
      );
    });
  }, [selectedSubjectName, searchQuery]);

  // Image Upload handler
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedImageName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeUploadedImage = () => {
    setUploadedImage(null);
    setUploadedImageName('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Submit and Resolve doubt via Gemini AI or curriculum engine
  const handleResolveDoubt = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const query = customQuestion.trim() || searchQuery.trim();
    if (!query && !uploadedImage) return;

    setIsAiGenerating(true);

    try {
      const response = await fetch('/api/gemini-doubt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: query || 'প্রশ্নের ছবি ভিত্তিক অনুসন্ধান',
          subjectName: selectedSubjectName,
          chapterName: selectedChapterName,
          imageBase64: uploadedImage
        })
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success && result.data) {
          const geminiData = result.data;
          setActiveDoubt({
            id: `gemini-${Date.now()}`,
            subjectName: geminiData.subjectName || selectedSubjectName,
            chapterName: geminiData.chapterName || selectedChapterName,
            questionBn: geminiData.questionBn || query,
            scientificTermEn: geminiData.scientificTermEn || 'Gemini AI Conceptual Term',
            visualType: geminiData.visualType || 'concept_flowchart',
            visualTitleBn: geminiData.visualTitleBn || `Gemini AI ভিজ্যুয়াল বিশ্লেষণ: ${query}`,
            visualCaptionBn: geminiData.visualCaptionBn || 'Gemini AI দ্বারা প্রস্তুত মাধ্যমিক পাঠ্যক্রম নির্ভর ব্যাখ্যা।',
            related3DModelId: geminiData.related3DModelId || undefined,
            labeledParts: geminiData.labeledParts || undefined,
            explanationStepsBn: geminiData.explanationStepsBn || [
              { stepTitleBn: '১. মূল ধারণা ও সংজ্ঞা', detailsBn: 'বিষয়টির প্রামাণ্য বিশ্লেষণ।' }
            ],
            importantTermsWithEn: geminiData.importantTermsWithEn || [],
            examTipBn: geminiData.examTipBn || 'পরীক্ষায় মূল বৈজ্ঞানিক পরিভাষাগুলি স্পষ্ট করে লিখবে।',
            source: 'gemini-ai',
            keywords: [query.toLowerCase()]
          });
          setIsAiGenerating(false);
          return;
        }
      }
    } catch (err) {
      console.warn('Gemini endpoint offline or error, falling back to local curriculum engine:', err);
    }

    // Graceful procedural synthesis fallback
    const resolved = synthesizeVisualDoubt(
      query || 'প্রশ্নের ছবি ভিত্তিক অনুসন্ধান',
      selectedSubjectName,
      selectedChapterName,
      Boolean(uploadedImage)
    );
    setActiveDoubt(resolved);
    setIsAiGenerating(false);
  };

  const handleSelectCuratedDoubt = (doubt: VisualDoubtItem) => {
    setActiveDoubt(doubt);
    setExpandedCuratedId(doubt.id);
    setCustomQuestion(doubt.questionBn);
  };

  // -------------------------------------------------------------
  // SOCIAL SHARING & CLIPBOARD COPY HELPERS
  // -------------------------------------------------------------
  const generateShareText = (doubt: VisualDoubtItem, includeUrl = true) => {
    const pageUrl = window.location.origin + window.location.pathname;
    const stepsText = doubt.explanationStepsBn
      .map(
        (s, i) =>
          `${i + 1}. ${s.stepTitleBn}${s.stepEn ? ` (${s.stepEn})` : ''}\n   ${s.detailsBn}`
      )
      .join('\n\n');

    const termsText = doubt.importantTermsWithEn
      .map((t) => `• ${t.bn} (${t.en})`)
      .join('\n');

    let text = `📚 *TrioMadhyamik ডাউট ক্লিয়ার সমাধান* 📚\n`;
    text += `━━━━━━━━━━━━━━━━━━━━\n`;
    text += `📌 *বিষয়:* ${doubt.subjectName} | *অধ্যায়:* ${doubt.chapterName}\n`;
    text += `❓ *প্রশ্ন:* ${doubt.questionBn}\n`;
    text += `🔬 *Scientific Term:* ${doubt.scientificTermEn}\n\n`;
    text += `💡 *ভিজ্যুয়াল বিশ্লেষণ:* ${doubt.visualTitleBn}\n${doubt.visualCaptionBn}\n\n`;
    text += `📝 *ধাপে ধাপে সহজ বাংলা ব্যাখ্যা:*\n${stepsText}\n\n`;
    text += `🔑 *গুরুত্বপূর্ণ পরিভাষা:*\n${termsText}\n\n`;
    text += `🎯 *মাধ্যমিক ২০২৭ পরীক্ষার টিপস:*\n${doubt.examTipBn}\n`;
    if (includeUrl) {
      text += `\n🔗 *TrioMadhyamik মক টেস্ট ও লার্নিং অ্যাপে দেখুন:* ${pageUrl}\n`;
    }
    text += `━━━━━━━━━━━━━━━━━━━━`;
    return text;
  };

  const copyToClipboard = async (textToCopy: string, successMsg: string) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(textToCopy);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = textToCopy;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setToastMessage(successMsg);
      setTimeout(() => setToastMessage(null), 4000);
      return true;
    } catch (err) {
      console.error('Clipboard copy failed:', err);
      setToastMessage('কপি করতে সমস্যা হয়েছে, অনুগ্রহ করে ম্যানুয়ালি কপি করুন।');
      setTimeout(() => setToastMessage(null), 4000);
      return false;
    }
  };

  const handleCopyExplanation = async () => {
    const text = generateShareText(activeDoubt, true);
    const ok = await copyToClipboard(
      text,
      '✓ সম্পূর্ণ ব্যাখ্যা ও ভিজ্যুয়াল লিংক ক্লিপবোর্ডে কপি হয়েছে! বন্ধু বা শিক্ষকের সাথে শেয়ার করতে পেস্ট করুন।'
    );
    if (ok) {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2500);
    }
  };

  const handleCopyLink = async () => {
    const link = `${window.location.origin}${window.location.pathname}?doubt=${encodeURIComponent(activeDoubt.questionBn)}`;
    const ok = await copyToClipboard(link, '✓ ডাউট সমাধানের রেফারেন্স লিংক ক্লিপবোর্ডে কপি হয়েছে!');
    if (ok) {
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2500);
    }
  };

  const handleNativeShare = async () => {
    const shareText = generateShareText(activeDoubt, true);
    const pageUrl = window.location.origin + window.location.pathname;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `TrioMadhyamik ডাউট সমাধান: ${activeDoubt.questionBn}`,
          text: shareText,
          url: pageUrl
        });
        return;
      } catch (err) {
        // Fallback to clipboard if cancelled or failed
      }
    }
    handleCopyExplanation();
  };

  const handleWhatsAppShare = () => {
    const shareText = generateShareText(activeDoubt, true);
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
        <div className="fixed inset-0" onClick={onClose} />

        <motion.div
          initial={{ scale: 0.94, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.94, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="relative z-10 w-full max-w-5xl max-h-[94vh] overflow-y-auto rounded-3xl bg-[#090d1a] border border-indigo-900/60 shadow-2xl p-4 sm:p-6 space-y-4 text-slate-100"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-purple-600 p-[1.5px] flex items-center justify-center shadow-lg shadow-amber-500/20">
                <div className="w-full h-full bg-[#080d1a] rounded-[10px] flex items-center justify-center text-amber-400 font-bold text-lg">
                  🤖
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                    🤖 GimiDoubt Clear (Gemini AI ডাউট ক্লিয়ার)
                  </h2>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-purple-400" />
                    <span>Gemini AI</span>
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-slate-400">
                  যেকোনো বিষয়ের প্রশ্ন লিখুন বা ছবি দিন—3D মডেল, পরিষ্কার 2D ডায়াগ্রাম/গ্রাফ ও সহজ বাংলা ব্যাখ্যা
                </p>
              </div>
            </div>

            <button
              id="close-doubt-modal-btn"
              onClick={onClose}
              aria-label="Close doubt clear modal"
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Floating Copy / Share Feedback Toast */}
          <AnimatePresence>
            {toastMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-3 rounded-2xl bg-emerald-950/90 border border-emerald-500/50 text-emerald-200 text-xs sm:text-sm font-semibold flex items-center justify-between gap-3 shadow-xl"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{toastMessage}</span>
                </div>
                <button
                  onClick={() => setToastMessage(null)}
                  className="text-emerald-400 hover:text-white text-xs cursor-pointer"
                >
                  ✕
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Subject & Chapter Filter Controls */}
          <div className="p-3.5 rounded-2xl bg-[#0e1424] border border-slate-800 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5">
              {/* Subject Dropdown */}
              <div className="sm:col-span-4 space-y-1">
                <label className="text-[11px] font-semibold text-slate-400">বিষয় নির্বাচন করুন:</label>
                <select
                  value={selectedSubjectName}
                  onChange={(e) => {
                    setSelectedSubjectName(e.target.value);
                    setSelectedChapterName('সব অধ্যায়');
                  }}
                  className="w-full py-2 px-3 rounded-xl bg-[#080d1a] border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-amber-400"
                >
                  <option value="সব বিষয়">সব বিষয় (All Subjects)</option>
                  {SUBJECTS.map((s) => (
                    <option key={s.id} value={s.name}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Chapter Dropdown */}
              <div className="sm:col-span-5 space-y-1">
                <label className="text-[11px] font-semibold text-slate-400">অধ্যায় নির্বাচন করুন:</label>
                <select
                  value={selectedChapterName}
                  onChange={(e) => setSelectedChapterName(e.target.value)}
                  disabled={availableChapters.length === 0}
                  className="w-full py-2 px-3 rounded-xl bg-[#080d1a] border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-amber-400 disabled:opacity-50"
                >
                  <option value="সব অধ্যায়">সব অধ্যায়</option>
                  {availableChapters.map((chap, i) => (
                    <option key={i} value={chap}>
                      {chap}
                    </option>
                  ))}
                </select>
              </div>

              {/* Image Upload Trigger Button */}
              <div className="sm:col-span-3 space-y-1 flex flex-col justify-end">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="doubt-image-upload-input"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 hover:border-slate-600 text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                >
                  <Camera className="w-4 h-4 text-amber-400" />
                  <span>{uploadedImage ? 'ছবি পরিবর্তন' : 'প্রশ্নের ছবি দিন'}</span>
                </button>
              </div>
            </div>

            {/* Uploaded Image Thumbnail Preview */}
            {uploadedImage && (
              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-[#080d1a] border border-amber-500/30 text-xs">
                <img
                  src={uploadedImage}
                  alt="Uploaded doubt"
                  className="w-12 h-12 rounded-lg object-cover border border-amber-500/40"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-[11px] font-semibold text-amber-300 truncate">
                    সংযুক্ত ছবি: {uploadedImageName || 'doubt_image.jpg'}
                  </div>
                  <div className="text-[10px] text-slate-400">
                    ছবি থেকে প্রশ্নের দৃশ্যমান উপাদান বিশ্লেষণ করা হচ্ছে
                  </div>
                </div>
                <button
                  onClick={removeUploadedImage}
                  className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 cursor-pointer"
                  title="ছবি মুছুন"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Question Text Input & Submit */}
            <form onSubmit={handleResolveDoubt} className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={customQuestion}
                  onChange={(e) => setCustomQuestion(e.target.value)}
                  placeholder="আপনার প্রশ্ন লিখুন (যেমন: বয়েলের সূত্রে P-V লেখচিত্র, মেন্ডেলের চেকারবোর্ড, ওহমের সূত্র, প্রতিবর্ত চাপ)..."
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[#080d1a] border border-slate-700 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50"
                />
              </div>

              <button
                type="submit"
                id="submit-doubt-query-btn"
                disabled={isAiGenerating || (!customQuestion.trim() && !uploadedImage)}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-purple-600 hover:from-amber-400 hover:to-purple-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-amber-900/30 transition-all disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer shrink-0"
              >
                {isAiGenerating ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-spin text-amber-200" />
                    <span>Gemini সমাধান তৈরি করছে...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-200" />
                    <span>🤖 GimiDoubt সমাধান পান</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* SOCIAL SHARING & CLIPBOARD BAR */}
          <div className="p-3 rounded-2xl bg-gradient-to-r from-indigo-950/40 via-purple-950/40 to-[#0e1424] border border-indigo-500/30 flex flex-wrap items-center justify-between gap-2.5 shadow-lg">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-300">
                <Share2 className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>সোশ্যাল শেয়ার ও কপি</span>
                  <span className="text-[10px] font-normal text-indigo-300 hidden sm:inline">
                    (বন্ধু ও শিক্ষকদের সাথে শেয়ার করুন)
                  </span>
                </div>
                <div className="text-[10px] text-slate-400">
                  সম্পূর্ণ উত্তর, ভিজ্যুয়াল ও পরীক্ষার টিপস এক ক্লিকে শেয়ার করুন
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              {/* WhatsApp Share Button */}
              <button
                type="button"
                id="share-whatsapp-btn"
                onClick={handleWhatsAppShare}
                className="px-3 py-1.5 rounded-xl bg-emerald-600/30 hover:bg-emerald-600/40 border border-emerald-500/50 text-emerald-300 hover:text-emerald-200 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-all shadow-sm"
                title="WhatsApp-এ বন্ধু বা শিক্ষককে পাঠান"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp</span>
              </button>

              {/* Native Web Share Button */}
              <button
                type="button"
                id="share-native-btn"
                onClick={handleNativeShare}
                className="px-3 py-1.5 rounded-xl bg-purple-600/30 hover:bg-purple-600/40 border border-purple-500/50 text-purple-200 hover:text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-all shadow-sm"
                title="সোশ্যাল মিডিয়া বা অ্যাপে শেয়ার করুন"
              >
                <Share2 className="w-3.5 h-3.5 text-purple-300" />
                <span>শেয়ার</span>
              </button>

              {/* Copy Full Explanation to Clipboard */}
              <button
                type="button"
                id="copy-explanation-btn"
                onClick={handleCopyExplanation}
                className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-all shadow-sm ${
                  copySuccess
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400 ring-1 ring-emerald-400'
                    : 'bg-indigo-600/30 hover:bg-indigo-600/40 text-indigo-200 hover:text-white border-indigo-500/40'
                }`}
                title="সম্পূর্ণ সমাধান ক্লিপবোর্ডে কপি করুন"
              >
                {copySuccess ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>কপি সম্পন্ন!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-indigo-300" />
                    <span>উত্তর কপি</span>
                  </>
                )}
              </button>

              {/* Copy Visual Reference Link */}
              <button
                type="button"
                id="copy-link-btn"
                onClick={handleCopyLink}
                className={`px-2.5 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1 cursor-pointer transition-all ${
                  linkCopied
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400'
                    : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white border-slate-700'
                }`}
                title="রেফারেন্স লিংক কপি করুন"
              >
                {linkCopied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-cyan-400" />
                    <span>লিংক কপি!</span>
                  </>
                ) : (
                  <>
                    <Link2 className="w-3.5 h-3.5 text-slate-400" />
                    <span>লিংক</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Main Resolution Workspace: Left Visual Diagram, Right Step-by-Step Bengali Explanation */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            {/* Left: Dynamic Visual Explanation Engine (SVG Diagram / Graph / Flowchart) */}
            <div className="lg:col-span-6 space-y-3">
              <div className="p-3.5 rounded-2xl bg-[#0e1424] border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-amber-400 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>শিক্ষামূলক ভিজ্যুয়াল চিত্র (Visual Explanation)</span>
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-500/10 text-purple-300 border border-purple-500/20">
                    WBBSE মাধ্যমিক ২০২৭
                  </span>
                </div>

                {/* SVG Visual Component */}
                <VisualDoubtRenderer
                  visualType={activeDoubt.visualType}
                  titleBn={activeDoubt.visualTitleBn}
                  captionBn={activeDoubt.visualCaptionBn}
                  scientificTermEn={activeDoubt.scientificTermEn}
                  related3DModelId={activeDoubt.related3DModelId}
                  labeledParts={activeDoubt.labeledParts}
                  onOpenFull3DModel={onOpen3DModel}
                />
              </div>

              {/* Link to 3D Model if relevant */}
              {activeDoubt.related3DModelId && onOpen3DModel && (
                <div className="p-3 rounded-xl bg-gradient-to-r from-indigo-950/50 to-purple-950/40 border border-indigo-700/50 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-base">🔬</span>
                    <span className="text-indigo-200">
                      এই ধারণার একটি ৩৬০° ইন্টারেক্টিভ 3D মডেল উপলব্ধ আছে
                    </span>
                  </div>
                  <button
                    onClick={() => onOpen3DModel(activeDoubt.related3DModelId!)}
                    className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold flex items-center gap-1 cursor-pointer shrink-0 transition-all"
                  >
                    <span>3D মডেল খুলুন</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>

            {/* Right: Step-by-Step Explanation, English Terms, Exam Tips */}
            <div className="lg:col-span-6 space-y-4">
              {/* Question Header & English Term */}
              <div className="space-y-1.5 bg-[#0e1424] p-3.5 rounded-2xl border border-slate-800">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      {activeDoubt.subjectName} • {activeDoubt.chapterName}
                    </span>
                    {activeDoubt.source === 'gemini-ai' && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-purple-400" />
                        <span>Gemini AI Generated</span>
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={handleCopyExplanation}
                      className="text-[11px] text-indigo-300 hover:text-white flex items-center gap-1 bg-indigo-950/50 px-2 py-0.5 rounded border border-indigo-500/30 cursor-pointer"
                      title="উত্তর কপি করুন"
                    >
                      <Copy className="w-3 h-3" />
                      <span>{copySuccess ? 'কপি হয়েছে' : 'কপি'}</span>
                    </button>
                  </div>
                </div>

                <h3 className="text-sm sm:text-base font-bold text-white">
                  {activeDoubt.questionBn}
                </h3>

                <div className="text-xs font-mono font-semibold text-cyan-300 bg-cyan-950/50 px-3 py-1 rounded-lg border border-cyan-800/50 inline-block break-all">
                  Scientific Term: {activeDoubt.scientificTermEn}
                </div>
              </div>

              {/* Step-by-Step Bengali Explanation */}
              <div className="p-4 rounded-2xl bg-[#0e1424] border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-purple-400" />
                    <span>ধাপে ধাপে সহজ বাংলা ব্যাখ্যা (Step-by-Step):</span>
                  </h4>
                  <button
                    onClick={handleCopyExplanation}
                    className="text-[10px] text-slate-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
                  >
                    <Copy className="w-3 h-3" />
                    <span>ব্যাখ্যা কপি</span>
                  </button>
                </div>

                <div className="space-y-2.5">
                  {activeDoubt.explanationStepsBn.map((step, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-[#080d1a] border border-slate-800 space-y-1 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-cyan-300">{step.stepTitleBn}</span>
                        {step.stepEn && (
                          <span className="text-[10px] text-slate-400 font-mono">({step.stepEn})</span>
                        )}
                      </div>
                      <p className="text-slate-300 leading-relaxed whitespace-pre-line text-[11px] sm:text-xs">
                        {step.detailsBn}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Important Terms with English Counterpart */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  <span>গুরুত্বপূর্ণ পরিভাষা (Important Terms):</span>
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {activeDoubt.importantTermsWithEn.map((term, i) => (
                    <div
                      key={i}
                      className="p-2 rounded-lg bg-[#080d1a] border border-slate-800 text-[11px] flex flex-col"
                    >
                      <span className="font-bold text-slate-200">{term.bn}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{term.en}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Exam Tip */}
              <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-500/30 text-xs text-amber-200 flex items-start gap-2.5">
                <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-amber-300">মাধ্যমিক ২০২৭ পরীক্ষার টিপস: </strong>
                  <span>{activeDoubt.examTipBn}</span>
                </div>
              </div>

              {/* Action Bottom Sharing Strip */}
              <div className="pt-1 flex items-center justify-end gap-2">
                <button
                  onClick={handleWhatsAppShare}
                  className="py-2 px-3 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp-এ পাঠান</span>
                </button>
                <button
                  onClick={handleCopyExplanation}
                  className="py-2 px-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md cursor-pointer transition-all"
                >
                  {copySuccess ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copySuccess ? 'কপি সম্পন্ন হয়েছে' : 'ক্লিপবোর্ডে কপি করুন'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Frequently Asked Doubts List (Curated Archive) */}
          <div className="space-y-2.5 pt-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-400 px-1">
              <span>ঘন ঘন জিজ্ঞাসিত গুরুত্বপূর্ণ প্রশ্ন ও ভিজ্যুয়াল ডায়াগ্রাম ({filteredCuratedDoubts.length}টি)</span>
              <span>ক্লিক করে সমাধান দেখুন</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {filteredCuratedDoubts.map((doubt) => {
                const isActive = activeDoubt.id === doubt.id;
                return (
                  <button
                    key={doubt.id}
                    onClick={() => handleSelectCuratedDoubt(doubt)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-start justify-between gap-2 ${
                      isActive
                        ? 'bg-amber-500/15 border-amber-400 shadow-md ring-1 ring-amber-400'
                        : 'bg-[#0e1424] border-slate-800 hover:border-slate-700 hover:bg-[#131b30]'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5">
                        <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                          {doubt.subjectName}
                        </span>
                        <span className="text-[10px] text-slate-400">{doubt.chapterName}</span>
                      </div>
                      <p className="text-xs font-semibold text-slate-200 line-clamp-2">
                        {doubt.questionBn}
                      </p>
                    </div>
                    <span className="text-base shrink-0">📊</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Footer */}
          <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
            <span>TrioMadhyamik • সচিত্র ভিজ্যুয়াল সংশয় মোচন ও সোশ্যাল শেয়ার পদ্ধতি</span>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold cursor-pointer"
            >
              বন্ধ করুন
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
