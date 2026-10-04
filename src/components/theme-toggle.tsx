'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { createShutterSound } from '@/lib/shutter-sound';

const subscribeToHydration = () => () => undefined;
const SHUTTER_DURATION = 1600;
const THEME_CHANGE_DELAY = 640;

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(subscribeToHydration, () => true, () => false);
  const isDark = mounted && resolvedTheme === 'dark';
  const label = isDark ? 'Switch to light mode' : 'Switch to dark mode';
  const [switching, setSwitching] = useState(false);
  const actionLabel = switching ? 'Reverse theme change' : label;
  const shadeRef = useRef<HTMLSpanElement>(null);
  const animationRef = useRef<Animation | null>(null);
  const soundRef = useRef<ReturnType<typeof createShutterSound> | null>(null);
  const pendingTheme = useRef<'light' | 'dark' | null>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => () => {
    timers.current.forEach(clearTimeout);
    animationRef.current?.cancel();
    soundRef.current?.dispose();
  }, []);

  const toggleTheme = () => {
    const currentTheme = pendingTheme.current ?? (document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    const shade = shadeRef.current;
    const initialTransform = shade ? getComputedStyle(shade).transform : 'translateY(-100%)';
    timers.current.forEach(clearTimeout);
    animationRef.current?.cancel();
    pendingTheme.current = nextTheme;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !shade?.animate) {
      soundRef.current?.stop();
      setTheme(nextTheme);
      pendingTheme.current = null;
      setSwitching(false);
      return;
    }

    try {
      soundRef.current ??= createShutterSound(SHUTTER_DURATION / 1000);
      soundRef.current.play();
    } catch {
      // Theme switching still works when audio is unavailable or blocked.
    }

    // Restart from the current shade position so another click never snaps it open.
    setSwitching(true);
    animationRef.current = shade.animate([
      { transform: initialTransform, offset: 0, easing: 'cubic-bezier(0.32, 0, 0.2, 1)' },
      { transform: 'translateY(0)', offset: 0.4 },
      { transform: 'translateY(0)', offset: 0.55, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' },
      { transform: 'translateY(-100%)', offset: 1 },
    ], { duration: SHUTTER_DURATION, easing: 'linear' });
    timers.current = [
      setTimeout(() => setTheme(nextTheme), THEME_CHANGE_DELAY),
      setTimeout(() => { pendingTheme.current = null; setSwitching(false); }, SHUTTER_DURATION),
    ];
  };

  return (
    <button type='button' onClick={toggleTheme} disabled={!mounted} aria-label={actionLabel} title={actionLabel} aria-busy={switching}
      className='theme-toggle flight-window shrink-0' data-night={isDark}>
      <span className='flight-sky' aria-hidden='true'>
        <Sun className='flight-sun' /><Moon className='flight-moon' />
        <span className='flight-stars' /><span className='flight-cloud' />
        <span className='flight-horizon' /><span className='flight-wing' /><span className='flight-glass' />
        <span ref={shadeRef} className='flight-shade'><span /></span>
      </span>
    </button>
  );
}
