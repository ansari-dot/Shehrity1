import React from "react";
import { motion } from "framer-motion";
import PhysicalServices from "./PhysicalServices";
import { Shield, Eye, Lock, Users, CheckCircle } from "lucide-react";
import d from "../assets/aboutbg2.jpg";
import img1 from "../assets/alaboutbg.jpg";
import img2 from "../assets/bg3.png";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 },
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

const PhysicalSlider = ({ isDigitalSecurityActive }) => {
  // ✅ Color switching
  const primaryColor = isDigitalSecurityActive ? "#702829" : "#15487d"; // brown / blue
const fewColor = isDigitalSecurityActive ?"#000000" :"#15487d"
  const features = [
    {
      icon: <Shield className={`w-6 h-6`} style={{ color: primaryColor }} />,
      title: "24/7 Security Monitoring",
      description: "Round-the-clock surveillance and protection",
    },
    {
      icon: <Eye className={`w-6 h-6`} style={{ color: primaryColor }} />,
      title: "Advanced CCTV Systems",
      description: "State-of-the-art video monitoring technology",
    },
    {
      icon: <Users className={`w-6 h-6`} style={{ color: primaryColor }} />,
      title: "Professional Guards",
      description: "Highly trained security personnel",
    },
    {
      icon: <Lock className={`w-6 h-6`} style={{ color: primaryColor }} />,
      title: "Access Control",
      description: "Comprehensive entry management systems",
    },
  ];

  return (
    <div className="relative overflow-hidden  text-black">
<motion.section
  className="relative h-[60vh] flex items-center justify-center bg-cover bg-center 
             shadow-[0_15px_30px_rgba(0,0,0,0.3)] z-10"
  variants={containerVariants}
  initial="hidden"
  whileInView="visible"
  viewport={{ amount: 0.3, once: true }}
  style={{ backgroundImage: `url(${d})` }}
>
  {/* Overlay if needed */}
  <div className="absolute inset-0" />

  {/* Content */}
  <div className="relative z-20 max-w-6xl mx-auto px-6 text-center">
    <motion.h1
      className="text-2xl md:text-5xl !font-bold mb-6"
      style={{ fontFamily: "Arial, sans-serif", color: primaryColor }}
      variants={fadeInUpVariants}
    >
      Comprehensive{" "}
      <span
        className="block !font-bold"
        style={{ fontFamily: "Arial, sans-serif", color: primaryColor }}
      >
        Physical Security
      </span>
    </motion.h1>

    <motion.p
      className="text-lg md:text-xl max-w-3xl mx-auto font-medium text-gray-800"
      style={{ fontFamily: "Arial Narrow" }}
      variants={fadeInUpVariants}
    >
      Protecting your digital infrastructure with cutting-edge cybersecurity
      solutions, advanced threat detection, and comprehensive data protection
      services.
    </motion.p>

    <motion.button
      whileHover={{ scale: 1.05, boxShadow: "0px 8px 24px rgba(0,0,0,0.2)" }}
      whileTap={{ scale: 0.95 }}
      className="mt-4 px-6 py-2 !rounded-3xl text-white !font-bold text-lg shadow-lg transform transition-all duration-300"
      style={{ backgroundColor: primaryColor }}
    >
      Learn More
    </motion.button>
  </div>
</motion.section>



      {/* Features Section */}
      <motion.section
        className="relative py-20 bg-white bg-cover bg-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.3, once: true }}
        style={{ backgroundImage: `url(${img1})` }}
      >
        <div className="max-w-6xl mx-auto px-6 relative">
          <motion.div className="text-center mb-16" variants={fadeInUpVariants}>
            <h2
              className="text-3xl md:text-4xl mb-4 !font-bold"
              style={{ fontFamily: "Arial, sans-serif", color: primaryColor }}
            >
              Why Choose Our Security Solutions?
            </h2>
            <p
              className="text-lg max-w-2xl mx-auto"
              style={{ fontFamily: "Arial Narrow" }}
            >
              Industry-leading protection backed by years of expertise and
              cutting-edge technology
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="group bg-white rounded-2xl p-6 border border-gray-200  transition-all duration-300"
                variants={slideInVariants}
                whileHover={{
                  y: -5,
                  boxShadow: "0 20px 40px rgba(0,0,128,0.1)",
                }}
              >
                <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3
                  className="!font-bold mb-2 !text-lg"
                  style={{ fontFamily: "Arial, sans-serif" }}
                >
                  {feature.title}
                </h3>
                <p
                  className="!text-md"
                  style={{ fontFamily: "Arial Narrow" }}
                >
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
        <div className="max-w-6xl mx-auto px-6 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={slideInVariants}>
              <h2
                className="!text-3xl md:!text-4xl !font-bold mb-6"
                style={{ fontFamily: "Arial, sans-serif", color: fewColor }}
              >
                Unparalleled Physical Security
                <span className="block font-bold" style={{ color: fewColor }}>
                  Protection & Support
                </span>
              </h2>
              <p
                className="text-lg mb-8"
                style={{ fontFamily: "Arial Narrow" }}
              >
                Our comprehensive physical security services combine expert
                personnel, advanced surveillance technology, and proven
                methodologies to deliver complete protection for your
                facilities, assets, and people.
              </p>

              <div className="space-y-4">
                {[
                  "Professional on-site security guards",
                  "Advanced CCTV monitoring systems",
                  "Secure transportation services",
                  "24/7 emergency response team",
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
                    <span>{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div className="relative" variants={fadeInUpVariants}>
              <div className="relative bg-white rounded-3xl p-8 border border-gray-200">
                <div className="relative z-10 text-center">
                  <Shield
                    className="w-16 h-16 mx-auto mb-4"
                    style={{ color: primaryColor }}
                  />
                  <h3
                    className="!text-2xl !font-bold mb-2"
                    style={{  fontFamily: "Arial, sans-serif", color: primaryColor }}
                  >
                    Trusted Protection
                  </h3>
                  <p className="mb-6" style={{ fontFamily: "Arial Narrow" }}>
                    Safeguarding what matters most with precision, reliability,
                    and unwavering dedication to your security needs.
                  </p>
                  <motion.button
                    className="text-white px-6 py-2 rounded-full !font-bold transition-colors"
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
        viewport={{ amount: 0.3, once: true }}
       
      >
        <PhysicalServices isDigitalSecurityActive={isDigitalSecurityActive} />
      </motion.div>
    </div>
  );
};

export default PhysicalSlider;
