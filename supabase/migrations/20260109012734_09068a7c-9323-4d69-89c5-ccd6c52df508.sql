-- Create enum for reaction types
CREATE TYPE public.reaction_type AS ENUM ('like', 'dislike');

-- Create table for word reactions
CREATE TABLE public.word_reactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  word TEXT NOT NULL,
  reaction reaction_type NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (user_id, word)
);

-- Enable RLS
ALTER TABLE public.word_reactions ENABLE ROW LEVEL SECURITY;

-- Allow anyone to view reaction counts (for public display)
CREATE POLICY "Anyone can view reactions"
ON public.word_reactions
FOR SELECT
USING (true);

-- Users can insert their own reactions
CREATE POLICY "Users can insert their own reactions"
ON public.word_reactions
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Users can update their own reactions
CREATE POLICY "Users can update their own reactions"
ON public.word_reactions
FOR UPDATE
USING (auth.uid() = user_id);

-- Users can delete their own reactions
CREATE POLICY "Users can delete their own reactions"
ON public.word_reactions
FOR DELETE
USING (auth.uid() = user_id);

-- Create trigger for updated_at
CREATE TRIGGER update_word_reactions_updated_at
BEFORE UPDATE ON public.word_reactions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();