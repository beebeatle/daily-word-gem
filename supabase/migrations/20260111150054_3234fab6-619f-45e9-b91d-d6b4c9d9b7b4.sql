-- Create a table for user feedback
CREATE TABLE public.feedback (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  user_email TEXT,
  feedback_type TEXT NOT NULL CHECK (feedback_type IN ('bug', 'suggestion', 'general')),
  message TEXT NOT NULL,
  page_path TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert feedback (both authenticated and anonymous)
CREATE POLICY "Anyone can submit feedback"
ON public.feedback
FOR INSERT
WITH CHECK (true);

-- Only admins/moderators can view feedback
CREATE POLICY "Admins and moderators can view feedback"
ON public.feedback
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_roles.user_id = auth.uid()
    AND user_roles.role IN ('admin', 'moderator')
  )
);

-- Create index for faster queries
CREATE INDEX idx_feedback_created_at ON public.feedback(created_at DESC);