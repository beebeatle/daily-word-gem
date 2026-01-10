-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS pg_cron WITH SCHEMA pg_catalog;
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;

-- Create a cron job to call the pick-word-of-the-day function every day at midnight UTC
SELECT cron.schedule(
  'pick-word-of-the-day-daily',
  '0 0 * * *',  -- Every day at 00:00 UTC
  $$
  SELECT extensions.http_post(
    url := 'https://vxyevnwvbcjnjmlwxalg.supabase.co/functions/v1/pick-word-of-the-day',
    headers := '{"Content-Type": "application/json", "Authorization": "Bearer ' || current_setting('app.settings.service_role_key', true) || '"}'::jsonb,
    body := '{}'::jsonb
  );
  $$
);