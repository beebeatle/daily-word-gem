-- Add email column to profiles table
ALTER TABLE public.profiles ADD COLUMN email TEXT;

-- Update existing profiles with emails from auth.users
UPDATE public.profiles p
SET email = (SELECT email FROM auth.users u WHERE u.id = p.user_id);

-- Update the handle_new_user function to include email
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email) VALUES (NEW.id, NEW.email);
  INSERT INTO public.user_preferences (user_id) VALUES (NEW.id);
  RETURN NEW;
END;
$$;