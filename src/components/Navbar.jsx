import { motion } from "framer-motion";

export default function Navbar({ mode, setMode, theme, setTheme, resetAI, activeSection }) {
  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");
  const toggleMode = () => setMode(mode === "ai" ? "classic" : "ai");

  const handleLogoClick = () => {
    setMode("classic");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav 
      className="p-4 md:p-6 fixed w-full z-[9999] transition-all"
      style={{
        backgroundColor: "var(--glass-bg)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--glass-border)",
      }}
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center transition-all">
        {/* BM Monogram Logo */}
        <div 
          className={`text-3xl font-bold cursor-pointer bg-clip-text text-transparent transition-all duration-300 ${
            theme === "dark" 
              ? "bg-gradient-to-r from-white to-blue-400" 
              : "bg-gradient-to-r from-blue-600 to-blue-300"
          }`}
          onClick={handleLogoClick}
        >
          BM
        </div>

        {/* Navigation Links (Visible only in Classic Mode) */}
        {mode === "classic" && (
          <ul className="hidden md:flex gap-8 transition-colors" style={{ color: "var(--text-secondary)" }}>
            <li>
              <a 
                href="#about" 
                className={`transition-all duration-300 border-b-2 ${
                  activeSection === "about" 
                    ? "text-blue-500 border-blue-500" 
                    : "hover:text-blue-500 border-transparent"
                }`}
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#experience"
                className={`transition-all duration-300 border-b-2 ${
                  activeSection === "experience"
                    ? "text-blue-500 border-blue-500"
                    : "hover:text-blue-500 border-transparent"
                }`}
              >
                Experience
              </a>
            </li>
            <li>
              <a
                href="#projects"
                className={`transition-all duration-300 border-b-2 ${
                  activeSection === "projects"
                    ? "text-blue-500 border-blue-500"
                    : "hover:text-blue-500 border-transparent"
                }`}
              >
                Projects
              </a>
            </li>
            <li>
              <a 
                href="#services" 
                className={`transition-all duration-300 border-b-2 ${
                  activeSection === "services" 
                    ? "text-blue-500 border-blue-500" 
                    : "hover:text-blue-500 border-transparent"
                }`}
              >
                Services
              </a>
            </li>
            <li>
              <a 
                href="#skills" 
                className={`transition-all duration-300 border-b-2 ${
                  activeSection === "skills" 
                    ? "text-blue-500 border-blue-500" 
                    : "hover:text-blue-500 border-transparent"
                }`}
              >
                Skills
              </a>
            </li>
            <li>
              <a 
                href="#published-papers" 
                className={`transition-all duration-300 border-b-2 ${
                  activeSection === "published-papers" 
                    ? "text-blue-500 border-blue-500" 
                    : "hover:text-blue-500 border-transparent"
                }`}
              >
                Papers
              </a>
            </li>
          </ul>
        )}

        {/* Toggles */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* CV Download */}
          <a
            href="/cv.pdf"
            download="Budhaditya_Mukhopadhyay_CV.pdf"
            className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold text-white shadow-md transition hover:scale-105 hover:shadow-[0_0_15px_var(--accent-glow)]"
            style={{ background: "var(--gradient-accent)" }}
            title="Download CV (PDF)"
          >
            CV ↓
          </a>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-800/20 transition-colors"
            title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
            style={{ color: "var(--text-primary)" }}
          >
            {theme === "dark" ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
          </button>

          {/* Mode Toggle Group */}
          <div className="flex items-center bg-black/20 backdrop-blur-md rounded-full p-1 border border-white/10">
            <button
              onClick={() => setMode("ai")}
              className={`px-2 sm:px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all duration-300 ${
                mode === "ai" ? "bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]" : "text-gray-400 hover:text-white"
              }`}
            >
              AI
            </button>
            <button
              onClick={() => setMode("classic")}
              className={`px-2 sm:px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all duration-300 ${
                mode === "classic" ? "bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]" : "text-gray-400 hover:text-white"
              }`}
            >
              <span className="hidden sm:inline">Classic</span>
              <span className="sm:hidden">Cls</span>
            </button>
            <button
              onClick={() => setMode("dev")}
              className={`px-2 sm:px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all duration-300 ${
                mode === "dev" ? "bg-green-600 text-white shadow-[0_0_20px_rgba(34,197,94,0.5)]" : "text-gray-400 hover:text-white"
              }`}
            >
              Dev
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}