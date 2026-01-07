-- Create a function to return public aggregate stats
-- This allows all visitors to see total counts without exposing individual records
CREATE OR REPLACE FUNCTION public.get_public_stats()
RETURNS JSON
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT json_build_object(
    'total_users', (SELECT COUNT(*) FROM public.profiles),
    'unique_visitors', (SELECT COUNT(DISTINCT visitor_id) FROM public.user_actions WHERE visitor_id IS NOT NULL),
    'page_views', (SELECT COUNT(*) FROM public.user_actions WHERE action_type = 'page_visit'),
    'words_displayed', (SELECT COUNT(*) FROM public.word_displays),
    'unique_words_displayed', (SELECT COUNT(DISTINCT word) FROM public.word_displays)
  );
$$;