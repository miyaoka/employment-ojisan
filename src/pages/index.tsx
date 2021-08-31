import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import BgmPlayer from "../components/BgmPlayer";
import CountDown from "../components/CountDown";
import { useAnimationFrame } from "../hooks/animationFrame";

let employmentTime = new Date("2021-09-01T00:00:00+09:00").getTime();
const getTimeFromEmployment = () => Math.floor(Date.now() - employmentTime);

const ogImage = "https://i.imgur.com/9XZ9quS.png";
const title = "@sadnessOjisan 就職タイマー";
const desc = "社会性へのカウントダウン";

const Home: NextPage = () => {
  const [timeFromEmployment, setTime] = useState(getTimeFromEmployment());
  useAnimationFrame(() => {
    setTime(getTimeFromEmployment());
  });

  // debug用。?count=[sec] で就職カウントダウン確認ができる時刻に設定
  useEffect(() => {
    const params = new URL(location.href).searchParams;
    const count = Number(params.get("count") ?? undefined);
    if (isNaN(count)) return;
    employmentTime = Date.now() + count * 1000;
  }, []);

  return (
    <div className="p-4 sm:p-10">
      <Head>
        <title>{title}</title>
        <meta name="description" key="description" content={desc} />
        <meta property="og:title" key="og:title" content={title} />
        <meta property="og:description" key="og:description" content={desc} />
        <meta property="og:image" key="og:image" content={ogImage} />
        <meta
          name="twitter:card"
          key="twitter:card"
          content="summary_large_image"
        />
      </Head>
      <main
        style={{ fontFamily: `'Shippori Mincho B1', serif` }}
        className="text-lg"
      >
        {process.browser && <CountDown msFromTarget={timeFromEmployment} />}
      </main>
      <BgmPlayer msFromTarget={timeFromEmployment} />
      <footer>
        <a
          href="https://github.com/miyaoka/employment-ojisan"
          target="_blank"
          rel="noopener noreferrer"
          title="repository"
          className="fixed right-4 bottom-4 w-[40px] h-[40px]"
        >
          <img src="/images/GitHub-Mark-64px.png" alt="GitHub" />
        </a>
      </footer>
    </div>
  );
};

export default Home;
