"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { MessageCircle, X } from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      duration: 0.3,
    },
  },
  exit: { opacity: 0, y: 10, transition: { duration: 0.2 } },
};

const textVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      delay: 0.1,
    },
  },
};

export const ChatbotWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const chatUrl: string =
    "https://cdn.botpress.cloud/webchat/v3.0/shareable.html?configUrl=https://files.bpcontent.cloud/2025/06/19/14/20250619141011-EC61UX4E.json";

  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const toggleChat = (): void => setIsOpen(!isOpen);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <motion.button
        onClick={toggleChat}
        className="flex items-center justify-center w-12 h-12 rounded-full bg-foreground text-background border border-border hover:bg-gray-700 transition-all duration-200"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? <X size={20} /> : <MessageCircle size={20} />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute bottom-16 right-0 w-80 h-[480px] rounded-lg overflow-hidden bg-background border border-border shadow-lg"
          >
            <div className="flex items-center justify-between p-2 bg-muted border-b border-border">
              <motion.h3
                variants={textVariants}
                className="text-sm font-semibold text-foreground"
              >
                AI Assistant
              </motion.h3>
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
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatbotWidget;