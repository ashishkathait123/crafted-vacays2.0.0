"use client";
import { useEffect, useState } from "react";
import { useDestination } from "@/context/DestinationContext"; // Importing context from the new folder structure

const countryVideoMap = {
  angola: "/videos/angola.mp4",
  switzerland: "/videos/switzerland.mp4",
  ireland: "/videos/ireland.mp4",
  abroad: "/videos/thailand 1.mp4",
  india: "/videos/india.mp4",
};

const VideoBackground = () => {
  const { destinationName } = useDestination(); // Accessing the destination name from context
  const [videoSrc, setVideoSrc] = useState("/videos/hero.mp4");
  const [isVisible, setIsVisible] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (destinationName) {
      const key = destinationName.toLowerCase();
      setVideoSrc(countryVideoMap[key] || '/videos/hero.mp4');
    } else {
      setVideoSrc('/videos/hero.mp4');
    }
  }, [destinationName]);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY < window.innerHeight * 0.7);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className={`fixed top-0 left-0 w-full h-screen z-[-1] transition-opacity duration-700 ease-in-out pointer-events-none ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover object-center"
        key={videoSrc}
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Optional overlay for better contrast */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/30" />
    </div>
  );
};

export default VideoBackground;
