"use client";

import { Button } from "./ui/button";
import API from "@/lib/axios.instance";
import { useRouter } from "next/navigation";
import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk";
import { useAuth } from "@/hooks/useAuth";

const EndCallButton = () => {
  const { token, meetId, setMeetId } = useAuth();
  const call = useCall();
  const router = useRouter();
  const localParticipant = useCallStateHooks().useLocalParticipant();

  const isMeetingOwner =
    localParticipant &&
    call?.state.createdBy &&
    localParticipant.userId === call?.state.createdBy.id;

  const handleEndCall = async () => {
    try {
      if (!token) {
        alert("Authentication token not found. Please log in again.");
        return;
      }
      const res = await API.patch(
        `/meeting/${meetId}/status?status=COMPLETED`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.status === 200) {
        await call!.endCall();
        setMeetId(null);
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
