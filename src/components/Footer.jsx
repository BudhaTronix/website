
export default function Footer({ theme }) {
  return (
    <footer className="hairline-t py-8 px-6 md:px-10 transition-colors relative z-10">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <span className="font-mono-ui text-[10px] uppercase tracking-[0.2em]" style={{ color: "var(--text-secondary)" }}>
          © {new Date().getFullYear()} Budhaditya Mukhopadhyay
        </span>
        <span className="font-mono-ui text-[10px] uppercase tracking-[0.2em]" style={{ color: "var(--text-secondary)" }}>
          Munich, Germany — Available for senior AI roles
        </span>
      </div>
    </footer>
  );
}
