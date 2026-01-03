import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useAdmin } from "@/hooks/useAdmin";
import { supabase } from "@/integrations/supabase/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Shield, ShieldOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UserProfile {
  id: string;
  user_id: string;
  display_name: string | null;
  created_at: string;
  is_admin: boolean;
}

const Admin = () => {
  const { user, loading: authLoading } = useAuth();
  const { isAdmin, loading: adminLoading } = useAdmin();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (!adminLoading && !isAdmin && user) {
      navigate("/");
      toast({
        title: "Access Denied",
        description: "You don't have permission to access this page.",
        variant: "destructive",
      });
    }
  }, [isAdmin, adminLoading, user, navigate, toast]);

  useEffect(() => {
    const fetchUsers = async () => {
      if (!isAdmin) return;

      const { data: profiles, error: profilesError } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });

      if (profilesError) {
        console.error("Error fetching profiles:", profilesError);
        toast({
          title: "Error",
          description: "Failed to load users.",
          variant: "destructive",
        });
        return;
      }

      const { data: roles, error: rolesError } = await supabase
        .from("user_roles")
        .select("user_id, role");

      if (rolesError) {
        console.error("Error fetching roles:", rolesError);
      }

      const adminUserIds = new Set(
        roles?.filter((r) => r.role === "admin").map((r) => r.user_id) || []
      );

      const usersWithRoles: UserProfile[] = (profiles || []).map((profile) => ({
        ...profile,
        is_admin: adminUserIds.has(profile.user_id),
      }));

      setUsers(usersWithRoles);
      setLoadingUsers(false);
    };

    if (isAdmin) {
      fetchUsers();
    }
  }, [isAdmin, toast]);

  const toggleAdminRole = async (userId: string, currentlyAdmin: boolean) => {
    if (currentlyAdmin) {
      const { error } = await supabase
        .from("user_roles")
        .delete()
        .eq("user_id", userId)
        .eq("role", "admin");

      if (error) {
        toast({
          title: "Error",
          description: "Failed to remove admin role.",
          variant: "destructive",
        });
        return;
      }
    } else {
      const { error } = await supabase.from("user_roles").insert({
        user_id: userId,
        role: "admin",
      });

      if (error) {
        toast({
          title: "Error",
          description: "Failed to add admin role.",
          variant: "destructive",
        });
        return;
      }
    }

    setUsers((prev) =>
      prev.map((u) =>
        u.user_id === userId ? { ...u, is_admin: !currentlyAdmin } : u
      )
    );

    toast({
      title: "Success",
      description: currentlyAdmin
        ? "Admin role removed."
        : "Admin role granted.",
    });
  };

  if (authLoading || adminLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold text-foreground">Admin Panel</h1>
        </div>

        <div className="bg-card rounded-lg border shadow-sm">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">Registered Users</h2>
            <p className="text-sm text-muted-foreground">
              {users.length} users registered
            </p>
          </div>

          {loadingUsers ? (
            <div className="p-8 text-center text-muted-foreground">
              Loading users...
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Display Name</TableHead>
                  <TableHead>User ID</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((profile) => (
                  <TableRow key={profile.id}>
                    <TableCell className="font-medium">
                      {profile.display_name || "No name"}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-xs font-mono">
                      {profile.user_id.slice(0, 8)}...
                    </TableCell>
                    <TableCell>
                      {new Date(profile.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {profile.is_admin ? (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-primary">
                          <Shield className="h-3 w-3" /> Admin
                        </span>
                      ) : (
                        <span className="text-xs text-muted-foreground">
                          User
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant={profile.is_admin ? "destructive" : "outline"}
                        size="sm"
                        onClick={() =>
                          toggleAdminRole(profile.user_id, profile.is_admin)
                        }
                        disabled={profile.user_id === user?.id}
                      >
                        {profile.is_admin ? (
                          <>
                            <ShieldOff className="h-3 w-3 mr-1" /> Remove Admin
                          </>
                        ) : (
                          <>
                            <Shield className="h-3 w-3 mr-1" /> Make Admin
                          </>
                        )}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
