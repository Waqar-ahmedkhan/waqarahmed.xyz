"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useState, useSyncExternalStore, type ReactNode } from "react";
import { ViewSwitch, type ViewMode } from "@/components/view-switch";

const VIEW_MODE_STORAGE_KEY = "portfolioViewMode";
const VIEW_MODE_CHANGE_EVENT = "portfolio-view-mode-change";
const DEFAULT_VIEW_MODE: ViewMode = "detailed";

const ChatbotWidget = dynamic(
  () => import("@/components/ChatbotWidget").then((m) => m.ChatbotWidget),
  { ssr: false, loading: () => null }
);

const getStoredViewMode = (): ViewMode => {
  try {
    const savedViewMode = localStorage.getItem(VIEW_MODE_STORAGE_KEY);
    return savedViewMode === "simple" || savedViewMode === "detailed" ? savedViewMode : DEFAULT_VIEW_MODE;
  } catch {
    return DEFAULT_VIEW_MODE;
  }
};

const subscribeToViewMode = (onStoreChange: () => void) => {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(VIEW_MODE_CHANGE_EVENT, onStoreChange);

  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(VIEW_MODE_CHANGE_EVENT, onStoreChange);
  };
};

interface PortfolioViewShellProps {
  simple: ReactNode;
  detailed: ReactNode;
}

export function PortfolioViewShell({
  simple,
  detailed,
}: PortfolioViewShellProps) {
  const viewMode = useSyncExternalStore(subscribeToViewMode, getStoredViewMode, () => DEFAULT_VIEW_MODE);
  const [showChatbot, setShowChatbot] = useState(false);

  useEffect(() => {
    if (viewMode !== "detailed") {
      return;
    }

    const loadChatbot = () => setShowChatbot(true);
    const requestIdle = window.requestIdleCallback;
    const cancelIdle = window.cancelIdleCallback;

    if (typeof requestIdle === "function") {
      const idleId = requestIdle(loadChatbot, { timeout: 3500 });
      return () => cancelIdle?.(idleId);
    }

    const timeoutId = globalThis.setTimeout(loadChatbot, 2500);
    return () => {
      globalThis.clearTimeout(timeoutId);
    };
  }, [viewMode]);

  const handleViewModeChange = useCallback((mode: ViewMode) => {
    setShowChatbot(false);

    try {
      localStorage.setItem(VIEW_MODE_STORAGE_KEY, mode);
      window.dispatchEvent(new Event(VIEW_MODE_CHANGE_EVENT));
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("Failed to save view mode to localStorage:", error);
      }
    }
  }, []);

  if (viewMode === "simple") {
    return (
      <div>
        {simple}
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 sm:bottom-8 md:bottom-10">
          <ViewSwitch
            currentView={viewMode}
            onChange={handleViewModeChange}
            aria-label="Switch portfolio view mode"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-transparent">
      <main className="relative mx-auto min-h-screen scroll-my-12 overflow-auto py-8 pb-28 sm:py-10 md:py-12 print:p-12">
        {detailed}

        <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 sm:bottom-6 md:bottom-8">
          <ViewSwitch
            currentView={viewMode}
            onChange={handleViewModeChange}
            aria-label="Switch portfolio view mode"
          />
        </div>

        {showChatbot ? <ChatbotWidget /> : null}
      </main>
    </div>
  );
}
