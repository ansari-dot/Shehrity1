import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { BiSolidLeftArrowAlt, BiSolidRightArrowAlt } from "react-icons/bi";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./Styles.css";
import { EffectCoverflow, Pagination, Autoplay, Navigation } from "swiper/modules";

import ourservice from "../assets/ourservices.jpg";

export default function Service({ isDigitalSecurityActive }) {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPhysicalServices = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/service/physical/first-five`
        );

        if (response.data && Array.isArray(response.data)) {
          setServices(response.data);
        }
      } catch (err) {
        console.error("Error fetching physical services:", err);
        setError("Failed to load services. Please try again later.");

        // Fallback to sample data if API fails
        setServices([
          {
            _id: 1,
            image:
              "https://images.unsplash.com/photo-1571900946147-97a0897ce71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
            name: "Armed Security Personnel",
            description: "Highly trained armed professionals for maximum protection.",
          },
          {
            _id: 2,
            image:
              "https://images.unsplash.com/photo-1590650153855-d6d4c0f01390?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
            name: "Executive Protection",
            description: "Discreet and professional security for high-profile individuals.",
          },
          {
            _id: 3,
            image:
              "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
            name: "Residential Security",
            description: "24/7 protection for your home and family.",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchPhysicalServices();
  }, []);

  return (
    <div
      className="py-8 px-4 sm:px-6 lg:px-12 relative"
      style={{
        backgroundImage: `url(${ourservice})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0"></div>

      {/* Content container */}
      <div className="relative z-10">
        {/* ✅ Heading */}
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-center align-center">
            <span
              className="!text-[#15487d] !font-bold px-2 py-1 rounded-full !text-xl md:!text-2xl flex gap-1"
              style={{ fontFamily: "Arial, sans-serif" }}
            >
              Our Services
            </span>
          </div>

          <motion.h2
            className={`!text-xl sm:!text-2xl md:!text-4xl !font-bold leading-tight ${
              isDigitalSecurityActive ? "!text-black" : "text-[#15487d]"
            }`}
            style={{ fontFamily: "Arial, sans-serif" }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            Smart Security Services for Your Safety
          </motion.h2>
        </motion.div>

        {/* ✅ Swiper Carousel */}
        <div className="relative w-full max-w-5xl mx-auto">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="text-center py-8 text-red-500">{error}</div>
          ) : services.length > 0 ? (
            <Swiper
              effect={"coverflow"}
              grabCursor={true}
              centeredSlides={true}
              loop={true}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              speed={600}
              coverflowEffect={{ rotate: 15, stretch: 0, depth: 100, modifier: 1, slideShadows: false }}
              pagination={{ clickable: true }}
              navigation={{ nextEl: ".swiper-button-next-custom", prevEl: ".swiper-button-prev-custom" }}
              breakpoints={{
                320: { slidesPerView: 1, spaceBetween: 15 },
                640: { slidesPerView: 2, spaceBetween: 20 },
                1024: { slidesPerView: 2, spaceBetween: 25 },
              }}
              modules={[EffectCoverflow, Pagination, Autoplay, Navigation]}
              className="mySwiper"
            >
              {services.map((service) => {
                const imageUrl = service.image.startsWith("http")
                  ? service.image
                  : `${import.meta.env.VITE_API_URL}${service.image}`;
                return (
                  <SwiperSlide key={service._id} className="relative group rounded-lg overflow-hidden shadow-md">
                    <img
                      src={imageUrl}
                      alt={service.name}
                      className="w-full h-40 sm:h-48 md:h-52 object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://via.placeholder.com/400x300?text=Image+Not+Found";
                      }}
                    />
                    {/* Hover Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-black/80 text-white p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out">
                      <h3 className="text-sm sm:text-base font-semibold">{service.name}</h3>
                      <p className="text-xs sm:text-sm opacity-90">{service.description}</p>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          ) : (
            <div className="text-center py-8 text-gray-500">No physical services available at the moment.</div>
          )}

          {/* ✅ Custom Navigation Buttons */}
          <button className="swiper-button-prev-custom absolute left-1 sm:-left-6 top-1/2 -translate-y-1/2 bg-white/80 text-black w-7 h-7 sm:w-8 sm:h-8 rounded-full shadow-sm flex items-center justify-center z-20 hover:bg-gray-200 duration-200">
            <BiSolidLeftArrowAlt size={16} />
          </button>
          <button className="swiper-button-next-custom absolute right-1 sm:-right-6 top-1/2 -translate-y-1/2 bg-white/80 text-black w-7 h-7 sm:w-8 sm:h-8 rounded-full shadow-sm flex items-center justify-center z-20 hover:bg-gray-200 duration-200">
            <BiSolidRightArrowAlt size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
