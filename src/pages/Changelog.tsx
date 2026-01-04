import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BookOpen, ArrowLeft, GitCommit, Calendar } from "lucide-react";
import { changelog } from "@/data/changelog";

const Changelog = () => {
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
              <BookOpen className="w-5 h-5 text-primary" />
              <span className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Changelog
              </span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-semibold text-foreground tracking-tight">
              What's New
            </h1>
            <p className="mt-4 text-muted-foreground font-sans">
              A history of updates and improvements to Word Delight
            </p>
          </motion.header>

          {/* Changelog Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-[19px] top-0 bottom-0 w-px bg-border md:left-1/2 md:-translate-x-px" />

            {changelog.map((entry, index) => (
              <motion.div
                key={entry.version}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.1, duration: 0.5 }}
                className="relative mb-8 last:mb-0"
              >
                {/* Timeline dot */}
                <div className="absolute left-[11px] top-6 w-4 h-4 rounded-full bg-primary border-4 border-background md:left-1/2 md:-translate-x-1/2" />

                {/* Content card */}
                <div className="ml-12 md:ml-0 md:w-[calc(50%-2rem)] md:odd:ml-auto md:odd:mr-0 md:even:mr-auto md:even:ml-0">
                  <div className="bg-card border border-border rounded-xl p-6">
                    {/* Version header */}
                    <div className="flex items-center gap-2 mb-2">
                      <GitCommit className="w-4 h-4 text-primary" />
                      <span className="font-mono text-sm font-semibold text-foreground">
                        v{entry.version}
                      </span>
                    </div>

                    {/* Date */}
                    <div className="flex items-center gap-2 mb-4">
                      <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                      <span className="font-sans text-xs text-muted-foreground">
                        {entry.date}
                      </span>
                    </div>

                    {/* Changes list */}
                    <ul className="space-y-2">
                      {entry.changes.map((change, changeIndex) => (
                        <li
                          key={changeIndex}
                          className="flex items-start gap-2 text-sm text-foreground/80"
                        >
                          <span className="text-primary mt-1.5 text-xs">•</span>
                          <span>{change}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

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
              v{__APP_VERSION__}
            </p>
          </motion.footer>
        </div>
      </main>
    </div>
  );
};

export default Changelog;
