import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useAdmin } from '@/hooks/useAdmin';
import { useUserRole } from '@/hooks/useUserRole';
import { supabase } from '@/integrations/supabase/client';
import { ArrowLeft, Mail, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
import { Badge } from '@/components/ui/badge';

interface EmailRecord {
  id: string;
  recipient_email: string;
  subject: string;
  email_type: string;
  status: string;
  resend_id: string | null;
  error_message: string | null;
  created_at: string;
}

const EmailsSent = () => {
  const { user, loading: authLoading } = useAuth();
  const { isAdmin, loading: adminLoading } = useAdmin();
  const { role, loading: roleLoading } = useUserRole();
  const navigate = useNavigate();
  const [emails, setEmails] = useState<EmailRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');

  const hasAccess = isAdmin || role === 'moderator';

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (!authLoading && !adminLoading && !roleLoading && user && !hasAccess) {
      navigate('/');
    }
  }, [user, hasAccess, authLoading, adminLoading, roleLoading, navigate]);

  useEffect(() => {
    const fetchEmails = async () => {
      if (!hasAccess) return;

      setLoading(true);
      let query = supabase
        .from('emails_sent')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      if (filter !== 'all') {
        query = query.eq('status', filter);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching emails:', error);
      } else {
        setEmails(data || []);
      }
      setLoading(false);
    };

    if (hasAccess) {
      fetchEmails();
    }
  }, [hasAccess, filter]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  if (authLoading || adminLoading || roleLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground font-sans">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6 font-sans"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Mail className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-serif font-semibold text-foreground">
              Emails Sent
            </h1>
          </div>

          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-40 font-sans">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="sent">Sent</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <p className="text-muted-foreground font-sans">Loading emails...</p>
          </div>
        ) : emails.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground font-sans">
            No emails sent yet.
          </div>
        ) : (
          <div className="bg-card rounded-lg border shadow-sm overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-sans">Time</TableHead>
                  <TableHead className="font-sans">Recipient</TableHead>
                  <TableHead className="font-sans">Subject</TableHead>
                  <TableHead className="font-sans">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {emails.map((email) => (
                  <TableRow key={email.id}>
                    <TableCell className="font-sans text-muted-foreground whitespace-nowrap">
                      {formatDate(email.created_at)}
                    </TableCell>
                    <TableCell className="font-sans">
                      {email.recipient_email}
                    </TableCell>
                    <TableCell className="font-sans max-w-xs truncate">
                      {email.subject}
                    </TableCell>
                    <TableCell>
                      {email.status === 'sent' ? (
                        <Badge variant="default" className="gap-1">
                          <CheckCircle className="w-3 h-3" />
                          Sent
                        </Badge>
                      ) : (
                        <Badge variant="destructive" className="gap-1">
                          <XCircle className="w-3 h-3" />
                          Failed
                        </Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailsSent;
