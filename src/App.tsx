import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { ActivityLoggerProvider } from "@/hooks/useActivityLogger";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Preferences from "./pages/Preferences";
import Admin from "./pages/Admin";
import ActivityLog from "./pages/ActivityLog";
import Users from "./pages/Users";
import Why from "./pages/Why";
import UsageStatistics from "./pages/UsageStatistics";
import WordHistory from "./pages/WordHistory";
import Changelog from "./pages/Changelog";
import WordDisplays from "./pages/WordDisplays";
import EmailsSent from "./pages/EmailsSent";
import Feedback from "./pages/Feedback";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ActivityLoggerProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/preferences" element={<Preferences />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/activity-log" element={<ActivityLog />} />
              <Route path="/users" element={<Users />} />
              <Route path="/about/why" element={<Why />} />
              <Route path="/about/statistics" element={<UsageStatistics />} />
              <Route path="/about/history" element={<WordHistory />} />
              <Route path="/changelog" element={<Changelog />} />
              <Route path="/word-displays" element={<WordDisplays />} />
              <Route path="/emails-sent" element={<EmailsSent />} />
              <Route path="/feedback" element={<Feedback />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </ActivityLoggerProvider>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
