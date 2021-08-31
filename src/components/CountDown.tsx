export type TimeDiff = {
  sec: number;
  min: number;
  hour: number;
  date: number;
  isBefore: boolean;
};

export default function CountDown(diff: TimeDiff) {
  const { sec, min, hour, date, isBefore } = diff;
  const preText = `就職${isBefore ? "するまで、あと" : "してから"}`;
  const time = `${date}日${hour}時間${min}分${sec}秒`;
  const noSecTime = `${date}日${hour}時間${min}分`;
  const postText = `${isBefore ? "です" : "経ちました"}。`;
  const tweetText = `統合開発環境 (@sadnessOjisan) さんが${preText}${time}${postText}`;
  return (
    <div>
      <div aria-hidden="true">
        <img
          src={`/images/${
            isBefore
              ? "syusyoku_nayamu_neet_man.png"
              : "message_syusyoku_omedetou.png"
          }`}
          alt=""
          className="fixed left-0 top-0 z-[-1] object-contain opacity-25 w-screen h-screen"
        />
        統合開発環境 (
        <a
          href="https://twitter.com/sadnessOjisan"
          target="_blank"
          rel="noopener noreferrer"
        >
          @sadnessOjisan
        </a>
        ) さんが
        <div>{preText}</div>
        <div className="text-[32px] sm:text-[64px] md:text-[72px] lg:text-[96px] font-bold">
          {time}
        </div>
        <div>{postText}</div>
      </div>
      <div className="sr-only" role="timer" aria-live="polite" aria-atomic="true">
        統合開発環境 (@sadnessOjisan) さんが{preText}{noSecTime}{postText}
      </div>
      <div className="flex justify-center">
        <a
          href={`https://twitter.com/intent/tweet?hashtags=syusyoku_20210901&text="${tweetText}"%0ahttps://employment-ojisan.vercel.app/`}
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
    </div>
  );
}
