
export default function Footer({ theme }) {
  return (
    <footer className="py-8 text-center border-t transition-colors relative z-10" style={{ borderColor: "var(--glass-border)", color: "var(--text-secondary)" }}>
      <div className="flex justify-center gap-6 mb-3 text-sm">
        <a href="https://www.linkedin.com/in/budhadityamukhopadhyay/" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: "var(--accent)" }}>LinkedIn</a>
        <a href="https://github.com/BudhaTronix" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: "var(--accent)" }}>GitHub</a>
        <a href="https://scholar.google.com/citations?hl=en&user=UyFDbHAAAAAJ" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: "var(--accent)" }}>Google Scholar</a>
        <a href="mailto:budha2011@gmail.com" className="hover:underline" style={{ color: "var(--accent)" }}>Email</a>
      </div>
      © {new Date().getFullYear()} BUDHADITYA MUKHOPADHYAY
    </footer>
  );
}
