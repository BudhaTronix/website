import { motion } from "framer-motion";
import knowledge from "../data/knowledge.json";
import Reveal from "./ui/Reveal";

export default function Skills({ theme }) {
  const groups = knowledge.skills_grouped;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="skills" className="py-20 px-6 text-center transition-colors">
      <h2 className="font-display text-3xl md:text-5xl font-bold mb-12" style={{ color: "var(--text-primary)" }}>
        Skills &amp; <span className="gradient-text">Stack</span>
      </h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto text-left">
        {groups.map((group, gIdx) => (
          <Reveal key={group.group} delay={gIdx * 0.06} className={gIdx === 0 ? "sm:col-span-2 lg:col-span-1" : ""}>
            <div className="glow-card p-6 h-full">
              <h3 className="font-display text-lg font-bold mb-1" style={{ color: "var(--text-primary)" }}>
                {group.group}
              </h3>
              <div className="w-12 h-0.5 rounded-full mb-4" style={{ background: "var(--gradient-accent)" }} />
              <motion.div
                className="flex flex-wrap gap-2"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {group.items.map((skill, i) => (
                  <motion.span
                    key={i}
                    variants={itemVariants}
                    whileHover={{
                      scale: 1.08,
                      y: -3,
                      backgroundColor: "var(--accent)",
                      color: "#fff",
                      boxShadow: "0 10px 20px -5px var(--accent-glow)"
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    className="px-3.5 py-1.5 rounded-lg text-sm transition-all cursor-default border"
                    style={{
                      backgroundColor: "var(--glass-bg)",
                      color: "var(--text-secondary)",
                      borderColor: "var(--glass-border)"
                    }}
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
