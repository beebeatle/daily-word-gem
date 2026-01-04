-- Create user_actions table for activity logging
CREATE TABLE public.user_actions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  session_id TEXT NOT NULL,
  action_type TEXT NOT NULL,
  page_path TEXT,
  element_info TEXT,
  browser TEXT,
  device TEXT,
  os TEXT,
  screen_resolution TEXT,
  language TEXT,
  referrer TEXT,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.user_actions ENABLE ROW LEVEL SECURITY;

-- Allow anyone (including anonymous) to insert actions
CREATE POLICY "Anyone can log actions"
ON public.user_actions
FOR INSERT
WITH CHECK (true);

-- Only admins and moderators can view actions
CREATE POLICY "Admins can view all actions"
ON public.user_actions
FOR SELECT
USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Moderators can view all actions"
ON public.user_actions
FOR SELECT
USING (has_role(auth.uid(), 'moderator'));

-- Create index for faster queries
CREATE INDEX idx_user_actions_created_at ON public.user_actions(created_at DESC);
CREATE INDEX idx_user_actions_user_id ON public.user_actions(user_id);
CREATE INDEX idx_user_actions_session_id ON public.user_actions(session_id);
CREATE INDEX idx_user_actions_action_type ON public.user_actions(action_type);