import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";

type Props = {
  msFromTarget: number;
};
const BgmPlayer: React.FC<Props> = ({ msFromTarget }) => {
  // 初期値が-10秒以下なら未プレイにする
  const [isPlaying, setPlaying] = useState(-msFromTarget < 10000);
  const [player, setPlayer] = useState<any>(null);

  useEffect(() => {
    if (isPlaying) return;
    // 残りが10秒台以下になったら再生
    if (Math.floor(msFromTarget / -1000) <= 10) {
      setPlaying(true);
      player?.playVideo();
    }
  }, [msFromTarget]);

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
