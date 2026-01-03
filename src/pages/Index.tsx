import { getWordOfTheDay, formatDate } from "@/data/words";
import Header from "@/components/Header";
import WordCard from "@/components/WordCard";
import { motion } from "framer-motion";

const Index = () => {
  const wordOfTheDay = getWordOfTheDay();
  const currentDate = formatDate();

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
      
      <main className="relative z-10 px-6 py-12 md:py-20">
        <div className="max-w-4xl mx-auto">
          <Header date={currentDate} />
          <WordCard word={wordOfTheDay} />
          
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
