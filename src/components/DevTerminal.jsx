import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import knowledge from "../data/knowledge.json";

const ASCII_LOGO = `
 ████████╗  ███╗   ███╗
 ██╔════██╗ ████╗ ████║
 ██║    ██║ ██╔████╔██║
 ██║    ██║ ██║╚██╔╝██║
 ████████╔╝ ██║ ╚═╝ ██║
 ██╔════██╗ ██║     ██║
 ██║    ██║ ██║     ██║
 ██║    ██║ ██║     ██║
 ████████╔╝ ██║     ██║
 ╚═══════╝  ╚═╝     ╚═╝
`;

const ASCII_ART = `
 ██████╗  ██╗   ██╗ ██████╗  ██╗  ██╗  █████╗  ██████╗  ██╗ ████████╗ ██╗   ██╗  █████╗ 
 ██╔══██╗ ██║   ██║ ██╔══██╗ ██║  ██║ ██╔══██╗ ██╔══██╗ ██║ ╚══██╔══╝ ╚██╗ ██╔╝ ██╔══██╗
 ██████╔╝ ██║   ██║ ██║  ██║ ███████║ ███████║ ██║  ██║ ██║    ██║     ╚████╔╝  ███████║
 ██╔══██╗ ██║   ██║ ██║  ██║ ██╔══██║ ██╔══██║ ██║  ██║ ██║    ██║      ╚██╔╝   ██╔══██║
 ██████╔╝ ╚██████╔╝ ██████╔╝ ██║  ██║ ██║  ██║ ██████╔╝ ██║    ██║       ██║    ██║  ██║
 ╚═════╝   ╚═════╝  ╚═════╝  ╚═╝  ╚═╝ ╚═╝  ╚═╝ ╚═════╝  ╚═╝    ╚═╝       ╚═╝    ╚═╝  ╚═╝
`;

const TAGLINE = " Budhaditya's Terminal\n For the developers, by a developer.";

export default function DevTerminal({ theme, setTheme, setMode }) {
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [textColor, setTextColor] = useState("white");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [displayedAscii, setDisplayedAscii] = useState("");
  const [isTypingHeader, setIsTypingHeader] = useState(true);
  const [terminalType, setTerminalType] = useState('cmd');

  const terminalRef = useRef(null);
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  // Typewriter effect for ASCII art
  useEffect(() => {
    let i = 0;
    const fullText = ASCII_ART;
    const interval = setInterval(() => {
      i += 10; // Type 10 characters at a time for snappiness
      setDisplayedAscii(fullText.slice(0, i));
      if (i >= fullText.length) {
        clearInterval(interval);
        setTimeout(() => setIsTypingHeader(false), 200);
      }
    }, 15); // Snappy interval
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history, displayedAscii]);

  // Sync fullscreen state
  useEffect(() => {
    const handleFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handleFsChange);
    return () => document.removeEventListener("fullscreenchange", handleFsChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  const handleCommand = (e) => {
    if (e.key === "Enter") {
      const trimmedInput = input.trim();
      if (!trimmedInput) return;

      const newHistory = [...history, { type: "input", content: `visitor@budha.me:~$ ${trimmedInput}` }];
      setCmdHistory([trimmedInput, ...cmdHistory]);
      setHistoryIdx(-1);
      setInput("");

      processCommand(trimmedInput, newHistory);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length > 0) {
        const nextIdx = Math.min(historyIdx + 1, cmdHistory.length - 1);
        setHistoryIdx(nextIdx);
        setInput(cmdHistory[nextIdx]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIdx > 0) {
        const nextIdx = historyIdx - 1;
        setHistoryIdx(nextIdx);
        setInput(cmdHistory[nextIdx]);
      } else {
        setHistoryIdx(-1);
        setInput("");
      }
    }
  };

  const processCommand = (cmdStr, currentHistory) => {
    const cleanCmd = cmdStr.toLowerCase().trim();

    if (cleanCmd === "clear") {
      setHistory([]);
      return;
    }

    if (cleanCmd === "help" || cleanCmd === "?" || cleanCmd === "budha --help") {
      addOutput(getHelpText(), currentHistory);
      return;
    }

    // Improved Parser
    if (!cleanCmd.startsWith("budha ")) {
      addOutput(`budha: command not found: ${cmdStr}`, currentHistory);
      return;
    }

    const commandLine = cleanCmd.replace("budha ", "").trim();
    if (!commandLine.startsWith("--")) {
      addOutput(`budha: '${commandLine}' is not a recognized command flag. Use 'budha --help' to see available flags.`, currentHistory);
      return;
    }

    const parts = commandLine.split("--").filter(p => p.trim());
    const commandName = parts[0].trim();
    const flags = parts.slice(1).map(f => f.trim());

    const verbosity = flags.includes("oneline") ? "oneline" : flags.includes("detailed") ? "detailed" : "medium";

    const result = getCommandOutput(commandName, verbosity);
    addOutput(result, currentHistory);
  };

  const addOutput = (content, currentHistory) => {
    setHistory([...currentHistory, { type: "output", content }]);
  };

  const getHelpText = () => {
    return `Available commands:
  budha --about        budha --education    budha --experience
  budha --current      budha --skills       budha --hobbies
  budha --research     budha --contact      clear
  help                 ?

Flags:
  --oneline            Brief summary
  --medium             Standard view (default)
  --detailed           Full details with descriptions

Example: budha --experience --oneline`;
  };

  const getCommandOutput = (cmd, verbosity) => {
    switch (cmd) {
      case "about":
        if (verbosity === "oneline") return knowledge.identity.tagline;
        if (verbosity === "detailed") {
          return `NAME: ${knowledge.identity.full_name}\nTITLE: ${knowledge.identity.title}\nTAGLINE: ${knowledge.identity.tagline}\n\nBIO: ${knowledge.identity.bio}\n\nLOCATION: ${knowledge.contact.location}`;
        }
        return knowledge.identity.bio;

      case "education":
        return knowledge.education.map(edu => {
          if (verbosity === "oneline") return `${edu.degree} @ ${edu.institution}`;
          if (verbosity === "detailed") {
            let details = `${edu.degree}\n${edu.institution} (${edu.period})`;
            if (edu.grade) details += `\nGrade: ${edu.grade}`;
            if (edu.location) details += `\nLocation: ${edu.location}`;
            if (edu.skills) details += `\nCore focus: ${edu.skills.join(", ")}`;
            if (edu.achievements) details += `\nAchievements:\n${edu.achievements.map(a => `  - ${a}`).join("\n")}`;
            return details;
          }
          return `${edu.degree} - ${edu.institution} (${edu.period})`;
        }).join("\n\n" + "-".repeat(40) + "\n\n");

      case "experience":
        return knowledge.experience.map(exp => {
          const roles = exp.roles.map(role => {
            if (verbosity === "oneline") return role.title;
            if (verbosity === "detailed") {
              let r = `${role.title.toUpperCase()} (${role.period})\n${"=".repeat(role.title.length)}\n${role.bullets.map(b => `• ${b}`).join("\n")}`;
              if (role.skills) r += `\n\nTECHNOLOGIES: ${role.skills.join(", ")}`;
              if (role.achievements) r += `\n\nACHIEVEMENTS:\n${role.achievements.map(a => `  * ${a}`).join("\n")}`;
              return r;
            }
            return `${role.title} (${role.period})`;
          }).join("\n\n");
          return `COMPANY: ${exp.company}${exp.location ? ` (${exp.location})` : ""}\n${roles}`;
        }).join("\n\n" + "=".repeat(60) + "\n\n");

      case "current":
        const current = knowledge.experience[0];
        const latestRole = current.roles[0];
        if (verbosity === "oneline") return `${latestRole.title} @ ${current.company}`;
        return `${latestRole.title} @ ${current.company} (${latestRole.period})\n${latestRole.bullets.map(b => `• ${b}`).join("\n")}`;

      case "skills":
        if (knowledge.skills_grouped) {
          if (verbosity === "oneline") return knowledge.skills_grouped.flatMap(g => g.items).join(", ");
          return knowledge.skills_grouped.map(g => `${g.group.toUpperCase()}\n${g.items.map(s => `  • ${s}`).join("\n")}`).join("\n\n");
        }
        const allSkills = [...new Set(knowledge.experience.flatMap(exp => exp.roles.flatMap(r => r.skills || [])))];
        if (verbosity === "oneline") return allSkills.join(", ");
        return allSkills.map(s => `• ${s}`).join("\n");

      case "hobbies":
        return knowledge.personal.hobbies.map(h => {
          if (verbosity === "oneline") return h.name;
          return `${h.name}: ${h.description}`;
        }).join("\n");

      case "research":
        return knowledge.research.map(r => {
          if (verbosity === "oneline") return r.title;
          return `${r.title}\nFocus: ${r.focus}\nApp: ${r.application}`;
        }).join("\n\n");

      case "contact":
        if (verbosity === "oneline") return `${knowledge.contact.email} | ${knowledge.contact.location}`;
        return `Email: ${knowledge.contact.email}\nLinkedIn: ${knowledge.contact.linkedin}\nGitHub: ${knowledge.contact.github}\nLocation: ${knowledge.contact.location}`;

      case "help": return getHelpText();
      case "budha": return getHelpText();
      default: return `budha: '--${cmd}' is not a recognized command flag. Use 'budha --help' to see all flags.`;
    }
  };

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-[10000] flex flex-col transition-colors duration-500 terminal-font border-t-4 ${theme === "dark" ? "bg-[#050505]" : "bg-[#f5f5f5]"
        }`}
      style={{
        backgroundColor: terminalType === 'ubuntu' && theme === 'dark' ? "#300a24" : (theme === "dark" ? "#050505" : "#f5f5f5"),
        color: textColor === "green" ? (terminalType === 'ubuntu' && theme === 'light' ? "#991b1b" : (theme === "dark" ? "#22c55e" : "#15803d")) : (theme === "dark" ? "#f3f4f6" : "#111827"),
        borderColor: textColor === "green" ? (theme === "dark" ? "#166534" : "#14532d") : (theme === "dark" ? "#374151" : "#d1d5db")
      }}
      onClick={() => inputRef.current?.focus()}
    >
      <div className="scanline" />

      {/* Terminal Top Bar */}
      <div className="relative flex items-center justify-between px-3 md:px-4 py-2 border-b border-white/5 bg-black/40 text-[10px] uppercase tracking-widest font-bold flex-wrap gap-y-1">
        <div className="flex items-center gap-3 md:gap-6">
          <button onClick={() => setMode("ai")} className="hover:opacity-80 transition-colors flex items-center gap-1">
            <span className="text-sm">←</span> BACK
          </button>
          <div className="flex items-center gap-3 md:gap-4">
            <button
              onClick={(e) => { e.stopPropagation(); setTheme(theme === 'dark' ? 'light' : 'dark'); }}
              className="hover:opacity-70 transition-opacity p-1"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === "dark" ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Center Text */}
        <div className="absolute left-1/2 -translate-x-1/2 font-black text-[10px] md:text-xs tracking-[0.3em] opacity-80 hidden sm:block">
          {terminalType === 'ubuntu' ? 'UBUNTU TERMINAL' : 'DEVELOPER MODE'}
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3 pr-2 border-r border-white/10">
            <button
              onClick={(e) => { e.stopPropagation(); setTerminalType(terminalType === 'cmd' ? 'ubuntu' : 'cmd'); }}
              className="hover:opacity-80 transition-all p-1"
              title={terminalType === 'cmd' ? 'Switch to Ubuntu Mode' : 'Switch to CMD Mode'}
            >
              {terminalType === 'cmd' ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#E95420">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2.2c.484 0 .937.067 1.365.187-.27.35-.415.79-.415 1.258 0 .58.232.868.232 1.487s.05 1.05.05 1.05a2.203 2.203 0 0 1-2.201 2.2c-.645 0-.986-.445-.986-.948 0-.46.066-.826.544-1.049.479-.224.532-.464.256-1.015-.276-.55-.383-.687-.824-.687-.441 0-.585.14-.85.687-.265.551-.237.791.241 1.015.478.223 1.076.589 1.076 1.049 0 .503-.047.948-.68.948a2.203 2.203 0 0 1-2.201-2.2s.013-.428.05-1.05.232-.907.232-1.487c0-.468-.145-.908-.415-1.258A9.799 9.799 0 0 1 12 2.2zm7.1 1.765a9.8 9.8 0 0 1 .535 1.13c-.43.125-.71.5-.71.97 0 .58.124 1.12.124 1.5 0 .38-.05.65-.05 1.05a2.203 2.203 0 0 1-2.201 2.2c-.645 0-.986-.445-.986-.948 0-.46.1-.826.55-.1.45.726.65.65.25.9-.4.25-.5.6-.5 1.05 0 .45.1.75.5 1s.8.25 1.25.25c.45 0 .75-.1.15-.35s-.2-.55-.2-1c0-.45.1-.75.5-1.05.4-.3.65-.6.65-1.05 0-.3.05-.65.25-.9.2-.25.5-.35.9-.35.4 0 .6.1.15.3l-.2.1c-.4.2-.6.55-.6 1.05 0 .5.05.9.05 1.25-.2 1.05-4.3 1.05-4.3 0 0-.45.05-.9.05-1.25.2-.4.45-.75.85-1 .4-.25.85-.35 1.25-.35.65 0 .95.15.5.4s-.35.9-.35 1.35z"/>
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="2" y1="10" x2="22" y2="10"/><polyline points="7 13 11 13"/>
                </svg>
              )}
            </button>
          </div>
          <div className="flex items-center gap-2">
            <span>COLOR:</span>
            <button onClick={(e) => { e.stopPropagation(); setTextColor("white"); }} className={`w-3 h-3 rounded-full border border-white/20 ${textColor === 'white' ? 'bg-white' : 'bg-transparent'}`} />
            <button onClick={(e) => { e.stopPropagation(); setTextColor("green"); }} className={`w-3 h-3 rounded-full border border-white/20 ${textColor === 'green' ? 'bg-green-500' : 'bg-transparent'}`} />
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); toggleFullscreen(); }}
            className="hover:opacity-80 transition-colors p-1"
            title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
          >
            {isFullscreen ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
              </svg>
            )}
          </button>
        </div>
      </div>
      <div className="h-px bg-white/5 w-full shadow-sm" />

      {/* Terminal Content Area */}
      <div
        ref={terminalRef}
        className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-8 lg:p-12 terminal-container space-y-4 text-sm sm:text-base md:text-lg leading-relaxed"
      >
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-start mb-6">
          <pre
            className="whitespace-pre text-sm md:text-base lg:text-lg font-bold opacity-80 shrink-0 hidden sm:block"
            style={{ lineHeight: '0.94' }}
          >
            {ASCII_LOGO}
          </pre>
          <div className="pt-2 overflow-x-auto flex-1 w-full">
            <pre
              className="whitespace-pre text-[8px] sm:text-xs md:text-sm lg:text-base font-bold mb-4 transform origin-top scale-y-[1.2]"
              style={{ lineHeight: '0.94' }}
            >
              {displayedAscii}
            </pre>
            <p className="text-sm sm:text-base md:text-lg font-bold tracking-tight opacity-90 whitespace-pre-wrap leading-tight mt-4">
              {TAGLINE}
            </p>
          </div>
        </div>

        {!isTypingHeader && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <p className="opacity-80 italic">
              Type <span className="font-bold cursor-pointer hover:opacity-100 transition-opacity" onClick={() => handleCommand({ key: 'Enter', target: { value: 'help' } })}>'?'</span> or <span className="font-bold cursor-pointer hover:opacity-100 transition-opacity" onClick={() => handleCommand({ key: 'Enter', target: { value: 'help' } })}>'help'</span> to view a list of available commands.
            </p>

            <div className="space-y-6 pt-4">
              {/* Interaction History */}
              <div className="space-y-4">
                {history.map((entry, idx) => (
                  <div key={idx} className={entry.type === "input" ? "font-bold" : "opacity-90 pl-3 sm:pl-4 border-l-2 border-white/5"}>
                    <pre className="whitespace-pre-wrap break-words">
                      {entry.type === "input" ? (
                        <span>
                          <span className={`${textColor === 'green' ? 'text-green-500' : 'text-zinc-400'} hidden sm:inline`}>visitor@budha.me</span>
                          <span className={`${textColor === 'green' ? 'text-green-500' : 'text-zinc-400'} sm:hidden`}>budha</span>:~$ {entry.content.split(":~$")[1]?.trim() ?? ""}
                        </span>
                      ) : entry.content}
                    </pre>
                  </div>
                ))}
              </div>

              {/* Active Prompt */}
              <div className="flex items-start gap-1 sm:gap-2">
                <div className="shrink-0 flex items-center gap-1 sm:gap-2">
                  <span className={`${textColor === 'green' ? (terminalType === 'ubuntu' && theme === 'light' ? 'text-red-800' : (theme === 'dark' ? 'text-green-500' : 'text-green-700')) : 'text-zinc-400'} font-bold hidden sm:inline`}>visitor@budha.me</span>
                  <span className={`${textColor === 'green' ? (terminalType === 'ubuntu' && theme === 'light' ? 'text-red-800' : (theme === 'dark' ? 'text-green-500' : 'text-green-700')) : 'text-zinc-400'} font-bold sm:hidden`}>budha</span>
                  <span>:~$</span>
                </div>
                <div
                  className="flex-1 relative cursor-text min-h-[1.5em] flex items-center"
                  onClick={() => inputRef.current?.focus()}
                >
                  <div className="flex flex-wrap break-all whitespace-pre-wrap terminal-font">
                    {input}
                    <motion.span
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: "steps(2)" }}
                      className={`inline-block w-2.5 h-[1.1em] ml-0.5 ${textColor === 'green' ? (terminalType === 'ubuntu' && theme === 'light' ? 'bg-red-800' : (theme === 'dark' ? 'bg-green-500' : 'bg-green-700')) : (theme === 'dark' ? 'bg-white' : 'bg-zinc-900')}`}
                    />
                  </div>
                  <input
                    ref={inputRef}
                    autoFocus
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleCommand}
                    className="absolute inset-0 opacity-0 pointer-events-none"
                    spellCheck={false}
                    autoComplete="off"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Fixed Terminal Footer */}
      <div className="border-t border-white/10 px-4 md:px-8 py-4 opacity-80 text-[10px] uppercase tracking-[0.2em] font-black text-center">
        © {new Date().getFullYear()} Budhaditya Mukhopadhyay
      </div>
    </div>
  );
}
