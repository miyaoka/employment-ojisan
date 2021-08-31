import React, { MutableRefObject, useEffect, useMemo, useRef } from "react"
import styled, { keyframes } from "styled-components";
import Reward, { RewardElement } from "react-rewards";
import BgmPlayer from "./BgmPlayer"
import { Status } from "../types"

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
const confettiCount = 300;

function calculateStatus (secFromTarget: number): Status {
  if (secFromTarget < -11) {
    return "neet";
  }
  // カウントダウン範囲 0 ~ -10.9999...
  // 負数のfloorで-10秒台は-11になるので-11を含める
  if (0 > secFromTarget && -11 <= secFromTarget) {
    return "countingDown";
  }
  if (secFromTarget >= 0 && secFromTarget < 10) {
    return "celebrating";
  }
  if (secFromTarget >= 10) {
    return "working";
  }

  // 本来は throw すべきだが動作を優先し、安全側に倒し "neet" を返す
  console.error({ error: "Unexpected Error", secFromTarget });
  return "neet";
}

type ContentProps = {
  status: Status;
  msFromTarget: number;
  confettiRef: MutableRefObject<RewardElement | null>;
  preText: string;
  timeText: string | number;
  postText: string;
  isBefore: boolean;
}
const Content: React.FC<ContentProps> = ({ status, msFromTarget, confettiRef , preText, timeText, postText, isBefore}) => {
  if (status === "celebrating") {
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
              className="fixed left-0 top-0 z-[-1] object-contain opacity-50 w-screen h-screen pointer-events-none"
            />
          </NowBgWrapper>
          <div className="text-[32px] sm:text-[64px] md:text-[72px] lg:text-[96px] font-bold leading-none text-red-500">
            {syusyokuNow}
          </div>
          <div>しました。</div>
          <div className="flex justify-center">
            <Reward
              ref={(ref) => {
                confettiRef.current = ref;
              }}
              type="confetti"
              config={{ elementCount: confettiCount, spread: 100 }}
            />
          </div>
        </div>
        <ShareOnTwitter tweetText={justSyusyokuText} />
        <SrOnly text={justSyusyokuText} />
      </>
    );
  }

  const imgSrc = `/images/${
    isBefore ? "syusyoku_nayamu_neet_man.png" : "message_syusyoku_omedetou.png"
  }`;
  return (
    <>
      <BgWrapper>
        <img
          src={imgSrc}
          className="fixed left-0 top-0 z-[-1] object-contain opacity-25 w-screen h-screen pointer-events-none"
        />
      </BgWrapper>
      {profile}
      <div>{preText}</div>
      {status === "countingDown" ? (
        <>
          <div className="text-[32px] sm:text-[64px] md:text-[72px] lg:text-[96px] leading-snug">&nbsp;</div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-50 bg-opacity-70 p-8 rounded-3xl z-10">
            <div className="flex justify-center w-full">
              <div className="flex flex-col justify-center h-full">
                <div className="content-center text-[64px] sm:text-[128px] md:text-[192px] lg:text-[256px] font-bold leading-snug whitespace-nowrap">
                  {timeText}
                </div>
              </div>
            </div>
            <div className="text-right">{postText}</div>
          </div>
        </>
      ) : (
        <>
          <div className="text-[32px] sm:text-[64px] md:text-[72px] lg:text-[96px] font-bold leading-snug">
            {timeText}
          </div>
          <div>{postText}</div>
        </>
      )}
    </>
  )
}

type Props = {
  msFromTarget: number;
};
const CountDown: React.FC<Props> = ({ msFromTarget }) => {
  const { sec, min, hour, date } = getTimeDiff(Math.abs(msFromTarget));
  const confettiRef = useRef<RewardElement | null>(null);

  const secFromTarget = Math.floor(msFromTarget / 1000);
  // 指定時刻に祝う等の処理を行うためステータスを計算する
  const status = useMemo(() => calculateStatus(secFromTarget), [secFromTarget])

  useEffect(() => {
    if (status === "celebrating") {
      confettiRef.current?.rewardMe();
    }
  }, [status]);

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

  return (
    <>
      <div className="flex flex-col justify-between">
        <div aria-hidden="true">
          <Content
            status={status}
            msFromTarget={msFromTarget}
            confettiRef={confettiRef}
            preText={preText}
            timeText={timeText}
            postText={postText}
            isBefore={isBefore}
          />
        </div>
        <div>
          <ShareOnTwitter tweetText={tweetText} />
          <SrOnly text={srText} />
        </div>
      </div>
      <BgmPlayer status={status} />
    </>
  );
};

export default CountDown;
