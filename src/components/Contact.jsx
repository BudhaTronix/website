import Reveal from "./ui/Reveal";
import knowledge from "../data/knowledge.json";

const services = [
  {
    title: "Artificial Intelligence",
    desc: [
      {
        head: "Signal, audio & sensor AI models",
        text: "Deep-learning models for audio and time-series (breathing sounds, mechanical noise, environmental or telemetry signals) for detection, classification, or anomaly detection.",
      },
      {
        head: "Computer vision & medical imaging AI",
        text: "Models for image quality checks, segmentation, or classification — including explainability and uncertainty estimation for sensitive domains like healthcare.",
      },
    ],
  },
  {
    title: "Drone Technology",
    desc: [
      {
        head: "Drone data analytics",
        text: "Pipelines that take aerial imagery and sensor data from drones and run ML models on top — object detection, change detection, mapping quality.",
      },
      {
        head: "Inspection & monitoring solutions",
        text: "End-to-end solutions where drones collect data and backend services analyze it: infrastructure inspection, agriculture, environmental monitoring.",
      },
    ],
  },
  {
    title: "Software Development",
    desc: [
      {
        head: "From prototype to production",
        text: "AI/ML prototypes turned into robust, documented REST APIs or microservices ready for integration into web and mobile products.",
      },
      {
        head: "Integration & system design",
        text: "Backend architectures connecting databases and external services — cloud deployment, monitoring, and performance optimization included.",
      },
    ],
  },
  {
    title: "Photography",
    desc: [
      {
        head: "Drone & landscape photography",
        text: "High-quality aerial and landscape shots for real estate, tourism, events, or personal projects — delivered web- and print-ready.",
      },
      {
        head: "Event & portrait photography",
        text: "On-location shoots with a focus on natural lighting, composition, and polished post-processing.",
      },
    ],
  },
];

export default function Contact({ theme }) {
  return (
    <section id="services" className="py-24 px-6 md:px-10 max-w-6xl mx-auto text-left transition-colors">
      <Reveal>
        <p className="eyebrow mb-4">05 — Services</p>
        <h2 className="font-display font-medium text-3xl md:text-5xl tracking-tight mb-14" style={{ color: "var(--text-primary)" }}>
          What I can <span style={{ color: "var(--text-secondary)" }}>do for you</span>
        </h2>
      </Reveal>

      {/* Service grid */}
      <div className="grid sm:grid-cols-2 gap-5 mb-24">
        {services.map((srv, idx) => (
          <Reveal key={srv.title} delay={idx * 0.05}>
            <div className="glow-card p-7 md:p-8 h-full">
              <div className="font-mono-ui text-[11px] uppercase tracking-[0.2em] mb-4" style={{ color: "var(--text-secondary)" }}>
                {String(idx + 1).padStart(2, "0")}
              </div>
              <h3 className="font-display font-medium text-xl md:text-2xl mb-5" style={{ color: "var(--text-primary)" }}>
                {srv.title}
              </h3>
              <ul className="space-y-4">
                {srv.desc.map((item, i) => (
                  <li key={i}>
                    <div className="text-sm font-semibold mb-1" style={{ color: "var(--text-primary)" }}>{item.head}</div>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{item.text}</p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Big CTA */}
      <Reveal>
        <div className="hairline-t pt-16 text-left">
          <p className="eyebrow mb-6">Get in touch</p>
          <a
            href="mailto:budha2011@gmail.com"
            className="font-display font-medium text-4xl sm:text-5xl md:text-7xl tracking-tight inline-block transition-opacity hover:opacity-70 break-all"
            style={{ color: "var(--text-primary)" }}
          >
            Let&apos;s build something.
          </a>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 mt-8 font-mono-ui text-[11px] uppercase tracking-[0.18em]">
            <a href="mailto:budha2011@gmail.com" className="transition hover:opacity-70" style={{ color: "var(--text-primary)" }}>
              budha2011@gmail.com ↗
            </a>
            <a href={knowledge.contact.linkedin} target="_blank" rel="noopener noreferrer" className="transition hover:opacity-70" style={{ color: "var(--text-secondary)" }}>
              LinkedIn ↗
            </a>
            <a href={knowledge.contact.github} target="_blank" rel="noopener noreferrer" className="transition hover:opacity-70" style={{ color: "var(--text-secondary)" }}>
              GitHub ↗
            </a>
            <a href={knowledge.contact.scholar} target="_blank" rel="noopener noreferrer" className="transition hover:opacity-70" style={{ color: "var(--text-secondary)" }}>
              Google Scholar ↗
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
