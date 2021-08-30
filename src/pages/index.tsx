import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import CountDown, { TimeDiff } from "../components/CountDown";

const employmentTime = new Date("2021-09-01T00:00:00+09:00").getTime();
const getTimeForEmployment = () =>
  Math.floor((employmentTime - Date.now()) / 1000);

const getTimeDiff = (diff: number): TimeDiff => {
  const time = Math.abs(diff);
  const sec = time % 60;
  const min = Math.floor(time / 60) % 60;
  const hour = Math.floor(time / 3600) % 24;
  const date = Math.floor(time / 86400);
  return { date, hour, min, sec, isBefore: diff > 0 };
};

const ogImage = "https://i.imgur.com/9XZ9quS.png";
const title = "@sadnessOjisan 就職タイマー";
const desc = "社会性へのカウントダウン";

const Home: NextPage = () => {
  const [time, setTime] = useState(getTimeForEmployment());
  useEffect(() => {
    setInterval(() => {
      setTime(getTimeForEmployment());
    }, 1000);
  }, []);

  return (
    <div className="p-10">
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
      <main>{CountDown(getTimeDiff(time))}</main>
    </div>
  );
};

export default Home;
