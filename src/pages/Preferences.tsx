import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { motion } from 'framer-motion';
import { ArrowLeft, Loader2, Check, Mail } from 'lucide-react';
import { toast } from 'sonner';

const WORD_TYPES = [
  { id: 'general', label: 'General vocabulary', description: 'Everyday useful words' },
  { id: 'academic', label: 'Academic', description: 'Words for scholarly writing' },
  { id: 'creative', label: 'Creative writing', description: 'Expressive and poetic words' },
  { id: 'business', label: 'Business', description: 'Professional terminology' },
  { id: 'mindfulness', label: 'Moods & Mindfulness', description: 'Words for calm and introspection' },
];

const Preferences = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [selectedTypes, setSelectedTypes] = useState<string[]>(['general']);
  const [sendDailyEmail, setSendDailyEmail] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    const fetchPreferences = async () => {
      if (!user) return;
      
      const { data, error } = await supabase
        .from('user_preferences')
        .select('preferred_word_types, send_daily_email')
        .eq('user_id', user.id)
        .maybeSingle();

      if (!error && data) {
        if (data.preferred_word_types) {
          setSelectedTypes(data.preferred_word_types);
        }
        setSendDailyEmail(data.send_daily_email ?? false);
      }
      setLoading(false);
    };

    if (user) {
      fetchPreferences();
    }
  }, [user]);

  const handleToggleType = (typeId: string) => {
    setSelectedTypes(prev => {
      if (prev.includes(typeId)) {
        // Don't allow deselecting all
        if (prev.length === 1) return prev;
        return prev.filter(t => t !== typeId);
      }
      return [...prev, typeId];
    });
  };

  const handleSave = async () => {
    if (!user) return;
    
    setSaving(true);
    const { error } = await supabase
      .from('user_preferences')
      .update({ 
        preferred_word_types: selectedTypes,
        send_daily_email: sendDailyEmail
      })
      .eq('user_id', user.id);

    if (error) {
      toast.error('Failed to save preferences');
    } else {
      toast.success('Preferences saved!');
    }
    setSaving(false);
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-6 py-12">
      {/* Subtle background texture */}
      <div 
        className="fixed inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground) / 0.03) 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }}
      />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-lg mx-auto"
      >
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 font-sans text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to words
        </button>

        <h1 className="font-serif text-3xl font-bold text-foreground mb-2">
          Word Preferences
        </h1>
        <p className="text-muted-foreground font-sans mb-8">
          Choose the types of words you'd like to learn
        </p>

        <div className="space-y-3 mb-8">
          {WORD_TYPES.map((type) => (
            <motion.div
              key={type.id}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className={`
                p-4 rounded-xl border cursor-pointer transition-all
                ${selectedTypes.includes(type.id) 
                  ? 'border-primary bg-primary/5' 
                  : 'border-border bg-card hover:border-primary/50'}
              `}
              onClick={() => handleToggleType(type.id)}
            >
              <div className="flex items-start gap-3">
                <Checkbox
                  checked={selectedTypes.includes(type.id)}
                  onCheckedChange={() => handleToggleType(type.id)}
                  className="mt-0.5"
                />
                <div>
                  <p className="font-sans font-medium text-foreground">{type.label}</p>
                  <p className="font-sans text-sm text-muted-foreground">{type.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Email Subscription Section */}
        <div className="mb-8">
          <h2 className="font-serif text-xl font-semibold text-foreground mb-4">
            Email Notifications
          </h2>
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="p-4 rounded-xl border border-border bg-card"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-sans font-medium text-foreground">Send my word of the day via email</p>
                  <p className="font-sans text-sm text-muted-foreground">
                    Receive your daily word in your inbox every morning
                  </p>
                </div>
              </div>
              <Switch
                checked={sendDailyEmail}
                onCheckedChange={setSendDailyEmail}
              />
            </div>
          </motion.div>
        </div>

        <Button onClick={handleSave} disabled={saving} className="w-full">
          {saving ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              <Check className="w-4 h-4 mr-2" />
              Save preferences
            </>
          )}
        </Button>
      </motion.div>
    </div>
  );
};

export default Preferences;
