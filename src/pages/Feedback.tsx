import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { ArrowLeft, Bug, Lightbulb, MessageSquare, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAdmin } from '@/hooks/useAdmin';
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

interface FeedbackItem {
  id: string;
  user_email: string | null;
  feedback_type: string;
  message: string;
  page_path: string | null;
  created_at: string;
}

const Feedback = () => {
  const navigate = useNavigate();
  const { isAdmin, loading: adminLoading } = useAdmin();
  const [feedback, setFeedback] = useState<FeedbackItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!adminLoading && !isAdmin) {
      navigate('/');
    }
  }, [isAdmin, adminLoading, navigate]);

  useEffect(() => {
    const fetchFeedback = async () => {
      const { data, error } = await supabase
        .from('feedback')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching feedback:', error);
      } else {
        setFeedback(data || []);
      }
      setIsLoading(false);
    };

    if (isAdmin) {
      fetchFeedback();
    }
  }, [isAdmin]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'bug':
        return <Bug className="h-4 w-4" />;
      case 'suggestion':
        return <Lightbulb className="h-4 w-4" />;
      default:
        return <MessageSquare className="h-4 w-4" />;
    }
  };

  const getTypeBadgeVariant = (type: string) => {
    switch (type) {
      case 'bug':
        return 'destructive';
      case 'suggestion':
        return 'default';
      default:
        return 'secondary';
    }
  };

  if (adminLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <h1 className="text-3xl font-bold mb-6">User Feedback</h1>

        {feedback.length === 0 ? (
          <p className="text-muted-foreground text-center py-12">
            No feedback submitted yet.
          </p>
        ) : (
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Type</TableHead>
                  <TableHead>Message</TableHead>
                  <TableHead className="w-[180px]">User</TableHead>
                  <TableHead className="w-[120px]">Page</TableHead>
                  <TableHead className="w-[160px]">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {feedback.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Badge variant={getTypeBadgeVariant(item.feedback_type) as any} className="flex items-center gap-1 w-fit">
                        {getTypeIcon(item.feedback_type)}
                        {item.feedback_type}
                      </Badge>
                    </TableCell>
                    <TableCell className="max-w-md">
                      <p className="line-clamp-3">{item.message}</p>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {item.user_email || 'Anonymous'}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {item.page_path || '/'}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {format(new Date(item.created_at), 'MMM d, yyyy HH:mm')}
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

export default Feedback;
