-- Allow moderators to view all profiles
CREATE POLICY "Moderators can view all profiles"
ON public.profiles
FOR SELECT
USING (has_role(auth.uid(), 'moderator'));