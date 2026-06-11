export const currentFocusSection = {
  label: "Current focus",
  heading: "What I'm currently doing",
  description:
    "A quick snapshot of what I am learning, building, and testing right now.",
};

export const currentFocusCards = [
  {
    id: "ollama-cloudflare",
    badge: "Today",
    title: "Running Ollama models locally on my system",
    description:
      "Learning how to run local Ollama models reliably and plug them into an application workflow without depending on a hosted model provider.",
    useCase:
      "Testing whether a local Ollama model can be used as a website backend when exposed through a Cloudflare tunnel.",
    highlights: ["ollama runtime", "local inference", "cloudflare tunnel"],
    illustration: "infrastructure",
  },
  {
    id: "complex-valued-neural-networks",
    badge: "Recently",
    title: "Complex-valued neural networks",
    description:
      "Exploring how phase, magnitude, and complex activations can help neural networks model richer signal-heavy patterns.",
    highlights: [
      "phase-aware learning",
      "complex activations",
      "signal-rich modeling",
    ],
    illustration: "research",
  },
];
