import { getWordOfTheDay, formatDate, words, Word, getWordsByType } from "@/data/words";
import Header from "@/components/Header";
import WordCard from "@/components/WordCard";
import UserMenu from "@/components/UserMenu";
import { motion } from "framer-motion";
import { useState, useCallback, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Shuffle } from "lucide-react";
import { Link } from "react-router-dom";
import AboutDropdown from "@/components/AboutDropdown";
import { FeedbackDialog } from "@/components/FeedbackDialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useUserPreferences } from "@/hooks/useUserPreferences";
import { useActivityLog } from "@/hooks/useActivityLogger";



const CATEGORY_STORAGE_KEY = 'worddelight_active_category';

const Index = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { preferredWordTypes, loading } = useUserPreferences();
  const { logButtonClick, logWordDisplay } = useActivityLog();
  const [currentWord, setCurrentWord] = useState<Word | null>(null);
  const [wordKey, setWordKey] = useState(0);
  const [activeCategory, setActiveCategory] = useState<string | null>(() => {
    // Initialize from localStorage for guest persistence
    const saved = localStorage.getItem(CATEGORY_STORAGE_KEY);
    return saved || null;
  });
  const [initialWordLoaded, setInitialWordLoaded] = useState(false);
  const currentDate = formatDate();

  // Set initial word - check URL param first, then category/preferences
  useEffect(() => {
    if (!loading && !initialWordLoaded) {
      const wordFromUrl = searchParams.get('word');
      
      if (wordFromUrl) {
        // Find the word in our collection (case-insensitive)
        const foundWord = words.find(
          w => w.word.toLowerCase() === wordFromUrl.toLowerCase()
        );
        
        if (foundWord) {
          setCurrentWord(foundWord);
          logWordDisplay(foundWord.word);
          // Clear the URL param after loading
          setSearchParams({}, { replace: true });
          setInitialWordLoaded(true);
          return;
        }
      }
      
      // Fallback to category/preferences logic
      const typesToUse = activeCategory ? [activeCategory] : preferredWordTypes;
      const filteredWords = getWordsByType(typesToUse);
      const wordPool = filteredWords.length > 0 ? filteredWords : words;
      const randomWord = wordPool[Math.floor(Math.random() * wordPool.length)];
      setCurrentWord(randomWord);
      logWordDisplay(randomWord.word);
      setInitialWordLoaded(true);
    }
  }, [loading, preferredWordTypes, activeCategory, logWordDisplay, searchParams, setSearchParams, initialWordLoaded]);

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
    logWordDisplay(randomWord.word);
  }, [currentWord?.word, preferredWordTypes, activeCategory, logButtonClick, logWordDisplay]);

  const handleCategoryChange = useCallback((category: string) => {
    // Treat "all" as clearing the filter
    const newCategory = category === 'all' ? null : category;
    setActiveCategory(newCategory);
    // Persist category to localStorage for guest users
    if (newCategory) {
      localStorage.setItem(CATEGORY_STORAGE_KEY, newCategory);
    } else {
      localStorage.removeItem(CATEGORY_STORAGE_KEY);
    }
    
    // Get words based on category (all words if null)
    const filteredWords = newCategory ? getWordsByType([newCategory]) : words;
    if (filteredWords.length > 0) {
      const randomWord = filteredWords[Math.floor(Math.random() * filteredWords.length)];
      setCurrentWord(randomWord);
      setWordKey((prev) => prev + 1);
      logWordDisplay(randomWord.word);
    }
  }, [logWordDisplay]);

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
          <AboutDropdown />
          <FeedbackDialog />
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
            className="text-center mt-16 md:mt-20 space-y-2"
          >
            <p className="font-sans text-xs text-muted-foreground/60 tracking-wide">
              Expand your vocabulary, one word at a time
            </p>
            <p className="font-sans text-[10px] text-muted-foreground/40">
              <Link 
                to="/changelog" 
                className="hover:text-primary transition-colors"
              >
                v{__APP_VERSION__}
              </Link>
              <span className="mx-1.5">·</span>
              <a 
                href="https://github.com/beebeatle/daily-word-gem" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                Contribute to this app's source code on GitHub
              </a>
            </p>
          </motion.footer>
        </div>
      </main>
    </div>
  );
};

export default Index;
