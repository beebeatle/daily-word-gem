import { useState } from "react";
import { Word, getBookSearchUrl } from "@/data/words";
import { motion } from "framer-motion";
import { format } from "date-fns";

import { Volume2, ChevronDown, ThumbsUp, ThumbsDown, Sparkles, Star, Calendar } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useActivityLog } from "@/hooks/useActivityLogger";
import { useWordReactions } from "@/hooks/useWordReactions";
import WordQuiz from "./WordQuiz";
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
  featuredDate?: string;
}

const WordCard = ({ word, onCategoryChange, isFilterActive, featuredDate }: WordCardProps) => {
  const { logAction } = useActivityLog();
  const { counts, userReaction, handleReaction, loading } = useWordReactions(word.word);
  const [quizOpen, setQuizOpen] = useState(false);

  const handleQuizOpen = () => {
    logAction('button_click', `Quiz: ${word.word}`);
    setQuizOpen(true);
  };

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

  const onLike = () => {
    logAction('button_click', `Like: ${word.word}`);
    handleReaction('like');
  };

  const onDislike = () => {
    logAction('button_click', `Dislike: ${word.word}`);
    handleReaction('dislike');
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="word-card max-w-2xl mx-auto"
    >
      {/* Featured Word of the Day Badge */}
      {featuredDate && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center gap-2 mb-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <Star className="w-4 h-4 text-primary fill-primary" />
            <span className="font-sans text-sm font-medium text-primary">
              Word of the Day
            </span>
            <span className="text-primary/60">•</span>
            <span className="inline-flex items-center gap-1 text-sm text-primary/80">
              <Calendar className="w-3.5 h-3.5" />
              {format(new Date(featuredDate + "T00:00:00"), "MMMM d, yyyy")}
            </span>
          </div>
        </motion.div>
      )}

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

      {/* Quote */}
      {word.quote && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mb-8"
        >
          <h2 className="font-sans text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
            Quote
          </h2>
          <blockquote className="example-text mb-2">"{word.quote.text}"</blockquote>
          <p className="font-sans text-sm text-muted-foreground inline-flex items-center gap-2 flex-wrap">
            — <span className="italic">{word.quote.bookTitle}</span> by {word.quote.author}
            <span className="inline-flex items-center gap-1.5">
              {/* Goodreads */}
              <a
                href={word.quote.bookUrl || getBookSearchUrl(word.quote.bookTitle, word.quote.author)}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
                title="Find on Goodreads"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.84 3.5c2.34 0 4.07.76 5.2 2.27s1.67 3.7 1.63 6.55c.04 2.86-.53 5.06-1.7 6.6s-2.91 2.31-5.25 2.31c-1.33 0-2.41-.29-3.24-.87s-1.44-1.39-1.84-2.43h-.05v3.07H4V.75h3.64v5.82h.05c.4-1.02 1-1.82 1.81-2.39s1.84-.87 3.07-.87l.27.19zm-.67 14.45c1.34 0 2.34-.52 3-1.57s.99-2.56.99-4.52c0-1.92-.32-3.38-.97-4.39s-1.6-1.51-2.86-1.51c-1.4 0-2.46.53-3.2 1.58s-1.1 2.51-1.1 4.38c0 1.95.36 3.45 1.08 4.5s1.75 1.53 3.06 1.53zm8.23-6.66v8.21h-3.64v-8.21h3.64z"/>
                </svg>
              </a>
              {/* Google Books */}
              <a
                href={`https://www.google.com/search?tbm=bks&q=${encodeURIComponent(word.quote.bookTitle + ' ' + word.quote.author)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
                title="Find on Google Books"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21.328 2.002v5.749c0 1.093-.04 2.053-.124 2.88-.084.827-.272 1.532-.564 2.117-.476.958-1.12 1.655-1.932 2.093-.812.437-1.82.656-3.024.656-.56 0-1.084-.04-1.572-.12v6.623H9.288V7.378c0-.56-.032-1.05-.096-1.469-.064-.42-.188-.767-.372-1.04-.244-.354-.58-.602-1.008-.744-.428-.142-.944-.213-1.548-.213H4.672V2.002h7.644c.812 0 1.544.098 2.196.293.652.196 1.2.494 1.644.896.444.401.788.891 1.032 1.469.244.577.366 1.244.366 2.001v3.996c0 .531.104.929.312 1.193.208.265.58.397 1.116.397.476 0 .848-.156 1.116-.468.268-.313.402-.687.402-1.122V2.002h.828zM4 22h2V10H4v12z"/>
                </svg>
              </a>
              {/* Amazon */}
              <a
                href={`https://www.amazon.com/s?k=${encodeURIComponent(word.quote.bookTitle + ' ' + word.quote.author)}&i=stripbooks`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
                title="Find on Amazon"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M.045 18.02c.072-.116.187-.124.348-.022 3.636 2.11 7.594 3.166 11.87 3.166 2.852 0 5.668-.533 8.447-1.595l.315-.14c.138-.06.234-.1.293-.13.226-.088.39-.046.493.126.112.181.063.389-.147.624-.116.13-.267.262-.453.394-1.344 1.016-2.936 1.809-4.777 2.379-1.841.57-3.649.856-5.426.856-2.304 0-4.51-.362-6.617-1.086-2.107-.724-4.096-1.819-5.966-3.288-.106-.084-.138-.208-.095-.372l.115.088zm6.629-8.507c0-1.104.252-2.058.756-2.862.504-.804 1.212-1.36 2.124-1.668-.132-.452-.198-.975-.198-1.57 0-.514.088-.966.264-1.357.176-.39.448-.666.816-.824-.364-.17-.768-.256-1.212-.256-.584 0-1.076.16-1.476.482-.4.322-.684.718-.852 1.188l-.06.202-.232.04c-.16.027-.3.05-.42.068l-.354-.048c-.184-.024-.352-.048-.504-.072.108-.536.33-1.048.666-1.536.336-.488.768-.878 1.296-1.17.528-.292 1.116-.438 1.764-.438.576 0 1.088.11 1.536.33.448.22.8.49 1.056.81.256.32.428.636.516.948l.048.204.204.084c.988.42 1.764 1.024 2.328 1.812.564.788.846 1.748.846 2.88 0 .788-.152 1.528-.456 2.22-.304.692-.74 1.278-1.308 1.758-.364.312-.772.556-1.224.732-.452.176-.96.264-1.524.264-.4 0-.788-.052-1.164-.156-.376-.104-.712-.248-1.008-.432-.296-.184-.54-.396-.732-.636-.192-.24-.324-.488-.396-.744l-.072-.252-.252-.06c-.14-.034-.28-.068-.42-.102-.14-.034-.28-.068-.42-.102l.06.33c.048.272.14.54.276.804.136.264.316.504.54.72.224.216.488.39.792.522.304.132.648.198 1.032.198.68 0 1.28-.188 1.8-.564.52-.376.908-.84 1.164-1.392l.096-.216.228.024c.12.012.24.026.36.042.12.016.24.032.36.048l-.024.216c-.072.62-.26 1.18-.564 1.68-.304.5-.704.918-1.2 1.254-.496.336-1.072.578-1.728.726-.656.148-1.352.184-2.088.108-.736-.076-1.416-.276-2.04-.6-.624-.324-1.152-.74-1.584-1.248-.432-.508-.756-1.076-.972-1.704-.216-.628-.324-1.268-.324-1.92zm9.093 2.135c-.064.388-.196.75-.396 1.088-.2.338-.46.63-.78.876s-.688.438-1.104.576c-.416.138-.868.207-1.356.207-.496 0-.95-.072-1.362-.216-.412-.144-.772-.348-1.08-.612-.308-.264-.558-.58-.75-.948-.192-.368-.32-.772-.384-1.212l-.036-.252-.252-.048c-.152-.028-.302-.058-.45-.09-.148-.032-.296-.064-.444-.096l.048.288c.08.556.264 1.072.552 1.548.288.476.672.89 1.152 1.242.48.352 1.032.63 1.656.834.624.204 1.3.306 2.028.306.704 0 1.358-.09 1.962-.27.604-.18 1.13-.428 1.578-.744.448-.316.81-.688 1.086-1.116.276-.428.456-.888.54-1.38l.048-.288-.282-.048c-.14-.024-.282-.048-.426-.072-.144-.024-.288-.048-.432-.072l-.048.288c-.056.34-.168.66-.336.96z"/>
                </svg>
              </a>
              {/* Audible */}
              <a
                href={`https://www.audible.com/search?keywords=${encodeURIComponent(word.quote.bookTitle + ' ' + word.quote.author)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
                title="Find on Audible"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 16c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zm-1-11v6l5 3-1 1.5-6-3.5V8h2z"/>
                </svg>
              </a>
            </span>
          </p>
        </motion.div>
      )}

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


      {/* Reactions and Quiz */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="flex items-center justify-center gap-4 mb-8 flex-wrap"
      >
        <button
          onClick={onLike}
          disabled={loading}
          className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 ${
            userReaction === 'like'
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-muted-foreground hover:bg-muted/80'
          } ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          aria-label="Like this word"
        >
          <ThumbsUp className="w-4 h-4" />
          <span className="text-sm font-medium">{counts.likes}</span>
        </button>
        <button
          onClick={onDislike}
          disabled={loading}
          className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 ${
            userReaction === 'dislike'
              ? 'bg-destructive text-destructive-foreground'
              : 'bg-muted text-muted-foreground hover:bg-muted/80'
          } ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          aria-label="Dislike this word"
        >
          <ThumbsDown className="w-4 h-4" />
          <span className="text-sm font-medium">{counts.dislikes}</span>
        </button>
        <button
          onClick={handleQuizOpen}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-all duration-200"
          aria-label="Play quiz"
        >
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-medium">Quiz</span>
        </button>
      </motion.div>

      {/* Quiz Dialog */}
      <WordQuiz word={word} open={quizOpen} onOpenChange={setQuizOpen} />

      {/* Category */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        className="text-center"
      >
        <div className="inline-flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className={`inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider px-3 py-1.5 rounded-full bg-muted text-muted-foreground hover:bg-muted/80 transition-colors cursor-pointer ${isFilterActive ? 'ring-2 ring-foreground' : ''}`}>
                {isFilterActive ? word.type : 'All'}
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
          {!isFilterActive && (
            <span className="text-xs text-muted-foreground capitalize">
              ({word.type})
            </span>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default WordCard;
