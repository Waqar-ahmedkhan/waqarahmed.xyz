'use client';

import { useState } from 'react';

import { ArrowLeft, ArrowRight } from 'lucide-react';

import { SectionHeading } from '@/components/ui/section-heading';

import { RESUME_DATA } from '@/data/resume-data';

const TITLES = ['PashtoGPT', 'Agentic HR', 'EduAI', 'Bondvia', 'Space Manager'];
const PROJECTS = [0, 1, 8, 4, 6].map((index) => RESUME_DATA.projects[index]);
const SUMMARIES = [
  'Research tooling for adapting language models to Pashto. Data preparation, QLoRA experiments, and evaluation; no released trained weights or measured quality gains yet.',
  'AI-assisted recruitment and employee workflows, with human approval checkpoints for operational decisions.',
  'An AI learning platform with adaptive quizzes, summaries, question answering, and learner recommendations.',
  'Real-time video calling, with work on matching reliability, database performance, and safer call sessions.',
  'Coworking SaaS for bookings, customers, dashboards, reports, and administration.',
];

const POINTS = [[23, 25], [72, 23], [48, 52], [22, 78], [78, 78]];

export function ProjectUniverse() {
  const [selected, setSelected] = useState(0);
  const project = PROJECTS[selected];
  const visitedLabel = `${selected + 1} / ${PROJECTS.length}`;
  const navigate = (direction: number) => setSelected((index) => (index + direction + PROJECTS.length) % PROJECTS.length);

  return (
    <section className='universe-panel overflow-hidden rounded-2xl border border-border bg-card print:hidden' aria-label='Interactive project constellation'>
      <div className='flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4'>
        <div><SectionHeading className='mb-0'>Explore my work</SectionHeading><p className='mt-1 text-xs text-muted-foreground'>Choose a project to learn more.</p></div>
        <span className='font-mono text-xs text-muted-foreground'>{visitedLabel}</span>
      </div>
      <div className='grid md:grid-cols-[1.1fr_1fr]'>
        <div className='universe-map relative min-h-64 sm:min-h-72 overflow-hidden' >
          <svg viewBox='0 0 100 100' preserveAspectRatio='none' className='absolute inset-0 size-full' aria-hidden='true'>
            <path d='M23 25L72 23L48 52L22 78L78 78L72 23M23 25L48 52L78 78' fill='none' stroke='currentColor' strokeWidth='.3' className='text-muted-foreground/30' />
          </svg>
          {POINTS.map(([x, y], index) => {
            const active = selected === index;

            return <button type='button' key={TITLES[index]} aria-pressed={active} onClick={() => setSelected(index)}
              style={{ left: `${x}%`, top: `${y}%` }} className='universe-node absolute flex min-h-11 min-w-11 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-2 rounded-lg px-2' data-active={active}>
              <span className='universe-star size-2 rounded-full bg-muted-foreground' aria-hidden='true' />
              <span className='whitespace-nowrap text-xs font-medium'>{TITLES[index]}</span>
            </button>;
          })}

        </div>
        <div className='flex flex-col justify-center border-t border-border p-5 sm:p-6 md:border-t-0 md:border-l'>
          <h3 className='text-lg font-semibold'>{TITLES[selected]}</h3>
          <p key={selected} className='project-summary mt-3 min-h-32 text-xs leading-6 text-muted-foreground'>{SUMMARIES[selected]}</p>
          <div className='mt-4 flex flex-wrap gap-1.5'>{project.techStack.slice(0, 4).map((tech) => <span key={tech} className='rounded-md bg-muted px-2 py-1 text-[9px]'>{tech}</span>)}</div>
          {project.link && <a href={project.link.href} className='mt-4 inline-flex min-h-11 items-center text-xs font-medium underline underline-offset-4'>{project.link.label} ↗</a>}
          {!project.link && <p className='mt-4 text-[10px] text-muted-foreground'>Experience summary · public repository unavailable</p>}
          <div className='mt-5 flex items-center gap-2'>
            <button type='button' onClick={() => navigate(-1)} aria-label='Previous project' className='flex size-11 items-center justify-center rounded-lg border border-border hover:bg-accent'><ArrowLeft size={16} /></button>
            <button type='button' onClick={() => navigate(1)} className='flex min-h-11 items-center gap-2 rounded-lg border border-border px-3 text-xs hover:bg-accent'>Next project <ArrowRight size={16} /></button>
          </div>
        </div>
      </div>
    </section>
  );
}
