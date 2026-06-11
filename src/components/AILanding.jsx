import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AIBackground from "./AIBackground";
import CurrentFocusCard from "./CurrentFocusCard";
import FloatingQuestions from "./FloatingQuestions";
import { streamChat } from "../utils/chat";

const suggestionChips = [
  { label: "About", query: "Who is Budhaditya?" },
  { label: "GenAI Projects", query: "What GenAI projects have you built?" },
  { label: "Expertise", query: "Tell me about your drone work." },
  { label: "Skills", query: "What is your tech stack?" },
  { label: "Papers", query: "What research have you published?" },
];

const TypingIndicator = () => (
  <div className="flex gap-1 items-center h-5 ml-1 inline-flex align-middle">
    {[0, 1, 2].map((i) => (
      <motion.div
        key={i}
        className="w-1.5 h-1.5 rounded-full bg-current opacity-60"
        animate={{ y: [0, -4, 0] }}
        transition={{
          duration: 0.6,
          repeat: Infinity,
          delay: i * 0.15,
        }}
      />
    ))}
  </div>
);



export default function AILanding({ theme, messages, setMessages, setMode, setIsEasterEgg, isEasterEgg }) {
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);
  const textboxRef = useRef(null);
  const sendingRef = useRef(false);
  const [isMorphing, setIsMorphing] = useState(false);
  const [detailLevel, setDetailLevel] = useState(3);
  const [isSliderHovered, setIsSliderHovered] = useState(false);

  const clickTimer = useRef(null);
  const handleProfileClick = (e) => {
    if (clickTimer.current) {
      clearTimeout(clickTimer.current);
      clickTimer.current = null;
      setMode("dev");
    } else {
      clickTimer.current = setTimeout(() => {
        clickTimer.current = null;
        startEasterEgg();
      }, 250);
    }
  };

  const startEasterEgg = () => {
    if (messages.length > 0) return;
    setIsMorphing(true);
    setIsEasterEgg(true);
    setTimeout(() => {
      setMode("classic");
      // Reset after transition finishes
      setTimeout(() => setIsEasterEgg(false), 500);
    }, 800);
  };

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);


  const handleSend = async (text) => {
    if (sendingRef.current) return;
    sendingRef.current = true;

    const query = text || input;
    if (!query.trim()) {
      sendingRef.current = false;
      return;
    }

    const userMessage = { role: "user", content: query };
    
    // FILTER: Ensure we don't send empty assistant placeholders from previous turns
    const currentMessages = [...messages.filter(m => m.content && m.content.trim() !== ""), userMessage];
    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);
    // LLM handles all matching with full context and custom detail level
    let aiResponse = "";
    
    // Add temporary AI message for streaming
    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

    try {
      for await (const chunk of streamChat(currentMessages, detailLevel)) {
        aiResponse += chunk;
        setMessages((prev) => {
          const updated = [...prev];
          const lastIdx = updated.length - 1;
          // IMMUTABLE UPDATE: Create a new object for the assistant message
          updated[lastIdx] = {
            ...updated[lastIdx],
            content: aiResponse,
            level: detailLevel
          };
          return updated;
        });
      }
    } catch (error) {
      console.error("Chat error:", error);
    } finally {
      setIsTyping(false);
      sendingRef.current = false;
    }
  };

  return (
    <div
      className={`relative w-full flex flex-col items-center justify-center overflow-x-hidden transition-colors ${
        messages.length === 0 ? "min-h-screen overflow-y-auto py-28 sm:py-32" : "h-screen overflow-hidden"
      }`}
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      <AIBackground theme={theme} />
      
      {/* Floating Back/Home Button */}
      <AnimatePresence>
        {messages.length > 0 && (
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.05)" }}
            onClick={() => setMessages([])}
            className="fixed top-24 left-6 z-[50] flex items-center gap-3 px-4 py-2 rounded-2xl border backdrop-blur-3xl shadow-2xl group transition-all"
            style={{ backgroundColor: "var(--glass-bg)", borderColor: "var(--glass-border)", color: "var(--text-primary)" }}
          >
            <div className="w-8 h-8 rounded-xl flex items-center justify-center transition-colors" style={{ backgroundColor: "var(--glass-bg)" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
            </div>
            <span className="text-[11px] font-black uppercase tracking-[0.2em]">Back</span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {messages.length === 0 && (
          <motion.div animate={{ opacity: isMorphing ? 0 : 1 }} transition={{ duration: 0.4 }} className="hidden sm:block">
            <FloatingQuestions 
              onQuestionClick={handleSend} 
              dropZoneRef={textboxRef}
              isEasterEgg={isEasterEgg}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-20 w-full max-w-4xl flex flex-col items-center px-4 sm:px-6">
        <AnimatePresence mode="wait">
          {messages.length === 0 ? (
            <motion.div
              key="greeting"
              initial={{ opacity: isEasterEgg ? 1 : 0, y: isEasterEgg ? 0 : 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: isEasterEgg ? 0 : 0.5 }}
              className="text-center mb-8 flex flex-col items-center relative"
            >
              <motion.h1 
                initial={{ opacity: isEasterEgg ? 1 : 0, y: isEasterEgg ? 0 : 30 }}
                animate={isMorphing ? {
                  y: -30,
                  scale: 1.05,
                  opacity: 1
                } : { opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: isMorphing ? 0.8 : (isEasterEgg ? 0 : 0.8), ease: "easeInOut" }}
                className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6 tracking-tight text-center" 
                style={{ color: "var(--text-primary)" }}
              >
                {isMorphing ? "Hi, I'm " : "Hello, I'm "}
                <span style={{ color: "var(--accent)" }}>Budhaditya{isMorphing ? " Mukhopadhyay" : ""}</span>
                {isMorphing ? "" : "."}
              </motion.h1>
              
              <motion.img
                src="/images/photo.png"
                alt="Budhaditya"
                onClick={handleProfileClick}
                initial={{ scale: isEasterEgg ? 1 : 0.8, opacity: isEasterEgg ? 1 : 0 }}
                animate={isMorphing ? {
                  scale: 2.8,
                  y: 40,
                  opacity: 1
                } : { 
                  scale: 1, 
                  opacity: 1,
                  y: [0, -10, 0]
                }}
                transition={isMorphing ? {
                  duration: 0.8, ease: "easeInOut"
                } : { 
                  scale: { duration: 0.5 },
                  opacity: { duration: 0.5 },
                  y: { repeat: Infinity, duration: 4, ease: "easeInOut" }
                }}
                className={`w-24 h-24 md:w-32 md:h-32 rounded-full object-cover mb-6 border-2 shadow-xl cursor-pointer hover:shadow-[0_0_20px_var(--accent-glow)] transition-shadow ${isMorphing ? 'z-50 pointer-events-none' : ''}`}
                style={{ borderColor: "var(--accent)" }}
              />

              <motion.p 
                animate={{ opacity: isMorphing ? 0 : 1 }}
                transition={{ duration: isEasterEgg ? 0 : 0.4 }}
                className="text-base sm:text-xl md:text-2xl font-medium transition-all duration-700" 
                style={{ color: "var(--text-secondary)", animationDelay: isMorphing ? "0s" : "0.4s" }}
              >
                Senior AI Engineer · GenAI &amp; Edge AI · Strategic Advisor
              </motion.p>
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              ref={scrollRef}
              className="w-full h-[55vh] sm:h-[60vh] overflow-y-auto mb-6 pr-2 custom-scrollbar"
            >
              <div className="flex flex-col gap-4">
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: msg.role === "user" ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`flex ${
                      msg.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div className="flex flex-col gap-1.5 max-w-[85%]">
                      {msg.role === "assistant" && msg.level && (
                        <div className="flex items-center gap-1.5 ml-1">
                          <div className="w-1 h-1 rounded-full" style={{ backgroundColor: "var(--accent)" }} />
                          <span className="text-[9px] font-black uppercase tracking-widest" style={{ color: "var(--text-secondary)" }}>
                            LVL:{msg.level}
                          </span>
                        </div>
                      )}
                      <div
                        className="p-4 rounded-2xl shadow-sm border backdrop-blur-md"
                        style={{
                          backgroundColor:
                            msg.role === "user" ? "var(--user-bubble-bg)" : "var(--ai-bubble-bg)",
                          color: msg.role === "user" ? "var(--bg-primary)" : "var(--text-primary)",
                          borderColor: msg.role === "assistant" ? "var(--glass-border)" : "transparent",
                          borderRadius: msg.role === "user" ? "1.25rem 0.25rem 1.25rem 1.25rem" : "0.25rem 1.25rem 1.25rem 1.25rem"
                        }}
                      >
                        <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                        {isTyping && i === messages.length - 1 && msg.role === "assistant" && (
                          <TypingIndicator />
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="w-full flex flex-col gap-4">
          {messages.length === 0 && (
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1, delayChildren: 0.6 }
                }
              }}
              className="flex flex-wrap justify-center gap-3"
            >
              {suggestionChips.map((chip, i) => (
                <motion.button
                  key={i}
                  variants={{
                    hidden: { opacity: 0, scale: 0.9, y: 10 },
                    visible: { opacity: 1, scale: 1, y: 0 }
                  }}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => handleSend(chip.query)}
                  className="px-4 py-2 rounded-full border backdrop-blur hover:opacity-80 transition-all text-sm font-medium"
                  style={{ backgroundColor: "var(--glass-bg)", borderColor: "var(--glass-border)", color: "var(--text-primary)" }}
                >
                  {chip.label}
                </motion.button>
              ))}
            </motion.div>
          )}

          <motion.div 
            ref={textboxRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="relative w-full group"
          >
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Ask anything about me"
              className={`w-full backdrop-blur border transition-all rounded-2xl p-4 pr-16 outline-none resize-none h-14 sm:h-16 md:h-20 shadow-[0_0_15px_rgba(0,0,0,0.1)] ${
                isTyping ? "opacity-50 pointer-events-none" : "hover:border-[var(--accent-2)] focus:border-[var(--accent)] focus:shadow-[0_0_20px_var(--accent-glow)]"
              }`}
              style={{
                backgroundColor: "var(--glass-bg)",
                borderColor: "var(--glass-border)",
                color: "var(--text-primary)",
              }}
            />
            <button
              onClick={() => handleSend()}
              className="absolute right-3 top-3 p-3 rounded-xl hover:opacity-90 transition-all shadow-lg overflow-hidden group/btn"
              style={{ 
                backgroundColor: "var(--accent)",
                filter: "drop-shadow(0 0 8px var(--accent-glow))"
              }}
            >
              <div className="absolute inset-0 bg-black/10 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-500" />
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--bg-primary)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="relative z-10"
              >
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>

            {/* Permanent Slim AI Detail Slider - Moved below input */}
            <motion.div 
              className="mt-6 px-1 group/slider relative"
              onHoverStart={() => setIsSliderHovered(true)}
              onHoverEnd={() => setIsSliderHovered(false)}
            >
              <AnimatePresence>
                {isSliderHovered && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    className="absolute inset-x-0 top-[40px] flex justify-center pointer-events-none z-50"
                  >
                    <div className="relative bg-black/30 backdrop-blur-3xl border border-white/10 px-6 py-2 rounded-2xl shadow-[0_15px_30px_-5px_rgba(0,0,0,0.5)] transition-all">
                      <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-black/30 border-t border-l border-white/10 rotate-45" />
                      <span className="text-[10px] font-black uppercase tracking-[0.25em] text-white/80 whitespace-nowrap">
                        Change the depth as per your liking
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="relative flex items-center h-4 cursor-pointer">
                {/* Slim Track */}
                <div className="absolute w-full h-1.5 bg-black/40 rounded-full border border-white/5 overflow-hidden shadow-inner">
                  <motion.div
                    className="h-full"
                    style={{ background: "var(--gradient-accent)" }}
                    animate={{ width: `${(detailLevel - 1) * 25}%` }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                  />
                </div>
                
                <input 
                  type="range" min="1" max="5" step="1"
                  value={detailLevel} 
                  onChange={(e) => {
                    setDetailLevel(parseInt(e.target.value));
                  }}
                  className="absolute w-full h-full opacity-0 cursor-pointer z-10"
                />

                {/* Minimalist Thumb */}
                <motion.div
                  className="absolute w-4 h-4 rounded-full shadow-lg border-2 pointer-events-none"
                  style={{ backgroundColor: "var(--accent)", borderColor: "var(--bg-primary)" }}
                  animate={{ left: `calc(${(detailLevel - 1) * 25}% - 8px)` }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              </div>

              {/* Slider Labels */}
              <div className="flex justify-between mt-2 px-1">
                <div className="flex flex-col items-center">
                  <span className="text-[9px] font-black uppercase tracking-widest transition-colors duration-300" style={{ color: detailLevel === 1 ? "var(--text-primary)" : "var(--text-secondary)" }}>Simple</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black italic" style={{ color: "var(--text-secondary)" }}>LVL</span>
                  <span className="text-sm font-black font-mono" style={{ color: "var(--text-primary)" }}>{detailLevel}</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-[9px] font-black uppercase tracking-widest transition-colors duration-300" style={{ color: detailLevel === 5 ? "var(--text-primary)" : "var(--text-secondary)" }}>Detailed</span>
                </div>
              </div>
            </motion.div>

            {messages.length === 0 && <CurrentFocusCard />}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
