import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "./ui/Reveal";

export default function MoreWork({ theme }) {
  const [activeCard, setActiveCard] = useState(null);
  const [activeDroneProject, setActiveDroneProject] = useState(null);
  const [activeResearchProject, setActiveResearchProject] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(null);

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
      } else if (activeDroneProject) {
        setActiveDroneProject(null);
      } else if (activeResearchProject) {
        setActiveResearchProject(null);
      } else if (activeCard) {
        setActiveCard(null);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeCard, activeDroneProject, activeResearchProject, lightboxIndex]);

  const projects = [
    {
      id: "tumour-detection",
      name: "Weakly Supervised Tumour Detection in Liver using Deep Learning",
      eyebrow: "Medical imaging research",
      summary:
        "A weakly supervised liver tumour detection workflow for MRI and CT data, built around registration, deep learning, and semi-supervised training.",
      role: "Built a research pipeline for detecting liver tumours from cross-modal medical imaging data.",
      stack: ["PyTorch", "OpenCV", "TorchIO", "ANTsPy", "3D Slicer", "CHAOS dataset"],
      highlights: [
        "Worked under Prof. Dr Andreas Nurnberger with supervision from M.Sc. Soumick Chatterjee and Dr Naghmeh Mahmoodian.",
        "Processed liver MRI and CT scans with tumour detection as the downstream clinical task.",
        "Used ANTsPy and 3D Slicer for intermodal image registration from CT to MRI.",
        "Trained neural networks from scratch on CHAOS data and explored knowledge distillation for semi-supervised learning.",
      ],
      metrics: ["Domain: liver MRI and CT", "Learning setup: weak and semi-supervised", "Output: tumour localization workflow"],
      diagram: ["MRI / CT scans", "Registration", "Preprocessing", "Model training", "Tumour signal"],
      link: "https://github.com/BudhaTronix/Weakly-Supervised-Tumour-Detection",
    },
    {
      id: "xai-segmentation",
      name: "Interpretability Techniques for Deep Learning based Segmentation Models",
      eyebrow: "Explainable AI research",
      summary:
        "A research package and pipeline for interpreting segmentation models using attribution methods and custom explainability workflows.",
      role: "Designed an explainability layer for deep learning segmentation models.",
      stack: ["PyTorch", "Keras", "TensorFlow", "Captum", "TorchRay", "XAI"],
      highlights: [
        "Worked under Prof. Dr Andreas Nurnberger with supervision from M.Sc. Soumick Chatterjee.",
        "Evaluated explainable AI methods using Captum, TorchRay, and custom-built interpretation models.",
        "Built toward a one-stop package that can run multiple interpretability methods through a consistent pipeline.",
        "The project abstract was published in ISMRM 2021.",
      ],
      metrics: ["Domain: segmentation explainability", "Methods: attribution and saliency", "Publication: ISMRM 2021 abstract"],
      diagram: ["Segmentation model", "Attribution method", "Heatmap output", "Pipeline wrapper", "Research report"],
      link: "https://www.mdpi.com/2076-3417/12/4/1834",
    },
    {
      id: "classification-error-explorer",
      name: "Error Classification using Deep Learning",
      eyebrow: "Human-in-the-loop AI",
      summary:
        "A web interface for inspecting misclassified images, correcting model errors, and feeding the corrected samples back into model fine-tuning.",
      role: "Built an error-analysis tool for diagnosing and improving image classification models.",
      stack: ["Node.js", "Flask", "TensorFlow-GPU", "PyTorch", "OpenCV", "Captum"],
      highlights: [
        "Worked under Prof. Dr Sebastian Stober with supervision from PhD Andreas Krug.",
        "Created a frontend interface that helps users inspect and correctly label misclassified instances.",
        "Implemented backend APIs in Flask and used ObjectNet data for transfer learning and fine-tuning experiments.",
        "Used explainable AI to interpret why a model produced incorrect classifications.",
      ],
      metrics: ["Data: ObjectNet", "Loop: inspect, relabel, retrain", "Goal: reduce model error through human feedback"],
      diagram: ["Misclassified image", "Web review UI", "XAI signal", "Correct label", "Fine-tuned model"],
      link: "https://github.com/BudhaTronix/Classification-Error-Explorer",
    },
    {
      id: "traffic-simulation",
      name: "Simulation Project (Road Traffic Simulation)",
      eyebrow: "Urban systems simulation",
      summary:
        "A simplified AnyLogic model of a Magdeburg road intersection created for traffic scenario exploration with academic and city-government stakeholders.",
      role: "Translated a real road intersection into a conceptual simulation model.",
      stack: ["AnyLogic", "UML", "Simulation modelling", "Data analysis", "Scenario testing"],
      highlights: [
        "Project with Otto von Guericke University and the City Government of Magdeburg.",
        "Worked under Dr.-Ing. Claudia Krull.",
        "Converted an intersection layout in Magdeburg into a simplified conceptual model.",
        "Developed the simulation program in AnyLogic for traffic-flow exploration.",
      ],
      metrics: ["Domain: road traffic", "Model type: conceptual intersection model", "Tooling: AnyLogic simulation"],
      diagram: ["Intersection layout", "Conceptual model", "AnyLogic agents", "Scenario run", "Traffic insight"],
      link: "",
    },
  ];

  const droneProjects = [
    {
      id: "fusioncore",
      name: "FusionCore",
      eyebrow: "Assignment and dispatch core",
      summary:
        "A Python communication layer that ingests radar telemetry, keeps an active intruder picture, and assigns intercept work to available GCS nodes.",
      role: "Decision layer for the Weevilsdrone counter-drone stack.",
      stack: ["Python", "MQTT", "ZeroMQ", "SQLite", "Threaded telemetry"],
      highlights: [
        "Subscribes to radar drone update batches, normalizes latitude, longitude, altitude, speed, bearing, and timestamp data, then stores the latest intruder state.",
        "Runs an assignment engine that emits INTERCEPT commands for selected GCS nodes, with a prototype path from single-GCS operation to multi-GCS proximity matching.",
        "Includes a telemetry publisher and SQLite-backed simulator for exercising drone position updates and GCS registration flows before hardware is connected.",
        "Designed to pair with latch, allocation, neutralization, and fleet-summary feedback coming from the GCS layer.",
      ],
      metrics: ["Radar input: MQTT batches", "Dispatch: ZMQ PUB on port 5556", "Prototype loop: 1 Hz assignments"],
      diagram: ["Radar feed", "MQTT ingest", "Intruder state", "Assignment engine", "ZMQ dispatch"],
    },
    {
      id: "gcs",
      name: "GCS: Ground Control Station",
      eyebrow: "MAVLink execution layer",
      summary:
        "A headless Python GCS that receives FusionCore assignments, picks the nearest free defender, and flies the MAVLink intercept sequence.",
      role: "Execution layer between FusionCore and physical or simulated defender drones.",
      stack: ["Python", "pymavlink", "ZeroMQ", "SITL", "Docker"],
      highlights: [
        "Receives INTERCEPT assignments on a ZMQ subscriber and reports GCS_LATCH plus ALLOCATION feedback through a push socket.",
        "Supports SITL TCP links and real shared serial links using port:sysid addressing, with defenders exposed as DEF_{sysid}.",
        "Selects the closest idle defender by haversine distance, then runs ARM, TAKEOFF, chase, precision engagement, neutralization, and RTL.",
        "Tracks recent intruder history for short-horizon position prediction and prints mission timing metrics after a successful intercept.",
      ],
      metrics: ["Feedback: latch and allocation events", "Neutralization threshold: 5 m", "Drone links: TCP SITL or serial MAVLink"],
      diagram: ["FusionCore", "GCS allocator", "MAVLink hub", "Defender drone", "RTL feedback"],
    },
    {
      id: "iff",
      name: "LoRaIFF",
      eyebrow: "Authenticated telemetry layer",
      summary:
        "A minimal Identification Friend or Foe system using LoRa radio, MAVLink position data, and HMAC-SHA256 packet authentication.",
      role: "Friend-or-foe telemetry layer for live drone tracking.",
      stack: ["ESP32 C++", "LoRa 433 MHz", "MAVLink", "HMAC-SHA256", "FastAPI", "Leaflet"],
      highlights: [
        "The drone ESP32 reads GLOBAL_POSITION_INT from the flight controller, packs raw MAVLink integers, signs the payload, and transmits a compact LoRa frame.",
        "Ground reception supports either an ESP32 LoRa-to-USB bridge or direct SX1268 SPI reception on a Raspberry Pi.",
        "The Pi receiver verifies per-drone HMAC keys, rejects replayed timestamps, and classifies packets as FRIEND, SPOOF, UNKNOWN, or REPLAY.",
        "A FastAPI backend serves a live Leaflet map with status-colored markers and stale-track pruning.",
      ],
      metrics: ["Air packet: 25 bytes", "RF profile: 433 MHz, 125 kHz BW, SF9", "Ground UI: FastAPI GET /data"],
      diagram: ["Flight controller", "ESP32 signer", "LoRa packet", "Pi auth", "Map UI"],
    },
  ];

  const cards = [
    { id: "projects", title: "Research & Academic Projects", hoverText: "Medical imaging, XAI, and deep learning research" },
    { id: "drones", title: "Drones & Automation", hoverText: "My work on drone technology" },
    { id: "photography", title: "Photography", hoverText: "Sneak peek of my photography skills" },
  ];

  const photographyPhotos = Array.from({ length: 47 }, (_, index) => {
    const number = String(index + 1).padStart(2, "0");
    return {
      thumb: `/photography/thumbs/photo-${number}.jpg`,
      full: `/photography/large/photo-${number}.jpg`,
      alt: `Photography ${number}`,
    };
  });

  const selectedResearchProject = projects.find((project) => project.id === activeResearchProject);
  const selectedDroneProject = droneProjects.find((project) => project.id === activeDroneProject);

  const PhotographySection = () => (
    <div className="max-w-6xl mx-auto text-left">
      <p className="eyebrow mb-4">Photography</p>
      <h3 className="font-display font-medium text-3xl md:text-5xl tracking-tight mb-4" style={{ color: "var(--text-primary)" }}>
        Selected frames
      </h3>
      <p className="max-w-2xl text-sm md:text-base leading-relaxed mb-10" style={{ color: "var(--text-secondary)" }}>
        Travel, street, architecture, and quiet details from the road.
      </p>

      <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 space-y-4">
        {photographyPhotos.map((photo, i) => (
          <motion.button
            key={photo.thumb}
            type="button"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: Math.min(i * 0.015, 0.45) }}
            className="relative block w-full break-inside-avoid overflow-hidden rounded-lg border cursor-pointer group"
            style={{ borderColor: "var(--glass-border)", backgroundColor: "var(--bg-secondary)" }}
            onClick={() => setLightboxIndex(i)}
          >
            <img
              src={photo.thumb}
              alt={photo.alt}
              loading="lazy"
              decoding="async"
              className="w-full rounded-lg object-cover transition-transform duration-500 group-hover:scale-[1.025]"
            />
          </motion.button>
        ))}
      </div>
    </div>
  );

  const DroneProjectDiagram = ({ project }) => (
    <div className="rounded-xl border p-4" style={{ borderColor: "var(--glass-border)", backgroundColor: "var(--glass-bg)" }}>
      <p className="font-mono-ui text-[11px] uppercase tracking-[0.2em] mb-4" style={{ color: "var(--text-secondary)" }}>
        Project diagram
      </p>
      <div className="grid gap-3 md:grid-cols-5">
        {project.diagram.map((step, idx) => (
          <div key={step} className="relative min-h-[112px] rounded-lg border p-3 flex flex-col justify-between" style={{ borderColor: "var(--glass-border)", backgroundColor: "var(--bg-secondary)" }}>
            <div className="font-mono-ui text-[10px] uppercase tracking-[0.16em]" style={{ color: "var(--text-secondary)" }}>
              {String(idx + 1).padStart(2, "0")}
            </div>
            <div className="text-sm font-semibold leading-snug" style={{ color: "var(--text-primary)" }}>
              {step}
            </div>
            {idx < project.diagram.length - 1 && (
              <div className="hidden md:block absolute top-1/2 -right-3 w-3 h-px" style={{ backgroundColor: "var(--accent-2)" }} />
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const DroneProjectDetail = ({ project }) => (
    <motion.div
      key={project.id}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 18 }}
      transition={{ duration: 0.25 }}
      className="w-full"
    >
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5 mb-8">
        <div className="max-w-3xl">
          <p className="eyebrow mb-4">{project.eyebrow}</p>
          <h3 className="font-display font-medium text-3xl md:text-5xl tracking-tight mb-4" style={{ color: "var(--text-primary)" }}>
            {project.name}
          </h3>
          <p className="text-sm md:text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            {project.summary}
          </p>
        </div>
        <button
          className="btn-ghost px-5 py-2 text-sm self-start"
          onClick={() => setActiveDroneProject(null)}
        >
          Back to projects
        </button>
      </div>

      <div className="grid lg:grid-cols-[1.08fr_0.92fr] gap-6">
        <div className="rounded-xl border p-5 md:p-6" style={{ borderColor: "var(--glass-border)", backgroundColor: "var(--glass-bg)" }}>
          <p className="font-mono-ui text-[11px] uppercase tracking-[0.2em] mb-3" style={{ color: "var(--text-secondary)" }}>
            What it does
          </p>
          <p className="text-base md:text-lg leading-relaxed mb-6" style={{ color: "var(--text-primary)" }}>
            {project.role}
          </p>
          <ul className="space-y-4">
            {project.highlights.map((item, idx) => (
              <li key={idx} className="grid grid-cols-[28px_1fr] gap-3">
                <span className="font-mono-ui text-xs pt-0.5" style={{ color: "var(--text-secondary)" }}>
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <span className="text-sm md:text-[15px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <DroneProjectDiagram project={project} />
          <div className="rounded-xl border p-4" style={{ borderColor: "var(--glass-border)", backgroundColor: "var(--glass-bg)" }}>
            <p className="font-mono-ui text-[11px] uppercase tracking-[0.2em] mb-4" style={{ color: "var(--text-secondary)" }}>
              Stack
            </p>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((item) => (
                <span key={item} className="font-mono-ui px-3 py-1.5 rounded-full text-[10px] uppercase tracking-wider border" style={{ borderColor: "var(--glass-border)", color: "var(--text-secondary)" }}>
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-xl border p-4" style={{ borderColor: "var(--glass-border)", backgroundColor: "var(--glass-bg)" }}>
            <p className="font-mono-ui text-[11px] uppercase tracking-[0.2em] mb-4" style={{ color: "var(--text-secondary)" }}>
              Signals
            </p>
            <ul className="space-y-2">
              {project.metrics.map((metric) => (
                <li key={metric} className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {metric}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const ResearchProjectDetail = ({ project }) => (
    <motion.div
      key={project.id}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 18 }}
      transition={{ duration: 0.25 }}
      className="w-full"
    >
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5 mb-8">
        <div className="max-w-3xl">
          <p className="eyebrow mb-4">{project.eyebrow}</p>
          <h3 className="font-display font-medium text-3xl md:text-5xl tracking-tight mb-4" style={{ color: "var(--text-primary)" }}>
            {project.name}
          </h3>
          <p className="text-sm md:text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            {project.summary}
          </p>
        </div>
        <button
          className="btn-ghost px-5 py-2 text-sm self-start"
          onClick={() => setActiveResearchProject(null)}
        >
          Back to projects
        </button>
      </div>

      <div className="grid lg:grid-cols-[1.08fr_0.92fr] gap-6">
        <div className="rounded-xl border p-5 md:p-6" style={{ borderColor: "var(--glass-border)", backgroundColor: "var(--glass-bg)" }}>
          <p className="font-mono-ui text-[11px] uppercase tracking-[0.2em] mb-3" style={{ color: "var(--text-secondary)" }}>
            What it does
          </p>
          <p className="text-base md:text-lg leading-relaxed mb-6" style={{ color: "var(--text-primary)" }}>
            {project.role}
          </p>
          <ul className="space-y-4">
            {project.highlights.map((item, idx) => (
              <li key={idx} className="grid grid-cols-[28px_1fr] gap-3">
                <span className="font-mono-ui text-xs pt-0.5" style={{ color: "var(--text-secondary)" }}>
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <span className="text-sm md:text-[15px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {item}
                </span>
              </li>
            ))}
          </ul>
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-solid inline-flex mt-7 px-5 py-2 text-sm"
            >
              View Project
            </a>
          )}
        </div>

        <div className="space-y-4">
          <DroneProjectDiagram project={project} />
          <div className="rounded-xl border p-4" style={{ borderColor: "var(--glass-border)", backgroundColor: "var(--glass-bg)" }}>
            <p className="font-mono-ui text-[11px] uppercase tracking-[0.2em] mb-4" style={{ color: "var(--text-secondary)" }}>
              Stack
            </p>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((item) => (
                <span key={item} className="font-mono-ui px-3 py-1.5 rounded-full text-[10px] uppercase tracking-wider border" style={{ borderColor: "var(--glass-border)", color: "var(--text-secondary)" }}>
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-xl border p-4" style={{ borderColor: "var(--glass-border)", backgroundColor: "var(--glass-bg)" }}>
            <p className="font-mono-ui text-[11px] uppercase tracking-[0.2em] mb-4" style={{ color: "var(--text-secondary)" }}>
              Signals
            </p>
            <ul className="space-y-2">
              {project.metrics.map((metric) => (
                <li key={metric} className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {metric}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <section id="more-work" className="py-14 px-6 md:px-10 max-w-6xl mx-auto text-left transition-colors">
      <Reveal>
        <p className="eyebrow mb-8">More of my work</p>
      </Reveal>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
        {cards.map((card, idx) => (
          <motion.div
            key={card.id}
            className="glow-card relative p-6 shadow-md cursor-pointer flex flex-col justify-center items-center transition"
            onClick={() => {
              setActiveDroneProject(null);
              setActiveResearchProject(null);
              setActiveCard(card.id);
            }}
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
              onClick={() => {
                setActiveDroneProject(null);
                setActiveResearchProject(null);
                setActiveCard(null);
              }}
            >
              Close ✕
            </button>

            {activeCard === "projects" && (
              <div className="w-full max-w-6xl mx-auto text-left">
                <AnimatePresence mode="wait">
                  {selectedResearchProject ? (
                    <ResearchProjectDetail project={selectedResearchProject} />
                  ) : (
                    <motion.div
                      key="research-project-list"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25 }}
                    >
                      <p className="eyebrow mb-4">Research systems</p>
                      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-10">
                        <div>
                          <h3 className="font-display font-medium text-3xl md:text-5xl tracking-tight mb-4" style={{ color: "var(--text-primary)" }}>
                            Research & Academic Projects
                          </h3>
                          <p className="max-w-3xl text-sm md:text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                            Medical imaging, explainable AI, human-in-the-loop model repair, and urban simulation work from academic collaborations.
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-2 md:justify-end">
                          {["Medical AI", "XAI", "Simulation", "Deep learning"].map((item) => (
                            <span key={item} className="font-mono-ui px-3 py-1.5 rounded-full text-[10px] uppercase tracking-wider border" style={{ borderColor: "var(--glass-border)", color: "var(--text-secondary)" }}>
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-5">
                        {projects.map((project, idx) => (
                          <motion.button
                            key={project.id}
                            type="button"
                            onClick={() => setActiveResearchProject(project.id)}
                            className="glow-card text-left p-5 md:p-6 min-h-[300px] flex flex-col justify-between"
                            initial={{ opacity: 0, y: 18 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.08 }}
                            whileHover={{ y: -4 }}
                          >
                            <div>
                              <p className="font-mono-ui text-[10px] uppercase tracking-[0.2em] mb-5" style={{ color: "var(--text-secondary)" }}>
                                {project.eyebrow}
                              </p>
                              <h4 className="font-display font-medium text-2xl mb-4" style={{ color: "var(--text-primary)" }}>
                                {project.name}
                              </h4>
                              <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                                {project.summary}
                              </p>
                            </div>
                            <div className="mt-8 flex items-center justify-between gap-4">
                              <span className="font-mono-ui text-[10px] uppercase tracking-[0.18em]" style={{ color: "var(--text-secondary)" }}>
                                Open details
                              </span>
                              <span className="w-9 h-9 rounded-full border flex items-center justify-center transition-transform" style={{ borderColor: "var(--glass-border)", color: "var(--text-primary)" }}>
                                {"->"}
                              </span>
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {activeCard === "photography" && <PhotographySection />}

            {activeCard === "drones" && (
              <div className="w-full max-w-6xl mx-auto text-left">
                <AnimatePresence mode="wait">
                  {selectedDroneProject ? (
                    <DroneProjectDetail project={selectedDroneProject} />
                  ) : (
                    <motion.div
                      key="drone-project-list"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25 }}
                    >
                      <p className="eyebrow mb-4">Weevilsdrone systems</p>
                      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-10">
                        <div>
                          <h3 className="font-display font-medium text-3xl md:text-5xl tracking-tight mb-4" style={{ color: "var(--text-primary)" }}>
                            Drones & Automation
                          </h3>
                          <p className="max-w-3xl text-sm md:text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                            Work with Weevilsdrone as Strategic Advisor and AI Engineer across the GANDIVA counter-drone stack: assignment intelligence, ground control, and authenticated friendly-drone telemetry.
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-2 md:justify-end">
                          {["Orange Cube", "Here4 GPS", "P900 telemetry", "MAVLink"].map((item) => (
                            <span key={item} className="font-mono-ui px-3 py-1.5 rounded-full text-[10px] uppercase tracking-wider border" style={{ borderColor: "var(--glass-border)", color: "var(--text-secondary)" }}>
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="grid lg:grid-cols-3 gap-5">
                        {droneProjects.map((project, idx) => (
                          <motion.button
                            key={project.id}
                            type="button"
                            onClick={() => setActiveDroneProject(project.id)}
                            className="glow-card text-left p-5 md:p-6 min-h-[300px] flex flex-col justify-between"
                            initial={{ opacity: 0, y: 18 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.08 }}
                            whileHover={{ y: -4 }}
                          >
                            <div>
                              <p className="font-mono-ui text-[10px] uppercase tracking-[0.2em] mb-5" style={{ color: "var(--text-secondary)" }}>
                                {project.eyebrow}
                              </p>
                              <h4 className="font-display font-medium text-2xl mb-4" style={{ color: "var(--text-primary)" }}>
                                {project.name}
                              </h4>
                              <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                                {project.summary}
                              </p>
                            </div>
                            <div className="mt-8 flex items-center justify-between gap-4">
                              <span className="font-mono-ui text-[10px] uppercase tracking-[0.18em]" style={{ color: "var(--text-secondary)" }}>
                                Open details
                              </span>
                              <span className="w-9 h-9 rounded-full border flex items-center justify-center transition-transform" style={{ borderColor: "var(--glass-border)", color: "var(--text-primary)" }}>
                                {"->"}
                              </span>
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
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
                  src={photographyPhotos[lightboxIndex].full}
                  alt={photographyPhotos[lightboxIndex].alt}
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

                {lightboxIndex < photographyPhotos.length - 1 && (
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
