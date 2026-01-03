export interface Word {
  word: string;
  pronunciation: string;
  partOfSpeech: string;
  definition: string;
  example: string;
  etymology: string;
}

export const words: Word[] = [
  {
    word: "Serendipity",
    pronunciation: "/ˌserənˈdɪpɪti/",
    partOfSpeech: "noun",
    definition: "The occurrence of events by chance in a happy or beneficial way; a fortunate accident that leads to unexpected discovery.",
    example: "It was pure serendipity that she found her dream job while getting coffee at a café.",
    etymology: "Coined by Horace Walpole in 1754, from the Persian fairy tale 'The Three Princes of Serendip' whose heroes made discoveries by accident."
  },
  {
    word: "Ephemeral",
    pronunciation: "/ɪˈfemərəl/",
    partOfSpeech: "adjective",
    definition: "Lasting for only a short time; fleeting and transitory, like cherry blossoms or morning dew.",
    example: "The ephemeral beauty of the sunset reminded her to appreciate life's passing moments.",
    etymology: "From Greek ephēmeros, meaning 'lasting only a day,' from epi (on) + hēmera (day)."
  },
  {
    word: "Mellifluous",
    pronunciation: "/meˈlɪfluəs/",
    partOfSpeech: "adjective",
    definition: "Sweet-sounding; pleasingly smooth and musical to the ear, often describing a voice or melody.",
    example: "His mellifluous voice made even the most mundane announcements sound like poetry.",
    etymology: "From Latin mellifluus, from mel (honey) + fluere (to flow), literally 'flowing with honey.'"
  },
  {
    word: "Wanderlust",
    pronunciation: "/ˈwɒndərlʌst/",
    partOfSpeech: "noun",
    definition: "A strong, innate desire to travel and explore the world; an irresistible urge to wander.",
    example: "Her wanderlust led her to quit her office job and backpack through South America.",
    etymology: "From German Wanderlust, combining wandern (to wander) + Lust (desire), adopted into English in the early 20th century."
  },
  {
    word: "Eloquent",
    pronunciation: "/ˈeləkwənt/",
    partOfSpeech: "adjective",
    definition: "Fluent, persuasive, and expressive in speaking or writing; able to convey meaning beautifully.",
    example: "Her eloquent speech moved the audience to tears and standing ovations.",
    etymology: "From Latin eloquens, from eloqui (to speak out), combining e- (out) + loqui (to speak)."
  },
  {
    word: "Resilient",
    pronunciation: "/rɪˈzɪliənt/",
    partOfSpeech: "adjective",
    definition: "Able to recover quickly from difficulties; having the capacity to spring back into shape after being bent or stretched.",
    example: "Despite facing numerous setbacks, she remained resilient and eventually achieved her goals.",
    etymology: "From Latin resilire, meaning 'to leap back,' from re- (back) + salire (to jump)."
  },
  {
    word: "Nostalgia",
    pronunciation: "/nɒˈstældʒə/",
    partOfSpeech: "noun",
    definition: "A sentimental longing for the past; a bittersweet affection for a period, place, or experience from one's memory.",
    example: "The smell of cinnamon cookies filled him with nostalgia for childhood holidays.",
    etymology: "From Greek nostos (homecoming) + algos (pain), originally coined as a medical term for homesickness in 1688."
  },
  {
    word: "Luminous",
    pronunciation: "/ˈluːmɪnəs/",
    partOfSpeech: "adjective",
    definition: "Full of or shedding light; bright, radiant, or glowing; also describing something intellectually brilliant.",
    example: "The luminous full moon cast silver shadows across the sleeping garden.",
    etymology: "From Latin luminosus, from lumen (light), related to lucere (to shine)."
  },
  {
    word: "Enigma",
    pronunciation: "/ɪˈnɪɡmə/",
    partOfSpeech: "noun",
    definition: "A person or thing that is mysterious, puzzling, or difficult to understand.",
    example: "Despite years of friendship, he remained an enigma—always surprising and never predictable.",
    etymology: "From Greek ainigma, from ainissesthai (to speak in riddles), from ainos (fable)."
  },
  {
    word: "Ethereal",
    pronunciation: "/ɪˈθɪəriəl/",
    partOfSpeech: "adjective",
    definition: "Extremely delicate and light; seeming too perfect for this world; heavenly or celestial.",
    example: "The dancer moved with an ethereal grace that made her seem to float above the stage.",
    etymology: "From Latin aethereus, from Greek aitherios (of the upper air), from aithēr (the pure upper air)."
  },
  {
    word: "Sanguine",
    pronunciation: "/ˈsæŋɡwɪn/",
    partOfSpeech: "adjective",
    definition: "Optimistic and positive, especially in a difficult situation; cheerfully confident about the future.",
    example: "Despite the challenging forecast, she remained sanguine about the project's success.",
    etymology: "From Latin sanguineus (of blood), based on medieval belief that blood was associated with cheerful temperament."
  },
  {
    word: "Quintessential",
    pronunciation: "/ˌkwɪntɪˈsenʃəl/",
    partOfSpeech: "adjective",
    definition: "Representing the most perfect or typical example of a quality or class; the purest essence of something.",
    example: "The cozy café was the quintessential Parisian experience she had always dreamed of.",
    etymology: "From medieval Latin quinta essentia (fifth essence), referring to a substance beyond the four elements."
  },
  {
    word: "Ineffable",
    pronunciation: "/ɪnˈefəbl/",
    partOfSpeech: "adjective",
    definition: "Too great or extreme to be expressed or described in words; beyond verbal expression.",
    example: "The view from the mountaintop filled her with an ineffable sense of peace.",
    etymology: "From Latin ineffabilis, from in- (not) + effabilis (utterable), from effari (to speak out)."
  },
  {
    word: "Reverence",
    pronunciation: "/ˈrevərəns/",
    partOfSpeech: "noun",
    definition: "Deep respect and admiration for someone or something; a feeling of awe and devotion.",
    example: "She spoke of her grandmother with such reverence that everyone in the room fell silent.",
    etymology: "From Latin reverentia, from revereri (to stand in awe of), from re- + vereri (to fear, respect)."
  },
  {
    word: "Resplendent",
    pronunciation: "/rɪˈsplendənt/",
    partOfSpeech: "adjective",
    definition: "Shining brilliantly; dressed in rich, impressive attire; dazzling in appearance.",
    example: "The bride looked resplendent in her grandmother's vintage lace wedding gown.",
    etymology: "From Latin resplendere, from re- (intensive) + splendere (to shine, glitter)."
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

export function formatDate(): string {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}
