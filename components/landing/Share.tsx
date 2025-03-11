import React from "react";
import TornPaperButton from "./TornPaperButton";
import Link from "next/link";

const Share = () => {
  return (
    <TornPaperButton text="Share" onClick={() => {}}>
      <Link
        href={`https://warpcast.com/~/compose?text=TapInn,%20use%20your%20hyperactive%20brain,%20and%20race%20Farcaster%20players%20in%20simple%20yet%20thrilling%20tasks!&embeds[]=https://tapinn.xyz
`}
        target="_blank"
      >
        Share
      </Link>
    </TornPaperButton>
  );
};

export default Share;
