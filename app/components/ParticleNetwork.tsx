'use client';

import { useEffect, useRef } from 'react';

// Visuals
const BASE_RADIUS = 1.5;
const MAX_RADIUS = 4;
const BASE_OPACITY = 0.25;
const MAX_OPACITY = 0.85;
const MAX_SPEED = 0.5;
const MIN_SPEED = 0.25;

// Wander
const WANDER_STRENGTH = 0.4;
const WANDER_RATE = 0.3;

// Cursor repulsion
const CURSOR_RADIUS = 200;
const CURSOR_REPEL_WEIGHT = 6;

// Connections
const CONNECTION_RADIUS = 120;
const CONNECTION_OPACITY = 0.15;

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  wanderAngle: number;
}

function createParticles(w: number, h: number, count: number): Particle[] {
  return Array.from({ length: count }, () => {
    const angle = Math.random() * Math.PI * 2;
    const speed = MIN_SPEED + Math.random() * (MAX_SPEED - MIN_SPEED) * 0.5;
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      wanderAngle: Math.random() * Math.PI * 2,
    };
  });
}

function limitVec(vx: number, vy: number, max: number) {
  const magSq = vx * vx + vy * vy;
  if (magSq > max * max) {
    const mag = Math.sqrt(magSq);
    return { vx: (vx / mag) * max, vy: (vy / mag) * max };
  }
  return { vx, vy };
}

export default function ParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Eased mouse and scroll tracking
  const mouseRef = useRef({ targetX: -9999, targetY: -9999, x: -9999, y: -9999, active: false });
  const scrollRef = useRef({ targetY: 0, y: 0 });

  const animationRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const particleCountRef = useRef<number>(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = window.innerWidth;
    let h = window.innerHeight;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Responsive density
      const targetCount = w < 768 ? 50 : 120;

      if (particlesRef.current.length === 0 || particleCountRef.current !== targetCount) {
        particleCountRef.current = targetCount;
        particlesRef.current = createParticles(w, h, targetCount);
      } else {
        // Clamp existing particles on screen resize
        particlesRef.current.forEach((p) => {
          if (p.x > w) p.x = Math.random() * w;
          if (p.y > h) p.y = Math.random() * h;
        });
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
      mouseRef.current.active = true;

      // Instantly set start position if not active yet
      if (mouseRef.current.x === -9999) {
        mouseRef.current.x = e.clientX;
        mouseRef.current.y = e.clientY;
      }
    };

    const onMouseLeave = () => {
      mouseRef.current.active = false;
    };

    const onScroll = () => {
      scrollRef.current.targetY = window.scrollY;
    };

    const draw = () => {
      // Lerping (Smooth Easing)
      if (mouseRef.current.active) {
        mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.15;
        mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.15;
      }
      scrollRef.current.y += (scrollRef.current.targetY - scrollRef.current.y) * 0.1;

      const { x: mx, y: my, active } = mouseRef.current;
      const scrollOffset = scrollRef.current.y * 0.2; // Parallax magnitude
      const particles = particlesRef.current;

      ctx.clearRect(0, 0, w, h);

      if (!prefersReducedMotion) {
        for (const p of particles) {
          p.wanderAngle += (Math.random() - 0.5) * WANDER_RATE;
          let ax = Math.cos(p.wanderAngle) * WANDER_STRENGTH;
          let ay = Math.sin(p.wanderAngle) * WANDER_STRENGTH;

          // Compute parallax Y position for interactions
          const py = p.y - scrollOffset;

          if (active) {
            const cdx = p.x - mx;
            const cdy = py - my;
            const cdistSq = cdx * cdx + cdy * cdy;
            const cursorRadSq = CURSOR_RADIUS * CURSOR_RADIUS;

            if (cdistSq > 0 && cdistSq < cursorRadSq) {
              const cdist = Math.sqrt(cdistSq);
              const t = 1 - cdist / CURSOR_RADIUS;
              ax += (cdx / cdist) * t * t * CURSOR_REPEL_WEIGHT;
              ay += (cdy / cdist) * t * t * CURSOR_REPEL_WEIGHT;
            }
          }

          p.vx += ax;
          p.vy += ay;
          p.vx *= 0.96;
          p.vy *= 0.96;

          const limited = limitVec(p.vx, p.vy, MAX_SPEED);
          p.vx = limited.vx;
          p.vy = limited.vy;

          p.x += p.vx;
          p.y += p.vy;

          // Wrap around edges + padding to allow smooth parallax scrolling without pop-in
          if (p.x < -50) p.x += w + 100;
          else if (p.x > w + 50) p.x -= w + 100;

          if (p.y - scrollOffset < -50) p.y += h + 100;
          else if (p.y - scrollOffset > h + 50) p.y -= h + 100;
        }
      }

      const connectionRadiusSq = CONNECTION_RADIUS * CONNECTION_RADIUS;

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1y = particles[i].y - scrollOffset;
          const p2y = particles[j].y - scrollOffset;
          const dx = particles[i].x - particles[j].x;
          const dy = p1y - p2y;
          const distSq = dx * dx + dy * dy;

          // Optimized distance checking
          if (distSq < connectionRadiusSq) {
            const dist = Math.sqrt(distSq);
            const t = 1 - dist / CONNECTION_RADIUS;

            ctx.beginPath();
            ctx.moveTo(particles[i].x, p1y);
            ctx.lineTo(particles[j].x, p2y);
            ctx.strokeStyle = `rgba(148, 163, 184, ${t * CONNECTION_OPACITY})`;
            ctx.stroke();
          }
        }
      }

      // Draw glowing particles
      ctx.shadowBlur = 12;
      ctx.shadowColor = 'rgba(96, 165, 250, 0.5)'; // Tailwind blue-400 glow

      for (const p of particles) {
        let radius = BASE_RADIUS;
        let opacity = BASE_OPACITY;
        const py = p.y - scrollOffset;

        if (active) {
          const dx = p.x - mx;
          const dy = py - my;
          const distSq = dx * dx + dy * dy;
          const cursorRadSq = CURSOR_RADIUS * CURSOR_RADIUS;

          if (distSq < cursorRadSq) {
            const t = 1 - Math.sqrt(distSq) / CURSOR_RADIUS;
            const ease = t * t;
            opacity = BASE_OPACITY + (MAX_OPACITY - BASE_OPACITY) * ease;
            radius = BASE_RADIUS + (MAX_RADIUS - BASE_RADIUS) * ease;
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, py, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(148, 163, 184, ${opacity})`;
        ctx.fill();
      }

      // Reset shadow for next frame connections
      ctx.shadowBlur = 0;

      animationRef.current = requestAnimationFrame(draw);
    };

    resize();

    // Initial scroll sync
    onScroll();

    window.addEventListener('resize', resize);
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);

    animationRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
}