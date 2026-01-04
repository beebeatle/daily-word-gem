import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useAdmin } from '@/hooks/useAdmin';
import { useUserRole } from '@/hooks/useUserRole';
import { supabase } from '@/integrations/supabase/client';
import { ArrowLeft, BookText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
  const [wordDisplays, setWordDisplays] = useState<WordDisplay[]>([]);
  const [loading, setLoading] = useState(true);

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
        const { data, error } = await supabase
          .from('word_displays')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(100);

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
  }, [hasAccess]);

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
                    <TableCell className="font-serif font-medium">
                      {display.word}
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
                    <TableCell className="font-mono text-xs text-muted-foreground">
                      {display.session_id.slice(0, 8)}...
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
