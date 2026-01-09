-- Make user_id nullable and add visitor_id for guest tracking
ALTER TABLE public.word_reactions 
  ALTER COLUMN user_id DROP NOT NULL,
  ADD COLUMN visitor_id TEXT;

-- Update unique constraint to handle both authenticated and guest users
ALTER TABLE public.word_reactions DROP CONSTRAINT word_reactions_user_id_word_key;
ALTER TABLE public.word_reactions ADD CONSTRAINT word_reactions_unique_reaction 
  UNIQUE NULLS NOT DISTINCT (user_id, visitor_id, word);

-- Add check constraint to ensure either user_id or visitor_id is provided
ALTER TABLE public.word_reactions ADD CONSTRAINT word_reactions_user_or_visitor 
  CHECK (user_id IS NOT NULL OR visitor_id IS NOT NULL);

-- Drop existing insert/update/delete policies
DROP POLICY IF EXISTS "Users can insert their own reactions" ON public.word_reactions;
DROP POLICY IF EXISTS "Users can update their own reactions" ON public.word_reactions;
DROP POLICY IF EXISTS "Users can delete their own reactions" ON public.word_reactions;

-- Create new policies that allow both authenticated users and guests
CREATE POLICY "Anyone can insert reactions"
ON public.word_reactions
FOR INSERT
WITH CHECK (
  (auth.uid() IS NOT NULL AND auth.uid() = user_id) OR 
  (auth.uid() IS NULL AND visitor_id IS NOT NULL)
);

CREATE POLICY "Anyone can update their own reactions"
ON public.word_reactions
FOR UPDATE
USING (
  (auth.uid() IS NOT NULL AND auth.uid() = user_id) OR 
  (auth.uid() IS NULL AND visitor_id IS NOT NULL)
);

CREATE POLICY "Anyone can delete their own reactions"
ON public.word_reactions
FOR DELETE
USING (
  (auth.uid() IS NOT NULL AND auth.uid() = user_id) OR 
  (auth.uid() IS NULL AND visitor_id IS NOT NULL)
);