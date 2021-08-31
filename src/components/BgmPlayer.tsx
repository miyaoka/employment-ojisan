import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";

type Props = {
  msFromTarget: number;
};
const BgmPlayer: React.FC<Props> = ({ msFromTarget }) => {
  // 残りが10秒台になったらカウントダウン
  const isCountDown = 0 > msFromTarget && -11000 < msFromTarget;
  const [player, setPlayer] = useState<any>(null);

  useEffect(() => {
    if (isCountDown) {
      player?.playVideo();
    }
  }, [isCountDown, player]);

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

export default BgmPlayer;
