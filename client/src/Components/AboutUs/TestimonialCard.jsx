import React from 'react';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

const TestimonialCard = ({ testimonial, author, rating }) => {
  // Animation variants for a polished entrance
  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.5, 
        ease: "easeOut",
        type: "spring",
        stiffness: 100
      }
    },
    hover: { 
      scale: 1.02, 
      boxShadow: "0 10px 20px rgba(0,0,0,0.15)",
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div
      className="flex justify-center"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
    >
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full border border-gray-100/50 backdrop-blur-sm bg-opacity-90">
        {/* Star Rating */}
        <div className="flex mb-4 space-x-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-5 h-5 transition-colors duration-300 ${
                i < rating ? 'text-yellow-400 fill-current' : 'text-gray-200'
              }`}
            />
          ))}
        </div>

        {/* Testimonial Text */}
        <p className="text-gray-800 text-base italic font-light  mb-4 tracking-wide">
          "{testimonial}"
        </p>

        {/* Author */}
        <div className="text-blue-700 font-semibold text-sm tracking-tight">
          — {author}
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;