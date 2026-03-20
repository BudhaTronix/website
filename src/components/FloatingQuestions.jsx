import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import knowledge from "../data/knowledge.json";

export default function FloatingQuestions({ onQuestionClick, dropZoneRef, isEasterEgg }) {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const generateSafePosition = () => {
      let x, y;
      let attempts = 0;
      while (attempts < 100) {
        x = Math.random() * 70 + 15; // 15% to 85%
        y = Math.random() * 60 + 20; // 20% to 80%
        
        // Expanded forbidden zone for the central profile/text column (x: 25-75%)
        // Also avoid the bottom input area (y > 75%)
        const isCenterConflict = x > 25 && x < 75;
        const isBottomConflict = y > 75;
        if (!isCenterConflict && !isBottomConflict) break;
        attempts++;
      }
      return { x, y };
    };

    const allQuestions = [
      ...(knowledge.general_questions || []),
      ...(knowledge.experience?.flatMap(exp => exp.roles.map(r => ({ question: `Tell me about your role at ${exp.company}` }))) || []),
      ...(knowledge.education?.map(edu => ({ question: `Where did you study ${edu.degree}?` })) || []),
      { question: "What are your hobbies?" },
      { question: "Tell me about your drone work." }
    ];

    const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 5).map((item, index) => {
      const pos = generateSafePosition();
      return {
        ...item,
        id: index,
        initialX: pos.x,
        initialY: pos.y,
        duration: 30 + Math.random() * 20, // Even slower drift
        driftX: (Math.random() - 0.5) * 15, // Tighter drift (max 7.5% in either direction)
        driftY: (Math.random() - 0.5) * 15,
      };
    });
    setQuestions(selected);
  }, []);

  const handleDragEnd = (event, info, question) => {
    if (!dropZoneRef.current) return;

    // Only fire if there was actual movement (lowered threshold)
    if (Math.abs(info.offset.x) < 5 && Math.abs(info.offset.y) < 5) return;

    const rect = dropZoneRef.current.getBoundingClientRect();
    const { x, y } = info.point;
    
    if (
      x >= rect.left &&
      x <= rect.right &&
      y >= rect.top &&
      y <= rect.bottom
    ) {
      onQuestionClick(question);
    }
  };

  if (questions.length === 0) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-50">
      {questions.map((q) => (
        <motion.button
          key={q.id}
          drag
          dragSnapToOrigin
          dragElastic={0.6}
          dragTransition={{ bounceStiffness: 200, bounceDamping: 20 }}
          onDragEnd={(e, info) => handleDragEnd(e, info, q.question)}
          onTap={() => onQuestionClick(q.question)}
          initial={{ 
            opacity: isEasterEgg ? 0.2 : 0, 
            scale: isEasterEgg ? 1 : 0.8
          }}
          animate={{ 
            opacity: [0.15, 0.3, 0.15],
            x: [0, q.driftX, 0],
            y: [0, q.driftY, 0],
            scale: 1,
            rotate: [0, 2, -2, 0]
          }}
          transition={{ 
            duration: q.duration,
            repeat: Infinity,
            ease: "easeInOut",
            opacity: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
          whileHover={{ 
            opacity: 1, 
            scale: 1.1, 
            zIndex: 100,
            transition: { duration: 0.2 } 
          }}
          whileDrag={{ scale: 1.2, opacity: 1, zIndex: 100 }}
          className="absolute pointer-events-auto px-3 py-1.5 rounded-xl backdrop-blur-md border cursor-grab active:cursor-grabbing text-[10px] md:text-xs font-medium whitespace-nowrap shadow-[0_0_10px_var(--accent-glow)] transition-colors"
          style={{ 
            left: `${q.initialX}%`,
            top: `${q.initialY}%`,
            backgroundColor: "rgba(255, 255, 255, 0.05)", 
            borderColor: "var(--glass-border)", 
            color: "var(--text-primary)",
            transform: 'translate(-50%, -50%)',
          }}
        >
          {q.question}
        </motion.button>
      ))}
    </div>
  );
}
