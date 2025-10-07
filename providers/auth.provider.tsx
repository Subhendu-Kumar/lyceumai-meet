"use client";

import API from "@/api/axios.instance";
import { ReactNode, useEffect, useState } from "react";
import { AuthContext, User } from "@/contexts/auth.context";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlToken = params.get("auth_token");
    if (urlToken) {
      setToken(urlToken);
      const url = new URL(window.location.href);
      url.searchParams.delete("auth_token");
      window.history.replaceState({}, "", url.pathname + url.search);
    }
  }, []);

  useEffect(() => {
    const authenticateUser = async (token: string) => {
      try {
        const verifyTokenRes = await API.get("/auth/verify", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (verifyTokenRes.data) {
          const res = await API.get(`/auth/user`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(res.data);
          setIsAuthenticated(true);
          setToken(res.data.token);
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        const message =
          error.response?.data?.detail ||
          error.message ||
          "Something went wrong";
        setError(message);
      } finally {
        setLoading(false);
      }
    };
    if (token) {
      authenticateUser(token);
    }
  }, [token]);

  return (
    <AuthContext.Provider
      value={{ loading, user, token, error, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
