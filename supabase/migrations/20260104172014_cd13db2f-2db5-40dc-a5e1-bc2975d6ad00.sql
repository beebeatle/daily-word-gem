-- Create table to track word displays
CREATE TABLE public.word_displays (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  word TEXT NOT NULL,
  user_id UUID,
  user_email TEXT,
  session_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.word_displays ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert word displays (for both guests and authenticated users)
CREATE POLICY "Anyone can log word displays"
ON public.word_displays
FOR INSERT
WITH CHECK (true);

-- Admins can view all word displays
CREATE POLICY "Admins can view all word displays"
ON public.word_displays
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

-- Moderators can view all word displays
CREATE POLICY "Moderators can view all word displays"
ON public.word_displays
FOR SELECT
USING (public.has_role(auth.uid(), 'moderator'));

-- Create index for faster queries
CREATE INDEX idx_word_displays_created_at ON public.word_displays(created_at DESC);