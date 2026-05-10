"use client";

import { useEffect } from "react";

const SIZE = 64;
const W_PATH =
  "M74 166h66l42 172 52-172h44l52 172 42-172h66l-76 264h-66l-40-134-40 134h-66L74 166Z";
const W_CUTOUT =
  "M235 166h42l-21 74-21-74Zm19 148 22 80-20 36-20-36 18-80Z";
const CROWN_PATH =
  "M162 138 190 78 234 118 256 58 278 118 322 78 350 138Z";
const CROWN_BASE = "M174 138h164v30H174Z";
const STAR_PATH =
  "M388 74 399 99 426 110 399 121 388 146 377 121 350 110 377 99Z";

export function AnimatedFavicon() {
  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (motionQuery.matches) {
      return;
    }

    const canvas = document.createElement("canvas");
    canvas.width = SIZE;
    canvas.height = SIZE;
    const context = canvas.getContext("2d");

    if (!context || typeof Path2D === "undefined") {
      return;
    }

    let favicon = document.querySelector<HTMLLinkElement>(
      'link[rel~="icon"][data-dynamic-favicon="true"]'
    );

    if (!favicon) {
      favicon = document.createElement("link");
      favicon.rel = "icon";
      favicon.type = "image/png";
      favicon.sizes = `${SIZE}x${SIZE}`;
      favicon.dataset.dynamicFavicon = "true";
      document.head.appendChild(favicon);
    }

    const scale = SIZE / 512;
    const wPath = new Path2D(W_PATH);
    const wCutout = new Path2D(W_CUTOUT);
    const crownPath = new Path2D(CROWN_PATH);
    const crownBase = new Path2D(CROWN_BASE);
    const starPath = new Path2D(STAR_PATH);
    let frame = 0;

    const draw = () => {
      const phase = frame / 18;
      const sweepX = -150 + phase * 780;
      const crownGlow = 0.55 + Math.sin(phase * Math.PI) * 0.45;
      const starOpacity = Math.max(0, Math.sin(phase * Math.PI * 2));

      context.setTransform(1, 0, 0, 1, 0, 0);
      context.clearRect(0, 0, SIZE, SIZE);
      context.fillStyle = "#000";
      context.fillRect(0, 0, SIZE, SIZE);

      context.save();
      context.scale(scale, scale);

      context.shadowColor = `rgba(255, 216, 106, ${0.38 * crownGlow})`;
      context.shadowBlur = 20 * crownGlow;
      context.fillStyle = "#ffd76a";
      context.fill(crownPath);
      context.shadowBlur = 0;
      context.fillStyle = "#f5b942";
      context.fill(crownBase);
      context.fillStyle = `rgba(255, 240, 168, ${0.18 + 0.28 * crownGlow})`;
      context.fill(new Path2D("M198 116 234 136 256 100 278 136 314 116 326 138H186Z"));

      context.globalAlpha = 0.25 + 0.75 * starOpacity;
      context.fillStyle = "#fff3bf";
      context.fill(starPath);
      context.globalAlpha = 1;

      context.fillStyle = "#f8fafc";
      context.fill(wPath);
      context.save();
      context.clip(wPath);
      context.translate(sweepX, 0);
      context.transform(1, 0, -0.22, 1, 0, 0);
      context.fillStyle = "rgba(255, 216, 106, 0.45)";
      context.fillRect(0, 140, 62, 320);
      context.restore();

      context.fillStyle = "#000";
      context.fill(wCutout);
      context.restore();

      favicon.href = canvas.toDataURL("image/png");
      frame = (frame + 1) % 18;
    };

    draw();
    const intervalId = window.setInterval(draw, 140);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  return null;
}
