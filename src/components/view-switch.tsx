"use client";
import { motion, useReducedMotion, Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { memo } from "react";

const MotionButton = motion.create(Button);

export type ViewMode = "initial" | "simple" | "detailed";

interface ViewSwitchProps {
  currentView: ViewMode;
  onChange: (mode: ViewMode) => void;
  size?: "default" | "large";
  className?: string;
}

export const ViewSwitch = ({
  currentView,
  onChange,
  size = "default",
  className,
}: ViewSwitchProps) => {
  const isLarge = size === "large";
  const shouldReduceMotion = useReducedMotion();

  const easeSmooth = [0.25, 0.1, 0.25, 1] as const;

  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: shouldReduceMotion ? 0 : 0.55, ease: easeSmooth },
    },
  };

  const indicatorVariants: Variants = {
    simple: {
      x: 0,
      transition: shouldReduceMotion
        ? { duration: 0 }
        : { type: "spring", stiffness: 250, damping: 30, mass: 1 },
    },
    detailed: {
      x: "100%",
      transition: shouldReduceMotion
        ? { duration: 0 }
        : { type: "spring", stiffness: 250, damping: 30, mass: 1 },
    },
  };

  const buttonVariants: Variants = shouldReduceMotion
    ? {}
    : {
        hover: { scale: 1.02, transition: { duration: 0.3, ease: easeSmooth } },
        tap: { scale: 0.98, transition: { duration: 0.2, ease: easeSmooth } },
      };

  const modes: ViewMode[] = ["simple", "detailed"];

  return (
    <motion.div
      className={cn(
        "relative flex items-center gap-0 rounded-xl border border-border bg-background/95 backdrop-blur-sm shadow-sm",
        isLarge ? "h-12 w-64 p-0.5" : "h-10 w-56 p-0.5",
        className
      )}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      role="tablist"
      aria-label="View mode selection"
    >
      {/* Animated tab indicator – flat, no gradient */}
      <motion.div
        className="absolute rounded-lg bg-primary/20"
        variants={indicatorVariants}
        animate={currentView}
        style={{
          height: "calc(100% - 4px)",
          width: "calc(50% - 2px)",
          top: "2px",
          left: "2px",
        }}
      />

      {modes.map((mode) => {
        const isActive = currentView === mode;

        return (
          <MotionButton
            key={mode}
            variant="ghost"
            onClick={() => onChange(mode)}
            className={cn(
              "relative z-10 flex-1 rounded-lg border-0 font-medium transition-colors duration-200",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              isLarge ? "h-11 text-sm" : "h-9 text-sm",
              isActive
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground",
              "bg-transparent hover:bg-transparent"
            )}
            variants={buttonVariants}
            whileHover={shouldReduceMotion ? undefined : "hover"}
            whileTap={shouldReduceMotion ? undefined : "tap"}
            role="tab"
            aria-selected={isActive}
            aria-label={`Switch to ${mode} view`}
            tabIndex={0}
          >
            {mode.charAt(0).toUpperCase() + mode.slice(1)}
          </MotionButton>
        );
      })}
    </motion.div>
  );
};

export default memo(ViewSwitch);