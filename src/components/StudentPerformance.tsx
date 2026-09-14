import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  TrendingUp,
  Award,
  CheckCircle2,
  XCircle,
  Clock,
  BookOpen,
  BarChart3,
  LineChart,
  Calendar,
  Layers,
  ChevronRight,
  Sparkles,
  ArrowUpRight,
  Filter,
  RefreshCw,
  Trash2,
} from 'lucide-react';
import { StudentMockRecord, Subject } from '../types';
import { toBengaliNumber } from '../utils/bengaliUtils';

interface StudentPerformanceProps {
  records: StudentMockRecord[];
  subjects: Subject[];
  onTakeMockTest: () => void;
  onClearHistory: () => void;
}

type ChartType = 'line' | 'bar';

export const StudentPerformance: React.FC<StudentPerformanceProps> = ({
  records,
  subjects,
  onTakeMockTest,
  onClearHistory,
}) => {
  const [chartType, setChartType] = useState<ChartType>('line');
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState<string>('all');
  const [hoveredPointIndex, setHoveredPointIndex] = useState<number | null>(null);
  const [showConfirmClear, setShowConfirmClear] = useState(false);

  // Filtered records by subject
  const filteredRecords = useMemo(() => {
    if (selectedSubjectFilter === 'all') return records;
    return records.filter((r) => r.subjectId === selectedSubjectFilter);
  }, [records, selectedSubjectFilter]);

  // Overall statistics calculations
  const stats = useMemo(() => {
    if (filteredRecords.length === 0) {
      return {
        totalMocks: 0,
        averagePercentage: 0,
        bestPercentage: 0,
        totalCorrect: 0,
        totalWrong: 0,
        totalUnanswered: 0,
        recentGrowth: 0,
      };
    }

    const totalMocks = filteredRecords.length;
    const totalPercentage = filteredRecords.reduce((acc, r) => acc + r.percentage, 0);
    const averagePercentage = Math.round(totalPercentage / totalMocks);
    const bestPercentage = Math.max(...filteredRecords.map((r) => r.percentage));

    const totalCorrect = filteredRecords.reduce((acc, r) => acc + r.correctCount, 0);
    const totalWrong = filteredRecords.reduce((acc, r) => acc + r.wrongCount, 0);
    const totalUnanswered = filteredRecords.reduce((acc, r) => acc + r.unansweredCount, 0);

    // Calculate growth between first and latest mock
    let recentGrowth = 0;
    if (filteredRecords.length >= 2) {
      const first = filteredRecords[0].percentage;
      const latest = filteredRecords[filteredRecords.length - 1].percentage;
      recentGrowth = latest - first;
    }

    return {
      totalMocks,
      averagePercentage,
      bestPercentage,
      totalCorrect,
      totalWrong,
      totalUnanswered,
      recentGrowth,
    };
  }, [filteredRecords]);

  // Subject-wise performance aggregation
  const subjectBreakdown = useMemo(() => {
    const map = new Map<
      string,
      {
        subjectName: string;
        count: number;
        totalPercent: number;
        bestPercent: number;
        totalCorrect: number;
        totalQuestions: number;
      }
    >();

    records.forEach((rec) => {
      const existing = map.get(rec.subjectId) || {
        subjectName: rec.subjectName,
        count: 0,
        totalPercent: 0,
        bestPercent: 0,
        totalCorrect: 0,
        totalQuestions: 0,
      };
      existing.count += 1;
      existing.totalPercent += rec.percentage;
      existing.bestPercent = Math.max(existing.bestPercent, rec.percentage);
      existing.totalCorrect += rec.correctCount;
      existing.totalQuestions += rec.totalQuestions;
      map.set(rec.subjectId, existing);
    });

    return Array.from(map.entries()).map(([subId, data]) => ({
      subjectId: subId,
      subjectName: data.subjectName,
      count: data.count,
      avgPercentage: Math.round(data.totalPercent / data.count),
      bestPercentage: data.bestPercent,
      accuracy: Math.round((data.totalCorrect / (data.totalQuestions || 1)) * 100),
    }));
  }, [records]);

  // SVG Chart Dimensions
  const chartWidth = 640;
  const chartHeight = 240;
  const paddingX = 45;
  const paddingY = 30;

  // Compute coordinate points for line graph
  const linePoints = useMemo(() => {
    if (filteredRecords.length === 0) return [];
    if (filteredRecords.length === 1) {
      const x = chartWidth / 2;
      const y = chartHeight - paddingY - (filteredRecords[0].percentage / 100) * (chartHeight - paddingY * 2);
      return [{ x, y, record: filteredRecords[0], index: 0 }];
    }

    const availableWidth = chartWidth - paddingX * 2;
    const stepX = availableWidth / (filteredRecords.length - 1);

    return filteredRecords.map((rec, idx) => {
      const x = paddingX + idx * stepX;
      // y axis: 0% at bottom (chartHeight - paddingY), 100% at top (paddingY)
      const ratio = Math.min(100, Math.max(0, rec.percentage)) / 100;
      const y = chartHeight - paddingY - ratio * (chartHeight - paddingY * 2);
      return { x, y, record: rec, index: idx };
    });
  }, [filteredRecords]);

  // Path string for line chart
  const pathD = useMemo(() => {
    if (linePoints.length <= 1) return '';
    return linePoints.reduce((acc, curr, idx) => {
      if (idx === 0) return `M ${curr.x} ${curr.y}`;
      // Smooth curve using cubic bezier control points
      const prev = linePoints[idx - 1];
      const cx1 = prev.x + (curr.x - prev.x) / 2;
      const cy1 = prev.y;
      const cx2 = prev.x + (curr.x - prev.x) / 2;
      const cy2 = curr.y;
      return `${acc} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${curr.x} ${curr.y}`;
    }, '');
  }, [linePoints]);

  // Area under path string
  const areaD = useMemo(() => {
    if (linePoints.length <= 1) return '';
    const first = linePoints[0];
    const last = linePoints[linePoints.length - 1];
    const bottomY = chartHeight - paddingY;
    return `${pathD} L ${last.x} ${bottomY} L ${first.x} ${bottomY} Z`;
  }, [pathD, linePoints]);

  return (
    <div id="student-performance-view" className="w-full max-w-4xl mx-auto px-4 py-5 sm:py-7 space-y-6">
      {/* Top Banner with Performance Summary */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-950/80 via-indigo-950/70 to-purple-950/80 border border-indigo-500/30 p-5 sm:p-6 shadow-xl shadow-indigo-950/40">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold">
              <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
              <span>TrioMadhyamik • স্টুডেন্ট পারফর্ম্যান্স অ্যানালিটিক্স</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              মক টেস্ট পারফর্ম্যান্স ও ধারাবাহিক উন্নতির গ্রাফ
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
              প্রতিটি মক টেস্টের স্কোর, সঠিক-ভুল বিশ্লেষণ এবং বিষয়ভিত্তিক অগ্রগতির বিস্তারিত রূপরেখা
            </p>
          </div>

          <button
            id="perf-take-mock-btn"
            onClick={onTakeMockTest}
            className="self-start sm:self-center px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-xs shadow-lg shadow-indigo-900/40 flex items-center gap-1.5 cursor-pointer transition-all shrink-0"
          >
            <span>নতুন মক টেস্ট দিন</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 4 Stat Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-[#0e1424] border border-slate-800/80 shadow-md">
          <div className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>মোট মক টেস্ট</span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white mt-1">
            {toBengaliNumber(stats.totalMocks)}
            <span className="text-xs font-medium text-slate-400 ml-1">টি সম্পন্ন</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#0e1424] border border-slate-800/80 shadow-md">
          <div className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5 text-purple-400" />
            <span>গড় স্কোর শতাংশ</span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-purple-300 mt-1">
            {toBengaliNumber(stats.averagePercentage)}%
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#0e1424] border border-slate-800/80 shadow-md">
          <div className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>সর্বোচ্চ প্রাপ্তি</span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-300 mt-1">
            {toBengaliNumber(stats.bestPercentage)}%
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#0e1424] border border-slate-800/80 shadow-md">
          <div className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />
            <span>উন্নতির ধারা (Growth)</span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-400 mt-1 flex items-center">
            {stats.recentGrowth >= 0 ? '+' : ''}
            {toBengaliNumber(stats.recentGrowth)}%
          </div>
        </div>
      </div>

      {/* PERFORMANCE GRAPH SECTION */}
      <div className="p-5 sm:p-6 rounded-3xl bg-[#0b1020] border border-indigo-950/80 shadow-2xl space-y-4">
        {/* Controls Row: Chart Type & Subject Filter */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-white flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-cyan-400" />
              <span>অগ্রগতি গ্রাফ (Performance Chart)</span>
            </span>
            <span className="text-xs text-slate-400">
              ({toBengaliNumber(filteredRecords.length)}টি টেস্ট)
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Chart Type Toggle (Line vs Bar) */}
            <div className="bg-slate-900/90 p-1 rounded-xl border border-slate-800 flex items-center gap-1">
              <button
                onClick={() => setChartType('line')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
                  chartType === 'line'
                    ? 'bg-indigo-600 text-white shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <LineChart className="w-3.5 h-3.5" />
                <span>লাইন গ্রাফ</span>
              </button>
              <button
                onClick={() => setChartType('bar')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
                  chartType === 'bar'
                    ? 'bg-indigo-600 text-white shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span>বার চার্ট</span>
              </button>
            </div>

            {/* Subject Filter Dropdown */}
            <div className="flex items-center gap-1.5 bg-slate-900/90 px-2.5 py-1 rounded-xl border border-slate-800 text-xs">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <select
                id="perf-subject-filter"
                value={selectedSubjectFilter}
                onChange={(e) => setSelectedSubjectFilter(e.target.value)}
                className="bg-transparent text-slate-200 outline-none text-xs font-medium cursor-pointer"
              >
                <option value="all" className="bg-slate-900 text-slate-200">
                  সকল বিষয় (All Subjects)
                </option>
                {subjects.map((sub) => (
                  <option key={sub.id} value={sub.id} className="bg-slate-900 text-slate-200">
                    {sub.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Graph Display Area */}
        {filteredRecords.length === 0 ? (
          <div className="py-16 text-center text-slate-400 space-y-2">
            <div className="w-12 h-12 mx-auto rounded-full bg-slate-800/80 flex items-center justify-center text-2xl">
              📊
            </div>
            <p className="text-sm font-semibold text-slate-300">
              নির্বাচিত বিষয়ের কোনো মক টেস্ট রেকর্ড পাওয়া যায়নি
            </p>
            <p className="text-xs text-slate-500">
              মক টেস্ট সম্পন্ন করার পর এখানে আপনার স্বয়ংক্রিয় গ্রাফ তৈরি হবে।
            </p>
          </div>
        ) : (
          <div className="w-full overflow-x-auto pb-2">
            <div className="min-w-[580px]">
              {chartType === 'line' ? (
                /* LINE CHART */
                <div className="relative">
                  <svg
                    viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                    className="w-full h-auto overflow-visible select-none"
                  >
                    <defs>
                      <linearGradient id="lineAreaGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#818cf8" stopOpacity="0.45" />
                        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
                      </linearGradient>
                      <linearGradient id="lineStrokeGrad" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#38bdf8" />
                        <stop offset="50%" stopColor="#818cf8" />
                        <stop offset="100%" stopColor="#c084fc" />
                      </linearGradient>
                    </defs>

                    {/* Horizontal Grid lines (0%, 25%, 50%, 75%, 100%) */}
                    {[0, 25, 50, 75, 100].map((val) => {
                      const y = chartHeight - paddingY - (val / 100) * (chartHeight - paddingY * 2);
                      return (
                        <g key={val}>
                          <line
                            x1={paddingX}
                            y1={y}
                            x2={chartWidth - paddingX}
                            y2={y}
                            stroke="#1e293b"
                            strokeDasharray={val === 0 || val === 100 ? '' : '3 3'}
                            strokeWidth="1"
                          />
                          <text
                            x={paddingX - 8}
                            y={y + 4}
                            fill="#64748b"
                            fontSize="10"
                            textAnchor="end"
                            fontFamily="monospace"
                          >
                            {toBengaliNumber(val)}%
                          </text>
                        </g>
                      );
                    })}

                    {/* Area fill */}
                    {areaD && <path d={areaD} fill="url(#lineAreaGrad)" />}

                    {/* Curve line */}
                    {pathD && (
                      <path
                        d={pathD}
                        fill="none"
                        stroke="url(#lineStrokeGrad)"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    )}

                    {/* Data Points */}
                    {linePoints.map((pt) => {
                      const isHovered = hoveredPointIndex === pt.index;
                      return (
                        <g
                          key={pt.record.id}
                          className="cursor-pointer"
                          onMouseEnter={() => setHoveredPointIndex(pt.index)}
                          onClick={() => setHoveredPointIndex(pt.index)}
                        >
                          {/* Outer glow ring */}
                          <circle
                            cx={pt.x}
                            cy={pt.y}
                            r={isHovered ? 8 : 5}
                            fill="#0b1020"
                            stroke="#38bdf8"
                            strokeWidth={isHovered ? 3 : 2}
                            className="transition-all duration-200"
                          />
                          {/* Inner center dot */}
                          <circle
                            cx={pt.x}
                            cy={pt.y}
                            r={isHovered ? 4 : 2.5}
                            fill="#c084fc"
                          />

                          {/* X-axis Label: Mock 1, Mock 2... */}
                          <text
                            x={pt.x}
                            y={chartHeight - 8}
                            fill={isHovered ? '#38bdf8' : '#94a3b8'}
                            fontSize="11"
                            fontWeight={isHovered ? 'bold' : 'normal'}
                            textAnchor="middle"
                          >
                            মক {toBengaliNumber(pt.record.mockNumber)}
                          </text>

                          {/* Percentage label directly above point */}
                          <text
                            x={pt.x}
                            y={pt.y - 10}
                            fill={isHovered ? '#38bdf8' : '#e2e8f0'}
                            fontSize="11"
                            fontWeight="bold"
                            textAnchor="middle"
                          >
                            {toBengaliNumber(pt.record.percentage)}%
                          </text>
                        </g>
                      );
                    })}
                  </svg>

                  {/* Active Tooltip Details Box */}
                  {hoveredPointIndex !== null && filteredRecords[hoveredPointIndex] && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-3 p-3.5 rounded-2xl bg-[#12192e] border border-indigo-500/40 shadow-xl flex flex-wrap items-center justify-between gap-3"
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-bold text-xs">
                            মক টেস্ট #{toBengaliNumber(filteredRecords[hoveredPointIndex].mockNumber)}
                          </span>
                          <span className="text-xs font-semibold text-white">
                            {filteredRecords[hoveredPointIndex].subjectName}
                          </span>
                          <span className="text-[11px] text-slate-400">
                            • {filteredRecords[hoveredPointIndex].chapterName}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-slate-500" />
                          <span>তারিখ: {filteredRecords[hoveredPointIndex].date}</span>
                        </p>
                      </div>

                      <div className="flex items-center gap-4 text-xs font-semibold">
                        <span className="text-cyan-300">
                          স্কোর: {toBengaliNumber(filteredRecords[hoveredPointIndex].score)}/{toBengaliNumber(filteredRecords[hoveredPointIndex].totalQuestions)} ({toBengaliNumber(filteredRecords[hoveredPointIndex].percentage)}%)
                        </span>
                        <span className="text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>সঠিক {toBengaliNumber(filteredRecords[hoveredPointIndex].correctCount)}</span>
                        </span>
                        <span className="text-rose-400 flex items-center gap-1">
                          <XCircle className="w-3.5 h-3.5" />
                          <span>ভুল {toBengaliNumber(filteredRecords[hoveredPointIndex].wrongCount)}</span>
                        </span>
                        <span className="text-slate-400">
                          অনুত্তর {toBengaliNumber(filteredRecords[hoveredPointIndex].unansweredCount)}
                        </span>
                      </div>
                    </motion.div>
                  )}
                </div>
              ) : (
                /* BAR CHART */
                <div className="space-y-4 pt-2">
                  <div className="grid grid-cols-1 gap-3">
                    {filteredRecords.map((rec) => {
                      const correctWidth = (rec.correctCount / rec.totalQuestions) * 100;
                      const wrongWidth = (rec.wrongCount / rec.totalQuestions) * 100;
                      const unansweredWidth = (rec.unansweredCount / rec.totalQuestions) * 100;

                      return (
                        <div
                          key={rec.id}
                          className="p-3.5 rounded-2xl bg-[#0e1424] border border-slate-800/80 hover:border-indigo-500/40 transition-all space-y-2"
                        >
                          <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-white">
                                মক {toBengaliNumber(rec.mockNumber)}
                              </span>
                              <span className="text-slate-400 font-medium">
                                ({rec.subjectName} • {rec.chapterName})
                              </span>
                            </div>
                            <div className="flex items-center gap-2 font-bold">
                              <span className="text-cyan-300">
                                {toBengaliNumber(rec.percentage)}%
                              </span>
                              <span className="text-slate-400 text-[11px]">
                                ({toBengaliNumber(rec.score)}/{toBengaliNumber(rec.totalQuestions)})
                              </span>
                            </div>
                          </div>

                          {/* Multi-segment Progress Bar */}
                          <div className="w-full h-3.5 rounded-full bg-slate-900 overflow-hidden flex shadow-inner">
                            <div
                              style={{ width: `${correctWidth}%` }}
                              className="bg-emerald-500 h-full transition-all"
                              title={`সঠিক: ${rec.correctCount}`}
                            />
                            <div
                              style={{ width: `${wrongWidth}%` }}
                              className="bg-rose-500 h-full transition-all"
                              title={`ভুল: ${rec.wrongCount}`}
                            />
                            <div
                              style={{ width: `${unansweredWidth}%` }}
                              className="bg-slate-700 h-full transition-all"
                              title={`অনুত্তর: ${rec.unansweredCount}`}
                            />
                          </div>

                          <div className="flex items-center justify-between text-[11px] text-slate-400">
                            <span className="flex items-center gap-3">
                              <span className="text-emerald-400">
                                ✓ সঠিক: {toBengaliNumber(rec.correctCount)}
                              </span>
                              <span className="text-rose-400">
                                ✗ ভুল: {toBengaliNumber(rec.wrongCount)}
                              </span>
                              <span>
                                ⊘ অনুত্তর: {toBengaliNumber(rec.unansweredCount)}
                              </span>
                            </span>
                            <span className="font-mono text-slate-500">{rec.date}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 5. SUBJECT-WISE PERFORMANCE SECTION */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-400" />
            <h3 className="text-lg font-bold text-white">
              বিষয়ভিত্তিক পারফর্ম্যান্স বিশ্লেষণ (Subject-wise Performance)
            </h3>
          </div>
          <span className="text-xs text-slate-400">
            {toBengaliNumber(subjectBreakdown.length)}টি বিষয়ে মক টেস্ট দেওয়া হয়েছে
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {subjectBreakdown.map((item) => (
            <div
              key={item.subjectId}
              className="p-4 rounded-2xl bg-[#0e1424] border border-slate-800 hover:border-indigo-500/40 transition-all shadow-md space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-white truncate max-w-[170px]">
                  {item.subjectName}
                </span>
                <span className="text-xs font-bold text-cyan-300 px-2 py-0.5 rounded-lg bg-cyan-950/60 border border-cyan-500/30">
                  {toBengaliNumber(item.avgPercentage)}%
                </span>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1">
                <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden">
                  <div
                    style={{ width: `${item.avgPercentage}%` }}
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                  />
                </div>
              </div>

              <div className="pt-1 flex items-center justify-between text-[11px] text-slate-400">
                <span>পরীক্ষা: {toBengaliNumber(item.count)}টি</span>
                <span>সর্বোচ্চ: {toBengaliNumber(item.bestPercentage)}%</span>
                <span className="text-emerald-400 font-semibold">
                  সঠিকতার হার: {toBengaliNumber(item.accuracy)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CHRONOLOGICAL MOCK HISTORY LIST & RESET OPTION */}
      <div className="p-5 rounded-3xl bg-[#0b1020] border border-slate-800/80 shadow-lg space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-purple-400" />
            <h3 className="text-base font-bold text-white">
              সম্পূর্ণ মক টেস্ট ইতিহাস ({toBengaliNumber(records.length)}টি টেস্ট সংরক্ষিত)
            </h3>
          </div>

          <button
            onClick={() => setShowConfirmClear(true)}
            className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 cursor-pointer transition-colors p-1"
            title="ইতিহাস রিসেট করুন"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>ইতিহাস রিসেট</span>
          </button>
        </div>

        <div className="divide-y divide-slate-800/60">
          {records.slice().reverse().map((rec) => (
            <div key={rec.id} className="py-3 first:pt-0 last:pb-0 flex items-center justify-between gap-3">
              <div className="space-y-0.5 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-cyan-300">
                    মক #{toBengaliNumber(rec.mockNumber)}
                  </span>
                  <span className="text-xs font-semibold text-white truncate">
                    {rec.subjectName}
                  </span>
                  <span className="text-[11px] text-slate-400 hidden sm:inline truncate">
                    • {rec.chapterName}
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 font-mono flex items-center gap-2">
                  <span>{rec.date}</span>
                  <span>•</span>
                  <span>সময়: {Math.round(rec.timeSpentSeconds / 60)} মিনিট</span>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <div className="text-right">
                  <div className="text-sm font-bold text-emerald-400">
                    {toBengaliNumber(rec.score)}/{toBengaliNumber(rec.totalQuestions)}
                  </div>
                  <div className="text-[11px] font-semibold text-purple-300">
                    {toBengaliNumber(rec.percentage)}%
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Confirmation Modal for Clearing History */}
      <AnimatePresence>
        {showConfirmClear && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#0e1424] border border-rose-500/40 p-6 rounded-2xl max-w-sm w-full space-y-4 shadow-2xl"
            >
              <div className="flex items-center gap-3 text-rose-400">
                <Trash2 className="w-6 h-6" />
                <h4 className="text-base font-bold text-white">ইতিহাস মুছে ফেলতে চান?</h4>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                আপনার ব্রাউজারে সংরক্ষিত সমস্ত মক টেস্ট স্কোর ও পারফর্ম্যান্স ইতিহাস মুছে যাবে।
              </p>
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  onClick={() => setShowConfirmClear(false)}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-800 text-xs font-semibold text-slate-300 hover:text-white cursor-pointer"
                >
                  বাতিল
                </button>
                <button
                  onClick={() => {
                    onClearHistory();
                    setShowConfirmClear(false);
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-xs font-semibold text-white cursor-pointer"
                >
                  হ্যাঁ, মুছে ফেলুন
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
