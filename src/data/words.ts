export interface Word {
  word: string;
  pronunciation: string;
  partOfSpeech: string;
  definition: string;
  example: string;
  etymology: string;
  type: 'general' | 'academic' | 'creative' | 'business';
}

export const words: Word[] = [
  // === GENERAL VOCABULARY ===
  {
    word: "Serendipity",
    pronunciation: "/ˌserənˈdɪpɪti/",
    partOfSpeech: "noun",
    definition: "The occurrence of events by chance in a happy or beneficial way; a fortunate accident that leads to unexpected discovery.",
    example: "It was pure serendipity that she found her dream job while getting coffee at a café.",
    etymology: "Coined by Horace Walpole in 1754, from the Persian fairy tale 'The Three Princes of Serendip' whose heroes made discoveries by accident.",
    type: "general"
  },
  {
    word: "Resilient",
    pronunciation: "/rɪˈzɪliənt/",
    partOfSpeech: "adjective",
    definition: "Able to recover quickly from difficulties; having the capacity to spring back into shape after being bent or stretched.",
    example: "Despite facing numerous setbacks, she remained resilient and eventually achieved her goals.",
    etymology: "From Latin resilire, meaning 'to leap back,' from re- (back) + salire (to jump).",
    type: "general"
  },
  {
    word: "Nostalgia",
    pronunciation: "/nɒˈstældʒə/",
    partOfSpeech: "noun",
    definition: "A sentimental longing for the past; a bittersweet affection for a period, place, or experience from one's memory.",
    example: "The smell of cinnamon cookies filled him with nostalgia for childhood holidays.",
    etymology: "From Greek nostos (homecoming) + algos (pain), originally coined as a medical term for homesickness in 1688.",
    type: "general"
  },
  {
    word: "Wanderlust",
    pronunciation: "/ˈwɒndərlʌst/",
    partOfSpeech: "noun",
    definition: "A strong, innate desire to travel and explore the world; an irresistible urge to wander.",
    example: "Her wanderlust led her to quit her office job and backpack through South America.",
    etymology: "From German Wanderlust, combining wandern (to wander) + Lust (desire), adopted into English in the early 20th century.",
    type: "general"
  },
  {
    word: "Enigma",
    pronunciation: "/ɪˈnɪɡmə/",
    partOfSpeech: "noun",
    definition: "A person or thing that is mysterious, puzzling, or difficult to understand.",
    example: "Despite years of friendship, he remained an enigma—always surprising and never predictable.",
    etymology: "From Greek ainigma, from ainissesthai (to speak in riddles), from ainos (fable).",
    type: "general"
  },
  {
    word: "Eloquent",
    pronunciation: "/ˈeləkwənt/",
    partOfSpeech: "adjective",
    definition: "Fluent, persuasive, and expressive in speaking or writing; able to convey meaning beautifully.",
    example: "Her eloquent speech moved the audience to tears and standing ovations.",
    etymology: "From Latin eloquens, from eloqui (to speak out), combining e- (out) + loqui (to speak).",
    type: "general"
  },

  // === ACADEMIC VOCABULARY ===
  {
    word: "Paradigm",
    pronunciation: "/ˈpærəˌdaɪm/",
    partOfSpeech: "noun",
    definition: "A typical example or pattern of something; a model or framework for understanding.",
    example: "The discovery led to a paradigm shift in how scientists understood cellular biology.",
    etymology: "From Greek paradeigma, from paradeiknynai (to show side by side), from para- (beside) + deiknynai (to show).",
    type: "academic"
  },
  {
    word: "Empirical",
    pronunciation: "/ɪmˈpɪrɪkəl/",
    partOfSpeech: "adjective",
    definition: "Based on observation or experience rather than theory or pure logic; verifiable by observation.",
    example: "The researchers gathered empirical evidence through controlled laboratory experiments.",
    etymology: "From Greek empeirikos (experienced), from empeiria (experience), from en- (in) + peira (trial).",
    type: "academic"
  },
  {
    word: "Synthesis",
    pronunciation: "/ˈsɪnθəsɪs/",
    partOfSpeech: "noun",
    definition: "The combination of ideas to form a theory or system; the production of a substance from simpler materials.",
    example: "Her thesis presented a synthesis of Eastern and Western philosophical traditions.",
    etymology: "From Greek synthesis, from syntithenai (to put together), from syn- (together) + tithenai (to place).",
    type: "academic"
  },
  {
    word: "Juxtaposition",
    pronunciation: "/ˌdʒʌkstəpəˈzɪʃən/",
    partOfSpeech: "noun",
    definition: "The act of placing two things close together for contrasting effect; side-by-side comparison.",
    example: "The artist's juxtaposition of wealth and poverty made a powerful social statement.",
    etymology: "From Latin juxta (near) + French position, coined in the mid-17th century.",
    type: "academic"
  },
  {
    word: "Axiom",
    pronunciation: "/ˈæksiəm/",
    partOfSpeech: "noun",
    definition: "A statement or proposition regarded as self-evidently true; a fundamental principle.",
    example: "The axiom that parallel lines never meet forms the basis of Euclidean geometry.",
    etymology: "From Greek axioma (that which is thought worthy), from axios (worthy).",
    type: "academic"
  },
  {
    word: "Dichotomy",
    pronunciation: "/daɪˈkɒtəmi/",
    partOfSpeech: "noun",
    definition: "A division into two mutually exclusive or contradictory groups or entities.",
    example: "The study explored the dichotomy between nature and nurture in child development.",
    etymology: "From Greek dikhotomia, from dikho- (in two) + -tomia (cutting).",
    type: "academic"
  },

  // === CREATIVE WRITING ===
  {
    word: "Ephemeral",
    pronunciation: "/ɪˈfemərəl/",
    partOfSpeech: "adjective",
    definition: "Lasting for only a short time; fleeting and transitory, like cherry blossoms or morning dew.",
    example: "The ephemeral beauty of the sunset reminded her to appreciate life's passing moments.",
    etymology: "From Greek ephēmeros, meaning 'lasting only a day,' from epi (on) + hēmera (day).",
    type: "creative"
  },
  {
    word: "Mellifluous",
    pronunciation: "/meˈlɪfluəs/",
    partOfSpeech: "adjective",
    definition: "Sweet-sounding; pleasingly smooth and musical to the ear, often describing a voice or melody.",
    example: "His mellifluous voice made even the most mundane announcements sound like poetry.",
    etymology: "From Latin mellifluus, from mel (honey) + fluere (to flow), literally 'flowing with honey.'",
    type: "creative"
  },
  {
    word: "Ethereal",
    pronunciation: "/ɪˈθɪəriəl/",
    partOfSpeech: "adjective",
    definition: "Extremely delicate and light; seeming too perfect for this world; heavenly or celestial.",
    example: "The dancer moved with an ethereal grace that made her seem to float above the stage.",
    etymology: "From Latin aethereus, from Greek aitherios (of the upper air), from aithēr (the pure upper air).",
    type: "creative"
  },
  {
    word: "Luminous",
    pronunciation: "/ˈluːmɪnəs/",
    partOfSpeech: "adjective",
    definition: "Full of or shedding light; bright, radiant, or glowing; also describing something intellectually brilliant.",
    example: "The luminous full moon cast silver shadows across the sleeping garden.",
    etymology: "From Latin luminosus, from lumen (light), related to lucere (to shine).",
    type: "creative"
  },
  {
    word: "Ineffable",
    pronunciation: "/ɪnˈefəbl/",
    partOfSpeech: "adjective",
    definition: "Too great or extreme to be expressed or described in words; beyond verbal expression.",
    example: "The view from the mountaintop filled her with an ineffable sense of peace.",
    etymology: "From Latin ineffabilis, from in- (not) + effabilis (utterable), from effari (to speak out).",
    type: "creative"
  },
  {
    word: "Resplendent",
    pronunciation: "/rɪˈsplendənt/",
    partOfSpeech: "adjective",
    definition: "Shining brilliantly; dressed in rich, impressive attire; dazzling in appearance.",
    example: "The bride looked resplendent in her grandmother's vintage lace wedding gown.",
    etymology: "From Latin resplendere, from re- (intensive) + splendere (to shine, glitter).",
    type: "creative"
  },
  {
    word: "Petrichor",
    pronunciation: "/ˈpetrɪkɔːr/",
    partOfSpeech: "noun",
    definition: "The pleasant, earthy smell produced when rain falls on dry soil.",
    example: "After months of drought, the petrichor that followed the first rain was intoxicating.",
    etymology: "Coined in 1964 from Greek petra (stone) + ichor (the fluid flowing in the veins of the gods).",
    type: "creative"
  },

  // === BUSINESS VOCABULARY ===
  {
    word: "Synergy",
    pronunciation: "/ˈsɪnərdʒi/",
    partOfSpeech: "noun",
    definition: "The interaction of elements that when combined produce a total effect greater than the sum of individual parts.",
    example: "The merger created synergy between the two companies' research departments.",
    etymology: "From Greek synergos (working together), from syn- (together) + ergon (work).",
    type: "business"
  },
  {
    word: "Leverage",
    pronunciation: "/ˈlevərɪdʒ/",
    partOfSpeech: "verb",
    definition: "To use something to maximum advantage; to strategically utilize resources or position.",
    example: "She leveraged her industry connections to secure the partnership deal.",
    etymology: "From Old French levier (to raise), from Latin levare (to lift), extended to business meaning in the 20th century.",
    type: "business"
  },
  {
    word: "Scalable",
    pronunciation: "/ˈskeɪləbl/",
    partOfSpeech: "adjective",
    definition: "Able to be changed in size or scale; capable of growing or expanding efficiently.",
    example: "Investors were impressed by the startup's scalable business model.",
    etymology: "From Latin scala (ladder) + -able, popularized in tech and business contexts in the late 20th century.",
    type: "business"
  },
  {
    word: "Stakeholder",
    pronunciation: "/ˈsteɪkˌhoʊldər/",
    partOfSpeech: "noun",
    definition: "A person or group with an interest or concern in a business or enterprise.",
    example: "The project manager scheduled meetings with all key stakeholders to gather requirements.",
    etymology: "From stake (a share or interest) + holder, first used in business context in the 1960s.",
    type: "business"
  },
  {
    word: "Pivot",
    pronunciation: "/ˈpɪvət/",
    partOfSpeech: "verb",
    definition: "To fundamentally change the direction or strategy of a business while maintaining core elements.",
    example: "When the market shifted, the company had to pivot from hardware to software services.",
    etymology: "From French pivot (hinge), extended to business strategy meaning in the startup era.",
    type: "business"
  },
  {
    word: "Benchmark",
    pronunciation: "/ˈbentʃˌmɑːrk/",
    partOfSpeech: "noun",
    definition: "A standard or point of reference against which things may be compared or assessed.",
    example: "The industry leader's performance became the benchmark for all competitors.",
    etymology: "Originally a surveyor's mark cut in rock, extended to business meaning in the 1970s.",
    type: "business"
  },
  {
    word: "Quintessential",
    pronunciation: "/ˌkwɪntɪˈsenʃəl/",
    partOfSpeech: "adjective",
    definition: "Representing the most perfect or typical example of a quality or class; the purest essence of something.",
    example: "The cozy café was the quintessential Parisian experience she had always dreamed of.",
    etymology: "From medieval Latin quinta essentia (fifth essence), referring to a substance beyond the four elements.",
    type: "general"
  },
  {
    word: "Sanguine",
    pronunciation: "/ˈsæŋɡwɪn/",
    partOfSpeech: "adjective",
    definition: "Optimistic and positive, especially in a difficult situation; cheerfully confident about the future.",
    example: "Despite the challenging forecast, she remained sanguine about the project's success.",
    etymology: "From Latin sanguineus (of blood), based on medieval belief that blood was associated with cheerful temperament.",
    type: "general"
  },
  {
    word: "Reverence",
    pronunciation: "/ˈrevərəns/",
    partOfSpeech: "noun",
    definition: "Deep respect and admiration for someone or something; a feeling of awe and devotion.",
    example: "She spoke of her grandmother with such reverence that everyone in the room fell silent.",
    etymology: "From Latin reverentia, from revereri (to stand in awe of), from re- + vereri (to fear, respect).",
    type: "general"
  }
];

export function getWordOfTheDay(): Word {
  // Use the current date to deterministically select a word
  const today = new Date();
  const startOfYear = new Date(today.getFullYear(), 0, 0);
  const diff = today.getTime() - startOfYear.getTime();
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
  
  return words[dayOfYear % words.length];
}

export function getWordsByType(types: string[]): Word[] {
  return words.filter(word => types.includes(word.type));
}

export function formatDate(): string {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}
