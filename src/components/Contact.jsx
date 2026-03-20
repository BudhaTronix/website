import { useState } from "react";
import { motion, AnimatePresence, useDragControls } from "framer-motion";

export default function Contact({ theme }) {
  const services = [
    {
      title: "Artificial Intelligence (AI)",
      desc: [
        {
          head: "Signal, audio & sensor AI models",
          text: "Develop deep-learning models for audio and time-series (e.g., breathing sounds, mechanical noise, environmental or telemetry signals) for detection, classification, or anomaly detection.",
        },
        {
          head: "Computer vision & medical imaging AI",
          text: "Build and optimize models for image quality checks, segmentation, or classification, including explainability and uncertainty estimation for sensitive domains like healthcare.",
        },
      ],
    },
    {
      title: "Drone Technology",
      desc: [
        {
          head: "Drone data analytics",
          text: "Build pipelines that take aerial imagery / sensor data from drones and run ML models on top (object detection, change detection, mapping quality, etc.).",
        },
        {
          head: "Drone-based inspection & monitoring solutions",
          text: "Design end-to-end solutions where drones collect data and backend services analyze it for real life use cases like infrastructure inspection, agriculture, or environmental monitoring.",
        },
      ],
    },
    {
      title: "Software Development",
      desc: [
        {
          head: "From prototype to production (APIs & services)",
          text: "Take AI/ML prototypes and turn them into robust, documented REST APIs or microservices ready for integration into web/mobile products.",
        },
        {
          head: "Integration & system design",
          text: "Design and implement backend architectures that connect databases and external services including cloud deployment, monitoring, and performance optimization.",
        },
      ],
    },
    {
      title: "Photography Services",
      desc: [
        {
          head: "Drone & landscape photography",
          text: "Capture high-quality aerial and landscape shots for real estate, tourism, events, or personal projects, with basic editing and delivery in web- and print-ready formats.",
        },
        {
          head: "Event & portrait photography",
          text: "Offer on-location shoots (events, portraits, lifestyle) with a focus on natural lighting, composition, and post-processing to create professional, polished images.",
        },
      ],
    },
  ];

  const [active, setActive] = useState(0);
  const dragControls = useDragControls();

  const handleDragEnd = (event, info) => {
    if (info.offset.x < -60 && active < services.length - 1) {
      setActive(active + 1);
    } else if (info.offset.x > 60 && active > 0) {
      setActive(active - 1);
    }
  };

  return (
    <section
      id="services"
      className="py-16 md:py-24 px-4 sm:px-6 text-center overflow-hidden transition-colors"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>My Services</h2>

      <motion.p 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto mb-10 md:mb-14 text-base md:text-lg font-medium tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-400"
        style={{ filter: "drop-shadow(0 0 8px rgba(96, 165, 250, 0.3))" }}
      >
        Consulting & development solutions tailored to your project.
      </motion.p>

      {/* MOBILE: Simple card switcher */}
      <div className="md:hidden">
        <div className="flex items-center justify-center gap-2 mb-4">
          {services.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActive(idx)}
              className={`w-8 h-8 rounded-full text-sm font-semibold border-2 flex-shrink-0 transition
                ${idx === active ? "drop-shadow-[0_0_6px_var(--accent)]" : ""}
              `}
              style={{
                borderColor: idx === active ? "var(--accent)" : "var(--glass-border)",
                color: idx === active ? "var(--accent)" : "var(--text-secondary)",
              }}
            >
              {idx + 1}
            </button>
          ))}
        </div>

        <motion.div
          key={active}
          className="relative w-full max-w-sm mx-auto h-[320px] rounded-2xl cursor-grab active:cursor-grabbing p-5 
                     overflow-hidden backdrop-blur-2xl border transition-all"
          style={{ backgroundColor: "var(--glass-bg)", borderColor: "var(--glass-border)" }}
          drag="x"
          dragControls={dragControls}
          onDragEnd={handleDragEnd}
          dragElastic={0.2}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-transparent blur-2xl opacity-60 pointer-events-none"></div>

          <h3 className="relative text-lg font-semibold z-20 mb-1 mt-2" style={{ color: "var(--text-primary)" }}>
            {services[active].title}
          </h3>

          <div className="w-full h-px my-2" style={{ background: "linear-gradient(to right, transparent, var(--accent), transparent)" }}></div>

          <ul className="relative text-sm leading-relaxed z-20 space-y-2 overflow-y-auto h-[220px] pr-1 text-left custom-scrollbar" style={{ color: "var(--text-secondary)" }}>
            {services[active].desc.map((item, i) => (
              <li key={i} className="flex gap-2">
                <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 shadow-[0_0_4px_var(--accent)]" style={{ backgroundColor: "var(--accent)" }}></span>
                <span>
                  <span className="font-semibold text-xs md:text-sm" style={{ color: "var(--text-primary)" }}>{item.head}</span>
                  <p className="text-xs">{item.text}</p>
                </span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* DESKTOP: Compact 3D Carousel & Contact Dock Integrated */}
      <div className="hidden md:block">
        <div className="flex flex-col items-center max-w-6xl mx-auto">
          <div className="flex w-full relative mb-4">
            {/* LEFT SIDE NUMBER NAV - Adjusted for compactness */}
            <div className="flex flex-col mr-8 mt-6">
              <h4 className="text-xs uppercase tracking-widest font-bold mb-4 text-left opacity-50" style={{ color: "var(--text-secondary)" }}>
                Domains
              </h4>

              {services.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActive(idx)}
                  className={`mb-3 w-7 h-7 rounded-full text-xs font-semibold border-2 transition
                    ${idx === active ? "drop-shadow-[0_0_6px_var(--accent)]" : ""}
                  `}
                  style={{
                    borderColor: idx === active ? "var(--accent)" : "var(--glass-border)",
                    color: idx === active ? "var(--accent)" : "var(--text-secondary)",
                  }}
                >
                  {idx + 1}
                </button>
              ))}
            </div>

            {/* Carousel Container - Slightly wider and much shorter */}
            <div className="relative flex-1 h-[340px] flex items-center justify-center">
              {services.map((srv, idx) => {
                const offset = idx - active;
                const isActive = idx === active;

                return (
                  <motion.div
                    key={idx}
                    drag="x"
                    dragControls={dragControls}
                    onDragEnd={handleDragEnd}
                    dragElastic={0.2}
                    className="absolute w-[440px] md:w-[520px] h-[300px] rounded-3xl cursor-grab active:cursor-grabbing p-6 
                               overflow-hidden backdrop-blur-3xl border transition-all"
                    style={{ 
                      zIndex: 100 - Math.abs(offset),
                      backgroundColor: "var(--glass-bg)",
                      borderColor: "var(--glass-border)",
                      boxShadow: isActive ? "0 20px 40px -10px rgba(0,0,0,0.3)" : "none"
                    }}
                    animate={{
                      x: offset * 100, // Widened spacing
                      z: isActive ? 0 : -100,
                      rotateY: offset * 15,
                      scale: isActive ? 1 : 0.85,
                      opacity: Math.abs(offset) > 2 ? 0 : 1 - Math.abs(offset) * 0.3,
                    }}
                    whileHover={{
                      scale: isActive ? 1.02 : 0.88,
                      y: -5
                    }}
                    transition={{ type: "spring", stiffness: 180, damping: 20 }}
                  >
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-transparent blur-3xl opacity-60 pointer-events-none"></div>
                    
                    <h3 className="relative text-2xl font-bold z-20 mb-1" style={{ color: "var(--text-primary)" }}>
                      {srv.title}
                    </h3>

                    <div className="relative w-full h-[1.5px] my-3" style={{ background: "linear-gradient(to right, transparent, var(--accent), transparent)" }}></div>
                    
                    {isActive && (
                      <ul className="relative text-sm leading-relaxed z-20 space-y-4 mt-2 pr-2 overflow-y-auto h-[200px] custom-scrollbar text-left" style={{ color: "var(--text-secondary)" }}>
                        {srv.desc.map((item, i) => (
                          <li key={i} className="flex gap-3">
                            <span className="w-2 h-2 rounded-full mt-2 shadow-[0_0_6px_var(--accent)] flex-shrink-0" style={{ backgroundColor: "var(--accent)" }}></span>
                            <span>
                              <span className="font-bold text-base" style={{ color: "var(--text-primary)" }}>{item.head}</span>
                              <br />
                              <span className="text-xs opacity-90">{item.text}</span>
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* CONTACT DOCK - Bigger, longer, and with 3D perspective */}
          <div className="perspective-1000 mt-10 w-full flex justify-center">
            <motion.div 
              initial={{ opacity: 0, y: 30, rotateX: 15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              whileHover={{ rotateX: -5, y: -5, scale: 1.02 }}
              className="flex items-center gap-10 px-12 py-5 rounded-3xl backdrop-blur-2xl border shadow-2xl relative transition-all duration-500"
              style={{ 
                backgroundColor: "var(--glass-bg)", 
                borderColor: "var(--glass-border)",
                borderWidth: "1px",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 20px rgba(59, 130, 246, 0.1)"
              }}
            >
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 pointer-events-none"></div>

              <span className="text-sm font-black uppercase tracking-[0.2em] opacity-70 relative z-10" style={{ color: "var(--text-primary)" }}>
                Reach Out:
              </span>
              
              <div className="flex gap-8 relative z-10">
                <a
                  href="mailto:budha2011@gmail.com"
                  className="transition-all hover:scale-125 hover:drop-shadow-[0_0_10px_#3b82f6] duration-300"
                  title="Email Me"
                >
                  <img src="/mail.svg" alt="Email" className="w-9 h-9" />
                </a>

                <a
                  href="https://www.linkedin.com/in/budhadityamukhopadhyay/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-all hover:scale-125 hover:drop-shadow-[0_0_10px_#3b82f6] duration-300"
                  title="LinkedIn"
                >
                  <img src="/linkedin.svg" alt="LinkedIn" className="w-9 h-9" />
                </a>

                <a
                  href="https://github.com/BudhaTronix"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-all hover:scale-125 hover:drop-shadow-[0_0_10px_#3b82f6] duration-300"
                  title="GitHub"
                >
                  <img 
                    src="/github.svg" 
                    alt="GitHub" 
                    className={`w-9 h-9 transition-all ${theme === 'dark' ? 'invert' : ''}`} 
                  />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}