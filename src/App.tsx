import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Subject, Chapter, TestConfig, Question, TestResultSummary } from './types';
import {
  getAllQuestions,
  getAllSubjects,
  saveCustomQuestion,
  deleteQuestionById,
  saveCustomSubject,
  addChapterToSubject,
} from './utils/storageService';
import { SrijanIntro } from './components/SrijanIntro';
import { Header } from './components/Header';
import { SubjectSelector } from './components/SubjectSelector';
import { TestConfigModal } from './components/TestConfigModal';
import { ActiveMockTest } from './components/ActiveMockTest';
import { ResultAnalysis } from './components/ResultAnalysis';
import { DoubtClearModal } from './components/DoubtClearModal';
import { ThreeDModelModal } from './components/ThreeDModelModal';
import { StudentPerformance } from './components/StudentPerformance';
import { AdminPanel } from './components/AdminPanel';
import { AdminAuthModal } from './components/AdminAuthModal';

type AppStep =
  | 'select_subject_chapter'
  | 'configure_test'
  | 'active_test'
  | 'test_result'
  | 'performance_dashboard'
  | 'admin_panel';

export default function App() {
  const [showIntro, setShowIntro] = useState<boolean>(true);
  const [currentStep, setCurrentStep] = useState<AppStep>('select_subject_chapter');

  // Dynamic Questions & Subjects from Storage Layer
  const [questions, setQuestions] = useState<Question[]>(() => getAllQuestions());
  const [subjects, setSubjects] = useState<Subject[]>(() => getAllSubjects());

  // Admin Portal states
  const [isAdminAuthModalOpen, setIsAdminAuthModalOpen] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  // Modal states for Doubt Clear & 3D Model
  const [isDoubtModalOpen, setIsDoubtModalOpen] = useState(false);
  const [doubtInitialQuery, setDoubtInitialQuery] = useState('');
  const [doubtInitialSubject, setDoubtInitialSubject] = useState('সব বিষয়');
  const [isThreeDModalOpen, setIsThreeDModalOpen] = useState(false);

  // Selection state
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const [activeTestConfig, setActiveTestConfig] = useState<TestConfig | null>(null);
  const [activeQuestions, setActiveQuestions] = useState<Question[]>([]);
  const [testResult, setTestResult] = useState<TestResultSummary | null>(null);

  // Check URL parameter on load (e.g. ?admin=1)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('admin') === '1') {
      setIsAdminAuthModalOpen(true);
    }
  }, []);

  // Reload questions and subjects whenever updated
  const refreshData = () => {
    setQuestions(getAllQuestions());
    setSubjects(getAllSubjects());
  };

  // Open Doubt Clear with optional query & subject
  const handleOpenDoubtClear = (query = '', subject = 'সব বিষয়') => {
    setDoubtInitialQuery(query);
    setDoubtInitialSubject(subject);
    setIsDoubtModalOpen(true);
  };

  // Triggered when student selects a Subject and Chapter (or All chapters)
  const handleSelectSubjectAndChapter = (subject: Subject, chapter: Chapter | null) => {
    setSelectedSubject(subject);
    setSelectedChapter(chapter);

    // Filter questions dynamically from active question bank
    let candidateQuestions = questions.filter((q) => q.subjectId === subject.id);
    if (chapter) {
      const chapterSpecific = candidateQuestions.filter((q) => q.chapterId === chapter.id);
      if (chapterSpecific.length > 0) {
        candidateQuestions = chapterSpecific;
      }
    }

    // Shuffle questions slightly for authentic practice
    const preparedQuestions = [...candidateQuestions].sort(() => Math.random() - 0.5);
    setActiveQuestions(preparedQuestions);
    setCurrentStep('configure_test');
  };

  // Triggered when student confirms Timer and starts the Mock Test
  const handleStartTest = (config: TestConfig) => {
    setActiveTestConfig(config);
    setCurrentStep('active_test');
  };

  // Triggered when Mock Test is submitted (or timer expires)
  const handleFinishTest = (result: TestResultSummary) => {
    setTestResult(result);
    setCurrentStep('test_result');
  };

  // Retake current test with same subject/chapter & config
  const handleRetake = () => {
    if (selectedSubject) {
      let candidateQuestions = questions.filter((q) => q.subjectId === selectedSubject.id);
      if (selectedChapter) {
        const chapterSpecific = candidateQuestions.filter((q) => q.chapterId === selectedChapter.id);
        if (chapterSpecific.length > 0) {
          candidateQuestions = chapterSpecific;
        }
      }
      setActiveQuestions([...candidateQuestions].sort(() => Math.random() - 0.5));
      setCurrentStep('active_test');
    } else {
      setCurrentStep('select_subject_chapter');
    }
  };

  // Choose a new subject or chapter
  const handleChooseNewSubject = () => {
    setSelectedSubject(null);
    setSelectedChapter(null);
    setActiveTestConfig(null);
    setTestResult(null);
    setCurrentStep('select_subject_chapter');
  };

  // Admin Actions
  const handleAdminAuthSuccess = () => {
    setIsAdminAuthModalOpen(false);
    setIsAdminAuthenticated(true);
    setCurrentStep('admin_panel');
  };

  const handleExitAdmin = () => {
    setCurrentStep('select_subject_chapter');
  };

  const handleSaveQuestion = (newQuestion: Question) => {
    saveCustomQuestion(newQuestion);
    refreshData();
  };

  const handleDeleteQuestion = (questionId: string) => {
    deleteQuestionById(questionId);
    refreshData();
  };

  const handleSaveSubject = (newSubject: Subject) => {
    saveCustomSubject(newSubject);
    refreshData();
  };

  const handleAddChapter = (subjectId: string, chapter: Chapter) => {
    addChapterToSubject(subjectId, chapter);
    refreshData();
  };

  return (
    <div className="min-h-screen bg-[#070a12] text-slate-100 flex flex-col font-['Hind_Siliguri',sans-serif] selection:bg-purple-600 selection:text-white relative overflow-x-hidden">
      {/* Dynamic Background Ambient Gradients (Black/Blue/Purple Colorful Aesthetic) */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="fixed bottom-0 right-1/4 w-[550px] h-[550px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none -z-10" />
      <div className="fixed top-1/3 right-10 w-[350px] h-[350px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Srijan Opening Animation Screen */}
      <AnimatePresence>
        {showIntro && <SrijanIntro onComplete={() => setShowIntro(false)} />}
      </AnimatePresence>

      {/* Main Application Container */}
      {!showIntro && (
        <div className="flex-1 flex flex-col">
          {/* Header Bar with TrioMadhyamik branding, Doubt Clear, 3D Model & Performance buttons */}
          <Header
            onResetToIntro={() => setShowIntro(true)}
            onOpenDoubtClear={() => handleOpenDoubtClear()}
            onOpenThreeDModel={() => setIsThreeDModalOpen(true)}
            onOpenPerformance={() => setCurrentStep('performance_dashboard')}
            onOpenSubjects={() => setCurrentStep('select_subject_chapter')}
            activeStudentTab={currentStep === 'performance_dashboard' ? 'performance' : 'subjects'}
            isAdminMode={currentStep === 'admin_panel'}
            onExitAdmin={handleExitAdmin}
            currentTitle={
              currentStep === 'admin_panel'
                ? 'অ্যাডমিন প্রশ্ন ব্যাংক ও সিলেবাস নিয়ন্ত্রণ'
                : currentStep === 'performance_dashboard'
                ? 'ছাত্র-ছাত্রীর ধারাবাহিক পারফর্ম্যান্স বিশ্লেষণ'
                : currentStep === 'active_test'
                ? `মক টেস্ট চলছে • ${selectedSubject?.name || ''}`
                : currentStep === 'test_result'
                ? 'মক টেস্ট ফলাফল ও বিশদ ব্যাখ্যা'
                : currentStep === 'configure_test'
                ? 'টাইমার ও নির্দেশাবলী'
                : 'বিষয় ও অধ্যায় ভিত্তিক মক টেস্ট'
            }
            badgeText="মাধ্যমিক ২০২৭"
          />

          {/* Main Content Area with Animated Step Transitions */}
          <main className="flex-1 flex flex-col justify-start">
            <AnimatePresence mode="wait">
              {/* STUDENT VIEW 1: SUBJECT & CHAPTER SELECTION */}
              {currentStep === 'select_subject_chapter' && (
                <motion.div
                  key="step-select"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                  className="w-full flex-1"
                >
                  <SubjectSelector
                    subjects={subjects}
                    questions={questions}
                    onSelect={handleSelectSubjectAndChapter}
                    onOpenDoubtClear={() => handleOpenDoubtClear()}
                    onOpenThreeDModel={() => setIsThreeDModalOpen(true)}
                    onOpenPerformance={() => setCurrentStep('performance_dashboard')}
                  />
                </motion.div>
              )}

              {/* STUDENT VIEW 2: CONFIGURE TIMER & START */}
              {currentStep === 'configure_test' && selectedSubject && (
                <motion.div
                  key="step-config"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25 }}
                  className="w-full flex-1"
                >
                  <TestConfigModal
                    subject={selectedSubject}
                    chapter={selectedChapter}
                    availableQuestionsCount={activeQuestions.length}
                    onBack={() => setCurrentStep('select_subject_chapter')}
                    onStart={handleStartTest}
                  />
                </motion.div>
              )}

              {/* STUDENT VIEW 3: ACTIVE MOCK TEST (MCQ, TIMER, LOCK OPTION) */}
              {currentStep === 'active_test' && activeTestConfig && (
                <motion.div
                  key="step-test"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="w-full flex-1"
                >
                  <ActiveMockTest
                    config={activeTestConfig}
                    questions={activeQuestions}
                    onFinishTest={handleFinishTest}
                    onQuitToMenu={handleChooseNewSubject}
                  />
                </motion.div>
              )}

              {/* STUDENT VIEW 4: TEST RESULT & DETAILED EXPLANATIONS */}
              {currentStep === 'test_result' && testResult && (
                <motion.div
                  key="step-result"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="w-full flex-1"
                >
                  <ResultAnalysis
                    result={testResult}
                    onRetake={handleRetake}
                    onChooseNewSubject={handleChooseNewSubject}
                    onOpenPerformance={() => setCurrentStep('performance_dashboard')}
                    onOpenDoubtClear={(query) => handleOpenDoubtClear(query)}
                  />
                </motion.div>
              )}

              {/* STUDENT VIEW 5: PERFORMANCE DASHBOARD & GRAPHS */}
              {currentStep === 'performance_dashboard' && (
                <motion.div
                  key="step-performance"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                  className="w-full flex-1"
                >
                  <StudentPerformance
                    subjects={subjects}
                    onStartNewMock={() => setCurrentStep('select_subject_chapter')}
                  />
                </motion.div>
              )}

              {/* ADMIN VIEW: QUESTION MANAGEMENT & CRUD */}
              {currentStep === 'admin_panel' && (
                <motion.div
                  key="step-admin"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25 }}
                  className="w-full flex-1"
                >
                  <AdminPanel
                    questions={questions}
                    subjects={subjects}
                    onSaveQuestion={handleSaveQuestion}
                    onDeleteQuestion={handleDeleteQuestion}
                    onSaveSubject={handleSaveSubject}
                    onAddChapter={handleAddChapter}
                    onExitAdmin={handleExitAdmin}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </main>

          {/* Clean App Footer with TrioMadhyamik Branding & Admin Entry */}
          {currentStep !== 'active_test' && (
            <footer className="w-full py-4 border-t border-slate-900 bg-[#060810]/90 text-xs text-slate-500">
              <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <span className="font-bold text-slate-300">TrioMadhyamik</span>
                  <span>•</span>
                  <span>মাধ্যমিক ২০২৭ মক টেস্ট, ডাউট ক্লিয়ার ও 3D এডুকেশন ল্যাব</span>
                </div>

                <div className="flex items-center gap-4 text-[11px]">
                  <span className="text-slate-500 font-mono hidden sm:inline">
                    WBBSE SYLLABUS
                  </span>

                  {/* Discreet Admin Portal Access Link */}
                  {currentStep !== 'admin_panel' ? (
                    <button
                      id="footer-admin-link"
                      onClick={() => setIsAdminAuthModalOpen(true)}
                      className="text-slate-500 hover:text-purple-400 font-medium transition-colors cursor-pointer flex items-center gap-1"
                      title="শিক্ষক / অ্যাডমিন প্রশ্ন ব্যবস্থাপনা পোর্টাল"
                    >
                      <span>🔒 অ্যাডমিন পোর্টাল</span>
                    </button>
                  ) : (
                    <button
                      onClick={handleExitAdmin}
                      className="text-purple-400 hover:text-purple-300 font-bold transition-colors cursor-pointer"
                    >
                      ← স্টুডেন্ট মোড
                    </button>
                  )}
                </div>
              </div>
            </footer>
          )}
        </div>
      )}

      {/* ❓ Doubt Clear Modal with Visual Engine */}
      <DoubtClearModal
        isOpen={isDoubtModalOpen}
        onClose={() => setIsDoubtModalOpen(false)}
        initialQuery={doubtInitialQuery}
        initialSubject={doubtInitialSubject}
        onOpen3DModel={(modelId) => {
          setIsDoubtModalOpen(false);
          setIsThreeDModalOpen(true);
        }}
      />

      {/* 🔬 3D Model Section Modal */}
      <ThreeDModelModal
        isOpen={isThreeDModalOpen}
        onClose={() => setIsThreeDModalOpen(false)}
        onOpenDoubtWithTopic={(topicName, subjectName) => {
          setIsThreeDModalOpen(false);
          handleOpenDoubtClear(topicName, subjectName);
        }}
      />

      {/* 🔒 Admin Verification Modal */}
      <AdminAuthModal
        isOpen={isAdminAuthModalOpen}
        onClose={() => setIsAdminAuthModalOpen(false)}
        onSuccess={handleAdminAuthSuccess}
      />
    </div>
  );
}
