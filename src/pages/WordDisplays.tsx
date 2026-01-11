import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useAdmin } from '@/hooks/useAdmin';
import { useUserRole } from '@/hooks/useUserRole';
import { supabase } from '@/integrations/supabase/client';
import { ArrowLeft, BookText, X, Monitor, Smartphone, Tablet } from 'lucide-react';
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

interface SessionDetails {
  visitor_id: string | null;
  browser: string | null;
  device: string | null;
  os: string | null;
  screen_resolution: string | null;
  language: string | null;
  ip_address: string | null;
}

interface WordDisplay {
  id: string;
  word: string;
  user_id: string | null;
  user_email: string | null;
  session_id: string;
  visitor_id: string | null;
  browser: string | null;
  device: string | null;
  os: string | null;
  screen_resolution: string | null;
  language: string | null;
  ip_address: string | null;
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
  const [visitorFilter, setVisitorFilter] = useState(searchParams.get('visitor') || '');
  const [userFilter, setUserFilter] = useState(searchParams.get('user') || '');

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
        // If filtering by visitor, first get session IDs for that visitor
        let visitorSessionIds: string[] | null = null;
        if (visitorFilter) {
          const { data: visitorSessions } = await supabase
            .from('user_actions')
            .select('session_id')
            .eq('visitor_id', visitorFilter);
          visitorSessionIds = [...new Set((visitorSessions || []).map(s => s.session_id))];
          if (visitorSessionIds.length === 0) {
            setWordDisplays([]);
            return;
          }
        }

        // Fetch word displays
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

        if (userFilter) {
          query = query.eq('user_email', userFilter);
        }

        if (visitorSessionIds) {
          query = query.in('session_id', visitorSessionIds);
        }

        const { data, error } = await query;

        if (error) {
          console.error('Error fetching word displays:', error);
          return;
        }

        // Get unique session IDs to fetch session details
        const sessionIds = [...new Set((data || []).map(d => d.session_id))];
        
        // Fetch session details from user_actions for these sessions
        const { data: actionsData } = await supabase
          .from('user_actions')
          .select('session_id, visitor_id, browser, device, os, screen_resolution, language, ip_address')
          .in('session_id', sessionIds);

        // Create a map of session_id to session details (take the first action's details per session)
        const sessionDetails = new Map<string, SessionDetails>();
        (actionsData || []).forEach(action => {
          if (!sessionDetails.has(action.session_id)) {
            sessionDetails.set(action.session_id, {
              visitor_id: action.visitor_id,
              browser: action.browser,
              device: action.device,
              os: action.os,
              screen_resolution: action.screen_resolution,
              language: action.language,
              ip_address: action.ip_address,
            });
          }
        });

        // Enrich word displays with session details
        const enrichedData = (data || []).map(display => {
          const details = sessionDetails.get(display.session_id);
          return {
            ...display,
            visitor_id: details?.visitor_id || null,
            browser: details?.browser || null,
            device: details?.device || null,
            os: details?.os || null,
            screen_resolution: details?.screen_resolution || null,
            language: details?.language || null,
            ip_address: details?.ip_address || null,
          };
        });

        setWordDisplays(enrichedData);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    if (hasAccess) {
      fetchWordDisplays();
    }
  }, [hasAccess, sessionFilter, wordFilter, visitorFilter, userFilter]);

  const buildParams = (updates: Record<string, string | null>) => {
    const params: Record<string, string> = {};
    const current = { session: sessionFilter, word: wordFilter, visitor: visitorFilter, user: userFilter };
    Object.entries({ ...current, ...updates }).forEach(([key, val]) => {
      if (val) params[key] = val;
    });
    return params;
  };

  const handleSessionClick = (sessionId: string) => {
    setSessionFilter(sessionId);
    setSearchParams(buildParams({ session: sessionId }));
  };

  const handleWordClick = (word: string) => {
    setWordFilter(word);
    setSearchParams(buildParams({ word }));
  };

  const handleVisitorClick = (visitorId: string) => {
    setVisitorFilter(visitorId);
    setSearchParams(buildParams({ visitor: visitorId }));
  };

  const handleUserClick = (userEmail: string) => {
    setUserFilter(userEmail);
    setSearchParams(buildParams({ user: userEmail }));
  };

  const clearSessionFilter = () => {
    setSessionFilter('');
    setSearchParams(buildParams({ session: null }));
  };

  const clearWordFilter = () => {
    setWordFilter('');
    setSearchParams(buildParams({ word: null }));
  };

  const clearVisitorFilter = () => {
    setVisitorFilter('');
    setSearchParams(buildParams({ visitor: null }));
  };

  const clearUserFilter = () => {
    setUserFilter('');
    setSearchParams(buildParams({ user: null }));
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

        {(sessionFilter || wordFilter || visitorFilter || userFilter) && (
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
            {userFilter && (
              <>
                <span className="text-sm text-muted-foreground">User:</span>
                <Badge variant="secondary" className="text-xs">
                  {userFilter}
                </Badge>
                <Button variant="ghost" size="sm" onClick={clearUserFilter} className="h-6 w-6 p-0">
                  <X className="w-3 h-3" />
                </Button>
              </>
            )}
            {visitorFilter && (
              <>
                <span className="text-sm text-muted-foreground">Visitor:</span>
                <Badge variant="secondary" className="font-mono text-xs">
                  {visitorFilter.slice(0, 8)}...
                </Badge>
                <Button variant="ghost" size="sm" onClick={clearVisitorFilter} className="h-6 w-6 p-0">
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

        <div className="border rounded-lg overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Word</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Visitor ID</TableHead>
                <TableHead>Session ID</TableHead>
                <TableHead>IP Address</TableHead>
                <TableHead>Device</TableHead>
                <TableHead>Browser / OS</TableHead>
                <TableHead>Screen</TableHead>
                <TableHead>Lang</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {wordDisplays.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={10} className="text-center py-8 text-muted-foreground">
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
                        <button
                          onClick={() => handleUserClick(display.user_email!)}
                          className="text-sm text-primary hover:underline cursor-pointer"
                        >
                          {display.user_email}
                        </button>
                      ) : (
                        <Badge variant="outline" className="text-xs">Guest</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {display.visitor_id ? (
                        <button
                          onClick={() => handleVisitorClick(display.visitor_id!)}
                          className="font-mono text-xs text-primary hover:underline cursor-pointer"
                        >
                          {display.visitor_id.slice(0, 8)}...
                        </button>
                      ) : (
                        <span className="text-xs text-muted-foreground">—</span>
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
                    <TableCell>
                      {display.ip_address ? (
                        <span className="text-xs font-mono">{display.ip_address}</span>
                      ) : (
                        <span className="text-xs text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {display.device ? (
                        <div className="flex items-center gap-1">
                          {display.device === 'Mobile' ? (
                            <Smartphone className="w-3 h-3 text-muted-foreground" />
                          ) : display.device === 'Tablet' ? (
                            <Tablet className="w-3 h-3 text-muted-foreground" />
                          ) : (
                            <Monitor className="w-3 h-3 text-muted-foreground" />
                          )}
                          <span className="text-xs">{display.device}</span>
                        </div>
                      ) : (
                        <span className="text-xs text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {display.browser || display.os ? (
                        <span className="text-xs">
                          {display.browser}{display.browser && display.os ? ' / ' : ''}{display.os}
                        </span>
                      ) : (
                        <span className="text-xs text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {display.screen_resolution ? (
                        <span className="text-xs font-mono">{display.screen_resolution}</span>
                      ) : (
                        <span className="text-xs text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {display.language ? (
                        <span className="text-xs">{display.language}</span>
                      ) : (
                        <span className="text-xs text-muted-foreground">—</span>
                      )}
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
