import { Question } from '../../types';

export const MATH_QUESTIONS: Question[] = [
  // math-1: একচলবিশিষ্ট দ্বিঘাত সমীকরণ
  {
    id: 'math-q-1-1',
    subjectId: 'mathematics',
    chapterId: 'math-1',
    question: 'ax² + bx + c = 0 (a ≠ 0) দ্বিঘাত সমীকরণের বীজদ্বয় সমান ও বাস্তব হওয়ার শর্ত কী?',
    options: [
      { id: '(i)', text: 'b² - 4ac > 0' },
      { id: '(ii)', text: 'b² - 4ac = 0' },
      { id: '(iii)', text: 'b² - 4ac < 0' },
      { id: '(iv)', text: 'b + c = a' }
    ],
    correctOptionId: '(ii)',
    explanation: 'নিরূপক (Discriminant) D = b² - 4ac = 0 হলে দ্বিঘাত সমীকরণের বীজ দুটি বাস্তব ও সমান হয়।'
  },
  {
    id: 'math-q-1-2',
    subjectId: 'mathematics',
    chapterId: 'math-1',
    question: 'x² - 7x + 12 = 0 সমীকরণের বীজদ্বয় কত কত?',
    options: [
      { id: '(i)', text: '3 এবং 4' },
      { id: '(ii)', text: '-3 এবং -4' },
      { id: '(iii)', text: '2 এবং 6' },
      { id: '(iv)', text: '1 এবং 12' }
    ],
    correctOptionId: '(i)',
    explanation: 'x² - 3x - 4x + 12 = 0 => (x - 3)(x - 4) = 0 => x = 3 বা x = 4।'
  },

  // math-2: সরল সুদকষা
  {
    id: 'math-q-2-1',
    subjectId: 'mathematics',
    chapterId: 'math-2',
    question: 'সরল সুদের সূত্র I = Pnr/100 এ ‘n’ বা ‘t’ কী নির্দেশ করে?',
    options: [
      { id: '(i)', text: 'মাস সংখ্যা' },
      { id: '(ii)', text: 'বছর সংখ্যা' },
      { id: '(iii)', text: 'দিন সংখ্যা' },
      { id: '(iv)', text: 'সুদের শতকরা হার' }
    ],
    correctOptionId: '(ii)',
    explanation: 'সরল সুদের প্রমিত গাণিতিক সূত্রে সময় সর্বদা বছর এককে (Years) পরিমাপ করা হয়।'
  },
  {
    id: 'math-q-2-2',
    subjectId: 'mathematics',
    chapterId: 'math-2',
    question: 'কোনো মূলধন বার্ষিক 10% সরল সুদের হারে কত বছরে দ্বিগুণ হবে?',
    options: [
      { id: '(i)', text: '5 বছরে' },
      { id: '(ii)', text: '10 বছরে' },
      { id: '(iii)', text: '15 বছরে' },
      { id: '(iv)', text: '20 বছরে' }
    ],
    correctOptionId: '(ii)',
    explanation: 'আসল P হলে সুদ I = P। অতএব t = (100 × I) / (P × r) = (100 × P) / (P × 10) = 10 বছর।'
  },

  // math-3: বৃত্ত সম্পর্কিত উপপাদ্য
  {
    id: 'math-q-3-1',
    subjectId: 'mathematics',
    chapterId: 'math-3',
    question: 'বৃত্তের কেন্দ্র থেকে কোনো জ্যা (যা ব্যাস নয়)-এর ওপর অঙ্কিত লম্ব জ্যা-টিকে কী করে?',
    options: [
      { id: '(i)', text: 'ত্রিখণ্ডিত করে' },
      { id: '(ii)', text: 'সমদ্বিখণ্ডিত করে' },
      { id: '(iii)', text: 'দ্বিগুণ করে' },
      { id: '(iv)', text: 'অর্ধেক করে না' }
    ],
    correctOptionId: '(ii)',
    explanation: 'উপপাদ্য ৩২ অনুসারে: ব্যাস নয় এরূপ কোনো জ্যা-এর ওপর বৃত্তের কেন্দ্র থেকে লম্ব অঙ্কন করলে ওই লম্ব জ্যা-টিকে সমদ্বিখণ্ডিত করে।'
  },

  // math-4: আয়তঘন
  {
    id: 'math-q-4-1',
    subjectId: 'mathematics',
    chapterId: 'math-4',
    question: 'একটি ঘনকের কর্ণের দৈর্ঘ্য 4√3 সেমি হলে তার সমগ্রতলের ক্ষেত্রফল কত?',
    options: [
      { id: '(i)', text: '64 বর্গ সেমি' },
      { id: '(ii)', text: '96 বর্গ সেমি' },
      { id: '(iii)', text: '48 বর্গ সেমি' },
      { id: '(iv)', text: '36 বর্গ সেমি' }
    ],
    correctOptionId: '(ii)',
    explanation: 'ঘনকের কর্ণ = a√3 = 4√3 => বাহু a = 4 সেমি। সমগ্রতলের ক্ষেত্রফল = 6a² = 6 × 4² = 6 × 16 = 96 বর্গ সেমি।'
  },

  // math-5: অনুপাত ও সমানুপাত
  {
    id: 'math-q-5-1',
    subjectId: 'mathematics',
    chapterId: 'math-5',
    question: 'a : b = 2 : 3 এবং b : c = 4 : 5 হলে a : b : c এর মান কত?',
    options: [
      { id: '(i)', text: '8 : 12 : 15' },
      { id: '(ii)', text: '2 : 4 : 5' },
      { id: '(iii)', text: '8 : 10 : 15' },
      { id: '(iv)', text: '6 : 9 : 15' }
    ],
    correctOptionId: '(i)',
    explanation: 'b-এর মান সমতা বিধান করে: a : b = 8 : 12 এবং b : c = 12 : 15, সুতরাং a : b : c = 8 : 12 : 15।'
  },

  // math-6: চক্রবৃদ্ধি সুদ ও সমহার বৃদ্ধি বা হ্রাস
  {
    id: 'math-q-6-1',
    subjectId: 'mathematics',
    chapterId: 'math-6',
    question: 'বার্ষিক r% চক্রবৃদ্ধি সুদের হারে P টাকার n বছরের সমূল চক্রবৃদ্ধি (A) কত?',
    options: [
      { id: '(i)', text: 'P(1 + r/100)ⁿ' },
      { id: '(ii)', text: 'P(1 - r/100)ⁿ' },
      { id: '(iii)', text: 'P + Pnr/100' },
      { id: '(iv)', text: 'P(1 + nr/100)' }
    ],
    correctOptionId: '(i)',
    explanation: 'বার্ষিক চক্রবৃদ্ধি সুদের আদর্শ সমীকরণ হলো A = P(1 + r/100)ⁿ।'
  },

  // math-7: বৃত্তস্থ কোণ সম্পর্কিত উপপাদ্য
  {
    id: 'math-q-7-1',
    subjectId: 'mathematics',
    chapterId: 'math-7',
    question: 'একই বৃত্তচাপের ওপর গঠিত কেন্দ্রস্থ কোণ পরিধিস্থ কোণের কত গুণ?',
    options: [
      { id: '(i)', text: 'সমান' },
      { id: '(ii)', text: 'অর্ধেক' },
      { id: '(iii)', text: 'দ্বিগুণ' },
      { id: '(iv)', text: 'চারগুণ' }
    ],
    correctOptionId: '(iii)',
    explanation: 'উপপাদ্য ৩৪ অনুসারে কোনো বৃত্তের একই বৃত্তচাপের দ্বারা গঠিত সম্মুখ কেন্দ্রস্থ কোণ ওই বৃত্তচাপ দ্বারা গঠিত যেকোনো বৃত্তস্থ কোণের দ্বিগুণ।'
  },

  // math-8: লম্ব বৃত্তাকার চোঙ
  {
    id: 'math-q-8-1',
    subjectId: 'mathematics',
    chapterId: 'math-8',
    question: 'r ব্যাসার্ধ এবং h উচ্চতাবিশিষ্ট নিরেট লম্ব বৃত্তাকার চোঙের মোট আয়তন কত?',
    options: [
      { id: '(i)', text: '2πrh' },
      { id: '(ii)', text: 'πr²h' },
      { id: '(iii)', text: '1/3 πr²h' },
      { id: '(iv)', text: '4/3 πr³' }
    ],
    correctOptionId: '(ii)',
    explanation: 'লম্ব বৃত্তাকার চোঙের আয়তন = ভূমির ক্ষেত্রফল × উচ্চতা = πr²h ঘন একক।'
  },

  // math-9: দ্বিঘাত করণী
  {
    id: 'math-q-9-1',
    subjectId: 'mathematics',
    chapterId: 'math-9',
    question: '(√5 + √3)(√5 - √3) এর সরলতম মান কত?',
    options: [
      { id: '(i)', text: '2' },
      { id: '(ii)', text: '8' },
      { id: '(iii)', text: '√15' },
      { id: '(iv)', text: '4' }
    ],
    correctOptionId: '(i)',
    explanation: '(a + b)(a - b) = a² - b² সূত্র প্রয়োগ করে: (√5)² - (√3)² = 5 - 3 = 2।'
  },

  // math-10: বৃত্তস্থ চতুর্ভুজ সংক্রান্ত উপপাদ্য
  {
    id: 'math-q-10-1',
    subjectId: 'mathematics',
    chapterId: 'math-10',
    question: 'বৃত্তস্থ চতুর্ভুজের বিপরীত কোণদ্বয় পরস্পর কী?',
    options: [
      { id: '(i)', text: 'পূরক কোণ' },
      { id: '(ii)', text: 'সম্পূরক কোণ (সমষ্টি ১৮০°)' },
      { id: '(iii)', text: 'সমান' },
      { id: '(iv)', text: 'সন্নিহিত কোণ' }
    ],
    correctOptionId: '(ii)',
    explanation: 'উপপাদ্য ৩৮ অনুযায়ী বৃত্তস্থ চতুর্ভুজের বিপরীত কোণগুলি পরস্পর সম্পূরক অর্থাৎ এদের সমষ্টি ১৮০° বা দুই সমকোণ।'
  },

  // math-11: সম্পাদ্য: ত্রিভুজের পরিবৃত্ত ও অন্তর্বৃত্ত অঙ্কন
  {
    id: 'math-q-11-1',
    subjectId: 'mathematics',
    chapterId: 'math-11',
    question: 'ত্রিভুজের অন্তর্বৃত্ত অঙ্কন করতে ত্রিভুজের কীসের সমদ্বিখণ্ডক অঙ্কন করতে হয়?',
    options: [
      { id: '(i)', text: 'বাহুগুলির লম্ব সমদ্বিখণ্ডক' },
      { id: '(ii)', text: 'কোণগুলির সমদ্বিখণ্ডক' },
      { id: '(iii)', text: 'মধ্যমাগুলি' },
      { id: '(iv)', text: 'উচ্চতাগুলি' }
    ],
    correctOptionId: '(ii)',
    explanation: 'ত্রিভুজের যেকোনো দুটি কোণের অন্তর্বিখণ্ডকের ছেদবিন্দুই হলো অন্তঃকেন্দ্র (Incentre), যা অন্তর্বৃত্তের কেন্দ্র।'
  },

  // math-12: গোলক
  {
    id: 'math-q-12-1',
    subjectId: 'mathematics',
    chapterId: 'math-12',
    question: 'r ব্যাসার্ধবিশিষ্ট নিরেট গোলকের সমগ্রতলের ক্ষেত্রফল কত?',
    options: [
      { id: '(i)', text: '2πr²' },
      { id: '(ii)', text: '3πr²' },
      { id: '(iii)', text: '4πr²' },
      { id: '(iv)', text: '4/3 πr³' }
    ],
    correctOptionId: '(iii)',
    explanation: 'নিরেট গোলকের বক্রতল বা সমগ্রতলের ক্ষেত্রফল = 4πr² বর্গ একক।'
  },

  // math-13: ভেদ
  {
    id: 'math-q-13-1',
    subjectId: 'mathematics',
    chapterId: 'math-13',
    question: 'x ∝ y হলে নিচের কোনটি সর্বদা ধ্রুবক হবে?',
    options: [
      { id: '(i)', text: 'x + y' },
      { id: '(ii)', text: 'xy' },
      { id: '(iii)', text: 'x / y' },
      { id: '(iv)', text: 'x² - y²' }
    ],
    correctOptionId: '(iii)',
    explanation: 'সরল ভেদে x = ky (যেখানে k অশূন্য ভেদ ধ্রুবক), ফলে x / y = k (ধ্রুবক)।'
  },

  // math-14: অংশীদারি কারবার
  {
    id: 'math-q-14-1',
    subjectId: 'mathematics',
    chapterId: 'math-14',
    question: 'অংশীদারি ব্যবসায় কোনো চুক্তি না থাকলে অর্জিত লভ্যাংশ কীভাবে বণ্টিত হয়?',
    options: [
      { id: '(i)', text: 'সমান ভাগে' },
      { id: '(ii)', text: 'মূলধনের অনুপাতে' },
      { id: '(iii)', text: 'বয়সের অনুপাতে' },
      { id: '(iv)', text: 'কাজের ভিত্তিতে' }
    ],
    correctOptionId: '(ii)',
    explanation: 'অংশীদারি কারবারের সাধারণ নিয়ম অনুসারে চুক্তি না থাকলে অংশীদারদের নিয়োজিত মূলধনের অনুপাতে লভ্যাংশ বণ্টিত হয়।'
  },

  // math-15: বৃত্তের স্পর্শক সংক্রান্ত উপপাদ্য
  {
    id: 'math-q-15-1',
    subjectId: 'mathematics',
    chapterId: 'math-15',
    question: 'বৃত্তের কোনো বিন্দুতে স্পর্শক এবং স্পর্শবিন্দুগামী ব্যাসার্ধ পরস্পরের ওপর কীভাবে অবস্থান করে?',
    options: [
      { id: '(i)', text: 'সমান্তরালভাবে' },
      { id: '(ii)', text: 'লম্বভাবে (৯০° কোণে)' },
      { id: '(iii)', text: '৪৫° কোণে' },
      { id: '(iv)', text: '৬০° কোণে' }
    ],
    correctOptionId: '(ii)',
    explanation: 'উপপাদ্য ৪০ অনুসারে বৃত্তের স্পর্শবিন্দুগামী ব্যাসার্ধ এবং স্পর্শক পরস্পর লম্বভাবে অবস্থান করে।'
  },

  // math-16: লম্ব বৃত্তাকার শঙ্কু
  {
    id: 'math-q-16-1',
    subjectId: 'mathematics',
    chapterId: 'math-16',
    question: 'লম্ব বৃত্তাকার শঙ্কুর উচ্চতা h, ব্যাসার্ধ r এবং তির্যক উচ্চতা l এর মধ্যে সঠিক সম্পর্ক কোনটি?',
    options: [
      { id: '(i)', text: 'l² = h² + r²' },
      { id: '(ii)', text: 'l = h + r' },
      { id: '(iii)', text: 'h² = l² + r²' },
      { id: '(iv)', text: 'r² = l² + h²' }
    ],
    correctOptionId: '(i)',
    explanation: 'পিথাগোরাসের উপপাদ্য থেকে শঙ্কুর ক্ষেত্রে অতিভুজ l, ভূমি r ও লম্ব h হওয়ায় l² = h² + r²।'
  },

  // math-17: সম্পাদ্য: বৃত্তের স্পর্শক অঙ্কন
  {
    id: 'math-q-17-1',
    subjectId: 'mathematics',
    chapterId: 'math-17',
    question: 'বৃত্তের বহিঃস্থ কোনো নির্দিষ্ট বিন্দু থেকে বৃত্তের ওপর সর্বাধিক কয়টি স্পর্শক অঙ্কন করা যায়?',
    options: [
      { id: '(i)', text: '১টি' },
      { id: '(ii)', text: '২টি' },
      { id: '(iii)', text: '৩টি' },
      { id: '(iv)', text: 'অসংখ্য' }
    ],
    correctOptionId: '(ii)',
    explanation: 'বৃত্তের বহিঃস্থ কোনো বিন্দু থেকে ওই বৃত্তে সর্বাধিক দুটি স্পর্শক অঙ্কন করা যায় এবং এদের দৈর্ঘ্য সমান হয়।'
  },

  // math-18: সদৃশ্যতা
  {
    id: 'math-q-18-1',
    subjectId: 'mathematics',
    chapterId: 'math-18',
    question: 'দুটি সদৃশ ত্রিভুজের অনুরূপ বাহুগুলির অনুপাত 3 : 5 হলে তাদের ক্ষেত্রফলের অনুপাত কত?',
    options: [
      { id: '(i)', text: '3 : 5' },
      { id: '(ii)', text: '9 : 25' },
      { id: '(iii)', text: '6 : 10' },
      { id: '(iv)', text: '27 : 125' }
    ],
    correctOptionId: '(ii)',
    explanation: 'দুটি সদৃশ ত্রিভুজের ক্ষেত্রফলের অনুপাত তাদের অনুরূপ বাহুর বর্গের অনুপাতের সমান, অর্থাৎ 3² : 5² = 9 : 25।'
  },

  // math-19: বিভিন্ন ঘনবস্তু সংক্রান্ত বাস্তব সমস্যা
  {
    id: 'math-q-19-1',
    subjectId: 'mathematics',
    chapterId: 'math-19',
    question: 'একটি নিরেট লোহার গোলক গলিয়ে একাধিক ছোট গোলক তৈরি করা হলে বস্তুর মোট কী অপরিবর্তিত থাকে?',
    options: [
      { id: '(i)', text: 'বক্রতলের ক্ষেত্রফল' },
      { id: '(ii)', text: 'মোট আয়তন' },
      { id: '(iii)', text: 'ব্যাসার্ধ' },
      { id: '(iv)', text: 'উচ্চতা' }
    ],
    correctOptionId: '(ii)',
    explanation: 'কোনো ঘনবস্তু গলিয়ে অন্য ঘনবস্তুতে রূপান্তরিত করলে তাদের মোট উপাদান বা আয়তন সর্বদা অপরিবর্তিত ও সংরক্ষিত থাকে।'
  },

  // math-20: ত্রিকোণমিতি: কোণ পরিমাপের ধারণা
  {
    id: 'math-q-20-1',
    subjectId: 'mathematics',
    chapterId: 'math-20',
    question: '১ রেডিয়ান (1ᶜ) কোণের মান প্রায় কত ডিগ্রির সমান?',
    options: [
      { id: '(i)', text: '৫৭° ১৬′ ২২″' },
      { id: '(ii)', text: '৬০°' },
      { id: '(iii)', text: '৪৫° ২০′ ১০″' },
      { id: '(iv)', text: '৯০°' }
    ],
    correctOptionId: '(i)',
    explanation: '১ রেডিয়ান = ১৮০°/π = ১৮০°/(২২/৭) ≈ ৫৭° ১৬′ ২২″ (প্রায়)।'
  },

  // math-21: সম্পাদ্য: মধ্যসমানুপাতী নির্ণয়
  {
    id: 'math-q-21-1',
    subjectId: 'mathematics',
    chapterId: 'math-21',
    question: 'জ্যামিতিক পদ্ধতিতে √12 বা মধ্যসমানুপাতী নির্ণয় করতে কোন জ্যামিতিক চিত্রটি প্রধানত অঙ্কন করা হয়?',
    options: [
      { id: '(i)', text: 'অর্ধবৃত্ত' },
      { id: '(ii)', text: 'রম্বস' },
      { id: '(iii)', text: 'ট্রাপিজিয়াম' },
      { id: '(iv)', text: 'সুষম ষড়ভুজ' }
    ],
    correctOptionId: '(i)',
    explanation: 'সরলরেখাংশকে ব্যাস করে অর্ধবৃত্ত অঙ্কন করে স্পর্শবিন্দু বা সংযোগবিন্দু থেকে লম্ব তুলে মধ্যসমানুপাতী দৈর্ঘ্য পাওয়া যায়।'
  },

  // math-22: পিথাগোরাসের উপপাদ্য
  {
    id: 'math-q-22-1',
    subjectId: 'mathematics',
    chapterId: 'math-22',
    question: 'একটি সমকোণী ত্রিভুজের লম্ব 6 সেমি এবং ভূমি 8 সেমি হলে অতিভুজের দৈর্ঘ্য কত?',
    options: [
      { id: '(i)', text: '10 সেমি' },
      { id: '(ii)', text: '14 সেমি' },
      { id: '(iii)', text: '12 সেমি' },
      { id: '(iv)', text: '9 সেমি' }
    ],
    correctOptionId: '(i)',
    explanation: 'পিথাগোরাসের সূত্রানুযায়ী: অতিভুজ = √(6² + 8²) = √(36 + 64) = √100 = 10 সেমি।'
  },

  // math-23: ত্রিকোণমিতিক অনুপাত এবং ত্রিকোণমিতিক অভেদাবলি
  {
    id: 'math-q-23-1',
    subjectId: 'mathematics',
    chapterId: 'math-23',
    question: 'sin²θ + cos²θ এর মান সর্বদা কত?',
    options: [
      { id: '(i)', text: '0' },
      { id: '(ii)', text: '1' },
      { id: '(iii)', text: '2' },
      { id: '(iv)', text: '-1' }
    ],
    correctOptionId: '(ii)',
    explanation: 'যেকোনো কোণ θ এর জন্য মৌলিক ত্রিকোণমিতিক অভেদ হলো sin²θ + cos²θ = 1।'
  },

  // math-24: পূরক কোণের ত্রিকোণমিতিক অনুপাত
  {
    id: 'math-q-24-1',
    subjectId: 'mathematics',
    chapterId: 'math-24',
    question: 'sin 53° / cos 37° এর মান কত?',
    options: [
      { id: '(i)', text: '0' },
      { id: '(ii)', text: '1' },
      { id: '(iii)', text: '2' },
      { id: '(iv)', text: 'tan 53°' }
    ],
    correctOptionId: '(ii)',
    explanation: 'পূরক কোণের সূত্রে sin 53° = sin(90° - 37°) = cos 37°। অতএব cos 37° / cos 37° = 1।'
  },

  // math-25: ত্রিকোণমিতির প্রয়োগ: উচ্চতা ও দূরত্ব
  {
    id: 'math-q-25-1',
    subjectId: 'mathematics',
    chapterId: 'math-25',
    question: 'একটি স্তম্ভের উচ্চতা ও তার ছায়ার দৈর্ঘ্য সমান হলে সূর্যের উন্নতি কোণ কত?',
    options: [
      { id: '(i)', text: '30°' },
      { id: '(ii)', text: '45°' },
      { id: '(iii)', text: '60°' },
      { id: '(iv)', text: '90°' }
    ],
    correctOptionId: '(ii)',
    explanation: 'tan θ = লম্ব / ভূমি। যেহেতু লম্ব = ভূমি, তাই tan θ = 1 => θ = 45°।'
  },

  // math-26: পরিসংখ্যান: গড়, মধ্যমা, ওজাইভ, সংখ্যাগুরু মান
  {
    id: 'math-q-26-1',
    subjectId: 'mathematics',
    chapterId: 'math-26',
    question: 'গড়, মধ্যমা এবং সংখ্যাগুরু মানের মধ্যে আনুমানিক পরীক্ষামূলক সম্পর্কটি কী?',
    options: [
      { id: '(i)', text: 'সংখ্যাগুরু মান = 3 মধ্যমা - 2 গড়' },
      { id: '(ii)', text: 'মধ্যমা = 3 সংখ্যাগুরু মান - 2 গড়' },
      { id: '(iii)', text: 'গড় = 3 মধ্যমা - 2 সংখ্যাগুরু মান' },
      { id: '(iv)', text: 'সংখ্যাগুরু মান = মধ্যমা + গড়' }
    ],
    correctOptionId: '(i)',
    explanation: 'পরিসংখ্যানে পিয়ারসনের পরীক্ষালব্ধ সূত্রানুসারে Mode = 3 Median - 2 Mean (সংখ্যাগুরু মান = 3 মধ্যমা - 2 গড়)।'
  }
];
