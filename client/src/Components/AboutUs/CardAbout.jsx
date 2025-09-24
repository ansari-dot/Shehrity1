import React from "react";
import { motion } from "framer-motion";
import { Shield, Award, Users } from "lucide-react";

import ourservice from "../assets/ourservices.jpg";

export default function CardAbout({ isDigitalSecurityActive }) {
  // Pick color set depending on mode
  const mainColor = isDigitalSecurityActive ? "[#702829]" : "#15487d"; // brown for digital, blue for physical
  const bgColor = isDigitalSecurityActive ? "bg-[#702829]" : "bg-[#15487d]";
  const hoverBg = isDigitalSecurityActive ? "group-hover:bg-[#702829]" : "group-hover:bg-[#15487d]";
  const iconColor = isDigitalSecurityActive ? "text-[#702829]" : "text-[#15487d]";

  return (
    <section
      className="py-24 px-4 sm:px-6 lg:px-12 relative min-h-[550px]"
      style={{
        backgroundImage: `url(${ourservice})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/20"></div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8 z-10">
        {/* Card 1 */}
        <motion.div
          initial={{ opacity: 0, y: 80, rotateY: -20 }}
          whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          whileHover={{ scale: 1.05, rotateY: 10 }}
          className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 group"
        >
          <div
            className={`w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-6 ${hoverBg} transition-colors duration-300`}
          >
            <Shield className={`w-8 h-8 ${iconColor} group-hover:text-white transition-colors duration-300`} />
          </div>
          <h3 className="!text-xl !font-bold text-gray-900 mb-4" style={{ fontFamily: "Arial, sans-serif" }}>
            COMPANY
          </h3>
          <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "Arial Narrow,  Arial, sans-serif" }}>
            Trusted security solutions from a comprehensive security business.
            Our experienced team caters to industrial, commercial, and armed
            security services. We are dedicated to safeguarding your business
            assets and ensuring a safe environment.
          </p>
        </motion.div>

        {/* Card 2 */}
        <motion.div
          initial={{ opacity: 0, y: 80, rotateY: -20 }}
          whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          whileHover={{ scale: 1.05, rotateY: 10 }}
          className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 group"
        >
          <div
            className={`w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-6 ${hoverBg} transition-colors duration-300`}
          >
            <Award className={`w-8 h-8 ${iconColor} group-hover:text-white transition-colors duration-300`} />
          </div>
          <h3 className="!text-xl !font-bold text-gray-900 mb-4" style={{ fontFamily: " Arial, sans-serif" }}>
            LICENSED
          </h3>
          <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "Arial Narrow,Arial, sans-serif" }}>
            Shehrity is a trusted security guard company in Australia. Our team
            of experienced professionals works to reduce, neutralize, and ensure
            your peace of mind. We provide comprehensive security solutions and
            physical security services.
          </p>
        </motion.div>

        {/* Card 3 */}
        <motion.div
          initial={{ opacity: 0, y: 80, rotateY: -20 }}
          whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          whileHover={{ scale: 1.05, rotateY: 10 }}
          className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 group"
        >
          <div
            className={`w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-6 ${hoverBg} transition-colors duration-300`}
          >
            <Users className={`w-8 h-8 ${iconColor} group-hover:text-white transition-colors duration-300`} />
          </div>
          <h3 className="!text-xl !font-bold text-gray-900 mb-4" style={{ fontFamily: " Arial, sans-serif" }}>
            TOP NOTCH
          </h3>
          <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "Arial Narrow,Arial, sans-serif" }}>
            Quality assures the utmost client security solutions. Our team
            specializes in providing cutting-edge technology and expert team
            protect common commercial and retail areas from theft, vandalism,
            and loitering.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
