
import { motion } from "framer-motion";

export default function Skills({ theme }) {
  const skills = ["Data Analysis", "Data Science", "Unsupervised Learning", "Deep Neural Networks", "Linux", "TensorFlow", "Microsoft office", "Unified Modeling Language(UML)"];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="skills" className="py-20 px-6 text-center transition-colors" style={{ backgroundColor: "var(--bg-secondary)" }}>
      <h2 className="text-3xl md:text-5xl font-bold mb-12" style={{ color: "var(--text-primary)" }}>Skills</h2>
      <motion.div 
        className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {skills.map((skill, i) => (
          <motion.span
            key={i}
            variants={itemVariants}
            whileHover={{ 
              scale: 1.1, 
              y: -5,
              backgroundColor: "var(--accent)",
              color: "#fff",
              boxShadow: "0 10px 20px -5px var(--accent-glow)"
            }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="px-6 py-3 rounded-xl transition-all cursor-default border"
            style={{ 
              backgroundColor: "var(--bg-primary)", 
              color: "var(--text-secondary)",
              borderColor: "var(--glass-border)"
            }}
          >
            {skill}
          </motion.span>
        ))}
      </motion.div>
    </section>
  );
}
