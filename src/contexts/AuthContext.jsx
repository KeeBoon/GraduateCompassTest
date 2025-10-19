import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../integrations/supabase/client';
import { useToast } from '../hooks/use-toast.jsx';

//const AuthContext = createContext({});
const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  //if (!context) {
  if (context === null) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('[Auth] Auth state changed:', event);
        setSession(session);
        setUser(session?.user ?? null);

        // if (event === 'SIGNED_IN' && session?.user) {
        //   try {
        //     const { error: upsertErr } = await supabase
        //       .from('users')
        //       .upsert(
        //         { id: session.user.id, email: session.user.email },
        //         { onConflict: 'id' }
        //       );
        //     if (upsertErr) console.error('[Auth] users upsert error:', upsertErr);
        //   } catch (e) {
        //     console.error('[Auth] users upsert exception:', e);
        //   }
        // }    
        
        // Fetch user role after setting session
        if (session?.user) {
          setTimeout(async () => {
            await fetchUserRole(session.user.id);
          }, 0);
        } else {
          setUserRole(null);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        fetchUserRole(session.user.id);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserRole = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .single();

      if (error) throw error;
      setUserRole(data?.role || 'user');
    } catch (error) {
      console.error('[Auth] Error fetching role:', error);
      setUserRole('user');
    }
  };

  const signUp = async (email, password, fullName) => {
    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            full_name: fullName
          }
        }
      });

      if (error) throw error;

      // // Ensure a row exists in your custom users table (RLS off, or add policy)
      // const userId = data.user?.id ?? data.session?.user?.id;
      // if (userId) {
      //   const { error: upsertErr } = await supabase
      //     .from('users')
      //     .upsert({ id: userId, email, full_name: fullName}, { onConflict: 'id' });
      //   if (upsertErr) console.error('[Auth] users upsert error:', upsertErr);
      // }

      toast({
        title: "Account created!",
        description: "You can now log in with your credentials.",
      });

      return { data, error: null };
    } catch (error) {
      console.error('[Auth] Sign up error:', error);
      toast({
        title: "Sign up failed",
        description: error.message,
        variant: "destructive",
      });
      return { data: null, error };
    }
  };

  const signIn = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      toast({
        title: "Welcome back!",
        description: "You have successfully logged in.",
      });

      return { data, error: null };
    } catch (error) {
      console.error('[Auth] Sign in error:', error);
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      });
      return { data: null, error };
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      toast({
        title: "Signed out",
        description: "You have been successfully logged out.",
      });
    } catch (error) {
      console.error('[Auth] Sign out error:', error);
      toast({
        title: "Sign out failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const resetPassword = async (email) => {
    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: redirectUrl,
      });

      if (error) throw error;

      toast({
        title: "Reset email sent",
        description: "Check your email for password reset instructions.",
      });

      return { error: null };
    } catch (error) {
      console.error('[Auth] Reset password error:', error);
      toast({
        title: "Reset failed",
        description: error.message,
        variant: "destructive",
      });
      return { error };
    }
  };

  const isAdmin = userRole === 'admin';

  const value = {
    user,
    session,
    loading,
    userRole,
    isAdmin,
    signUp,
    signIn,
    signOut,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
