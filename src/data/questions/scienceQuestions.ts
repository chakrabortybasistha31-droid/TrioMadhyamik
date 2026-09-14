import { Question } from '../../types';

export const SCIENCE_QUESTIONS: Question[] = [
  // ==================== PHYSICAL SCIENCE (14 Chapters) ====================
  // phys-1: পরিবেশের জন্য ভাবনা
  {
    id: 'phys-q-1-1',
    subjectId: 'physical_science',
    chapterId: 'phys-1',
    question: 'বায়ুমণ্ডলের কোন স্তরে ওজন (O₃) গ্যাসের সর্বাধিক ঘনত্ব দেখতে পাওয়া যায়?',
    options: [
      { id: '(i)', text: 'ট্রপোস্ফিয়ার' },
      { id: '(ii)', text: 'স্ট্র্যাটোস্ফিয়ার' },
      { id: '(iii)', text: 'মেসোস্ফিয়ার' },
      { id: '(iv)', text: 'থার্মোস্ফিয়ার' }
    ],
    correctOptionId: '(ii)',
    explanation: 'স্ট্র্যাটোস্ফিয়ারের ১৬ থেকে ৩০ কিমি উচ্চতার অঞ্চলে ওজোন গ্যাসের ঘন স্তর বা ওজোনোস্ফিয়ার অবস্থিত, যা সূর্যের ক্ষতিকর অতিবেগুনি রশ্মি শোষণ করে।'
  },
  {
    id: 'phys-q-1-2',
    subjectId: 'physical_science',
    chapterId: 'phys-1',
    question: 'প্রধান গ্রিনহাউস গ্যাস কোনটি?',
    options: [
      { id: '(i)', text: 'অক্সিজেন (O₂)' },
      { id: '(ii)', text: 'নাইট্রোজেন (N₂)' },
      { id: '(iii)', text: 'কার্বন ডাইঅক্সাইড (CO₂)' },
      { id: '(iv)', text: 'হাইড্রোজেন (H₂)' }
    ],
    correctOptionId: '(iii)',
    explanation: 'ভূমণ্ডলীয় উষ্ণায়ন বা গ্লোবাল ওয়ার্মিং-এর ক্ষেত্রে বায়ুমণ্ডলে কার্বন ডাইঅক্সাইডের (CO₂) অবদান সর্বাধিক।'
  },

  // phys-2: গ্যাসের আচরণ
  {
    id: 'phys-q-2-1',
    subjectId: 'physical_science',
    chapterId: 'phys-2',
    question: 'পরম শূন্য তাপমাত্রায় (0 Kelvin / -273°C) কোনো আদর্শ গ্যাসের আয়তন কত হয়?',
    options: [
      { id: '(i)', text: 'সর্বাধিক' },
      { id: '(ii)', text: 'তাত্ত্বিকভাবে শূন্য' },
      { id: '(iii)', text: '22.4 লিটার' },
      { id: '(iv)', text: 'অসীম' }
    ],
    correctOptionId: '(ii)',
    explanation: 'চার্লসের সূত্রানুযায়ী V = V₀(1 + t/273)। t = -273°C তাপমাত্রায় গ্যাসের তাত্ত্বিক আয়তন শূন্য (0) হয়ে যায়।'
  },
  {
    id: 'phys-q-2-2',
    subjectId: 'physical_science',
    chapterId: 'phys-2',
    question: 'আদর্শ গ্যাস সমীকরণটি কী?',
    options: [
      { id: '(i)', text: 'PV = nRT' },
      { id: '(ii)', text: 'P/V = RT' },
      { id: '(iii)', text: 'PT = nRV' },
      { id: '(iv)', text: 'V/T = nPR' }
    ],
    correctOptionId: '(i)',
    explanation: 'বয়েল, চার্লস ও অ্যাভোগাড্রো সূত্রের সমন্বয়ে গঠিত আদর্শ গ্যাস সমীকরণ হলো PV = nRT।'
  },

  // phys-3: রাসায়নিক গণনা
  {
    id: 'phys-q-3-1',
    subjectId: 'physical_science',
    chapterId: 'phys-3',
    question: 'STP-তে যেকোনো গ্যাসের ১ মোল পরিমাণের আয়তন কত?',
    options: [
      { id: '(i)', text: '11.2 লিটার' },
      { id: '(ii)', text: '22.4 লিটার' },
      { id: '(iii)', text: '44.8 লিটার' },
      { id: '(iv)', text: '1 লিটার' }
    ],
    correctOptionId: '(ii)',
    explanation: 'প্রমাণ চাপ ও তাপমাত্রায় (STP) যেকোনো আদর্শ গ্যাসের মোলার আয়তন সর্বদা ২২.৪ লিটার হয়।'
  },

  // phys-4: তাপের ঘটনাসমূহ
  {
    id: 'phys-q-4-1',
    subjectId: 'physical_science',
    chapterId: 'phys-4',
    question: 'কঠিন পদার্থের কয় প্রকার তাপীয় প্রসারণ গুণাঙ্ক থাকে?',
    options: [
      { id: '(i)', text: '১ প্রকার' },
      { id: '(ii)', text: '২ প্রকার' },
      { id: '(iii)', text: '৩ প্রকার (দৈর্ঘ্য α, ক্ষেত্র β, আয়তন γ)' },
      { id: '(iv)', text: '৪ প্রকার' }
    ],
    correctOptionId: '(iii)',
    explanation: 'কঠিনের নির্দিষ্ট আকার ও আয়তন থাকায় এর দৈর্ঘ্য প্রসারণ (α), ক্ষেত্র প্রসারণ (β) এবং আয়তন প্রসারণ (γ) গুণাঙ্ক বিদ্যমান এবং α = β/2 = γ/3।'
  },

  // phys-5: আলো
  {
    id: 'phys-q-5-1',
    subjectId: 'physical_science',
    chapterId: 'phys-5',
    question: 'দন্তচিকিৎসকগণ দাঁত পরীক্ষার জন্য কোন ধরণের দর্পণ ব্যবহার করেন?',
    options: [
      { id: '(i)', text: 'উত্তল দর্পণ' },
      { id: '(ii)', text: 'অবতল দর্পণ' },
      { id: '(iii)', text: 'সমতল দর্পণ' },
      { id: '(iv)', text: 'দ্বি-উত্তল লেন্স' }
    ],
    correctOptionId: '(ii)',
    explanation: 'অবতল দর্পণের ফোকাসের মধ্যে দাঁত রাখলে সোজা ও বিবর্ধিত অসদবিম্ব গঠিত হয়, ফলে খুঁটিনাটি স্পষ্ট দেখা যায়।'
  },

  // phys-6: চলতড়িৎ
  {
    id: 'phys-q-6-1',
    subjectId: 'physical_science',
    chapterId: 'phys-6',
    question: 'তড়িৎ আধানের এস.আই. (SI) একক কোনটি?',
    options: [
      { id: '(i)', text: 'অ্যাম্পিয়ার' },
      { id: '(ii)', text: 'কুলম্ব (Coulomb)' },
      { id: '(iii)', text: 'ভোল্ট' },
      { id: '(iv)', text: 'ওহম' }
    ],
    correctOptionId: '(ii)',
    explanation: 'আন্তর্জাতিক পদ্ধতিতে (SI) তড়িৎ আধানের একক হলো কুলম্ব (C)। তড়িৎ প্রবাহমাত্রার একক অ্যাম্পিয়ার।'
  },

  // phys-7: পরমাণুর নিউক্লিয়াস
  {
    id: 'phys-q-7-1',
    subjectId: 'physical_science',
    chapterId: 'phys-7',
    question: 'তেজস্ক্রিয় বিকিরণে নির্গত কোন কণাটির ভেদন ক্ষমতা সর্বাধিক?',
    options: [
      { id: '(i)', text: 'আলফা (α) কণা' },
      { id: '(ii)', text: 'বিটা (β) কণা' },
      { id: '(iii)', text: 'গামা (γ) রশ্মি' },
      { id: '(iv)', text: 'পজিট্রন' }
    ],
    correctOptionId: '(iii)',
    explanation: 'তড়িৎচৌম্বকীয় তরঙ্গধর্মী নিস্তড়িৎ গামা রশ্মির ভেদন ক্ষমতা আলফা ও বিটা কণার চেয়ে বহুগুণ বেশি।'
  },

  // phys-8: পর্যায় সারণি এবং মৌলের ধর্মের পর্যাবৃত্ততা
  {
    id: 'phys-q-8-1',
    subjectId: 'physical_science',
    chapterId: 'phys-8',
    question: 'আধুনিক পর্যায় সারণির মৌলসমূহের মূল ভিত্তি কী?',
    options: [
      { id: '(i)', text: 'পারমাণবিক ভর' },
      { id: '(ii)', text: 'পরমাণু ক্রমাঙ্ক বা পারমাণবিক সংখ্যা (Atomic Number)' },
      { id: '(iii)', text: 'ভর সংখ্যা' },
      { id: '(iv)', text: 'যোজ্যতা' }
    ],
    correctOptionId: '(ii)',
    explanation: 'বিজ্ঞানী মোজলের পরীক্ষার পর জানা যায় যে মৌলের রাসায়নিক ধর্মের মূল নিয়ন্ত্রক হলো পরমাণু ক্রমাঙ্ক বা প্রোটন সংখ্যা।'
  },

  // phys-9: আয়নিক ও সমযোজী বন্ধন
  {
    id: 'phys-q-9-1',
    subjectId: 'physical_science',
    chapterId: 'phys-9',
    question: 'নিচের কোন যৌগটি তড়িৎযোজী বা আয়নীয় যৌগ?',
    options: [
      { id: '(i)', text: 'মিথেন (CH₄)' },
      { id: '(ii)', text: 'জল (H₂O)' },
      { id: '(iii)', text: 'সোডিয়াম ক্লোরাইড (NaCl)' },
      { id: '(iv)', text: 'হাইড্রোজেন ক্লোরাইড (HCl)' }
    ],
    correctOptionId: '(iii)',
    explanation: 'Na⁺ এবং Cl⁻ বিপরীত আয়নদ্বয়ের স্থির তাড়িতিক আকর্ষণ বলে NaCl গঠিত হওয়ায় এটি আয়নীয় যৌগ।'
  },

  // phys-10: তড়িৎপ্রবাহ এবং রাসায়নিক বিক্রিয়া
  {
    id: 'phys-q-10-1',
    subjectId: 'physical_science',
    chapterId: 'phys-10',
    question: 'জলের তড়িৎ বিশ্লেষণে ক্যাথোডে ও অ্যানোডে উৎপন্ন গ্যাসের আয়তনের অনুপাত কত?',
    options: [
      { id: '(i)', text: '1 : 2' },
      { id: '(ii)', text: '2 : 1 (H₂ : O₂)' },
      { id: '(iii)', text: '1 : 1' },
      { id: '(iv)', text: '2 : 3' }
    ],
    correctOptionId: '(ii)',
    explanation: 'অ্যাসিডমিশ্রিত জলের তড়িৎ বিশ্লেষণে ক্যাথোডে হাইড্রোজেন (H₂) এবং অ্যানোডে অক্সিজেন (O₂) ২:১ আয়তন অনুপাতে উৎপন্ন হয়।'
  },

  // phys-11: পরীক্ষাগারে ও রাসায়নিক শিল্পে অজৈব রসায়ন
  {
    id: 'phys-q-11-1',
    subjectId: 'physical_science',
    chapterId: 'phys-11',
    question: 'পরীক্ষাগারে কিপস যন্ত্রের সাহায্যে কোন বিষাক্ত দুর্গন্ধযুক্ত গ্যাসটি প্রস্তুত করা যায়?',
    options: [
      { id: '(i)', text: 'হাইড্রোজেন সালফাইড (H₂S)' },
      { id: '(ii)', text: 'অ্যামোনিয়া (NH₃)' },
      { id: '(iii)', text: 'নাইট্রোজেন (N₂)' },
      { id: '(iv)', text: 'ক্লোরিন (Cl₂)' }
    ],
    correctOptionId: '(i)',
    explanation: 'কিপস্ যন্ত্রে সাধারণ তাপমাত্রায় ফেরাস সালফাইড (FeS) এবং লঘু H₂SO₄ এর বিক্রিয়ায় দুর্গন্ধযুক্ত H₂S গ্যাস প্রস্তুত করা হয়।'
  },

  // phys-12: ধাতুবিদ্যা
  {
    id: 'phys-q-12-1',
    subjectId: 'physical_science',
    chapterId: 'phys-12',
    question: 'অ্যালুমিনিয়ামের প্রধান আকরিক বক্সাইটের সংকেত কী?',
    options: [
      { id: '(i)', text: 'Al₂O₃' },
      { id: '(ii)', text: 'Al₂O₃·2H₂O' },
      { id: '(iii)', text: 'Na₃AlF₆' },
      { id: '(iv)', text: 'CuFeS₂' }
    ],
    correctOptionId: '(ii)',
    explanation: 'বক্সাইট হলো সজল অ্যালুমিনিয়াম অক্সাইড যার রাসায়নিক সংকেত Al₂O₃·2H₂O।'
  },

  // phys-13: জৈব রসায়ন
  {
    id: 'phys-q-13-1',
    subjectId: 'physical_science',
    chapterId: 'phys-13',
    question: 'সরলতম অ্যালকেনের (মিথেন) আণবিক সংকেত কোনটি?',
    options: [
      { id: '(i)', text: 'C₂H₆' },
      { id: '(ii)', text: 'CH₄' },
      { id: '(iii)', text: 'C₂H₄' },
      { id: '(iv)', text: 'C₂H₂' }
    ],
    correctOptionId: '(ii)',
    explanation: 'মিথেন (CH₄) হলো প্যারাফিন বা অ্যালকেন সমগোত্রীয় শ্রেণীর প্রথম ও সরলতম সদস্য।'
  },

  // phys-14: অধ্যায়ে ব্যবহৃত পরিভাষা
  {
    id: 'phys-q-14-1',
    subjectId: 'physical_science',
    chapterId: 'phys-14',
    question: '‘আইসোটোপ’ (Isotope) পরিভাষাটি দ্বারা কী নির্দেশ করা হয়?',
    options: [
      { id: '(i)', text: 'একই পরমাণু ক্রমাঙ্ক কিন্তু ভিন্ন ভরসংখ্যার পরমাণু' },
      { id: '(ii)', text: 'একই ভরসংখ্যা কিন্তু ভিন্ন পারমাণবিক সংখ্যার পরমাণু' },
      { id: '(iii)', text: 'সমান নিউট্রন সংখ্যার পরমাণু' },
      { id: '(iv)', text: 'একই যোজ্যতার পরমাণু' }
    ],
    correctOptionId: '(i)',
    explanation: 'একই মৌলের যে সকল পরমাণুর পারমাণবিক সংখ্যা বা প্রোটন সংখ্যা এক কিন্তু নিউক্লিয়াসে নিউট্রন সংখ্যা আলাদা হওয়ায় ভরসংখ্যা ভিন্ন, তাদের আইসোটোপ বলে।'
  },

  // ==================== LIFE SCIENCE (5 Chapters) ====================
  // life-1: জীবজগতে নিয়ন্ত্রণ ও সমন্বয়
  {
    id: 'life-q-1-1',
    subjectId: 'life_science',
    chapterId: 'life-1',
    question: 'উদ্ভিদের প্রধান নাইট্রোজেনযুক্ত বৃদ্ধিকারক হরমোন কোনটি?',
    options: [
      { id: '(i)', text: 'অক্সিন (Indole Acetic Acid)' },
      { id: '(ii)', text: 'জিব্বেরেলিন' },
      { id: '(iii)', text: 'অ্যাবসিসিক অ্যাসিড' },
      { id: '(iv)', text: 'ইথিলিন' }
    ],
    correctOptionId: '(i)',
    explanation: 'অক্সিন (IAA) একটি ইনডোল বর্গীয় নাইট্রোজেনঘটিত উদ্ভিদ হরমোন যা ট্রপিক চলন নিয়ন্ত্রণ ও কোষ বিভাজনে সাহায্য করে।'
  },
  {
    id: 'life-q-1-2',
    subjectId: 'life_science',
    chapterId: 'life-1',
    question: 'মানবদেহের কোন অন্তক্ষরা গ্রন্থিকে ‘প্রভু গ্রন্থি’ বা মাস্টার গ্ল্যান্ড বলা হয়?',
    options: [
      { id: '(i)', text: 'থাইরয়েড' },
      { id: '(ii)', text: 'পিটুইটারি গ্রন্থি' },
      { id: '(iii)', text: 'অ্যাড্রিনাল' },
      { id: '(iv)', text: 'অগ্ন্যাশয়' }
    ],
    correctOptionId: '(ii)',
    explanation: 'পিটুইটারি গ্রন্থি থেকে ক্ষরিত হরমোন অন্যান্য অন্তক্ষরা গ্রন্থির ক্ষরণ নিয়ন্ত্রণ করে বলে একে মাস্টার গ্ল্যান্ড বা প্রভু গ্রন্থি বলে।'
  },

  // life-2: জীবনের প্রবাহমানতা
  {
    id: 'life-q-2-1',
    subjectId: 'life_science',
    chapterId: 'life-2',
    question: 'মিয়োসিস কোষ বিভাজনের কোন দশায় ক্রসিং ওভার (Crossing Over) ঘটে?',
    options: [
      { id: '(i)', text: 'লেপ্টোটিন' },
      { id: '(ii)', text: 'প্যাকাইটিন' },
      { id: '(iii)', text: 'ডিপ্লোটিন' },
      { id: '(iv)', text: 'ডায়াকাইনেসিস' }
    ],
    correctOptionId: '(ii)',
    explanation: 'মিয়োসিস-১ এর প্রফেজ-১ দশার প্যাকাইটিন উপদশায় নন-সিস্টার ক্রোমাটিডের মধ্যে খণ্ড বিনিময় বা ক্রসিং ওভার সম্পন্ন হয়।'
  },
  {
    id: 'life-q-2-2',
    subjectId: 'life_science',
    chapterId: 'life-2',
    question: 'ডিএনএ (DNA)-তে উপস্থিত পিরিমিডিন ক্ষারক দুটি কী কী?',
    options: [
      { id: '(i)', text: 'অ্যাডেনিন ও গুয়ানিন' },
      { id: '(ii)', text: 'সাইটোসিন ও থাইমিন' },
      { id: '(iii)', text: 'ইউরাসিল ও সাইটোসিন' },
      { id: '(iv)', text: 'অ্যাডেনিন ও থাইমিন' }
    ],
    correctOptionId: '(ii)',
    explanation: 'ডিএনএ-এর পিরিমিডিন ক্ষারক হলো সাইটোসিন (C) ও থাইমিন (T)। (RNA-তে থাইমিনের পরিবর্তে ইউরাসিল থাকে)।'
  },

  // life-3: বংশগতি এবং কয়েকটি সাধারণ জিনগত রোগ
  {
    id: 'life-q-3-1',
    subjectId: 'life_science',
    chapterId: 'life-3',
    question: 'গ্রেগর জোহান মেন্ডেলের একসংকর জনন পরীক্ষায় F₂ জনুর ফিনোটাইপ অনুপাত কত ছিল?',
    options: [
      { id: '(i)', text: '1 : 2 : 1' },
      { id: '(ii)', text: '3 : 1' },
      { id: '(iii)', text: '9 : 3 : 3 : 1' },
      { id: '(iv)', text: '1 : 1' }
    ],
    correctOptionId: '(ii)',
    explanation: 'মটরগাছের একসংকর জননে বাহ্যিক বৈশিষ্ট্য বা ফিনোটাইপ অনুপাত ৩:১ (৩ ভাগ লম্বা ও ১ ভাগ বেঁটে) এবং জিনোটাইপ অনুপাত ১:২:১।'
  },
  {
    id: 'life-q-3-2',
    subjectId: 'life_science',
    chapterId: 'life-3',
    question: 'থ্যালাসেমিয়া কোন ধরণের বংশগত রোগ?',
    options: [
      { id: '(i)', text: 'অটোজোম বাহিত প্রচ্ছন্ন রোগ' },
      { id: '(ii)', text: 'X-ক্রোমোজোম বাহিত প্রচ্ছন্ন রোগ' },
      { id: '(iii)', text: 'Y-ক্রোমোজোম বাহিত রোগ' },
      { id: '(iv)', text: 'সংক্রামক রোগ' }
    ],
    correctOptionId: '(i)',
    explanation: 'থ্যালাসেমিয়া অটোজোমাল প্রচ্ছন্ন জিনঘটিত বংশগত রক্তাল্পতার ব্যাধি যা হিমোগ্লোবিন সংশ্লেষণের ত্রুটির কারণে ঘটে।'
  },

  // life-4: অভিব্যক্তি ও অভিযোজন
  {
    id: 'life-q-4-1',
    subjectId: 'life_science',
    chapterId: 'life-4',
    question: '“অর্জিত বৈশিষ্ট্যের বংশানুসরণ” মতবাদের প্রবক্তা কে ছিলেন?',
    options: [
      { id: '(i)', text: 'চার্লস ডারউইন' },
      { id: '(ii)', text: 'জাঁ বাপ্তিস্ত দ্য ল্যামার্ক' },
      { id: '(iii)', text: 'হুগো দ্য ভ্রিস' },
      { id: '(iv)', text: 'গ্রেগর মেন্ডেল' }
    ],
    correctOptionId: '(ii)',
    explanation: 'ফরাসি প্রকৃতিবিদ ল্যামার্ক তাঁর ‘ফিলোজফিক জুওলজিক’ গ্রন্থে অঙ্গের ব্যবহার-অপব্যবহার ও অর্জিত বৈশিষ্ট্যের বংশানুসরণ সূত্র প্রকাশ করেন।'
  },
  {
    id: 'life-q-4-2',
    subjectId: 'life_science',
    chapterId: 'life-4',
    question: 'পায়রার ফুসফুসের সাথে কয়টি বায়ুথলি (Air sacs) যুক্ত থাকে?',
    options: [
      { id: '(i)', text: '৭টি' },
      { id: '(ii)', text: '৯টি' },
      { id: '(iii)', text: '১১টি' },
      { id: '(iv)', text: '৫টি' }
    ],
    correctOptionId: '(ii)',
    explanation: 'পায়রার ওড়ার সময় দ্বৈত শ্বাসকার্য চালাতে ফুসফুসের সাথে অতিরিক্ত ৯টি বায়ুথলি যুক্ত থাকে।'
  },

  // life-5: পরিবেশ, তার সম্পদ এবং তার সংরক্ষণ
  {
    id: 'life-q-5-1',
    subjectId: 'life_science',
    chapterId: 'life-5',
    question: 'ভারতের প্রথম জাতীয় উদ্যান (National Park) কোনটি?',
    options: [
      { id: '(i)', text: 'কাজিরাঙা' },
      { id: '(ii)', text: 'করবেট জাতীয় উদ্যান (Corbett)' },
      { id: '(iii)', text: 'সুন্দরবন' },
      { id: '(iv)', text: 'গির' }
    ],
    correctOptionId: '(ii)',
    explanation: '১৯৩৬ সালে উত্তরাখণ্ডে প্রতিষ্ঠিত জিম করবেট জাতীয় উদ্যান ভারতের প্রথম জাতীয় উদ্যান।'
  },
  {
    id: 'life-q-5-2',
    subjectId: 'life_science',
    chapterId: 'life-5',
    question: 'নাইট্রোজেন চক্রে নাইট্রিফিকেশনে সাহায্যকারী একটি ব্যাকটিরিয়া কোনটি?',
    options: [
      { id: '(i)', text: 'সিউডোমোনাস' },
      { id: '(ii)', text: 'নাইট্রোসোমোনাস বা নাইট্রোব্যাকটর' },
      { id: '(iii)', text: 'ক্লসট্রিডিয়াম' },
      { id: '(iv)', text: 'অ্যাজোটোব্যাকটর' }
    ],
    correctOptionId: '(ii)',
    explanation: 'নাইট্রোসোমোনাস অ্যামোনিয়াকে নাইট্রাইটে এবং নাইট্রোব্যাকটর নাইট্রাইটকে নাইট্রেটে রূপান্তরিত করে।'
  }
];
