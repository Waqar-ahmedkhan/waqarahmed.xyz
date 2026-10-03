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
    const tick = () => setNow(Date.now());
    const initialTick = window.setTimeout(tick, 0);
    const interval = window.setInterval(tick, SECOND);

    return () => {
      window.clearTimeout(initialTick);
      window.clearInterval(interval);
    };
  }, []);

  const experience = now === null ? null : getExperience(startDate, now);
  const since = new Date(startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' });
  const time = experience ? `${pad(experience.hours)}:${pad(experience.minutes)}:${pad(experience.seconds)}` : '--:--:--';
  const description = experience
    ? `${experience.years} years, ${experience.months} months and ${experience.days} days of industry experience, since ${since}`
    : `Industry experience since ${since}`;

  const year = new Date(startDate).getUTCFullYear();
  const units = [
    { label: 'Years', value: experience?.years },
    { label: 'Months', value: experience?.months },
    { label: 'Days', value: experience?.days },
  ];

  return (
    <div
      className='w-[244px] px-3 py-2.5 text-left'
      role='group'
      aria-label={description}
      title={description}
    >
      <div className='flex items-center justify-between gap-3 text-[9px] text-muted-foreground'>
        <span className='font-medium'>Industry experience</span>
        <span>Since {year}</span>
      </div>
      <div className='mt-2 flex items-center justify-between gap-3'>
        <div className='flex gap-4'>
          {units.map(({ label, value }) => (
            <div key={label} className='text-center'>
              <span className='block font-mono text-[19px] font-medium leading-5 tabular-nums tracking-tight text-foreground'>
                {value === undefined ? '--' : pad(value)}
              </span>
              <span className='mt-1 block text-[8px] text-muted-foreground'>{label}</span>
            </div>
          ))}
        </div>
        <div className='text-right'>
          <span className='block font-mono text-[12px] leading-5 tabular-nums text-amber-700 dark:text-amber-400/90'>
            {time}
          </span>
          <span className='mt-1 flex items-center justify-end gap-1 text-[8px] text-muted-foreground'>
            <span className='size-1 rounded-full bg-amber-600 dark:bg-amber-400/80' aria-hidden='true' />
            Live
          </span>
        </div>
      </div>
    </div>
  );
}
