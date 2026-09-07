"use client";

import * as React from "react";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const subscribeToHydration = () => () => undefined;

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = React.useSyncExternalStore(subscribeToHydration, () => true, () => false);
  const isDark = mounted && resolvedTheme === "dark";
  const label = isDark ? "Switch to light mode" : "Switch to dark mode";

  const toggleTheme = () => {
    // Read the applied theme so rapid clicks do not use a stale render.
    const isCurrentlyDark = document.documentElement.classList.contains("dark");
    setTheme(isCurrentlyDark ? "light" : "dark");
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      disabled={!mounted}
      aria-label={label}
      title={label}
      className="theme-toggle relative flex size-11 items-center justify-center rounded-xl border border-border bg-background/95 text-foreground shadow-sm disabled:opacity-50"
    >
      <Sun aria-hidden="true" className={`theme-icon ${isDark ? "theme-icon-visible" : "theme-icon-hidden"}`} />
      <Moon aria-hidden="true" className={`theme-icon ${isDark ? "theme-icon-hidden" : "theme-icon-visible"}`} />
    </button>
  );
}
