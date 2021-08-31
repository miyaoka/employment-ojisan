import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react"
import CountDown from "../components/CountDown";

const employmentTime = new Date("2021-09-01T00:00:00+09:00").getTime();
const getTimeFromEmployment = () =>
  Math.floor((Date.now() - employmentTime));

const ogImage = "https://i.imgur.com/9XZ9quS.png";
const title = "@sadnessOjisan 就職タイマー";
const desc = "社会性へのカウントダウン";

const Home: NextPage = () => {
  const [timeFromEmployment, setTime] = useState(getTimeFromEmployment());
  const [milliSecMode, setMilliSecMode] = useState(false);

  useEffect(() => {
    const isMilliSecMode = localStorage.getItem('milliSecMode');
    if (isMilliSecMode) {
      setMilliSecMode(true)
    }
  }, [setMilliSecMode])

  const interval = milliSecMode ? 1 : 1000;
  setInterval(() => {
    setTime(getTimeFromEmployment());
  }, interval);

  return (
    <div className="p-4 sm:p-10">
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
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
        {process.browser && <CountDown timeFromTarget={timeFromEmployment} isMilliSecMode={milliSecMode} />}
      </main>
      <footer>
        <a
          href="https://github.com/miyaoka/employment-ojisan"
          target="_blank"
          rel="noopener noreferrer"
          title="repository"
          className="fixed right-4 bottom-4 w-[40px] h-[40px]"
        >
          <img src="/images/GitHub-Mark-64px.png" />
        </a>
      </footer>
    </div>
  );
};

export default Home;
