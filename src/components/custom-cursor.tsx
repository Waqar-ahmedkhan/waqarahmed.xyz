"use client";

import { useEffect, useRef } from "react";

const NATIVE_CURSOR_TARGETS = 'input, textarea, select, [contenteditable]:not([contenteditable="false"]), iframe, video, [disabled]';
const INTERACTIVE_TARGETS = 'a[href], button, [role="button"], summary';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const preference = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    let frame: number | null = null;
    let previousTime = 0;
    let visible = false;
    let x = 0, y = 0, targetX = 0, targetY = 0;

    const stop = () => {
      visible = false;
      cursor.dataset.visible = "false";
      if (frame !== null) cancelAnimationFrame(frame);
      frame = null;
      previousTime = 0;
    };

    const render = (time: number) => {
      frame = null;
      const elapsed = previousTime ? Math.min(time - previousTime, 50) : 16.67;
      previousTime = time;
      const blend = 1 - Math.exp(-elapsed / 45);
      x += (targetX - x) * blend;
      y += (targetY - y) * blend;
      const settled = Math.abs(targetX - x) + Math.abs(targetY - y) < 0.1;
      if (settled) {
        x = targetX;
        y = targetY;
      }
      cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      if (!settled) frame = requestAnimationFrame(render);
    };

    const onMove = (event: PointerEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      const useNative = target?.closest(NATIVE_CURSOR_TARGETS);
      if (!preference.matches || event.pointerType !== "mouse" || document.hidden || useNative) {
        stop();
        return;
      }

      targetX = event.clientX;
      targetY = event.clientY;
      cursor.dataset.interactive = String(Boolean(target?.closest(INTERACTIVE_TARGETS)));
      if (!visible) {
        x = targetX;
        y = targetY;
        cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        cursor.dataset.visible = "true";
        visible = true;
      }
      if (frame === null) {
        previousTime = 0;
        frame = requestAnimationFrame(render);
      }
    };

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Tab" || event.key === "Escape") stop();
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("blur", stop);
    window.addEventListener("scroll", stop, { passive: true, capture: true });
    window.addEventListener("keydown", onKey);
    document.documentElement.addEventListener("pointerleave", stop);
    document.addEventListener("visibilitychange", stop);
    preference.addEventListener("change", stop);

    return () => {
      stop();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("blur", stop);
      window.removeEventListener("scroll", stop, true);
      window.removeEventListener("keydown", onKey);
      document.documentElement.removeEventListener("pointerleave", stop);
      document.removeEventListener("visibilitychange", stop);
      preference.removeEventListener("change", stop);
    };
  }, []);

  return <div ref={cursorRef} className="cursor-halo" aria-hidden="true"><span /></div>;
}
