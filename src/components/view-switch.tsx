"use client";
import { cn } from "@/lib/utils";
import { memo } from "react";

export type ViewMode = "initial" | "simple" | "detailed";

const VIEW_MODES = [
  { value: "simple", label: "Simple" },
  { value: "detailed", label: "Detailed" },
] as const;

interface ViewSwitchProps {
  currentView: ViewMode;
  onChange: (mode: ViewMode) => void;
  size?: "default" | "large";
  className?: string;
  "aria-label"?: string;
}

const ViewSwitchComponent = ({
  currentView,
  onChange,
  size = "default",
  className,
  "aria-label": ariaLabel = "View mode selection",
}: ViewSwitchProps) => {
  const isLarge = size === "large";
  const activeMode = currentView === "detailed" ? "detailed" : "simple";

  return (
    <div
      className={cn(
        "relative grid grid-cols-2 items-center overflow-hidden rounded-full border border-border/70 bg-background/95 p-1 shadow-lg shadow-black/5 backdrop-blur-xl",
        "transition-[box-shadow,border-color,background-color] duration-300 ease-[var(--ease-out-smooth)] motion-reduce:transition-none",
        "focus-within:border-primary/35 focus-within:ring-2 focus-within:ring-primary/20",
        "dark:border-white/10 dark:bg-black/80 dark:shadow-black/30",
        isLarge ? "h-14 w-72" : "h-12 w-64",
        className
      )}
      role="tablist"
      aria-label={ariaLabel}
    >
      <div
        className={cn(
          "pointer-events-none absolute left-1 top-1 h-[calc(100%-0.5rem)] w-[calc(50%-0.25rem)] rounded-full bg-primary shadow-sm shadow-primary/25",
          "translate-x-0 transform-gpu transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform motion-reduce:transition-none",
          activeMode === "detailed" && "translate-x-full"
        )}
      />

      {VIEW_MODES.map(({ value, label }) => {
        const isActive = activeMode === value;

        return (
          <button
            key={value}
            type="button"
            onClick={() => {
              if (!isActive) {
                onChange(value);
              }
            }}
            className={cn(
              "relative z-10 flex h-full min-w-0 items-center justify-center rounded-full border-0 bg-transparent px-4 font-medium outline-none",
              "transition-[color,transform] duration-200 ease-[var(--ease-out-smooth)] motion-reduce:transition-none",
              "focus-visible:outline-none active:scale-[0.985] motion-reduce:active:scale-100",
              isLarge ? "text-[0.95rem]" : "text-sm",
              isActive
                ? "text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
            role="tab"
            aria-selected={isActive}
            aria-label={`Switch to ${value} view`}
            tabIndex={0}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
};

export const ViewSwitch = memo(ViewSwitchComponent);
export default ViewSwitch;
