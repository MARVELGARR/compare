

"use client"
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { account } from "../libs/appwrite";
export interface Target {
  $id: string;
  $createdAt: string; // ISO date string
  $updatedAt: string; // ISO date string
  name: string;
  userId: string;
  providerId: string | null;
  providerType: string;
  identifier: string;
  expired: boolean;
}
interface User {
  $id: string;
  $createdAt: string; // ISO date string
  $updatedAt: string; // ISO date string
  name: string;
  registration: string; // ISO date string
  status: boolean;
  labels: string[];
  passwordUpdate: string; // ISO date string
  email: string;
  phone: string;
  emailVerification: boolean;
  phoneVerification: boolean;
  mfa: boolean;
  prefs: Record<string, any>; // flexible object
  targets: Target[];
  accessedAt: string; // ISO date string
}
type AuthContextType = {
  User: User | null
  isLoading: boolean
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | null>({ User: null, isLoading: false, logout: () => { }, isAuthenticated: false })


export const UserSessionContext = ({ children }: { children: ReactNode }) => {
  const [User, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);




  useEffect(() => {
    account.get()
      .then((user) => setUser(user as User))
      .catch((error) => {
        // If it's a 401 (Unauthorized) error, just set user to null silently
        // This is expected for guests. Only log other errors.
        if (error.code !== 401) {
          console.error("Appwrite account error:", error);
        }
        setUser(null);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const logout = () => account.deleteSessions()
  const isAuthenticated = User && User !== null ? true : false
  return (
    <AuthContext.Provider value={{ User, isLoading, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}


export const useAuth = () => {

  const AuthCOntext = useContext(AuthContext)

  if (!AuthCOntext || AuthCOntext === null) {
    throw new Error("Cannot use this hook outside of the Auth context")
  }
  return AuthCOntext
}