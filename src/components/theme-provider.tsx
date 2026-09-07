"use client";

import * as React from "react";

import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from "next-themes";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  React.useEffect(() => {
    const root = document.documentElement;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let isDark = root.classList.contains("dark");
    let timeout: ReturnType<typeof setTimeout> | undefined;

    const finishTransition = () => {
      clearTimeout(timeout);
      root.classList.remove("theme-transitioning");
    };

    const updateTheme = () => {
      const nextIsDark = root.classList.contains("dark");
      document.querySelector('meta[name="theme-color"]:not([media])')
        ?.setAttribute("content", nextIsDark ? "#000000" : "#f8f8f8");
      if (nextIsDark === isDark) return;
      isDark = nextIsDark;
      clearTimeout(timeout);

      if (motion.matches) {
        finishTransition();
        return;
      }

      root.classList.add("theme-transitioning");
      timeout = setTimeout(finishTransition, 420);
    };

    // Includes system-theme changes and updates from other tabs.
    const observer = new MutationObserver(updateTheme);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    motion.addEventListener("change", finishTransition);
    updateTheme();

    return () => {
      observer.disconnect();
      motion.removeEventListener("change", finishTransition);
      finishTransition();
    };
  }, []);

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
