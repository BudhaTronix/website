
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import PublishedPapers from "./components/PublishedPapers";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import AILanding from "./components/AILanding";
import DevTerminal from "./components/DevTerminal";

function MobileAIPopup({ onDismiss }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="fixed bottom-6 left-4 right-4 z-[99999] mx-auto max-w-sm"
    >
      <div
        className="relative rounded-2xl px-5 py-4 shadow-2xl border backdrop-blur-xl"
        style={{
          backgroundColor: "var(--bg-secondary)",
          borderColor: "var(--accent)",
          color: "var(--text-primary)",
          boxShadow: "0 0 30px var(--accent-glow)",
        }}
      >
        <div className="flex items-start gap-3">
          <div
            className="mt-0.5 shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white text-base"
            style={{ backgroundColor: "var(--accent)" }}
          >
            ✨
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold mb-0.5" style={{ color: "var(--accent)" }}>
              Better on a bigger screen
            </p>
            <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              The AI chat experience shines on desktop. You can still use it here, but a larger screen unlocks the full view!
            </p>
          </div>
          <button
            onClick={onDismiss}
            className="shrink-0 ml-1 p-1 rounded-lg hover:bg-white/10 transition-colors"
            style={{ color: "var(--text-secondary)" }}
            aria-label="Dismiss"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function ClassicContent({ theme, activeSection, setActiveSection, setMode, setIsEasterEgg, isEasterEgg }) {
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0
    };

    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    const sections = ["hero", "about", "projects", "skills", "published-papers", "services"];
    
    // Give it a small tick to ensure DOM is ready
    const timer = setTimeout(() => {
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <Hero theme={theme} setMode={setMode} setIsEasterEgg={setIsEasterEgg} isEasterEgg={isEasterEgg} />
      <About theme={theme} />
      <Projects theme={theme} />
      <Contact theme={theme} />
      <Skills theme={theme} />
      <PublishedPapers theme={theme} />
      <Footer theme={theme} />
    </>
  );
}

function App() {
  const [mode, setMode] = useState("ai"); // 'ai' or 'classic'
  const [theme, setTheme] = useState("light"); // 'dark' or 'light'
  const [messages, setMessages] = useState([]);
  const [activeSection, setActiveSection] = useState("hero");
  const [isEasterEgg, setIsEasterEgg] = useState(false);
  const [showMobilePopup, setShowMobilePopup] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Show mobile popup once per session when in AI mode on a small screen
  useEffect(() => {
    if (mode === "ai") {
      const dismissed = sessionStorage.getItem("aiMobilePopupDismissed");
      if (!dismissed && window.innerWidth < 768) {
        const timer = setTimeout(() => setShowMobilePopup(true), 1200);
        return () => clearTimeout(timer);
      }
    } else {
      setShowMobilePopup(false);
    }
  }, [mode]);

  const dismissMobilePopup = () => {
    setShowMobilePopup(false);
    sessionStorage.setItem("aiMobilePopupDismissed", "1");
  };

  const resetAI = () => {
    setMessages([]);
  };

  return (
    <div className="min-h-screen transition-colors duration-300">
      <Navbar 
        mode={mode} 
        setMode={setMode} 
        theme={theme} 
        setTheme={setTheme} 
        resetAI={resetAI} 
        activeSection={activeSection}
      />
      
      <AnimatePresence>
        {mode === "ai" && showMobilePopup && (
          <MobileAIPopup key="mobile-popup" onDismiss={dismissMobilePopup} />
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {mode === "ai" ? (
          <motion.div
            key="ai"
            initial={{ opacity: isEasterEgg ? 1 : 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, position: "absolute", top: 0, left: 0, right: 0, zIndex: 0 }}
            transition={{ duration: isEasterEgg ? 0 : 0.5 }}
            className="w-full h-full"
          >
            <AILanding 
              theme={theme} 
              messages={messages} 
              setMessages={setMessages} 
              setMode={setMode}
              setIsEasterEgg={setIsEasterEgg}
              isEasterEgg={isEasterEgg}
            />
          </motion.div>
        ) : mode === "classic" ? (
          <motion.div
            key="classic"
            initial={{ opacity: isEasterEgg ? 1 : 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, position: "absolute", top: 0, left: 0, right: 0, zIndex: 0 }}
            transition={{ duration: isEasterEgg ? 0 : 0.5 }}
            className="w-full relative"
          >
            <ClassicContent 
              theme={theme} 
              activeSection={activeSection} 
              setActiveSection={setActiveSection} 
              setMode={setMode}
              setIsEasterEgg={setIsEasterEgg}
              isEasterEgg={isEasterEgg}
            />
          </motion.div>
        ) : (
          <motion.div
            key="dev"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full h-screen"
          >
            <DevTerminal 
              theme={theme} 
              setTheme={setTheme} 
              setMode={setMode} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;