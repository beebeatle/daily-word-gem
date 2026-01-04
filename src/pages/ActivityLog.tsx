import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useAdmin } from '@/hooks/useAdmin';
import { useUserRole } from '@/hooks/useUserRole';
import { supabase } from '@/integrations/supabase/client';
import { ArrowLeft, Monitor, Smartphone, Tablet, Globe, Mouse, Eye } from 'lucide-react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface UserAction {
  id: string;
  user_id: string | null;
  session_id: string;
  action_type: string;
  page_path: string | null;
  element_info: string | null;
  browser: string | null;
  device: string | null;
  os: string | null;
  screen_resolution: string | null;
  language: string | null;
  referrer: string | null;
  user_agent: string | null;
  created_at: string;
}

interface UserEmail {
  id: string;
  email: string;
}

const ActivityLog = () => {
  const { user, loading: authLoading } = useAuth();
  const { isAdmin, loading: adminLoading } = useAdmin();
  const { role } = useUserRole();
  const navigate = useNavigate();
  const [actions, setActions] = useState<UserAction[]>([]);
  const [userEmails, setUserEmails] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');

  const hasAccess = isAdmin || role === 'moderator';

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    } else if (!authLoading && !adminLoading && !hasAccess) {
      navigate('/');
    }
  }, [user, authLoading, adminLoading, hasAccess, navigate]);

  useEffect(() => {
    const fetchActions = async () => {
      if (!hasAccess) return;

      try {
        let query = supabase
          .from('user_actions')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(100);

        if (filter !== 'all') {
          query = query.eq('action_type', filter);
        }

        const { data, error } = await query;

        if (error) {
          console.error('Error fetching actions:', error);
          return;
        }

        setActions(data || []);

        // Fetch user emails for logged-in users
        const userIds = [...new Set((data || []).map(a => a.user_id).filter(Boolean))] as string[];
        if (userIds.length > 0) {
          const { data: profiles } = await supabase
            .from('profiles')
            .select('user_id, display_name')
            .in('user_id', userIds);

          const emailMap: Record<string, string> = {};
          profiles?.forEach(p => {
            emailMap[p.user_id] = p.display_name || 'User';
          });
          setUserEmails(emailMap);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    if (hasAccess) {
      fetchActions();
    }
  }, [hasAccess, filter]);

  const getDeviceIcon = (device: string | null) => {
    switch (device?.toLowerCase()) {
      case 'mobile':
        return <Smartphone className="w-4 h-4" />;
      case 'tablet':
        return <Tablet className="w-4 h-4" />;
      default:
        return <Monitor className="w-4 h-4" />;
    }
  };

  const getActionIcon = (actionType: string) => {
    switch (actionType) {
      case 'button_click':
        return <Mouse className="w-4 h-4" />;
      case 'page_visit':
        return <Eye className="w-4 h-4" />;
      default:
        return <Globe className="w-4 h-4" />;
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
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-bold">Activity Log</h1>
        </div>

        <div className="mb-6 flex items-center gap-4">
          <span className="text-sm text-muted-foreground">Filter by action:</span>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="All actions" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All actions</SelectItem>
              <SelectItem value="page_visit">Page visits</SelectItem>
              <SelectItem value="button_click">Button clicks</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Time</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Page</TableHead>
                <TableHead>Details</TableHead>
                <TableHead>Device</TableHead>
                <TableHead>Browser / OS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {actions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    No activity logged yet
                  </TableCell>
                </TableRow>
              ) : (
                actions.map((action) => (
                  <TableRow key={action.id}>
                    <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                      {formatDate(action.created_at)}
                    </TableCell>
                    <TableCell>
                      {action.user_id ? (
                        <span className="text-sm">
                          {userEmails[action.user_id] || action.user_id.slice(0, 8)}
                        </span>
                      ) : (
                        <Badge variant="outline" className="text-xs">Anonymous</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getActionIcon(action.action_type)}
                        <Badge variant="secondary" className="capitalize">
                          {action.action_type.replace('_', ' ')}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      {action.page_path || '-'}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {action.element_info || '-'}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getDeviceIcon(action.device)}
                        <span className="text-sm">{action.device || 'Unknown'}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">
                      {action.browser} / {action.os}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        <p className="text-sm text-muted-foreground mt-4">
          Showing last 100 actions
        </p>
      </div>
    </div>
  );
};

export default ActivityLog;
