"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import {
  X,
  MessageSquare,
  Send,
  Bot,
  User,
  ChevronDown,
  Maximize2,
  Minimize2,
  Sparkles
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { faqMap, FAQItem } from '@/constants/faq-data';
import { cn } from '@/lib/utils';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const AnimatedBotIcon = ({ className, isStatic = false }: { className?: string, isStatic?: boolean }) => {
  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      <motion.svg
        viewBox="0 0 100 100"
        className="w-full h-full drop-shadow-[0_0_15px_rgba(255,69,0,0.5)]"
        initial="initial"
        animate="animate"
      >
        {/* Antenna */}
        <motion.rect
          x="48" y="10" width="4" height="15" rx="2"
          fill="currentColor"
          stroke="rgba(0,0,0,0.3)"
          strokeWidth="1"
          animate={isStatic ? {} : {
            rotate: [0, -15, 15, 0],
            originX: "50%",
            originY: "25px"
          }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
        />
        <motion.circle
          cx="50" cy="10" r="5"
          fill="currentColor"
          stroke="rgba(0,0,0,0.3)"
          strokeWidth="1"
          animate={isStatic ? {} : {
            scale: [1, 1.3, 1],
            opacity: [0.6, 1, 0.6]
          }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        />

        {/* Headphones/Ears */}
        <rect x="15" y="45" width="10" height="25" rx="5" fill="currentColor" opacity="0.8" stroke="rgba(0,0,0,0.3)" strokeWidth="1" />
        <rect x="75" y="45" width="10" height="25" rx="5" fill="currentColor" opacity="0.8" stroke="rgba(0,0,0,0.3)" strokeWidth="1" />

        {/* Head */}
        <motion.rect
          x="20" y="30" width="60" height="50" rx="22"
          fill="currentColor"
          stroke="rgba(0,0,0,0.4)"
          strokeWidth="2"
          animate={isStatic ? {} : {
            y: [0, -4, 0]
          }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        />

        {/* Eye Screen Overlay */}
        <motion.rect
          x="28" y="42" width="44" height="25" rx="10"
          fill="rgba(0,0,0,0.15)"
          animate={isStatic ? {} : {
            y: [0, -4, 0]
          }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        />

        {/* Eyes */}
        <motion.ellipse
          cx="40" cy="54" rx="4" ry="6"
          fill="white"
          animate={isStatic ? {} : {
            scaleY: [1, 0.1, 1],
            y: [0, -4, 0]
          }}
          transition={{
            scaleY: { repeat: Infinity, duration: 4, times: [0, 0.95, 1], delay: 2 },
            y: { repeat: Infinity, duration: 4, ease: "easeInOut" }
          }}
        />
        <motion.ellipse
          cx="60" cy="54" rx="4" ry="6"
          fill="white"
          animate={isStatic ? {} : {
            scaleY: [1, 0.1, 1],
            y: [0, -4, 0]
          }}
          transition={{
            scaleY: { repeat: Infinity, duration: 4, times: [0, 0.95, 1], delay: 2 },
            y: { repeat: Infinity, duration: 4, ease: "easeInOut" }
          }}
        />
      </motion.svg>
    </div>
  );
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullPage, setIsFullPage] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hi! I\'m **HekaBot**, your AI guide to HekaHub. How can I help you today? You can ask about our bootcamps, pricing, or age requirements!' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'auto' });
  }, [messages, isLoading]);

  const matchFAQ = (input: string) => {
    const normalized = input.toLowerCase();
    return faqMap.find((item) =>
      item.keywords.some((keyword) =>
        normalized.includes(keyword.toLowerCase())
      )
    );
  };

  const sendMessage = (text?: string) => {
    const messageToSend = text || input;
    if (!messageToSend.trim()) return;

    setMessages((prev) => [...prev, { role: 'user', content: messageToSend }]);
    if (!text) setInput('');
    setIsLoading(true);

    const matchedFAQ = matchFAQ(messageToSend);

    setTimeout(() => {
      setIsLoading(false);
      if (matchedFAQ) {
        setMessages((prev) => [...prev, { role: 'assistant', content: matchedFAQ.answer }]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: "I couldn't find a specific answer for that. Try asking about our **bootcamps**, **pricing**, or **prerequisites**! Or you can contact our team directly."
          }
        ]);
      }
    }, 600);
  };

  const handleTagClick = (item: FAQItem) => {
    sendMessage(item.question);
  };

  const [isOverOrange, setIsOverOrange] = useState(false);

  // Dynamic Background Detection (Shows circle ONLY on orange sections)
  useEffect(() => {
    const checkBackground = () => {
      if (!isOpen) {
        const x = window.innerWidth - 60;
        const y = window.innerHeight - 60;
        const element = document.elementFromPoint(x, y);
        if (element) {
          const bg = window.getComputedStyle(element).backgroundColor;
          const isOrange = bg.includes('255, 69, 0') || bg.includes('rgb(255, 106, 0)');
          setIsOverOrange(isOrange);
        }
      } else {
        setIsOverOrange(false);
      }
    };

    window.addEventListener('scroll', checkBackground, { passive: true });
    checkBackground(); // Initial check
    return () => window.removeEventListener('scroll', checkBackground);
  }, [isOpen]);

  const cloudVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.5,
      y: 100,
      filter: 'blur(20px)'
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 20
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      filter: 'blur(10px)',
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end pointer-events-none">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={cloudVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={cn(
              "bg-[#0a0a0a] border border-[#ff4500]/20 rounded-3xl shadow-2xl overflow-hidden flex flex-col pointer-events-auto",
              isFullPage
                ? "fixed inset-4 md:inset-10 z-[10000]"
                : "w-[90vw] sm:w-[400px] h-[650px] mb-4 origin-bottom-right"
            )}
          >
            {/* Header */}
            <div className="p-4 border-b border-white/5 bg-gradient-to-r from-[#ff4500]/10 to-transparent flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 flex items-center justify-center relative">
                  <AnimatedBotIcon className="w-12 h-12 text-[#ff4500] relative z-10 drop-shadow-[0_0_5px_rgba(255,69,0,0.3)]" isStatic />
                </div>
                <div className="flex flex-col justify-center">
                  <h3 className="text-white font-bebas text-xl tracking-wider m-0 leading-none mb-1">HekaBot</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] text-emerald-500 uppercase font-bold tracking-widest">Online</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsFullPage(!isFullPage)}
                  className="p-2 text-zinc-500 hover:text-white transition-colors"
                >
                  {isFullPage ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-zinc-500 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Tags area */}
            <div className={cn(
              "p-3 bg-white/5 border-b border-white/5 flex flex-wrap gap-2 overflow-hidden",
              !isFullPage ? "max-h-[122px]" : ""
            )}>
              {faqMap.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleTagClick(item)}
                  className="whitespace-nowrap px-3 py-1.5 rounded-full bg-zinc-900 border border-white/10 text-xs text-zinc-300 hover:border-[#ff4500]/50 hover:text-[#ff4500] transition-all"
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Chat Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
              {messages.map((msg, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  key={i}
                  className={cn(
                    "flex w-full",
                    msg.role === 'user' ? "justify-end" : "justify-start"
                  )}
                >
                  <div className={cn(
                    "flex gap-3 max-w-[85%]",
                    msg.role === 'user' ? "flex-row-reverse" : "flex-row"
                  )}>
                    <div className={cn(
                      "w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-1",
                      msg.role === 'user' ? "bg-white/10" : "bg-[#ff4500]/10"
                    )}>
                      {msg.role === 'user' ? (
                        <User size={16} className="text-zinc-400" />
                      ) : (
                        <AnimatedBotIcon className="w-6 h-6 text-[#ff4500]" isStatic />
                      )}
                    </div>
                    <div className={cn(
                      "px-4 py-3 rounded-2xl text-sm leading-relaxed",
                      msg.role === 'user'
                        ? "bg-[#ff4500] text-white rounded-tr-none"
                        : "bg-zinc-900 text-zinc-200 border border-white/5 rounded-tl-none"
                    )}>
                      <div className="prose prose-invert prose-sm max-w-none">
                        <ReactMarkdown>
                          {msg.content}
                        </ReactMarkdown>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex gap-3 max-w-[85%]">
                    <div className="w-8 h-8 rounded-xl bg-[#ff4500]/10 flex items-center justify-center shrink-0 p-1">
                      <AnimatedBotIcon className="text-[#ff4500]" />
                    </div>
                    <div className="bg-zinc-900 px-4 py-3 rounded-2xl rounded-tl-none flex gap-1">
                      <span className="w-1.5 h-1.5 bg-zinc-600 rounded-full animate-bounce [animation-delay:-0.3s]" />
                      <span className="w-1.5 h-1.5 bg-zinc-600 rounded-full animate-bounce [animation-delay:-0.15s]" />
                      <span className="w-1.5 h-1.5 bg-zinc-600 rounded-full animate-bounce" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <div className="p-4 border-t border-white/5 bg-black">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Ask me anything..."
                  className="w-full bg-zinc-900 border border-white/10 rounded-2xl py-3 pl-4 pr-12 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#ff4500]/50 transition-all"
                />
                <button
                  onClick={() => sendMessage()}
                  className="absolute right-2 p-2 rounded-xl bg-[#ff4500] text-white hover:scale-105 active:scale-95 transition-all shadow-lg shadow-[#ff4500]/20"
                >
                  <Send size={18} />
                </button>
              </div>
              <p className="text-[10px] text-zinc-600 mt-2 text-center">Powered by HekaHub Intelligence</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        whileHover="hover"
        initial="initial"
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="pointer-events-auto w-32 h-32 flex items-center justify-center transition-all relative group"
      >
        {/* CTA Tooltip Cloud */}
        {!isOpen && (
          <motion.div
            variants={{
              initial: { opacity: 0, x: 20, scale: 0.6, filter: 'blur(10px)' },
              hover: { opacity: 1, x: 0, scale: 1, filter: 'blur(0px)' }
            }}
            className="absolute right-full mr-2 bg-white text-black px-5 py-3 rounded-[20px] rounded-br-none whitespace-nowrap text-[13px] font-bold shadow-2xl pointer-events-none"
          >
            Have a question? Click Me!
            <div className="absolute bottom-0 -right-2 w-4 h-4 bg-white [clip-path:polygon(0_0,0_100%,100%_100%)]" />
          </motion.div>
        )}

        {/* Dynamic Enclosed Circle - ONLY visible on orange sections */}
        <AnimatePresence>
          {isOverOrange && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute inset-2 bg-black/90 backdrop-blur-xl rounded-[40px] border border-white/10 shadow-2xl"
            />
          )}
        </AnimatePresence>

        <div className="absolute inset-0 rounded-full bg-[#ff4500]/10 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity" />
        {isOpen ? (
          <ChevronDown size={44} className="relative z-10 text-zinc-400 hover:text-white transition-colors" />
        ) : (
          <motion.div
            variants={{
              initial: { scale: 1 },
              hover: { scale: 1.1 }
            }}
            className="relative z-10"
          >
            <AnimatedBotIcon className="w-24 h-24 text-[#ff4500]" />
          </motion.div>
        )}
      </motion.button>
    </div>
  );
};

export default Chatbot;
