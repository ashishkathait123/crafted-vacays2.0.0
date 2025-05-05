"use client";
import { useEffect, useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid'; // Requires Heroicons package

export default function VideoPopup({ isOpen, onClose, youtubeUrl }) {
  const [videoId, setVideoId] = useState('');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const id = extractVideoId(youtubeUrl);
      setVideoId(id);
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, youtubeUrl]);

  function extractVideoId(url) {
    // Existing extraction logic
    let match = url.match(/[?&]v=([^&]+)/);
    if (match) return match[1];
    match = url.match(/youtu\.be\/([^?]+)/);
    if (match) return match[1];
    match = url.match(/shorts\/([^?]+)/);
    if (match) return match[1];
    match = url.match(/embed\/([^?]+)/);
    if (match) return match[1];
    return url;
  }

  if (!isOpen || !videoId) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
      <div className="relative w-full max-w-4xl px-4">
        {/* Video container with close button */}
        <div className="relative group">
          <iframe
            className="w-full h-96 md:h-[500px] rounded-lg"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          
          {/* Close button positioned over video */}
          <button 
            onClick={onClose}
            className="absolute -top-3 -right-3 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors duration-200 group-hover:opacity-100 focus:opacity-100"
            aria-label="Close video"
          >
            <XMarkIcon className="h-6 w-6 text-gray-800" />
          </button>
        </div>
      </div>
    </div>
  );
}