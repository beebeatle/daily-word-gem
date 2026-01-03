import { getWordOfTheDay, formatDate, words, Word } from "@/data/words";
import Header from "@/components/Header";
import WordCard from "@/components/WordCard";
import UserMenu from "@/components/UserMenu";
import { motion } from "framer-motion";
import { useState, useCallback } from "react";
import { Shuffle, Lightbulb } from "lucide-react";

// TODO: Replace with your actual Nolt board URL
const NOLT_URL = "https://your-app.nolt.io";

const Index = () => {
  const [currentWord, setCurrentWord] = useState<Word>(getWordOfTheDay);
  const [wordKey, setWordKey] = useState(0);
  const currentDate = formatDate();

  const shuffleWord = useCallback(() => {
    const availableWords = words.filter(w => w.word !== currentWord.word);
    const randomWord = availableWords[Math.floor(Math.random() * availableWords.length)];
    setCurrentWord(randomWord);
    setWordKey(prev => prev + 1);
  }, [currentWord.word]);

  return (
    <div className="min-h-screen bg-background">
      {/* Subtle background texture */}
      <div 
        className="fixed inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground) / 0.03) 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }}
      />
      
      {/* Top bar */}
      <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between">
        {/* Feature Requests Link */}
        <a
          href={NOLT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary/80 hover:bg-secondary text-secondary-foreground transition-all duration-300 font-sans text-xs font-medium"
        >
          <Lightbulb className="w-3.5 h-3.5 transition-transform duration-300 group-hover:scale-110" />
          Feature Requests
        </a>
        
        <UserMenu />
      </div>
      
      <main className="relative z-10 px-6 py-12 md:py-20">
        <div className="max-w-4xl mx-auto">
          <Header date={currentDate} />
          <WordCard key={wordKey} word={currentWord} />
          
          {/* Shuffle Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="flex justify-center mt-10"
          >
            <button
              onClick={shuffleWord}
              className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-secondary hover:bg-secondary/80 text-secondary-foreground transition-all duration-300 font-sans text-sm font-medium"
            >
              <Shuffle className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" />
              Try another word
            </button>
          </motion.div>
          
          {/* Footer */}
          <motion.footer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="text-center mt-16 md:mt-20"
          >
            <p className="font-sans text-xs text-muted-foreground/60 tracking-wide">
              Expand your vocabulary, one word at a time
            </p>
          </motion.footer>
        </div>
      </main>
    </div>
  );
};

export default Index;
