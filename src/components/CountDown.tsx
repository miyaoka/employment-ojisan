import React from "react";
import styled, { keyframes } from "styled-components";

type TimeDiff = {
  sec: number;
  min: number;
  hour: number;
  date: number;
};

const getTimeDiff = (diffMs: number): TimeDiff => {
  const diffSec = Math.floor(diffMs / 1000);
  const sec = (diffMs % 60000) / 1000;
  const min = Math.floor(diffSec / 60) % 60;
  const hour = Math.floor(diffSec / 3600) % 24;
  const date = Math.floor(diffSec / 86400);
  return { date, hour, min, sec };
};

const profile = (
  <div>
    統合開発環境 (
    <a
      href="https://twitter.com/sadnessOjisan"
      target="_blank"
      rel="noopener noreferrer"
    >
      @sadnessOjisan
    </a>
    ) さんが
  </div>
);
const subject = "統合開発環境 (@sadnessOjisan) さんが";

const SrOnly = (props: { text: string }) => (
  <div className="sr-only" role="timer" aria-live="polite" aria-atomic="true">
    {props.text}
  </div>
);
const ShareOnTwitter = (props: { tweetText: string }) => {
  return (
    <div className="flex justify-center">
      <a
        href={`https://twitter.com/intent/tweet?hashtags=syusyoku_20210901&text=${props.tweetText}"&url=https://employment-ojisan.vercel.app/`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center flex-col"
        title="Share on Twitter"
      >
        <div
          className="h-10 w-10 bg-gray-700"
          style={{
            WebkitMask: `url(/images/twitter.svg) no-repeat center / contain`,
          }}
        />
        シェアする
      </a>
    </div>
  );
};

const Rotation = keyframes`
  0%{ transform:rotate(0);}
  100%{ transform:rotate(360deg); }
`;
const NowBgWrapper = styled.div`
img{
  animation: ${Rotation} 1.2s ease infinite normal;,
}
`;

const BgWrapper = styled.div`
img{
  animation: ${Rotation} 60s linear infinite normal;,
}
`;

type Props = {
  msFromTarget: number;
};
const CountDown: React.FC<Props> = ({ msFromTarget }) => {
  const { sec, min, hour, date } = getTimeDiff(Math.abs(msFromTarget));

  if (msFromTarget >= 0 && msFromTarget < 10000) {
    const syusyokuNow = [
      ...new Array(Math.floor((msFromTarget / 1000 + 1) ** 1.5)),
    ]
      .map(() => "就職！")
      .join("");
    const justSyusyokuText = `${subject}${syusyokuNow}しました。`;

    return (
      <>
        <div aria-hidden="true">
          {profile}
          <NowBgWrapper>
            <img
              src={`/images/message_syusyoku_omedetou.png`}
              className="fixed left-0 top-0 z-[-1] object-contain opacity-50 w-screen h-screen"
            />
          </NowBgWrapper>
          <div className="text-[32px] sm:text-[64px] md:text-[72px] lg:text-[96px] font-bold leading-none text-red-500">
            {syusyokuNow}
          </div>
          <div>しました。</div>
        </div>
        <ShareOnTwitter tweetText={justSyusyokuText} />
        <SrOnly text={justSyusyokuText} />
      </>
    );
  }
  const isBefore = msFromTarget < 0;
  const preText = `就職${isBefore ? "するまで、あと" : "してから"}`;

  // 大きい順に値が無い時間単位を省き、逆順にする
  const reducedTime = [date, hour, min, sec.toFixed(3)].reduce(
    (acc: (number | string)[], curr) => {
      if (curr === 0 && acc.length === 0) return acc;
      return [curr, ...acc];
    },
    []
  );
  // 小さい順に時間単位を適用していく
  const timeUnit = ["秒", "分", "時間", "日"];
  const timeText = reducedTime.reduce((acc, curr, i) => {
    return `${curr}${timeUnit[i]}${acc}`;
  }, "");
  const noSecTime = `${date}日${hour}時間${min}分`;
  const postText = `${isBefore ? "です" : "経ちました"}。`;
  const tweetText = `${subject}${preText}${timeText}${postText}`;
  const srText = `${subject}${preText}${noSecTime}${postText}`;
  const imgSrc = `/images/${
    isBefore ? "syusyoku_nayamu_neet_man.png" : "message_syusyoku_omedetou.png"
  }`;
  return (
    <>
      <div aria-hidden="true">
        <BgWrapper>
          <img
            src={imgSrc}
            className="fixed left-0 top-0 z-[-1] object-contain opacity-25 w-screen h-screen"
          />
        </BgWrapper>
        {profile}
        <div>{preText}</div>
        <div className="text-[32px] sm:text-[64px] md:text-[72px] lg:text-[96px] font-bold leading-snug">
          {timeText}
        </div>
        <div>{postText}</div>
      </div>
      <ShareOnTwitter tweetText={tweetText} />
      <SrOnly text={srText} />
    </>
  );
};

export default CountDown;
