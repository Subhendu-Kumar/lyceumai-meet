"use client";

import { useAuth } from "@/hooks/useAuth";
import { ReactNode, useEffect, useState } from "react";
import { tokenProvider } from "@/actions/stream.action";
import { StreamVideo, StreamVideoClient } from "@stream-io/video-react-sdk";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;

const StreamProvider = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useAuth();
  const [videoClient, setVideoClient] = useState<StreamVideoClient>();

  useEffect(() => {
    if (loading || !user) {
      return;
    }
    if (!apiKey) {
      throw new Error("Missing stream api key");
    }
    const client = new StreamVideoClient({
      apiKey,
      user: {
        id: user?.id,
        name: user?.name || user?.id,
      },
      tokenProvider: () => tokenProvider(user?.id),
    });

    setVideoClient(client);
  }, [user, loading]);

  return <StreamVideo client={videoClient!}>{children}</StreamVideo>;
};

export default StreamProvider;
