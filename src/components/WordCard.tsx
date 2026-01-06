import { Word } from "@/data/words";
import { motion } from "framer-motion";
import { Volume2, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useActivityLog } from "@/hooks/useActivityLogger";

const WORD_TYPES = [
  { value: "all", label: "All" },
  { value: "general", label: "General" },
  { value: "academic", label: "Academic" },
  { value: "creative", label: "Creative" },
  { value: "business", label: "Business" },
  { value: "mindfulness", label: "Mindfulness" },
];

interface WordCardProps {
  word: Word;
  onCategoryChange?: (category: string) => void;
  isFilterActive?: boolean;
}

const WordCard = ({ word, onCategoryChange, isFilterActive }: WordCardProps) => {
  const { logAction } = useActivityLog();

  const speakWord = () => {
    logAction('button_click', 'Pronunciation');
    const utterance = new SpeechSynthesisUtterance(word.word);
    utterance.rate = 0.8;
    speechSynthesis.speak(utterance);
  };

  const handleCategorySelect = (category: string) => {
    logAction('dropdown_select', `Category: ${category}`);
    onCategoryChange?.(category);
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="word-card max-w-2xl mx-auto"
    >
      {/* Word Header */}
      <div className="text-center mb-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="font-serif text-5xl md:text-7xl font-semibold text-foreground tracking-tight mb-4"
        >
          {word.word}
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex items-center justify-center gap-3"
        >
          <span className="pronunciation">{word.pronunciation}</span>
          <button
            onClick={speakWord}
            className="p-2 rounded-full hover:bg-primary/10 transition-colors duration-200 text-muted-foreground hover:text-primary"
            aria-label="Listen to pronunciation"
          >
            <Volume2 className="w-5 h-5" />
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-4"
        >
          <span className="part-of-speech">{word.partOfSpeech}</span>
        </motion.div>
      </div>

      {/* Decorative Divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="decorative-line my-8"
      />

      {/* Definition */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        className="mb-8"
      >
        <h2 className="font-sans text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
          Definition
        </h2>
        <p className="definition-text">{word.definition}</p>
      </motion.div>

      {/* Example */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="mb-8"
      >
        <h2 className="font-sans text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
          Example
        </h2>
        <blockquote className="example-text">"{word.example}"</blockquote>
      </motion.div>

      {/* Etymology */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="mb-8"
      >
        <h2 className="font-sans text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
          Origin
        </h2>
        <p className="etymology-text">{word.etymology}</p>
      </motion.div>

      {/* Category */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="text-center"
      >
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className={`inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider px-3 py-1.5 rounded-full bg-muted text-muted-foreground hover:bg-muted/80 transition-colors cursor-pointer ${isFilterActive ? 'ring-2 ring-foreground' : ''}`}>
              {word.type}
              <ChevronDown className="w-3 h-3" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center">
            {WORD_TYPES.map((type) => (
              <DropdownMenuItem
                key={type.value}
                onClick={() => handleCategorySelect(type.value)}
                className="cursor-pointer"
              >
                {type.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </motion.div>
    </motion.div>
  );
};

export default WordCard;
