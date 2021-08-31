import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";
import { Status } from "../types";

type YouTubeIFramePlayer = {
  playVideo: () => void;
  pauseVideo: () => void;
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
}

function assertYouTubeIFramePlayer (player?: unknown): player is YouTubeIFramePlayer {
  return !!player;
}

type Props = {
  status: Status
};
const BgmPlayer: React.FC<Props> = ({ status }) => {
  const [player, setPlayer] = useState<any>(null);

  useEffect(() => {
    const playable = assertYouTubeIFramePlayer(player)
    if (!playable) {
      return;
    }
    if (status === "countingDown") {
      player.playVideo();
    }
    if (status === "working") {
      player.pauseVideo();
      player.seekTo(0, false);
    }
  }, [status, player]);

  const onReady = (evt: Event) => {
    setPlayer(evt.target);
  };

  return (
    <YouTube
      videoId="PS2qPYbzEb4"
      onReady={onReady}
      className="opacity-0 pointer-events-none fixed bottom-0"
    />
  );
};

export default React.memo(BgmPlayer);
