import { useEffect, useCallback, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

const getSessionId = (): string => {
  let sessionId = sessionStorage.getItem('activity_session_id');
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    sessionStorage.setItem('activity_session_id', sessionId);
  }
  return sessionId;
};

const getBrowserInfo = (): string => {
  const ua = navigator.userAgent;
  if (ua.includes('Firefox')) return 'Firefox';
  if (ua.includes('Edg')) return 'Edge';
  if (ua.includes('Chrome')) return 'Chrome';
  if (ua.includes('Safari')) return 'Safari';
  if (ua.includes('Opera') || ua.includes('OPR')) return 'Opera';
  return 'Unknown';
};

const getDeviceInfo = (): string => {
  const ua = navigator.userAgent;
  if (/Mobi|Android/i.test(ua)) return 'Mobile';
  if (/Tablet|iPad/i.test(ua)) return 'Tablet';
  return 'Desktop';
};

const getOSInfo = (): string => {
  const ua = navigator.userAgent;
  if (ua.includes('Win')) return 'Windows';
  if (ua.includes('Mac')) return 'macOS';
  if (ua.includes('Linux')) return 'Linux';
  if (ua.includes('Android')) return 'Android';
  if (ua.includes('iOS') || ua.includes('iPhone') || ua.includes('iPad')) return 'iOS';
  return 'Unknown';
};

export const useActivityLogger = () => {
  const { user } = useAuth();
  const location = useLocation();
  const lastLoggedPath = useRef<string | null>(null);

  const logAction = useCallback(async (
    actionType: string,
    elementInfo?: string
  ) => {
    try {
      const sessionId = getSessionId();
      
      await supabase.from('user_actions').insert({
        user_id: user?.id || null,
        session_id: sessionId,
        action_type: actionType,
        page_path: location.pathname,
        element_info: elementInfo || null,
        browser: getBrowserInfo(),
        device: getDeviceInfo(),
        os: getOSInfo(),
        screen_resolution: `${window.screen.width}x${window.screen.height}`,
        language: navigator.language,
        referrer: document.referrer || null,
        user_agent: navigator.userAgent,
      });
    } catch (error) {
      console.error('Failed to log action:', error);
    }
  }, [user, location.pathname]);

  // Log page visits
  useEffect(() => {
    if (lastLoggedPath.current !== location.pathname) {
      lastLoggedPath.current = location.pathname;
      logAction('page_visit');
    }
  }, [location.pathname, logAction]);

  const logButtonClick = useCallback((buttonName: string) => {
    logAction('button_click', buttonName);
  }, [logAction]);

  return { logButtonClick, logAction };
};

// Context for global access
import { createContext, useContext, ReactNode } from 'react';

interface ActivityLoggerContextType {
  logButtonClick: (buttonName: string) => void;
  logAction: (actionType: string, elementInfo?: string) => void;
}

const ActivityLoggerContext = createContext<ActivityLoggerContextType | undefined>(undefined);

export const ActivityLoggerProvider = ({ children }: { children: ReactNode }) => {
  const logger = useActivityLogger();
  
  return (
    <ActivityLoggerContext.Provider value={logger}>
      {children}
    </ActivityLoggerContext.Provider>
  );
};

export const useActivityLog = () => {
  const context = useContext(ActivityLoggerContext);
  if (!context) {
    throw new Error('useActivityLog must be used within ActivityLoggerProvider');
  }
  return context;
};
