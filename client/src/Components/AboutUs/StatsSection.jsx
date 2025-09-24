import React from "react";
import { motion } from "framer-motion";
import { Calendar, Shield, Clock, Award } from "lucide-react";
import CountUp from "react-countup";

const StatsSection = ({ isDigitalSecurityActive }) => {
  const stats = [
    { number: 40, suffix: "+", label: "Years Experience", icon: Calendar },
    { number: 500, suffix: "+", label: "Clients Protected", icon: Shield },
    { number: 24, suffix: "/7", label: "Response Time", icon: Clock },
    { number: 100, suffix: "%", label: "Success Rate", icon: Award },
  ];

  return (
    <div
      className="grid md:grid-cols-4 gap-8 mb-20 py-16 bg-gradient-to-b from-gray-50/80 to-gray-100/80"
      style={{ backgroundSize: "cover", backgroundPosition: "center" }}
    >
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          className="text-center group"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.2, ease: "easeOut" }}
          viewport={{ amount: 0.3 }}
        >
          {/* Icon Circle */}
          <div
            className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 
                        transition-all duration-300 transform group-hover:scale-110 
                        ${
                          isDigitalSecurityActive
                            ? "bg-[#f5e6da] group-hover:bg-[#702829]" // light brown bg → dark brown hover
                            : "bg-blue-100 group-hover:bg-[#15487d]" // light blue bg → dark blue hover
                        }`}
          >
            <stat.icon
              className={`w-10 h-10 transition-colors duration-300 
                ${
                  isDigitalSecurityActive
                    ?"text-[#702829] group-hover:text-white" // brown → white on hover
                    : "text-[#15487d] group-hover:text-white" // blue → white on hover
                }`}
            />
          </div>

          {/* Number Animation */}
        <div
  className={`text-3xl font-bold mb-2 drop-shadow-md ${
    isDigitalSecurityActive ? "text-[#702829]" : "text-[#15487d]"
  }`}
>
  <CountUp
    start={0}
    end={stat.number}
    duration={3}
    enableScrollSpy={true}  // ✅ safe scrollspy
    scrollSpyOnce={true}    // ✅ run only once
  >
     {({ countUpRef }) => (
      <span ref={countUpRef} />  
    )}
  </CountUp>
  {stat.suffix}
</div>


          {/* Label */}
          <div
            className={`font-medium tracking-wide ${
              isDigitalSecurityActive ? "text-[#702829]" : "text-[#15487d]"
            }`}
            style={{ fontFamily: '"Arial Narrow", Arial, sans-serif' }}
          >
            {stat.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default StatsSection;
