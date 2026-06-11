import { motion } from "framer-motion";
import {
  currentFocusCards,
  currentFocusSection,
} from "../data/currentFocus";

function ResearchIllustration() {
  return (
    <div
      aria-hidden="true"
      className="relative mx-auto flex h-24 w-24 shrink-0 items-center justify-center sm:mx-0 sm:h-28 sm:w-28"
    >
      <motion.div
        className="absolute inset-2 rounded-full border"
        style={{ borderColor: "rgba(79, 142, 247, 0.2)" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute inset-0 rounded-[28px]"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(79, 142, 247, 0.22), transparent 58%)",
        }}
        animate={{ scale: [1, 1.04, 1], opacity: [0.72, 1, 0.72] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <svg viewBox="0 0 160 160" className="relative h-full w-full">
        <defs>
          <linearGradient id="focusCurve" x1="24" y1="30" x2="132" y2="118">
            <stop offset="0%" stopColor="#7DD3FC" stopOpacity="0.92" />
            <stop offset="100%" stopColor="#4F8EF7" stopOpacity="1" />
          </linearGradient>
        </defs>
        <circle
          cx="80"
          cy="80"
          r="48"
          fill="rgba(15, 23, 42, 0.12)"
          stroke="rgba(79, 142, 247, 0.22)"
          strokeWidth="2"
        />
        <line
          x1="24"
          y1="80"
          x2="136"
          y2="80"
          stroke="rgba(148, 163, 184, 0.3)"
          strokeWidth="2"
          strokeDasharray="4 6"
        />
        <line
          x1="80"
          y1="24"
          x2="80"
          y2="136"
          stroke="rgba(148, 163, 184, 0.3)"
          strokeWidth="2"
          strokeDasharray="4 6"
        />
        <path
          d="M42 106 C58 52 100 40 118 78"
          fill="none"
          stroke="url(#focusCurve)"
          strokeWidth="7"
          strokeLinecap="round"
        />
        <circle cx="42" cy="106" r="6" fill="rgba(125, 211, 252, 0.95)" />
        <circle cx="82" cy="62" r="7" fill="rgba(147, 197, 253, 0.9)" />
        <circle cx="118" cy="78" r="6" fill="rgba(79, 142, 247, 0.95)" />
        <circle
          cx="118"
          cy="78"
          r="15"
          fill="none"
          stroke="rgba(79, 142, 247, 0.22)"
          strokeWidth="2"
        />
        <text x="124" y="74" fontSize="10" fill="rgba(148, 163, 184, 0.85)">
          Re
        </text>
        <text x="86" y="22" fontSize="10" fill="rgba(148, 163, 184, 0.85)">
          Im
        </text>
      </svg>
      <motion.div
        className="absolute right-2 top-5 h-3 w-3 rounded-full"
        style={{ backgroundColor: "var(--accent)" }}
        animate={{ y: [0, -4, 0], opacity: [0.45, 1, 0.45] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

function InfrastructureIllustration() {
  return (
    <div
      aria-hidden="true"
      className="relative mx-auto flex h-24 w-24 shrink-0 items-center justify-center sm:mx-0 sm:h-28 sm:w-28"
    >
      <motion.div
        className="absolute inset-1 rounded-[30px]"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(79, 142, 247, 0.18), transparent 62%)",
        }}
        animate={{ scale: [1, 1.05, 1], opacity: [0.68, 1, 0.68] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <svg viewBox="0 0 160 160" className="relative h-full w-full">
        <rect
          x="26"
          y="52"
          width="48"
          height="48"
          rx="16"
          fill="rgba(79, 142, 247, 0.14)"
          stroke="rgba(79, 142, 247, 0.24)"
          strokeWidth="2"
        />
        <rect
          x="41"
          y="67"
          width="18"
          height="18"
          rx="5"
          fill="rgba(125, 211, 252, 0.85)"
        />
        <path
          d="M74 76 H96"
          fill="none"
          stroke="rgba(125, 211, 252, 0.82)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="5 7"
        />
        <path
          d="M94 60 C102 47 120 45 130 56 C141 56 146 64 146 74 C146 85 137 92 126 92 H101 C91 92 84 85 84 76 C84 68 88 62 94 60 Z"
          fill="rgba(125, 211, 252, 0.14)"
          stroke="rgba(125, 211, 252, 0.24)"
          strokeWidth="2"
        />
        <path
          d="M52 108 C70 126 98 128 122 112"
          fill="none"
          stroke="rgba(79, 142, 247, 0.82)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="4 7"
        />
        <circle cx="52" cy="108" r="6" fill="rgba(79, 142, 247, 0.95)" />
        <circle cx="122" cy="112" r="6" fill="rgba(125, 211, 252, 0.95)" />
        <circle
          cx="122"
          cy="112"
          r="15"
          fill="none"
          stroke="rgba(79, 142, 247, 0.22)"
          strokeWidth="2"
        />
      </svg>
      <motion.div
        className="absolute right-3 top-6 h-2.5 w-2.5 rounded-full"
        style={{ backgroundColor: "var(--accent)" }}
        animate={{ scale: [1, 1.22, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

function FocusIllustration({ kind }) {
  if (kind === "infrastructure") {
    return <InfrastructureIllustration />;
  }

  return <ResearchIllustration />;
}

function FocusEntry({ card, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.95 + index * 0.08, duration: 0.45, ease: "easeOut" }}
      className="relative overflow-hidden rounded-[28px] border px-4 py-4 shadow-[0_24px_60px_-34px_rgba(15,23,42,0.75)] backdrop-blur-2xl sm:px-5 sm:py-5"
      style={{
        background:
          "linear-gradient(135deg, var(--glass-bg) 0%, rgba(79, 142, 247, 0.08) 100%)",
        borderColor: "rgba(79, 142, 247, 0.16)",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-75"
        style={{
          background:
            "radial-gradient(circle at top right, var(--accent-glow), transparent 42%)",
        }}
      />
      <div className="relative flex h-full flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <span
              className="inline-flex items-center rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-[0.22em]"
              style={{
                backgroundColor: "rgba(79, 142, 247, 0.08)",
                borderColor: "var(--glass-border)",
                color: "var(--accent)",
              }}
            >
              {card.badge}
            </span>
            <h3
              className="mt-3 text-base font-bold tracking-tight sm:text-lg"
              style={{ color: "var(--text-primary)" }}
            >
              {card.title}
            </h3>
            <p
              className="mt-2 max-w-xl text-sm leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              {card.description}
            </p>
          </div>
          <FocusIllustration kind={card.illustration} />
        </div>

        {card.useCase && (
          <div
            className="rounded-2xl border px-3.5 py-3"
            style={{
              backgroundColor: "rgba(79, 142, 247, 0.06)",
              borderColor: "var(--glass-border)",
            }}
          >
            <p
              className="text-[10px] font-black uppercase tracking-[0.18em]"
              style={{ color: "var(--accent)" }}
            >
              Use case
            </p>
            <p
              className="mt-1 text-sm leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              {card.useCase}
            </p>
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          {card.highlights.map((highlight) => (
            <span
              key={highlight}
              className="rounded-full border px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.16em]"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.04)",
                borderColor: "var(--glass-border)",
                color: "var(--text-secondary)",
              }}
            >
              {highlight}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

export default function CurrentFocusCard() {
  return (
    <section className="mt-5 px-1">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.4, ease: "easeOut" }}
      >
        <div className="flex items-center gap-3">
          <span
            className="inline-flex items-center rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-[0.22em]"
            style={{
              backgroundColor: "rgba(79, 142, 247, 0.08)",
              borderColor: "var(--glass-border)",
              color: "var(--accent)",
            }}
          >
            {currentFocusSection.label}
          </span>
          <div
            className="h-px flex-1"
            style={{
              background:
                "linear-gradient(90deg, rgba(79, 142, 247, 0.28), transparent)",
            }}
          />
        </div>
        <h2
          className="mt-3 text-lg font-bold tracking-tight sm:text-xl"
          style={{ color: "var(--text-primary)" }}
        >
          {currentFocusSection.heading}
        </h2>
        <p
          className="mt-2 text-sm leading-relaxed"
          style={{ color: "var(--text-secondary)" }}
        >
          {currentFocusSection.description}
        </p>
      </motion.div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        {currentFocusCards.map((card, index) => (
          <FocusEntry key={card.id} card={card} index={index} />
        ))}
      </div>
    </section>
  );
}
