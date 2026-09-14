import React, { useState } from 'react';
import {
  Activity,
  ArrowRight,
  Layers,
  Box,
  Eye,
  Maximize2,
  Sparkles,
  Info,
  CheckCircle2
} from 'lucide-react';
import { ThreeDCanvas } from './ThreeDCanvas';
import { ModelType, PRESET_MODELS } from '../data/threeDModelsData';

export type VisualType =
  | '3d_model'
  | 'boyles_law'
  | 'charles_law'
  | 'ohms_law'
  | 'quadratic_parabola'
  | 'trigonometry_circle'
  | 'pythagoras_triangle'
  | 'coordinate_graph'
  | 'circle_theorem'
  | 'neuron_diagram'
  | 'cell_diagram'
  | 'heart_diagram'
  | 'brain_diagram'
  | 'eye_diagram'
  | 'reflex_arc'
  | 'mendel_cross'
  | 'rain_shadow'
  | 'volcano_structure'
  | 'oxbow_lake_delta'
  | 'fold_mountain'
  | 'concave_mirror'
  | 'electrolysis_cell'
  | 'ray_refraction'
  | 'swadeshi_timeline'
  | 'karok_tree'
  | 'tense_timeline'
  | 'concept_flowchart';

export interface LabeledPartItem {
  id: string;
  nameBn: string;
  nameEn?: string;
  descriptionBn: string;
}

export interface VisualDataProps {
  visualType: VisualType;
  titleBn: string;
  scientificTermEn?: string;
  captionBn?: string;
  related3DModelId?: string;
  labeledParts?: LabeledPartItem[];
  customSteps?: { labelBn: string; labelEn?: string; descBn: string; color?: string }[];
  onOpenFull3DModel?: (modelId: string) => void;
}

export const VisualDoubtRenderer: React.FC<VisualDataProps> = ({
  visualType,
  titleBn,
  scientificTermEn,
  captionBn,
  related3DModelId,
  labeledParts = [],
  customSteps = [],
  onOpenFull3DModel
}) => {
  const [selectedPartId, setSelectedPartId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'visual' | '3d'>(
    visualType === '3d_model' ? '3d' : 'visual'
  );

  // Derive matching 3D model if available
  const active3DModel = PRESET_MODELS.find(
    (m) =>
      m.id === related3DModelId ||
      m.modelType === (related3DModelId as ModelType) ||
      (visualType === '3d_model' && m.id === 'dna')
  ) || PRESET_MODELS[0];

  const has3DCapability = Boolean(related3DModelId || visualType === '3d_model');

  return (
    <div className="w-full bg-[#0b1020] rounded-2xl border border-indigo-900/50 p-3 sm:p-4 shadow-xl space-y-3 text-slate-100">
      {/* Header bar with View Mode Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
              <span>{titleBn}</span>
            </h4>
            {scientificTermEn && (
              <p className="text-[10px] sm:text-[11px] text-indigo-300 font-mono">
                {scientificTermEn}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {has3DCapability && (
            <div className="flex items-center p-0.5 rounded-xl bg-slate-900 border border-slate-700">
              <button
                type="button"
                onClick={() => setViewMode('visual')}
                className={`px-2 py-1 rounded-lg text-[10px] font-semibold transition-all cursor-pointer ${
                  viewMode === 'visual'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                2D চিত্র
              </button>
              <button
                type="button"
                onClick={() => setViewMode('3d')}
                className={`px-2 py-1 rounded-lg text-[10px] font-semibold transition-all flex items-center gap-1 cursor-pointer ${
                  viewMode === '3d'
                    ? 'bg-cyan-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-cyan-300'
                }`}
              >
                <Box className="w-3 h-3" />
                <span>3D মডেল</span>
              </button>
            </div>
          )}

          {related3DModelId && onOpenFull3DModel && (
            <button
              type="button"
              onClick={() => onOpenFull3DModel(related3DModelId)}
              className="p-1.5 rounded-lg bg-cyan-950/60 hover:bg-cyan-900/80 text-cyan-300 border border-cyan-700/50 text-[10px] flex items-center gap-1 cursor-pointer transition-colors"
              title="সম্পূর্ণ 3D ল্যাবে খুলুন"
            >
              <Maximize2 className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* Main Canvas Area */}
      <div className="w-full flex items-center justify-center bg-[#070b16] rounded-xl border border-slate-800/80 p-2 sm:p-3 overflow-x-auto min-h-[220px]">
        {/* Render Interactive 3D Model when in 3D mode */}
        {viewMode === '3d' && (
          <div className="w-full flex flex-col items-center">
            <div className="w-full h-56 sm:h-64 relative">
              <ThreeDCanvas
                modelType={active3DModel.modelType}
                accentColor={active3DModel.accentColor}
                proceduralTheme={active3DModel.modelType}
                keyParts={active3DModel.keyPartsBn}
              />
            </div>
            <div className="mt-2 text-[10px] text-cyan-300/80 font-mono flex items-center gap-2">
              <span>৩৬০° ঘোরাতে টাচ বা ড্র্যাগ করুন • জুম করতে স্ক্রল করুন</span>
            </div>
          </div>
        )}

        {/* 2D Pedagogical Diagrams & Graphs */}
        {viewMode === 'visual' && (
          <div className="w-full flex flex-col items-center">
            {/* 1. Boyle's Law P-V Isotherm */}
            {visualType === 'boyles_law' && (
              <svg viewBox="0 0 420 220" className="w-full max-w-[420px] select-none">
                <defs>
                  <linearGradient id="boyleGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#38bdf8" />
                    <stop offset="100%" stopColor="#818cf8" />
                  </linearGradient>
                </defs>
                <line x1="50" y1="20" x2="50" y2="180" stroke="#334155" strokeWidth="2" />
                <line x1="50" y1="180" x2="380" y2="180" stroke="#334155" strokeWidth="2" />
                <text x="25" y="30" fill="#94a3b8" fontSize="10" fontWeight="bold">চাপ (P) ↑</text>
                <text x="330" y="200" fill="#94a3b8" fontSize="10" fontWeight="bold">আয়তন (V) →</text>
                <path d="M 75 40 Q 110 135 340 165" fill="none" stroke="url(#boyleGrad)" strokeWidth="3.5" strokeLinecap="round" />
                <path d="M 105 35 Q 150 125 365 150" fill="none" stroke="#c084fc" strokeWidth="2" strokeDasharray="4 3" />
                <text x="300" y="140" fill="#c084fc" fontSize="9" fontWeight="bold">T₂ (উচ্চতর উষ্ণতা)</text>
                <circle cx="90" cy="75" r="4" fill="#38bdf8" />
                <text x="100" y="70" fill="#f8fafc" fontSize="9">A (P₁, V₁)</text>
                <circle cx="200" cy="148" r="4" fill="#818cf8" />
                <text x="210" y="145" fill="#f8fafc" fontSize="9">B (P₂, V₂)</text>
                <rect x="230" y="25" width="135" height="45" rx="6" fill="#0f172a" stroke="#475569" strokeWidth="1" />
                <text x="240" y="42" fill="#38bdf8" fontSize="10" fontWeight="bold">PV = ধ্রুবক (k)</text>
                <text x="240" y="58" fill="#94a3b8" fontSize="8">সমপরাবৃত্ত (Rectangular Hyperbola)</text>
              </svg>
            )}

            {/* 2. Charles's Law V-t Linear */}
            {visualType === 'charles_law' && (
              <svg viewBox="0 0 420 220" className="w-full max-w-[420px] select-none">
                <line x1="160" y1="20" x2="160" y2="180" stroke="#334155" strokeWidth="2" />
                <line x1="30" y1="160" x2="390" y2="160" stroke="#334155" strokeWidth="2" />
                <text x="140" y="30" fill="#94a3b8" fontSize="10" fontWeight="bold">আয়তন (V) ↑</text>
                <text x="330" y="180" fill="#94a3b8" fontSize="10" fontWeight="bold">উষ্ণতা (°C) →</text>
                <circle cx="60" cy="160" r="4.5" fill="#f43f5e" />
                <text x="40" y="180" fill="#f43f5e" fontSize="9" fontWeight="bold">-২৭৩°C (পরম শূন্য)</text>
                <line x1="60" y1="160" x2="160" y2="105" stroke="#f43f5e" strokeWidth="2" strokeDasharray="3 3" />
                <line x1="160" y1="105" x2="360" y2="30" stroke="#38bdf8" strokeWidth="3" />
                <circle cx="160" cy="105" r="4" fill="#38bdf8" />
                <text x="170" y="112" fill="#38bdf8" fontSize="9">V₀ (০°C-এ আয়তন)</text>
                <rect x="240" y="45" width="130" height="42" rx="6" fill="#0f172a" stroke="#475569" strokeWidth="1" />
                <text x="250" y="62" fill="#38bdf8" fontSize="10" fontWeight="bold">V_t = V₀(১ + t/২৭৩)</text>
                <text x="250" y="78" fill="#94a3b8" fontSize="8">পরম স্কেলে V ∝ T</text>
              </svg>
            )}

            {/* 3. Ohm's Law V-I Slope */}
            {visualType === 'ohms_law' && (
              <svg viewBox="0 0 420 220" className="w-full max-w-[420px] select-none">
                <line x1="50" y1="20" x2="50" y2="180" stroke="#334155" strokeWidth="2" />
                <line x1="50" y1="180" x2="380" y2="180" stroke="#334155" strokeWidth="2" />
                <text x="25" y="30" fill="#94a3b8" fontSize="10" fontWeight="bold">বিভবপ্রভেদ (V) ↑</text>
                <text x="310" y="200" fill="#94a3b8" fontSize="10" fontWeight="bold">তড়িৎপ্রবাহ (I) →</text>
                <line x1="50" y1="180" x2="340" y2="40" stroke="#a855f7" strokeWidth="3" />
                <line x1="220" y1="98" x2="280" y2="98" stroke="#64748b" strokeDasharray="3 2" />
                <line x1="280" y1="98" x2="280" y2="69" stroke="#64748b" strokeDasharray="3 2" />
                <text x="288" y="86" fill="#facc15" fontSize="9">ΔV</text>
                <text x="245" y="112" fill="#38bdf8" fontSize="9">ΔI</text>
                <rect x="70" y="35" width="130" height="45" rx="6" fill="#0f172a" stroke="#a855f7" strokeWidth="1" />
                <text x="80" y="52" fill="#c084fc" fontSize="10" fontWeight="bold">V = I × R</text>
                <text x="80" y="68" fill="#94a3b8" fontSize="8">নতি (Slope) = রোধ (R)</text>
              </svg>
            )}

            {/* 4. Mathematics: Quadratic Parabola & Discriminant */}
            {visualType === 'quadratic_parabola' && (
              <svg viewBox="0 0 420 220" className="w-full max-w-[420px] select-none">
                <line x1="200" y1="20" x2="200" y2="190" stroke="#334155" strokeWidth="2" />
                <line x1="30" y1="130" x2="380" y2="130" stroke="#334155" strokeWidth="2" />
                <text x="208" y="30" fill="#94a3b8" fontSize="10">Y</text>
                <text x="370" y="125" fill="#94a3b8" fontSize="10">X</text>
                <path d="M 80 40 Q 200 210 320 40" fill="none" stroke="#ec4899" strokeWidth="3" />
                <circle cx="125" cy="130" r="4" fill="#38bdf8" />
                <text x="110" y="120" fill="#38bdf8" fontSize="9">α (বীজ ১)</text>
                <circle cx="275" cy="130" r="4" fill="#38bdf8" />
                <text x="265" y="120" fill="#38bdf8" fontSize="9">β (বীজ ২)</text>
                <circle cx="200" cy="168" r="4" fill="#facc15" />
                <text x="208" y="172" fill="#facc15" fontSize="9">শীর্ষবিন্দু Vertex (-b/2a, -D/4a)</text>
                <rect x="25" y="25" width="135" height="48" rx="6" fill="#0f172a" stroke="#ec4899" strokeWidth="1" />
                <text x="35" y="42" fill="#f472b6" fontSize="10" fontWeight="bold">D = b² - 4ac &gt; 0</text>
                <text x="35" y="56" fill="#94a3b8" fontSize="8">বীজদ্বয় বাস্তব ও অসমান</text>
                <text x="35" y="67" fill="#cbd5e1" fontSize="7">x = (-b ± √D) / 2a</text>
              </svg>
            )}

            {/* 5. Mathematics: Trigonometry Unit Circle */}
            {visualType === 'trigonometry_circle' && (
              <svg viewBox="0 0 420 220" className="w-full max-w-[420px] select-none">
                <line x1="200" y1="20" x2="200" y2="200" stroke="#334155" strokeWidth="1.5" />
                <line x1="30" y1="110" x2="370" y2="110" stroke="#334155" strokeWidth="1.5" />
                <circle cx="200" cy="110" r="75" fill="none" stroke="#6366f1" strokeWidth="2" strokeDasharray="2 2" />
                <line x1="200" y1="110" x2="255" y2="60" stroke="#38bdf8" strokeWidth="2.5" />
                <line x1="255" y1="60" x2="255" y2="110" stroke="#f43f5e" strokeWidth="2" />
                <line x1="200" y1="110" x2="255" y2="110" stroke="#10b981" strokeWidth="2" />
                <text x="220" y="80" fill="#38bdf8" fontSize="9">অতিভুজ r=১</text>
                <text x="260" y="85" fill="#f43f5e" fontSize="9" fontWeight="bold">লম্ব = sin θ</text>
                <text x="215" y="125" fill="#10b981" fontSize="9" fontWeight="bold">ভূমি = cos θ</text>
                <rect x="25" y="25" width="135" height="45" rx="6" fill="#0f172a" stroke="#6366f1" strokeWidth="1" />
                <text x="35" y="42" fill="#818cf8" fontSize="10" fontWeight="bold">sin²θ + cos²θ = ১</text>
                <text x="35" y="58" fill="#94a3b8" fontSize="8">tan θ = sin θ / cos θ</text>
              </svg>
            )}

            {/* 6. Mathematics: Pythagoras Theorem Right Triangle */}
            {visualType === 'pythagoras_triangle' && (
              <svg viewBox="0 0 420 220" className="w-full max-w-[420px] select-none">
                <polygon points="120,160 260,160 120,60" fill="none" stroke="#818cf8" strokeWidth="3" />
                <rect x="120" y="145" width="15" height="15" fill="none" stroke="#facc15" strokeWidth="1.5" />
                <text x="180" y="175" fill="#38bdf8" fontSize="10" fontWeight="bold">ভূমি Base (b)</text>
                <text x="75" y="115" fill="#f43f5e" fontSize="10" fontWeight="bold">লম্ব Perp (a)</text>
                <text x="205" y="105" fill="#10b981" fontSize="10" fontWeight="bold">অতিভুজ Hypotenuse (c)</text>
                <rect x="280" y="40" width="125" height="50" rx="6" fill="#0f172a" stroke="#818cf8" strokeWidth="1" />
                <text x="290" y="58" fill="#c084fc" fontSize="11" fontWeight="bold">c² = a² + b²</text>
                <text x="290" y="73" fill="#94a3b8" fontSize="8">পিথাগোরাসের উপপাদ্য</text>
                <text x="290" y="84" fill="#e2e8f0" fontSize="7">ত্রিকোণমিতি অনুপাত ভিত্তি</text>
              </svg>
            )}

            {/* 7. Biology: Labelled Neuron Diagram */}
            {visualType === 'neuron_diagram' && (
              <svg viewBox="0 0 420 220" className="w-full max-w-[420px] select-none">
                {/* Soma (Cell Body) */}
                <circle cx="100" cy="110" r="30" fill="#1e293b" stroke="#38bdf8" strokeWidth="2.5" />
                <circle cx="100" cy="110" r="10" fill="#f43f5e" />
                <text x="92" y="113" fill="#ffffff" fontSize="8">নিউক্লিয়াস</text>
                {/* Dendrites */}
                <path d="M 75 95 L 45 75 M 70 110 L 40 110 M 75 125 L 45 145 M 95 80 L 85 50 M 105 80 L 115 50" stroke="#38bdf8" strokeWidth="2" />
                <text x="20" y="65" fill="#7dd3fc" fontSize="9" fontWeight="bold">ডেনড্রন (Dendron)</text>
                {/* Axon */}
                <line x1="130" y1="110" x2="340" y2="110" stroke="#facc15" strokeWidth="3.5" />
                {/* Myelin Sheaths */}
                <rect x="150" y="98" width="35" height="24" rx="6" fill="#334155" stroke="#10b981" strokeWidth="1.5" />
                <rect x="200" y="98" width="35" height="24" rx="6" fill="#334155" stroke="#10b981" strokeWidth="1.5" />
                <rect x="250" y="98" width="35" height="24" rx="6" fill="#334155" stroke="#10b981" strokeWidth="1.5" />
                <text x="185" y="85" fill="#10b981" fontSize="8">মায়েলিন সিদ (Myelin)</text>
                <text x="236" y="135" fill="#cbd5e1" fontSize="8">র‍্যানভিয়ার পর্ব</text>
                {/* Synaptic Knob */}
                <path d="M 340 110 L 375 90 M 340 110 L 385 110 M 340 110 L 375 130" stroke="#facc15" strokeWidth="2" />
                <circle cx="375" cy="90" r="3" fill="#facc15" />
                <circle cx="385" cy="110" r="3" fill="#facc15" />
                <circle cx="375" cy="130" r="3" fill="#facc15" />
                <text x="325" y="150" fill="#facc15" fontSize="8">প্রান্ত বুরুষ (Synaptic Knob)</text>
                <text x="75" y="160" fill="#94a3b8" fontSize="9" fontWeight="bold">কোষদেহ (Soma)</text>
              </svg>
            )}

            {/* 8. Biology: Labelled Plant/Animal Cell Diagram */}
            {visualType === 'cell_diagram' && (
              <svg viewBox="0 0 420 220" className="w-full max-w-[420px] select-none">
                <rect x="60" y="30" width="300" height="150" rx="40" fill="#0f172a" stroke="#10b981" strokeWidth="3" />
                <rect x="68" y="38" width="284" height="134" rx="34" fill="#064e3b" fillOpacity="0.3" stroke="#38bdf8" strokeWidth="1.5" />
                {/* Nucleus */}
                <circle cx="150" cy="105" r="28" fill="#1e1b4b" stroke="#c084fc" strokeWidth="2" />
                <circle cx="150" cy="105" r="10" fill="#a855f7" />
                <text x="135" y="145" fill="#c084fc" fontSize="9" fontWeight="bold">নিউক্লিয়াস (Nucleus)</text>
                {/* Mitochondria */}
                <ellipse cx="270" cy="80" rx="22" ry="12" fill="#7f1d1d" stroke="#f43f5e" strokeWidth="1.5" />
                <path d="M 255 80 Q 270 70 285 80" stroke="#f43f5e" fill="none" />
                <text x="245" y="105" fill="#f43f5e" fontSize="8">মাইটোকনড্রিয়া</text>
                {/* Vacuole */}
                <ellipse cx="270" cy="135" rx="30" ry="16" fill="#0369a1" fillOpacity="0.4" stroke="#38bdf8" strokeWidth="1" />
                <text x="255" y="140" fill="#38bdf8" fontSize="8">ভ্যাকুওল</text>
                <text x="70" y="25" fill="#10b981" fontSize="9" fontWeight="bold">কোষপ্রাচীর (Cell Wall)</text>
                <text x="240" y="25" fill="#38bdf8" fontSize="9">প্লাজমা পর্দা (Cell Membrane)</text>
              </svg>
            )}

            {/* 9. Biology: Human Heart 4 Chambers Diagram */}
            {visualType === 'heart_diagram' && (
              <svg viewBox="0 0 420 220" className="w-full max-w-[420px] select-none">
                <rect x="110" y="40" width="100" height="60" rx="10" fill="#1e3a8a" stroke="#60a5fa" strokeWidth="2" />
                <text x="120" y="75" fill="#93c5fd" fontSize="10" fontWeight="bold">ডান অলিন্দ (RA)</text>
                <rect x="220" y="40" width="100" height="60" rx="10" fill="#881337" stroke="#f43f5e" strokeWidth="2" />
                <text x="230" y="75" fill="#fda4af" fontSize="10" fontWeight="bold">বাম অলিন্দ (LA)</text>
                <rect x="110" y="110" width="100" height="70" rx="10" fill="#1e3a8a" stroke="#60a5fa" strokeWidth="2" />
                <text x="120" y="145" fill="#93c5fd" fontSize="10" fontWeight="bold">ডান নিলয় (RV)</text>
                <text x="120" y="160" fill="#60a5fa" fontSize="8">অবিশুদ্ধ রক্ত (Deoxygenated)</text>
                <rect x="220" y="110" width="100" height="70" rx="10" fill="#881337" stroke="#f43f5e" strokeWidth="2" />
                <text x="230" y="145" fill="#fda4af" fontSize="10" fontWeight="bold">বাম নিলয় (LV)</text>
                <text x="230" y="160" fill="#f43f5e" fontSize="8">বিশুদ্ধ রক্ত (Oxygenated)</text>
                <text x="100" y="25" fill="#38bdf8" fontSize="9">ফুসফুসীয় ধমনি / শিরা</text>
                <text x="250" y="25" fill="#f43f5e" fontSize="9" fontWeight="bold">মহাধমনি (Aorta)</text>
              </svg>
            )}

            {/* 10. Biology: Reflex Arc (প্রতিবর্ত চাপ) */}
            {visualType === 'reflex_arc' && (
              <svg viewBox="0 0 420 220" className="w-full max-w-[420px] select-none">
                <circle cx="50" cy="110" r="22" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                <text x="35" y="112" fill="#fbbf24" fontSize="8" fontWeight="bold">গ্রাহক</text>
                <path d="M 72 110 L 130 70" stroke="#f59e0b" strokeWidth="2.5" markerEnd="url(#arrow)" />
                <text x="80" y="80" fill="#fbbf24" fontSize="8">সংজ্ঞাবহ স্নায়ু</text>
                <rect x="140" y="50" width="120" height="80" rx="12" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2" />
                <text x="155" y="85" fill="#c084fc" fontSize="9" fontWeight="bold">সুষুম্নাকাণ্ড (স্নায়ুকেন্দ্র)</text>
                <path d="M 260 90 L 320 130" stroke="#38bdf8" strokeWidth="2.5" />
                <text x="280" y="125" fill="#38bdf8" fontSize="8">আজ্ঞাবহ স্নায়ু</text>
                <circle cx="350" cy="140" r="22" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
                <text x="335" y="142" fill="#34d399" fontSize="8" fontWeight="bold">কারক পেশি</text>
                <text x="160" y="165" fill="#94a3b8" fontSize="8">প্রতিবর্ত চাপের ৫টি প্রধান অংশ</text>
              </svg>
            )}

            {/* 11. Biology: Mendel's Monohybrid Cross Punnett Square */}
            {visualType === 'mendel_cross' && (
              <svg viewBox="0 0 420 220" className="w-full max-w-[420px] select-none">
                <rect x="140" y="40" width="70" height="70" fill="#0f172a" stroke="#475569" strokeWidth="2" />
                <text x="165" y="80" fill="#10b981" fontSize="14" fontWeight="bold">TT</text>
                <rect x="210" y="40" width="70" height="70" fill="#0f172a" stroke="#475569" strokeWidth="2" />
                <text x="235" y="80" fill="#38bdf8" fontSize="14" fontWeight="bold">Tt</text>
                <rect x="140" y="110" width="70" height="70" fill="#0f172a" stroke="#475569" strokeWidth="2" />
                <text x="165" y="150" fill="#38bdf8" fontSize="14" fontWeight="bold">Tt</text>
                <rect x="210" y="110" width="70" height="70" fill="#0f172a" stroke="#475569" strokeWidth="2" />
                <text x="235" y="150" fill="#f43f5e" fontSize="14" fontWeight="bold">tt</text>
                <text x="165" y="30" fill="#facc15" fontSize="12" fontWeight="bold">T</text>
                <text x="235" y="30" fill="#facc15" fontSize="12" fontWeight="bold">t</text>
                <text x="120" y="80" fill="#facc15" fontSize="12" fontWeight="bold">T</text>
                <text x="120" y="150" fill="#facc15" fontSize="12" fontWeight="bold">t</text>
                <rect x="295" y="55" width="115" height="70" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1" />
                <text x="305" y="75" fill="#a855f7" fontSize="9" fontWeight="bold">জিনোটাইপ অনুপাত:</text>
                <text x="305" y="90" fill="#ffffff" fontSize="10" fontWeight="bold">১ : ২ : ১ (TT:Tt:tt)</text>
                <text x="305" y="105" fill="#38bdf8" fontSize="9" fontWeight="bold">ফিনোটাইপ অনুপাত:</text>
                <text x="305" y="118" fill="#ffffff" fontSize="10" fontWeight="bold">৩ : ১ (লম্বা : বেঁটে)</text>
              </svg>
            )}

            {/* 12. Geography: Rain Shadow Area (বৃষ্টিচ্ছায় অঞ্চল) */}
            {visualType === 'rain_shadow' && (
              <svg viewBox="0 0 420 220" className="w-full max-w-[420px] select-none">
                <polygon points="50,190 200,50 350,190" fill="#1e293b" stroke="#64748b" strokeWidth="2.5" />
                <path d="M 40 140 Q 60 110 80 140 Q 100 110 120 140 Q 140 110 160 140" stroke="#38bdf8" strokeWidth="2" fill="none" strokeDasharray="3 3" />
                <text x="40" y="95" fill="#38bdf8" fontSize="9" fontWeight="bold">জলীয় বাষ্পপূর্ণ বায়ু ↑</text>
                <text x="50" y="165" fill="#60a5fa" fontSize="9">প্রতিবাত ঢাল (প্রচুর বৃষ্টিপাত)</text>
                <text x="240" y="165" fill="#f87171" fontSize="9">অনুবাদ ঢাল (বৃষ্টিচ্ছায় অঞ্চল)</text>
                <text x="260" y="125" fill="#fca5a5" fontSize="8">শুষ্ক নিম্নগামী বায়ু ↓</text>
                <text x="165" y="40" fill="#facc15" fontSize="9" fontWeight="bold">পর্বতশৃঙ্গ</text>
              </svg>
            )}

            {/* 13. Geography: Volcano Structure */}
            {visualType === 'volcano_structure' && (
              <svg viewBox="0 0 420 220" className="w-full max-w-[420px] select-none">
                <polygon points="60,190 190,70 230,70 360,190" fill="#334155" stroke="#475569" strokeWidth="2" />
                <rect x="180" y="180" width="60" height="35" rx="15" fill="#dc2626" />
                <text x="175" y="202" fill="#fef08a" fontSize="8" fontWeight="bold">ম্যাগমা গহ্বর</text>
                <line x1="210" y1="180" x2="210" y2="70" stroke="#f97316" strokeWidth="8" />
                <polygon points="190,70 230,70 210,85" fill="#1e293b" />
                <text x="215" y="60" fill="#facc15" fontSize="8" fontWeight="bold">জ্বালামুখ (Crater)</text>
                <path d="M 210 70 Q 230 40 260 25 M 210 70 Q 180 35 150 25" stroke="#94a3b8" strokeWidth="12" strokeLinecap="round" strokeOpacity="0.5" />
                <text x="185" y="30" fill="#cbd5e1" fontSize="8">ভস্ম ও গ্যাসীয় মেঘ</text>
              </svg>
            )}

            {/* 14. Physical Science: Concave Mirror Ray Diagram */}
            {visualType === 'concave_mirror' && (
              <svg viewBox="0 0 420 220" className="w-full max-w-[420px] select-none">
                <path d="M 320 30 Q 350 110 320 190" fill="none" stroke="#38bdf8" strokeWidth="4" />
                <path d="M 325 35 L 335 40 M 330 75 L 340 80 M 335 110 L 345 115 M 330 145 L 340 150 M 325 180 L 335 185" stroke="#64748b" strokeWidth="1.5" />
                <line x1="30" y1="110" x2="380" y2="110" stroke="#475569" strokeWidth="1.8" />
                <text x="365" y="102" fill="#94a3b8" fontSize="10">P (মেরু)</text>
                <circle cx="160" cy="110" r="4" fill="#a855f7" />
                <text x="155" y="128" fill="#c084fc" fontSize="10" fontWeight="bold">C (বক্রতাকেন্দ্র)</text>
                <circle cx="240" cy="110" r="4" fill="#38bdf8" />
                <text x="235" y="128" fill="#7dd3fc" fontSize="10" fontWeight="bold">F (ফোকাস)</text>
                <rect x="40" y="30" width="105" height="40" rx="6" fill="#0f172a" stroke="#38bdf8" strokeWidth="1" />
                <text x="50" y="48" fill="#38bdf8" fontSize="11" fontWeight="bold">f = R / 2</text>
                <text x="50" y="62" fill="#94a3b8" fontSize="8">বক্রতা ব্যাসার্ধ = ২ × ফোকাস</text>
                <line x1="100" y1="60" x2="330" y2="60" stroke="#facc15" strokeWidth="2" />
                <line x1="330" y1="60" x2="160" y2="160" stroke="#facc15" strokeWidth="2" />
              </svg>
            )}

            {/* 15. Bengali Grammar: Karok Decision Tree */}
            {visualType === 'karok_tree' && (
              <svg viewBox="0 0 420 220" className="w-full max-w-[420px] select-none">
                <rect x="150" y="15" width="120" height="32" rx="6" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2" />
                <text x="180" y="35" fill="#c084fc" fontSize="11" fontWeight="bold">কারক নির্ণয় পদ্ধতি</text>
                <path d="M 210 47 L 210 70 M 60 70 L 360 70" stroke="#475569" strokeWidth="1.5" />
                <g transform="translate(30, 80)">
                  <rect width="65" height="45" rx="5" fill="#0f172a" stroke="#38bdf8" />
                  <text x="10" y="18" fill="#38bdf8" fontSize="8" fontWeight="bold">কে / কারা?</text>
                  <text x="10" y="35" fill="#ffffff" fontSize="9" fontWeight="bold">কর্তৃকারক</text>
                </g>
                <g transform="translate(105, 80)">
                  <rect width="65" height="45" rx="5" fill="#0f172a" stroke="#34d399" />
                  <text x="10" y="18" fill="#34d399" fontSize="8" fontWeight="bold">কী / কাকে?</text>
                  <text x="10" y="35" fill="#ffffff" fontSize="9" fontWeight="bold">কর্মকারক</text>
                </g>
                <g transform="translate(180, 80)">
                  <rect width="65" height="45" rx="5" fill="#0f172a" stroke="#facc15" />
                  <text x="8" y="18" fill="#facc15" fontSize="8" fontWeight="bold">কিসের দ্বারা?</text>
                  <text x="8" y="35" fill="#ffffff" fontSize="9" fontWeight="bold">করণকারক</text>
                </g>
                <g transform="translate(255, 80)">
                  <rect width="65" height="45" rx="5" fill="#0f172a" stroke="#f87171" />
                  <text x="5" y="18" fill="#f87171" fontSize="8" fontWeight="bold">কোথা থেকে?</text>
                  <text x="8" y="35" fill="#ffffff" fontSize="9" fontWeight="bold">অপাদানকারক</text>
                </g>
                <g transform="translate(330, 80)">
                  <rect width="65" height="45" rx="5" fill="#0f172a" stroke="#c084fc" />
                  <text x="8" y="18" fill="#c084fc" fontSize="8" fontWeight="bold">কোথায়/কখন?</text>
                  <text x="8" y="35" fill="#ffffff" fontSize="9" fontWeight="bold">অধিকরণকারক</text>
                </g>
                <text x="110" y="160" fill="#94a3b8" fontSize="9">ক্রিয়াপদের সঙ্গে সম্বন্ধযুক্ত পদই হলো কারক</text>
              </svg>
            )}

            {/* 16. History & Flowchart fallback */}
            {(!visualType ||
              visualType === 'concept_flowchart' ||
              visualType === 'swadeshi_timeline' ||
              visualType === 'tense_timeline') && (
              <div className="w-full max-w-[420px] flex flex-col gap-2 py-1">
                {(customSteps.length > 0
                  ? customSteps
                  : [
                      {
                        labelBn: '১ম পর্যায়: সূচনা ও কারণ',
                        labelEn: 'Phase 1: Inception',
                        descBn: 'ঘটনা বা ধারণার প্রাথমিক পটভূমি ও কার্যকারণ সম্পর্ক।'
                      },
                      {
                        labelBn: '২য় পর্যায়: প্রক্রিয়া ও বিস্তার',
                        labelEn: 'Phase 2: Mechanism',
                        descBn: 'প্রধান বিকাশ, সমীকরণ বা ঘটনার মূল কার্যপ্রক্রিয়া।'
                      },
                      {
                        labelBn: '৩য় পর্যায়: ফলাফল ও সিদ্ধান্ত',
                        labelEn: 'Phase 3: Conclusion',
                        descBn: 'চূড়ান্ত ফলাফল ও মাধ্যমিক পরীক্ষার জন্য প্রয়োজনীয় সিদ্ধান্ত।'
                      }
                    ]
                ).map((step, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 bg-slate-900/90 border border-slate-800 rounded-xl p-2.5"
                  >
                    <div
                      className="flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold text-white shrink-0 shadow-md"
                      style={{ backgroundColor: step.color || '#6366f1' }}
                    >
                      {idx + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-1.5 mb-0.5">
                        <span className="text-xs font-bold text-white">{step.labelBn}</span>
                        {step.labelEn && (
                          <span className="text-[10px] text-indigo-300 font-mono">({step.labelEn})</span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-300 leading-relaxed">{step.descBn}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Labeled Parts Interactive Strip if parts available */}
      {labeledParts.length > 0 && (
        <div className="p-2.5 rounded-xl bg-[#080d1a] border border-slate-800 space-y-1.5">
          <div className="flex items-center justify-between text-[11px] text-slate-300 font-semibold">
            <span className="flex items-center gap-1 text-cyan-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>চিহ্নিত গুরুত্বপূর্ণ অংশসমূহ (Labelled Key Parts):</span>
            </span>
            <span className="text-[10px] text-slate-400 font-mono">ক্লিক করে বিবরণ দেখুন</span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {labeledParts.map((part) => {
              const isSelected = selectedPartId === part.id;
              return (
                <button
                  key={part.id}
                  type="button"
                  onClick={() => setSelectedPartId(isSelected ? null : part.id)}
                  className={`px-2 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-cyan-500/20 text-cyan-200 border-cyan-400 shadow-sm'
                      : 'bg-slate-900 text-slate-300 border-slate-700 hover:border-slate-500'
                  }`}
                >
                  <span>{part.nameBn}</span>
                  {part.nameEn && (
                    <span className="text-[10px] text-slate-400 font-mono ml-1">({part.nameEn})</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Selected Part Description Box */}
          {selectedPartId && (
            <div className="p-2 rounded-lg bg-cyan-950/30 border border-cyan-800/40 text-xs text-slate-200 flex items-start gap-1.5">
              <Info className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-cyan-300">
                  {labeledParts.find((p) => p.id === selectedPartId)?.nameBn}:
                </strong>{' '}
                <span>{labeledParts.find((p) => p.id === selectedPartId)?.descriptionBn}</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Caption footer */}
      {captionBn && (
        <div className="pt-2 border-t border-slate-800/80 flex items-center gap-2 text-[11px] sm:text-xs text-slate-300">
          <Layers className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          <span>{captionBn}</span>
        </div>
      )}
    </div>
  );
};
