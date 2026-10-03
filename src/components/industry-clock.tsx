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

  const days = Math.floor((current.getTime() - getAnniversary(months)) / (DAY * SECOND));
  const hours = Math.floor(elapsed / 3600) % 24;
  const minutes = Math.floor(elapsed / 60) % 60;
  const seconds = elapsed % 60;

  return { years: Math.floor(months / 12), months: months % 12, days, hours, minutes, seconds, elapsed };
}

export function IndustryClock({ startDate }: IndustryClockProps) {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 768px)');
    let interval: ReturnType<typeof setInterval> | undefined;
    let initialTick: ReturnType<typeof setTimeout> | undefined;
    const tick = () => setNow(Date.now());

    const sync = () => {
      clearInterval(interval);
      clearTimeout(initialTick);
      if (!desktop.matches || document.hidden) return;
      initialTick = setTimeout(tick, 0);
      interval = setInterval(tick, SECOND);
    };

    sync();
    desktop.addEventListener('change', sync);
    document.addEventListener('visibilitychange', sync);

    return () => {
      clearInterval(interval);
      clearTimeout(initialTick);
      desktop.removeEventListener('change', sync);
      document.removeEventListener('visibilitychange', sync);
    };
  }, []);

  const experience = now === null ? null : getExperience(startDate, now);
  const since = new Date(startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' });
  const time = experience ? `${pad(experience.hours)}:${pad(experience.minutes)}:${pad(experience.seconds)}` : '--:--:--';
  const description = experience
    ? `${experience.years} years, ${experience.months} months and ${experience.days} days of industry experience, since ${since}`
    : `Industry experience since ${since}`;

  const year = new Date(startDate).getUTCFullYear();
  const seconds = experience?.seconds ?? 0;
  const minutes = (experience?.minutes ?? 0) + seconds / 60;
  const hours = ((experience?.hours ?? 0) % 12) + minutes / 60;
  const hands = [
    { angle: hours * 30, end: 23, width: 2.5, className: 'text-foreground' },
    { angle: minutes * 6, end: 16, width: 1.5, className: 'text-foreground' },
    { angle: seconds * 6, end: 12, width: 1, className: 'text-amber-700 dark:text-amber-400' },
  ];

  return (
    <div
      className='group relative hidden items-center gap-2.5 px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring md:flex'
      role='group'
      tabIndex={0}
      aria-label={`${description}. Elapsed time ${time}.`}
    >
      <svg viewBox='0 0 64 64' className='size-12 shrink-0' aria-hidden='true'>
        <circle cx='32' cy='32' r='29' className='fill-card stroke-border' />
        {Array.from({ length: 12 }, (_, index) => (
          <line
            key={index}
            x1='32' y1='6' x2='32' y2={index % 3 === 0 ? 11 : 8}
            transform={`rotate(${index * 30} 32 32)`}
            className='stroke-muted-foreground/60'
            strokeWidth={index % 3 === 0 ? 1.5 : 1}
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
        <circle cx='32' cy='32' r='2' className='fill-foreground' />
      </svg>
      <div className='text-left'>
        <span className='block text-[10px] font-medium text-foreground'>Building since {year}</span>
        <span className='mt-0.5 block text-[9px] text-muted-foreground'>Industry experience</span>
      </div>
      <div
        className='pointer-events-none absolute right-0 top-full mt-2 w-64 rounded-lg border border-border bg-background p-3 text-xs leading-5 text-muted-foreground opacity-0 shadow-lg transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100'
        aria-hidden='true'
      >
        <p className='font-medium text-foreground'>{description}</p>
        <p className='mt-1 font-mono tabular-nums'>Elapsed time · {time}</p>
      </div>
    </div>
  );
}
