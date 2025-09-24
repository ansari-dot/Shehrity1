import React from "react";
import { motion } from "framer-motion";
import DigitalServices from "./DigitalServices";
import {
  Shield,
  Monitor,
  Cpu,
  CheckCircle,
  Zap,
  Database,
} from "lucide-react";
import p from "../assets/aboutbg2.jpg";
import img1 from "../assets/alaboutbg.jpg";
import img2 from "../assets/bg3.png";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const fadeInUpVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] },
  },
};

const slideInVariants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const DigitalSlider = ({ isDigitalSecurityActive }) => {
  // ✅ Decide color based on mode
  const primaryColor = isDigitalSecurityActive ? "#702829" : "#15487d";
  const fewColor = isDigitalSecurityActive ? "#000000" : "#15487d";

  const features = [
    {
      icon: <Monitor className="w-6 h-6" style={{ color: primaryColor }} />,
      title: "24/7 Cyber Monitoring",
      description: "Real-time threat detection and response",
    },
    {
      icon: <Shield className="w-6 h-6" style={{ color: primaryColor }} />,
      title: "Advanced Firewall Protection",
      description: "Multi-layered network security solutions",
    },
    {
      icon: <Database className="w-6 h-6" style={{ color: primaryColor }} />,
      title: "Data Encryption & Privacy",
      description: "Enterprise-grade data protection",
    },
    {
      icon: <Cpu className="w-6 h-6" style={{ color: primaryColor }} />,
      title: "AI-Powered Security",
      description: "Intelligent threat analysis and prevention",
    },
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
     <motion.section
  className="relative h-[60vh] flex items-center justify-center bg-cover bg-center 
             shadow-[0_20px_40px_rgba(0,0,0,0.3)] z-10"
  variants={containerVariants}
  initial="hidden"
  whileInView="visible"
  viewport={{ amount: 0.3, once: true }}
  style={{ backgroundImage: `url(${p})` }}
>
  {/* Optional Overlay */}
  <div className="absolute inset-0" />

  <div className="relative z-20 max-w-6xl mx-auto px-6 text-center">
    <motion.div className="mb-8" variants={containerVariants}>
    
      <motion.h1
        className="text-5xl md:text-6xl !font-bold mb-6"
        style={{ fontFamily: "Arial, sans-serif", color: primaryColor }}
        variants={fadeInUpVariants}
      >
        Advanced{" "}
        <span className="block !font-bold" style={{ color: primaryColor }}>
          Digital Security
        </span>
      </motion.h1>

      <motion.p
        className="text-lg md:text-xl max-w-3xl mx-auto font-medium text-gray-800"
        style={{ fontFamily: "Arial Narrow" }}
        variants={fadeInUpVariants}
      >
        Protecting your digital infrastructure with cutting-edge
        cybersecurity solutions, advanced threat detection, and
        comprehensive data protection services.
      </motion.p>

      <motion.button
        whileHover={{ scale: 1.05, boxShadow: "0px 8px 24px rgba(0,0,0,0.2)" }}
        whileTap={{ scale: 0.95 }}
        className="mt-4 px-6 py-2 !rounded-3xl text-white !font-bold text-lg shadow-lg transform transition-all duration-300"
        style={{ backgroundColor: primaryColor }}
      >
        Learn More
      </motion.button>
    </motion.div>
  </div>
</motion.section>


      {/* Features Section */}
      <motion.section
        className="relative py-20 bg-white bg-cover bg-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.3 }}
        style={{ backgroundImage: `url(${img1})` }}
      >
        <div className="relative max-w-6xl mx-auto px-6">
          <motion.div className="text-center mb-16" variants={fadeInUpVariants}>
            <h2
              className="text-2xl md:text-2xl !font-bold mb-4"
              style={{ fontFamily: "Arial, sans-serif", color: primaryColor }}
            >
              Why Choose Our Cybersecurity Solutions?
            </h2>
            <p
              className="text-gray-900 text-lg max-w-2xl mx-auto"
              style={{ fontFamily: "Arial Narrow" }}
            >
              Industry-leading digital protection powered by advanced AI and
              expert security professionals
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 transition-all duration-300"
                variants={slideInVariants}
                whileHover={{
                  y: -5,
                  boxShadow: `0 20px 40px ${primaryColor}30`,
                }}
                style={{ borderColor: `${primaryColor}50` }}
              >
                <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3
                  className="!font-bold mb-2 !text-lg"
                  style={{ fontFamily: "Arial, sans-serif"}}
                >
                  {feature.title}
                </h3>
                <p className="text-lg" style={{ fontFamily: "Arial Narrow" }}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Value Proposition Section */}
      <motion.section
        className="relative py-20 bg-white bg-cover bg-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.3 }}
        style={{ backgroundImage: `url(${img2})` }}
      >
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={slideInVariants}>
              <h2
                className="text-3xl md:text-4xl !font-bold mb-6"
                style={{ fontFamily: "Arial, sans-serif",Color:fewColor}}
              >
                Next-Generation Cybersecurity
                <span
                  className="block !font-bold"
                style={{Color:fewColor}}
                >
                  Protection & Intelligence
                </span>
              </h2>
              <p
                className="text-black text-lg mb-8"
                style={{ fontFamily: "Arial Narrow" }}
              >
                Our comprehensive digital security services combine AI-powered
                threat detection, advanced encryption technologies, and expert
                cybersecurity professionals to deliver complete protection for
                your digital assets and infrastructure.
              </p>

              <div className="space-y-4">
                {[
                  "Advanced threat detection and prevention",
                  "Real-time network monitoring and analysis",
                  "Data encryption and privacy protection",
                  "24/7 cybersecurity incident response",
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-3"
                    variants={fadeInUpVariants}
                  >
                    <CheckCircle
                      className="w-5 h-5 flex-shrink-0"
                      style={{ color: primaryColor }}
                    />
                    <span className="text-black">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Card */}
            <motion.div className="relative" variants={fadeInUpVariants}>
              <div className="relative bg-white rounded-3xl p-8 backdrop-blur-sm border"
                   style={{ borderColor: `${primaryColor}50` }}>
                <div className="relative z-10 text-center">
                  <Shield
                    className="w-16 h-16 mx-auto mb-4"
                    style={{ color: primaryColor }}
                  />
                  <h3
                    className="text-2xl !font-bold mb-2"
                    style={{ color: primaryColor }}
                  >
                    Intelligent Protection
                  </h3>
                  <p
                    className="text-black mb-6"
                    style={{ fontFamily: "Arial Narrow" }}
                  >
                    Securing your digital future with AI-powered cybersecurity
                    solutions and expert threat intelligence.
                  </p>
                  <motion.button
                    className="text-white px-6 py-2 rounded-full !font-bold transform hover:scale-105 transition-all duration-300"
                    style={{
                      backgroundColor: primaryColor,
                      borderRadius: "9999px",
                      fontFamily: "Arial, sans-serif",
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Learn More
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Services Section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.3 }}
      >
        <DigitalServices isDigitalSecurityActive={isDigitalSecurityActive} />
      </motion.div>
    </div>
  );
};

export default DigitalSlider;
