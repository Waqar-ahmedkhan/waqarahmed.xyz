import { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion"; // Correct import for Variants
import { MessageCircle, X } from "lucide-react";

// Define animation variants with proper Typescript types
const containerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      type: "spring",
      stiffness: 80,
      damping: 12,
      duration: 0.4
    }
  },
  exit: { opacity: 0, y: 20, transition: { duration: 0.3 } }
};

const textVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      type: "spring",
      stiffness: 90,
      damping: 10,
      delay: 0.1
    }
  }
};

const ChatbotWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const chatUrl: string = "https://cdn.botpress.cloud/webchat/v3.0/shareable.html?configUrl=https://files.bpcontent.cloud/2025/06/19/14/20250619141011-EC61UX4E.json";

  useEffect(() => {
    // Auto-open chatbot with a 1-second delay
    const timer = setTimeout(() => setIsOpen(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const toggleChat = (): void => setIsOpen(!isOpen);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <motion.button
        onClick={toggleChat}
        className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 text-white shadow-md hover:shadow-lg hover:scale-110 transition-all duration-200"
        whileHover={{ rotate: 360, transition: { duration: 1 } }}
        whileTap={{ scale: 0.95 }}
        animate={{ scale: [1, 1.03, 1], transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" } }}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute bottom-20 right-0 w-80 h-[520px] sm:w-96 rounded-xl overflow-hidden bg-gray-900/80 backdrop-blur-md border border-cyan-400/30 shadow-lg"
          >
            <div className="flex items-center justify-between p-3 bg-gradient-to-r from-cyan-500/70 to-purple-600/70 text-white">
              <motion.h3
                variants={textVariants}
                className="text-sm font-bold tracking-wide"
              >
                Waqar’s AI Assistant
              </motion.h3>
              <button
                onClick={toggleChat}
                className="p-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200"
                aria-label="Close chat"
              >
                <X size={16} />
              </button>
            </div>
            <iframe
              src={chatUrl}
              title="Waqar Ahmed Chatbot"
              className="w-full h-[calc(100%-48px)] border-0"
              style={{ background: "linear-gradient(135deg, #1e293b, #2d3748)" }}
              allow="microphone; camera"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatbotWidget;