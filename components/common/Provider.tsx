"use client";
import React, { useEffect, useState } from "react";
import FrameSDK from "@farcaster/frame-sdk";
import { usePlayerStore } from "@/hooks/UserStore";

function FarcasterFrameProvider({ children }: { children: React.ReactNode }) {
  const { setPlayer, setClient } = usePlayerStore();
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);

  useEffect(() => {
    const load = async () => {
      console.log("Running Frame Action ready");
      // Add the FrameSDK.actions.ready() otherwise your app will get stuck in a loading state i.e. a Splash screen.
      FrameSDK.actions.ready();
      const frameuser = await FrameSDK.context;
      console.log("Frame Action ready", frameuser);

      if (frameuser?.client) {
        setClient({
          added: frameuser?.client.added,
        });
      }

      if (frameuser?.user) {
        setPlayer({
          displayName: frameuser?.user.displayName || "",
          fid: frameuser?.user.fid,
          location: frameuser?.user.location || {
            placeId: "",
            description: "",
          },
          pfpUrl: frameuser?.user.pfpUrl || "",
          username: frameuser?.user.username || "",
        });
        setIsSDKLoaded(true);
      } else {
        console.warn(
          "No user found in FrameSDK context or displayName is undefined."
        );
      }
    };
    if (!isSDKLoaded) {
      load();
    }
  }, [isSDKLoaded, setClient, setPlayer]);
  return <>{children}</>;
}

const Provider = ({ children }: { children: React.ReactNode }) => {
  return <FarcasterFrameProvider>{children}</FarcasterFrameProvider>;
};

export default Provider;
