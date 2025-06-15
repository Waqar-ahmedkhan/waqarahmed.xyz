"use client";
import { motion, useReducedMotion, Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { memo } from "react";

const MotionButton = motion(Button);

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

  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: shouldReduceMotion ? 0 : 0.4, ease: [0.4, 0, 0.2, 1] },
    },
  };

  // Adjusted indicator variants to use pixel values for precise alignment
  const indicatorVariants: Variants = {
    simple: {
      x: 0,
      transition: shouldReduceMotion
        ? { duration: 0 }
        : { type: "spring", stiffness: 400, damping: 40, mass: 0.8 },
    },
    detailed: {
      x: "100%", // Move to the right half of the container
      transition: shouldReduceMotion
        ? { duration: 0 }
        : { type: "spring", stiffness: 400, damping: 40, mass: 0.8 },
    },
  };

  const buttonVariants: Variants = shouldReduceMotion
    ? {}
    : {
        hover: { scale: 1.02, transition: { duration: 0.2 } },
        tap: { scale: 0.98, transition: { duration: 0.1 } },
      };

  const modes: ViewMode[] = ["simple", "detailed"];

  return (
    <motion.div
      className={cn(
        "relative flex items-center gap-1 rounded-2xl border border-border/50 bg-background/80 backdrop-blur-xl shadow-lg",
        "before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-r before:from-transparent before:via-border/10 before:to-transparent",
        isLarge ? "h-14 w-72 p-1" : "h-12 w-60 p-1",
        className
      )}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      role="tablist"
      aria-label="View mode selection"
    >
      {/* Animated background indicator */}
      <motion.div
        className="absolute rounded-xl bg-gradient-to-r from-primary/20 via-primary/30 to-primary/20 shadow-md"
        variants={indicatorVariants}
        animate={currentView}
        style={{
          height: "calc(100% - 8px)",
          width: "calc(50% - 4px)", // Adjusted for padding
          top: "4px",
          left: "4px",
        }}
      />

      {/* Subtle glow effect */}
      <motion.div
        className="absolute rounded-xl bg-primary/10 blur-sm"
        animate={{
          x: currentView === "simple" ? "0%" : "100%", // Aligned with indicator
          opacity: shouldReduceMotion ? 0 : 0.6,
          transition: { duration: shouldReduceMotion ? 0 : 0.3 },
        }}
        style={{
          height: "calc(100% - 4px)",
          width: "calc(50% - 4px)", // Consistent with indicator
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
              "relative z-10 flex-1 rounded-xl border-0 font-medium transition-colors duration-200",
              "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-0",
              isLarge ? "h-12 text-base" : "h-10 text-sm",
              isActive ? "text-primary shadow-sm" : "text-muted-foreground hover:text-foreground",
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
            <span className="relative flex items-center justify-center">
              {mode.charAt(0).toUpperCase() + mode.slice(1)}
              {isActive && (
                <motion.div
                  className="absolute -top-1 -right-1 h-1.5 w-1.5 rounded-full bg-primary"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    delay: shouldReduceMotion ? 0 : 0.1,
                    duration: shouldReduceMotion ? 0 : 0.2,
                  }}
                />
              )}
            </span>
          </MotionButton>
        );
      })}
    </motion.div>
  );
};

export default memo(ViewSwitch);