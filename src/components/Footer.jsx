
export default function Footer({ theme }) {
  return (
    <footer className="py-6 text-center border-t transition-colors" style={{ backgroundColor: "var(--bg-secondary)", borderColor: "var(--glass-border)", color: "var(--text-secondary)" }}>
      © {new Date().getFullYear()} BUDHADITYA MUKHOPADHYAY
    </footer>
  );
}
