"use client";

import { useEffect, useRef } from "react";

interface Dot {
  homeX: number;
  homeY: number;
  x: number;
  y: number;
}

const SPACING = 44;
const DOT_RADIUS = 1;
const POINTER_RADIUS = 185;
const POINTER_FADE_DURATION = 900;
const RIPPLE_DURATION = 1400;

export function FluidDotGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d", { alpha: true });
    if (!canvas || !context) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0, vx: 0, vy: 0, updatedAt: -Infinity };
    let ripples: { x: number; y: number; startedAt: number }[] = [];
    let dots: Dot[] = [];
    let frame: number | null = null;
    let previousTime = 0;
    let width = 0, height = 0, pixelRatio = 1;
    let resizeTimer: ReturnType<typeof setTimeout> | undefined;

    const canAnimate = () => !motion.matches && finePointer.matches;

    const render = (time: number) => {
      frame = null;
      if (document.hidden) return;

      // Exponential smoothing keeps the same response at 60 Hz and 120 Hz.
      const elapsed = previousTime ? Math.min(time - previousTime, 50) : 16.67;
      const blend = 1 - Math.exp(-elapsed / 120);
      const pointerBlend = 1 - Math.exp(-elapsed / 55);
      pointer.x += (pointer.targetX - pointer.x) * pointerBlend;
      pointer.y += (pointer.targetY - pointer.y) * pointerBlend;
      previousTime = time;
      const interactive = canAnimate();
      const pointerAge = Math.max(0, time - pointer.updatedAt - 80);
      const pointerProgress = Math.min(1, pointerAge / POINTER_FADE_DURATION);
      const pointerStrength = interactive ? (1 + Math.cos(Math.PI * pointerProgress)) / 2 : 0;
      const pointerActive = pointerStrength > 0;
      ripples = interactive ? ripples.filter((ripple) => time - ripple.startedAt < RIPPLE_DURATION) : [];
      const wakeDecay = Math.exp(-elapsed / 160);
      pointer.vx *= wakeDecay;
      pointer.vy *= wakeDecay;

      context.clearRect(0, 0, width, height);
      context.beginPath();
      let unsettled = false;

      for (const dot of dots) {
        let targetX = dot.homeX;
        let targetY = dot.homeY;

        if (pointerActive) {
          const dx = dot.homeX - pointer.x;
          const dy = dot.homeY - pointer.y;
          const distanceSquared = dx * dx + dy * dy;
          if (distanceSquared > 0 && distanceSquared < POINTER_RADIUS * POINTER_RADIUS) {
            const distance = Math.sqrt(distanceSquared);
            // A smooth radial envelope avoids a sharp edge or a jump at the center.
            const envelope = Math.sin(Math.PI * distance / POINTER_RADIUS) ** 2;
            const displacement = 13 * envelope * pointerStrength;
            targetX += dx / distance * displacement;
            targetY += dy / distance * displacement;
          }
          if (distanceSquared < POINTER_RADIUS * POINTER_RADIUS) {
            const wakeEnvelope = (1 - distanceSquared / (POINTER_RADIUS * POINTER_RADIUS)) ** 2;
            targetX += pointer.vx * 0.022 * wakeEnvelope * pointerStrength;
            targetY += pointer.vy * 0.022 * wakeEnvelope * pointerStrength;
          }
        }

        for (const ripple of ripples) {
          const dx = dot.homeX - ripple.x;
          const dy = dot.homeY - ripple.y;
          const distance = Math.hypot(dx, dy);
          const progress = Math.max(0, (time - ripple.startedAt) / RIPPLE_DURATION);
          const waveDistance = Math.abs(distance - progress * 480);
          if (distance > 0 && waveDistance < 65) {
            const envelope = (1 + Math.cos(Math.PI * waveDistance / 65)) / 2;
            const displacement = 9 * envelope * Math.sin(Math.PI * progress) ** 2;
            targetX += dx / distance * displacement;
            targetY += dy / distance * displacement;
          }
        }

        // Bound overlapping waves so the texture stays legible during fast interaction.
        const offsetX = targetX - dot.homeX;
        const offsetY = targetY - dot.homeY;
        const offsetLength = Math.hypot(offsetX, offsetY);
        if (offsetLength > 26) {
          targetX = dot.homeX + offsetX / offsetLength * 26;
          targetY = dot.homeY + offsetY / offsetLength * 26;
        }
        dot.x += (targetX - dot.x) * (interactive ? blend : 1);
        dot.y += (targetY - dot.y) * (interactive ? blend : 1);
        const settled = Math.abs(targetX - dot.x) + Math.abs(targetY - dot.y) < 0.02;
        if (settled) {
          dot.x = targetX;
          dot.y = targetY;
        } else {
          unsettled = true;
        }

        const movement = Math.hypot(dot.x - dot.homeX, dot.y - dot.homeY);
        const radius = DOT_RADIUS + Math.min(movement / 26, 1) * 0.55;
        context.moveTo(dot.x + radius, dot.y);
        context.arc(dot.x, dot.y, radius, 0, Math.PI * 2);
      }

      // Neutral ink works in both themes without a per-frame theme observer.
      context.fillStyle = "#888888";
      context.fill();
      if (dots.length && !document.documentElement.classList.contains('dot-grid-ready')) {
        document.documentElement.classList.add('dot-grid-ready');
      }
      // Neighbor-only links keep the local network linear in the number of nodes.
      if (pointerActive) {
        const columns = Math.ceil((width + SPACING / 2) / SPACING);
        context.beginPath();
        for (let index = 0; index < dots.length; index += 1) {
          const dot = dots[index];
          const proximity = Math.hypot(dot.x - pointer.x, dot.y - pointer.y);
          if (proximity > 145 || index % 3 !== 0) continue;
          const neighbors = [index % columns < columns - 1 ? index + 1 : -1, index + columns];
          for (const neighborIndex of neighbors) {
            const neighbor = dots[neighborIndex];
            if (!neighbor) continue;
            context.moveTo(dot.x, dot.y);
            context.lineTo(neighbor.x, neighbor.y);
          }
        }
        context.strokeStyle = `rgba(136, 136, 136, ${pointerStrength * 0.65})`;
        context.lineWidth = 0.7;
        context.stroke();
      }
      if (pointerActive || ripples.length > 0 || unsettled) frame = requestAnimationFrame(render);
    };

    const wake = () => {
      if (frame !== null || document.hidden) return;
      previousTime = 0;
      frame = requestAnimationFrame(render);
    };

    const buildGrid = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      dots = [];
      ripples = [];
      // Anchor to the top-left so resizing does not shift the whole pattern.
      for (let y = SPACING / 2; y < height + SPACING; y += SPACING) {
        for (let x = SPACING / 2; x < width + SPACING; x += SPACING) {
          dots.push({ homeX: x, homeY: y, x, y });
        }
      }
      wake();
    };

    const onMove = (event: PointerEvent) => {
      if (!canAnimate() || event.pointerType !== "mouse") return;
      const now = performance.now();
      const elapsed = now - pointer.updatedAt;
      if (elapsed > 0 && elapsed < 100) {
        const blend = 1 - Math.exp(-elapsed / 40);
        const vx = Math.max(-700, Math.min(700, (event.clientX - pointer.targetX) / elapsed * 1000));
        const vy = Math.max(-700, Math.min(700, (event.clientY - pointer.targetY) / elapsed * 1000));
        pointer.vx += (vx - pointer.vx) * blend;
        pointer.vy += (vy - pointer.vy) * blend;
      } else {
        pointer.vx = 0;
        pointer.vy = 0;
      }
      if (!Number.isFinite(pointer.updatedAt)) {
        pointer.x = event.clientX;
        pointer.y = event.clientY;
      }
      pointer.targetX = event.clientX;
      pointer.targetY = event.clientY;
      pointer.updatedAt = now;
      wake();
    };

    const onDown = (event: PointerEvent) => {
      if (!canAnimate() || event.pointerType !== "mouse" || event.button !== 0) return;
      const target = event.target instanceof Element ? event.target : null;
      if (target?.closest('a, button, input, textarea, select, summary, [role="button"], [contenteditable]')) return;
      // Preserve the previous wave without allowing unbounded work on rapid clicks.
      ripples = [...ripples.slice(-2), { x: event.clientX, y: event.clientY, startedAt: performance.now() }];
      wake();
    };

    const resetInteraction = () => {
      pointer.updatedAt = -Infinity;
      pointer.vx = 0;
      pointer.vy = 0;
      ripples = [];
      wake();
    };

    const onVisibility = () => {
      if (document.hidden && frame !== null) {
        cancelAnimationFrame(frame);
        frame = null;
      }
      resetInteraction();
    };

    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(buildGrid, 100);
    };

    // CSS supplies the same grid before hydration; initialize canvas at idle.
    const idleId = window.requestIdleCallback?.(buildGrid, { timeout: 1000 });
    const initialTimer = idleId === undefined ? setTimeout(buildGrid, 0) : undefined;
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    document.documentElement.addEventListener("pointerleave", resetInteraction);
    window.addEventListener("blur", resetInteraction);
    window.addEventListener("scroll", resetInteraction, { passive: true, capture: true });
    window.addEventListener("resize", onResize, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    motion.addEventListener("change", resetInteraction);
    finePointer.addEventListener("change", resetInteraction);

    return () => {
      if (frame !== null) cancelAnimationFrame(frame);
      if (idleId !== undefined) window.cancelIdleCallback?.(idleId);
      clearTimeout(initialTimer);
      clearTimeout(resizeTimer);
      document.documentElement.classList.remove('dot-grid-ready');
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      document.documentElement.removeEventListener("pointerleave", resetInteraction);
      window.removeEventListener("blur", resetInteraction);
      window.removeEventListener("scroll", resetInteraction, true);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      motion.removeEventListener("change", resetInteraction);
      finePointer.removeEventListener("change", resetInteraction);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="dot-surface fixed inset-0 pointer-events-none z-0 select-none print:hidden" aria-hidden="true" />
  );
}
