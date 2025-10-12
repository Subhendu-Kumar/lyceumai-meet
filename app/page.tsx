"use client";

import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const Home = () => {
  const router = useRouter();
  const { user, isAuthenticated, error, meetId } = useAuth();

  const [meetingId, setMeetingId] = useState<string>("");

  useEffect(() => {
    if (isAuthenticated && user && meetId) {
      router.replace(`/meeting/${meetId}`);
    }
  }, [isAuthenticated, user, meetId, router]);

  const handleJoinMeeting = () => {
    router.replace(`/meeting/${meetingId.trim()}`);
  };

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
        <h1 className="text-2xl font-semibold mb-6">Hello👋 {user?.name}</h1>
        <div className="flex flex-col items-start w-full max-w-sm">
          <label htmlFor="meetingId" className="mb-2 text-gray-300 font-medium">
            Enter Meeting ID
          </label>
          <input
            id="meetingId"
            type="text"
            placeholder="e.g., 8f82f2c1-9b14-4f66-a28e-6a5fd38c76da"
            value={meetingId}
            onChange={(e) => setMeetingId(e.target.value)}
            className="w-full px-4 py-2 mb-4 h-10 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <Button
            onClick={handleJoinMeeting}
            disabled={!meetingId.trim()}
            className="w-full h-10 bg-blue-600 text-white rounded-md cursor-pointer disabled:cursor-not-allowed hover:bg-blue-700 disabled:bg-gray-600"
          >
            Join Meeting
          </Button>
        </div>
      </div>
    );
  }

  return null;
};

export default Home;
