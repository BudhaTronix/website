import knowledge from "../data/knowledge.json";
import Reveal from "./ui/Reveal";

const logoMap = {
  "VisionHealth GmbH": "/images/companies/visionhealth.png",
  "Weevils Drones": "/images/companies/weevils.png",
  "Volkswagen AG": "/images/companies/Volkswagen.png",
  "Otto-von-Guericke University Magdeburg": "/images/companies/ottovon.png",
  "DZNE (German Center for Neurodegenerative Diseases)": "/images/companies/dzne.png",
  "Cognizant": "/images/companies/cognizant.png",
  "Ericsson": "/images/companies/Ericsson.png",
};

function TimelineNode({ children, delay = 0 }) {
  return (
    <div className="relative pl-10 md:pl-14 pb-12 last:pb-0">
      {/* spine */}
      <div
        className="absolute left-[11px] md:left-[15px] top-2 bottom-0 w-px"
        style={{ background: "linear-gradient(to bottom, var(--accent), var(--accent-2), transparent)" }}
      />
      {/* node dot */}
      <div
        className="absolute left-0 md:left-1 top-1.5 w-[23px] h-[23px] rounded-full border-2 flex items-center justify-center"
        style={{ borderColor: "var(--accent)", backgroundColor: "var(--bg-primary)", boxShadow: "0 0 12px var(--accent-glow)" }}
      >
        <div className="w-2 h-2 rounded-full" style={{ background: "var(--gradient-accent)" }} />
      </div>
      <Reveal delay={delay}>{children}</Reveal>
    </div>
  );
}

function RoleBlock({ role }) {
  return (
    <div className="mt-4 first:mt-0">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h4 className="font-display font-semibold text-base md:text-lg" style={{ color: "var(--text-primary)" }}>
          {role.title}
        </h4>
        <span className="text-xs md:text-sm font-medium" style={{ color: "var(--accent)" }}>{role.period}</span>
      </div>
      <ul className="mt-2 space-y-1.5 text-sm md:text-[15px] text-left" style={{ color: "var(--text-secondary)" }}>
        {role.bullets.slice(0, 3).map((b, i) => (
          <li key={i} className="flex gap-2">
            <span style={{ color: "var(--accent)" }}>▸</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
      {role.skills && (
        <div className="flex flex-wrap gap-1.5 mt-3">
          {role.skills.slice(0, 6).map((s, i) => (
            <span
              key={i}
              className="px-2.5 py-0.5 rounded-full text-[11px] border"
              style={{ backgroundColor: "var(--glass-bg)", borderColor: "var(--glass-border)", color: "var(--text-secondary)" }}
            >
              {s}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="py-20 px-6 transition-colors">
      <h2 className="font-display text-3xl md:text-5xl font-bold mb-4 text-center" style={{ color: "var(--text-primary)" }}>
        Experience &amp; <span className="gradient-text">Education</span>
      </h2>
      <p className="text-center mb-14 max-w-2xl mx-auto text-sm md:text-base" style={{ color: "var(--text-secondary)" }}>
        9+ years across healthcare AI, GenAI, UAV systems, automotive research, and enterprise software.
      </p>

      <div className="max-w-3xl mx-auto">
        {knowledge.experience.map((company, idx) => (
          <TimelineNode key={idx} delay={0.05}>
            <div className="glow-card p-5 md:p-6 text-left">
              <div className="flex items-center gap-3 mb-1">
                {logoMap[company.company] && (
                  <img
                    src={logoMap[company.company]}
                    alt={company.company}
                    className="w-9 h-9 object-contain rounded-md bg-white p-1"
                  />
                )}
                <div>
                  <h3 className="font-display font-bold text-lg md:text-xl leading-tight" style={{ color: "var(--text-primary)" }}>
                    {company.company}
                  </h3>
                  {company.location && (
                    <span className="text-xs" style={{ color: "var(--text-secondary)" }}>{company.location}</span>
                  )}
                </div>
              </div>
              <div className="mt-3">
                {company.roles.map((role, rIdx) => (
                  <div key={rIdx} className={rIdx > 0 ? "pt-4 mt-4 border-t" : ""} style={rIdx > 0 ? { borderColor: "var(--glass-border)" } : undefined}>
                    <RoleBlock role={role} />
                  </div>
                ))}
              </div>
            </div>
          </TimelineNode>
        ))}

        {/* Education divider */}
        <div className="relative pl-10 md:pl-14 pb-10">
          <div
            className="absolute left-[11px] md:left-[15px] top-0 bottom-0 w-px"
            style={{ background: "linear-gradient(to bottom, transparent, var(--accent-2))" }}
          />
          <span
            className="font-display text-sm font-semibold tracking-widest uppercase"
            style={{ color: "var(--accent-2)" }}
          >
            Education
          </span>
        </div>

        {knowledge.education.map((edu, idx) => (
          <TimelineNode key={`edu-${idx}`} delay={0.05}>
            <div className="glow-card p-5 md:p-6 text-left">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="font-display font-bold text-lg md:text-xl" style={{ color: "var(--text-primary)" }}>
                  {edu.institution}
                </h3>
                <span className="text-xs md:text-sm font-medium" style={{ color: "var(--accent)" }}>{edu.period}</span>
              </div>
              <p className="mt-1 text-sm md:text-[15px]" style={{ color: "var(--text-secondary)" }}>
                {edu.degree}{edu.location ? ` · ${edu.location}` : ""}
              </p>
            </div>
          </TimelineNode>
        ))}
      </div>
    </section>
  );
}
