import knowledge from "../data/knowledge.json";
import Reveal from "./ui/Reveal";

export default function Projects({ theme }) {
  return (
    <section id="projects" className="py-24 px-6 md:px-10 max-w-6xl mx-auto text-left transition-colors">
      <Reveal>
        <p className="eyebrow mb-4">02 — Selected work</p>
        <h2 className="font-display font-medium text-3xl md:text-5xl tracking-tight mb-4" style={{ color: "var(--text-primary)" }}>
          Projects <span style={{ color: "var(--text-secondary)" }}>&amp; expertise</span>
        </h2>
        <p className="mb-14 max-w-xl text-sm md:text-base" style={{ color: "var(--text-secondary)" }}>
          Recent GenAI builds — all open source on GitHub.
        </p>
      </Reveal>

      {/* GenAI case-study rows */}
      <div>
        {knowledge.projects.map((p, idx) => (
          <Reveal key={p.name}>
            <a
              href={p.github}
              target="_blank"
              rel="noopener noreferrer"
              className="case-row group block py-8 md:py-9 grid md:grid-cols-[200px_1fr_auto] gap-4 md:gap-10 items-start"
            >
              <div className="font-mono-ui text-[11px] uppercase tracking-[0.18em] pt-1.5" style={{ color: "var(--text-secondary)" }}>
                {String(idx + 1).padStart(2, "0")} · {p.tag}
              </div>
              <div>
                <h3 className="font-display font-medium text-xl md:text-2xl mb-2 transition-transform duration-300 group-hover:translate-x-1" style={{ color: "var(--text-primary)" }}>
                  {p.name}
                </h3>
                <p className="text-sm md:text-[15px] leading-relaxed max-w-2xl mb-3" style={{ color: "var(--text-secondary)" }}>
                  {p.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {p.stack.map((s, i) => (
                    <span
                      key={i}
                      className="font-mono-ui px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider border"
                      style={{ borderColor: "var(--glass-border)", color: "var(--text-secondary)" }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div
                className="hidden md:flex w-10 h-10 rounded-full border items-center justify-center transition-all duration-300 group-hover:rotate-45"
                style={{ borderColor: "var(--glass-border)", color: "var(--text-primary)" }}
              >
                ↗
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
