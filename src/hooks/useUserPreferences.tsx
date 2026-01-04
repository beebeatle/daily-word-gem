import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export const useUserPreferences = () => {
  const { user } = useAuth();
  const [preferredWordTypes, setPreferredWordTypes] = useState<string[]>(['general', 'academic', 'creative', 'business']);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPreferences = async () => {
      if (!user) {
        // Not logged in - show all word types
        setPreferredWordTypes(['general', 'academic', 'creative', 'business']);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('user_preferences')
        .select('preferred_word_types')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) {
        console.error('Error fetching preferences:', error);
        setLoading(false);
        return;
      }

      if (data?.preferred_word_types && data.preferred_word_types.length > 0) {
        setPreferredWordTypes(data.preferred_word_types);
      }
      setLoading(false);
    };

    fetchPreferences();
  }, [user]);

  return { preferredWordTypes, loading };
};
