import { motion } from "framer-motion";

export default function About() {
  const paragraphs = [
    "Hi! I'm Budhaditya Mukhopadhyay, an AI Engineer specializing in audio processing. I hold a Master’s degree in Data Science from Otto von Guericke University.",
    "I focus on implementing, evaluating, and optimizing Machine Learning and Deep Learning algorithms, with particular expertise in medical image processing and computer vision.",
    "Currently, I serve as a Strategic Advisor to Weevils Drones, an emerging UAV company in India, supporting AI-driven innovation, international partnerships, and strategic growth opportunities.",
    "Previously, I gained 4.5 years of professional experience in IT, primarily focused on implementing web services using TIBCO products."
  ];

  const highlightWords = [
    "AI Engineer",
    "Machine Learning",
    "Deep Learning",
    "medical image processing",
    "Strategic Advisor",
    "Weevils Drones"
  ];

  return (
    <section
      id="about"
      className="py-20 px-6 max-w-4xl mx-auto text-center transition-colors"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      <h2 className="text-3xl md:text-5xl font-bold mb-10" style={{ color: "var(--text-primary)" }}>About Me</h2>

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
