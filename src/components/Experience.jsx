import knowledge from "../data/knowledge.json";
import Reveal from "./ui/Reveal";

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-6 md:px-10 max-w-6xl mx-auto">
      <Reveal>
        <p className="eyebrow mb-4">01 — Career</p>
        <h2 className="font-display font-medium text-3xl md:text-5xl tracking-tight mb-14 text-left" style={{ color: "var(--text-primary)" }}>
          Experience <span style={{ color: "var(--text-secondary)" }}>&amp; Education</span>
        </h2>
      </Reveal>

      <div>
        {knowledge.experience.map((company, idx) => (
          <Reveal key={idx}>
            <div className="case-row py-8 md:py-10 grid md:grid-cols-[200px_1fr] gap-4 md:gap-10 text-left">
              {/* Left: period + company */}
              <div>
                <div className="font-mono-ui text-[11px] uppercase tracking-[0.18em] mb-2" style={{ color: "var(--text-secondary)" }}>
                  {company.roles[company.roles.length - 1].period.split(" - ")[0]} — {company.roles[0].period.split(" - ")[1] || "Present"}
                </div>
                <div className="font-display font-semibold text-lg leading-snug" style={{ color: "var(--text-primary)" }}>
                  {company.company}
                </div>
                {company.location && (
                  <div className="text-xs mt-1" style={{ color: "var(--text-secondary)" }}>{company.location}</div>
                )}
              </div>

              {/* Right: roles */}
              <div className="space-y-6">
                {company.roles.map((role, rIdx) => (
                  <div key={rIdx}>
                    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-2">
                      <h3 className="font-display font-medium text-base md:text-lg" style={{ color: "var(--text-primary)" }}>
                        {role.title}
                      </h3>
                      <span className="font-mono-ui text-[10px] uppercase tracking-[0.15em]" style={{ color: "var(--text-secondary)" }}>
                        {role.period}
                      </span>
                    </div>
                    <ul className="space-y-1.5 text-sm md:text-[15px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                      {role.bullets.slice(0, 3).map((b, i) => (
                        <li key={i} className="flex gap-3">
                          <span style={{ color: "var(--text-primary)" }}>—</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                    {role.skills && (
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {role.skills.slice(0, 6).map((s, i) => (
                          <span
                            key={i}
                            className="font-mono-ui px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider border"
                            style={{ borderColor: "var(--glass-border)", color: "var(--text-secondary)" }}
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        ))}

        {/* Education */}
        <Reveal>
          <p className="eyebrow pt-12 pb-6 text-left">Education</p>
        </Reveal>
        {knowledge.education.map((edu, idx) => (
          <Reveal key={`edu-${idx}`}>
            <div className="case-row py-8 grid md:grid-cols-[200px_1fr] gap-4 md:gap-10 text-left">
              <div className="font-mono-ui text-[11px] uppercase tracking-[0.18em]" style={{ color: "var(--text-secondary)" }}>
                {edu.period}
              </div>
              <div>
                <h3 className="font-display font-medium text-base md:text-lg mb-1" style={{ color: "var(--text-primary)" }}>
                  {edu.degree}
                </h3>
                <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                  {edu.institution}{edu.location ? ` · ${edu.location}` : ""}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
