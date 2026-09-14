import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShieldCheck,
  PlusCircle,
  Edit3,
  Trash2,
  Search,
  Filter,
  BookOpen,
  HelpCircle,
  CheckCircle,
  Clock,
  Calendar,
  Image as ImageIcon,
  ArrowLeft,
  Save,
  Layers,
  Sparkles,
  FileText,
  AlertCircle,
  X,
  Upload,
  Eye,
  CheckSquare,
  Lock,
  KeyRound,
} from 'lucide-react';
import { Question, Subject, Chapter, OptionId, Option, DifficultyLevel } from '../types';
import { toBengaliNumber } from '../utils/bengaliUtils';
import { AdminPasswordChangeModal } from './AdminPasswordChangeModal';

interface AdminPanelProps {
  questions: Question[];
  subjects: Subject[];
  onSaveQuestion: (question: Question) => void;
  onDeleteQuestion: (questionId: string) => void;
  onSaveSubject: (subject: Subject) => void;
  onAddChapter: (subjectId: string, chapter: Chapter) => void;
  onExitAdmin: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  questions,
  subjects,
  onSaveQuestion,
  onDeleteQuestion,
  onSaveSubject,
  onAddChapter,
  onExitAdmin,
}) => {
  // Navigation tabs in Admin
  const [activeTab, setActiveTab] = useState<'questions' | 'add_question' | 'manage_subjects'>('questions');

  // Admin Password Change Modal state
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  // Filter and search states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState<string>('all');
  const [selectedChapterFilter, setSelectedChapterFilter] = useState<string>('all');

  // State for Editing / Adding Question
  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(null);

  // Form State for Question
  const [formSubjectId, setFormSubjectId] = useState<string>(subjects[0]?.id || 'bengali');
  const [formChapterId, setFormChapterId] = useState<string>(subjects[0]?.chapters[0]?.id || '');
  const [formQuestion, setFormQuestion] = useState('');
  const [formOption1, setFormOption1] = useState('');
  const [formOption2, setFormOption2] = useState('');
  const [formOption3, setFormOption3] = useState('');
  const [formOption4, setFormOption4] = useState('');
  const [formCorrectOptionId, setFormCorrectOptionId] = useState<OptionId>('(i)');
  const [formExplanation, setFormExplanation] = useState('');
  const [formDifficulty, setFormDifficulty] = useState<string>('সাধারণ');
  const [formImageUrl, setFormImageUrl] = useState('');
  const [formDate, setFormDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [formTime, setFormTime] = useState(() => {
    const d = new Date();
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  });
  const [formEnglishTerm, setFormEnglishTerm] = useState('');
  const [formExtraNote, setFormExtraNote] = useState('');
  const [formBengaliBeforeText, setFormBengaliBeforeText] = useState('');
  const [formBengaliAfterText, setFormBengaliAfterText] = useState('');
  const [formComment, setFormComment] = useState('');
  const [formReview, setFormReview] = useState('যাচাইকৃত (Verified)');

  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');

  // State for Adding New Subject
  const [newSubjectName, setNewSubjectName] = useState('');
  const [newSubjectSubtitle, setNewSubjectSubtitle] = useState('');
  const [newSubjectIcon, setNewSubjectIcon] = useState('BookOpen');

  // State for Adding New Chapter
  const [targetSubjectForChapter, setTargetSubjectForChapter] = useState<string>(subjects[0]?.id || '');
  const [newChapterName, setNewChapterName] = useState('');
  const [newChapterDesc, setNewChapterDesc] = useState('');

  // Filter chapters based on selected form subject
  const currentFormSubject = useMemo(() => {
    return subjects.find((s) => s.id === formSubjectId) || subjects[0];
  }, [subjects, formSubjectId]);

  // When formSubjectId changes, update chapter if current is invalid
  const handleSubjectChange = (subId: string) => {
    setFormSubjectId(subId);
    const sub = subjects.find((s) => s.id === subId);
    if (sub && sub.chapters.length > 0) {
      setFormChapterId(sub.chapters[0].id);
    } else {
      setFormChapterId('');
    }
  };

  // Reset question form
  const resetForm = () => {
    setEditingQuestionId(null);
    setFormQuestion('');
    setFormOption1('');
    setFormOption2('');
    setFormOption3('');
    setFormOption4('');
    setFormCorrectOptionId('(i)');
    setFormExplanation('');
    setFormDifficulty('সাধারণ');
    setFormImageUrl('');
    setFormEnglishTerm('');
    setFormExtraNote('');
    setFormBengaliBeforeText('');
    setFormBengaliAfterText('');
    setFormComment('');
    setFormReview('যাচাইকৃত (Verified)');
    setFormDate(new Date().toISOString().split('T')[0]);
    setFormTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    setFormError('');
    setFormSuccess('');
  };

  // Populate form for editing an existing question
  const startEditQuestion = (q: Question) => {
    setEditingQuestionId(q.id);
    setFormSubjectId(q.subjectId);
    setFormChapterId(q.chapterId);
    setFormQuestion(q.question);
    setFormOption1(q.options[0]?.text || '');
    setFormOption2(q.options[1]?.text || '');
    setFormOption3(q.options[2]?.text || '');
    setFormOption4(q.options[3]?.text || '');
    setFormCorrectOptionId(q.correctOptionId);
    setFormExplanation(q.explanation || '');
    setFormDifficulty(q.difficulty || 'সাধারণ');
    setFormImageUrl(q.imageUrl || '');
    setFormDate(q.date || new Date().toISOString().split('T')[0]);
    setFormTime(q.time || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    setFormEnglishTerm(q.englishTerm || '');
    setFormExtraNote(q.extraNote || '');
    setFormBengaliBeforeText(q.bengaliBeforeText || '');
    setFormBengaliAfterText(q.bengaliAfterText || '');
    setFormComment(q.comment || '');
    setFormReview(q.review || 'যাচাইকৃত (Verified)');
    setActiveTab('add_question');
  };

  // Handle image upload from file input
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setFormError('ছবির আকার সর্বোচ্চ ২ মেগাবাইট হতে হবে।');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Save Question Submission
  const handleSubmitQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess('');

    if (!formQuestion.trim()) {
      setFormError('অনুগ্রহ করে প্রশ্ন লিখুন।');
      return;
    }
    if (!formOption1.trim() || !formOption2.trim() || !formOption3.trim() || !formOption4.trim()) {
      setFormError('অনুগ্রহ করে ৪টি অপশনই সম্পূর্ণভাবে পূরণ করুন।');
      return;
    }
    if (!formExplanation.trim()) {
      setFormError('অনুগ্রহ করে সঠিক উত্তরের বিশদ ব্যাখ্যা প্রদান করুন।');
      return;
    }

    const options: Option[] = [
      { id: '(i)', text: formOption1.trim() },
      { id: '(ii)', text: formOption2.trim() },
      { id: '(iii)', text: formOption3.trim() },
      { id: '(iv)', text: formOption4.trim() },
    ];

    const newQuestion: Question = {
      id: editingQuestionId || `custom-q-${Date.now()}`,
      subjectId: formSubjectId,
      chapterId: formChapterId || 'general',
      question: formQuestion.trim(),
      options,
      correctOptionId: formCorrectOptionId,
      explanation: formExplanation.trim(),
      difficulty: formDifficulty,
      imageUrl: formImageUrl.trim() || undefined,
      date: formDate,
      time: formTime,
      englishTerm: formEnglishTerm.trim() || undefined,
      extraNote: formExtraNote.trim() || undefined,
      bengaliBeforeText: formBengaliBeforeText.trim() || undefined,
      bengaliAfterText: formBengaliAfterText.trim() || undefined,
      comment: formComment.trim() || undefined,
      review: formReview,
      createdAt: Date.now(),
      isCustom: true,
    };

    onSaveQuestion(newQuestion);
    setFormSuccess(editingQuestionId ? 'প্রশ্ন সফলভাবে আপডেট করা হয়েছে!' : 'নতুন প্রশ্ন সফলভাবে প্রশ্ন ব্যাংকে যুক্ত হয়েছে!');

    setTimeout(() => {
      resetForm();
      setActiveTab('questions');
    }, 1200);
  };

  // Handle Add New Subject
  const handleCreateSubject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubjectName.trim()) return;

    const id = `custom-sub-${Date.now()}`;
    const newSubject: Subject = {
      id,
      name: newSubjectName.trim(),
      subtitle: newSubjectSubtitle.trim() || 'মাধ্যমিক ২০২৭ সিলেবাস',
      iconName: newSubjectIcon,
      accentGradient: 'from-blue-600 via-indigo-600 to-purple-600',
      borderGlow: 'hover:border-indigo-500/50',
      badgeColor: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30',
      chapters: [
        {
          id: `${id}-ch-1`,
          subjectId: id,
          name: 'অধ্যায় ১',
          description: 'প্রথম অধ্যায়',
        },
      ],
      isCustom: true,
    };

    onSaveSubject(newSubject);
    setNewSubjectName('');
    setNewSubjectSubtitle('');
    alert(`নতুন বিষয় "${newSubject.name}" সফলভাবে যুক্ত হয়েছে!`);
  };

  // Handle Add New Chapter
  const handleCreateChapter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChapterName.trim() || !targetSubjectForChapter) return;

    const newChapter: Chapter = {
      id: `custom-ch-${Date.now()}`,
      subjectId: targetSubjectForChapter,
      name: newChapterName.trim(),
      description: newChapterDesc.trim() || undefined,
      isCustom: true,
    };

    onAddChapter(targetSubjectForChapter, newChapter);
    setNewChapterName('');
    setNewChapterDesc('');
    alert(`নতুন অধ্যায় "${newChapter.name}" সফলভাবে যুক্ত হয়েছে!`);
  };

  // Filtered Questions in bank
  const filteredQuestions = useMemo(() => {
    return questions.filter((q) => {
      const matchSubject = selectedSubjectFilter === 'all' || q.subjectId === selectedSubjectFilter;
      const matchChapter = selectedChapterFilter === 'all' || q.chapterId === selectedChapterFilter;
      const matchSearch =
        !searchQuery ||
        q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (q.englishTerm && q.englishTerm.toLowerCase().includes(searchQuery.toLowerCase())) ||
        q.explanation.toLowerCase().includes(searchQuery.toLowerCase());
      return matchSubject && matchChapter && matchSearch;
    });
  }, [questions, selectedSubjectFilter, selectedChapterFilter, searchQuery]);

  return (
    <div id="admin-panel-container" className="w-full max-w-5xl mx-auto px-4 py-5 sm:py-7 space-y-6">
      {/* Admin Top Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-950/90 via-indigo-950/80 to-blue-950/90 border border-purple-500/40 p-5 sm:p-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-bold">
              <ShieldCheck className="w-4 h-4 text-purple-400" />
              <span>TrioMadhyamik • অ্যাডমিন কন্ট্রোল প্যানেল</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              প্রশ্ন ব্যাংক ও বিষয়বস্তু ব্যবস্থাপনা (Admin Question Management)
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              এখানে যুক্ত করা প্রতিটি প্রশ্ন, অপশন, বিশদ ব্যাখ্যা এবং ছবি সাথে সাথে ছাত্র-ছাত্রীদের মাধ্যমিক ২০২৭ মক টেস্টে উপলব্ধ হবে।
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 self-start sm:self-center">
            {/* 🔐 Password Change Button */}
            <button
              id="admin-change-password-btn"
              onClick={() => setIsPasswordModalOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-purple-900/50 hover:bg-purple-800/80 text-purple-200 hover:text-white border border-purple-500/40 font-semibold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-md hover:border-purple-400"
              title="অ্যাডমিন প্যানেলের পাসওয়ার্ড পরিবর্তন করুন"
            >
              <Lock className="w-3.5 h-3.5 text-purple-300" />
              <span>🔐 Password Change</span>
            </button>

            <button
              id="admin-exit-btn"
              onClick={onExitAdmin}
              className="px-3.5 py-2 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-600 font-semibold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-cyan-400" />
              <span>স্টুডেন্ট প্যানেল</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation in Admin */}
        <div className="flex flex-wrap items-center gap-2 mt-5 pt-4 border-t border-indigo-900/60">
          <button
            onClick={() => setActiveTab('questions')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'questions'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/40'
                : 'bg-slate-900/80 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>সকল প্রশ্ন ({toBengaliNumber(questions.length)})</span>
          </button>

          <button
            onClick={() => {
              resetForm();
              setActiveTab('add_question');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'add_question'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/40'
                : 'bg-slate-900/80 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>{editingQuestionId ? 'প্রশ্ন সম্পাদনা' : 'নতুন প্রশ্ন যোগ করুন'}</span>
          </button>

          <button
            onClick={() => setActiveTab('manage_subjects')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'manage_subjects'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/40'
                : 'bg-slate-900/80 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>বিষয় ও অধ্যায় পরিচালনা ({toBengaliNumber(subjects.length)})</span>
          </button>
        </div>
      </div>

      {/* TAB 1: ALL QUESTIONS LIST */}
      {activeTab === 'questions' && (
        <div className="space-y-4">
          {/* Search & Filter Bar */}
          <div className="p-4 rounded-2xl bg-[#0e1424] border border-slate-800 flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="প্রশ্ন, ইংরেজি পরিভাষা বা ব্যাখ্যা অনুসন্ধান করুন..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 placeholder:text-slate-500 outline-none focus:border-purple-500 transition-colors"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <select
                value={selectedSubjectFilter}
                onChange={(e) => {
                  setSelectedSubjectFilter(e.target.value);
                  setSelectedChapterFilter('all');
                }}
                className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 outline-none cursor-pointer"
              >
                <option value="all">সকল বিষয়</option>
                {subjects.map((sub) => (
                  <option key={sub.id} value={sub.id}>
                    {sub.name}
                  </option>
                ))}
              </select>

              <button
                onClick={() => {
                  resetForm();
                  setActiveTab('add_question');
                }}
                className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-xs flex items-center gap-1.5 shrink-0 shadow cursor-pointer hover:opacity-95"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>নতুন MCQ</span>
              </button>
            </div>
          </div>

          {/* Question Count Stats */}
          <div className="flex items-center justify-between text-xs text-slate-400 px-1">
            <span>
              মোট প্রদর্শিত প্রশ্ন: <strong className="text-white">{toBengaliNumber(filteredQuestions.length)}টি</strong>
            </span>
            <span>WBBSE Madhyamik Question Bank</span>
          </div>

          {/* Questions Grid */}
          <div className="space-y-3">
            {filteredQuestions.length === 0 ? (
              <div className="p-12 text-center rounded-2xl bg-[#0b1020] border border-slate-800 text-slate-400 space-y-2">
                <HelpCircle className="w-8 h-8 text-slate-600 mx-auto" />
                <p className="text-sm font-semibold text-slate-300">কোনো প্রশ্ন খুঁজে পাওয়া যায়নি</p>
                <p className="text-xs text-slate-500">অনুসন্ধানের শব্দ পরিবর্তন করুন অথবা নতুন প্রশ্ন যোগ করুন।</p>
              </div>
            ) : (
              filteredQuestions.map((q, idx) => {
                const subObj = subjects.find((s) => s.id === q.subjectId);
                const chObj = subObj?.chapters.find((c) => c.id === q.chapterId);

                return (
                  <div
                    key={q.id}
                    className="p-4 sm:p-5 rounded-2xl bg-[#0e1424] border border-slate-800 hover:border-indigo-500/40 transition-all space-y-3 shadow-md"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-lg bg-indigo-600/30 border border-indigo-500/40 text-cyan-300 text-xs font-bold flex items-center justify-center">
                          {toBengaliNumber(idx + 1)}
                        </span>
                        <span className="text-xs font-bold text-white">
                          {subObj?.name || q.subjectId}
                        </span>
                        <span className="text-xs text-slate-400">
                          • {chObj?.name || q.chapterId}
                        </span>
                        {q.difficulty && (
                          <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                            {q.difficulty}
                          </span>
                        )}
                        {q.isCustom && (
                          <span className="text-[10px] px-2 py-0.5 rounded bg-purple-950/60 text-purple-300 border border-purple-500/40">
                            অ্যাডমিন প্রশ্ন
                          </span>
                        )}
                      </div>

                      {/* Action buttons: Edit, Delete */}
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => startEditQuestion(q)}
                          className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                          title="প্রশ্ন সম্পাদনা করুন"
                        >
                          <Edit3 className="w-3.5 h-3.5 text-cyan-400" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm('আপনি কি নিশ্চিত এই প্রশ্নটি স্থায়ীভাবে মুছে ফেলতে চান?')) {
                              onDeleteQuestion(q.id);
                            }
                          }}
                          className="px-2.5 py-1 rounded-lg bg-rose-950/40 hover:bg-rose-950/70 border border-rose-800/40 text-rose-300 text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                          title="প্রশ্ন মুছুন"
                        >
                          <Trash2 className="w-3.5 h-3.5 text-rose-400" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>

                    {/* Pre-text if available */}
                    {q.bengaliBeforeText && (
                      <p className="text-xs text-slate-400 italic bg-[#080d1a] p-2 rounded-lg border border-slate-800">
                        {q.bengaliBeforeText}
                      </p>
                    )}

                    {/* Question text & English term */}
                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-slate-100">
                        {q.question}
                      </h4>
                      {q.englishTerm && (
                        <span className="text-[11px] text-cyan-300 font-mono">
                          ({q.englishTerm})
                        </span>
                      )}
                    </div>

                    {/* Image if available */}
                    {q.imageUrl && (
                      <div className="max-w-xs rounded-xl overflow-hidden border border-slate-700 my-2">
                        <img src={q.imageUrl} alt="Question Visual" className="w-full h-auto object-cover" />
                      </div>
                    )}

                    {/* 4 Options */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                      {q.options.map((opt) => {
                        const isCorrect = opt.id === q.correctOptionId;
                        return (
                          <div
                            key={opt.id}
                            className={`p-2 rounded-xl text-xs flex items-center gap-2 ${
                              isCorrect
                                ? 'bg-emerald-950/40 border border-emerald-500/50 text-emerald-200 font-semibold'
                                : 'bg-slate-900/60 border border-slate-800/80 text-slate-400'
                            }`}
                          >
                            <span className="font-mono text-[11px]">{opt.id}</span>
                            <span>{opt.text}</span>
                            {isCorrect && <CheckCircle className="w-3.5 h-3.5 text-emerald-400 ml-auto" />}
                          </div>
                        );
                      })}
                    </div>

                    {/* Explanation */}
                    <div className="text-xs text-slate-300 bg-[#090e1c] p-2.5 rounded-xl border border-indigo-950 space-y-1">
                      <span className="font-bold text-cyan-300">বিশদ ব্যাখ্যা: </span>
                      <span>{q.explanation}</span>
                    </div>

                    {/* Meta info: Date, Time, Comment, Review */}
                    <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500 pt-1 border-t border-slate-800/60">
                      {q.date && (
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-slate-500" />
                          <span>{q.date}</span>
                        </span>
                      )}
                      {q.time && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-500" />
                          <span>{q.time}</span>
                        </span>
                      )}
                      {q.review && (
                        <span className="text-purple-400">স্ট্যাটাস: {q.review}</span>
                      )}
                      {q.comment && (
                        <span className="text-slate-400 italic">মন্তব্য: {q.comment}</span>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* TAB 2: ADD / EDIT QUESTION FORM */}
      {activeTab === 'add_question' && (
        <form
          onSubmit={handleSubmitQuestion}
          className="p-5 sm:p-7 rounded-3xl bg-[#0b1020] border border-purple-500/30 shadow-2xl space-y-5"
        >
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <PlusCircle className="w-5 h-5 text-purple-400" />
              <span>{editingQuestionId ? 'প্রশ্ন সম্পাদনা (Edit Question)' : 'নতুন MCQ প্রশ্ন যোগ করুন'}</span>
            </h3>
            <button
              type="button"
              onClick={() => {
                resetForm();
                setActiveTab('questions');
              }}
              className="text-xs text-slate-400 hover:text-white cursor-pointer"
            >
              বাতিল
            </button>
          </div>

          {formError && (
            <div className="p-3 rounded-xl bg-rose-950/50 border border-rose-500/50 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{formError}</span>
            </div>
          )}

          {formSuccess && (
            <div className="p-3 rounded-xl bg-emerald-950/50 border border-emerald-500/50 text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle className="w-4 h-4 shrink-0" />
              <span>{formSuccess}</span>
            </div>
          )}

          {/* Row 1: Subject & Chapter */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                বিষয় নির্বাচন (Subject) *
              </label>
              <select
                value={formSubjectId}
                onChange={(e) => handleSubjectChange(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 outline-none focus:border-purple-500"
              >
                {subjects.map((sub) => (
                  <option key={sub.id} value={sub.id}>
                    {sub.name} ({sub.subtitle})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                অধ্যায় নির্বাচন (Chapter) *
              </label>
              <select
                value={formChapterId}
                onChange={(e) => setFormChapterId(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 outline-none focus:border-purple-500"
              >
                {currentFormSubject?.chapters.map((ch) => (
                  <option key={ch.id} value={ch.id}>
                    {ch.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Row 2: Bengali Before Text (Optional context/passage) */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">
              প্রশ্নোত্তর পূর্ববর্তী অনুচ্ছেদ বা প্রেক্ষাপট (Bengali Before Text - ঐচ্ছিক)
            </label>
            <input
              type="text"
              placeholder="উদাঃ 'নিচের উদ্দীপকটি পড়ে প্রশ্নটির উত্তর দাও' বা কোনো পাঠ্য উক্তি..."
              value={formBengaliBeforeText}
              onChange={(e) => setFormBengaliBeforeText(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 outline-none focus:border-purple-500"
            />
          </div>

          {/* Row 3: Question Text & English Term */}
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                মূল প্রশ্ন (Question Text) *
              </label>
              <textarea
                rows={3}
                placeholder="বাংলা ভাষায় সঠিক প্রশ্নটি লিখুন..."
                value={formQuestion}
                onChange={(e) => setFormQuestion(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-100 outline-none focus:border-purple-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  ইংরেজি বৈজ্ঞানিক পরিভাষা (English Term/Name - ঐচ্ছিক)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Mitochondria, Boyle's Law, Simple Interest..."
                  value={formEnglishTerm}
                  onChange={(e) => setFormEnglishTerm(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  কঠিনতার স্তর (Difficulty)
                </label>
                <select
                  value={formDifficulty}
                  onChange={(e) => setFormDifficulty(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 outline-none focus:border-purple-500"
                >
                  <option value="সহজ">সহজ (Easy)</option>
                  <option value="সাধারণ">সাধারণ (Medium)</option>
                  <option value="কঠিন">কঠিন (Hard / Advanced)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Row 4: 4 MCQ Options & Correct Answer Radio */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-slate-200">
                ৪টি অপশন ও সঠিক উত্তর নির্বাচন করুন *
              </label>
              <span className="text-[11px] text-cyan-300">
                সঠিক উত্তরের পাশে টিক বা রেডিও চাপুন
              </span>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {[
                { id: '(i)' as OptionId, value: formOption1, setter: setFormOption1, label: 'অপশন (i)' },
                { id: '(ii)' as OptionId, value: formOption2, setter: setFormOption2, label: 'অপশন (ii)' },
                { id: '(iii)' as OptionId, value: formOption3, setter: setFormOption3, label: 'অপশন (iii)' },
                { id: '(iv)' as OptionId, value: formOption4, setter: setFormOption4, label: 'অপশন (iv)' },
              ].map((item) => (
                <div
                  key={item.id}
                  className={`p-2.5 rounded-xl border flex items-center gap-3 transition-colors ${
                    formCorrectOptionId === item.id
                      ? 'bg-emerald-950/40 border-emerald-500/60'
                      : 'bg-slate-900 border-slate-800'
                  }`}
                >
                  <label className="flex items-center gap-2 cursor-pointer shrink-0">
                    <input
                      type="radio"
                      name="correctOption"
                      checked={formCorrectOptionId === item.id}
                      onChange={() => setFormCorrectOptionId(item.id)}
                      className="accent-emerald-500 w-4 h-4 cursor-pointer"
                    />
                    <span className="text-xs font-bold text-purple-300 font-mono">{item.id}</span>
                  </label>
                  <input
                    type="text"
                    placeholder={`${item.label} এর বিবরণ লিখুন...`}
                    value={item.value}
                    onChange={(e) => item.setter(e.target.value)}
                    className="w-full bg-transparent text-xs text-slate-200 outline-none"
                  />
                  {formCorrectOptionId === item.id && (
                    <span className="text-[10px] font-bold text-emerald-400 shrink-0 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/40">
                      সঠিক উত্তর
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Row 5: Detailed Explanation */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">
              বিশদ ব্যাখ্যা (Explanation) *
            </label>
            <textarea
              rows={3}
              placeholder="কেন এই উত্তরটি সঠিক, তার পাঠ্যবইভিত্তিক পূর্ণাঙ্গ ব্যাখ্যা লিখুন..."
              value={formExplanation}
              onChange={(e) => setFormExplanation(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 outline-none focus:border-purple-500"
            />
          </div>

          {/* Row 6: Image Upload or URL */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-300">
              প্রশ্নের ছবি (Image - চিত্রভিত্তিক প্রশ্নের জন্য ঐচ্ছিক)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="ছবির সরাসরি লিংক (URL) লিখুন..."
                value={formImageUrl}
                onChange={(e) => setFormImageUrl(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 outline-none focus:border-purple-500"
              />
              <div className="flex items-center gap-2">
                <label className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors border border-slate-700">
                  <Upload className="w-3.5 h-3.5 text-cyan-400" />
                  <span>ডিভাইস থেকে ছবি আপলোড</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageFileChange}
                    className="hidden"
                  />
                </label>
                {formImageUrl && (
                  <button
                    type="button"
                    onClick={() => setFormImageUrl('')}
                    className="text-xs text-rose-400 hover:underline"
                  >
                    ছবি বাতিল
                  </button>
                )}
              </div>
            </div>

            {formImageUrl && (
              <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 max-w-xs">
                <span className="text-[10px] text-slate-400 mb-1 block">ছবির প্রিভিউ:</span>
                <img src={formImageUrl} alt="Preview" className="w-full h-auto rounded-lg max-h-40 object-cover" />
              </div>
            )}
          </div>

          {/* Row 7: Extra Note, Bengali After Text, Comment, Review, Date, Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-800/80">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                অতিরিক্ত বিশেষ তথ্য বা সূত্র (Extra Note)
              </label>
              <input
                type="text"
                placeholder="উদাঃ 'মাধ্যমিক ২০১৭ ও ২০২১ এ এসেছিল' বা বিশেষ সূত্র..."
                value={formExtraNote}
                onChange={(e) => setFormExtraNote(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                প্রশ্নোত্তর পরবর্তী টীকা (Bengali After Text)
              </label>
              <input
                type="text"
                placeholder="প্রশ্নোত্তর পরবর্তী কোনো অতিরিক্ত মন্তব্য বা নির্দেশনা..."
                value={formBengaliAfterText}
                onChange={(e) => setFormBengaliAfterText(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                অ্যাডমিন অভ্যন্তরীণ মন্তব্য (Comment)
              </label>
              <input
                type="text"
                placeholder="পরীক্ষক বা অ্যাডমিনের নিজস্ব নোট..."
                value={formComment}
                onChange={(e) => setFormComment(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                যাচাইকরণ স্ট্যাটাস (Review Status)
              </label>
              <select
                value={formReview}
                onChange={(e) => setFormReview(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 outline-none"
              >
                <option value="যাচাইকৃত (Verified)">যাচাইকৃত (Verified)</option>
                <option value="চূড়ান্ত অনুমোদিত (Approved)">চূড়ান্ত অনুমোদিত (Approved)</option>
                <option value="পুনর্বিবেচনা প্রয়োজন (Needs Review)">পুনর্বিবেচনা প্রয়োজন (Needs Review)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">তারিখ (Date)</label>
              <input
                type="date"
                value={formDate}
                onChange={(e) => setFormDate(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">সময় (Time)</label>
              <input
                type="text"
                value={formTime}
                onChange={(e) => setFormTime(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 outline-none"
              />
            </div>
          </div>

          {/* Form Submit Button */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={() => {
                resetForm();
                setActiveTab('questions');
              }}
              className="px-4 py-2.5 rounded-xl bg-slate-800 text-xs font-bold text-slate-300 hover:text-white cursor-pointer"
            >
              বাতিল
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-900/40 flex items-center gap-2 cursor-pointer transition-all"
            >
              <Save className="w-4 h-4" />
              <span>{editingQuestionId ? 'পরিবর্তন সংরক্ষণ করুন' : 'প্রশ্ন ব্যাংকে যুক্ত করুন'}</span>
            </button>
          </div>
        </form>
      )}

      {/* TAB 3: MANAGE SUBJECTS & CHAPTERS */}
      {activeTab === 'manage_subjects' && (
        <div className="space-y-6">
          {/* Add New Subject */}
          <div className="p-5 sm:p-6 rounded-3xl bg-[#0b1020] border border-slate-800 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-cyan-400" />
              <span>নতুন বিষয় যোগ করুন (Add New Subject)</span>
            </h3>

            <form onSubmit={handleCreateSubject} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs text-slate-400 mb-1">বিষয়ের নাম *</label>
                <input
                  type="text"
                  placeholder="উদাঃ কম্পিউটার অ্যাপ্লিকেশন বা রাশিবিজ্ঞান"
                  value={newSubjectName}
                  onChange={(e) => setNewSubjectName(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">উপ-শিরোনাম (Subtitle)</label>
                <input
                  type="text"
                  placeholder="উদাঃ ঐচ্ছিক বিষয় (Optional Subject)"
                  value={newSubjectSubtitle}
                  onChange={(e) => setNewSubjectSubtitle(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 outline-none focus:border-cyan-500"
                />
              </div>

              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold shadow-lg shadow-cyan-950/40 flex items-center justify-center gap-1.5 cursor-pointer transition-all"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>বিষয় যোগ করুন</span>
                </button>
              </div>
            </form>
          </div>

          {/* Add New Chapter to Subject */}
          <div className="p-5 sm:p-6 rounded-3xl bg-[#0b1020] border border-slate-800 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-purple-400" />
              <span>বিদ্যমান বিষয়ে নতুন অধ্যায় যোগ করুন (Add Chapter)</span>
            </h3>

            <form onSubmit={handleCreateChapter} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs text-slate-400 mb-1">উদ্দিষ্ট বিষয় *</label>
                <select
                  value={targetSubjectForChapter}
                  onChange={(e) => setTargetSubjectForChapter(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 outline-none"
                >
                  {subjects.map((sub) => (
                    <option key={sub.id} value={sub.id}>
                      {sub.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">অধ্যায়ের নাম *</label>
                <input
                  type="text"
                  placeholder="উদাঃ চলতড়িৎ ও তড়িৎচৌম্বকীয় ঘটনা"
                  value={newChapterName}
                  onChange={(e) => setNewChapterName(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 outline-none focus:border-purple-500"
                />
              </div>

              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-lg shadow-purple-950/40 flex items-center justify-center gap-1.5 cursor-pointer transition-all"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>অধ্যায় যোগ করুন</span>
                </button>
              </div>
            </form>
          </div>

          {/* Existing Subjects & Chapters Overview */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-200">
              বর্তমান বিষয় ও অধ্যায় তালিকা ({toBengaliNumber(subjects.length)}টি বিষয়)
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {subjects.map((sub) => (
                <div
                  key={sub.id}
                  className="p-4 rounded-2xl bg-[#0e1424] border border-slate-800 space-y-2.5 shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="text-sm font-bold text-white flex items-center gap-2">
                        <span>{sub.name}</span>
                        {sub.isCustom && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-500/40">
                            কাস্টম
                          </span>
                        )}
                      </h5>
                      <p className="text-[11px] text-slate-400">{sub.subtitle}</p>
                    </div>
                    <span className="text-xs font-semibold text-cyan-300">
                      {toBengaliNumber(sub.chapters.length)}টি অধ্যায়
                    </span>
                  </div>

                  <div className="pt-2 border-t border-slate-800/80 space-y-1">
                    {sub.chapters.map((ch, idx) => (
                      <div
                        key={ch.id}
                        className="text-xs text-slate-300 flex items-center justify-between py-0.5"
                      >
                        <span className="truncate max-w-[280px]">
                          {toBengaliNumber(idx + 1)}. {ch.name}
                        </span>
                        {ch.isCustom && (
                          <span className="text-[9px] text-purple-400 font-mono">new</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 🔐 Admin Password Change Modal */}
      <AdminPasswordChangeModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
      />
    </div>
  );
};
