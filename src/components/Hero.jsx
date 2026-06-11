import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import knowledge from "../data/knowledge.json";

const companyData = [
  {
    name: "Weevils Drones",
    logo: "/images/companies/weevils.png",
    position: "Strategic Advisor",
    duration: "2025-Present",
    bullets: [
      "Owning end-to-end architecture of AI-powered drone systems",
      "Implementing AI-based drone tracking and intelligence",
      "Mentoring interns and advising leadership on strategy"
    ]
  },
  {
    name: "VisionHealth",
    logo: "/images/companies/visionhealth.png",
    position: "Senior AI Engineer",
    duration: "2023-Present",
    bullets: [
      "Leading end-to-end ML systems for audio-based healthcare",
      "Designing and deploying on-device deep learning models",
      "Owning data strategy, training, validation, and production deployment"
    ]
  },
  {
    name: "Volkswagen AG",
    logo: "/images/companies/Volkswagen.png",
    position: "Data Science Intern",
    duration: "2022",
    bullets: [
      "Developed a motion sickness detection solution using deep learning",
      "Predicted pupil diameter using LSTM and 1D convolution",
      "Correlated pupil diameter to motion sickness inside cars"
    ]
  },
  {
    name: "Otto-von-Guericke University Magdeburg",
    logo: "/images/companies/ottovon.png",
    position: "Student Research Assistant",
    duration: "2021-2022",
    bullets: [
      "Developed DL solutions for detecting motion and blur in medical scans",
      "Supported supervised training pipelines on 2D and 3D volume",
      "Developed German Speech-to-text translation using deep learning"
    ]
  },
  {
    name: "DZNE",
    logo: "/images/companies/dzne.png",
    position: "Research Assistant",
    duration: "2020-2021",
    bullets: [
      "Created a video processing pipeline for speech assistance using CNNs",
      "Performed lip tracking and tongue segmentation (YOLO, FaceNet, MobileNet-V2)",
      "Developed 3D depth estimation and interactive FLASK frontend GUI"
    ]
  },
  {
    name: "Cognizant",
    logo: "/images/companies/cognizant.png",
    position: "Associate",
    duration: "2018-2019",
    bullets: [
      "Developed Web Services (APIs) for the Pharmacy Domain",
      "Created automated validation scripts for pre-deployment",
      "Prepared Functional and Technical Design Documents"
    ]
  },
  {
    name: "Ericsson",
    logo: "/images/companies/Ericsson.png",
    position: "Solution Integrator",
    duration: "2015-2018",
    bullets: [
      "Delivered telecom transformation integrations by building service/API layers",
      "Served as Onsite SPOC (Kuwait) for the TIBCO stream",
      "Coordinated incident triage and aligned offshore delivery"
    ]
  },
];

export default function Hero({ theme, setMode, setIsEasterEgg, isEasterEgg }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [clickedIndex, setClickedIndex] = useState(null);
  const [isReverseMorphing, setIsReverseMorphing] = useState(false);

  const clickTimer = useRef(null);
  const handleProfileClick = (e) => {
    if (clickTimer.current) {
      clearTimeout(clickTimer.current);
      clickTimer.current = null;
      setMode("dev");
    } else {
      clickTimer.current = setTimeout(() => {
        clickTimer.current = null;
        startReverseEasterEgg();
      }, 250);
    }
  };

  const startReverseEasterEgg = () => {
    setIsReverseMorphing(true);
    setIsEasterEgg(true);
    setTimeout(() => {
      setMode("ai");
      setTimeout(() => setIsEasterEgg(false), 500);
    }, 800);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.company-logo')) {
        setClickedIndex(null);
      }
    };
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  const fadeUp = (delay) => ({
    initial: { opacity: isEasterEgg ? 1 : 0, y: isEasterEgg ? 0 : 24 },
    animate: { opacity: isReverseMorphing ? 0 : 1, y: 0 },
    transition: { duration: isEasterEgg ? 0 : 0.7, delay: isEasterEgg ? 0 : delay, ease: [0.21, 0.6, 0.35, 1] },
  });

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-center px-6 md:px-10 pt-24 md:pt-28 pb-12 max-w-6xl mx-auto"
    >
      <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center w-full">
        {/* Left: editorial copy */}
        <div className="text-left">
          <motion.p {...fadeUp(0)} className="eyebrow mb-6">
            Budhaditya Mukhopadhyay — Munich, Germany
          </motion.p>

          <motion.h1
            {...fadeUp(0.1)}
            className="font-display font-medium text-4xl sm:text-5xl md:text-6xl lg:text-[64px] leading-[1.05] mb-6"
            style={{ color: "var(--text-primary)" }}
          >
            Building production AI —
            <br />
            <span style={{ color: "var(--text-secondary)" }}>
              from clinical edge models to autonomous drones.
            </span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.2)}
            className="text-base md:text-lg max-w-xl mb-8 leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            Senior AI Engineer at VisionHealth GmbH and Strategic Advisor at Weevils
            Drones. GenAI &amp; edge AI, computer vision, and 3 peer-reviewed
            publications in medical AI.
          </motion.p>

          <motion.p {...fadeUp(0.3)} className="font-mono-ui text-[11px] uppercase tracking-[0.2em] mb-8" style={{ color: "var(--text-secondary)" }}>
            PR holder · Open to relocation within Germany · EN / BN / HI / DE&nbsp;(B1 in prep)
          </motion.p>

          <motion.div {...fadeUp(0.4)} className="flex flex-wrap items-center gap-3">
            <button
              onClick={startReverseEasterEgg}
              className="btn-solid px-6 py-3 text-sm"
            >
              Ask my AI ↗
            </button>
            <a
              href="/cv.pdf"
              download="Budhaditya_Mukhopadhyay_CV.pdf"
              className="btn-ghost px-6 py-3 text-sm"
            >
              Download CV
            </a>
            <span className="flex items-center gap-2 ml-2">
              <a href={knowledge.contact.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                className="w-9 h-9 rounded-full border flex items-center justify-center transition hover:scale-110"
                style={{ borderColor: "var(--glass-border)", color: "var(--text-secondary)" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
              <a href={knowledge.contact.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"
                className="w-9 h-9 rounded-full border flex items-center justify-center transition hover:scale-110"
                style={{ borderColor: "var(--glass-border)", color: "var(--text-secondary)" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </a>
              <a href={knowledge.contact.scholar} target="_blank" rel="noopener noreferrer" aria-label="Google Scholar"
                className="w-9 h-9 rounded-full border flex items-center justify-center transition hover:scale-110"
                style={{ borderColor: "var(--glass-border)", color: "var(--text-secondary)" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z"/></svg>
              </a>
            </span>
          </motion.div>
        </div>

        {/* Right: portrait (keeps mode-switch easter eggs) */}
        <motion.img
          src="/images/photo.png"
          alt="Budhaditya Mukhopadhyay"
          onClick={handleProfileClick}
          initial={{ opacity: isEasterEgg ? 1 : 0, scale: isEasterEgg ? 1 : 0.96 }}
          animate={isReverseMorphing ? {
            scale: 0.5,
            opacity: 1
          } : { opacity: 1, scale: 1 }}
          transition={isReverseMorphing ? { duration: 0.8, ease: "easeInOut" } : { duration: 0.8, delay: isEasterEgg ? 0 : 0.25 }}
          className={`order-first lg:order-none w-40 h-40 sm:w-52 sm:h-52 lg:w-72 lg:h-72 rounded-2xl object-cover justify-self-start lg:justify-self-end border cursor-pointer transition-shadow hover:shadow-[0_0_40px_var(--accent-glow)] ${isReverseMorphing ? 'relative z-50 pointer-events-none' : ''}`}
          style={{ borderColor: "var(--hairline)" }}
        />
      </div>

      {/* Metric stat band */}
      <motion.div
        className="hairline-t mt-14 md:mt-16 pt-8 grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-8 w-full"
        initial={isEasterEgg ? "visible" : "hidden"}
        whileInView="visible"
        viewport={{ once: true }}
        animate={isReverseMorphing ? { opacity: 0 } : undefined}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
      >
        {knowledge.metrics.map((m, i) => (
          <motion.div
            key={i}
            variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0 } }}
            className="text-left"
          >
            <div className="font-display text-3xl md:text-4xl font-medium tracking-tight" style={{ color: "var(--text-primary)" }}>
              {m.value}
            </div>
            <div className="font-mono-ui text-[10px] uppercase tracking-[0.18em] mt-1.5" style={{ color: "var(--text-secondary)" }}>
              {m.label}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Company logos */}
      <motion.div
        className="hairline-t mt-10 pt-8 w-full"
        initial={isEasterEgg ? "visible" : "hidden"}
        animate={isReverseMorphing ? "exit" : "visible"}
        variants={{
          hidden: {},
          exit: { opacity: 0, transition: { duration: 0.4 } },
          visible: { transition: { staggerChildren: isEasterEgg ? 0 : 0.1 } },
        }}
      >
        <p className="eyebrow mb-5 text-left">Trusted by teams at</p>
        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          {companyData.map((company, idx) => (
            <motion.div
              key={idx}
              className="relative company-logo cursor-pointer group"
              style={{ zIndex: hoveredIndex === idx ? 60 : (clickedIndex === idx ? 50 : 10) }}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => setClickedIndex(idx === clickedIndex ? null : idx)}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 160, damping: 14 }}
              variants={{
                hidden: { opacity: 0, y: 14 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <img
                src={company.logo}
                alt={company.name}
                className="w-12 h-12 sm:w-14 sm:h-14 object-contain rounded-lg bg-white p-2 transition-all duration-300"
              />

              <AnimatePresence>
                {(hoveredIndex === idx || clickedIndex === idx) && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 text-left px-4 py-3 rounded-lg z-50 w-[240px] sm:w-[280px] md:w-[320px] max-w-[80vw] pointer-events-none border"
                    style={{ backgroundColor: "var(--bg-secondary)", color: "var(--text-primary)", borderColor: "var(--glass-border)", boxShadow: "0px 16px 40px rgba(0, 0, 0, 0.45)" }}
                  >
                    <div className="font-display font-semibold text-sm md:text-base pb-1 mb-2 hairline-b">
                      {company.name}
                    </div>
                    <div className="font-medium text-xs md:text-sm mb-1">{company.position}</div>
                    <div className="font-mono-ui text-[10px] uppercase tracking-widest mb-2" style={{ color: "var(--text-secondary)" }}>{company.duration}</div>

                    {company.bullets && (
                      <ul className="space-y-1 text-xs text-left" style={{ color: "var(--text-secondary)" }}>
                        {company.bullets.map((bullet, i) => (
                          <li key={i} className="flex gap-2"><span>—</span><span>{bullet}</span></li>
                        ))}
                      </ul>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
