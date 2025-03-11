"use client";

import { usePlayerStore } from "@/hooks/UserStore";
import TornPaperButton from "./TornPaperButton";
import { useState } from "react";
import FrameSDK from "@farcaster/frame-sdk";
import { toast } from "sonner";

const Save = () => {
  const { player, setClient } = usePlayerStore();
  const [loading, setLoading] = useState(false);
  const handleClick = async () => {
    try {
      console.log("FrameSDK", FrameSDK);
      if (!player) {
        console.log("FrameSDK is not defined");
        toast.error("Use Farcaster Frame to add Yapster to your home screen");
        return;
      }
      setLoading(true);
      const result = await FrameSDK.actions.addFrame();
      console.log("frame added", result);
      if (result) {
        setClient({
          added: true,
        });
        toast.success("Frame Added");
      } else {
        // toast.error("Error adding frame");
        console.log("Frame not added", result);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      // toast.error("Error adding frame");
      setLoading(false);
    }
  };

  return (
    <TornPaperButton loading={loading} text="Save" onClick={handleClick}>
      <p>Save</p>
    </TornPaperButton>
  );
};

export default Save;
