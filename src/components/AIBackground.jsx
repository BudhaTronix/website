
import { useEffect, useRef } from "react";

export default function AIBackground({ theme }) {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    let particles = [];
    const particleCount = 120; // Increased density
    const connectionDistance = 160; // Increased spread

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = 80 + Math.random() * (canvas.height - 80); // Spawn below nabvar
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.radius = Math.random() * 1.5 + 1;
        this.originalVx = this.vx;
        this.originalVy = this.vy;
      }

      update() {
        // Basic movement
        this.x += this.vx;
        this.y += this.vy;

        // Mouse interaction
        const dx = mouseRef.current.x - this.x;
        const dy = mouseRef.current.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 200) {
          const force = (200 - dist) / 200;
          this.vx -= (dx / dist) * force * 0.05;
          this.vy -= (dy / dist) * force * 0.05;
        } else {
          // Slow recovery to original velocity
          this.vx += (this.originalVx - this.vx) * 0.02;
          this.vy += (this.originalVy - this.vy) * 0.02;

          // Subtle center-pull to keep particles from settling at edges
          const centerX = canvas.width / 2;
          const centerY = canvas.height / 2;
          this.vx += (centerX - this.x) * 0.00001;
          this.vy += (centerY - this.y) * 0.00001;

          // Ensure minimum movement (prevent settling)
          const minVelocity = 0.15;
          if (Math.abs(this.vx) < minVelocity) this.vx = (this.vx > 0 ? 1 : -1) * minVelocity;
          if (Math.abs(this.vy) < minVelocity) this.vy = (this.vy > 0 ? 1 : -1) * minVelocity;
        }

        // Random jitter to prevent "dead" particles
        if (Math.random() < 0.01) {
          this.vx += (Math.random() - 0.5) * 0.1;
          this.vy += (Math.random() - 0.5) * 0.1;
        }

        // Geofencing: Bounce and Clamp
        if (this.x < 0) {
          this.x = 0;
          this.vx = Math.abs(this.vx) + 0.1; // Add energy on bounce
        } else if (this.x > canvas.width) {
          this.x = canvas.width;
          this.vx = -Math.abs(this.vx) - 0.1;
        }

        if (this.y < 80) { // Below navbar
          this.y = 80;
          this.vy = Math.abs(this.vy) + 0.1;
        } else if (this.y > canvas.height) {
          this.y = canvas.height;
          this.vy = -Math.abs(this.vy) - 0.1;
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        // Even brighter blue in dark, black in light
        ctx.fillStyle = theme === "dark" 
          ? "rgba(120, 180, 255, 1)" 
          : "rgba(0, 0, 0, 0.7)";
        ctx.fill();
        
        // Brighter glow for the blue dots in dark mode
        if (theme === "dark") {
          ctx.shadowBlur = 6;
          ctx.shadowColor = "rgba(120, 180, 255, 0.9)";
        } else {
          ctx.shadowBlur = 0;
        }
      }
    }

    const init = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      ctx.shadowBlur = 0; // Reset shadow for lines

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            const opacity = 1 - distance / connectionDistance;
            ctx.strokeStyle =
              theme === "dark"
                ? `rgba(79, 142, 247, ${opacity * 0.35})`
                : `rgba(0, 0, 0, ${opacity * 0.2})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    resize();
    init();
    animate();

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ background: "var(--bg-primary)" }}
    />
  );
}
