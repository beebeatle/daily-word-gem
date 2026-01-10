-- Create table to store word of the day records
CREATE TABLE public.word_of_the_day (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  word TEXT NOT NULL,
  word_type TEXT NOT NULL,
  date DATE NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.word_of_the_day ENABLE ROW LEVEL SECURITY;

-- Allow public read access (anyone can see the word of the day)
CREATE POLICY "Word of the day is publicly readable"
ON public.word_of_the_day
FOR SELECT
USING (true);

-- Only service role can insert (edge function will use service role)
CREATE POLICY "Service role can insert word of the day"
ON public.word_of_the_day
FOR INSERT
WITH CHECK (false);

-- Create index for faster date lookups
CREATE INDEX idx_word_of_the_day_date ON public.word_of_the_day(date DESC);