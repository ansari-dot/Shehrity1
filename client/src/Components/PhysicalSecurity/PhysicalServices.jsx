import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import axios from "axios";
import img1 from "../assets/alaboutbg.jpg";

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, type: "spring", stiffness: 120 },
  },
  hover: {
    scale: 1.02,
    boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
    transition: { duration: 0.3 },
  },
};

// 🔹 ServiceCard (flip card)
const ServiceCard = ({ service, setSelectedService, setShowApplyModal }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      className="relative w-full h-[20rem] cursor-pointer"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.3 }}
      whileHover="hover"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}>
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}>
        <div
          className="absolute inset-0 w-full h-full rounded-lg overflow-hidden !text-xl"
          style={{ backfaceVisibility: "hidden" }}>
          <img
            src={service.image}
            alt={service.name || service.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 w-full h-full rounded-lg p-3 shadow-md bg-white border border-gray-200 flex flex-col"
          style={{
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden",
          }}>
          <h3
            className="!text-md !font-bold text-gray-900 text-center mb-1"
            style={{ fontFamily: "Arial, sans-serif" }}>
            {service.name || service.title}
          </h3>
          <p
            className="text-gray-900 text-sm text-center mb-2"
            style={{ fontFamily: "Arial Narrow", letterSpacing: "0.5px" }}>
            {service.description.substring(0, 45)}...
          </p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedService(service);
              setShowApplyModal(true);
            }}
            className="bg-[#15487d] text-white py-1 px-2 rounded text-xs !font-bold transition mt-auto">
            Apply
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

// 🔹 Parent Component
const PhysicalServices = ({ isDigitalSecurityActive }) => {
  const [selectedService, setSelectedService] = useState(null);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [physicalServices, setPhysicalServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Mode-based colors
  const primaryColor = isDigitalSecurityActive ? "#702829" : "#15487d";

  // Fetch physical services from backend
  useEffect(() => {
    const fetchPhysicalServices = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/service/physical`
        );
        // Log the raw response data
        console.log("Physical Services API Response:", response.data);

        // Process the services to ensure image URLs are complete
        const processedServices = response.data.map((service) => ({
          ...service,
          // If the image path is relative, prepend the API URL
          image:
            service.image && !service.image.startsWith("http")
              ? `${import.meta.env.VITE_API_URL}${
                  service.image.startsWith("/") ? "" : "/"
                }${service.image}`
              : service.image,
        }));

        console.log("Processed Services:", processedServices);
        setPhysicalServices(processedServices);
      } catch (err) {
        console.error("Error fetching physical services:", err);
        setError("Failed to load services. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPhysicalServices();
  }, []);

  // Loading state
  if (loading) {
    return (
      <div
        className="min-h-screen py-12 px-4 sm:px-6 lg:px-8"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url(${img1})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-20">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="bg-white/80 rounded-lg p-4 animate-pulse h-64">
              <div className="bg-gray-200 h-4 w-3/4 mb-4 rounded"></div>
              <div className="bg-gray-200 h-3 w-1/2 mb-2 rounded"></div>
              <div className="bg-gray-200 h-3 w-2/3 mb-2 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-lg">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="p-6 h-full"
      style={{
        backgroundImage: `url(${img1})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}>
      <motion.h1
        className="!text-2xl md:!text-4xl !font-bold mb-2 justify-center text-center"
        style={{ fontFamily: "Arial, sans-serif", color: primaryColor }}>
        Physical Security Services
      </motion.h1>
      <motion.p
        className="text-lg text-black max-w-2xl mx-auto justify-center text-center"
        style={{ fontFamily: "Arial Narrow" }}>
        Enterprise-grade cybersecurity solutions designed to protect your
        digital infrastructure
      </motion.p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-20">
        {physicalServices.length > 0 ? (
          physicalServices.map((service) => (
            <ServiceCard
              key={service._id || service.id}
              service={service}
              setSelectedService={setSelectedService}
              setShowApplyModal={setShowApplyModal}
            />
          ))
        ) : (
          <div className="col-span-3 text-center py-10">
            <p className="text-gray-600">
              No physical services available at the moment.
            </p>
          </div>
        )}
      </div>

      {/* 🔹 Modal */}
      {showApplyModal && selectedService && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 ">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-6 rounded-2xl shadow-2xl max-w-md w-full">
            <h2
              className="!text-xl !font-bold mb-3 text-center"
              style={{ color: primaryColor, fontFamily: "Arial, sans-serif" }}>
              {selectedService.title}
            </h2>

            <p
              className="text-gray-600 !text-xl mb-4 text-center"
              style={{ fontFamily: "Arial Narrow" }}>
              {selectedService.description}
            </p>

            {/* ✅ Bullet Points with dynamic check color */}
            {selectedService.highlights && (
              <ul className="space-y-2 text-gray-800 text-md">
                {selectedService.highlights.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <FaCheckCircle
                      className="mt-0.5"
                      style={{ color: primaryColor }}
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            )}

            <div className="flex justify-center mt-6">
              <button
                onClick={() => setShowApplyModal(false)}
                className="text-white px-5 py-2 rounded-full !font-bold transform hover:scale-105 transition-all duration-300"
                style={{
                  backgroundColor: primaryColor,
                  borderRadius: "9999px",
                  fontFamily: "Arial, sans-serif",
                }}>
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default PhysicalServices;
