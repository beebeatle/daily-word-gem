import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from 'sonner';

type ReactionType = 'like' | 'dislike';

interface ReactionCounts {
  likes: number;
  dislikes: number;
}

export const useWordReactions = (word: string) => {
  const { user } = useAuth();
  const [counts, setCounts] = useState<ReactionCounts>({ likes: 0, dislikes: 0 });
  const [userReaction, setUserReaction] = useState<ReactionType | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchReactions = useCallback(async () => {
    // Fetch counts for this word
    const { data: reactions, error } = await supabase
      .from('word_reactions')
      .select('reaction, user_id')
      .eq('word', word);

    if (error) {
      console.error('Error fetching reactions:', error);
      return;
    }

    const likes = reactions?.filter(r => r.reaction === 'like').length || 0;
    const dislikes = reactions?.filter(r => r.reaction === 'dislike').length || 0;
    setCounts({ likes, dislikes });

    // Check if current user has reacted
    if (user) {
      const userReactionData = reactions?.find(r => r.user_id === user.id);
      setUserReaction(userReactionData?.reaction as ReactionType || null);
    } else {
      setUserReaction(null);
    }
  }, [word, user]);

  useEffect(() => {
    fetchReactions();
  }, [fetchReactions]);

  const handleReaction = async (reaction: ReactionType) => {
    if (!user) {
      toast.error('Please sign in to react to words');
      return;
    }

    setLoading(true);

    try {
      if (userReaction === reaction) {
        // Remove reaction if clicking the same one
        const { error } = await supabase
          .from('word_reactions')
          .delete()
          .eq('user_id', user.id)
          .eq('word', word);

        if (error) throw error;
        setUserReaction(null);
        setCounts(prev => ({
          ...prev,
          [reaction === 'like' ? 'likes' : 'dislikes']: prev[reaction === 'like' ? 'likes' : 'dislikes'] - 1
        }));
      } else if (userReaction) {
        // Update existing reaction
        const { error } = await supabase
          .from('word_reactions')
          .update({ reaction, updated_at: new Date().toISOString() })
          .eq('user_id', user.id)
          .eq('word', word);

        if (error) throw error;
        
        const oldReaction = userReaction;
        setUserReaction(reaction);
        setCounts(prev => ({
          likes: prev.likes + (reaction === 'like' ? 1 : 0) - (oldReaction === 'like' ? 1 : 0),
          dislikes: prev.dislikes + (reaction === 'dislike' ? 1 : 0) - (oldReaction === 'dislike' ? 1 : 0)
        }));
      } else {
        // Insert new reaction
        const { error } = await supabase
          .from('word_reactions')
          .insert({ user_id: user.id, word, reaction });

        if (error) throw error;
        setUserReaction(reaction);
        setCounts(prev => ({
          ...prev,
          [reaction === 'like' ? 'likes' : 'dislikes']: prev[reaction === 'like' ? 'likes' : 'dislikes'] + 1
        }));
      }
    } catch (error) {
      console.error('Error updating reaction:', error);
      toast.error('Failed to update reaction');
      fetchReactions(); // Refresh to get correct state
    } finally {
      setLoading(false);
    }
  };

  return { counts, userReaction, handleReaction, loading };
};
