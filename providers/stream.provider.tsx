"use client";

import Loader from "@/components/Loader";
import { useAuth } from "@/hooks/useAuth";
import { ReactNode, useEffect, useState } from "react";
import { tokenProvider } from "@/actions/stream.action";
import { StreamVideo, StreamVideoClient } from "@stream-io/video-react-sdk";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY!;

const StreamProvider = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useAuth();
  const [videoClient, setVideoClient] = useState<StreamVideoClient | null>(
    null
  );

  useEffect(() => {
    if (loading || !user) return;
    if (!apiKey) throw new Error("Missing Stream API key");

    const client = new StreamVideoClient({
      apiKey,
      user: {
        id: user.id,
        name: user.name || user.id,
      },
      tokenProvider: async () => await tokenProvider(user.id),
    });

    setVideoClient(client);

    return () => {
      client.disconnectUser();
    };
  }, [user, loading]);

  if (!videoClient) return <Loader />;

  return <StreamVideo client={videoClient}>{children}</StreamVideo>;
};

export default StreamProvider;
