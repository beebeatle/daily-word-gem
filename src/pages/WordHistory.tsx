import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Calendar, History } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { words, Word } from "@/data/words";
import WordCard from "@/components/WordCard";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { format } from "date-fns";

interface WordOfTheDay {
  id: string;
  word: string;
  word_type: string;
  date: string;
  created_at: string;
}

const WordHistory = () => {
  const [history, setHistory] = useState<WordOfTheDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedWord, setSelectedWord] = useState<Word | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const { data, error } = await supabase
          .from("word_of_the_day")
          .select("*")
          .order("date", { ascending: false })
          .limit(30);

        if (error) {
          console.error("Error fetching word history:", error);
          setLoading(false);
          return;
        }

        setHistory(data || []);
      } catch (error) {
        console.error("Error fetching history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const getWordDetails = (wordText: string): Word | undefined => {
    return words.find((w) => w.word === wordText);
  };

  const handleWordClick = (wordText: string) => {
    const wordDetails = getWordDetails(wordText);
    if (wordDetails) {
      setSelectedWord(wordDetails);
      setSheetOpen(true);
    }
  };

  const getCategoryLabel = (type: string) => {
    const labels: Record<string, string> = {
      general: "General",
      academic: "Academic",
      creative: "Creative",
      business: "Business",
      mindfulness: "Moods & Mindfulness",
    };
    return labels[type] || type;
  };

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

      {/* Back link */}
      <div className="absolute top-4 left-4 z-20">
        <Link
          to="/"
          className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary/80 hover:bg-secondary text-secondary-foreground transition-all duration-300 font-sans text-xs font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-x-0.5" />
          Back to Words
        </Link>
      </div>

      <main className="relative z-10 px-6 py-12 md:py-20">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-16"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <History className="w-5 h-5 text-primary" />
              <span className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                About
              </span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-semibold text-foreground tracking-tight">
              Words of the Day
            </h1>
            <p className="font-sans text-sm text-muted-foreground mt-4">
              A history of our daily featured words
            </p>
          </motion.header>

          {/* History List */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {loading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="bg-card border border-border rounded-xl p-6 animate-pulse">
                    <div className="h-6 bg-muted rounded w-1/3 mb-2"></div>
                    <div className="h-4 bg-muted rounded w-2/3"></div>
                  </div>
                ))}
              </div>
            ) : history.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
                <p className="text-muted-foreground">No words of the day recorded yet.</p>
                <p className="text-sm text-muted-foreground/60 mt-2">
                  Check back tomorrow for our first featured word!
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {history.map((item, index) => {
                  const wordDetails = getWordDetails(item.word);
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + index * 0.05, duration: 0.4 }}
                      className="bg-card border border-border rounded-xl p-6 cursor-pointer hover:border-primary/50 hover:shadow-md transition-all duration-200"
                      onClick={() => handleWordClick(item.word)}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-serif text-2xl font-semibold text-foreground">
                              {item.word}
                            </h3>
                            <span className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-xs font-sans">
                              {getCategoryLabel(item.word_type)}
                            </span>
                          </div>
                          {wordDetails && (
                            <p className="text-foreground/80 leading-relaxed">
                              {wordDetails.definition}
                            </p>
                          )}
                        </div>
                        <div className="text-right shrink-0">
                          <div className="flex items-center gap-1.5 text-muted-foreground">
                            <Calendar className="w-3.5 h-3.5" />
                            <span className="font-sans text-xs">
                              {format(new Date(item.date), "MMM d, yyyy")}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </motion.section>

          <motion.footer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.6 }}
            className="text-center mt-16 md:mt-20 space-y-2"
          >
            <p className="font-sans text-xs text-muted-foreground/60 tracking-wide">
              Expand your vocabulary, one word at a time
            </p>
            <Link 
              to="/changelog" 
              className="font-sans text-[10px] text-muted-foreground/40 hover:text-primary transition-colors"
            >
              v{__APP_VERSION__}
            </Link>
          </motion.footer>
        </div>
      </main>

      {/* Word Detail Sheet */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent side="bottom" className="h-[90vh] overflow-y-auto">
          <SheetHeader className="sr-only">
            <SheetTitle>{selectedWord?.word}</SheetTitle>
          </SheetHeader>
          <div className="pt-6 pb-12">
            {selectedWord && <WordCard word={selectedWord} />}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default WordHistory;
