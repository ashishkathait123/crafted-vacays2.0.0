'use client';

import React, { useRef, useEffect } from 'react';

export const WavyBackground = ({
  colors = ['#38bdf8', '#818cf8', '#c084fc', '#e879f9', '#22d3ee'],
  waveOpacity = 0.05,
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const waves = colors.map((color, i) => ({
      color,
      offset: i * 60,
      speed: 0.4 + Math.random() * 0.3,
      amplitude: 10 + Math.random() * 10,
      wavelength: 100 + Math.random() * 50,
      phase: Math.random() * Math.PI * 2,
    }));

    const draw = (time) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      waves.forEach((wave) => {
        ctx.beginPath();
        for (let x = 0; x <= canvas.width; x++) {
          const y =
            Math.sin((x + wave.offset + wave.phase + time * wave.speed) / wave.wavelength) *
              wave.amplitude +
            canvas.height / 2;
          ctx.lineTo(x, y);
        }
        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.closePath();
        ctx.fillStyle = `${wave.color}${Math.floor(waveOpacity * 255)
          .toString(16)
          .padStart(2, '0')}`;
        ctx.fill();
      });

      requestAnimationFrame(draw);
    };

    resize();
    requestAnimationFrame(draw);
    window.addEventListener('resize', resize);

    return () => window.removeEventListener('resize', resize);
  }, [colors, waveOpacity]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full -z-10" />;
};
