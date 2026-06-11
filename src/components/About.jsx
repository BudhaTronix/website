import Reveal from "./ui/Reveal";

export default function About() {
  const paragraphs = [
    "I'm a Senior AI Engineer at VisionHealth GmbH in Munich, where I own the end-to-end AI architecture for audio and video healthcare applications — from data strategy and model training to on-device deployment of compact, real-time deep learning models that support clinical trials and the Kata inhalation app.",
    "Beyond healthcare, I build GenAI systems — local-first LLM tooling, agent workflows, and AI-powered developer tools — and hold a Master's degree in Data and Knowledge Engineering from Otto von Guericke University Magdeburg.",
    "I also serve as a Strategic Advisor to Weevils Drones, an emerging UAV company, where I design the software architecture for AI-powered drone systems and mentor a team of interns on AI, engineering, and product thinking.",
    "Across 9+ years I've shipped AI and software in healthcare, automotive research at Volkswagen, medical computer vision at DZNE and OVGU, and enterprise systems — with 3 peer-reviewed publications in medical AI and explainability, and 10 students mentored along the way."
  ];

  return (
    <section id="about" className="py-24 px-6 md:px-10 max-w-6xl mx-auto text-left transition-colors">
      <Reveal>
        <p className="eyebrow mb-4">00 — About</p>
        <h2 className="font-display font-medium text-3xl md:text-5xl tracking-tight mb-14" style={{ color: "var(--text-primary)" }}>
          The short <span style={{ color: "var(--text-secondary)" }}>version</span>
        </h2>
      </Reveal>

      <div className="grid md:grid-cols-2 gap-x-14 gap-y-8 leading-relaxed text-[15px] md:text-base" style={{ color: "var(--text-secondary)" }}>
        {paragraphs.map((p, idx) => (
          <Reveal key={idx} delay={idx * 0.05}>
            <p className="hairline-t pt-6">{p}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
