import { motion } from "framer-motion";
import knowledge from "../data/knowledge.json";
import Reveal from "./ui/Reveal";

export default function Skills({ theme }) {
  const groups = knowledge.skills_grouped;

  return (
    <section id="skills" className="py-24 px-6 md:px-10 max-w-6xl mx-auto text-left transition-colors">
      <Reveal>
        <p className="eyebrow mb-4">03 — Capabilities</p>
        <h2 className="font-display font-medium text-3xl md:text-5xl tracking-tight mb-14" style={{ color: "var(--text-primary)" }}>
          Skills <span style={{ color: "var(--text-secondary)" }}>&amp; stack</span>
        </h2>
      </Reveal>

      <div>
        {groups.map((group, gIdx) => (
          <Reveal key={group.group}>
            <div className="case-row py-7 grid md:grid-cols-[200px_1fr] gap-3 md:gap-10 items-start">
              <h3 className="font-display font-medium text-base md:text-lg" style={{ color: "var(--text-primary)" }}>
                {group.group}
              </h3>
              <motion.div
                className="flex flex-wrap gap-2"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.04 } } }}
              >
                {group.items.map((skill, i) => (
                  <motion.span
                    key={i}
                    variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
                    whileHover={{ y: -2 }}
                    className="font-mono-ui px-3.5 py-1.5 rounded-full text-[11px] uppercase tracking-wider border cursor-default transition-colors hover:border-current"
                    style={{ borderColor: "var(--glass-border)", color: "var(--text-secondary)" }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
