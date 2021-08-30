export type TimeDiff = {
  sec: number;
  min: number;
  hour: number;
  date: number;
  isBefore: boolean;
};

export default function CountDown(diff: TimeDiff) {
  const { sec, min, hour, date, isBefore } = diff;
  return (
    <div>
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
      <div>就職{isBefore ? `するまで、あと` : `してから`}</div>
      <div className="text-[96px]">{`${date}日${hour}時間${min}分${sec}秒`}</div>
      <div>{isBefore ? `です` : `経ちました`}。</div>
    </div>
  );
}
