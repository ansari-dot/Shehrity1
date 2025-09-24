import React, { useState, useEffect } from "react";
import { Shield } from "lucide-react";
import { motion } from "framer-motion";
import CardAbout from "./CardAbout";
import StatsSection from "./StatsSection";
import TeamCard from "./TeamSection";
import TimelineSection from "./TimelineSection";
import img from "../assets/alaboutbg.jpg"; // Your background image

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0 },
};

const fadeDown = {
  hidden: { opacity: 0, y: -60 },
  visible: { opacity: 1, y: 0 },
};

const slideFromTop = {
  hidden: { opacity: 0, y: -100 },
  visible: { opacity: 1, y: 0 },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const AboutHeader = ({ isDigitalSecurityActive }) => {
  return (
    <div
      className="relative min-h-screen text-black bg-fixed bg-center bg-cover"
      style={{ backgroundImage: `url(${img})` }}
    >
      <div className="relative z-10">
        {/* Intro Section */}

        {/* <motion.div
          className="py-24 px-6 lg:px-12 pt-28"
          variants={fadeDown}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >




          <motion.p
            className="text-xl lg:text-2xl leading-relaxed max-w-4xl mx-auto text-center font-light tracking-wide text-black drop-shadow-md"
            variants={childVariants}
            style={{ fontFamily: '"Arial Narrow", Arial, sans-serif' }}
          >
            We are a premier security solutions provider, committed to delivering
            unparalleled safety and peace of mind. With decades of expertise, we
            specialize in cutting-edge cybersecurity, physical security, and
            rapid-response emergency services.
          </motion.p>
        </motion.div> */}

        {/* Hero Section */}
        <motion.section
          className="py-20 lg:py-28 overflow-hidden w-full"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.3 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <div className="container mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left Side */}
              <motion.div
                className="space-y-8"
                variants={slideFromTop}
                initial="hidden"
                whileInView="visible"
                viewport={{ amount: 0.3 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
              >
                {/* ✅ Excellence Badge */}
                <motion.div
                  className={`inline-flex items-center px-5 py-2 rounded-full text-sm font-semibold tracking-tight drop-shadow-lg text-white ${isDigitalSecurityActive ? "bg-[#702829]" : "bg-[#15487d]"
                    }`}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  variants={childVariants}
                >
                  <Shield className="w-5 h-5 mr-2" />
                  Over 40 Years of Excellence
                </motion.div>

                {/* ✅ Welcome Heading */}
                <motion.h1
                  className={`!text-3xl lg:text-4xl !font-bold tracking-tight drop-shadow-lg ${isDigitalSecurityActive ? "!text-black" : "!text-[#15487d]"
                    }`}
                  variants={childVariants}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  style={{ fontFamily: "Arial, sans-serif" }}
                >
                HELLO! HERE WE ARE -
                </motion.h1>

                {/* Paragraph */}
                <motion.p
                  className="text-lg lg:text-xl leading-relaxed font-light tracking-wide text-black drop-shadow-md"
                  variants={childVariants}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                  style={{ fontFamily: "Arial Narrow" }}
                >
               Shehrity is a premier private security company 
               based in the state of Ohio, with our main office located in Columbus. 
               We are dedicated to providing top-notch security services to our clients,
                ensuring their safety and peace of mind at all times. Our team of highly-trained 
                professionals is committed to delivering the highest level of security solutions 
                tailored to meet the unique needs of each client. With years of experience 
               in the industry, Shehrity is your trusted partner for all your security needs.
                </motion.p>

                {/* ✅ Event List */}
                <motion.div
                  className="flex flex-wrap gap-6"
                  variants={childVariants}
                  transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
                >
                  {["Event Security", " Bodyguard Security", " Office Security"," Bank Security"].map(
                    (item, i) => (
                      <motion.div
                        key={i}
                        className="flex items-center space-x-3"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.3 }}
                        variants={childVariants}
                      >
                        <div
                          className={`w-3 h-3 rounded-full ${isDigitalSecurityActive
                              ? "bg-[#702829]"
                              : "bg-[#15487d]"
                            }`}
                        ></div>
                        <span className="font-semibold text-lg text-black drop-shadow-md">
                          {item}
                        </span>
                      
                      
                      </motion.div>
                    )
                  )}
                </motion.div>
           <button
  className={` font-bold text-xl px-3 py-2 rounded-full text-white 
             transition-transform duration-300 hover:translate-y-[-4px] 
             ${isDigitalSecurityActive ? "bg-[#702829]" :"bg-[#15487d]"}`}

  style={{ borderRadius: "9999px", fontFamily: "Arial, sans-serif" }}
>
  Get A Quate
</button>
              </motion.div>

              {/* Right Side - Image */}
              <motion.div
                className="relative"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ amount: 0.3 }}
                transition={{ duration: 0.9, delay: 0.4, ease: "easeOut" }}
              >
                <motion.div
                  className="relative rounded-2xl overflow-hidden shadow-2xl"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.5 }}
                  variants={childVariants}
                >
                  <img
                    src="https://images.pexels.com/photos/2422293/pexels-photo-2422293.jpeg"
                    alt="Security Professional"
                    className="w-full h-[28rem] object-cover"
                  />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Other sections unchanged */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
        >
          <CardAbout isDigitalSecurityActive={isDigitalSecurityActive} />  {/* ✅ now dynamic */}
        </motion.div>


        <motion.div variants={containerVariants} initial="hidden" whileInView="visible">
          <TimelineSection isDigitalSecurityActive = {isDigitalSecurityActive} />
        </motion.div>


        <motion.div variants={containerVariants} initial="hidden" whileInView="visible">
          <StatsSection  isDigitalSecurityActive={isDigitalSecurityActive}/>
        </motion.div>

        <TeamCard isDigitalSecurityActive={isDigitalSecurityActive}/>
      </div>

      {/* Parallax effect overlay */}
      <motion.div
        className="absolute inset-0 bg-black/10"
        initial={{ y: 0 }}
        whileInView={{ y: "-20%" }}
        viewport={{ amount: 0.5 }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
    </div>
  );
};

export default AboutHeader;
