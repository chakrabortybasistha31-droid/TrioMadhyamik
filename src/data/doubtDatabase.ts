import { VisualType } from '../components/VisualDoubtRenderer';

export interface VisualDoubtItem {
  id: string;
  subjectName: string;
  chapterName: string;
  questionBn: string;
  scientificTermEn: string;
  visualType: VisualType;
  visualTitleBn: string;
  visualCaptionBn: string;
  explanationStepsBn: {
    stepTitleBn: string;
    stepEn?: string;
    detailsBn: string;
  }[];
  importantTermsWithEn: { bn: string; en: string }[];
  examTipBn: string;
  related3DModelId?: string;
  labeledParts?: { id: string; nameBn: string; nameEn?: string; descriptionBn: string }[];
  source?: 'gemini-ai' | 'curated' | 'synthesized';
  keywords: string[];
}

export const CURATED_VISUAL_DOUBTS: VisualDoubtItem[] = [
  {
    id: 'vd-phys-boyle',
    subjectName: 'ভৌতবিজ্ঞান ও পরিবেশ',
    chapterName: 'গ্যাসের আচরণ',
    questionBn: 'বয়েলের সূত্রে P-V লেখচিত্র কেন সমপরাবৃত্ত (Rectangular Hyperbola) হয় এবং এর তাৎপর্য কী?',
    scientificTermEn: "Boyle's Law Isothermal P-V Relationship (Hyperbolic Curves)",
    visualType: 'boyles_law',
    visualTitleBn: 'বয়েলের সূত্রের P-V লেখচিত্র (সমপরাবৃত্তাকার আইসোথার্ম)',
    visualCaptionBn: 'উষ্ণতা স্থির থাকলে চাপ (P) বাড়লে আয়তন (V) কমে, ফলে P-V লেখচিত্রটি সমপরাবৃত্ত (PV = k) হয়।',
    explanationStepsBn: [
      {
        stepTitleBn: '১. সূত্রের মূল বিবৃতি',
        stepEn: "Boyle's Law Statement",
        detailsBn: 'নির্দিষ্ট ভরের কোনো গ্যাসের তাপমাত্রা স্থির থাকলে, গ্যাসটির আয়তন (V) তার ওপর প্রযুক্ত চাপের (P) সঙ্গে ব্যস্তানুপাতে পরিবর্তিত হয়, অর্থাৎ V ∝ 1/P।'
      },
      {
        stepTitleBn: '২. গাণিতিক প্রকাশ ও সমীকরণ',
        stepEn: 'Mathematical Equation (PV = Constant)',
        detailsBn: 'V = k / P  বা  P × V = k (ধ্রুবক)। এটি বিশ্লেষণী জ্যামিতির সমপরাবৃত্তের সমীকরণ (xy = c²)-এর সমতুল্য।'
      },
      {
        stepTitleBn: '৩. লেখচিত্রের প্রকৃতি বিশ্লেষণ',
        stepEn: 'Isotherm (সমোষ্ণ রেখা)',
        detailsBn: 'যেহেতু চাপ ও আয়তনের গুণফল সর্বদাই স্থির থাকে, তাই চাপ বৃদ্ধি করলে আয়তন দ্রুত কমে এবং অক্ষদ্বয়কে কখনোই স্পর্শ না করে একটি মসৃণ বক্ররেখা সৃষ্টি করে যাকে সমপরাবৃত্ত বলে।'
      }
    ],
    importantTermsWithEn: [
      { bn: 'সমপরাবৃত্ত', en: 'Rectangular Hyperbola' },
      { bn: 'সমোষ্ণ রেখা', en: 'Isotherm' },
      { bn: 'ব্যস্তানুপাতিক সম্পর্ক', en: 'Inversely Proportional' },
      { bn: 'গ্যাস ধ্রুবক', en: 'Constant (k)' }
    ],
    examTipBn: 'মাধ্যমিকে P-V লেখচিত্র অঙ্কনের সময় অক্ষ দুটির নাম (চাপ P উল্লম্ব অক্ষে এবং আয়তন V অনুভূমিক অক্ষে) সঠিকভাবে লিখবে। লেখচিত্রের রেখাটি যেন কোনো অক্ষকে স্পর্শ না করে।',
    related3DModelId: 'atom',
    keywords: ['বয়েল', 'boyle', 'p-v', 'চাপ', 'আয়তন', 'গ্যাস', 'সমপরাবৃত্ত', 'hyperbola']
  },
  {
    id: 'vd-phys-charles',
    subjectName: 'ভৌতবিজ্ঞান ও পরিবেশ',
    chapterName: 'গ্যাসের আচরণ',
    questionBn: 'চার্লসের সূত্রে V-t লেখচিত্র কীভাবে পরম শূন্য তাপমাত্রা (-২৭৩°C)-র অস্তিত্ব প্রমাণ করে?',
    scientificTermEn: "Charles's Law V-t Graph & Absolute Zero (-273°C)",
    visualType: 'charles_law',
    visualTitleBn: 'চার্লসের সূত্রের V-t লেখচিত্র এবং পরম শূন্য তাপমাত্রা',
    visualCaptionBn: 'V-t সরলরেখাটি পেছনের দিকে বর্ধিত করলে তা উষ্ণতা অক্ষকে -২৭৩°C বিন্দুতে ছেদ করে, যেখানে তাত্ত্বিকভাবে গ্যাসের আয়তন শূন্য হয়।',
    explanationStepsBn: [
      {
        stepTitleBn: '১. চার্লসের মূল সমীকরণ',
        stepEn: "Charles's Law Equation",
        detailsBn: 't°C উষ্ণতায় নির্দিষ্ট ভরের গ্যাসের আয়তন V_t = V₀(1 + t/273), যেখানে V₀ হলো ০°C উষ্ণতায় গ্যাসের আয়তন।'
      },
      {
        stepTitleBn: '২. পরম শূন্য তাপমাত্রার নির্ণয়',
        stepEn: 'Derivation of Absolute Zero',
        detailsBn: 'যদি t = -273°C হয়, তবে V_t = V₀(1 - 273/273) = V₀(1 - 1) = ০। অর্থাৎ -২৭৩°C উষ্ণতায় সব গ্যাসের আয়তন তাত্ত্বিকভাবে শূন্য হয়ে যায়।'
      },
      {
        stepTitleBn: '৩. কেলভিন স্কেলের ভিত্তি',
        stepEn: 'Kelvin Absolute Temperature Scale',
        detailsBn: '-২৭৩°C-কে শূন্য ধরে বিজ্ঞানী লর্ড কেলভিন পরম তাপমাত্রা স্কেল চালু করেন। কেলভিন স্কেলে গ্যাসের আয়তন সরাসরি পরম তাপমাত্রার সমানুপাতিক (V ∝ T)।'
      }
    ],
    importantTermsWithEn: [
      { bn: 'পরম শূন্য তাপমাত্রা', en: 'Absolute Zero (-273.15°C)' },
      { bn: 'পরম উষ্ণতা স্কেল', en: 'Kelvin Absolute Scale' },
      { bn: 'আয়তন গুণাঙ্ক', en: 'Volume Coefficient' }
    ],
    examTipBn: 'সংজ্ঞায় "স্থির চাপে নির্দিষ্ট ভরের" কথাটি না লিখলে পুরো নম্বর কাটা যায়। লেখচিত্রে -২৭৩°C বিন্দুটি ড্যাশ ড্যাশ রেখা দিয়ে স্পষ্ট দেখাবে।',
    keywords: ['চার্লস', 'charles', 'v-t', 'পরম শূন্য', 'absolute zero', '-273', 'কেলভিন']
  },
  {
    id: 'vd-phys-ohm',
    subjectName: 'ভৌতবিজ্ঞান ও পরিবেশ',
    chapterName: 'চলতড়িৎ',
    questionBn: 'ওহমের সূত্রের V-I লেখচিত্রটি কী রূপ ধারণ করে এবং এর নতি (Slope) থেকে কী জানা যায়?',
    scientificTermEn: "Ohm's Law V-I Characteristic Graph (Resistance Slope)",
    visualType: 'ohms_law',
    visualTitleBn: 'ওহমের সূত্রের V-I লেখচিত্র (মূলবিন্দুগামী সরলরেখা)',
    visualCaptionBn: 'ধাতব ওহমীয় পরিবাহীর ক্ষেত্রে V-I লেখচিত্র মূলবিন্দুগামী সরলরেখা হয়; এর নতি (ΔV/ΔI) পরিবাহীর রোধ (R) নির্দেশ করে।',
    explanationStepsBn: [
      {
        stepTitleBn: '১. ওহমের সূত্র বিবৃতি',
        stepEn: "Ohm's Law Statement",
        detailsBn: 'উষ্ণতা ও অন্যান্য ভৌত অবস্থা অপরিবর্তিত থাকলে, কোনো পরিবাহীর মধ্য দিয়ে তড়িৎপ্রবাহমাত্রা (I) ওই পরিবাহীর দুই প্রান্তের বিভবপ্রভেদের (V) সমানুপাতিক।'
      },
      {
        stepTitleBn: '২. গাণিতিক সূত্র ও রোধের ধারণা',
        stepEn: 'Formula: V = IR (Resistance)',
        detailsBn: 'V ∝ I  বা  V = IR, যেখানে R হলো পরিবাহীর রোধ (Resistance)।'
      },
      {
        stepTitleBn: '৩. লেখচিত্রের নতি ও তাৎপর্য',
        stepEn: 'Slope Calculation (tan θ = R)',
        detailsBn: 'উল্লম্ব অক্ষে V এবং অনুভূমিক অক্ষে I স্থাপন করলে লেখচিত্রটি একটি সরলরেখা হয় যা মূলবিন্দু (0,0) দিয়ে যায়। এর নতি m = ΔV / ΔI = R।'
      }
    ],
    importantTermsWithEn: [
      { bn: 'বিভবপ্রভেদ', en: 'Potential Difference (V)' },
      { bn: 'তড়িৎপ্রবাহমাত্রা', en: 'Electric Current (I)' },
      { bn: 'রোধ', en: 'Resistance (R)' },
      { bn: 'ওহমীয় পরিবাহী', en: 'Ohmic Conductor' }
    ],
    examTipBn: 'মনে রাখবে: যদি Y-অক্ষে I এবং X-অক্ষে V দেওয়া হয়, তবে লেখচিত্রের নতি হবে পরিবাহিতা (Conductance, 1/R)। পরীক্ষার প্রশ্নে অক্ষ দুটি ভালো করে লক্ষ্য করবে।',
    keywords: ['ওহম', 'ohm', 'চলতড়িৎ', 'v=ir', 'রোধ', 'বিভবপ্রভেদ', 'slope', 'কারেন্ট']
  },
  {
    id: 'vd-math-quadratic',
    subjectName: 'গণিত',
    chapterName: 'একচলবিশিষ্ট দ্বিঘাত সমীকরণ',
    questionBn: 'দ্বিঘাত সমীকরণ ax² + bx + c = 0-এর নিরূপক কীভাবে বীজের প্রকৃতি ও প্যারাবোলা গ্রাফ নির্ধারণ করে?',
    scientificTermEn: 'Quadratic Equation Roots & Parabolic Discriminant Graph',
    visualType: 'quadratic_parabola',
    visualTitleBn: 'দ্বিঘাত সমীকরণের প্যারাবোলা লেখচিত্র ও নিরূপকের ভূমিকা',
    visualCaptionBn: 'y = ax² + bx + c একটি অধিবৃত্ত (Parabola)। X-অক্ষকে যেখানে ছেদ করে সেই বিন্দুগুলিই সমীকরণের বাস্তব বীজ (α ও β)।',
    explanationStepsBn: [
      {
        stepTitleBn: '১. নিরূপক (Discriminant)',
        stepEn: 'Discriminant Formula D = b² - 4ac',
        detailsBn: 'শ্রীধর আচার্যের সূত্রে বর্গমূলের ভেতরের রাশি D = b² - 4ac-কে নিরূপক বলে, কারণ এটি বীজের প্রকৃতি নির্ণয় করে।'
      },
      {
        stepTitleBn: '২. নিরূপকের তিনটি প্রধান শর্ত',
        stepEn: 'Three Critical Conditions',
        detailsBn: '• D > 0: বীজদ্বয় বাস্তব ও অসমান (প্যারাবোলা X-অক্ষকে দুটি পৃথক বিন্দুতে ছেদ করে)।\n• D = 0: বীজদ্বয় বাস্তব ও সমান (প্যারাবোলা X-অক্ষকে একটি বিন্দুতে স্পর্শ করে)।\n• D < 0: কোনো বাস্তব বীজ নেই (প্যারাবোলা X-অক্ষকে স্পর্শ বা ছেদ করে না)।'
      },
      {
        stepTitleBn: '৩. শীর্ষবিন্দু ও প্রতিসাম্য অক্ষ',
        stepEn: 'Vertex Coordinates (-b/2a, -D/4a)',
        detailsBn: 'প্যারাবোলার শীর্ষবিন্দু হলো (-b/2a, -D/4a)। a > 0 হলে প্যারাবোলা ঊর্ধ্বমুখী (U-shaped) হয়।'
      }
    ],
    importantTermsWithEn: [
      { bn: 'নিরূপক', en: 'Discriminant (D = b² - 4ac)' },
      { bn: 'শ্রীধর আচার্যের সূত্র', en: "Sridhara Acharya's Quadratic Formula" },
      { bn: 'অধিবৃত্ত', en: 'Parabola' },
      { bn: 'বাস্তব ও সমান বীজ', en: 'Real & Equal Roots' }
    ],
    examTipBn: 'মাধ্যমিকে "kx² + 2x + 1 = 0 সমীকরণের বীজদ্বয় সমান হলে k = ?" এমন প্রশ্ন এলে সরাসরি b² - 4ac = 0 বসিয়ে k নির্ণয় করবে।',
    keywords: ['দ্বিঘাত', 'quadratic', 'নিরূপক', 'discriminant', 'প্যারাবোলা', 'বীজ', 'গণিত']
  },
  {
    id: 'vd-life-reflex',
    subjectName: 'জীবনবিজ্ঞান',
    chapterName: 'জীবজগতে নিয়ন্ত্রণ ও সমন্বয়',
    questionBn: 'একটি আদর্শ প্রতিবর্ত চাপের (Reflex Arc) ৫টি প্রধান অংশ কী কী এবং স্নায়ুস্পন্দনের প্রবাহপথ লেখো।',
    scientificTermEn: 'Reflex Arc Anatomy & Five-Component Neural Pathway',
    visualType: 'reflex_arc',
    visualTitleBn: 'প্রতিবর্ত চাপের স্নায়বিক প্রবাহপথ (Reflex Arc Flowchart)',
    visualCaptionBn: 'উদ্দীপনা গ্রাহক থেকে সংজ্ঞাবহ নিউরন দিয়ে সুষুম্নাকাণ্ডে যায় এবং চেষ্টীয় নিউরনের মাধ্যমে কারকে পৌঁছে প্রতিক্রিয়া ঘটায়।',
    explanationStepsBn: [
      {
        stepTitleBn: '১. গ্রাহক (Receptor)',
        stepEn: 'Receptor Organ',
        detailsBn: 'পরিবেশ থেকে নির্দিষ্ট উদ্দীপনা গ্রহণকারী অঙ্গ বা কোশ (যেমন ত্বকের স্পর্শগ্রাহক বা তাপগ্রাহক)।'
      },
      {
        stepTitleBn: '২. সংজ্ঞাবহ / অন্তর্মুখী নিউরন',
        stepEn: 'Sensory / Afferent Neuron',
        detailsBn: 'গ্রাহক থেকে উদ্দীপনা স্নায়ুস্পন্দন রূপে কেন্দ্রীয় স্নায়ুতন্ত্রে (সুষুম্নাকাণ্ডে) বহন করে নিয়ে যায়।'
      },
      {
        stepTitleBn: '৩. স্নায়ুকেন্দ্র (Nerve Center)',
        stepEn: 'Spinal Cord Interneuron Center',
        detailsBn: 'সুষুম্নাকাণ্ডের ধূসর পদার্থে অবস্থিত সংযোগকারী নিউরন, যা সংকেত বিশ্লেষণ করে প্রতিক্রিয়া তৈরি করে।'
      },
      {
        stepTitleBn: '৪. আজ্ঞাবহ / বহির্মুখী নিউরন',
        stepEn: 'Motor / Efferent Neuron',
        detailsBn: 'স্নায়ুকেন্দ্র থেকে নির্দেশবাহী মোটর সংকেত দ্রুত কারক অঙ্গে পৌঁছে দেয়।'
      },
      {
        stepTitleBn: '৫. কারক (Effector)',
        stepEn: 'Effector Organ (Muscle / Gland)',
        detailsBn: 'যে অঙ্গ উদ্দীপনার পরিপ্রেক্ষিতে ক্রিয়া বা প্রতিক্রিয়া সম্পন্ন করে (যেমন হাতের পেশির সংকোচন)।'
      }
    ],
    importantTermsWithEn: [
      { bn: 'প্রতিবর্ত চাপ', en: 'Reflex Arc' },
      { bn: 'অন্তর্মুখী নিউরন', en: 'Afferent / Sensory Neuron' },
      { bn: 'বহির্মুখী নিউরন', en: 'Efferent / Motor Neuron' },
      { bn: 'সুষুম্নাকাণ্ড', en: 'Spinal Cord' }
    ],
    examTipBn: 'জীবনবিজ্ঞানের ৫ নম্বরের প্রশ্নে প্রতিবর্ত চাপের চিহ্নিত চিত্র প্রায়ই আসে। তীরচিহ্ন দিয়ে সংজ্ঞাবহ থেকে চেষ্টীয়র দিকে প্রবাহপথ না দেখালে নম্বর কাটা যাবে।',
    related3DModelId: 'neuron',
    keywords: ['প্রতিবর্ত চাপ', 'reflex arc', 'নিউরন', 'স্নায়ু', 'সুষুম্নাকাণ্ড', 'জীবনবিজ্ঞান']
  },
  {
    id: 'vd-life-mendel',
    subjectName: 'জীবনবিজ্ঞান',
    chapterName: 'বংশগতি এবং কয়েকটি সাধারণ জিনগত রোগ',
    questionBn: 'মেন্ডেলের একসংকর জনন (Monohybrid Cross) পরীক্ষার ফিনোটাইপ ৩:১ এবং জিনোটাইপ ১:২:১ কীভাবে আসে?',
    scientificTermEn: "Mendel's Monohybrid Cross Punnett Square (3:1 and 1:2:1 Ratios)",
    visualType: 'mendel_cross',
    visualTitleBn: 'একসংকর জননের চেকারবোর্ড (Punnett Square) বিশ্লেষণ',
    visualCaptionBn: 'F₁ জনুর সংকর লম্বা (Tt) মটরগাছের স্বপরাগায়ন ঘটালে F₂ জনুতে ৭৫% লম্বা ও ২৫% বেঁটে মটরগাছ উৎপন্ন হয়।',
    explanationStepsBn: [
      {
        stepTitleBn: '১. জনিতৃ জনু (P Generation)',
        stepEn: 'Pure Parents (TT × tt)',
        detailsBn: 'বিশুদ্ধ লম্বা (TT) এবং বিশুদ্ধ বেঁটে (tt) মটরগাছের মধ্যে ইতর পরাগযোগ ঘটানো হয়। উৎপন্ন গ্যামেট T এবং t।'
      },
      {
        stepTitleBn: '২. প্রথম অপত্য জনু (F₁ Generation)',
        stepEn: 'F₁ All Hybrid Tall (Tt)',
        detailsBn: 'F₁ জনুর সবকটি গাছ সংকর লম্বা (Tt) হয়, কারণ লম্বা বৈশিষ্ট্য (T) বেঁটে বৈশিষ্ট্যের (t) ওপর প্রকট।'
      },
      {
        stepTitleBn: '৩. দ্বিতীয় অপত্য জনু (F₂ Generation)',
        stepEn: 'F₂ Punnett Square Cross',
        detailsBn: 'Tt × Tt স্বপরাগায়নের ফলে চেকারবোর্ডে ৪টি সম্ভাব্য বিন্যাস মেলে: ১টি TT (বিশুদ্ধ লম্বা), ২টি Tt (সংকর লম্বা), এবং ১টি tt (বিশুদ্ধ বেঁটে)।'
      }
    ],
    importantTermsWithEn: [
      { bn: 'একসংকর জনন', en: 'Monohybrid Cross' },
      { bn: 'ফিনোটাইপ অনুপাত', en: 'Phenotypic Ratio (3 Tall : 1 Dwarf)' },
      { bn: 'জিনোটাইপ অনুপাত', en: 'Genotypic Ratio (1 TT : 2 Tt : 1 tt)' },
      { bn: 'প্রকট ও প্রচ্ছন্ন বৈশিষ্ট্য', en: 'Dominant & Recessive Traits' }
    ],
    examTipBn: 'চেকারবোর্ডে পুং গ্যামেট (♂) এবং স্ত্রী গ্যামেট (♀) প্রতীক চিহ্ন সঠিকভাবে দেবে। ফিনোটাইপ ও জিনোটাইপ অনুপাত আলাদা করে স্পষ্ট লিখবে।',
    related3DModelId: 'chromosome',
    keywords: ['মেন্ডেল', 'mendel', 'একসংকর', 'monohybrid', 'ফিনোটাইপ', 'জিনোটাইপ', 'চেকারবোর্ড']
  },
  {
    id: 'vd-geog-rainshadow',
    subjectName: 'ভূগোল',
    chapterName: 'বায়ুমণ্ডল',
    questionBn: 'বৃষ্টিচ্ছায় অঞ্চল (Rain Shadow Area) কীভাবে সৃষ্টি হয় এবং ভারতের প্রধান উদাহরণ কী?',
    scientificTermEn: 'Orographic Precipitation & Rain Shadow Effect (Leeward Slope)',
    visualType: 'rain_shadow',
    visualTitleBn: 'বৃষ্টিচ্ছায় অঞ্চল সৃষ্টির ভূ-প্রাকৃতিক চিত্র (প্রতিবাত বনাম অনুবাত ঢাল)',
    visualCaptionBn: 'জলীয় বাষ্পপূর্ণ বায়ু পর্বতের প্রতিবাত ঢালে বৃষ্টিপাত ঘটায়; অনুবাত ঢালে পৌঁছালে আর্দ্রতাহীন উষ্ণ বায়ু বৃষ্টিহীন বৃষ্টিচ্ছায় অঞ্চল গড়ে তোলে।',
    explanationStepsBn: [
      {
        stepTitleBn: '১. প্রতিবাত ঢালে শৈলোৎক্ষেপ বৃষ্টি',
        stepEn: 'Windward Slope Orographic Rain',
        detailsBn: 'সমুদ্র থেকে আগত আর্দ্র দক্ষিণ-পশ্চিম মৌসুমি বায়ু পর্বতের খাড়া ঢালে বাধা পেয়ে ওপরে উঠে শীতল ও ঘনীভূত হয়ে প্রবল বৃষ্টি ঘটায়।'
      },
      {
        stepTitleBn: '২. অনুবাত ঢালে শুষ্ক বায়ুর অবতরণ',
        stepEn: 'Leeward Descending Warm Air',
        detailsBn: 'পর্বত অতিক্রম করার পর বায়ুর অধিকাংশ জলীয় বাষ্প শেষ হয়ে যায়। অনুবাত ঢাল বেয়ে নামার সময় বায়ুর ওপর চাপ বৃদ্ধি পায় এবং উষ্ণতা বাড়ে, ফলে আপেক্ষিক আর্দ্রতা কমে যায়।'
      },
      {
        stepTitleBn: '৩. ভারতের প্রধান উদাহরণ',
        stepEn: 'Indian Examples (Shillong & Pune)',
        detailsBn: 'মেঘালয়ের মৌসিনরাম-চেরাপুঞ্জিতে বিশ্বরেকর্ড বৃষ্টি হয়, কিন্তু মাত্র ৫৫ কিমি দূরে অনুবাদ ঢালে অবস্থিত শিলং একটি বৃষ্টিচ্ছায় অঞ্চল। একইভাবে পশ্চিমঘাট পর্বতের পূর্ব ঢাল (পুনে)।'
      }
    ],
    importantTermsWithEn: [
      { bn: 'প্রতিবাত ঢাল', en: 'Windward Slope' },
      { bn: 'অনুবাত ঢাল', en: 'Leeward Slope' },
      { bn: 'শৈলোৎক্ষেপ বৃষ্টিপাত', en: 'Orographic Rainfall' },
      { bn: 'আপেক্ষিক আর্দ্রতা', en: 'Relative Humidity' }
    ],
    examTipBn: 'ভূগোলের এই ৩ নম্বরের প্রশ্নে একটি সাধারণ পর্বতের রেখাচিত্র এঁকে প্রতিবাত ঢালে মেঘ-বৃষ্টি এবং অনুবাত ঢালে শুষ্ক বায়ু তীরচিহ্ন দিয়ে দেখালে পুরো নম্বর পাওয়া নিশ্চিত।',
    related3DModelId: 'yardang',
    keywords: ['বৃষ্টিচ্ছায়', 'rain shadow', 'শৈলোৎক্ষেপ', 'অনুবাত', 'প্রতিবাত', 'শিলং', 'ভূগোল']
  },
  {
    id: 'vd-phys-mirror',
    subjectName: 'ভৌতবিজ্ঞান ও পরিবেশ',
    chapterName: 'আলো',
    questionBn: 'অবতল দর্পণে ফোকাস দূরত্ব ও বক্রতা ব্যাসার্ধের সম্পর্ক f = R/2 জ্যামিতিক চিত্রের সাহায্যে কীভাবে প্রতিষ্ঠিত হয়?',
    scientificTermEn: 'Concave Spherical Mirror Optics (f = R/2 Ray Tracing)',
    visualType: 'concave_mirror',
    visualTitleBn: 'অবতল দর্পণে আলোক রশ্মিচিত্র ও ফোকাস দূরত্ব f = R/2',
    visualCaptionBn: 'উপাক্ষীয় রশ্মির জন্য প্রতিফলন কোণ ও একান্তর কোণের সমতা থেকে সমদ্বিবাহু ত্রিভুজ গঠন করে প্রমাণ হয় f = R/2।',
    explanationStepsBn: [
      {
        stepTitleBn: '১. রশ্মিচিত্রের জ্যামিতিক বিন্যাস',
        stepEn: 'Optical Axis & Ray Geometry',
        detailsBn: 'প্রধান অক্ষের সমান্তরাল আলোকরশ্মি AB অবতল দর্পণের B বিন্দুতে আপতিত হয়ে ফোকাস F দিয়ে প্রতিফলিত হয়। বক্রতাকেন্দ্র C থেকে B বিন্দুতে অঙ্কিত অভিলম্ব CB।'
      },
      {
        stepTitleBn: '২. প্রতিফলনের সূত্রানুসারে কোণের সমতা',
        stepEn: 'Law of Reflection: ∠i = ∠r',
        detailsBn: 'আপতন কোণ ∠ABC = প্রতিফলন কোণ ∠CBF। আবার AB || প্রধান অক্ষ হওয়ায় একান্তর কোণ ∠ABC = ∠BCF। অতএব ∠CBF = ∠BCF।'
      },
      {
        stepTitleBn: '৩. সমদ্বিবাহু ত্রিভুজ ও f = R/2 সিদ্ধান্ত',
        stepEn: 'Equidistant Proof (f = R/2)',
        detailsBn: 'ΔBCF-এর দুটি কোণ সমান হওয়ায় CF = BF। ক্ষুদ্র উন্মেষের উপাক্ষীয় রশ্মির ক্ষেত্রে B বিন্দু মেরু P-এর অতি নিকটে থাকে, ফলে BF ≈ PF। অতএব PF = CF = PC / 2, অর্থাৎ f = R/2।'
      }
    ],
    importantTermsWithEn: [
      { bn: 'বক্রতা ব্যাসার্ধ', en: 'Radius of Curvature (R)' },
      { bn: 'ফোকাস দূরত্ব', en: 'Focal Length (f)' },
      { bn: 'উপাক্ষীয় রশ্মি', en: 'Paraxial Rays' },
      { bn: 'মেরু', en: 'Pole (P)' }
    ],
    examTipBn: 'প্রমাণ লেখার সময় "দর্পণের উন্মেষ ক্ষুদ্র হওয়ায় B বিন্দু মেরু P-এর খুব কাছে অবস্থান করে" বাক্যটি লেখা আবশ্যক, নইলে ১ নম্বর কেটে নেওয়া হয়।',
    related3DModelId: 'lens',
    keywords: ['অবতল দর্পণ', 'concave mirror', 'আলো', 'f=r/2', 'ফোকাস', 'বক্রতা']
  },
  {
    id: 'vd-beng-karok',
    subjectName: 'বাংলা',
    chapterName: 'বাংলা ব্যাকরণ: কারক ও অকারক সম্পর্ক',
    questionBn: 'বাক্যে বিভিন্ন কারক (কর্তা, কর্ম, করণ, অপাদান, অধিকরণ) চেনার সবচেয়ে নির্ভুল সহজ কৌশল কী?',
    scientificTermEn: 'Bengali Grammar Case Relations (Karok Identification Strategy)',
    visualType: 'karok_tree',
    visualTitleBn: 'বাংলা ব্যাকরণ: ক্রিয়াপদভিত্তিক কারক নির্ণয়ের সিদ্ধান্ত বৃক্ষ',
    visualCaptionBn: 'বাক্যের প্রধান সমাপিকা ক্রিয়াপদকে নির্দিষ্ট প্রশ্ন করে কারক ও তার অনুষঙ্গিক বিভক্তি নির্ভুলভাবে চিহ্নিত করা যায়।',
    explanationStepsBn: [
      {
        stepTitleBn: '১. ক্রিয়াপদ চিহ্নিতকরণ',
        stepEn: 'Find the Finite Verb',
        detailsBn: 'বাক্যের সমাপিকা ক্রিয়াটিকে প্রথমে খুঁজে বার করো (যেমন: "রাজা দরিদ্রকে ধন দিচ্ছেন" - এখানে ক্রিয়া হলো "দিচ্ছেন")।'
      },
      {
        stepTitleBn: '২. ক্রিয়ার প্রতি প্রশ্নমালা',
        stepEn: 'Strategic Questioning',
        detailsBn: '• কে দিচ্ছেন? -> রাজা (কর্তৃকারক)\n• কী দিচ্ছেন? -> ধন (কর্মকারক)\n• কাকে দিচ্ছেন? -> দরিদ্রকে (নিমিত্ত/কর্মকারক)\n• কোথা থেকে দিচ্ছেন? -> কোষাগার থেকে (অপাদানকারক)\n• কোথায়/কখন দিচ্ছেন? -> রাজসভায় (অধিকরণকারক)'
      },
      {
        stepTitleBn: '৩. বিভক্তি ও অনুসর্গ শনাক্তকরণ',
        stepEn: 'Inflection / Postposition',
        detailsBn: 'শব্দের শেষে যুক্ত অতিরিক্ত বর্ণ বা চিহ্ন হলো বিভক্তি (যেমন: ‘এ’, ‘কে’, ‘তে’)। কোনো বিভক্তি দৃশ্যমান না থাকলে তাকে ‘শূন্য (০) বিভক্তি’ বলে।'
      }
    ],
    importantTermsWithEn: [
      { bn: 'কর্তৃকারক', en: 'Nominative Case' },
      { bn: 'কর্মকারক', en: 'Accusative Case' },
      { bn: 'করণকারক', en: 'Instrumental Case' },
      { bn: 'অধিকরণকারক', en: 'Locative Case' },
      { bn: 'শূন্য বিভক্তি', en: 'Zero Inflection' }
    ],
    examTipBn: 'কারক নির্ণয়ের সময় কেবল "করণ কারক" লিখলে চলবে না, পাশে বিভক্তি উল্লেখ করতে হবে—যেমন "করণ কারকে ‘দ্বারা’ অনুসর্গ" বা "অধিকরণ কারকে ‘এ’ বিভক্তি"।',
    keywords: ['কারক', 'বিভক্তি', 'করণ', 'কর্ম', 'কর্তা', 'ব্যাকরণ', 'বাংলা']
  }
];

/**
 * Synthesizes a comprehensive Class 10 Visual Doubt solution for ANY user question
 */
export function synthesizeVisualDoubt(
  questionText: string,
  subjectName?: string,
  chapterName?: string,
  hasUploadedImage?: boolean
): VisualDoubtItem {
  const q = questionText.trim().toLowerCase();

  // Check if query matches any curated doubt
  const matched = CURATED_VISUAL_DOUBTS.find(
    (d) =>
      d.questionBn.toLowerCase().includes(q) ||
      d.keywords.some((k) => q.includes(k) || k.includes(q)) ||
      (subjectName && d.subjectName.includes(subjectName) && d.keywords.some((k) => q.includes(k)))
  );
  if (matched) return matched;

  // Determine visual type, subject, labeled parts and 3D link based on question content
  let visualType: VisualType = 'concept_flowchart';
  let effSubject = subjectName && subjectName !== 'সব বিষয়' ? subjectName : 'সাধারণ বিজ্ঞান ও শিক্ষা';
  let effChapter = chapterName && chapterName !== 'সব অধ্যায়' ? chapterName : 'পাঠ্যসূচির গুরুত্বপূর্ণ অধ্যায়';
  let scientificTermEn = `${questionText.slice(0, 30)} (Visual Concept Analysis)`;
  let related3D: string | undefined = undefined;
  let labeledParts: { id: string; nameBn: string; nameEn?: string; descriptionBn: string }[] = [];

  // Mathematics (গণিত)
  if (q.includes('দ্বিঘাত') || q.includes('quadratic') || q.includes('প্যারাবোলা') || q.includes('বীজ') || q.includes('ax2') || q.includes('শ্রীধর')) {
    visualType = 'quadratic_parabola';
    effSubject = 'গণিত';
    effChapter = 'একচলবিশিষ্ট দ্বিঘাত সমীকরণ';
    scientificTermEn = 'Quadratic Equation & Parabola Curve Analysis';
    labeledParts = [
      { id: 'v1', nameBn: 'শীর্ষবিন্দু (Vertex)', nameEn: '(-b/2a, -D/4a)', descriptionBn: 'প্যারাবোলার সর্বোচ্চ বা সর্বনিম্ন বিন্দু।' },
      { id: 'v2', nameBn: 'বীজদ্বয় (Roots)', nameEn: 'α and β', descriptionBn: 'x-অক্ষে ছেদবিন্দু যেখানে y = 0।' },
      { id: 'v3', nameBn: 'নিরূপক (Discriminant)', nameEn: 'D = b² - 4ac', descriptionBn: 'D > 0 হলে বীজ বাস্তব ও অসমান, D = 0 হলে সমান, D < 0 হলে কাল্পনিক।' }
    ];
  } else if (q.includes('ত্রিকোণমিতি') || q.includes('trigonometry') || q.includes('sin') || q.includes('cos') || q.includes('tan') || q.includes('বৃত্ত')) {
    visualType = 'trigonometry_circle';
    effSubject = 'গণিত';
    effChapter = 'ত্রিকোণমিতি অনুপাত ও অভেদাবলী';
    scientificTermEn = 'Trigonometric Ratios & Unit Circle Relations';
    labeledParts = [
      { id: 't1', nameBn: 'লম্ব (Perpendicular)', nameEn: 'sin θ', descriptionBn: 'কোণের বিপরীত বাহু।' },
      { id: 't2', nameBn: 'ভূমি (Base)', nameEn: 'cos θ', descriptionBn: 'সন্নিহিত বাহু।' },
      { id: 't3', nameBn: 'অতিভুজ (Hypotenuse)', nameEn: 'r = 1', descriptionBn: 'সমকোণী ত্রিভুজের বৃহত্তম বাহু।' }
    ];
  } else if (q.includes('পিথাগোরাস') || q.includes('pythagoras') || q.includes('সমকোণী ত্রিভুজ') || q.includes('অতিভুজ')) {
    visualType = 'pythagoras_triangle';
    effSubject = 'গণিত';
    effChapter = 'সদৃশতা ও পিথাগোরাসের উপপাদ্য';
    scientificTermEn = 'Pythagorean Theorem Geometry';
    labeledParts = [
      { id: 'p1', nameBn: 'অতিভুজ (c)', nameEn: 'Hypotenuse', descriptionBn: 'সমকোণের বিপরীত বাহু; c² = a² + b²।' },
      { id: 'p2', nameBn: 'লম্ব (a)', nameEn: 'Perpendicular', descriptionBn: 'উল্লম্ব বাহু।' },
      { id: 'p3', nameBn: 'ভূমি (b)', nameEn: 'Base', descriptionBn: 'অনুভূমিক বাহু।' }
    ];
  }
  // Biology (জীবনবিজ্ঞান)
  else if (q.includes('নিউরন') || q.includes('neuron') || q.includes('স্নায়ুকোষ') || q.includes('অ্যাক্সন') || q.includes('ডেনড্রন')) {
    visualType = 'neuron_diagram';
    effSubject = 'জীবনবিজ্ঞান';
    effChapter = 'জীবজগতে নিয়ন্ত্রণ ও সমন্বয়';
    scientificTermEn = 'Structural & Functional Anatomy of Neuron';
    related3D = 'neuron';
    labeledParts = [
      { id: 'n1', nameBn: 'কোষদেহ (Soma)', nameEn: 'Cell Body', descriptionBn: 'নিউক্লিয়াস ও সাইটোপ্লাজম গঠিত প্রধান অংশ।' },
      { id: 'n2', nameBn: 'ডেনড্রন (Dendron)', nameEn: 'Dendrite', descriptionBn: 'শাখা-প্রশাখা যা অন্যান্য কোষ থেকে উদ্দীপনা গ্রহণ করে।' },
      { id: 'n3', nameBn: 'অ্যাক্সন (Axon)', nameEn: 'Axon', descriptionBn: 'দীর্ঘ প্রবর্ধক যা উদ্দীপনা দূরবর্তী কোষে প্রেরণ করে।' },
      { id: 'n4', nameBn: 'মায়েলিন সিদ', nameEn: 'Myelin Sheath', descriptionBn: 'লিপিড সমৃদ্ধ আবরণী যা দ্রুত স্নায়ুস্পন্দন পরিবহনে সাহায্য করে।' },
      { id: 'n5', nameBn: 'প্রান্ত বুরুষ', nameEn: 'Synaptic Knob', descriptionBn: 'অ্যাক্সনের শেষ প্রান্ত যা সাইন্যাপস গঠন করে।' }
    ];
  } else if (q.includes('কোষ') || q.includes('cell') || q.includes('মাইটোকনড্রিয়া') || q.includes('নিউক্লিয়াস') || q.includes('সাইটোপ্লাজম')) {
    visualType = 'cell_diagram';
    effSubject = 'জীবনবিজ্ঞান';
    effChapter = 'জীবনের প্রবাহমানতা';
    scientificTermEn = 'Cellular Organelles & Structure';
    related3D = 'cell';
    labeledParts = [
      { id: 'c1', nameBn: 'নিউক্লিয়াস', nameEn: 'Nucleus', descriptionBn: 'কোষের মস্তিষ্ক; জিনগত তথ্য ধারণ করে।' },
      { id: 'c2', nameBn: 'মাইটোকনড্রিয়া', nameEn: 'Mitochondria', descriptionBn: 'কোষের শক্তিঘর; এটিপি (ATP) তৈরি করে।' },
      { id: 'c3', nameBn: 'কোষপ্রাচীর/পর্দা', nameEn: 'Cell Wall/Membrane', descriptionBn: 'কোষের আকৃতি রক্ষা ও ভেদ্যতা নিয়ন্ত্রণ করে।' }
    ];
  } else if (q.includes('হৃৎপিণ্ড') || q.includes('heart') || q.includes('রক্ত সংবহন') || q.includes('অলিন্দ') || q.includes('নিলয়')) {
    visualType = 'heart_diagram';
    effSubject = 'জীবনবিজ্ঞান';
    effChapter = 'জীবজগতে নিয়ন্ত্রণ ও সমন্বয়';
    scientificTermEn = 'Cardiovascular Anatomy & Blood Circulation';
    related3D = 'heart';
    labeledParts = [
      { id: 'h1', nameBn: 'ডান অলিন্দ ও নিলয়', nameEn: 'Right Atrium & Ventricle', descriptionBn: 'অবিশুদ্ধ (CO₂ যুক্ত) রক্ত ফুসফুসে পাঠায়।' },
      { id: 'h2', nameBn: 'বাম অলিন্দ ও নিলয়', nameEn: 'Left Atrium & Ventricle', descriptionBn: 'ফুসফুস থেকে প্রাপ্ত বিশুদ্ধ (O₂ যুক্ত) রক্ত সারা দেহে পাঠায়।' },
      { id: 'h3', nameBn: 'মহাধমনি (Aorta)', nameEn: 'Systemic Aorta', descriptionBn: 'দেহের প্রধান ধমনি।' }
    ];
  } else if (q.includes('প্রতিবর্ত') || q.includes('reflex')) {
    visualType = 'reflex_arc';
    effSubject = 'জীবনবিজ্ঞান';
    effChapter = 'জীবজগতে নিয়ন্ত্রণ ও সমন্বয়';
    scientificTermEn = 'Reflex Arc Neural Pathway';
    related3D = 'neuron';
    labeledParts = [
      { id: 'r1', nameBn: 'গ্রাহক', nameEn: 'Receptor', descriptionBn: 'উদ্দীপনা গ্রহণকারী ইন্দ্রিয়।' },
      { id: 'r2', nameBn: 'সংজ্ঞাবহ স্নায়ু', nameEn: 'Sensory Neuron', descriptionBn: 'স্নায়ুকেন্দ্রে সংকেত নিয়ে যায়।' },
      { id: 'r3', nameBn: 'স্নায়ুকেন্দ্র', nameEn: 'Spinal Cord', descriptionBn: 'সুষুম্নাকাণ্ড সংকেত বিশ্লেষণ করে।' },
      { id: 'r4', nameBn: 'আজ্ঞাবহ স্নায়ু', nameEn: 'Motor Neuron', descriptionBn: 'নির্দেশ বহন করে পেশিতে পাঠায়।' },
      { id: 'r5', nameBn: 'কারক পেশি', nameEn: 'Effector Muscle', descriptionBn: 'প্রতিক্রিয়া সম্পাদন করে।' }
    ];
  } else if (q.includes('মেন্ডেল') || q.includes('mendel') || q.includes('জিন') || q.includes('বংশগতি') || q.includes('একসংকর')) {
    visualType = 'mendel_cross';
    effSubject = 'জীবনবিজ্ঞান';
    effChapter = 'বংশগতি এবং কয়েকটি সাধারণ জিনগত রোগ';
    scientificTermEn = "Mendel's Monohybrid Cross Genetics";
    related3D = 'chromosome';
    labeledParts = [
      { id: 'm1', nameBn: 'বিশুদ্ধ লম্বা (TT)', nameEn: 'Homozygous Dominant', descriptionBn: 'উভয় প্রকট অ্যালিল বিশিষ্ট।' },
      { id: 'm2', nameBn: 'সংকর লম্বা (Tt)', nameEn: 'Heterozygous Dominant', descriptionBn: 'একটি প্রকট ও একটি প্রচ্ছন্ন অ্যালিল।' },
      { id: 'm3', nameBn: 'বিশুদ্ধ বেঁটে (tt)', nameEn: 'Homozygous Recessive', descriptionBn: 'উভয় প্রচ্ছন্ন অ্যালিল বিশিষ্ট।' }
    ];
  }
  // Physical Science (ভৌতবিজ্ঞান ও পরিবেশ)
  else if (q.includes('বয়েল') || q.includes('boyle') || q.includes('p-v')) {
    visualType = 'boyles_law';
    effSubject = 'ভৌতবিজ্ঞান ও পরিবেশ';
    effChapter = 'গ্যাসের আচরণ';
    scientificTermEn = "Boyle's Law Isotherm Curve";
    related3D = 'atom';
    labeledParts = [
      { id: 'b1', nameBn: 'চাপ (P)', nameEn: 'Pressure', descriptionBn: 'গ্যাস পাত্রের দেয়ালে প্রযুক্ত লম্ব বল।' },
      { id: 'b2', nameBn: 'আয়তন (V)', nameEn: 'Volume', descriptionBn: 'গ্যাসের দখলকৃত স্থান।' },
      { id: 'b3', nameBn: 'সমপরাবৃত্ত রেখা', nameEn: 'Hyperbolic Isotherm', descriptionBn: 'P × V = k (ধ্রুবক উষ্ণতায়)।' }
    ];
  } else if (q.includes('চার্লস') || q.includes('charles') || q.includes('পরম শূন্য') || q.includes('-২৭৩')) {
    visualType = 'charles_law';
    effSubject = 'ভৌতবিজ্ঞান ও পরিবেশ';
    effChapter = 'গ্যাসের আচরণ';
    scientificTermEn = "Charles's Law Absolute Zero Isobar";
    labeledParts = [
      { id: 'ch1', nameBn: 'পরম শূন্য তাপমাত্রা', nameEn: '-273°C / 0 Kelvin', descriptionBn: 'যে উষ্ণতায় গ্যাসের আয়তন তাত্ত্বিকভাবে শূন্য হয়।' },
      { id: 'ch2', nameBn: 'V-t রেখা', nameEn: 'Volume-Temperature Line', descriptionBn: 'Vt = V0(1 + t/273)।' }
    ];
  } else if (q.includes('ওহম') || q.includes('ohm') || q.includes('তড়িৎ') || q.includes('রোধ') || q.includes('current')) {
    visualType = 'ohms_law';
    effSubject = 'ভৌতবিজ্ঞান ও পরিবেশ';
    effChapter = 'চলতড়িৎ';
    scientificTermEn = "Ohm's Law V-I Characteristic";
    labeledParts = [
      { id: 'o1', nameBn: 'বিভবপ্রভেদ (V)', nameEn: 'Potential Difference', descriptionBn: 'বর্তনীতে আধান প্রবাহের কারণ।' },
      { id: 'o2', nameBn: 'তড়িৎপ্রবাহ (I)', nameEn: 'Electric Current', descriptionBn: 'প্রতি সেকেন্ডে প্রবাহিত আধান।' },
      { id: 'o3', nameBn: 'রোধ (R)', nameEn: 'Resistance', descriptionBn: 'লেখচিত্রের নতি বা ঢাল (V/I)।' }
    ];
  } else if (q.includes('দর্পণ') || q.includes('অবতল') || q.includes('আলো') || q.includes('লেন্স') || q.includes('ফোকাস')) {
    visualType = 'concave_mirror';
    effSubject = 'ভৌতবিজ্ঞান ও পরিবেশ';
    effChapter = 'আলো';
    scientificTermEn = 'Spherical Mirror Optics & Ray Tracing';
    related3D = 'lens';
    labeledParts = [
      { id: 'm1', nameBn: 'মেরু (Pole P)', nameEn: 'Mirror Pole', descriptionBn: 'প্রতিফলক তলের মধ্যবিন্দু।' },
      { id: 'm2', nameBn: 'ফোকাস (Focus F)', nameEn: 'Principal Focus', descriptionBn: 'সমান্তরাল রশ্মি যেখানে মিলিত হয়।' },
      { id: 'm3', nameBn: 'বক্রতাকেন্দ্র (C)', nameEn: 'Center of Curvature', descriptionBn: 'f = R / 2 সম্পর্ক মান্য করে।' }
    ];
  }
  // Geography (ভূগোল)
  else if (q.includes('বৃষ্টিচ্ছায়') || q.includes('rain shadow') || q.includes('শৈলোৎক্ষেপ') || q.includes('পর্বত')) {
    visualType = 'rain_shadow';
    effSubject = 'ভূগোল';
    effChapter = 'বায়ুমণ্ডল';
    scientificTermEn = 'Orographic Relief & Rain Shadow Mechanism';
    labeledParts = [
      { id: 'rs1', nameBn: 'প্রতিবাত ঢাল', nameEn: 'Windward Slope', descriptionBn: 'বাষ্পপূর্ণ বায়ু পর্বতে বাধা পেয়ে প্রচুর বৃষ্টিপাত ঘটায়।' },
      { id: 'rs2', nameBn: 'অনুবাদ ঢাল', nameEn: 'Leeward / Rain Shadow', descriptionBn: 'বায়ু শুষ্ক ও উত্তপ্ত হয়ে নামায় বৃষ্টিহীন অঞ্চল তৈরি হয়।' }
    ];
  } else if (q.includes('আগ্নেয়গিরি') || q.includes('আগ্নেয়োচ্ছ্বাস') || q.includes('ম্যাগমা') || q.includes('লাভা')) {
    visualType = 'volcano_structure';
    effSubject = 'ভূগোল';
    effChapter = 'ভূমিরূপ ও প্রাকৃতিক প্রক্রিয়া';
    scientificTermEn = 'Volcanic Vent & Magma Chamber Morphology';
    related3D = 'volcano';
    labeledParts = [
      { id: 'vc1', nameBn: 'ম্যাগমা গহ্বর', nameEn: 'Magma Chamber', descriptionBn: 'ভূ-অভ্যন্তরের গলিত পাথরের ভাণ্ডার।' },
      { id: 'vc2', nameBn: 'জ্বালামুখ (Crater)', nameEn: 'Crater Vent', descriptionBn: 'লাভা নির্গমনের প্রধান মুখ।' }
    ];
  }
  // Bengali Grammar (বাংলা ব্যাকরণ)
  else if (q.includes('কারক') || q.includes('বিভক্তি') || q.includes('অনুসর্গ')) {
    visualType = 'karok_tree';
    effSubject = 'বাংলা';
    effChapter = 'বাংলা ব্যাকরণ (কারক ও বিভক্তি)';
    scientificTermEn = 'Bengali Case (Karok) Syntactic Classification';
    labeledParts = [
      { id: 'k1', nameBn: 'কর্তৃকারক', nameEn: 'Nominative', descriptionBn: 'যে ক্রিয়া সম্পন্ন করে (কে/কারা)।' },
      { id: 'k2', nameBn: 'কর্মকারক', nameEn: 'Accusative', descriptionBn: 'যাকে আশ্রয় করে ক্রিয়া ঘটে (কী/কাকে)।' },
      { id: 'k3', nameBn: 'করণকারক', nameEn: 'Instrumental', descriptionBn: 'যার দ্বারা ক্রিয়া সাধিত হয় (কিসের দ্বারা)।' },
      { id: 'k4', nameBn: 'অপাদানকারক', nameEn: 'Ablative', descriptionBn: 'যা হতে কিছু বিচ্যুত/ভীত হয় (কোথা হতে)।' },
      { id: 'k5', nameBn: 'অধিকরণকারক', nameEn: 'Locative', descriptionBn: 'ক্রিয়া সম্পাদনের স্থান বা কাল (কোথায়/কখন)।' }
    ];
  }

  return {
    id: `dyn-${Date.now()}`,
    subjectName: effSubject,
    chapterName: effChapter,
    questionBn: questionText,
    scientificTermEn,
    visualType,
    visualTitleBn: `সংশয় বিশ্লেষণ চিত্র: ${questionText}`,
    visualCaptionBn: hasUploadedImage
      ? 'আপলোডকৃত প্রশ্নের ছবি ও পাঠ্যবই নির্দেশিকা সমন্বয়ে প্রস্তুত ধাপে ধাপে ভিজ্যুয়াল সমাধান।'
      : 'পশ্চিমবঙ্গ মধ্যশিক্ষা পর্ষদ মাধ্যমিক সিলেবাস অনুসারে প্রস্তুত বৈজ্ঞানিক ভিজ্যুয়াল সমাধান।',
    explanationStepsBn: [
      {
        stepTitleBn: '১. মূল ধারণা ও সংজ্ঞা',
        stepEn: 'Core Concept Definition',
        detailsBn: `"${questionText}" সম্পর্কিত প্রধান নিয়ম বা তত্ত্বটি দশম শ্রেণির পাঠ্যবইয়ের ${effChapter} অধ্যায়ের অন্তর্ভুক্ত। পরীক্ষার খাতায় সর্বদা স্পষ্ট প্রামাণ্য সংজ্ঞা দিয়ে উত্তর শুরু করবে।`
      },
      {
        stepTitleBn: '২. কার্যকারণ ও বিশদ প্রক্রিয়া',
        stepEn: 'Step-by-step Mechanism & Scientific Basis',
        detailsBn: 'বিষয়টির অন্তর্নিহিত প্রক্রিয়াকে বৈজ্ঞানিক যুক্তি বা গাণিতিক সূত্রের সাহায্যে প্রকাশ করতে হবে। সংশ্লিষ্ট প্রয়োজনীয় চিত্র বা সমীকরণ উল্লেখ করলে উত্তরের গভীরতা বৃদ্ধি পায়।'
      },
      {
        stepTitleBn: '৩. বাস্তব প্রয়োগ ও উপসংহার',
        stepEn: 'Application & Practical Context',
        detailsBn: 'দৈনন্দিন জীবনে বা প্রাকৃতিক পরিবেশে এর বাস্তব উদাহরণ দাও। পরিশেষে এক লাইনে স্পষ্ট উপসংহার টেনে উত্তর শেষ করো।'
      }
    ],
    importantTermsWithEn: [
      { bn: 'মূল নীতি', en: 'Fundamental Principle' },
      { bn: 'তাত্ত্বিক ভিত্তি', en: 'Theoretical Basis' },
      { bn: 'বাস্তব প্রয়োগ', en: 'Practical Application' }
    ],
    examTipBn: 'মাধ্যমিক পরীক্ষায় এই ধরনের প্রশ্নের ক্ষেত্রে সম্পূর্ণ বাক্যে উত্তর লিখবে এবং গুরুত্বপূর্ণ বৈজ্ঞানিক পরিভাষাগুলি পেন দিয়ে আন্ডারলাইন করবে।',
    related3DModelId: related3D,
    labeledParts: labeledParts.length > 0 ? labeledParts : undefined,
    source: 'synthesized',
    keywords: [questionText.toLowerCase()]
  };
}
