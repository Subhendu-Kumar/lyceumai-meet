"use client";

import { useEffect } from "react";
import Loader from "@/components/Loader";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();
  const { user, loading, isAuthenticated, error, meetId } = useAuth();

  useEffect(() => {
    if (isAuthenticated && user && meetId) {
      router.replace(`/meeting/${meetId}`);
    }
  }, [isAuthenticated, user, meetId, router]);

  if (loading) return <Loader />;

  if (error) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <p className="text-red-500">
          You must be logged in to view this content.
        </p>
      </div>
    );
  }

  if (isAuthenticated && user && !meetId) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-lg font-semibold mb-4">Welcome, {user.name}</h1>
        <p className="text-gray-400 mb-4">
          ❗ Meet ID not provided in the URL.
        </p>
      </div>
    );
  }

  return null;
};

export default Home;
