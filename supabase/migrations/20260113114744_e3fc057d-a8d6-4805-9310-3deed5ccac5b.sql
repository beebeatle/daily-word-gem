SELECT cron.unschedule(1);

SELECT cron.schedule(
  'pick-word-of-the-day',
  '30 5 * * *',
  $$
  SELECT extensions.http_post(
    url := 'https://vxyevnwvbcjnjmlwxalg.supabase.co/functions/v1/pick-word-of-the-day',
    headers := '{"Content-Type": "application/json", "Authorization": "Bearer ' || current_setting('app.settings.service_role_key', true) || '"}'::jsonb,
    body := '{}'::jsonb
  );
  $$
);