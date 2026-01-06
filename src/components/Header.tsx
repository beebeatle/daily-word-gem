import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";

interface HeaderProps {
  date: string;
}

const Header = ({ date }: HeaderProps) => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center mb-12 md:mb-16"
    >
      <div className="flex items-center justify-center gap-2 mb-4">
        <BookOpen className="w-5 h-5 text-primary" />
        <span className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-primary">
         Your Word of the Day
        </span>
      </div>
      <p className="font-sans text-sm text-muted-foreground tracking-wide">
        {date}
      </p>
    </motion.header>
  );
};

export default Header;
