import { useState, useEffect } from "react";
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
        className="mt-10 inline-block text-white px-6 py-3 rounded-lg hover:opacity-90 transition shadow-lg"
        style={{ backgroundColor: "var(--accent)" }}
      >
        View More on Flickr →
      </a>
    </div>
  );

  return (
    <section id="projects" className="py-20 px-6 text-center transition-colors">
      <h2 className="font-display text-3xl md:text-5xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
        Projects &amp; <span className="gradient-text">Expertise</span>
      </h2>
      <p className="mb-12 max-w-2xl mx-auto text-sm md:text-base" style={{ color: "var(--text-secondary)" }}>
        Recent GenAI builds — all open source on GitHub — plus my research and creative work.
      </p>

      {/* GenAI project grid */}
      <div className="grid sm:grid-cols-2 gap-6 max-w-5xl mx-auto mb-16 text-left">
        {knowledge.projects.map((p, idx) => (
          <Reveal key={p.name} delay={idx * 0.07}>
            <div className="glow-card p-6 h-full flex flex-col">
              <div className="flex items-start justify-between gap-3 mb-2">
                <h3 className="font-display text-xl font-bold" style={{ color: "var(--text-primary)" }}>{p.name}</h3>
                <span
                  className="shrink-0 px-2.5 py-0.5 rounded-full text-[11px] font-semibold text-white"
                  style={{ background: "var(--gradient-accent)" }}
                >
                  {p.tag}
                </span>
              </div>
              <p className="text-sm leading-relaxed mb-4 flex-1" style={{ color: "var(--text-secondary)" }}>
                {p.description}
              </p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {p.stack.map((s, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-0.5 rounded-full text-[11px] border"
                    style={{ backgroundColor: "var(--glass-bg)", borderColor: "var(--glass-border)", color: "var(--text-secondary)" }}
                  >
                    {s}
                  </span>
                ))}
              </div>
              <a
                href={p.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold self-start transition hover:translate-x-1"
                style={{ color: "var(--accent)" }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                View on GitHub →
              </a>
            </div>
          </Reveal>
        ))}
      </div>

      <h3 className="font-display text-xl md:text-2xl font-semibold mb-8" style={{ color: "var(--text-primary)" }}>
        More of my work
      </h3>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
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
                className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 text-white text-sm px-3 py-2 rounded-lg shadow-lg whitespace-nowrap z-10"
                style={{ backgroundColor: "var(--ai-bubble-bg)", border: "1px solid var(--glass-border)", color: "var(--text-primary)" }}
              >
                {card.hoverText}
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {activeCard && (
          <motion.div
            key={activeCard}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex flex-col p-8 overflow-auto backdrop-blur-xl"
            style={{ backgroundColor: "var(--bg-primary)" }}
          >
            <button
              className="self-end text-white px-4 py-2 rounded-lg mb-6 hover:opacity-90 transition"
              style={{ backgroundColor: "var(--accent)" }}
              onClick={() => setActiveCard(null)}
            >
              Close
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
                        <span key={i} className="text-white px-3 py-1 rounded-full text-sm" style={{ backgroundColor: "var(--accent)" }}>
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
                          className="text-white px-4 py-2 rounded-lg hover:opacity-90 transition"
                          style={{ backgroundColor: "var(--accent)" }}
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
      </AnimatePresence>
    </section>
  );
}
