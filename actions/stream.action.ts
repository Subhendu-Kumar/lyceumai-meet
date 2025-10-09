"use server";

import { StreamClient } from "@stream-io/node-sdk";

const apiSecret = process.env.STREAM_SECRET_KEY;
const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;

export const tokenProvider = async (userId: string) => {
  if (!userId) {
    throw new Error("user is not authenticated");
  }

  if (!apiKey) {
    throw new Error("Error to access API key");
  }

  if (!apiSecret) {
    throw new Error("Error to access API secret");
  }

  const client = new StreamClient(apiKey, apiSecret);

  const issued = Math.floor(Date.now() / 1000 - 60);

  const exp = Math.round(new Date().getTime() / 1000) + 60 * 60;

  const token = client.generateUserToken({ user_id: userId, exp, issued });

  return token;
};
