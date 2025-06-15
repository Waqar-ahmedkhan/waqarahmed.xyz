
"use client";
import { Button } from "@/components/ui/button";

export type ViewMode = "initial" | "simple" | "detailed";

interface ViewSwitchProps {
  currentView: ViewMode;
  onChange: (mode: ViewMode) => void;
  size?: "default" | "large";
}

export function ViewSwitch({ currentView, onChange, size = "default" }: ViewSwitchProps) {
  return (
    <div className="flex gap-2">
      <Button
        variant={currentView === "simple" ? "default" : "outline"}
        onClick={() => onChange("simple")}
        className={size === "large" ? "px-6 py-3 text-lg" : ""}
      >
        Simple View
      </Button>
      <Button
        variant={currentView === "detailed" ? "default" : "outline"}
        onClick={() => onChange("detailed")}
        className={size === "large" ? "px-6 py-3 text-lg" : ""}
      >
        Detailed View
      </Button>
    </div>
  );
}
