"use client";

import {
  useCall,
  VideoPreview,
  DeviceSettings,
} from "@stream-io/video-react-sdk";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";

const MeetingSetup = ({
  setIsSetupComplete,
}: {
  setIsSetupComplete: (value: boolean) => void;
}) => {
  const call = useCall();
  const [isMicCamToggledOn, setIsMicCamToggledOn] = useState(false);

  if (!call) {
    throw new Error("useCall must be used in StreamCall component");
  }

  useEffect(() => {
    if (isMicCamToggledOn) {
      call?.camera.disable();
      call?.microphone.disable();
    } else {
      call?.camera.enable();
      call?.microphone.enable();
    }
  }, [isMicCamToggledOn, call?.camera, call?.microphone]);

  return (
    <div className="flex flex-col justify-center items-center w-full h-screen gap-4">
      <h1 className="text-2xl font-bold">Setup Your Meeting</h1>
      <VideoPreview />
      <div className="flex justify-center items-center gap-4 h-16">
        <label className="flex items-center justify-center gap-2 font-medium ">
          <input
            type="checkbox"
            checked={isMicCamToggledOn}
            onChange={(e) => setIsMicCamToggledOn(e.target.checked)}
            className="w-[20px] h-[20px]"
          />
          join with mic & camera off
        </label>
        <DeviceSettings />
      </div>
      <Button
        className="rounded-md bg-green-600 hover:bg-green-700 px-4 py-2"
        onClick={() => {
          call?.join();
          setIsSetupComplete(true);
        }}
      >
        Join Meeting
      </Button>
    </div>
  );
};

export default MeetingSetup;
