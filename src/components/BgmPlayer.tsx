import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";
import { Status } from "../types";

type YouTubeIFramePlayer = {
  playVideo: () => void;
  pauseVideo: () => void;
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
};

function assertYouTubeIFramePlayer(
  player?: unknown
): player is YouTubeIFramePlayer {
  return !!player;
}

type Props = {
  status: Status;
};
const BgmPlayer: React.FC<Props> = ({ status }) => {
  const [player, setPlayer] = useState<any>(null);
  const [player2, setPlayer2] = useState<any>(null);

  useEffect(() => {
    const playable =
      assertYouTubeIFramePlayer(player) && assertYouTubeIFramePlayer(player2);
    if (!playable) {
      return;
    }
    if (status === "countingDown") {
      player.playVideo();
    }
    if (status === "celebrating") {
      player2.playVideo();
    }
    if (status === "working") {
      player.pauseVideo();
      player2.pauseVideo();
    }
  }, [status, player, player2]);

  const onReadyCountDown = (evt: Event) => {
    setPlayer(evt.target);
  };
  const onReadyCelebrate = (evt: Event) => {
    setPlayer2(evt.target);
  };

  return (
    <>
      <YouTube
        videoId="PS2qPYbzEb4"
        onReady={onReadyCountDown}
        className="opacity-0 pointer-events-none fixed bottom-0"
      />
      <YouTube
        videoId="1ARb7r0yY9k"
        onReady={onReadyCelebrate}
        className="opacity-0 pointer-events-none fixed bottom-0"
      />
    </>
  );
};

export default React.memo(BgmPlayer);
