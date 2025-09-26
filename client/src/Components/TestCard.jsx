import React, { useState, useEffect } from "react";
import { FaFingerprint } from "react-icons/fa";
import { motion } from "framer-motion";
import "../Components/Sass/TestCard.scss";
import ScrollToTop from "./ScrollToTop";
import { BiSolidLeftArrowAlt, BiSolidRightArrowAlt } from "react-icons/bi";
import img from "./assets/bg2.jpg";
import axios from "axios";

export default function TestCard({ isDigitalSecurityActive }) {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/testimonial/get`
        );

        if (response.data && Array.isArray(response.data)) {
          const formattedTestimonials = response.data.map((item) => {
            let imageUrl = item.image || "";
            if (
              imageUrl &&
              !imageUrl.startsWith("http") &&
              !imageUrl.startsWith("data:")
            ) {
              const cleanPath = imageUrl.startsWith("/")
                ? imageUrl.substring(1)
                : imageUrl;
              imageUrl = `${import.meta.env.VITE_API_URL}/${cleanPath}`;
            }

            return {
              quote: item.message,
              name: item.name,
              title: "Client", // Default title since backend doesn't have this field
              avatar: imageUrl, // Using the same image for avatar
              image: imageUrl,
              originalData: item, // Keep original data for debugging
            };
          });
          setTestimonials(formattedTestimonials);
        } else {
          throw new Error("Invalid data format from server");
        }
      } catch (err) {
        console.error("Error fetching testimonials:", err);
        setError("Failed to load testimonials. Showing sample data.");
        // Fallback to default testimonials if API fails
        setTestimonials([
          {
            quote:
              "The security services provided were exceptional and gave us complete peace of mind.",
            name: "Sarah Johnson",
            title: "Facility Manager",
            avatar: "https://randomuser.me/api/portraits/women/45.jpg",
            image:
              "https://images.unsplash.com/photo-1553413077-190dd305871c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
          },
          {
            quote:
              "Professional team that delivers on their promises with outstanding results.",
            name: "Michael Chen",
            title: "Business Owner",
            avatar: "https://randomuser.me/api/portraits/men/32.jpg",
            image:
              "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?ixlib=rb-4.0.3&auto=format&fit=crop&w=1374&q=80",
          },
          {
            quote:
              "Their expertise in security solutions is unmatched in the industry.",
            name: "Emily Rodriguez",
            title: "Security Director",
            avatar: "https://randomuser.me/api/portraits/women/63.jpg",
            image:
              "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading testimonials...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-10">{error}</div>;
  }

  if (testimonials.length === 0) {
    return <div className="text-center py-10">No testimonials available</div>;
  }

  const current = testimonials[currentIndex];

  const next = () => setCurrentIndex((currentIndex + 1) % testimonials.length);
  const prev = () =>
    setCurrentIndex(
      (currentIndex - 1 + testimonials.length) % testimonials.length
    );

  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
  };

  return (
    <div
      className="py-12 px-4"
      style={{
        backgroundImage: `url(${img})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
      {/* Header */}
      <header className="text-center mb-10 space-y-3 !font-bold  text-2xl">
        <motion.span
          className={`!font-bold px-3 py-2 rounded-full flex justify-center items-center gap-2 ${
            isDigitalSecurityActive ? "!text-[#702829]" : "!text-[#15487d]"
          }`}
          style={{ fontFamily: "Arial, sans-serif" }}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}>
          Testimonials
        </motion.span>

        <motion.h2
          className="!text-2xl sm:text-2xl md:!text-4xl !font-bold justify-center text-center 
          !text-black"
          style={{ fontFamily: "Arial, sans-serif" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}>
          What Our client Says
        </motion.h2>
      </header>

      {/* Card */}
      <motion.div
        style={{ fontFamily: "Arial, sans-serif" }}
        className="w-full max-w-6xl"
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}>
        <div className="bg-white rounded-xl shadow-md p-6 md:p-8 max-w-4xl mx-auto ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* Left Text */}
            <div className="flex flex-col space-y-2">
              <p
                className="text-gray-600 text-lg leading-relaxed"
                style={{ fontFamily: "Arial Narrow" }}>
                "{current.quote}"
              </p>
              <div
                className="flex items-center space-x-2 pt-1"
                style={{ fontFamily: "Arial, sans-serif" }}>
                <img
                  src={current.avatar}
                  alt={current.name}
                  className="w-12 h-12 rounded-full object-cover shadow-sm"
                />
                <div>
                  <p className="font-semibold text-gray-900 text-sm">
                    {current.name}
                  </p>
                  <p
                    className="text-gray-500 text-sm"
                    style={{ fontFamily: "Arial Narrow" }}>
                    {current.title}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="w-full h-48 md:h-56 rounded-lg overflow-hidden shadow-sm">
              <img
                src={current.image}
                alt="Client"
                className="w-full h-full object-cover"
                onError={(e) => {
                  console.error("Error loading image:", current.image);
                  e.target.onerror = null; // Prevent infinite loop
                  e.target.src =
                    "https://via.placeholder.com/400x300?text=Image+Not+Found";
                }}
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Navigation */}
      <div className="flex mt-6 gap-4 sm:gap-6 justify-center items-center">
        <button
          onClick={prev}
          className="rounded-full h-10 w-10 flex  items-center justify-center shadow bg-white hover:bg-gray-200 transition duration-300">
          <BiSolidLeftArrowAlt className="text-2xl font-bold" />
        </button>
        <button
          onClick={next}
          className="rounded-full h-10 w-10 flex items-center justify-center shadow bg-white hover:bg-gray-200 transition duration-300">
          <BiSolidRightArrowAlt className="text-2xl font-bold" />
        </button>
      </div>

      <ScrollToTop />
    </div>
  );
}
