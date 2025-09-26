import React, { useState } from "react";
import { FaLinkedin, FaTelegramPlane, FaFacebook } from "react-icons/fa";
import { motion } from "framer-motion";
import img1 from "../assets/bg2.jpg"; // background imag
import axios from "axios";
import { useEffect } from "react";
const API_URL = import.meta.env.VITE_API_URL; // Fallback URL
// Team Members - Will be populated from API
let teamMembers = [];

// Social icon colors (stay blue always)
const socialColors = {
  linkedin: "bg-blue-700 hover:bg-blue-800",
  telegram: "bg-blue-400 hover:bg-blue-500",
  facebook: "bg-blue-600 hover:bg-blue-700",
};

export default function TeamSection({ isDigitalSecurityActive }) {
  const [hoveredMember, setHoveredMember] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleTeam = async () => {
    try {
      // First check if we're online
      if (!navigator.onLine) {
        throw new Error("No internet connection");
      }

      const res = await axios.get(`${API_URL}/team/get`, {
        timeout: 10000, // 10 second timeout
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
          Expires: "0",
        },
      });

      if (res.data?.success && Array.isArray(res.data.members)) {
        // Map the API response to match our component's expected format
        const formattedMembers = res.data.members.map((member, index) => ({
          id: member._id || `member-${index}`,
          name: member.name?.trim() || "Team Member",
          role: member.role?.trim() || "Team Member",
          image: member.image
            ? member.image.startsWith("http")
              ? member.image
              : `${API_URL}${member.image}`
            : "/images/placeholder.png",
          social: {
            linkedin: member.socialLinks?.linkedin || "#",
            telegram: member.socialLinks?.telegram || "#",
            facebook: member.socialLinks?.facebook || "#",
          },
        }));

        setTeamMembers(formattedMembers);
      } else {
        console.error("Invalid API response format:", res.data);
        throw new Error("Invalid data received from server");
      }
    } catch (err) {
      console.error("Error fetching team members:", err);
      // Fallback to empty array instead of showing error
      setTeamMembers([]);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    handleTeam();
  }, []);

  const cardVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  // Dynamic colors
  const mainColor = isDigitalSecurityActive ? "#702829" : "#15487d"; // brown / blue

  return (
    <section
      className="py-20 px-4 relative"
      style={{
        backgroundImage: `url(${img1})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
      {/* Overlay for better readability */}
      <div className="absolute inset-0 "></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h3
            className="!text-lg md:!text-3xl !font-bold mb-2 drop-shadow-lg tracking-wide"
            style={{ fontFamily: "Arial, sans-serif", color: mainColor }}>
            Our Team
          </h3>
          <h2
            className="!text-2xl md:!text-3xl !font-bold text-black mb-4 drop-shadow-2xl leading-snug"
            style={{ fontFamily: "Arial Narrow, Arial, sans-serif" }}>
            Meet With Our Expert Team
          </h2>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
          {loading ? (
            <div className="col-span-3 text-center py-10">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
              <p className="mt-2">Loading team members...</p>
            </div>
          ) : !teamMembers || teamMembers.length === 0 ? (
            <div className="col-span-3 text-center py-10">
              <p className="text-gray-600">
                No team members available at the moment
              </p>
              <button
                onClick={handleTeam}
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                Retry
              </button>
            </div>
          ) : (
            teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                className="relative group flex justify-center"
                onMouseEnter={() => setHoveredMember(member.id)}
                onMouseLeave={() => setHoveredMember(null)}
                variants={cardVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ amount: 0.3 }}
                transition={{ delay: index * 0.2 }}>
                {/* Card */}
                <div
                  className="flex flex-col w-full max-w-xs bg-white/95 backdrop-blur-sm shadow-lg rounded-lg overflow-hidden transition-all duration-300 group-hover:shadow-xl group-hover:scale-105"
                  style={{
                    borderColor:
                      hoveredMember === member.id ? mainColor : "transparent",
                    borderWidth: hoveredMember === member.id ? "2px" : "0px",
                  }}>
                  {/* Image & Overlay */}
                  <div className="relative">
                    <div className="aspect-[4/5] overflow-hidden">
                      <img
                        src={member.image || "/images/placeholder.png"}
                        alt={member.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>

                    {/* Social Icons Overlay */}
                    <div
                      className={`absolute inset-0 flex items-center justify-center gap-3 transition-all duration-300 ${
                        hoveredMember === member.id
                          ? `opacity-100`
                          : "opacity-0"
                      }`}
                      style={{
                        backgroundColor:
                          hoveredMember === member.id
                            ? `${mainColor}CC`
                            : "transparent",
                      }}>
                      <a
                        href={member.social.linkedin}
                        className={`p-2 rounded-full transition-all duration-200 hover:scale-110 ${socialColors.linkedin}`}>
                        <FaLinkedin className="w-5 h-5 text-white" />
                      </a>
                      <a
                        href={member.social.telegram}
                        className={`p-2 rounded-full transition-all duration-200 hover:scale-110 ${socialColors.telegram}`}>
                        <FaTelegramPlane className="w-5 h-5 text-white" />
                      </a>
                      <a
                        href={member.social.facebook}
                        className={`p-2 rounded-full transition-all duration-200 hover:scale-110 ${socialColors.facebook}`}>
                        <FaFacebook className="w-5 h-5 text-white" />
                      </a>
                    </div>
                  </div>

                  {/* Name & Role */}
                  <div className="p-4 text-center flex flex-col justify-center">
                    <h3 className="!text-xl !font-bold mb-1">{member.name}</h3>
                    <p
                      className="text-xs font-medium"
                      style={{ color: mainColor }}>
                      {member.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
