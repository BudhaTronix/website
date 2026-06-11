import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import knowledge from "../data/knowledge.json";
import Reveal from "./ui/Reveal";

export default function Projects({ theme }) {
  const [activeCard, setActiveCard] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    if (activeCard !== "photography") return;

    const loadPhotos = async () => {
      try {
        const proxyUrl = "https://api.allorigins.win/raw?url=";
        const flickrUrl =
          "https://www.flickr.com/services/feeds/photos_public.gne?id=203002715@N07&format=json&nojsoncallback=1";

        const res = await fetch(proxyUrl + encodeURIComponent(flickrUrl));
        const data = await res.json();
        setPhotos(data.items.slice(0, 20));
      } catch (err) {
        console.error("Error fetching images:", err);
      }
    };

    loadPhotos();
  }, [activeCard]);

  useEffect(() => {
    if (activeCard || lightboxIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [activeCard, lightboxIndex]);

  // Escape closes the lightbox first, then the modal
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key !== "Escape") return;
      if (lightboxIndex !== null) {
        setLightboxIndex(null);
      } else if (activeCard) {
        setActiveCard(null);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeCard, lightboxIndex]);

  const projects = [
    {
      name: "Weakly Supervised Tumour Detection in Liver using Deep Learning",
      desc: [
        "Project under: Prof. Dr Andreas Nürnberger; Supervisors: M.Sc. Soumick Chatterjee and Dr Naghmeh Mahmoodian",
        "Working on MRI and CT of Liver to detect tumour followed by cancer detection",
        "Training neural network from scratch using CHAOS dataset",
        "Using knowledge distillation to implement semi-supervised learning",
        "Using ANTsPy and 3DSlicer to perform intermodal image registration (CT to MRI)",
        "Packages and APIs used: Scikit-learn, ANTsPy, PyTorch, OpenCV, TorchIO",
      ],
      skills: ["Data Analysis", "Data Science", "Unsupervised Learning", "Deep Neural networks(DNN)", "Linux"],
      link: "https://github.com/BudhaTronix/Weakly-Supervised-Tumour-Detection",
    },
    {
      name: "Interpretability Techniques for Deep Learning based Segmentation Models",
      desc: [
        "Project under: Prof. Dr Andreas Nürnberger; Supervisor: M.Sc. Soumick Chatterjee",
        "Working on explainable AI using Captum models and custom-made models",
        "Creating a one-stop package for all possible explainability models and creating a pipeline for the same",
        "Packages and APIs used: PyTorch, Keras, TensorFlow, Captum, TorchRay",
        "Project abstract published in ISMRM 2021",
      ],
      skills: ["Data Analysis", "Data Science", "TensorFlow", "Deep Neural networks(DNN)", "Linux"],
      link: "https://www.mdpi.com/2076-3417/12/4/1834",
    },
    {
      name: "Error Classification using Deep Learning",
      desc: [
        "Project under: Prof. Dr Sebastian Stober; Supervisor: PhD Andreas Krug",
        "Creating front end web interface using Node.js for helping users to classify a misclassified instance correctly",
        "Can be used by any industry to display images that are misclassified by a neural network and extend functionality to re-train the model with the new correctly classified image data",
        "Creating backend APIs using FLASK",
        "Using transfer learning and model finetuning to train the model on new correctly classified images from ObjectNet",
        "Using Explainable AI to interpret the results of misclassification of a model",
        "Packages and APIs used: TensorFlow-GPU, PyTorch, OpenCV, Captum",
      ],
      skills: ["Data Analysis", "Data Science", "Microsoft Office", "TensorFlow", "Unsupervised Learning", "Deep Neural networks(DNN)", "Linux"],
      link: "https://github.com/BudhaTronix/Classification-Error-Explorer",
    },
    {
      name: "Simulation Project (Road Traffic Simulation)",
      desc: [
        "Project with Otto Von Guericke University and City Government of Magdeburg",
        "Project under: Dr.-Ing. Claudia Krull",
        "Emulating a road intersection layout in Magdeburg into a simplified conceptual model",
        "Developing a simulation program on the software AnyLogic",
      ],
      skills: ["Data Analysis", "Unified Modeling Language (UML)", "Microsoft Office"],
      link: "",
    },
  ];

  const dronesAutomation = {
    description: ["Associated with an Indian Startup, Weevils Drones as their Strategic Advisor & AI Engineer."],
    bullets: [
      "Leading the project <i>GANDIVA</i>, an Anti-Drone System based on using kamikaze drones assisted by a complex AI/ML structure to intercept and neutralize intruder drones.",
      "Deployed a User Interface to control up to 8 drones autonomously using a Ground Control Station (GCS) in Master-Slave configuration.",
      "Working to establish autonomous communication between the Ground Control System and Drones using PymavLink and Python.",
    ],
    subheading: "Sound knowledge of:",
    subbullets: ["Flight Controllers – Orange Cube, Blitz H7 Pro", "GPS – Here3+, Here4, RTK Units", "Data Radio Module – P900 Telemetry"],
  };

  const cards = [
    { id: "projects", title: "Research & Academic Projects", hoverText: "Medical imaging, XAI, and deep learning research" },
    { id: "drones", title: "Drones & Automation", hoverText: "My work on drone technology" },
    { id: "photography", title: "Photography", hoverText: "Sneak peek of my photography skills" },
  ];

  const [palette, setPalette] = useState({});

  const extractDominantColor = (imgEl, index) => {
    try {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = imgEl.width;
      canvas.height = imgEl.height;
      ctx.drawImage(imgEl, 0, 0);

      const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
      let r = 0,
        g = 0,
        b = 0;

      for (let i = 0; i < data.length; i += 4 * 500) {
        r += data[i];
        g += data[i + 1];
        b += data[i + 2];
      }

      r = Math.round(r / (data.length / 4 / 500));
      g = Math.round(g / (data.length / 4 / 500));
      b = Math.round(b / (data.length / 4 / 500));

      setPalette((prev) => ({
        ...prev,
        [index]: `rgb(${r}, ${g}, ${b})`,
      }));
    } catch (err) {
      console.log("Palette error:", err);
    }
  };

  const PhotographySection = () => (
    <div className="max-w-6xl mx-auto text-left">
      <h3 className="text-3xl font-semibold mb-8 tracking-wide" style={{ color: "var(--text-primary)" }}>
        Photography Album
      </h3>

      {photos.length === 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array(12)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="rounded-xl animate-pulse h-48" style={{ backgroundColor: "var(--bg-secondary)" }} />
            ))}
        </div>
      ) : (
        <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 space-y-4">
          {photos.map((photo, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="relative rounded-xl overflow-hidden shadow-lg cursor-pointer break-inside-avoid group"
              onClick={() => setLightboxIndex(i)}
            >
              <img
                src={photo.media.m}
                alt={photo.title}
                className="w-full rounded-xl object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                onLoad={(e) => extractDominantColor(e.target, i)}
              />

              {palette[i] && (
                <div
                  className="absolute bottom-0 left-0 right-0 h-20 opacity-70 pointer-events-none"
                  style={{
                    background: `linear-gradient(to top, ${palette[i]}, transparent)`,
                  }}
                />
              )}
            </motion.div>
          ))}
        </div>
      )}

      <a
        href="https://www.flickr.com/photos/203002715@N07/with/54860413158"
        target="_blank"
        rel="noopener noreferrer"
        className="btn-solid mt-10 inline-block px-6 py-3 text-sm"
      >
        View More on Flickr →
      </a>
    </div>
  );

  return (
    <section id="projects" className="py-24 px-6 md:px-10 max-w-6xl mx-auto text-left transition-colors">
      <Reveal>
        <p className="eyebrow mb-4">02 — Selected work</p>
        <h2 className="font-display font-medium text-3xl md:text-5xl tracking-tight mb-4" style={{ color: "var(--text-primary)" }}>
          Projects <span style={{ color: "var(--text-secondary)" }}>&amp; expertise</span>
        </h2>
        <p className="mb-14 max-w-xl text-sm md:text-base" style={{ color: "var(--text-secondary)" }}>
          Recent GenAI builds — all open source on GitHub — plus research and creative work.
        </p>
      </Reveal>

      {/* GenAI case-study rows */}
      <div className="mb-20">
        {knowledge.projects.map((p, idx) => (
          <Reveal key={p.name}>
            <a
              href={p.github}
              target="_blank"
              rel="noopener noreferrer"
              className="case-row group block py-8 md:py-9 grid md:grid-cols-[200px_1fr_auto] gap-4 md:gap-10 items-start"
            >
              <div className="font-mono-ui text-[11px] uppercase tracking-[0.18em] pt-1.5" style={{ color: "var(--text-secondary)" }}>
                {String(idx + 1).padStart(2, "0")} · {p.tag}
              </div>
              <div>
                <h3 className="font-display font-medium text-xl md:text-2xl mb-2 transition-transform duration-300 group-hover:translate-x-1" style={{ color: "var(--text-primary)" }}>
                  {p.name}
                </h3>
                <p className="text-sm md:text-[15px] leading-relaxed max-w-2xl mb-3" style={{ color: "var(--text-secondary)" }}>
                  {p.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {p.stack.map((s, i) => (
                    <span
                      key={i}
                      className="font-mono-ui px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider border"
                      style={{ borderColor: "var(--glass-border)", color: "var(--text-secondary)" }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div
                className="hidden md:flex w-10 h-10 rounded-full border items-center justify-center transition-all duration-300 group-hover:rotate-45"
                style={{ borderColor: "var(--glass-border)", color: "var(--text-primary)" }}
              >
                ↗
              </div>
            </a>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <p className="eyebrow mb-8">More of my work</p>
      </Reveal>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
        {cards.map((card, idx) => (
          <motion.div
            key={card.id}
            className="glow-card relative p-6 shadow-md cursor-pointer flex flex-col justify-center items-center transition"
            onClick={() => setActiveCard(card.id)}
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 120, damping: 12 }}
          >
            <h3 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>{card.title}</h3>

            {hoveredIndex === idx && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 text-sm px-3 py-2 rounded-lg shadow-lg whitespace-nowrap z-10"
                style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--glass-border)", color: "var(--text-primary)" }}
              >
                {card.hoverText}
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {createPortal(
      <AnimatePresence>
        {activeCard && (
          <motion.div
            key={activeCard}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] flex flex-col px-6 md:px-8 pb-8 pt-20 overflow-auto backdrop-blur-xl"
            style={{ backgroundColor: "var(--bg-primary)" }}
          >
            <button
              className="btn-solid fixed top-5 right-6 z-30 px-5 py-2 text-sm"
              onClick={() => setActiveCard(null)}
            >
              Close ✕
            </button>

            {activeCard === "projects" && (
              <div className="flex flex-col gap-8 max-w-5xl mx-auto">
                {projects.map((p, idx) => (
                  <div key={idx} className="p-6 rounded-2xl shadow-md text-left transition" style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--glass-border)" }}>
                    <h4 className="text-2xl font-semibold mb-3" style={{ color: "var(--text-primary)" }}>{p.name}</h4>
                    <ul className="list-disc list-inside mb-3 space-y-1" style={{ color: "var(--text-secondary)" }}>
                      {p.desc.map((d, i) => (
                        <li key={i}>{d}</li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {p.skills.map((s, i) => (
                        <span key={i} className="font-mono-ui px-3 py-1 rounded-full text-[11px] uppercase tracking-wider border" style={{ borderColor: "var(--glass-border)", color: "var(--text-secondary)" }}>
                          {s}
                        </span>
                      ))}
                    </div>
                    {p.link && (
                      <div className="flex justify-end mt-4">
                        <a
                          href={p.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-solid px-5 py-2 text-sm"
                        >
                          View Project
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {activeCard === "photography" && <PhotographySection />}

            {activeCard === "drones" && (
              <motion.div
                className="text-left max-w-4xl mx-auto p-4 rounded-2xl shadow-lg space-y-6"
                style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--glass-border)" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
              >
                <p className="mb-4" style={{ color: "var(--text-secondary)" }}>{dronesAutomation.description}</p>

                <ul className="space-y-3">
                  {dronesAutomation.bullets.map((item, idx) => (
                    <motion.li
                      key={idx}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <span className="font-bold" style={{ color: "var(--accent)" }}>•</span>
                      <span style={{ color: "var(--text-secondary)" }} dangerouslySetInnerHTML={{ __html: item }} />
                    </motion.li>
                  ))}
                </ul>

                <h4 className="font-semibold mt-4" style={{ color: "var(--text-primary)" }}>{dronesAutomation.subheading}</h4>

                <div className="flex flex-wrap gap-2 mt-2">
                  {dronesAutomation.subbullets.map((item, idx) => (
                    <span key={idx} className="px-3 py-1 rounded-full text-sm" style={{ backgroundColor: "var(--ai-bubble-bg)", color: "var(--text-primary)" }}>
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}

            {lightboxIndex !== null && (
              <motion.div
                className="fixed inset-0 bg-black/95 z-[999] flex items-center justify-center p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setLightboxIndex(null)}
              >
                <motion.img
                  key={lightboxIndex}
                  src={photos[lightboxIndex].media.m.replace("_m", "_b")}
                  className="max-h-[90vh] max-w-[90vw] object-contain rounded-xl"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 120, damping: 15 }}
                  onClick={(e) => e.stopPropagation()}
                />

                {lightboxIndex > 0 && (
                  <button
                    className="absolute left-4 text-white text-4xl"
                    onClick={(e) => {
                      e.stopPropagation();
                      setLightboxIndex((i) => i - 1);
                    }}
                  >
                    ‹
                  </button>
                )}

                {lightboxIndex < photos.length - 1 && (
                  <button
                    className="absolute right-4 text-white text-4xl"
                    onClick={(e) => {
                      e.stopPropagation();
                      setLightboxIndex((i) => i + 1);
                    }}
                  >
                    ›
                  </button>
                )}
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>,
      document.body
      )}
    </section>
  );
}
