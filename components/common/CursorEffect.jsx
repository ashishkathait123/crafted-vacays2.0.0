"use client";

import { useState, useEffect } from "react";

const CursorEffect = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const handleMouseMove = (e) => {
      setTargetPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [mounted]);

  useEffect(() => {
    let animationFrameId;

    const moveCursor = () => {
      setPosition((prev) => ({
        x: prev.x + (targetPosition.x - prev.x) * 0.1,
        y: prev.y + (targetPosition.y - prev.y) * 0.1,
      }));
      animationFrameId = requestAnimationFrame(moveCursor);
    };

    animationFrameId = requestAnimationFrame(moveCursor);
    return () => cancelAnimationFrame(animationFrameId);
  }, [targetPosition]);

  if (!mounted) return null;

  return (
    <div
      className="fixed w-4 h-4 border border-orange-500 rounded-full pointer-events-none transition-transform ease-out duration-100"
      style={{
        top: `${position.y}px`,
        left: `${position.x}px`,
        transform: "translate(-50%, -50%)",
        zIndex: 9999,
        visibility: isVisible ? "visible" : "hidden",
      }}
    />
  );
};

export default CursorEffect;
