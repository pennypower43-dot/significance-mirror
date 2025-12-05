import { RelationshipType } from "@/hooks/useReflections";

export interface Question {
  id: string;
  prompt: string;
  helper: string;
  type: 'giving' | 'receiving' | 'feeling' | 'meaning';
  showRelationship: boolean;
}

// Q1: Who did you support/help? (GIVING)
export const givingQuestions: Question[] = [
  {
    id: 'giving-1',
    prompt: 'Who did you make feel significant today?',
    helper: 'Even fleeting moments of care can help someone feel seen and valued.',
    type: 'giving',
    showRelationship: true,
  },
  {
    id: 'giving-2',
    prompt: 'Who did you show up for today?',
    helper: 'Being present for someone is a powerful gift of significance.',
    type: 'giving',
    showRelationship: true,
  },
  {
    id: 'giving-3',
    prompt: 'Who felt seen by you today?',
    helper: 'Your attention and presence create ripples of significance in others\' lives.',
    type: 'giving',
    showRelationship: true,
  },
  {
    id: 'giving-4',
    prompt: 'Who did you help feel heard or appreciated today?',
    helper: 'Making someone feel that they matter is how we build significance through contribution.',
    type: 'giving',
    showRelationship: true,
  },
  {
    id: 'giving-5',
    prompt: 'Who experienced your care or kindness today?',
    helper: 'A stranger on a train, a colleague, a loved one - all moments of giving matter.',
    type: 'giving',
    showRelationship: true,
  },
];

// Q2: Who provided you support? (RECEIVING)
export const receivingQuestions: Question[] = [
  {
    id: 'receiving-1',
    prompt: 'Who made you feel significant today?',
    helper: 'Who helped you know that you matter and that your presence holds value?',
    type: 'receiving',
    showRelationship: true,
  },
  {
    id: 'receiving-2',
    prompt: 'Who truly saw you today?',
    helper: 'To be seen, heard, and appreciated is a gift we all need.',
    type: 'receiving',
    showRelationship: true,
  },
  {
    id: 'receiving-3',
    prompt: 'Who made you feel that you matter today?',
    helper: 'Even fleeting moments—a kind word from a stranger—can touch us deeply.',
    type: 'receiving',
    showRelationship: true,
  },
  {
    id: 'receiving-4',
    prompt: 'Who gave you the gift of their attention today?',
    helper: 'Being noticed, valued, and appreciated reminds us that we are significant.',
    type: 'receiving',
    showRelationship: true,
  },
  {
    id: 'receiving-5',
    prompt: 'Who showed up for you in a way that mattered today?',
    helper: 'Significance is both a gift we receive and a gift we give.',
    type: 'receiving',
    showRelationship: true,
  },
];

// Q3: How did their support make you feel? (FEELING)
export const feelingQuestions: Question[] = [
  {
    id: 'feeling-1',
    prompt: 'How did being seen by them make you feel?',
    helper: 'When we feel significant to someone, it touches our deepest needs.',
    type: 'feeling',
    showRelationship: false,
  },
  {
    id: 'feeling-2',
    prompt: 'What emotions arose when you felt valued by them?',
    helper: 'Take a moment to name the feelings that came up for you.',
    type: 'feeling',
    showRelationship: false,
  },
  {
    id: 'feeling-3',
    prompt: 'How did this human connection touch you?',
    helper: 'Notice how being truly seen and heard affected you emotionally.',
    type: 'feeling',
    showRelationship: false,
  },
  {
    id: 'feeling-4',
    prompt: 'What shifted in you when you felt their care?',
    helper: 'Sometimes feeling significant changes how we see ourselves and our worth.',
    type: 'feeling',
    showRelationship: false,
  },
  {
    id: 'feeling-5',
    prompt: 'How did knowing you matter to them make you feel?',
    helper: 'Our emotional needs are met when we feel valued by others.',
    type: 'feeling',
    showRelationship: false,
  },
];

// Q4: What made it meaningful? (MEANING)
export const meaningQuestions: Question[] = [
  {
    id: 'meaning-1',
    prompt: 'Why did this moment of significance matter to you?',
    helper: 'What made this interaction touch your heart or stay with you?',
    type: 'meaning',
    showRelationship: false,
  },
  {
    id: 'meaning-2',
    prompt: 'What made you feel that this connection was significant?',
    helper: 'Reflect on what gave this moment its meaning and weight.',
    type: 'meaning',
    showRelationship: false,
  },
  {
    id: 'meaning-3',
    prompt: 'Why will you remember this moment?',
    helper: 'Some moments shape us. What made this one stay with you?',
    type: 'meaning',
    showRelationship: false,
  },
  {
    id: 'meaning-4',
    prompt: 'What did this exchange teach you about your place in their life?',
    helper: 'Understanding our significance to others deepens our sense of connection.',
    type: 'meaning',
    showRelationship: false,
  },
  {
    id: 'meaning-5',
    prompt: 'What made feeling seen by them so important?',
    helper: 'The need to be significant is one of our greatest human needs.',
    type: 'meaning',
    showRelationship: false,
  },
];

// Helper function to randomly select one question from each pool
export const selectDailyQuestions = (): {
  giving: Question;
  receiving: Question;
  feeling: Question;
  meaning: Question;
} => {
  const randomSelect = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

  return {
    giving: randomSelect(givingQuestions),
    receiving: randomSelect(receivingQuestions),
    feeling: randomSelect(feelingQuestions),
    meaning: randomSelect(meaningQuestions),
  };
};

// Generate a cohesive, flowing affirmation that integrates all reflection elements
export const generateIntegratedAffirmation = (
  supportedPerson: string,
  supportedRelationship: RelationshipType,
  supportedBy: string,
  supportedByRelationship: RelationshipType,
  supportFeeling: string,
  meaningfulReason: string
): string => {
  // Extract first name/meaningful part without cutting mid-word
  const extractName = (text: string) => {
    const firstPart = text.split(/[.!?,]/)[0].trim();
    if (firstPart.length <= 50) return firstPart;

    // If too long, find the last space before 50 chars
    const truncated = firstPart.substring(0, 50);
    const lastSpace = truncated.lastIndexOf(' ');
    return lastSpace > 20 ? truncated.substring(0, lastSpace) + "..." : truncated + "...";
  };

  const supportedName = extractName(supportedPerson);
  const supporterName = extractName(supportedBy);

  // Relationship context phrases
  const givingContext: Record<RelationshipType, string[]> = {
    family: [
      'by strengthening family bonds',
      'by showing up for your family',
      'through your care for those closest to you',
    ],
    friend: [
      'by being there for a friend',
      'through the gift of your friendship',
      'by nurturing a meaningful friendship',
    ],
    colleague: [
      'by supporting your professional community',
      'by showing up in your workplace',
      'through your presence at work',
    ],
    client: [
      'through your professional care and expertise',
      'by serving with excellence',
      'through the value you bring to your work',
    ],
    stranger: [
      'by extending kindness beyond your circle',
      'through an act of generosity to someone new',
      'by reaching out with compassion',
    ],
    other: [
      'through your presence and care',
      'by showing up with intention',
      'through a meaningful gesture',
    ],
  };

  const receivingContext: Record<RelationshipType, string[]> = {
    family: [
      'reminded you that you are cherished',
      'showed you the strength of family bonds',
      'affirmed your worth through their presence',
    ],
    friend: [
      'demonstrated the power of true friendship',
      'reminded you that you matter in meaningful ways',
      'showed you the value of authentic connection',
    ],
    colleague: [
      'affirmed your value in your professional community',
      'reminded you that you belong and contribute',
      'showed you that your work creates connection',
    ],
    client: [
      'reflected back the impact of your work',
      'showed you the ripple effects of what you do',
      'reminded you of the value you bring',
    ],
    stranger: [
      'reminded you that kindness flows in unexpected ways',
      'showed you that care can come from anywhere',
      'demonstrated that you are worthy of support from all directions',
    ],
    other: [
      'reminded you that you matter',
      'showed you that you are seen',
      'affirmed your inherent worth',
    ],
  };

  // Select random variations
  const randomSelect = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

  const givingPhrase = randomSelect(givingContext[supportedRelationship]);
  const receivingPhrase = randomSelect(receivingContext[supportedByRelationship]);

  // Ensure feeling starts lowercase for sentence flow (it comes after "you felt")
  const formatFeeling = (feeling: string) => {
    return feeling.charAt(0).toLowerCase() + feeling.slice(1);
  };

  // Template variations for the complete affirmation
  const templates = [
    `Today, you made ${supportedName} feel significant ${givingPhrase}. Your presence and actions create ripples of significance that extend far beyond what you can see.\n\nWhen ${supporterName} ${receivingPhrase}, you felt ${formatFeeling(supportFeeling)}.\n\n${meaningfulReason}\n\nThis is the truth: you matter to others, and others matter to you. Significance is both a gift you give and a gift you receive.`,

    `You helped ${supportedName} feel seen today ${givingPhrase}. This is how significance is built—through human-to-human moments of genuine care.\n\nAnd when ${supporterName} ${receivingPhrase}, you felt ${formatFeeling(supportFeeling)}.\n\n${meaningfulReason}\n\nYour life is woven into the lives of others. You are both giver and receiver. You are significant.`,

    `Today, ${supportedName} experienced the gift of your attention ${givingPhrase}. To be seen, heard, and appreciated is one of our deepest human needs—and you gave that gift.\n\n${supporterName} ${receivingPhrase}, leaving you feeling ${formatFeeling(supportFeeling)}.\n\n${meaningfulReason}\n\nThis exchange—giving and receiving significance—is the foundation of meaningful relationships. You are living this truth.`,

    `${supportedName} felt valued by you today ${givingPhrase}. When we make others feel significant, we simultaneously strengthen our own sense of purpose and connection.\n\nIn return, ${supporterName} ${receivingPhrase}. You felt ${formatFeeling(supportFeeling)}.\n\n${meaningfulReason}\n\nYour relationships define your life. Today you deepened them by both giving and receiving the gift of significance.`,

    `You showed up for ${supportedName} today ${givingPhrase}. Even fleeting moments of care help someone know that they matter.\n\n${supporterName} ${receivingPhrase}, leaving you feeling ${formatFeeling(supportFeeling)}.\n\n${meaningfulReason}\n\nYou are learning what makes you feel significant and how to give that same gift to others. Your relationships are growing richer, and your sense of peace is deepening.`,
  ];

  return randomSelect(templates);
};
