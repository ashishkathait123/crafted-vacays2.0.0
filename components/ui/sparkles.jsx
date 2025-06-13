'use client';

import React, { useRef, useEffect } from 'react';

export const SparklesCore = ({
  id,
  className,
  background = 'transparent',
  particleColor = '#ffffff',
  minSize = 1,
  maxSize = 2,
  particleDensity = 50,
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    let particles = [];

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const createParticles = () => {
      particles = [];
      const count = particleDensity;
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * (maxSize - minSize) + minSize,
          speedX: Math.random() * 0.5 - 0.25,
          speedY: Math.random() * 0.5 - 0.25,
          opacity: Math.random(),
        });
      }
    };

    const drawParticles = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        context.beginPath();
        context.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        context.fillStyle = `${particleColor}${Math.floor(p.opacity * 255).toString(16).padStart(2, '0')}`;
        context.fill();
        p.x += p.speedX;
        p.y += p.speedY;

        // Recycle particles
        if (p.x < 0 || p.x > canvas.width || p.y < 0 || p.y > canvas.height) {
          p.x = Math.random() * canvas.width;
          p.y = Math.random() * canvas.height;
        }
      });
    };

    const loop = () => {
      drawParticles();
      requestAnimationFrame(loop);
    };

    resizeCanvas();
    createParticles();
    loop();

    window.addEventListener('resize', () => {
      resizeCanvas();
      createParticles();
    });

    return () => window.removeEventListener('resize', resizeCanvas);
  }, [particleColor, maxSize, minSize, particleDensity]);

  return (
    <canvas
      id={id}
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{ background }}
    />
  );
};
