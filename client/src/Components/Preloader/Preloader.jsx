import React, { useState, useEffect } from "react";
import introVideo from "../../../public/assets/Videos/start.mp4"; // replace with your video path

const Preloader = ({ onFinish }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isFading, setIsFading] = useState(false);

  // fallback timer if video doesn’t end properly
  useEffect(() => {
    const timer = setTimeout(() => handleFinish(), 6000);
    return () => clearTimeout(timer);
  }, []);

  const handleFinish = () => {
    setIsFading(true);
    setTimeout(() => {
      setIsPlaying(false);
      onFinish();
    }, 800); // ⏳ duration of fade-out
  };

  if (!isPlaying) return null;

  return (
    <div
      className={`fixed inset-0 z-50 bg-black flex items-center justify-center transition-opacity duration-700 ${
        isFading ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Background Video */}
      <video
        src={introVideo}
        autoPlay
        muted
        onEnded={handleFinish}
        className="w-full h-full object-cover"
      />

      {/* Skip Button */}
      <button
        onClick={handleFinish}
        className="absolute top-8 right-8 !bg-[#0f3e70] text-white px-4 py-2 rounded-full shadow-lg  transition transform hover:scale-105 font-bold"
           style={{ borderRadius: "9999px", fontFamily: "Arial, sans-serif" }}
      >
        Skip to Side
      </button>
    </div>
  );
};

export default Preloader;
