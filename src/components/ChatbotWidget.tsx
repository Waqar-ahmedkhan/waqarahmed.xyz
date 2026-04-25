"use client";

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";

export const ChatbotWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const chatUrl: string =
    "https://cdn.botpress.cloud/webchat/v3.0/shareable.html?configUrl=https://files.bpcontent.cloud/2025/06/19/14/20250619141011-EC61UX4E.json";

  const toggleChat = (): void => setIsOpen(!isOpen);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={toggleChat}
        className="flex items-center justify-center w-11 h-11 rounded-full bg-foreground text-background border border-border/80 hover:bg-foreground/85 transition-colors duration-200"
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? <X size={20} /> : <MessageCircle size={20} />}
      </button>

      {isOpen ? (
        <div className="absolute bottom-14 right-0 h-[480px] w-[calc(100vw-2rem)] max-w-80 overflow-hidden rounded-lg border border-border/80 bg-background shadow-sm animate-fade-in-up">
          <div className="flex items-center justify-between p-2 bg-muted border-b border-border">
            <h3 className="text-sm font-semibold text-foreground">AI Assistant</h3>
            <button
              onClick={toggleChat}
              className="p-1 rounded-full hover:bg-muted-foreground/10 transition-colors duration-200"
              aria-label="Close chat"
            >
              <X size={16} />
            </button>
          </div>
          <iframe
            src={chatUrl}
            title="AI Chatbot"
            className="w-full h-[calc(100%-40px)] border-0"
            style={{ background: "transparent" }}
            allow="microphone; camera"
            loading="lazy"
          />
        </div>
      ) : null}
    </div>
  );
};

export default ChatbotWidget;
