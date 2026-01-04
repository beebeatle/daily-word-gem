-- Add visitor_id column to track persistent unique visitors
ALTER TABLE public.user_actions ADD COLUMN visitor_id TEXT;