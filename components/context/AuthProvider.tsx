"use client";
import { createContext, useContext, ReactNode } from "react";
import { useSession } from "@/lib/auth-client";

interface AuthUser {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  role?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  isAuthenticated: false,
});

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthContextHook = () => useContext(AuthContext);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const { data: session, isPending } = useSession();

  const user = session?.user
    ? {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
        role: (session.user as Record<string, unknown>).role as string | undefined,
      }
    : null;

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading: isPending,
        isAuthenticated: !!session?.user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
