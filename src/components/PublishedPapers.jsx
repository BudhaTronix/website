import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import knowledge from "../data/knowledge.json";

export default function PublishedPapers({ theme }) {
  const papers = knowledge.publications;

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="published-papers" className="py-16 md:py-20 px-4 sm:px-6 relative transition-colors">
      <h2 className="font-display text-3xl md:text-5xl font-bold mb-12 text-center" style={{ color: "var(--text-primary)" }}>
        Published <span className="gradient-text">Papers</span>
      </h2>

      <div className="flex flex-col md:flex-row max-w-5xl mx-auto relative gap-6">
        {/* Navigation */}
        <div className="flex md:flex-col items-center md:items-start">
          <h4 className="font-semibold mb-0 md:mb-4 mr-4 md:mr-0 text-sm md:text-base whitespace-nowrap" style={{ color: "var(--text-secondary)" }}>View Papers</h4>
          <div className="flex md:flex-col gap-2">
            {papers.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`w-9 h-9 md:w-8 md:h-8 rounded-full text-sm font-semibold border-2 flex-shrink-0 transition ${
                  idx === activeIndex
                    ? "border-blue-500 text-blue-500 drop-shadow-[0_0_6px_#3b82f6]"
                    : "border-gray-600 text-gray-400 hover:border-blue-400 hover:text-blue-400"
                } flex items-center justify-center`}
                style={{
                  borderColor: idx === activeIndex ? "var(--accent)" : "var(--glass-border)",
                  color: idx === activeIndex ? "var(--accent)" : "var(--text-secondary)",
                }}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Cards */}
        <div className="relative flex-1">
          {/* Mobile */}
          <div className="md:hidden">
            <motion.div
              key={activeIndex}
              className="relative w-full rounded-2xl min-h-fit
                flex flex-col justify-start p-4 text-left
                backdrop-blur-2xl border transition-all
                shadow-[0_0_25px_rgba(0,0,0,0.1)]"
              style={{ backgroundColor: "var(--glass-bg)", borderColor: "var(--glass-border)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-transparent blur-2xl opacity-60 pointer-events-none"></div>
              
              <div className="absolute top-2 left-3 font-bold text-base z-10" style={{ color: "var(--text-secondary)" }}>
                {activeIndex + 1}
              </div>

              <h3 className="text-lg font-bold mb-2 relative z-10 pr-8 pt-4 leading-snug" style={{ color: "var(--text-primary)" }}>
                {papers[activeIndex].title}
              </h3>

              <div className="flex flex-wrap items-center gap-2 mb-2 relative z-10">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold text-white" style={{ background: "var(--gradient-accent)" }}>
                  {papers[activeIndex].authorship}
                </span>
                <span className="text-xs" style={{ color: "var(--text-secondary)" }}>
                  {papers[activeIndex].venue} · {papers[activeIndex].year}
                </span>
              </div>

              <div className="w-full h-px my-1 z-10" style={{ background: "linear-gradient(to right, transparent, var(--accent), transparent)" }}></div>

              <p className="text-sm mb-3 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {papers[activeIndex].desc}
              </p>

              {papers[activeIndex].link && (
                <a
                  href={papers[activeIndex].link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white px-3 py-2 rounded-lg hover:opacity-90 transition-colors text-sm font-medium self-start"
                  style={{ backgroundColor: "var(--accent)" }}
                  onClick={(e) => e.stopPropagation()}
                >
                  View Paper
                </a>
              )}
            </motion.div>
          </div>

          {/* Desktop */}
          <div className="hidden md:block relative h-[30rem]">
            {papers.map((paper, idx) => {
              const isActive = idx === activeIndex;
              const offset = idx - activeIndex;

              return (
                <motion.div
                  key={idx}
                  className={`
                    absolute left-0 w-full rounded-2xl cursor-pointer 
                    ${isActive ? 'h-auto' : 'h-56 overflow-hidden pointer-events-none'}
                    flex flex-col justify-start p-6 text-left
                    backdrop-blur-2xl border transition-all
                    shadow-[0_0_25px_rgba(0,0,0,0.1)]
                  `}
                  style={{ 
                    zIndex: isActive ? 20 : 20 - Math.abs(offset),
                    backgroundColor: "var(--glass-bg)",
                    borderColor: "var(--glass-border)" 
                  }}
                  initial={{ scale: 0.95, y: 30 * offset + 16, opacity: 0.9 }}
                  animate={{
                    scale: isActive ? 1 : 0.95,
                    y: 30 * offset + 16,
                    opacity: 1,
                  }}
                  whileHover={{
                    scale: isActive ? 1.02 : 0.97,
                  }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-transparent blur-2xl opacity-60 pointer-events-none"></div>
                  
                  <div className="absolute top-2 left-3 font-bold text-lg z-10" style={{ color: "var(--text-secondary)" }}>
                    {idx + 1}
                  </div>

                  <h3 className="text-xl font-bold mb-2 relative z-10 pr-8 pt-4 leading-snug" style={{ color: "var(--text-primary)" }}>
                    {paper.title}
                  </h3>

                  {isActive && (
                    <>
                      <div className="flex flex-wrap items-center gap-2 mb-2 relative z-10">
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold text-white" style={{ background: "var(--gradient-accent)" }}>
                          {paper.authorship}
                        </span>
                        <span className="text-xs" style={{ color: "var(--text-secondary)" }}>
                          {paper.venue} · {paper.year}
                        </span>
                      </div>

                      <div className="w-full h-px my-1 z-10" style={{ background: "linear-gradient(to right, transparent, var(--accent), transparent)" }}></div>

                      <p className="text-base mb-3 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                        {paper.desc}
                      </p>

                      {paper.link && (
                        <a
                          href={paper.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white px-4 py-2 rounded-lg hover:opacity-90 transition-colors text-sm font-medium self-start inline-block"
                          style={{ backgroundColor: "var(--accent)" }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          View Paper
                        </a>
                      )}
                    </>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="text-center mt-10">
        <a
          href={knowledge.contact.scholar}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-semibold transition hover:translate-x-1"
          style={{ color: "var(--accent)" }}
        >
          View all on Google Scholar →
        </a>
      </div>
    </section>
  );
}