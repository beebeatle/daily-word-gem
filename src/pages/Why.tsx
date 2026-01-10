import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BookOpen, ArrowLeft, Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Word Delight has become my morning ritual. I've learned so many beautiful words that I now use in my writing.",
    author: "Sarah M.",
    role: "Content Writer",
  },
  {
    quote: "As a non-native English speaker, this app has been invaluable for expanding my vocabulary in a fun, bite-sized way.",
    author: "Marcus K.",
    role: "Software Engineer",
  },
  {
    quote: "I love sharing the word of the day with my students. It sparks wonderful discussions about language and etymology.",
    author: "Dr. Elena R.",
    role: "English Professor",
  },
];

const Why = () => {
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
                About
              </span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-semibold text-foreground tracking-tight">
              Why Word Delight?
            </h1>
          </motion.header>

          {/* Mission Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="font-sans text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
              Our Mission
            </h2>
            <div className="prose prose-lg">
              <p className="text-foreground/90 leading-relaxed text-lg">
                Word Delight is dedicated to enriching your vocabulary one word at a time. 
                We believe that a rich vocabulary opens doors to clearer thinking, more 
                persuasive communication, and deeper understanding of the world around us.
              </p>
              <p className="text-foreground/80 leading-relaxed mt-4">
                Our curated collection spans everyday expressions to specialized terminology, 
                helping students, professionals, writers, and lifelong learners discover 
                the perfect words to express their ideas with precision and elegance.
              </p>
            </div>
          </motion.section>

          {/* Decorative Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-16"
          />

          {/* Testimonials Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <h2 className="font-sans text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-8 text-center">
              What Our Users Say
            </h2>
            
            <div className="grid gap-6">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.author}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.15, duration: 0.5 }}
                  className="bg-card border border-border rounded-xl p-6 relative"
                >
                  <Quote className="w-8 h-8 text-primary/20 absolute top-4 right-4" />
                  <p className="text-foreground/90 leading-relaxed italic mb-4 pr-8">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="font-serif text-primary font-semibold">
                        {testimonial.author.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-sans text-sm font-medium text-foreground">
                        {testimonial.author}
                      </p>
                      <p className="font-sans text-xs text-muted-foreground">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          <motion.footer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
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
    </div>
  );
};

export default Why;
