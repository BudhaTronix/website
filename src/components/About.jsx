import { motion } from "framer-motion";

export default function About() {
  const paragraphs = [
    "Hi! I'm Budhaditya Mukhopadhyay, a Senior AI Engineer at VisionHealth GmbH in Munich, where I own the end-to-end AI architecture for audio and video healthcare applications — from data strategy and model training to on-device deployment of compact, real-time deep learning models that support clinical trials and the Kata inhalation app.",
    "Beyond healthcare, I build GenAI systems — local-first LLM tooling, agent workflows, and AI-powered developer tools — and hold a Master's degree in Data and Knowledge Engineering from Otto von Guericke University Magdeburg.",
    "I also serve as a Strategic Advisor to Weevils Drones, an emerging UAV company, where I design the software architecture for AI-powered drone systems and mentor a team of interns on AI, engineering, and product thinking.",
    "Across 9+ years I've shipped AI and software in healthcare, automotive research at Volkswagen, medical computer vision at DZNE and OVGU, and enterprise systems — with 3 peer-reviewed publications in medical AI and explainability, and 10 students mentored along the way."
  ];

  const highlightWords = [
    "Senior AI Engineer",
    "VisionHealth GmbH",
    "GenAI",
    "on-device deployment",
    "Strategic Advisor",
    "Weevils Drones",
    "3 peer-reviewed publications",
    "Volkswagen",
    "DZNE"
  ];

  return (
    <section
      id="about"
      className="py-20 px-6 max-w-4xl mx-auto text-center transition-colors"
    >
      <h2 className="font-display text-3xl md:text-5xl font-bold mb-10" style={{ color: "var(--text-primary)" }}>
        About <span className="gradient-text">Me</span>
      </h2>

      <div className="space-y-6 leading-relaxed text-left" style={{ color: "var(--text-secondary)" }}>
        {paragraphs.map((p, idx) => (
          <motion.p
            key={idx}
            whileHover={{ scale: 1.02, y: -3 }}
            transition={{ type: "spring", stiffness: 120, damping: 12 }}
            className="transition-all duration-300 cursor-pointer"
          >
            {p.split(new RegExp(`(${highlightWords.join("|")})`, "g")).map((text, i) =>
              highlightWords.includes(text) ? (
                <span key={i} className="font-semibold" style={{ color: "var(--accent)" }}>{text}</span>
              ) : (
                text
              )
            )}
          </motion.p>
        ))}
      </div>
    </section>
  );
}
