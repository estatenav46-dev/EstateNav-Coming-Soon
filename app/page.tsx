'use client';

import { useEffect, useState } from 'react';

const launchTime = new Date('2026-11-21T19:00:00+05:30').getTime();

type Countdown = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getCountdown(now: number): Countdown {
  const totalSeconds = Math.max(0, Math.floor((launchTime - now) / 1000));

  return {
    days: Math.floor(totalSeconds / 86_400),
    hours: Math.floor((totalSeconds % 86_400) / 3_600),
    minutes: Math.floor((totalSeconds % 3_600) / 60),
    seconds: totalSeconds % 60,
  };
}

const units: Array<keyof Countdown> = ['days', 'hours', 'minutes', 'seconds'];

export default function Home() {
  const [countdown, setCountdown] = useState<Countdown | null>(null);

  useEffect(() => {
    const update = () => setCountdown(getCountdown(Date.now()));

    update();
    const intervalId = window.setInterval(update, 1000);
    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <main className="launch-screen">
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />
      <div className="star-field" aria-hidden="true" />

      <section className="launch-content" aria-label="EstateNav launch countdown">
        <div className="logo-orbit" aria-hidden="true">
          <span className="orbit orbit-outer" />
          <span className="orbit orbit-inner" />
          <span className="orbit-point" />
        </div>

        <img
          className="brand-logo"
          src="/logo.png"
          alt="EstateNav"
          width="500"
          height="500"
          fetchPriority="high"
        />

        <div className="countdown" role="timer" aria-label="Time until launch">
          {units.map((unit) => (
            <div className="countdown-unit" key={unit}>
              <span className="countdown-value">
                {countdown ? String(countdown[unit]).padStart(2, '0') : '--'}
              </span>
              <span className="countdown-label">{unit}</span>
            </div>
          ))}
        </div>

        <p className="launch-date">21 November 2026 <span /> 7:00 PM IST</p>
      </section>

      <div className="bottom-glow" aria-hidden="true" />
    </main>
  );
}
