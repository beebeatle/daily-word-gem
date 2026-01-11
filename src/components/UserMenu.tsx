import { useAuth } from '@/hooks/useAuth';
import { useAdmin } from '@/hooks/useAdmin';
import { useUserRole } from '@/hooks/useUserRole';
import { useNavigate } from 'react-router-dom';
import { User, LogOut, Settings, Shield, Activity, Users, BookOpen, Mail, MessageSquare } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

const UserMenu = () => {
  const { user, signOut } = useAuth();
  const { isAdmin } = useAdmin();
  const { role } = useUserRole();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (!user) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/auth')}
            className="rounded-full"
          >
            <div className="w-8 h-8 rounded-full bg-secondary/80 hover:bg-secondary flex items-center justify-center transition-all duration-300">
              <User className="w-4 h-4" />
            </div>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Sign in</p>
        </TooltipContent>
      </Tooltip>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="w-4 h-4 text-primary" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <div className="px-2 py-1.5">
          <p className="text-sm font-medium font-sans truncate">{user.email}</p>
          {role && (
            <Badge variant="secondary" className="mt-1 text-xs capitalize">
              {role}
            </Badge>
          )}
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate('/preferences')} className="cursor-pointer">
          <Settings className="w-4 h-4 mr-2" />
          Preferences
        </DropdownMenuItem>
        {(isAdmin || role === 'moderator') && (
          <>
            <DropdownMenuItem onClick={() => navigate('/users')} className="cursor-pointer">
              <Users className="w-4 h-4 mr-2" />
              Users
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/activity-log')} className="cursor-pointer">
              <Activity className="w-4 h-4 mr-2" />
              Activity Log
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/word-displays')} className="cursor-pointer">
              <BookOpen className="w-4 h-4 mr-2" />
              Word Displays
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/emails-sent')} className="cursor-pointer">
              <Mail className="w-4 h-4 mr-2" />
              Emails Sent
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/feedback')} className="cursor-pointer">
              <MessageSquare className="w-4 h-4 mr-2" />
              User Feedback
            </DropdownMenuItem>
          </>
        )}
        {isAdmin && (
          <DropdownMenuItem onClick={() => navigate('/admin')} className="cursor-pointer">
            <Shield className="w-4 h-4 mr-2" />
            Admin Panel
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-destructive">
          <LogOut className="w-4 h-4 mr-2" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
