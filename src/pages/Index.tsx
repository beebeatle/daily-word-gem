import { getWordOfTheDay, formatDate, words, Word, getWordsByType } from "@/data/words";
import Header from "@/components/Header";
import WordCard from "@/components/WordCard";
import UserMenu from "@/components/UserMenu";
import { motion } from "framer-motion";
import { useState, useCallback, useEffect } from "react";
import { Shuffle, Lightbulb, Info } from "lucide-react";
import { Link } from "react-router-dom";
import { useUserPreferences } from "@/hooks/useUserPreferences";
import { useActivityLog } from "@/hooks/useActivityLogger";

const NOLT_URL = "https://worddelight.nolt.io";

const Index = () => {
  const { preferredWordTypes, loading } = useUserPreferences();
  const { logButtonClick } = useActivityLog();
  const [currentWord, setCurrentWord] = useState<Word | null>(null);
  const [wordKey, setWordKey] = useState(0);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const currentDate = formatDate();

  // Set initial word based on preferences
  useEffect(() => {
    if (!loading) {
      setCurrentWord(getWordOfTheDay(preferredWordTypes));
    }
  }, [loading, preferredWordTypes]);

  const shuffleWord = useCallback(() => {
    logButtonClick('Try another word');
    // Use active category if set, otherwise use user preferences
    const typesToUse = activeCategory ? [activeCategory] : preferredWordTypes;
    const filteredWords = getWordsByType(typesToUse);
    const wordPool = filteredWords.length > 0 ? filteredWords : words;
    const availableWords = wordPool.filter((w) => w.word !== currentWord?.word);
    const randomWord = availableWords[Math.floor(Math.random() * availableWords.length)];
    setCurrentWord(randomWord);
    setWordKey((prev) => prev + 1);
  }, [currentWord?.word, preferredWordTypes, activeCategory, logButtonClick]);

  const handleCategoryChange = useCallback((category: string) => {
    setActiveCategory(category);
    const filteredWords = getWordsByType([category]);
    if (filteredWords.length > 0) {
      const randomWord = filteredWords[Math.floor(Math.random() * filteredWords.length)];
      setCurrentWord(randomWord);
      setWordKey((prev) => prev + 1);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Subtle background texture */}
      <div
        className="fixed inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground) / 0.03) 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      {/* Top bar */}
      <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between">
        {/* Left side links */}
        <div className="flex items-center gap-2">
          <Link
            to="/about"
            className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary/80 hover:bg-secondary text-secondary-foreground transition-all duration-300 font-sans text-xs font-medium"
          >
            <Info className="w-3.5 h-3.5 transition-transform duration-300 group-hover:scale-110" />
            About
          </Link>
          <a
            href={NOLT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary/80 hover:bg-secondary text-secondary-foreground transition-all duration-300 font-sans text-xs font-medium"
          >
            <Lightbulb className="w-3.5 h-3.5 transition-transform duration-300 group-hover:scale-110" />
            Request a new feature
          </a>
        </div>

        <UserMenu />
      </div>

      <main className="relative z-10 px-6 py-12 md:py-20">
        <div className="max-w-4xl mx-auto">
          <Header date={currentDate} />
          {currentWord && <WordCard key={wordKey} word={currentWord} onCategoryChange={handleCategoryChange} isFilterActive={!!activeCategory} />}

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
