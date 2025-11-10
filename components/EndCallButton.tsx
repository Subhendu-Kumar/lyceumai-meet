"use client";

import { use } from "react";
import { Button } from "./ui/button";
import API from "@/lib/axios.instance";
import { useRouter } from "next/navigation";
import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk";

const EndCallButton = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const call = useCall();
  const router = useRouter();
  const localParticipant = useCallStateHooks().useLocalParticipant();

  const isMeetingOwner =
    localParticipant &&
    call?.state.createdBy &&
    localParticipant.userId === call?.state.createdBy.id;

  const handleEndCall = async () => {
    try {
      const res = await API.patch(`/meeting/${id}/status?status=COMPLETED`);
      if (res.status === 200) {
        await call!.endCall();
        setTimeout(() => {
          router.replace("/");
        }, 500);
      } else {
        alert("Failed to end the call. Please try again.");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      alert(
        error.response?.data?.detail ||
          error.message ||
          error.toString() ||
          "Something went wrong"
      );
    }
  };

  if (!isMeetingOwner) {
    return null;
  }

  return (
    <Button onClick={handleEndCall} className="bg-red-600 hover:bg-red-700">
      End Call For All
    </Button>
  );
};

export default EndCallButton;
