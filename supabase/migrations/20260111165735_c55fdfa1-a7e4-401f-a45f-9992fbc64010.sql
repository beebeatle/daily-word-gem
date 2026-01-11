-- Add foreign key from word_reactions to profiles for join queries
ALTER TABLE public.word_reactions 
ADD CONSTRAINT word_reactions_user_id_fkey 
FOREIGN KEY (user_id) REFERENCES public.profiles(user_id) ON DELETE SET NULL;

-- Add public read policy for profiles email (for displaying reaction authors)
CREATE POLICY "Anyone can view profile emails for reactions"
ON public.profiles
FOR SELECT
USING (true);