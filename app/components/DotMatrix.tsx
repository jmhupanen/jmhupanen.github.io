'use client';

import { useEffect, useRef } from 'react';

// Particle counts & visuals
const PARTICLE_COUNT = 120;
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

function createParticles(w: number, h: number): Particle[] {
  return Array.from({ length: PARTICLE_COUNT }, () => {
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
  const mag = Math.sqrt(vx * vx + vy * vy);
  if (mag > max) {
    return { vx: (vx / mag) * max, vy: (vy / mag) * max };
  }
  return { vx, vy };
}

export default function DotMatrix() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999, active: false });
  const animationRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);

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

      if (particlesRef.current.length === 0) {
        particlesRef.current = createParticles(w, h);
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY, active: true };
    };

    const onMouseLeave = () => {
      mouseRef.current = { ...mouseRef.current, active: false };
    };

    const draw = () => {
      const { x: mx, y: my, active } = mouseRef.current;
      const particles = particlesRef.current;

      ctx.clearRect(0, 0, w, h);

      if (!prefersReducedMotion) {
        for (const p of particles) {
          // Per-particle wander — smooth random-walk steering
          p.wanderAngle += (Math.random() - 0.5) * WANDER_RATE;
          let ax = Math.cos(p.wanderAngle) * WANDER_STRENGTH;
          let ay = Math.sin(p.wanderAngle) * WANDER_STRENGTH;

          // Cursor repulsion
          if (active) {
            const cdx = p.x - mx;
            const cdy = p.y - my;
            const cdist = Math.sqrt(cdx * cdx + cdy * cdy);

            if (cdist > 0 && cdist < CURSOR_RADIUS) {
              const t = 1 - cdist / CURSOR_RADIUS;
              ax += (cdx / cdist) * t * t * CURSOR_REPEL_WEIGHT;
              ay += (cdy / cdist) * t * t * CURSOR_REPEL_WEIGHT;
            }
          }

          p.vx += ax;
          p.vy += ay;

          // Friction to keep things calm
          p.vx *= 0.96;
          p.vy *= 0.96;

          const limited = limitVec(p.vx, p.vy, MAX_SPEED);
          p.vx = limited.vx;
          p.vy = limited.vy;

          p.x += p.vx;
          p.y += p.vy;

          // Wrap around edges
          if (p.x < 0) p.x += w;
          else if (p.x > w) p.x -= w;
          if (p.y < 0) p.y += h;
          else if (p.y > h) p.y -= h;
        }
      }

      // Draw connections between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECTION_RADIUS) {
            const t = 1 - dist / CONNECTION_RADIUS;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(148, 163, 184, ${t * CONNECTION_OPACITY})`;
            ctx.stroke();
          }
        }
      }

      // Draw particles
      for (const p of particles) {
        let radius = BASE_RADIUS;
        let opacity = BASE_OPACITY;

        if (active) {
          const dx = p.x - mx;
          const dy = p.y - my;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CURSOR_RADIUS) {
            const t = 1 - dist / CURSOR_RADIUS;
            const ease = t * t;
            opacity = BASE_OPACITY + (MAX_OPACITY - BASE_OPACITY) * ease;
            radius = BASE_RADIUS + (MAX_RADIUS - BASE_RADIUS) * ease;
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(148, 163, 184, ${opacity})`;
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    animationRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
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