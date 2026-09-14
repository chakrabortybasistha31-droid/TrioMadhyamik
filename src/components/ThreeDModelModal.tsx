import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Search,
  Sparkles,
  Info,
  BookOpen,
  HelpCircle,
  CheckCircle2,
  Filter,
  Layers,
  Flame,
  Globe2,
  Atom,
  Dna,
  Share2
} from 'lucide-react';
import { ThreeDCanvas } from './ThreeDCanvas';
import {
  PRESET_MODELS,
  ModelItem,
  getOrSynthesize3DModel
} from '../data/threeDModelsData';

interface ThreeDModelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenDoubtWithTopic?: (topicName: string, subjectName: string) => void;
}

const POPULAR_TOPICS = [
  { id: 'dna', label: 'DNA', icon: '🧬', category: 'জীবনবিজ্ঞান' },
  { id: 'neuron', label: 'Neuron (স্নায়ুকোশ)', icon: '⚡', category: 'জীবনবিজ্ঞান' },
  { id: 'heart', label: 'Heart (হৃৎপিণ্ড)', icon: '🫀', category: 'জীবনবিজ্ঞান' },
  { id: 'brain', label: 'Brain (মস্তিষ্ক)', icon: '🧠', category: 'জীবনবিজ্ঞান' },
  { id: 'eye', label: 'Human Eye (মানব চক্ষু)', icon: '👁️', category: 'জীবনবিজ্ঞান' },
  { id: 'cell', label: 'Cell (কোশের গঠন)', icon: '🔬', category: 'জীবনবিজ্ঞান' },
  { id: 'atom', label: 'Atom (পরমাণুর গঠন)', icon: '⚛️', category: 'ভৌতবিজ্ঞান' },
  { id: 'molecule', label: 'Molecule (অণু ও বন্ধন)', icon: '🧪', category: 'ভৌতবিজ্ঞান' },
  { id: 'volcano', label: 'Volcano (আগ্নেয়গিরি)', icon: '🌋', category: 'ভূগোল' },
  { id: 'earth', label: 'Earth Structure (ভূ-অভ্যন্তর)', icon: '🌍', category: 'ভূগোল' },
  { id: 'nephron', label: 'Nephron (নেফ্রন)', icon: '🩺', category: 'জীবনবিজ্ঞান' },
  { id: 'chloroplast', label: 'Chloroplast (ক্লোরোপ্লাস্ট)', icon: '🍃', category: 'জীবনবিজ্ঞান' },
  { id: 'yardang', label: 'Yardang (ইয়ারদাং)', icon: '🏜️', category: 'ভূগোল' },
  { id: 'lens', label: 'Convex Lens (উত্তল লেন্স)', icon: '🔍', category: 'ভৌতবিজ্ঞান' },
  { id: 'solar', label: 'Solar System (সৌরজগৎ)', icon: '☀️', category: 'ভৌতবিজ্ঞান' },
  { id: 'mitochondria', label: 'Mitochondria (শক্তিঘর)', icon: '⚡', category: 'জীবনবিজ্ঞান' },
  { id: 'chromosome', label: 'Chromosome (ক্রোমোজোম)', icon: '🧬', category: 'জীবনবিজ্ঞান' }
];

export const ThreeDModelModal: React.FC<ThreeDModelModalProps> = ({
  isOpen,
  onClose,
  onOpenDoubtWithTopic
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState('সব বিষয়');
  const [currentModel, setCurrentModel] = useState<ModelItem>(PRESET_MODELS[0]);
  const [selectedPartIndex, setSelectedPartIndex] = useState<number | null>(null);

  // Filtered preset list based on subject and query
  const filteredPresets = useMemo(() => {
    return PRESET_MODELS.filter((m) => {
      const matchSubject =
        selectedSubjectFilter === 'সব বিষয়' ||
        m.subjectBn.includes(selectedSubjectFilter) ||
        (selectedSubjectFilter === 'জীবনবিজ্ঞান' && m.subjectBn === 'জীবনবিজ্ঞান') ||
        (selectedSubjectFilter === 'ভৌতবিজ্ঞান' && m.subjectBn.includes('ভৌতবিজ্ঞান')) ||
        (selectedSubjectFilter === 'ভূগোল' && m.subjectBn.includes('ভূগোল'));

      if (!matchSubject) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        m.nameBn.toLowerCase().includes(q) ||
        m.scientificTermEn.toLowerCase().includes(q) ||
        m.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [searchQuery, selectedSubjectFilter]);

  // Handle Search input change and dynamic model generation
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    setSelectedPartIndex(null);

    if (val.trim().length >= 2) {
      // Intelligently find or synthesize dynamic 3D model
      const model = getOrSynthesize3DModel(val, selectedSubjectFilter !== 'সব বিষয়' ? selectedSubjectFilter : undefined);
      setCurrentModel(model);
    }
  };

  const handleSelectPreset = (model: ModelItem) => {
    setCurrentModel(model);
    setSelectedPartIndex(null);
  };

  const handleQuickTopicClick = (topicId: string) => {
    const found = PRESET_MODELS.find((m) => m.id === topicId);
    if (found) {
      setCurrentModel(found);
      setSearchQuery('');
      setSelectedPartIndex(null);
    } else {
      const syn = getOrSynthesize3DModel(topicId);
      setCurrentModel(syn);
      setSelectedPartIndex(null);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
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
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 p-[1.5px] flex items-center justify-center shadow-lg shadow-cyan-500/20">
                <div className="w-full h-full bg-[#080d1a] rounded-[10px] flex items-center justify-center text-cyan-400 font-bold text-lg">
                  🔬
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                    🔬 3D Models ল্যাব (3D Educational Models)
                  </h2>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    মাধ্যমিক ২০২৭
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-slate-400">
                  পছন্দের subject বা topic অনুযায়ী 3D educational model খুঁজুন, ৩৬০° এক্সপ্লোর করুন ও গুরুত্বপূর্ণ অংশ জানুন
                </p>
              </div>
            </div>

            <button
              id="close-3d-modal-btn"
              onClick={onClose}
              aria-label="Close modal"
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search Bar & Subject Filter Controls */}
          <div className="space-y-2.5 bg-[#0e1424] p-3 rounded-2xl border border-slate-800">
            <div className="flex flex-col sm:flex-row gap-2">
              {/* Search Input with instant dynamic synthesizer */}
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="টপিক খুঁজুন (যেমন: DNA, Neuron, Heart, Brain, Eye, Atom, Volcano...)"
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[#080d1a] border border-slate-700/80 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50"
                />
                {searchQuery && (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setCurrentModel(PRESET_MODELS[0]);
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs cursor-pointer"
                  >
                    মুছুন
                  </button>
                )}
              </div>

              {/* Subject Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                {['সব বিষয়', 'জীবনবিজ্ঞান', 'ভৌতবিজ্ঞান', 'ভূগোল'].map((sub) => (
                  <button
                    key={sub}
                    onClick={() => setSelectedSubjectFilter(sub)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap cursor-pointer transition-all border ${
                      selectedSubjectFilter === sub
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
                        : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 border-slate-700/60'
                    }`}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Topic Suggestions Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto pt-1 pb-1 scrollbar-thin text-xs">
              <span className="text-[11px] text-slate-400 shrink-0 font-medium flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-cyan-400" />
                <span>জনপ্রিয় টপিক:</span>
              </span>
              {POPULAR_TOPICS.map((topic) => {
                const isActive = currentModel.id === topic.id;
                return (
                  <button
                    key={topic.id}
                    onClick={() => handleQuickTopicClick(topic.id)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-medium whitespace-nowrap shrink-0 flex items-center gap-1 transition-all cursor-pointer border ${
                      isActive
                        ? 'bg-indigo-600/30 text-cyan-300 border-cyan-400 shadow-sm'
                        : 'bg-slate-800/50 text-slate-300 hover:bg-slate-800 border-slate-700/60 hover:border-slate-600'
                    }`}
                  >
                    <span>{topic.icon}</span>
                    <span>{topic.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Model Display Workspace */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            {/* Left: 3D Interactive Canvas */}
            <div className="lg:col-span-6 space-y-3">
              <ThreeDCanvas
                modelType={currentModel.modelType}
                accentColor={currentModel.accentColor}
                proceduralTheme={currentModel.proceduralTheme}
                selectedPartIndex={selectedPartIndex}
                keyParts={currentModel.keyPartsBn}
              />

              <div className="flex items-center justify-between text-xs text-slate-400 px-1 bg-[#0b1020] p-2.5 rounded-xl border border-slate-800/80">
                <span className="flex items-center gap-1.5 text-[11px] text-cyan-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>৩৬০° ফুল রোটেট ও টাচ ড্র্যাগ সক্রিয়</span>
                </span>
                <span className="text-[11px] font-mono text-purple-400 bg-purple-950/40 px-2 py-0.5 rounded border border-purple-800/30">
                  {currentModel.subjectBn} • {currentModel.chapterBn}
                </span>
              </div>
            </div>

            {/* Right: Topic Details, English Term, Bengali Explanation, Clickable Parts */}
            <div className="lg:col-span-6 space-y-4">
              {/* Title & Scientific Term */}
              <div className="space-y-1.5 bg-[#0e1424] p-3.5 rounded-2xl border border-slate-800">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    {currentModel.chapterBn}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    মাধ্যমিক দশম শ্রেণি
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-white">
                  {currentModel.nameBn}
                </h3>

                {/* English scientific term */}
                <div className="text-xs font-mono font-semibold text-cyan-300 bg-cyan-950/50 px-3 py-1 rounded-lg border border-cyan-800/50 inline-block break-all">
                  Scientific Term: {currentModel.scientificTermEn}
                </div>
              </div>

              {/* Class 10 Bengali Step-by-Step Explanation */}
              <div className="p-4 rounded-2xl bg-[#0e1424] border border-slate-800 space-y-2">
                <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-purple-400" />
                  <span>পাঠ্যবইভিত্তিক সহজ বাংলা ব্যাখ্যা (Bengali Explanation):</span>
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {currentModel.explanationBn}
                </p>
              </div>

              {/* Key Structural Parts (Clickable to Highlight in 3D!) */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Info className="w-4 h-4 text-cyan-400" />
                    <span>গুরুত্বপূর্ণ অংশ ও লেবেলিং (ক্লিক করে হাইলাইট করুন):</span>
                  </h4>
                  {selectedPartIndex !== null && (
                    <button
                      onClick={() => setSelectedPartIndex(null)}
                      className="text-[11px] text-cyan-400 hover:underline cursor-pointer"
                    >
                      রিসেট হাইলাইট
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {currentModel.keyPartsBn.map((part, idx) => {
                    const isPartActive = selectedPartIndex === idx;
                    return (
                      <button
                        key={idx}
                        onClick={() => setSelectedPartIndex(isPartActive ? null : idx)}
                        className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                          isPartActive
                            ? 'bg-cyan-500/20 border-cyan-400 ring-1 ring-cyan-400 shadow-md'
                            : 'bg-[#090d18] border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-cyan-300">{part.name}</span>
                          {part.nameEn && (
                            <span className="text-[9px] text-slate-400 font-mono">({part.nameEn})</span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-400 leading-tight mt-0.5">{part.desc}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quick Action: Open in Doubt Clear */}
              {onOpenDoubtWithTopic && (
                <div className="pt-2">
                  <button
                    onClick={() => onOpenDoubtWithTopic(currentModel.nameBn, currentModel.subjectBn)}
                    className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-lg shadow-indigo-900/30 transition-all cursor-pointer"
                  >
                    <HelpCircle className="w-4 h-4 text-cyan-300" />
                    <span>❓ এই টপিক নিয়ে ডাউট ক্লিয়ার (Doubt Clear)-এ প্রশ্ন করুন</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Modal Footer */}
          <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
            <span>TrioMadhyamik • স্মার্ট 3D মডেল ও ভিজ্যুয়াল সায়েন্স ল্যাব</span>
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
