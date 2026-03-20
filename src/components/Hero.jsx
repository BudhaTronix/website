import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

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
    position: "AI Engineer",
    duration: "2023-Present",
    bullets: [
      "Leading end-to-end ML systems for audio-based healthcare",
      "Designing and deploying on-device deep learning models",
      "Implementing AI models using TensorFlow.js and React Native"
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

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-center items-center text-center px-6 md:px-10 lg:px-16 pt-24 md:pt-24 lg:pt-30 transition-colors"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      {/* Hero Name */}
      <motion.h1
        initial={{ opacity: isEasterEgg ? 1 : 0, y: isEasterEgg ? 0 : 30 }}
        animate={isReverseMorphing ? {
          y: 60,
          scale: 0.9,
          opacity: 1
        } : { opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: isReverseMorphing ? 0.8 : (isEasterEgg ? 0 : 0.8), ease: "easeInOut" }}
        className={`text-3xl sm:text-4xl md:text-6xl lg:text-6xl font-bold leading-tight ${isReverseMorphing ? 'relative z-50 pointer-events-none' : ''}`}
        style={{ color: "var(--text-primary)" }}
      >
        {isReverseMorphing ? "Hello, I'm" : "Hi, I'm"} <span style={{ color: "var(--accent)" }}>Budhaditya{isReverseMorphing ? "" : " Mukhopadhyay"}</span>
      </motion.h1>

      {/* Profile Picture */}
      <motion.img
        src="/images/ProfilePicture.png"
        alt="Profile Picture"
        onClick={handleProfileClick}
        initial={{ opacity: 1, scale: 1 }}
        animate={isReverseMorphing ? {
          scale: 0.35,
          y: -40,
          opacity: 1
        } : { opacity: 1, scale: 1, y: 0 }}
        transition={isReverseMorphing ? { duration: 0.8, ease: "easeInOut" } : { duration: 0.8 }}
        className={`w-40 h-40 sm:w-56 sm:h-56 md:w-80 md:h-80 lg:w-83 lg:h-83 rounded-full object-cover mt-6 md:mt-8 mb-6 md:mb-8 border-4 shadow-lg cursor-pointer hover:shadow-[0_0_30px_var(--accent-glow)] transition-shadow ${isReverseMorphing ? 'relative z-50 pointer-events-none' : ''}`}
        style={{ borderColor: "var(--accent)" }}
      />

      {/* Title */}
      <motion.p
        initial={{ opacity: isEasterEgg ? 1 : 0 }}
        animate={{ opacity: isReverseMorphing ? 0 : 1 }}
        transition={{ duration: isReverseMorphing ? 0.4 : (isEasterEgg ? 0 : 0.8), delay: isEasterEgg ? 0 : 0.7 }}
        className="text-base md:text-xl lg:text-2xl mb-8 md:mb-12"
        style={{ color: "var(--text-secondary)" }}
      >
        AI Engineer • Strategic Advisor • Python Dev
      </motion.p>

      {/* Company Logos */}
      <motion.div
        className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 mb-16 md:mb-20"
        initial={isEasterEgg ? "visible" : "hidden"}
        animate={isReverseMorphing ? "exit" : "visible"}
        variants={{
          hidden: {},
          exit: { opacity: 0, transition: { duration: 0.4 } },
          visible: { transition: { staggerChildren: isEasterEgg ? 0 : 0.2 } },
        }}
      >
        {companyData.map((company, idx) => (
          <motion.div
            key={idx}
            className="relative company-logo cursor-pointer group"
            style={{ zIndex: hoveredIndex === idx ? 60 : (clickedIndex === idx ? 50 : 10) }}
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => setClickedIndex(idx === clickedIndex ? null : idx)}
            whileHover={{ scale: 1.1, y: -5 }}
            transition={{ type: "spring", stiffness: 120, damping: 12 }}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 0.7, y: 0 },
            }}
          >
            <img
              src={company.logo}
              alt={company.name}
              className="w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 object-contain rounded-md shadow-md bg-white p-2 brightness-100 opacity-100"
            />

            <AnimatePresence>
              {(hoveredIndex === idx || clickedIndex === idx) && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 text-left px-4 py-3 rounded-lg shadow-2xl z-50 w-[240px] sm:w-[280px] md:w-[320px] max-w-[80vw] pointer-events-none"
                  style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)", border: "1px solid var(--accent)", boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.5)" }}
                >
                  <div className="font-bold text-sm md:text-base border-b pb-1 mb-2" style={{ borderColor: "var(--glass-border)", color: "var(--accent)" }}>
                    {company.name}
                  </div>
                  <div className="font-medium text-xs md:text-sm mb-1">{company.position}</div>
                  <div className="text-[10px] md:text-xs mb-2 italic" style={{ color: "var(--text-secondary)" }}>{company.duration}</div>
                  
                  {company.bullets && (
                    <ul className="list-disc pl-4 space-y-1 text-xs text-left" style={{ color: "var(--text-primary)" }}>
                      {company.bullets.map((bullet, i) => (
                        <li key={i}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}