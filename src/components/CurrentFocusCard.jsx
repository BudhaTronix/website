import { motion } from "framer-motion";
import { currentFocus } from "../data/currentFocus";

function CurrentFocusIllustration() {
  return (
    <div
      aria-hidden="true"
      className="relative mx-auto flex h-28 w-28 shrink-0 items-center justify-center sm:mx-0 sm:h-32 sm:w-32"
    >
      <motion.div
        className="absolute inset-2 rounded-full border"
        style={{ borderColor: "rgba(79, 142, 247, 0.2)" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute inset-0 rounded-[30px]"
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
            <stop offset="0%" stopColor="rgba(125, 211, 252, 0.92)" />
            <stop offset="100%" stopColor="rgba(79, 142, 247, 1)" />
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

export default function CurrentFocusCard() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.95, duration: 0.45, ease: "easeOut" }}
      className="relative mt-5 overflow-hidden rounded-[28px] border px-4 py-4 shadow-[0_24px_60px_-34px_rgba(15,23,42,0.75)] backdrop-blur-2xl sm:px-5 sm:py-5"
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
      <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <span
            className="inline-flex items-center rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-[0.22em]"
            style={{
              backgroundColor: "rgba(79, 142, 247, 0.08)",
              borderColor: "var(--glass-border)",
              color: "var(--accent)",
            }}
          >
            {currentFocus.label}
          </span>
          <h2
            className="mt-3 text-lg font-bold tracking-tight sm:text-xl"
            style={{ color: "var(--text-primary)" }}
          >
            {currentFocus.heading}
          </h2>
          <p
            className="mt-2 text-sm font-semibold sm:text-base"
            style={{ color: "var(--accent)" }}
          >
            {currentFocus.activity}
          </p>
          <p
            className="mt-2 max-w-xl text-sm leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            {currentFocus.description}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {currentFocus.highlights.map((highlight) => (
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
        <CurrentFocusIllustration />
      </div>
    </motion.section>
  );
}
