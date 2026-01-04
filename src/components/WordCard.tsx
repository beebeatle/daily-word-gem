import { Word } from "@/data/words";
import { motion } from "framer-motion";
import { Volume2 } from "lucide-react";

interface WordCardProps {
  word: Word;
}

const WordCard = ({ word }: WordCardProps) => {
  const speakWord = () => {
    const utterance = new SpeechSynthesisUtterance(word.word);
    utterance.rate = 0.8;
    speechSynthesis.speak(utterance);
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
        <span className="text-xs font-medium uppercase tracking-wider px-3 py-1.5 rounded-full bg-primary/10 text-primary">
          {word.type}
        </span>
      </motion.div>
    </motion.div>
  );
};

export default WordCard;
