export default function Navbar({ mode, setMode, theme, setTheme, resetAI, activeSection }) {
  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  const handleLogoClick = () => {
    setMode("classic");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const links = [
    { href: "#about", id: "about", label: "About" },
    { href: "#experience", id: "experience", label: "Experience" },
    { href: "#projects", id: "projects", label: "Projects" },
    { href: "#services", id: "services", label: "Services" },
    { href: "#skills", id: "skills", label: "Skills" },
    { href: "#published-papers", id: "published-papers", label: "Papers" },
  ];

  return (
    <nav
      className="px-5 md:px-8 py-4 fixed w-full z-[9999] transition-all hairline-b"
      style={{
        backgroundColor: "color-mix(in srgb, var(--bg-primary) 78%, transparent)",
        backdropFilter: "blur(14px)",
      }}
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center transition-all">
        {/* Wordmark */}
        <div
          className="font-display text-xl font-semibold tracking-tight cursor-pointer select-none"
          onClick={handleLogoClick}
          style={{ color: "var(--text-primary)" }}
        >
          BM<span style={{ color: "var(--text-secondary)" }}>®</span>
        </div>

        {/* Navigation Links (Classic Mode) */}
        {mode === "classic" && (
          <ul className="hidden md:flex gap-7 font-mono-ui text-[11px] uppercase tracking-[0.18em]">
            {links.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  className="transition-colors duration-300"
                  style={{
                    color: activeSection === link.id ? "var(--text-primary)" : "var(--text-secondary)",
                    borderBottom: activeSection === link.id ? "1px solid var(--text-primary)" : "1px solid transparent",
                    paddingBottom: "2px",
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        )}

        {/* Controls */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* CV Download */}
          <a
            href="/cv.pdf"
            download="Budhaditya_Mukhopadhyay_CV.pdf"
            className="btn-solid hidden sm:inline-flex items-center px-4 py-1.5 text-[11px] font-mono-ui uppercase tracking-[0.15em]"
            title="Download CV (PDF)"
          >
            CV ↓
          </a>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full transition-colors hover:opacity-70"
            title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
            style={{ color: "var(--text-primary)" }}
          >
            {theme === "dark" ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
          </button>

          {/* Mode Toggle Group */}
          <div
            className="flex items-center rounded-full p-1 border font-mono-ui"
            style={{ borderColor: "var(--glass-border)", backgroundColor: "var(--glass-bg)" }}
          >
            {[
              { key: "ai", label: "AI", short: "AI" },
              { key: "classic", label: "Classic", short: "Cls" },
              { key: "dev", label: "Dev", short: "Dev" },
            ].map((m) => (
              <button
                key={m.key}
                onClick={() => setMode(m.key)}
                className="px-2 sm:px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all duration-300"
                style={
                  mode === m.key
                    ? { backgroundColor: "var(--accent)", color: "var(--bg-primary)" }
                    : { color: "var(--text-secondary)" }
                }
              >
                <span className="hidden sm:inline">{m.label}</span>
                <span className="sm:hidden">{m.short}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
