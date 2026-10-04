'use client';

import { useEffect, useId, useRef, useSyncExternalStore } from 'react';
import type { KeyboardEvent, PointerEvent } from 'react';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { createShutterSound } from '@/lib/shutter-sound';

const subscribeToHydration = () => () => undefined;
const SETTLE_DURATION = 380;
const OPEN_POSITION = 0.16;
const SHADE_TRAVEL = 0.68;
const clamp = (value: number) => Math.max(0, Math.min(1, value));

interface ShadeDrag {
  pointerId: number;
  startY: number;
  startPosition: number;
  travel: number;
  moved: boolean;
  lastY: number;
  lastTime: number;
}

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(subscribeToHydration, () => true, () => false);
  const isDark = mounted && resolvedTheme === 'dark';
  const hintId = useId();
  const shadeRef = useRef<HTMLSpanElement>(null);
  const soundRef = useRef<ReturnType<typeof createShutterSound> | null>(null);
  const positionRef = useRef<number | null>(null);
  const dragRef = useRef<ShadeDrag | null>(null);
  const frameRef = useRef<number | null>(null);
  const targetRef = useRef<boolean | null>(null);
  const soundTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const suppressClick = useRef(false);

  const stopSound = () => {
    if (soundTimerRef.current !== null) clearTimeout(soundTimerRef.current);
    soundTimerRef.current = null;
    soundRef.current?.stop();
  };

  const cancelFrame = () => {
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    frameRef.current = null;
  };

  const renderPosition = (position: number) => {
    positionRef.current = position;
    if (shadeRef.current) {
      shadeRef.current.style.transform = `translateY(${(OPEN_POSITION + position * SHADE_TRAVEL - 1) * 100}%)`;
    }
  };

  const playSound = (speed: number) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    try {
      soundRef.current ??= createShutterSound();
      soundRef.current.move(speed);
      if (soundTimerRef.current !== null) clearTimeout(soundTimerRef.current);
      soundTimerRef.current = setTimeout(stopSound, 100);
    } catch {
      // Dragging and theme selection still work when audio is unavailable.
    }
  };

  const settle = (target: number, audible = false) => {
    cancelFrame();
    stopSound();
    const initial = positionRef.current ?? (isDark ? 1 : 0);
    const distance = target - initial;

    if (Math.abs(distance) < 0.001 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      renderPosition(target);
      return;
    }

    let start: number | null = null;
    let previous = initial;
    const animate = (time: number) => {
      start ??= time;
      const progress = clamp((time - start) / SETTLE_DURATION);
      const next = initial + distance * (1 - (1 - progress) ** 3);
      renderPosition(next);
      if (audible && Math.abs(next - previous) > 0.001) playSound(Math.abs(next - previous) * 15);
      previous = next;

      if (progress < 1) frameRef.current = requestAnimationFrame(animate);
      else { frameRef.current = null; stopSound(); }
    };

    frameRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (!mounted || dragRef.current) return;
    // Sync external/system theme changes without interrupting an active settle.
    if (frameRef.current === null || targetRef.current !== isDark) {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
      positionRef.current = isDark ? 1 : 0;
      shadeRef.current?.style.removeProperty('transform');
    }
  }, [mounted, isDark]);

  useEffect(() => () => {
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    if (soundTimerRef.current !== null) clearTimeout(soundTimerRef.current);
    soundRef.current?.dispose();
  }, []);

  const selectTheme = (dark: boolean, audible = true) => {
    targetRef.current = dark;
    settle(dark ? 1 : 0, audible);
    setTheme(dark ? 'dark' : 'light');
  };

  const beginDrag = (event: PointerEvent<HTMLButtonElement>) => {
    if (!mounted || !event.isPrimary || event.button !== 0) return;
    cancelFrame();
    stopSound();
    suppressClick.current = false;
    const height = shadeRef.current?.parentElement?.getBoundingClientRect().height ?? 88;

    dragRef.current = {
      pointerId: event.pointerId,
      startY: event.clientY,
      startPosition: positionRef.current ?? (isDark ? 1 : 0),
      travel: height * SHADE_TRAVEL,
      moved: false,
      lastY: event.clientY,
      lastTime: event.timeStamp,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
    event.currentTarget.dataset.dragging = 'true';
  };

  const moveDrag = (event: PointerEvent<HTMLButtonElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    const delta = event.clientY - drag.startY;
    if (Math.abs(delta) > 4) drag.moved = true;
    if (!drag.moved) return;
    const next = clamp(drag.startPosition + delta / drag.travel);
    const previous = positionRef.current ?? drag.startPosition;
    const speed = Math.abs(event.clientY - drag.lastY) / Math.max(1, event.timeStamp - drag.lastTime);
    drag.lastY = event.clientY;
    drag.lastTime = event.timeStamp;
    cancelFrame();
    frameRef.current = requestAnimationFrame(() => {
      frameRef.current = null;
      renderPosition(next);
    });
    if (Math.abs(next - previous) > 0.001) playSound(Math.min(1, speed));
  };

  const finishDrag = (event: PointerEvent<HTMLButtonElement>, canceled = false) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    cancelFrame();
    stopSound();
    dragRef.current = null;
    event.currentTarget.dataset.dragging = 'false';
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);

    if (canceled) {
      suppressClick.current = true;
      settle(isDark ? 1 : 0);
      return;
    }

    if (drag.moved) {
      suppressClick.current = true;
      const final = clamp(drag.startPosition + (event.clientY - drag.startY) / drag.travel);
      renderPosition(final);
      selectTheme(final >= 0.5, false);
    }
  };

  const toggleTheme = () => {
    if (suppressClick.current) { suppressClick.current = false; return; }
    selectTheme(!document.documentElement.classList.contains('dark'));
  };

  const handleKey = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'Enter' || event.key === ' ') suppressClick.current = false;
    const lightKeys = ['ArrowUp', 'Home'];
    const darkKeys = ['ArrowDown', 'End'];
    if (!lightKeys.includes(event.key) && !darkKeys.includes(event.key)) return;
    event.preventDefault();
    suppressClick.current = false;
    selectTheme(darkKeys.includes(event.key));
  };

  return (
    <div className='flight-control shrink-0'>
      <button type='button' onClick={toggleTheme} onKeyDown={handleKey}
        onPointerDown={beginDrag} onPointerMove={moveDrag} onPointerUp={finishDrag}
        onPointerCancel={(event) => finishDrag(event, true)} onLostPointerCapture={(event) => finishDrag(event, true)}
        disabled={!mounted} aria-label='Day and night window shade' aria-pressed={isDark}
        aria-describedby={hintId} title='Pull down for night · push up for day'
        className='theme-toggle flight-window' data-night={isDark}>
        <span className='flight-sky' aria-hidden='true'>
          <Sun className='flight-sun' /><Moon className='flight-moon' />
          <span className='flight-stars' /><span className='flight-cloud' />
          <span className='flight-horizon' /><span className='flight-wing' /><span className='flight-glass' />
          <span ref={shadeRef} className='flight-shade'><Moon className='flight-shade-moon' /><span /></span>
        </span>
      </button>
      <span id={hintId} className='flight-hint'>Pull down · push up<span className='sr-only'>. Down selects dark mode; up selects light mode. You can also tap, or use arrow keys.</span></span>
    </div>
  );
}
