import { createContext } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthState {
  loading: boolean;
  user: User | null;
  token: string | null;
  error: string | null;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthState | undefined>(undefined);
