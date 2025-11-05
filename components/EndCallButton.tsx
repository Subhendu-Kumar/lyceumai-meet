"use client";

import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk";

const EndCallButton = () => {
  const call = useCall();
  const router = useRouter();
  const localParticipant = useCallStateHooks().useLocalParticipant();

  const isMeetingOwner =
    localParticipant &&
    call?.state.createdBy &&
    localParticipant.userId === call?.state.createdBy.id;

  if (!isMeetingOwner) {
    return null;
  }

  return (
    <Button
      onClick={async () => {
        await call.endCall();
        router.replace("/");
      }}
      className="bg-red-600 hover:bg-red-700"
    >
      End Call For All
    </Button>
  );
};

export default EndCallButton;
