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
        <title>employment-ojisan countdown</title>
        <meta name="description" content="employment-ojisan countdown" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>{CountDown(getTimeDiff(time))}</main>
    </div>
  );
};

export default Home;
