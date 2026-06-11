import knowledge from "../data/knowledge.json";
import Reveal from "./ui/Reveal";

export default function PublishedPapers({ theme }) {
  const papers = knowledge.publications;

  return (
    <section id="published-papers" className="py-24 px-6 md:px-10 max-w-6xl mx-auto text-left transition-colors">
      <Reveal>
        <p className="eyebrow mb-4">04 — Research</p>
        <h2 className="font-display font-medium text-3xl md:text-5xl tracking-tight mb-14" style={{ color: "var(--text-primary)" }}>
          Published <span style={{ color: "var(--text-secondary)" }}>papers</span>
        </h2>
      </Reveal>

      <div>
        {papers.map((paper, idx) => (
          <Reveal key={idx}>
            <a
              href={paper.link}
              target="_blank"
              rel="noopener noreferrer"
              className="case-row group block py-8 md:py-9 grid md:grid-cols-[200px_1fr_auto] gap-4 md:gap-10 items-start"
            >
              <div className="pt-1">
                <div className="font-mono-ui text-[11px] uppercase tracking-[0.18em] mb-2" style={{ color: "var(--text-secondary)" }}>
                  {paper.year}
                </div>
                <span
                  className="font-mono-ui inline-block px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider border"
                  style={{ borderColor: "var(--text-primary)", color: "var(--text-primary)" }}
                >
                  {paper.authorship}
                </span>
              </div>

              <div>
                <h3 className="font-display font-medium text-lg md:text-xl leading-snug mb-2 transition-transform duration-300 group-hover:translate-x-1" style={{ color: "var(--text-primary)" }}>
                  {paper.title}
                </h3>
                <p className="font-mono-ui text-[11px] uppercase tracking-[0.12em] mb-3" style={{ color: "var(--text-secondary)" }}>
                  {paper.venue}
                </p>
                <p className="text-sm leading-relaxed max-w-2xl" style={{ color: "var(--text-secondary)" }}>
                  {paper.desc}
                </p>
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

      <Reveal>
        <a
          href={knowledge.contact.scholar}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono-ui inline-flex items-center gap-2 mt-10 text-[11px] uppercase tracking-[0.18em] transition hover:translate-x-1"
          style={{ color: "var(--text-primary)" }}
        >
          View all on Google Scholar →
        </a>
      </Reveal>
    </section>
  );
}
