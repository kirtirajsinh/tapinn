"use client";
import { usePlayerStore } from "@/hooks/UserStore";
import { supabase } from "@/lib/supbase";
import { RealtimePresenceState } from "@supabase/supabase-js";
import Image from "next/image";
// import Image from "next/image";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import TornPaper from "@/utils/TornPaper";
import { faq } from "@/utils/Faq";
import { toast } from "sonner";
import Save from "./landing/Save";
import Share from "./landing/Share";
// import SketchButton from "./Save";
interface User {
  username: string;
  pfp: string;
  online_at: string;
  presence_ref: string;
}

const Lobby = () => {
  const [users, setUsers] = useState<RealtimePresenceState>({});
  const { player, client } = usePlayerStore();

  useEffect(() => {
    if (!player) return;
    const channel = supabase.channel("lobby");

    const userData = {
      user: player.fid,
      pfp: player.pfpUrl,
      username: player.username,
      online_at: new Date().toISOString(),
    };

    channel.on("presence", { event: "sync" }, () => {
      const currentUsers = channel.presenceState();
      console.log("Current users:", currentUsers);
      setUsers({ ...currentUsers });
    });

    channel.on("presence", { event: "join" }, (newPresences) => {
      console.log("New user joined:", newPresences?.newPresences[0]?.username);
      toast.success(
        `${newPresences?.newPresences[0]?.username} joined the Lobby!`
      );
    });

    channel.subscribe(async (status) => {
      if (status !== "SUBSCRIBED") return;
      await channel.track(userData);
    });

    return () => {
      channel.unsubscribe();
    };
  }, [player]);

  // Generate paths for uneven newspaper cuts

  return (
    <div className="relative w-full   ">
      <div className="mx-auto w-fit">
        <TornPaper textColor="" text="TapInn" bgColor="white" />
      </div>
      <div className="flex flex-col items-center  w-full h-full">
        {faq.map((item, index) => (
          <TornPaper textColor="" key={index} text={item.tap} bgColor="white" />
        ))}
      </div>
      <div className="flex justify-between items-center w-full px-4 py-2">
        {!client.added && <Save />}
        <Share />
      </div>

      {/* User profiles in newspaper cutouts - mobile optimized layout */}

      <div className="absolute  flex flex-wrap justify-center px-2 py-4 max-h-2/5 overflow-y-auto no-scrollbar">
        {Object.keys(users).map((key) =>
          users[key].map((user: Partial<User>, index: number) => (
            <motion.div
              key={`${key}-${index}`}
              className="relative m-2 pointer-events-auto"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: [0, 5, 0], opacity: 1 }}
              transition={{
                y: { repeat: Infinity, duration: 3, ease: "easeInOut" },
                opacity: { duration: 0.5 },
              }}
            >
              <div className="relative bg-white shadow-md p-2 flex flex-col items-center">
                {user?.pfp ? (
                  <Image
                    src={user.pfp}
                    alt="Profile"
                    width={48}
                    height={48}
                    className="object-cover "
                  />
                ) : (
                  <div className="w-12 h-12 bg-gray-200 flex items-center justify-center">
                    <span className="text-lg font-bold text-gray-400">?</span>
                  </div>
                )}
                <span className="text-xs font-medium text-gray-800 max-w-[60px] truncate text-center">
                  {user.username ?? "Unknown"}
                </span>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default Lobby;
