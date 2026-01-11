import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from 'sonner';

type ReactionType = 'like' | 'dislike';

interface ReactionCounts {
  likes: number;
  dislikes: number;
}

interface ReactionUser {
  email: string | null;
  visitorId: string | null;
}

interface ReactionUsers {
  likers: ReactionUser[];
  dislikers: ReactionUser[];
}

const getVisitorId = (): string => {
  let visitorId = localStorage.getItem('visitor_id');
  if (!visitorId) {
    visitorId = crypto.randomUUID();
    localStorage.setItem('visitor_id', visitorId);
  }
  return visitorId;
};

export const useWordReactions = (word: string) => {
  const { user } = useAuth();
  const [counts, setCounts] = useState<ReactionCounts>({ likes: 0, dislikes: 0 });
  const [reactionUsers, setReactionUsers] = useState<ReactionUsers>({ likers: [], dislikers: [] });
  const [userReaction, setUserReaction] = useState<ReactionType | null>(null);
  const [loading, setLoading] = useState(false);

  const visitorId = getVisitorId();

  const fetchReactions = useCallback(async () => {
    // Fetch reactions
    const { data: reactions, error } = await supabase
      .from('word_reactions')
      .select('reaction, user_id, visitor_id')
      .eq('word', word);

    if (error) {
      console.error('Error fetching reactions:', error);
      return;
    }

    const likesData = reactions?.filter(r => r.reaction === 'like') || [];
    const dislikesData = reactions?.filter(r => r.reaction === 'dislike') || [];
    
    setCounts({ likes: likesData.length, dislikes: dislikesData.length });
    
    // Fetch profile emails for users who reacted
    const userIds = reactions?.map(r => r.user_id).filter((id): id is string => id !== null) || [];
    
    let profilesMap: Record<string, string> = {};
    if (userIds.length > 0) {
      const { data: profiles } = await supabase
        .from('profiles')
        .select('user_id, email')
        .in('user_id', userIds);
      
      if (profiles) {
        profilesMap = profiles.reduce((acc, p) => {
          if (p.user_id && p.email) {
            acc[p.user_id] = p.email;
          }
          return acc;
        }, {} as Record<string, string>);
      }
    }
    
    // Extract user info for tooltips
    const likers: ReactionUser[] = likesData.map(r => ({
      email: r.user_id ? profilesMap[r.user_id] || null : null,
      visitorId: r.visitor_id || null
    }));
    
    const dislikers: ReactionUser[] = dislikesData.map(r => ({
      email: r.user_id ? profilesMap[r.user_id] || null : null,
      visitorId: r.visitor_id || null
    }));
    
    setReactionUsers({ likers, dislikers });

    // Check if current user/visitor has reacted
    let userReactionData;
    if (user) {
      userReactionData = reactions?.find(r => r.user_id === user.id);
    } else {
      userReactionData = reactions?.find(r => r.visitor_id === visitorId);
    }
    setUserReaction(userReactionData?.reaction as ReactionType || null);
  }, [word, user, visitorId]);

  useEffect(() => {
    fetchReactions();
  }, [fetchReactions]);

  const handleReaction = async (reaction: ReactionType) => {
    setLoading(true);

    try {
      if (userReaction === reaction) {
        // Remove reaction if clicking the same one
        let query = supabase
          .from('word_reactions')
          .delete()
          .eq('word', word);

        if (user) {
          query = query.eq('user_id', user.id);
        } else {
          query = query.eq('visitor_id', visitorId);
        }

        const { error } = await query;
        if (error) throw error;
        
        setUserReaction(null);
        setCounts(prev => ({
          ...prev,
          [reaction === 'like' ? 'likes' : 'dislikes']: prev[reaction === 'like' ? 'likes' : 'dislikes'] - 1
        }));
      } else if (userReaction) {
        // Update existing reaction
        let query = supabase
          .from('word_reactions')
          .update({ reaction, updated_at: new Date().toISOString() })
          .eq('word', word);

        if (user) {
          query = query.eq('user_id', user.id);
        } else {
          query = query.eq('visitor_id', visitorId);
        }

        const { error } = await query;
        if (error) throw error;
        
        const oldReaction = userReaction;
        setUserReaction(reaction);
        setCounts(prev => ({
          likes: prev.likes + (reaction === 'like' ? 1 : 0) - (oldReaction === 'like' ? 1 : 0),
          dislikes: prev.dislikes + (reaction === 'dislike' ? 1 : 0) - (oldReaction === 'dislike' ? 1 : 0)
        }));
      } else {
        // Insert new reaction
        const insertData = user 
          ? { user_id: user.id, word, reaction }
          : { visitor_id: visitorId, word, reaction };

        const { error } = await supabase
          .from('word_reactions')
          .insert(insertData);

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

  return { counts, reactionUsers, userReaction, handleReaction, loading };
};
