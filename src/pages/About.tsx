import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BookOpen, Users, Eye, MousePointer, BookText, FolderOpen, ArrowLeft, Quote, Target, BarChart3, MessageSquare, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { words } from "@/data/words";

interface Stats {
  totalUsers: number;
  uniqueVisitors: number;
  pageViews: number;
  wordsDisplayed: number;
  uniqueWordsDisplayed: number;
  wordCategories: number;
}

interface WordDisplay {
  id: string;
  word: string;
  user_email: string | null;
  created_at: string;
}

const About = () => {
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    uniqueVisitors: 0,
    pageViews: 0,
    wordsDisplayed: 0,
    uniqueWordsDisplayed: 0,
    wordCategories: 0,
  });
  const [wordDisplays, setWordDisplays] = useState<WordDisplay[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Get total registered users from profiles
        const { count: userCount } = await supabase
          .from("profiles")
          .select("*", { count: "exact", head: true });

        // Get unique visitors (unique visitor_ids from localStorage-based tracking)
        const { data: visitorData } = await supabase
          .from("user_actions")
          .select("visitor_id");
        const uniqueVisitors = new Set(visitorData?.filter((v) => v.visitor_id).map((v) => v.visitor_id)).size;

        // Get page views (page_visit actions)
        const { count: pageViewCount } = await supabase
          .from("user_actions")
          .select("*", { count: "exact", head: true })
          .eq("action_type", "page_visit");

        // Get words displayed count from word_displays table
        const { count: wordDisplayCount } = await supabase
          .from("word_displays")
          .select("*", { count: "exact", head: true });

        // Get recent word displays for the table
        const { data: recentDisplays } = await supabase
          .from("word_displays")
          .select("id, word, user_email, created_at")
          .order("created_at", { ascending: false })
          .limit(20);

        // Get unique words displayed
        const { data: allWordDisplays } = await supabase
          .from("word_displays")
          .select("word");
        const uniqueWordsDisplayed = new Set(allWordDisplays?.map((w) => w.word)).size;

        if (recentDisplays) {
          setWordDisplays(recentDisplays);
        }

        // Get unique word categories from the words data
        const categories = new Set(words.map((w) => w.type));

        setStats({
          totalUsers: userCount || 0,
          uniqueVisitors,
          pageViews: pageViewCount || 0,
          wordsDisplayed: wordDisplayCount || 0,
          uniqueWordsDisplayed,
          wordCategories: categories.size,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statItems = [
    { label: "Registered Users", value: stats.totalUsers, icon: Users },
    { label: "Unique Visitors", value: stats.uniqueVisitors, icon: Eye },
    { label: "Page Views", value: stats.pageViews, icon: MousePointer },
    { label: "Words Displayed", value: stats.wordsDisplayed, icon: BookText },
    { label: "Unique Words Displayed", value: stats.uniqueWordsDisplayed, icon: Sparkles },
    { label: "Word Categories", value: stats.wordCategories, icon: FolderOpen },
  ];

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

  const tableOfContents = [
    { id: "mission", label: "Our Mission", icon: Target },
    { id: "statistics", label: "Usage Statistics", icon: BarChart3 },
    { id: "testimonials", label: "Testimonials", icon: MessageSquare },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
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
              <BookOpen className="w-5 h-5 text-primary" />
              <span className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                About
              </span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-semibold text-foreground tracking-tight">
              Word Delight
            </h1>
          </motion.header>

          {/* Table of Contents */}
          <motion.nav
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="mb-12 md:mb-16"
          >
            <div className="flex flex-wrap justify-center gap-3">
              {tableOfContents.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.4 }}
                  onClick={() => scrollToSection(item.id)}
                  className="group flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 font-sans text-sm text-muted-foreground hover:text-foreground"
                >
                  <item.icon className="w-4 h-4 text-primary/60 group-hover:text-primary transition-colors" />
                  {item.label}
                </motion.button>
              ))}
            </div>
          </motion.nav>

          {/* Mission Section */}
          <motion.section
            id="mission"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-16 scroll-mt-24"
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

          {/* Statistics Section */}
          <motion.section
            id="statistics"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="scroll-mt-24"
          >
            <h2 className="font-sans text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-8 text-center">
              Usage Statistics
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {statItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                  className="bg-card border border-border rounded-xl p-6 text-center"
                >
                  <item.icon className="w-5 h-5 text-primary mx-auto mb-3" />
                  <div className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-1">
                    {loading ? (
                      <span className="animate-pulse">—</span>
                    ) : (
                      item.value.toLocaleString()
                    )}
                  </div>
                  <div className="font-sans text-xs text-muted-foreground uppercase tracking-wide">
                    {item.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Word Displays Table */}
            {wordDisplays.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.5 }}
                className="mt-10"
              >
                <h3 className="font-sans text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
                  Recent Word Displays
                </h3>
                <div className="bg-card border border-border rounded-xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border bg-muted/30">
                          <th className="px-4 py-3 text-left font-sans text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                            Word
                          </th>
                          <th className="px-4 py-3 text-left font-sans text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                            Timestamp
                          </th>
                          <th className="px-4 py-3 text-left font-sans text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                            User
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {wordDisplays.map((display, index) => (
                          <tr
                            key={display.id}
                            className={index !== wordDisplays.length - 1 ? "border-b border-border" : ""}
                          >
                            <td className="px-4 py-3 font-serif text-foreground font-medium">
                              {display.word}
                            </td>
                            <td className="px-4 py-3 font-sans text-sm text-muted-foreground">
                              {new Date(display.created_at).toLocaleString()}
                            </td>
                            <td className="px-4 py-3 font-sans text-sm text-muted-foreground">
                              {display.user_email || "Guest"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.section>

          {/* Decorative Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="h-px bg-gradient-to-r from-transparent via-border to-transparent my-16"
          />

          {/* Testimonials Section */}
          <motion.section
            id="testimonials"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="scroll-mt-24"
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
                  transition={{ delay: 1.3 + index * 0.15, duration: 0.5 }}
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

export default About;
