// import { FaPhone } from "react-icons/fa";
// import React, { useState, useEffect } from "react";
// import { text } from "framer-motion/client";

// export default function CallSection() {
//   const [isScrolled, setIsScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 50); // change color after 50px scroll
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <a
//       href="tel:+923001234567"
//       className="flex items-center gap-3 !no-underline transition-colors duration-300"
//     >
//       {/* Circle Icon */}
//       <div
//         className={`w-10 h-10 flex  items-center justify-center rounded-full transition-colors duration-300 ${
//         isScrolled ? "bg-[#0f3e70]": "bg-[#0f3e70]"}`}
        
      
        
//       >
//         <FaPhone
//           className="text-lg transition-colors duration-300 text-white "
          
         
//         />
//       </div>

//       {/* Text Section */}
//       <div className="flex flex-col leading-tight">
//         <span
//           className={`text-xs transition-colors duration-300 ${
//             isScrolled ? "text-black" : "text-white"
//           }`}
//           style={{ fontFamily: "Arial, sans-serif" }}
//         >
//           Make a Call
//         </span>
//         <span
//           className={`text-sm font-bold transition-colors duration-300 ${
//             isScrolled ? "text-black" : "text-white"
//           }`}
//           style={{ fontFamily: "Arial, sans-serif" }}
//         >
//           +92 3001234567
//         </span>
//       </div>
//     </a>
//   );
// }



import { FaPhone } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function CallSection({ isDigitalSecurityActive }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // ✅ Icon background depends only on mode
  const bgColor = isDigitalSecurityActive ? "#702829" : "#15487d";


  // Pages where text should always be black
  const forceBlackPages = [
    "/about",
    "/services",
    "/contact",
    "/career",
    "/physical-security",
    "/digital-security",
  ];
  const isForceBlack = forceBlackPages.includes(location.pathname);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <a
      href="tel:+923001234567"
      className="flex items-center gap-3 !no-underline transition-colors duration-300"
    >
      {/* Circle Icon */}
      <div
        className="w-10 h-10 flex items-center justify-center rounded-full transition-colors duration-300"
        style={{ backgroundColor: bgColor }}
      >
        <FaPhone className="text-lg transition-colors duration-300 text-white" />
      </div>

      {/* Text Section */}
      <div className="flex flex-col leading-tight">
        <span
          className={`text-xs transition-colors duration-300 ${
            isForceBlack || isScrolled ? "text-black" : "text-white"
          }`}
          style={{ fontFamily: "Arial, sans-serif" }}
        >
          Make a Call
        </span>
        <span
          className={`text-sm font-bold transition-colors duration-300 ${
            isForceBlack || isScrolled ? "text-black" : "text-white"
          }`}
          style={{ fontFamily: "Arial, sans-serif" }}
        >
          +92 3001234567
        </span>
      </div>
    </a>
  );
}
