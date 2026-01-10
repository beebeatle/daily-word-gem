-- Add email subscription preference column
ALTER TABLE public.user_preferences 
ADD COLUMN send_daily_email boolean NOT NULL DEFAULT false;