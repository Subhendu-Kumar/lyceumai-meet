"use client";

import API from "@/lib/axios.instance";
import { ReactNode, useEffect, useState } from "react";
import { AuthContext, User } from "@/contexts/auth.context";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [meetId, setMeetId] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlMeetId = params.get("meet_id");
    const urlToken = params.get("auth_token");

    if (urlMeetId) setMeetId(urlMeetId);

    if (urlToken) {
      localStorage.setItem("auth_token", urlToken);
      setToken(urlToken);
    } else {
      const storedToken = localStorage.getItem("auth_token");
      if (storedToken) setToken(storedToken);
    }

    const url = new URL(window.location.href);
    url.searchParams.delete("meet_id");
    url.searchParams.delete("auth_token");
    window.history.replaceState({}, "", url.pathname + url.search);
  }, []);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }
    const authenticateUser = async () => {
      try {
        const verifyRes = await API.get("/auth/verify", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (verifyRes.data) {
          const userRes = await API.get("/auth/user", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(userRes.data);
          setIsAuthenticated(true);
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        const message =
          err.response?.data?.detail || err.message || "Something went wrong";
        setError(message);
        localStorage.removeItem("auth_token");
      } finally {
        setLoading(false);
      }
    };
    authenticateUser();
  }, [token]);

  return (
    <AuthContext.Provider
      value={{ loading, user, token, error, isAuthenticated, meetId }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
