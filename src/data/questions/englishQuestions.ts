import { Question } from '../../types';

export const ENGLISH_QUESTIONS: Question[] = [
  // eng-1: Grammar — Tense
  {
    id: 'eng-q-1-1',
    subjectId: 'english',
    chapterId: 'eng-1',
    question: 'Choose the correct form: "The train ______ before we reached the station."',
    options: [
      { id: '(i)', text: 'left' },
      { id: '(ii)', text: 'had left' },
      { id: '(iii)', text: 'has left' },
      { id: '(iv)', text: 'was leaving' }
    ],
    correctOptionId: '(ii)',
    explanation: 'When two past actions are joined by "before", the earlier action takes the Past Perfect tense (had left) and the subsequent action takes simple past (reached).'
  },
  {
    id: 'eng-q-1-2',
    subjectId: 'english',
    chapterId: 'eng-1',
    question: '"They have been playing cricket ______ morning." Which preposition completes the present perfect continuous tense?',
    options: [
      { id: '(i)', text: 'for' },
      { id: '(ii)', text: 'since' },
      { id: '(iii)', text: 'from' },
      { id: '(iv)', text: 'at' }
    ],
    correctOptionId: '(ii)',
    explanation: 'In Perfect Continuous tense, "since" is used to denote a specific point of time (since morning, since 2020), whereas "for" is used for duration.'
  },

  // eng-2: Grammar — Voice Change
  {
    id: 'eng-q-2-1',
    subjectId: 'english',
    chapterId: 'eng-2',
    question: 'Convert into Passive voice: "Shut the door."',
    options: [
      { id: '(i)', text: 'The door must shut.' },
      { id: '(ii)', text: 'Let the door be shut.' },
      { id: '(iii)', text: 'Let the door shut.' },
      { id: '(iv)', text: 'You should shut door.' }
    ],
    correctOptionId: '(ii)',
    explanation: 'Imperative sentences with an object are converted into passive voice using the syntax: Let + Object + be + past participle of verb (shut).'
  },
  {
    id: 'eng-q-2-2',
    subjectId: 'english',
    chapterId: 'eng-2',
    question: 'Passive of: "Who did this work?"',
    options: [
      { id: '(i)', text: 'By whom was this work done?' },
      { id: '(ii)', text: 'Who was this work done by?' },
      { id: '(iii)', text: 'By who this work was done?' },
      { id: '(iv)', text: 'Whom did this work?' }
    ],
    correctOptionId: '(i)',
    explanation: 'Interrogative questions starting with "Who" in the simple past take "By whom + was + object + past participle (done)?" in passive voice.'
  },

  // eng-3: Grammar — Narration
  {
    id: 'eng-q-3-1',
    subjectId: 'english',
    chapterId: 'eng-3',
    question: 'Change into Indirect Speech: He said to me, "Are you going to school today?"',
    options: [
      { id: '(i)', text: 'He asked me that I was going to school that day.' },
      { id: '(ii)', text: 'He asked me whether I was going to school that day.' },
      { id: '(iii)', text: 'He told me if I am going to school today.' },
      { id: '(iv)', text: 'He asked me whether you were going to school that day.' }
    ],
    correctOptionId: '(ii)',
    explanation: 'Yes/No interrogative sentences use "if" or "whether", the present continuous shifts to past continuous ("was going"), and "today" changes to "that day".'
  },
  {
    id: 'eng-q-3-2',
    subjectId: 'english',
    chapterId: 'eng-3',
    question: 'Indirect of: The teacher said, "The earth moves round the sun."',
    options: [
      { id: '(i)', text: 'The teacher said that the earth moved round the sun.' },
      { id: '(ii)', text: 'The teacher said that the earth moves round the sun.' },
      { id: '(iii)', text: 'The teacher told the earth is moving round the sun.' },
      { id: '(iv)', text: 'The teacher asked if the earth moves round the sun.' }
    ],
    correctOptionId: '(ii)',
    explanation: 'Universal truths and scientific facts (the earth moves round the sun) do not change their tense even when the reporting verb is in the past tense.'
  },

  // eng-4: Grammar — Transformation of Sentences
  {
    id: 'eng-q-4-1',
    subjectId: 'english',
    chapterId: 'eng-4',
    question: 'Transform into Complex Sentence: "In spite of his poverty, he is honest."',
    options: [
      { id: '(i)', text: 'He is poor and he is honest.' },
      { id: '(ii)', text: 'Though he is poor, he is honest.' },
      { id: '(iii)', text: 'Being poor, he remains honest.' },
      { id: '(iv)', text: 'He is honest because he is poor.' }
    ],
    correctOptionId: '(ii)',
    explanation: 'A simple sentence containing "in spite of" is converted into a complex sentence using the concessive subordinating conjunction "though" or "although".'
  },
  {
    id: 'eng-q-4-2',
    subjectId: 'english',
    chapterId: 'eng-4',
    question: 'Remove "too": "He is too weak to walk."',
    options: [
      { id: '(i)', text: 'He is very weak and he cannot walk.' },
      { id: '(ii)', text: 'He is so weak that he cannot walk.' },
      { id: '(iii)', text: 'He is so weak to walk properly.' },
      { id: '(iv)', text: 'He cannot walk as he is weak.' }
    ],
    correctOptionId: '(ii)',
    explanation: 'The structure "too + adj + to + verb" transforms into "so + adj + that + subject + cannot + verb".'
  },

  // eng-5: Grammar — Articles
  {
    id: 'eng-q-5-1',
    subjectId: 'english',
    chapterId: 'eng-5',
    question: 'Fill in the blank: "He is ______ European gentleman."',
    options: [
      { id: '(i)', text: 'a' },
      { id: '(ii)', text: 'an' },
      { id: '(iii)', text: 'the' },
      { id: '(iv)', text: 'no article' }
    ],
    correctOptionId: '(i)',
    explanation: 'Although "European" begins with the vowel letter "E", its phonetic pronunciation begins with the consonant sound /juː/ (yu), requiring the article "a".'
  },
  {
    id: 'eng-q-5-2',
    subjectId: 'english',
    chapterId: 'eng-5',
    question: 'Choose the appropriate article: "Mr. Sen is ______ M.A. in English."',
    options: [
      { id: '(i)', text: 'a' },
      { id: '(ii)', text: 'an' },
      { id: '(iii)', text: 'the' },
      { id: '(iv)', text: 'no article' }
    ],
    correctOptionId: '(ii)',
    explanation: 'Abbreviations starting with consonant letters that have vowel sound pronunciations (M = /em/) take "an".'
  },

  // eng-6: Grammar — Prepositions
  {
    id: 'eng-q-6-1',
    subjectId: 'english',
    chapterId: 'eng-6',
    question: 'Appropriate preposition: "He is proficient ______ Mathematics."',
    options: [
      { id: '(i)', text: 'at' },
      { id: '(ii)', text: 'in' },
      { id: '(iii)', text: 'with' },
      { id: '(iv)', text: 'on' }
    ],
    correctOptionId: '(ii)',
    explanation: 'The adjective "proficient" appropriately takes the preposition "in" (proficient in something), whereas "good" takes "at" (good at).'
  },
  {
    id: 'eng-q-6-2',
    subjectId: 'english',
    chapterId: 'eng-6',
    question: 'Appropriate preposition: "She prevented him ______ going there."',
    options: [
      { id: '(i)', text: 'to' },
      { id: '(ii)', text: 'from' },
      { id: '(iii)', text: 'for' },
      { id: '(iv)', text: 'by' }
    ],
    correctOptionId: '(ii)',
    explanation: 'The verb "prevent" strictly takes "from" + gerund (prevent someone from doing something).'
  },

  // eng-7: Grammar — Right Form of Verb
  {
    id: 'eng-q-7-1',
    subjectId: 'english',
    chapterId: 'eng-7',
    question: 'Choose the right verb: "Neither of the boys ______ present yesterday."',
    options: [
      { id: '(i)', text: 'were' },
      { id: '(ii)', text: 'was' },
      { id: '(iii)', text: 'are' },
      { id: '(iv)', text: 'have been' }
    ],
    correctOptionId: '(ii)',
    explanation: '"Neither of + plural noun" takes a singular verb in standard formal grammar. For past tense, "was" is correct.'
  },
  {
    id: 'eng-q-7-2',
    subjectId: 'english',
    chapterId: 'eng-7',
    question: '"If it rains, we ______ at home."',
    options: [
      { id: '(i)', text: 'stayed' },
      { id: '(ii)', text: 'will stay' },
      { id: '(iii)', text: 'would stay' },
      { id: '(iv)', text: 'had stayed' }
    ],
    correctOptionId: '(ii)',
    explanation: 'In First Conditional (probable condition in present/future), the conditional clause is in simple present (if it rains) and the main clause uses will + base verb (will stay).'
  },

  // eng-8: Grammar — Subject–Verb Agreement
  {
    id: 'eng-q-8-1',
    subjectId: 'english',
    chapterId: 'eng-8',
    question: '"Bread and butter ______ his favourite breakfast."',
    options: [
      { id: '(i)', text: 'is' },
      { id: '(ii)', text: 'are' },
      { id: '(iii)', text: 'were' },
      { id: '(iv)', text: 'have been' }
    ],
    correctOptionId: '(i)',
    explanation: 'When two singular nouns connected by "and" express a single collective idea or food combination, they take a singular verb ("is").'
  },
  {
    id: 'eng-q-8-2',
    subjectId: 'english',
    chapterId: 'eng-8',
    question: '"The captain, along with his crew members, ______ rescued."',
    options: [
      { id: '(i)', text: 'were' },
      { id: '(ii)', text: 'was' },
      { id: '(iii)', text: 'have been' },
      { id: '(iv)', text: 'are' }
    ],
    correctOptionId: '(ii)',
    explanation: 'When a subject is joined with another noun by "along with", "as well as", or "together with", the verb agrees with the first subject ("The captain" -> singular "was").'
  },

  // eng-9: Grammar — Conjunction
  {
    id: 'eng-q-9-1',
    subjectId: 'english',
    chapterId: 'eng-9',
    question: 'Choose the correlative conjunction: "Scarcely had I reached the station ______ the train left."',
    options: [
      { id: '(i)', text: 'than' },
      { id: '(ii)', text: 'when' },
      { id: '(iii)', text: 'then' },
      { id: '(iv)', text: 'before' }
    ],
    correctOptionId: '(ii)',
    explanation: '"Scarcely... when" and "Hardly... when" are fixed correlative conjunctions; "No sooner" pairs with "than".'
  },
  {
    id: 'eng-q-9-2',
    subjectId: 'english',
    chapterId: 'eng-9',
    question: 'Fill in the blank: "Work hard, ______ you will fail."',
    options: [
      { id: '(i)', text: 'and' },
      { id: '(ii)', text: 'otherwise' },
      { id: '(iii)', text: 'because' },
      { id: '(iv)', text: 'so' }
    ],
    correctOptionId: '(ii)',
    explanation: '"Otherwise" or "or" expresses an alternative or the negative consequence of not performing the initial imperative action.'
  },

  // eng-10: Grammar — Degree
  {
    id: 'eng-q-10-1',
    subjectId: 'english',
    chapterId: 'eng-10',
    question: 'Comparative of: "Kolkata is the largest city in West Bengal."',
    options: [
      { id: '(i)', text: 'Kolkata is larger than any other city in West Bengal.' },
      { id: '(ii)', text: 'No other city is as large as Kolkata.' },
      { id: '(iii)', text: 'Kolkata is more large than all cities.' },
      { id: '(iv)', text: 'Very few cities are larger than Kolkata.' }
    ],
    correctOptionId: '(i)',
    explanation: 'Superlative with "the + est" transforms into comparative using "comparative adjective + than any other + singular noun".'
  },
  {
    id: 'eng-q-10-2',
    subjectId: 'english',
    chapterId: 'eng-10',
    question: 'Positive degree of: "Iron is more useful than gold."',
    options: [
      { id: '(i)', text: 'Gold is not as useful as iron.' },
      { id: '(ii)', text: 'Gold is as useful as iron.' },
      { id: '(iii)', text: 'Iron is as useful as gold.' },
      { id: '(iv)', text: 'No other metal is as useful as iron.' }
    ],
    correctOptionId: '(i)',
    explanation: 'When comparing two entities, affirmative comparative transforms into negative positive degree: "Gold is not as useful as iron".'
  },

  // eng-11: Grammar — অন্যান্য পরীক্ষাভিত্তিক Grammar
  {
    id: 'eng-q-11-1',
    subjectId: 'english',
    chapterId: 'eng-11',
    question: 'Identify the nominal compound: "A room for reading"',
    options: [
      { id: '(i)', text: 'Room reader' },
      { id: '(ii)', text: 'Reading-room' },
      { id: '(iii)', text: 'Read-room' },
      { id: '(iv)', text: 'Rooming' }
    ],
    correctOptionId: '(ii)',
    explanation: 'A nominal compound formed by combining gerund + noun is "Reading-room" (a room intended for reading).'
  },
  {
    id: 'eng-q-11-2',
    subjectId: 'english',
    chapterId: 'eng-11',
    question: 'What is the noun form of the adjective "Honest"?',
    options: [
      { id: '(i)', text: 'Honestly' },
      { id: '(ii)', text: 'Honesty' },
      { id: '(iii)', text: 'Dishonest' },
      { id: '(iv)', text: 'Honestness' }
    ],
    correctOptionId: '(ii)',
    explanation: 'The abstract noun derived from the adjective "Honest" is "Honesty".'
  },

  // eng-12: Phrasal Verb
  {
    id: 'eng-q-12-1',
    subjectId: 'english',
    chapterId: 'eng-12',
    question: 'Choose the appropriate Phrasal Verb for "rejected": "The committee rejected his proposal."',
    options: [
      { id: '(i)', text: 'turned away' },
      { id: '(ii)', text: 'turned down' },
      { id: '(iii)', text: 'turned off' },
      { id: '(iv)', text: 'turned up' }
    ],
    correctOptionId: '(ii)',
    explanation: 'The phrasal verb "turn down" means to refuse or reject an offer/proposal.'
  },
  {
    id: 'eng-q-12-2',
    subjectId: 'english',
    chapterId: 'eng-12',
    question: 'Replace "extinguish" with correct Phrasal Verb: "Please extinguish the lamp."',
    options: [
      { id: '(i)', text: 'put on' },
      { id: '(ii)', text: 'put off' },
      { id: '(iii)', text: 'put out' },
      { id: '(iv)', text: 'put up' }
    ],
    correctOptionId: '(iii)',
    explanation: '"Put out" signifies to stop something from burning or shining (extinguish fire, candle, lamp).'
  }
];
