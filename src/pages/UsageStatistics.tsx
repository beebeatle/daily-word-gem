import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BookOpen, Users, Eye, MousePointer, BookText, FolderOpen, ArrowLeft, Sparkles, BarChart3 } from "lucide-react";
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

const UsageStatistics = () => {
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    uniqueVisitors: 0,
    pageViews: 0,
    wordsDisplayed: 0,
    uniqueWordsDisplayed: 0,
    wordCategories: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data, error } = await supabase.rpc("get_public_stats");

        if (error) {
          console.error("Error fetching public stats:", error);
          setLoading(false);
          return;
        }

        const categories = new Set(words.map((w) => w.type));

        const statsData = data as {
          total_users: number;
          unique_visitors: number;
          page_views: number;
          words_displayed: number;
          unique_words_displayed: number;
        } | null;

        setStats({
          totalUsers: statsData?.total_users || 0,
          uniqueVisitors: statsData?.unique_visitors || 0,
          pageViews: statsData?.page_views || 0,
          wordsDisplayed: statsData?.words_displayed || 0,
          uniqueWordsDisplayed: statsData?.unique_words_displayed || 0,
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
              <BarChart3 className="w-5 h-5 text-primary" />
              <span className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                About
              </span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-semibold text-foreground tracking-tight">
              Usage Statistics
            </h1>
          </motion.header>

          {/* Statistics Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {statItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
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
    </div>
  );
};

export default UsageStatistics;
