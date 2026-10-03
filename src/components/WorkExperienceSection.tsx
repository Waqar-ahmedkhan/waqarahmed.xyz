import { ChevronDown, ExternalLink } from 'lucide-react';

import { Section } from '@/components/ui/section';

import { RESUME_DATA } from '@/data/resume-data';

interface WorkExperienceSectionProps {
  animationDelay?: string;
}

const COMPANY_MARKS: Record<string, { initials: string; path: string }> = {
  Geekinate: { initials: 'G', path: 'M23 10H12L7 15v10l5 5h13V19h-9v5h4v2h-6l-3-3v-6l3-3h9' },
  'Viral Mobitech Private Limited': { initials: 'VM', path: 'M6 12l7 16 7-16M22 28V12l5 8 5-8v16' },
  'National Incubation Center (NIC), Kohat': { initials: 'NIC', path: 'M8 28V19h5v9M18 28V13h5v15M28 28V7h5v21' },
  'KUST Incubation Center (KIC), Pakistan': { initials: 'KIC', path: 'M12 9v22M28 9L16 20l12 11M7 20h26' },
};

function CompanyMark({ company }: { company: string }) {
  const mark = COMPANY_MARKS[company];

  return (
    <span className='flex size-11 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-foreground sm:size-12'>
      {mark ? (
        <svg viewBox='0 0 40 40' className='size-8' fill='none' stroke='currentColor' strokeWidth='2.5' aria-hidden='true'>
          <path d={mark.path} strokeLinecap='square' strokeLinejoin='miter' />
        </svg>
      ) : (
        <span className='text-sm font-semibold' aria-hidden='true'>{company.slice(0, 2).toUpperCase()}</span>
      )}
    </span>
  );
}

export function WorkExperienceSection({ animationDelay = '0.3s' }: WorkExperienceSectionProps) {
  return (
    <Section className='my-4 animate-fade-in sm:my-6 md:my-8' style={{ animationDelay }}>
      <h2 className='mb-5 inline-flex items-center gap-2 font-sans text-base font-semibold text-foreground sm:text-lg md:text-xl'>
        <span className='text-muted-foreground/50' aria-hidden='true'>[</span>
        Work Experience
        <span className='text-muted-foreground/50' aria-hidden='true'>]</span>
      </h2>
      <div className='relative rounded-lg border border-dashed border-border bg-card/50 px-3 py-2 sm:px-5 sm:py-3'>
        <div className='absolute bottom-8 left-[22px] top-8 border-l border-dashed border-muted-foreground/35 sm:left-[30px]' aria-hidden='true' />
        {RESUME_DATA.work.map((work) => {
          const isActive = work.end === 'Present';
          const status = isActive ? 'Active' : 'Past';
          const statusClass = isActive
            ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400'
            : 'bg-muted text-muted-foreground';
          const dotClass = isActive
            ? 'bg-emerald-500 ring-4 ring-emerald-500/15'
            : 'bg-muted-foreground/60 ring-4 ring-card';
          const dates = `${work.start} — ${work.end}`;

          return (
            <details key={work.company} className='group relative ml-6 border-b border-border/50 last:border-b-0 sm:ml-7'>
              <summary className='flex cursor-pointer list-none items-center gap-3 rounded-md py-5 outline-none hover:bg-muted/30 focus-visible:ring-2 focus-visible:ring-ring sm:gap-4 [&::-webkit-details-marker]:hidden'>
                <span className={`absolute -left-[20px] top-8 size-2.5 rounded-full sm:-left-[23px] ${dotClass}`} aria-hidden='true' />
                <CompanyMark company={work.company} />
                <span className='min-w-0 flex-1'>
                  <span className='flex flex-wrap items-center gap-x-2 gap-y-1'>
                    <span className='text-sm font-semibold text-foreground sm:text-base'>{work.company}</span>
                    <span className={`inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[9px] font-medium ${statusClass}`}>
                      <span className='size-1 rounded-full bg-current' aria-hidden='true' />
                      {status}
                    </span>
                  </span>
                  <span className='mt-1 block text-xs leading-5 text-muted-foreground sm:text-sm'>{work.title}</span>
                  <span className='mt-1 block text-[10px] text-muted-foreground sm:hidden'>{dates}</span>
                </span>
                <span className='hidden shrink-0 text-xs tabular-nums text-muted-foreground sm:block'>{dates}</span>
                <ChevronDown className='mr-1 size-3.5 shrink-0 text-muted-foreground group-open:rotate-180' aria-hidden='true' />
              </summary>
              <div className='pb-5 pl-0 sm:pl-16'>
                <div className='mb-3 flex flex-wrap items-center gap-2'>
                  {work.badges.map((badge) => (
                    <span key={badge} className='rounded border border-border px-2 py-0.5 text-[10px] text-muted-foreground'>{badge}</span>
                  ))}
                  {work.link ? (
                    <a href={work.link} target='_blank' rel='noopener noreferrer'
                      className='inline-flex items-center gap-1 text-xs text-foreground underline-offset-4 hover:underline'
                      aria-label={`Visit ${work.company} website`}>
                      Website <ExternalLink className='size-3' aria-hidden='true' />
                    </a>
                  ) : null}
                </div>
                <p className='text-xs leading-6 text-muted-foreground sm:text-sm'>{work.description}</p>
                <ul className='mt-3 list-disc space-y-2 pl-4 text-xs leading-6 text-muted-foreground sm:text-sm'>
                  {work.bulletPoints.map((point) => <li key={point.text}>{point.text}</li>)}
                </ul>
              </div>
            </details>
          );
        })}
      </div>
    </Section>
  );
}
