-- Schedule the send-daily-email function to run daily at 00:05 UTC
-- (5 minutes after the word is picked at 00:00 UTC)
SELECT cron.schedule(
  'send-daily-email',
  '5 0 * * *',  -- Every day at 00:05 UTC
  $$
  SELECT net.http_post(
    url := 'https://vxyevnwvbcjnjmlwxalg.supabase.co/functions/v1/send-daily-email',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || current_setting('supabase.service_role_key', true)
    ),
    body := '{}'::jsonb
  ) AS request_id;
  $$
);