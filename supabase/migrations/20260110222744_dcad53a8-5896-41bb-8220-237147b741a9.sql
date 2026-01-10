-- Create emails_sent table to log all sent emails
CREATE TABLE public.emails_sent (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    recipient_email TEXT NOT NULL,
    recipient_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    subject TEXT NOT NULL,
    email_type TEXT NOT NULL DEFAULT 'daily_word',
    status TEXT NOT NULL DEFAULT 'sent',
    resend_id TEXT,
    error_message TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.emails_sent ENABLE ROW LEVEL SECURITY;

-- Only admins and moderators can view sent emails
CREATE POLICY "Admins and moderators can view sent emails"
ON public.emails_sent
FOR SELECT
TO authenticated
USING (
    public.has_role(auth.uid(), 'admin') OR 
    public.has_role(auth.uid(), 'moderator')
);

-- Create index for faster queries
CREATE INDEX idx_emails_sent_created_at ON public.emails_sent(created_at DESC);
CREATE INDEX idx_emails_sent_recipient ON public.emails_sent(recipient_email);