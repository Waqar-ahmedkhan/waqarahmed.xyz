'use client';

import { useEffect, useState } from 'react';

interface IndustryClockProps {
  startDate: string;
}

const SECOND = 1000;
const DAY = 86400;
const pad = (value: number) => String(value).padStart(2, '0');

function getExperience(startDate: string, now: number) {
  const start = new Date(startDate);
  const current = new Date(Math.max(start.getTime(), now));
  const elapsed = Math.floor((current.getTime() - start.getTime()) / SECOND);
  let months = (current.getUTCFullYear() - start.getUTCFullYear()) * 12 + current.getUTCMonth() - start.getUTCMonth();

  const getAnniversary = (offset: number) => {
    const month = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth() + offset, 1));
    const lastDay = new Date(Date.UTC(month.getUTCFullYear(), month.getUTCMonth() + 1, 0)).getUTCDate();

    return Date.UTC(
      month.getUTCFullYear(), month.getUTCMonth(), Math.min(start.getUTCDate(), lastDay),
      start.getUTCHours(), start.getUTCMinutes(), start.getUTCSeconds()
    );
  };

  if (getAnniversary(months) > current.getTime()) months -= 1;

  const years = Math.floor(months / 12);
  const days = Math.floor((current.getTime() - getAnniversary(years * 12)) / (DAY * SECOND));
  const hours = Math.floor(elapsed / 3600) % 24;
  const minutes = Math.floor(elapsed / 60) % 60;
  const seconds = elapsed % 60;

  return { years, days, hours, minutes, seconds, elapsed };
}

export function IndustryClock({ startDate }: IndustryClockProps) {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 640px)');
    let interval: ReturnType<typeof setInterval> | undefined;
    let initialTick: ReturnType<typeof setTimeout> | undefined;
    const tick = () => setNow(Date.now());

    const sync = () => {
      clearInterval(interval);
      clearTimeout(initialTick);
      if (document.hidden || !desktop.matches) return;
      initialTick = setTimeout(tick, 0);
      interval = setInterval(tick, SECOND);
    };

    sync();
    document.addEventListener('visibilitychange', sync);
    desktop.addEventListener('change', sync);

    return () => {
      clearInterval(interval);
      clearTimeout(initialTick);
      document.removeEventListener('visibilitychange', sync);
      desktop.removeEventListener('change', sync);
    };
  }, []);

  const experience = now === null ? null : getExperience(startDate, now);
  const since = new Date(startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' });
  const time = experience ? `${pad(experience.hours)}:${pad(experience.minutes)}:${pad(experience.seconds)}` : '--:--:--';
  const description = experience
    ? `${experience.years} years and ${experience.days} days of industry experience, since ${since}`
    : `Industry experience since ${since}`;

  const seconds = experience?.seconds ?? 0;
  const minutes = (experience?.minutes ?? 0) + seconds / 60;
  const hours = ((experience?.hours ?? 0) % 12) + minutes / 60;
  const hands = [
    { angle: hours * 30, end: 23, width: 2.5, className: 'text-foreground' },
    { angle: minutes * 6, end: 16, width: 1.5, className: 'text-foreground' },
    { angle: seconds * 6, end: 12, width: 1, className: 'text-foreground' },
  ];

  return (
    <div
      className='industry-clock hidden items-center gap-3 rounded-2xl border border-border/80 bg-card px-4 py-2.5 shadow-sm sm:flex'
      role='group'
      aria-label={description}
    >
      <svg viewBox='0 0 64 64' className='size-11 shrink-0 sm:size-14' aria-hidden='true'>
        <circle cx='32' cy='32' r='29' className='fill-none stroke-border' strokeWidth='0.6' />
        {Array.from({ length: 12 }, (_, index) => (
          <line
            key={index}
            x1='32' y1='6' x2='32' y2={index % 3 === 0 ? 11 : 8}
            transform={`rotate(${index * 30} 32 32)`}
            className={index % 3 === 0 ? 'stroke-muted-foreground/70' : 'stroke-muted-foreground/30'}
            strokeWidth={index % 3 === 0 ? 1.2 : 0.7}
          />
        ))}
        {hands.map((hand, index) => (
          <line
            key={index}
            x1='32' y1='35' x2='32' y2={hand.end}
            transform={`rotate(${hand.angle} 32 32)`}
            className={hand.className}
            stroke='currentColor'
            strokeWidth={hand.width}
            strokeLinecap='round'
          />
        ))}
        <circle cx='32' cy='32' r='1.7' className='fill-foreground' />
      </svg>
      <div className='min-w-24 text-left' aria-hidden='true'>
        <span className='block text-[9px] font-medium uppercase tracking-[0.12em] text-muted-foreground'>Industry experience</span>
        <span className='mt-1 block text-xl font-semibold leading-none tracking-tight tabular-nums'>
          {experience ? experience.years : '--'}<span className='mr-3 ml-1 text-[10px] font-medium text-muted-foreground'>years</span>
          {experience ? experience.days : '--'}<span className='ml-1 text-[10px] font-medium text-muted-foreground'>days</span>
        </span>
        <span className='mt-1 block font-mono text-[11px] font-medium tracking-wider text-foreground tabular-nums'>
          {time}
        </span>
        <span className='mt-0.5 block text-[9px] text-muted-foreground'>since {since}</span>
      </div>
    </div>
  );
}
