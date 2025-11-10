"use client";

import { cn } from "@/lib/utils";
import {
  CallControls,
  CallingState,
  CallParticipantsList,
  CallStatsButton,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LayoutList, Share2, Users } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import Loader from "./Loader";
import EndCallButton from "./EndCallButton";

type callLayOutType = "grid" | "speaker-left" | "speaker-right";

const MeetingRoom = ({ params }: { params: Promise<{ id: string }> }) => {
  const searchParams = useSearchParams();
  const isPersonalRoom = !!searchParams.get("personal");

  const [layout, setLayout] = useState<callLayOutType>("speaker-left");
  const [showParticipants, setShowParticipants] = useState(false);

  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  const router = useRouter();
  const text = window.location.href;

  if (callingState !== CallingState.JOINED) {
    return <Loader />;
  }

  const CallLayout = () => {
    switch (layout) {
      case "grid":
        return <PaginatedGridLayout />;
      case "speaker-right":
        return <SpeakerLayout participantsBarPosition="left" />;
      default:
        return <SpeakerLayout participantsBarPosition="right" />;
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden pt-4 text-white">
      <div className="relative size-full flex justify-center items-center">
        <div className="flex size-full max-w-[1000px] items-center">
          <CallLayout />
        </div>
        <div
          className={cn("h-[calc(100vh-86px)] hidden ml-2", {
            "show-block": showParticipants,
          })}
        >
          <CallParticipantsList onClose={() => setShowParticipants(false)} />
        </div>
      </div>

      <div className="fixed bottom-0 flex items-center justify-center w-full gap-4 flex-wrap">
        <CallControls onLeave={() => router.push("/")} />

        <DropdownMenu>
          <div className="flex items-center justify-center">
            <DropdownMenuTrigger className="cursor-pointer rounded-full bg-[#19232d] h-10 w-10 flex items-center justify-center hover:bg-[#4c535b]">
              <LayoutList size={25} className="text-white" />
            </DropdownMenuTrigger>
          </div>

          <DropdownMenuContent className="border-none bg-dark-1 text-white">
            {["Grid", "Speaker-Left", "Speaker-Right"].map((item, index) => {
              return (
                <div key={index}>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => {
                      setLayout(item.toLowerCase() as callLayOutType);
                    }}
                  >
                    {item}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                </div>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>

        <CallStatsButton />
        <button
          onClick={() => {
            setShowParticipants((prev) => !prev);
          }}
        >
          <div className="cursor-pointer rounded-full bg-[#19232d] h-10 w-10 flex items-center justify-center hover:bg-[#4c535b]">
            <Users size={25} className="text-white" />
          </div>
        </button>

        {!isPersonalRoom && <EndCallButton params={params} />}

        <button
          onClick={() => {
            console.log(text);
            navigator.clipboard.writeText(text);
            alert("Meeting link copied to clipboard");
          }}
        >
          <div className="cursor-pointer rounded-full bg-[#19232d] h-10 w-10 flex items-center justify-center hover:bg-[#4c535b]">
            <Share2 size={25} className="text-white" />
          </div>
        </button>
      </div>
    </section>
  );
};

export default MeetingRoom;
