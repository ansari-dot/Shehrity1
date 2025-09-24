import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import transitionVideo from "../../../public/assets/Videos/intro.mp4";

const TransitionPage = ({ onFinish }) => {
  const navigate = useNavigate();
  const [isFading, setIsFading] = useState(false);

 const handleFinish = () => {
  setIsFading(true);
  setTimeout(() => {
    onFinish(); // this will set isTransitioning = false
    navigate("/"); // go back home
  }, 1000);
};

  return (
    <div className="w-full h-screen relative bg-black overflow-hidden">
      {/* 🎥 Video */}
      <video
        autoPlay
        muted
        playsInline
        onEnded={handleFinish}
        className={`w-full h-full object-cover transition-opacity duration-1000 ${
          isFading ? "opacity-0" : "opacity-100"
        }`}
      >
        <source src={transitionVideo} type="video/mp4" />
      </video>

      {/* 🔥 Black Fade Overlay (below Skip button) */}
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-1000 z-10 ${
          isFading ? "opacity-100" : "opacity-0"
        }`}
      ></div>

      {/* ⏩ Skip Button (always on top) */}
      <button
        onClick={handleFinish}
        className="absolute top-20 right-6 z-20 px-6 py-2 bg-[#702829] text-white font-bold rounded-full shadow-lg hover:scale-105 transition-transform"
        style={{ borderRadius: "9999px", fontFamily: "Arial, sans-serif" }}
      >
        Skip to Side
      </button>
    </div>
  );
};

export default TransitionPage;
