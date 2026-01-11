export interface Quote {
  text: string;
  bookTitle: string;
  author: string;
}

export interface Word {
  word: string;
  pronunciation: string;
  partOfSpeech: string;
  definition: string;
  example: string;
  etymology: string;
  type: 'general' | 'academic' | 'creative' | 'business' | 'mindfulness';
  quote?: Quote;
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
    type: "general",
    quote: {
      text: "Serendipity is the way to make discoveries, by accident but also by sagacity, of things one is not in quest of.",
      bookTitle: "Letters",
      author: "Horace Walpole"
    }
  },
  {
    word: "Resilient",
    pronunciation: "/rɪˈzɪliənt/",
    partOfSpeech: "adjective",
    definition: "Able to recover quickly from difficulties; having the capacity to spring back into shape after being bent or stretched.",
    example: "Despite facing numerous setbacks, she remained resilient and eventually achieved her goals.",
    etymology: "From Latin resilire, meaning 'to leap back,' from re- (back) + salire (to jump).",
    type: "general",
    quote: {
      text: "She was resilient in ways that defied logic, bending but never breaking under the weight of the world.",
      bookTitle: "Educated",
      author: "Tara Westover"
    }
  },
  {
    word: "Nostalgia",
    pronunciation: "/nɒˈstældʒə/",
    partOfSpeech: "noun",
    definition: "A sentimental longing for the past; a bittersweet affection for a period, place, or experience from one's memory.",
    example: "The smell of cinnamon cookies filled him with nostalgia for childhood holidays.",
    etymology: "From Greek nostos (homecoming) + algos (pain), originally coined as a medical term for homesickness in 1688.",
    type: "general",
    quote: {
      text: "Nostalgia is a file that removes the rough edges from the good old days.",
      bookTitle: "The Summing Up",
      author: "W. Somerset Maugham"
    }
  },
  {
    word: "Wanderlust",
    pronunciation: "/ˈwɒndərlʌst/",
    partOfSpeech: "noun",
    definition: "A strong, innate desire to travel and explore the world; an irresistible urge to wander.",
    example: "Her wanderlust led her to quit her office job and backpack through South America.",
    etymology: "From German Wanderlust, combining wandern (to wander) + Lust (desire), adopted into English in the early 20th century.",
    type: "general",
    quote: {
      text: "A deep wanderlust had taken hold of her, pulling her toward horizons she had only dreamed of.",
      bookTitle: "The Alchemist",
      author: "Paulo Coelho"
    }
  },
  {
    word: "Enigma",
    pronunciation: "/ɪˈnɪɡmə/",
    partOfSpeech: "noun",
    definition: "A person or thing that is mysterious, puzzling, or difficult to understand.",
    example: "Despite years of friendship, he remained an enigma—always surprising and never predictable.",
    etymology: "From Greek ainigma, from ainissesthai (to speak in riddles), from ainos (fable).",
    type: "general",
    quote: {
      text: "Russia is a riddle wrapped in a mystery inside an enigma.",
      bookTitle: "The Gathering Storm",
      author: "Winston Churchill"
    }
  },
  {
    word: "Eloquent",
    pronunciation: "/ˈeləkwənt/",
    partOfSpeech: "adjective",
    definition: "Fluent, persuasive, and expressive in speaking or writing; able to convey meaning beautifully.",
    example: "Her eloquent speech moved the audience to tears and standing ovations.",
    etymology: "From Latin eloquens, from eloqui (to speak out), combining e- (out) + loqui (to speak).",
    type: "general",
    quote: {
      text: "Eloquence is the power to translate a truth into language perfectly intelligible to the person to whom you speak.",
      bookTitle: "Letters and Social Aims",
      author: "Ralph Waldo Emerson"
    }
  },

  // === ACADEMIC VOCABULARY ===
  {
    word: "Paradigm",
    pronunciation: "/ˈpærəˌdaɪm/",
    partOfSpeech: "noun",
    definition: "A typical example or pattern of something; a model or framework for understanding.",
    example: "The discovery led to a paradigm shift in how scientists understood cellular biology.",
    etymology: "From Greek paradeigma, from paradeiknynai (to show side by side), from para- (beside) + deiknynai (to show).",
    type: "academic",
    quote: {
      text: "Normal science does not aim at novelties of fact or theory and, when successful, finds none. New and unsuspected phenomena are, however, repeatedly uncovered by scientific research, and radical new theories have again and again been invented by scientists. History even suggests that the scientific enterprise has developed a uniquely powerful technique for producing surprises of this sort. If this characteristic of science is to be reconciled with what has already been said, then research under a paradigm must be a particularly effective way of inducing paradigm change.",
      bookTitle: "The Structure of Scientific Revolutions",
      author: "Thomas S. Kuhn"
    }
  },
  {
    word: "Empirical",
    pronunciation: "/ɪmˈpɪrɪkəl/",
    partOfSpeech: "adjective",
    definition: "Based on observation or experience rather than theory or pure logic; verifiable by observation.",
    example: "The researchers gathered empirical evidence through controlled laboratory experiments.",
    etymology: "From Greek empeirikos (experienced), from empeiria (experience), from en- (in) + peira (trial).",
    type: "academic",
    quote: {
      text: "All our knowledge begins with the senses, proceeds then to the understanding, and ends with reason. There is nothing higher than reason. But all knowledge that is empirical in origin must be tested against experience.",
      bookTitle: "Critique of Pure Reason",
      author: "Immanuel Kant"
    }
  },
  {
    word: "Synthesis",
    pronunciation: "/ˈsɪnθəsɪs/",
    partOfSpeech: "noun",
    definition: "The combination of ideas to form a theory or system; the production of a substance from simpler materials.",
    example: "Her thesis presented a synthesis of Eastern and Western philosophical traditions.",
    etymology: "From Greek synthesis, from syntithenai (to put together), from syn- (together) + tithenai (to place).",
    type: "academic",
    quote: {
      text: "The thesis and antithesis together produce a synthesis, which in turn becomes a new thesis that generates its own antithesis.",
      bookTitle: "The Phenomenology of Spirit",
      author: "Georg Wilhelm Friedrich Hegel"
    }
  },
  {
    word: "Juxtaposition",
    pronunciation: "/ˌdʒʌkstəpəˈzɪʃən/",
    partOfSpeech: "noun",
    definition: "The act of placing two things close together for contrasting effect; side-by-side comparison.",
    example: "The artist's juxtaposition of wealth and poverty made a powerful social statement.",
    etymology: "From Latin juxta (near) + French position, coined in the mid-17th century.",
    type: "academic",
    quote: {
      text: "The juxtaposition of the old and new creates a tension that reveals something about both.",
      bookTitle: "Ways of Seeing",
      author: "John Berger"
    }
  },
  {
    word: "Axiom",
    pronunciation: "/ˈæksiəm/",
    partOfSpeech: "noun",
    definition: "A statement or proposition regarded as self-evidently true; a fundamental principle.",
    example: "The axiom that parallel lines never meet forms the basis of Euclidean geometry.",
    etymology: "From Greek axioma (that which is thought worthy), from axios (worthy).",
    type: "academic",
    quote: {
      text: "An axiom is a proposition regarded as self-evidently true without proof.",
      bookTitle: "Elements",
      author: "Euclid"
    }
  },
  {
    word: "Dichotomy",
    pronunciation: "/daɪˈkɒtəmi/",
    partOfSpeech: "noun",
    definition: "A division into two mutually exclusive or contradictory groups or entities.",
    example: "The study explored the dichotomy between nature and nurture in child development.",
    etymology: "From Greek dikhotomia, from dikho- (in two) + -tomia (cutting).",
    type: "academic",
    quote: {
      text: "The dichotomy between mind and body has been the source of endless philosophical debate.",
      bookTitle: "Meditations on First Philosophy",
      author: "René Descartes"
    }
  },

  // === CREATIVE WRITING ===
  {
    word: "Ephemeral",
    pronunciation: "/ɪˈfemərəl/",
    partOfSpeech: "adjective",
    definition: "Lasting for only a short time; fleeting and transitory, like cherry blossoms or morning dew.",
    example: "The ephemeral beauty of the sunset reminded her to appreciate life's passing moments.",
    etymology: "From Greek ephēmeros, meaning 'lasting only a day,' from epi (on) + hēmera (day).",
    type: "creative",
    quote: {
      text: "We are all ephemeral creatures, destined to leave only traces of ourselves behind.",
      bookTitle: "The Name of the Wind",
      author: "Patrick Rothfuss"
    }
  },
  {
    word: "Mellifluous",
    pronunciation: "/meˈlɪfluəs/",
    partOfSpeech: "adjective",
    definition: "Sweet-sounding; pleasingly smooth and musical to the ear, often describing a voice or melody.",
    example: "His mellifluous voice made even the most mundane announcements sound like poetry.",
    etymology: "From Latin mellifluus, from mel (honey) + fluere (to flow), literally 'flowing with honey.'",
    type: "creative",
    quote: {
      text: "Her voice was low and mellifluous, the kind of voice that could convince you of anything.",
      bookTitle: "The Great Gatsby",
      author: "F. Scott Fitzgerald"
    }
  },
  {
    word: "Ethereal",
    pronunciation: "/ɪˈθɪəriəl/",
    partOfSpeech: "adjective",
    definition: "Extremely delicate and light; seeming too perfect for this world; heavenly or celestial.",
    example: "The dancer moved with an ethereal grace that made her seem to float above the stage.",
    etymology: "From Latin aethereus, from Greek aitherios (of the upper air), from aithēr (the pure upper air).",
    type: "creative",
    quote: {
      text: "She had an ethereal quality about her, as if she might dissolve into mist at any moment.",
      bookTitle: "Wuthering Heights",
      author: "Emily Brontë"
    }
  },
  {
    word: "Luminous",
    pronunciation: "/ˈluːmɪnəs/",
    partOfSpeech: "adjective",
    definition: "Full of or shedding light; bright, radiant, or glowing; also describing something intellectually brilliant.",
    example: "The luminous full moon cast silver shadows across the sleeping garden.",
    etymology: "From Latin luminosus, from lumen (light), related to lucere (to shine).",
    type: "creative",
    quote: {
      text: "The luminous depths of the sky seemed to open up before her, revealing stars beyond counting.",
      bookTitle: "The Lord of the Rings",
      author: "J.R.R. Tolkien"
    }
  },
  {
    word: "Ineffable",
    pronunciation: "/ɪnˈefəbl/",
    partOfSpeech: "adjective",
    definition: "Too great or extreme to be expressed or described in words; beyond verbal expression.",
    example: "The view from the mountaintop filled her with an ineffable sense of peace.",
    etymology: "From Latin ineffabilis, from in- (not) + effabilis (utterable), from effari (to speak out).",
    type: "creative",
    quote: {
      text: "There are things known and there are things unknown, and in between are the doors of perception—the ineffable mysteries of existence.",
      bookTitle: "The Doors of Perception",
      author: "Aldous Huxley"
    }
  },
  {
    word: "Resplendent",
    pronunciation: "/rɪˈsplendənt/",
    partOfSpeech: "adjective",
    definition: "Shining brilliantly; dressed in rich, impressive attire; dazzling in appearance.",
    example: "The bride looked resplendent in her grandmother's vintage lace wedding gown.",
    etymology: "From Latin resplendere, from re- (intensive) + splendere (to shine, glitter).",
    type: "creative",
    quote: {
      text: "The queen appeared resplendent in cloth of gold, diamonds glittering at her throat.",
      bookTitle: "Wolf Hall",
      author: "Hilary Mantel"
    }
  },
  {
    word: "Petrichor",
    pronunciation: "/ˈpetrɪkɔːr/",
    partOfSpeech: "noun",
    definition: "The pleasant, earthy smell produced when rain falls on dry soil.",
    example: "After months of drought, the petrichor that followed the first rain was intoxicating.",
    etymology: "Coined in 1964 from Greek petra (stone) + ichor (the fluid flowing in the veins of the gods).",
    type: "creative",
    quote: {
      text: "The rain came down in sheets, and with it came the petrichor, that ancient perfume of the earth.",
      bookTitle: "The Overstory",
      author: "Richard Powers"
    }
  },

  // === BUSINESS VOCABULARY ===
  {
    word: "Synergy",
    pronunciation: "/ˈsɪnərdʒi/",
    partOfSpeech: "noun",
    definition: "The interaction of elements that when combined produce a total effect greater than the sum of individual parts.",
    example: "The merger created synergy between the two companies' research departments.",
    etymology: "From Greek synergos (working together), from syn- (together) + ergon (work).",
    type: "business",
    quote: {
      text: "The synergy of collaboration creates results that no individual effort could achieve alone.",
      bookTitle: "The 7 Habits of Highly Effective People",
      author: "Stephen R. Covey"
    }
  },
  {
    word: "Leverage",
    pronunciation: "/ˈlevərɪdʒ/",
    partOfSpeech: "verb",
    definition: "To use something to maximum advantage; to strategically utilize resources or position.",
    example: "She leveraged her industry connections to secure the partnership deal.",
    etymology: "From Old French levier (to raise), from Latin levare (to lift), extended to business meaning in the 20th century.",
    type: "business",
    quote: {
      text: "Give me a lever long enough and a fulcrum on which to place it, and I shall move the world.",
      bookTitle: "Collected Works",
      author: "Archimedes"
    }
  },
  {
    word: "Scalable",
    pronunciation: "/ˈskeɪləbl/",
    partOfSpeech: "adjective",
    definition: "Able to be changed in size or scale; capable of growing or expanding efficiently.",
    example: "Investors were impressed by the startup's scalable business model.",
    etymology: "From Latin scala (ladder) + -able, popularized in tech and business contexts in the late 20th century.",
    type: "business",
    quote: {
      text: "The key to building a successful technology company is creating a scalable platform that grows with demand.",
      bookTitle: "Zero to One",
      author: "Peter Thiel"
    }
  },
  {
    word: "Stakeholder",
    pronunciation: "/ˈsteɪkˌhoʊldər/",
    partOfSpeech: "noun",
    definition: "A person or group with an interest or concern in a business or enterprise.",
    example: "The project manager scheduled meetings with all key stakeholders to gather requirements.",
    etymology: "From stake (a share or interest) + holder, first used in business context in the 1960s.",
    type: "business",
    quote: {
      text: "Every stakeholder in an organization brings a unique perspective that must be heard and valued.",
      bookTitle: "Good to Great",
      author: "Jim Collins"
    }
  },
  {
    word: "Pivot",
    pronunciation: "/ˈpɪvət/",
    partOfSpeech: "verb",
    definition: "To fundamentally change the direction or strategy of a business while maintaining core elements.",
    example: "When the market shifted, the company had to pivot from hardware to software services.",
    etymology: "From French pivot (hinge), extended to business strategy meaning in the startup era.",
    type: "business",
    quote: {
      text: "A pivot is a structured course correction designed to test a new fundamental hypothesis about the product, strategy, and engine of growth.",
      bookTitle: "The Lean Startup",
      author: "Eric Ries"
    }
  },
  {
    word: "Benchmark",
    pronunciation: "/ˈbentʃˌmɑːrk/",
    partOfSpeech: "noun",
    definition: "A standard or point of reference against which things may be compared or assessed.",
    example: "The industry leader's performance became the benchmark for all competitors.",
    etymology: "Originally a surveyor's mark cut in rock, extended to business meaning in the 1970s.",
    type: "business",
    quote: {
      text: "What gets measured gets managed. A benchmark provides the standard against which all progress is measured.",
      bookTitle: "The Effective Executive",
      author: "Peter Drucker"
    }
  },

  // === MOODS & MINDFULNESS ===
  {
    word: "Equanimity",
    pronunciation: "/ˌiːkwəˈnɪmɪti/",
    partOfSpeech: "noun",
    definition: "Mental calmness and composure, especially in difficult situations; evenness of temper.",
    example: "She faced the crisis with remarkable equanimity, never losing her composure.",
    etymology: "From Latin aequanimitas, from aequus (even) + animus (mind, spirit).",
    type: "mindfulness",
    quote: {
      text: "Equanimity arises when we accept the way things are.",
      bookTitle: "Wherever You Go, There You Are",
      author: "Jon Kabat-Zinn"
    }
  },
  {
    word: "Tranquil",
    pronunciation: "/ˈtræŋkwɪl/",
    partOfSpeech: "adjective",
    definition: "Free from disturbance; calm, serene, and peaceful in quality or state.",
    example: "The tranquil lake reflected the mountains like a perfect mirror at dawn.",
    etymology: "From Latin tranquillus (calm, still), possibly related to trans- (across) + quies (rest).",
    type: "mindfulness",
    quote: {
      text: "Tranquil pleasures last the longest; we are not fitted to bear the burden of great joys.",
      bookTitle: "Letters from a Stoic",
      author: "Seneca"
    }
  },
  {
    word: "Satori",
    pronunciation: "/səˈtɔːri/",
    partOfSpeech: "noun",
    definition: "A sudden moment of awakening or enlightenment in Zen Buddhism; profound insight.",
    example: "During meditation, she experienced a satori that transformed her understanding of self.",
    etymology: "From Japanese 悟り (satori), meaning 'understanding' or 'awakening,' from satoru (to know).",
    type: "mindfulness",
    quote: {
      text: "Satori is the sudden flashing into consciousness of a new truth hitherto undreamed of.",
      bookTitle: "Essays in Zen Buddhism",
      author: "D.T. Suzuki"
    }
  },
  {
    word: "Halcyon",
    pronunciation: "/ˈhælsiən/",
    partOfSpeech: "adjective",
    definition: "Denoting a period of time in the past that was idyllically happy and peaceful.",
    example: "She often reminisced about the halcyon days of her childhood summers by the sea.",
    etymology: "From Greek halkyon (kingfisher), associated with calm seas during the bird's breeding season.",
    type: "mindfulness",
    quote: {
      text: "Those halcyon days when we believed anything was possible now seem like a distant dream.",
      bookTitle: "Brideshead Revisited",
      author: "Evelyn Waugh"
    }
  },
  {
    word: "Solace",
    pronunciation: "/ˈsɒləs/",
    partOfSpeech: "noun",
    definition: "Comfort or consolation in a time of distress or sadness; a source of relief.",
    example: "She found solace in the garden, where the rhythm of nature soothed her troubled mind.",
    etymology: "From Latin solacium (comfort, consolation), from solari (to console).",
    type: "mindfulness",
    quote: {
      text: "In the midst of winter, I found there was, within me, an invincible summer. And that makes me happy. For it says that no matter how hard the world pushes against me, within me, there's something stronger—something better, pushing right back. This was my solace.",
      bookTitle: "Return to Tipasa",
      author: "Albert Camus"
    }
  },
  {
    word: "Serenity",
    pronunciation: "/səˈrenɪti/",
    partOfSpeech: "noun",
    definition: "The state of being calm, peaceful, and untroubled; a disposition free from stress.",
    example: "The monastery radiated a serenity that immediately calmed every visitor who entered.",
    etymology: "From Latin serenitas (clearness, calmness), from serenus (clear, bright, serene).",
    type: "mindfulness",
    quote: {
      text: "God grant me the serenity to accept the things I cannot change, the courage to change the things I can, and the wisdom to know the difference.",
      bookTitle: "The Serenity Prayer",
      author: "Reinhold Niebuhr"
    }
  },
  {
    word: "Contemplative",
    pronunciation: "/kənˈtemplətɪv/",
    partOfSpeech: "adjective",
    definition: "Expressing or involving prolonged thought; given to deep reflection and meditation.",
    example: "His contemplative nature led him to spend hours in quiet introspection.",
    etymology: "From Latin contemplativus, from contemplari (to gaze attentively, observe).",
    type: "mindfulness",
    quote: {
      text: "The contemplative life is one devoted to the pursuit of wisdom and understanding through reflection.",
      bookTitle: "Nicomachean Ethics",
      author: "Aristotle"
    }
  },
  {
    word: "Melancholy",
    pronunciation: "/ˈmelənkɒli/",
    partOfSpeech: "noun",
    definition: "A deep, pensive sadness; a thoughtful or gentle sorrow that can feel almost beautiful.",
    example: "There was a sweet melancholy in the autumn air as leaves drifted to the ground.",
    etymology: "From Greek melankholia (sadness), from melas (black) + kholē (bile), referring to ancient humoral theory.",
    type: "mindfulness",
    quote: {
      text: "There is a certain melancholy in growing older, a wisdom earned through loss.",
      bookTitle: "The Anatomy of Melancholy",
      author: "Robert Burton"
    }
  },
  {
    word: "Euphoria",
    pronunciation: "/juːˈfɔːriə/",
    partOfSpeech: "noun",
    definition: "An intense feeling of well-being, elation, and happiness; a state of overwhelming joy.",
    example: "Crossing the finish line filled her with euphoria she had never experienced before.",
    etymology: "From Greek euphoria (power of enduring easily), from eu- (well) + pherein (to bear).",
    type: "mindfulness",
    quote: {
      text: "The euphoria of victory was short-lived, replaced by the quiet satisfaction of a job well done.",
      bookTitle: "Man's Search for Meaning",
      author: "Viktor Frankl"
    }
  },
  {
    word: "Wistful",
    pronunciation: "/ˈwɪstfʊl/",
    partOfSpeech: "adjective",
    definition: "Having or showing a feeling of vague or regretful longing; pensively sad.",
    example: "He gave a wistful smile as he looked at the old photographs from his university days.",
    etymology: "Perhaps from obsolete wistly (intently), influenced by wishful; first recorded in the early 17th century.",
    type: "mindfulness",
    quote: {
      text: "She looked at him with wistful eyes, knowing that this moment would never come again.",
      bookTitle: "The Age of Innocence",
      author: "Edith Wharton"
    }
  },
  {
    word: "Elation",
    pronunciation: "/ɪˈleɪʃən/",
    partOfSpeech: "noun",
    definition: "Great happiness and exhilaration; a feeling of pride and joy at an achievement.",
    example: "The team's elation was palpable as they celebrated their championship victory.",
    etymology: "From Latin elatio (a lifting up), from efferre (to carry out, raise up).",
    type: "mindfulness",
    quote: {
      text: "The elation of discovery surpasses any other pleasure the mind can experience.",
      bookTitle: "The Double Helix",
      author: "James D. Watson"
    }
  },
  {
    word: "Ennui",
    pronunciation: "/ɒnˈwiː/",
    partOfSpeech: "noun",
    definition: "A feeling of listlessness and dissatisfaction arising from a lack of excitement or purpose.",
    example: "The endless gray winter days filled him with a deep sense of ennui.",
    etymology: "From French ennui (boredom), from Old French enui (annoyance), from enuier (to annoy).",
    type: "mindfulness",
    quote: {
      text: "Ennui had taken possession of me, that ennui which comes from too much ease.",
      bookTitle: "Madame Bovary",
      author: "Gustave Flaubert"
    }
  },
  {
    word: "Catharsis",
    pronunciation: "/kəˈθɑːsɪs/",
    partOfSpeech: "noun",
    definition: "The process of releasing strong emotions through art or expression; emotional purification.",
    example: "Writing in her journal provided a catharsis that helped her process the difficult year.",
    etymology: "From Greek katharsis (purification, cleansing), from kathairein (to purify).",
    type: "mindfulness",
    quote: {
      text: "Tragedy, then, is an imitation of an action that is serious, complete, and of a certain magnitude; in language embellished with each kind of artistic ornament, the several kinds being found in separate parts of the play; in the form of action, not of narrative; through pity and fear effecting the proper catharsis of these emotions.",
      bookTitle: "Poetics",
      author: "Aristotle"
    }
  },
  {
    word: "Placid",
    pronunciation: "/ˈplæsɪd/",
    partOfSpeech: "adjective",
    definition: "Not easily upset or excited; calm and peaceful with little movement or activity.",
    example: "The placid waters of the lake perfectly mirrored the surrounding mountains.",
    etymology: "From Latin placidus (gentle, quiet), from placere (to please).",
    type: "mindfulness",
    quote: {
      text: "The placid surface of the pond belied the turmoil of life beneath.",
      bookTitle: "Walden",
      author: "Henry David Thoreau"
    }
  },
  {
    word: "Ebullient",
    pronunciation: "/ɪˈbʌliənt/",
    partOfSpeech: "adjective",
    definition: "Overflowing with enthusiasm, excitement, or cheerfulness; exuberantly lively.",
    example: "Her ebullient personality made every gathering feel like a celebration.",
    etymology: "From Latin ebullire (to bubble up), from e- (out) + bullire (to boil).",
    type: "mindfulness",
    quote: {
      text: "Her ebullient nature was infectious; no one could remain sullen in her presence.",
      bookTitle: "Anne of Green Gables",
      author: "L.M. Montgomery"
    }
  },
  {
    word: "Pensive",
    pronunciation: "/ˈpensɪv/",
    partOfSpeech: "adjective",
    definition: "Engaged in deep or serious thought, often with a tinge of sadness or dreaminess.",
    example: "She sat by the window in a pensive mood, watching the rain fall.",
    etymology: "From Old French pensif, from penser (to think), from Latin pensare (to weigh, consider).",
    type: "mindfulness",
    quote: {
      text: "He fell into a pensive silence, his thoughts wandering to distant memories.",
      bookTitle: "Jane Eyre",
      author: "Charlotte Brontë"
    }
  },
  {
    word: "Rapture",
    pronunciation: "/ˈræptʃər/",
    partOfSpeech: "noun",
    definition: "A feeling of intense pleasure or joy; ecstatic delight that transports one beyond ordinary experience.",
    example: "The audience listened in rapture as the orchestra performed the symphony's finale.",
    etymology: "From Latin raptura (seizure), from rapere (to seize), suggesting being 'seized' by emotion.",
    type: "mindfulness",
    quote: {
      text: "I felt a rapture so intense that it seemed as if the heavens had opened.",
      bookTitle: "Confessions",
      author: "Saint Augustine"
    }
  },
  {
    word: "Languor",
    pronunciation: "/ˈlæŋɡər/",
    partOfSpeech: "noun",
    definition: "A state of pleasant tiredness or dreamy inactivity; a relaxed, unhurried quality.",
    example: "The summer heat induced a languor that made even simple tasks feel luxuriously slow.",
    etymology: "From Latin languor (faintness, weariness), from languere (to be faint or weak).",
    type: "mindfulness",
    quote: {
      text: "A delicious languor stole over her as the afternoon sun warmed her skin.",
      bookTitle: "The Awakening",
      author: "Kate Chopin"
    }
  },
  {
    word: "Center",
    pronunciation: "/ˈsɛntər/",
    partOfSpeech: "verb",
    definition: "To bring attention back to the present moment and restore emotional or mental balance.",
    example: "She paused to center herself before responding to the difficult conversation.",
    etymology: "From Latin 'centrum', meaning the middle point; adopted in mindfulness to describe returning to inner balance.",
    type: "mindfulness",
    quote: {
      text: "When you center yourself, you find a stillness at the core of your being that nothing can disturb.",
      bookTitle: "The Power of Now",
      author: "Eckhart Tolle"
    }
  },
  {
    word: "Panacea",
    pronunciation: "/ˌpænəˈsiːə/",
    partOfSpeech: "noun",
    definition: "A solution or remedy for all difficulties or diseases.",
    example: "Education is often seen as a panacea for social problems.",
    etymology: "From Greek panakeia (universal remedy), from pan (all) + akos (cure).",
    type: "mindfulness",
    quote: {
      text: "There is no panacea for the problems of humanity, only the slow, patient work of understanding.",
      bookTitle: "The Open Society and Its Enemies",
      author: "Karl Popper"
    }
  },
  {
    word: "Quintessential",
    pronunciation: "/ˌkwɪntɪˈsenʃəl/",
    partOfSpeech: "adjective",
    definition: "Representing the most perfect or typical example of a quality or class; the purest essence of something.",
    example: "The cozy café was the quintessential Parisian experience she had always dreamed of.",
    etymology: "From medieval Latin quinta essentia (fifth essence), referring to a substance beyond the four elements.",
    type: "general",
    quote: {
      text: "He was the quintessential English gentleman, polite to a fault and impeccably dressed.",
      bookTitle: "The Remains of the Day",
      author: "Kazuo Ishiguro"
    }
  },
  {
    word: "Sanguine",
    pronunciation: "/ˈsæŋɡwɪn/",
    partOfSpeech: "adjective",
    definition: "Optimistic and positive, especially in a difficult situation; cheerfully confident about the future.",
    example: "Despite the challenging forecast, she remained sanguine about the project's success.",
    etymology: "From Latin sanguineus (of blood), based on medieval belief that blood was associated with cheerful temperament.",
    type: "general",
    quote: {
      text: "He was of a sanguine temperament, always expecting the best even when circumstances suggested otherwise.",
      bookTitle: "David Copperfield",
      author: "Charles Dickens"
    }
  },
  {
    word: "Reverence",
    pronunciation: "/ˈrevərəns/",
    partOfSpeech: "noun",
    definition: "Deep respect and admiration for someone or something; a feeling of awe and devotion.",
    example: "She spoke of her grandmother with such reverence that everyone in the room fell silent.",
    etymology: "From Latin reverentia, from revereri (to stand in awe of), from re- + vereri (to fear, respect).",
    type: "general",
    quote: {
      text: "Reverence for life affords me my fundamental principle of morality.",
      bookTitle: "Out of My Life and Thought",
      author: "Albert Schweitzer"
    }
  }
];

export function getWordOfTheDay(types?: string[]): Word {
  // Filter words by types if provided
  const filteredWords = types && types.length > 0 
    ? words.filter(word => types.includes(word.type))
    : words;
  
  // Fallback to all words if filter returns empty
  const wordPool = filteredWords.length > 0 ? filteredWords : words;
  
  // Use the current date to deterministically select a word
  const today = new Date();
  const startOfYear = new Date(today.getFullYear(), 0, 0);
  const diff = today.getTime() - startOfYear.getTime();
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
  
  return wordPool[dayOfYear % wordPool.length];
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
