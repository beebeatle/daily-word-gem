import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BookOpen, Users, Eye, MousePointer, BookText, FolderOpen, ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { words } from "@/data/words";

interface Stats {
  totalUsers: number;
  uniqueVisitors: number;
  pageViews: number;
  wordsDisplayed: number;
  wordCategories: number;
}

const About = () => {
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    uniqueVisitors: 0,
    pageViews: 0,
    wordsDisplayed: 0,
    wordCategories: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Get total registered users from profiles
        const { count: userCount } = await supabase
          .from("profiles")
          .select("*", { count: "exact", head: true });

        // Get unique visitors (unique session_ids)
        const { data: visitorData } = await supabase
          .from("user_actions")
          .select("session_id");
        const uniqueVisitors = new Set(visitorData?.map((v) => v.session_id)).size;

        // Get page views (page_visit actions)
        const { count: pageViewCount } = await supabase
          .from("user_actions")
          .select("*", { count: "exact", head: true })
          .eq("action_type", "page_visit");

        // Get words displayed (button_click with 'Try another word' or initial page loads)
        const { count: shuffleCount } = await supabase
          .from("user_actions")
          .select("*", { count: "exact", head: true })
          .eq("action_type", "button_click")
          .eq("element_info", "Try another word");

        // Words displayed = page views (initial word) + shuffle clicks
        const wordsDisplayed = (pageViewCount || 0) + (shuffleCount || 0);

        // Get unique word categories from the words data
        const categories = new Set(words.map((w) => w.type));

        setStats({
          totalUsers: userCount || 0,
          uniqueVisitors,
          pageViews: pageViewCount || 0,
          wordsDisplayed,
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
    { label: "Word Categories", value: stats.wordCategories, icon: FolderOpen },
  ];

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

          {/* Statistics Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
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
          </motion.section>

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

export default About;
