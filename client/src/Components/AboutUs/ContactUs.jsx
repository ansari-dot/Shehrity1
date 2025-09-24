import React from "react";
import { motion } from "framer-motion";
import { Phone, Mail } from "lucide-react";

const ContactUs = () => {
  return (
    <motion.div
      className="bg-[#15487d] rounded-2xl p-12 text-center text-white mb-16 shadow-2xl relative overflow-hidden"
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      {/* Glowing 3D effect background */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-700 via-blue-900 to-black opacity-40 blur-2xl"></div>

      <div className="relative z-10">
        <h2 className="text-lg font-extrabold mb-6 drop-shadow-lg">
          Ready to Secure Your Business?
        </h2>
        <p className="text-md mb-10 opacity-90">
          Get a free consultation and custom security plan tailored to your needs.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          {/* Call Button */}
          <motion.button
            whileHover={{ scale: 1.08, rotate: -2 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-blue-700 px-10 py-5 rounded-xl font-semibold shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center space-x-3"
          >
            <Phone className="w-3 h-4" />
            <span>Call Now: +1 (800) 555-0199</span>
          </motion.button>

          {/* Quote Button */}
          <motion.button
            whileHover={{ scale: 1.08, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
            className="border-2 border-white text-blue-700 px-10 py-5 rounded-xl font-semibold shadow-lg hover:shadow-2xl bg-white hover:text-blue-700 transition-all duration-300 flex items-center space-x-3"
          >
            <Mail className="w-3 h-4" />
            <span>Get Free Quote</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactUs;
