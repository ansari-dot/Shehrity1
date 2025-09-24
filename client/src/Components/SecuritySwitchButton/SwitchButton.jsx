import React from "react";

const SecuritySwitchButton = ({ handleSecuritySwitch, isDigitalSecurityActive }) => {
  return (
    <button
      onClick={handleSecuritySwitch} // 🔹 App.js decides what happens
      className={`
        hidden sm:block   /* Hide on mobile */
        px-6 py-2
        text-white font-bold 
        shadow-lg
        transform hover:scale-105 
        transition-all duration-300
        absolute z-30
        left-1/2 -translate-x-1/2
        -bottom-10
        rounded-full

        ${isDigitalSecurityActive ? "!bg-[#702829]" : "!bg-[#0f3e70]"}
        rounded-md   /* 🔹 Normal button look */
      `}
       style={{ borderRadius: "9999px", fontFamily: "Arial, sans-serif" }}
    >
      {isDigitalSecurityActive
        ? "Switch to Physical Security"
        : "Switch to Digital Security"}
    </button>
  );
};

export default SecuritySwitchButton;
