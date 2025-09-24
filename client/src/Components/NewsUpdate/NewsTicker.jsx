import React from "react";
import { FaFingerprint } from "react-icons/fa"; // ✅ import fingerprint icon
import "./NewsUpdate.css";

const NewsTicker = ({ showVideo, isDigitalSecurityActive }) => {
  return (
    <div
      className={`
        ticker-container text-white py-2 font-bold flex justify-center items-center gap-2
        ${isDigitalSecurityActive ? "bg-[#702829]" : "bg-[#15487d]"}
      `}
      style={{ fontFamily: "Arial, sans-serif" }}
    >
      <FaFingerprint className="text-white text-lg text-center justify-center" /> {/* ✅ fingerprint icon */}

      <p className="text-center text-xs mt-3">
        {showVideo
          ? "Streaming Security Insights..."
          : "Your Trusted Security and Technology Partner"}
      </p>
    </div>
  );
};

export default NewsTicker;
