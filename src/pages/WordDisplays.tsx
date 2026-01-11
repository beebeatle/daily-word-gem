import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useAdmin } from '@/hooks/useAdmin';
import { useUserRole } from '@/hooks/useUserRole';
import { supabase } from '@/integrations/supabase/client';
import { ArrowLeft, BookText, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface WordDisplay {
  id: string;
  word: string;
  user_id: string | null;
  user_email: string | null;
  session_id: string;
  created_at: string;
}

const WordDisplays = () => {
  const { user, loading: authLoading } = useAuth();
  const { isAdmin, loading: adminLoading } = useAdmin();
  const { role } = useUserRole();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [wordDisplays, setWordDisplays] = useState<WordDisplay[]>([]);
  const [loading, setLoading] = useState(true);
  const [sessionFilter, setSessionFilter] = useState(searchParams.get('session') || '');
  const [wordFilter, setWordFilter] = useState(searchParams.get('word') || '');

  const hasAccess = isAdmin || role === 'moderator';

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    } else if (!authLoading && !adminLoading && !hasAccess) {
      navigate('/');
    }
  }, [user, authLoading, adminLoading, hasAccess, navigate]);

  useEffect(() => {
    const fetchWordDisplays = async () => {
      if (!hasAccess) return;

      try {
        let query = supabase
          .from('word_displays')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(100);

        if (sessionFilter) {
          query = query.eq('session_id', sessionFilter);
        }

        if (wordFilter) {
          query = query.eq('word', wordFilter);
        }

        const { data, error } = await query;

        if (error) {
          console.error('Error fetching word displays:', error);
          return;
        }

        setWordDisplays(data || []);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    if (hasAccess) {
      fetchWordDisplays();
    }
  }, [hasAccess, sessionFilter, wordFilter]);

  const handleSessionClick = (sessionId: string) => {
    setSessionFilter(sessionId);
    const params: Record<string, string> = { session: sessionId };
    if (wordFilter) params.word = wordFilter;
    setSearchParams(params);
  };

  const handleWordClick = (word: string) => {
    setWordFilter(word);
    const params: Record<string, string> = { word };
    if (sessionFilter) params.session = sessionFilter;
    setSearchParams(params);
  };

  const clearSessionFilter = () => {
    setSessionFilter('');
    if (wordFilter) {
      setSearchParams({ word: wordFilter });
    } else {
      setSearchParams({});
    }
  };

  const clearWordFilter = () => {
    setWordFilter('');
    if (sessionFilter) {
      setSearchParams({ session: sessionFilter });
    } else {
      setSearchParams({});
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  if (authLoading || adminLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className="flex items-center gap-2">
            <BookText className="w-5 h-5 text-primary" />
            <h1 className="text-2xl font-bold">Word Displays</h1>
          </div>
        </div>

        {(sessionFilter || wordFilter) && (
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            {wordFilter && (
              <>
                <span className="text-sm text-muted-foreground">Word:</span>
                <Badge variant="secondary" className="font-serif text-xs">
                  {wordFilter}
                </Badge>
                <Button variant="ghost" size="sm" onClick={clearWordFilter} className="h-6 w-6 p-0">
                  <X className="w-3 h-3" />
                </Button>
              </>
            )}
            {sessionFilter && (
              <>
                <span className="text-sm text-muted-foreground">Session:</span>
                <Badge variant="secondary" className="font-mono text-xs">
                  {sessionFilter.slice(0, 8)}...
                </Badge>
                <Button variant="ghost" size="sm" onClick={clearSessionFilter} className="h-6 w-6 p-0">
                  <X className="w-3 h-3" />
                </Button>
              </>
            )}
          </div>
        )}

        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Word</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Session ID</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {wordDisplays.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                    No word displays logged yet
                  </TableCell>
                </TableRow>
              ) : (
                wordDisplays.map((display) => (
                  <TableRow key={display.id}>
                    <TableCell>
                      <button
                        onClick={() => handleWordClick(display.word)}
                        className="font-serif font-medium text-primary hover:underline cursor-pointer"
                      >
                        {display.word}
                      </button>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                      {formatDate(display.created_at)}
                    </TableCell>
                    <TableCell>
                      {display.user_email ? (
                        <span className="text-sm">{display.user_email}</span>
                      ) : (
                        <Badge variant="outline" className="text-xs">Guest</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <button
                        onClick={() => handleSessionClick(display.session_id)}
                        className="font-mono text-xs text-primary hover:underline cursor-pointer"
                      >
                        {display.session_id.slice(0, 8)}...
                      </button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        <p className="text-sm text-muted-foreground mt-4">
          Showing last 100 word displays
        </p>
      </div>
    </div>
  );
};

export default WordDisplays;
