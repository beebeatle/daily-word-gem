import { useState, useMemo } from "react";
import { Word } from "@/data/words";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Sparkles } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface WordQuizProps {
  word: Word;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface QuizOption {
  text: string;
  isCorrect: boolean;
}

// Generate quiz options based on word data
const generateQuizOptions = (word: Word): QuizOption[] => {
  const correctFacts = [
    `The word "${word.word}" comes from ${word.etymology.toLowerCase().includes("from") ? word.etymology.split("from")[1]?.trim().split(",")[0] || "ancient origins" : word.etymology.split(".")[0]}`,
    `"${word.word}" is a ${word.partOfSpeech.toLowerCase()}`,
    `One meaning of "${word.word}" is: ${word.definition.split(",")[0].toLowerCase()}`,
  ];

  const incorrectFacts = [
    `The word "${word.word}" was coined in the 21st century by internet culture`,
    `"${word.word}" originally meant "a type of ancient currency"`,
    `The word "${word.word}" has exactly 47 different meanings in English`,
    `"${word.word}" was first used by Shakespeare in his lost play`,
    `This word is banned from use in formal academic writing`,
    `"${word.word}" is derived from an extinct language spoken only in Antarctica`,
    `The word was invented by a 5-year-old in a spelling bee`,
    `"${word.word}" is the most mispronounced word in the English language`,
  ];

  // Pick one random correct fact
  const correctFact = correctFacts[Math.floor(Math.random() * correctFacts.length)];
  
  // Pick two random incorrect facts
  const shuffledIncorrect = incorrectFacts.sort(() => Math.random() - 0.5);
  const selectedIncorrect = shuffledIncorrect.slice(0, 2);

  // Combine and shuffle
  const options: QuizOption[] = [
    { text: correctFact, isCorrect: true },
    { text: selectedIncorrect[0], isCorrect: false },
    { text: selectedIncorrect[1], isCorrect: false },
  ].sort(() => Math.random() - 0.5);

  return options;
};

const WordQuiz = ({ word, open, onOpenChange }: WordQuizProps) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);

  const options = useMemo(() => generateQuizOptions(word), [word]);

  const handleOptionClick = (index: number) => {
    if (hasAnswered) return;
    setSelectedOption(index);
    setHasAnswered(true);
  };

  const handleClose = () => {
    setSelectedOption(null);
    setHasAnswered(false);
    onOpenChange(false);
  };

  const handlePlayAgain = () => {
    setSelectedOption(null);
    setHasAnswered(false);
  };

  const isCorrectAnswer = selectedOption !== null && options[selectedOption]?.isCorrect;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-serif text-xl">
            <Sparkles className="w-5 h-5 text-primary" />
            Quiz: {word.word}
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <p className="text-sm text-muted-foreground mb-4">
            Which fact about "{word.word}" is true?
          </p>

          <div className="space-y-3">
            {options.map((option, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleOptionClick(index)}
                disabled={hasAnswered}
                className={`w-full text-left p-4 rounded-lg border transition-all duration-200 ${
                  hasAnswered
                    ? option.isCorrect
                      ? "border-green-500 bg-green-50 dark:bg-green-950/30"
                      : selectedOption === index
                        ? "border-destructive bg-destructive/10"
                        : "border-border opacity-50"
                    : "border-border hover:border-primary hover:bg-muted/50 cursor-pointer"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-sm font-medium ${
                      hasAnswered
                        ? option.isCorrect
                          ? "bg-green-500 text-white"
                          : selectedOption === index
                            ? "bg-destructive text-destructive-foreground"
                            : "bg-muted text-muted-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {hasAnswered ? (
                      option.isCorrect ? (
                        <Check className="w-4 h-4" />
                      ) : selectedOption === index ? (
                        <X className="w-4 h-4" />
                      ) : (
                        String.fromCharCode(65 + index)
                      )
                    ) : (
                      String.fromCharCode(65 + index)
                    )}
                  </div>
                  <span className="text-sm">{option.text}</span>
                </div>
              </motion.button>
            ))}
          </div>

          <AnimatePresence>
            {hasAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-6 text-center"
              >
                <p
                  className={`text-lg font-medium mb-4 ${
                    isCorrectAnswer ? "text-green-600 dark:text-green-400" : "text-destructive"
                  }`}
                >
                  {isCorrectAnswer ? "🎉 Correct!" : "❌ Not quite!"}
                </p>
                <button
                  onClick={handlePlayAgain}
                  className="px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  Play Again
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WordQuiz;
