import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { User, Book, Award, Briefcase, Users, Star, LogOut } from "lucide-react";

const Sidebar = () => {
  const API_URL =  import.meta.env.VITE_API_URL;
;
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        `${API_URL}/user/logout`,
        {},
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
    } catch (err) {
      console.error("Logout error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Error logging out");
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("userRole");
      localStorage.removeItem("userId");
      localStorage.removeItem("userRole");
      navigate("/");
    }
    
  };

  return (
    <aside className="sidebar">
      {/* Glowing Border Effect */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, #15487d, #15487d, #15487d)",
          opacity: 0.2,
          filter: "blur(4px)",
          zIndex: -1,
        }}
      ></div>

      {/* Sidebar Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: "1.5rem",
          borderBottom: "1px solid rgba(21, 72, 125, 0.2)",
          marginBottom: "1.5rem",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "3rem",
            height: "3rem",
            background: "linear-gradient(90deg, #15487d, #15487d)",
            borderRadius: "0.75rem",
            boxShadow: "0 4px 15px rgba(21, 72, 125, 0.3)",
            marginRight: "1rem",
            position: "relative",
          }}
        >
          <User style={{ width: "1.5rem", height: "1.5rem", color: "#ffffff" }} />
        </div>
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: 700,
            background: "linear-gradient(90deg, #15487d, #15487d)",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          Admin Dashboard
        </h2>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, overflowY: "auto" }}>
        <ul style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <li>
            <NavLink
              to=""
              style={({ isActive }) => ({
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "0.75rem 1rem",
                fontSize: "1rem",
                fontWeight: 500,
                color: isActive ? "#ffffff" : "#000000",
                background: isActive ? "linear-gradient(90deg, #15487d, #15487d)" : "transparent",
                borderRadius: "0.5rem",
                textDecoration: "none",
                transition: "all 0.3s ease",
                position: "relative",
                overflow: "hidden",
              })}
              onMouseEnter={(e) => {
                if (!e.currentTarget.classList.contains("active")) {
                  e.currentTarget.style.background = "rgba(21, 72, 125, 0.10)";
                  e.currentTarget.style.color = "#000000";
                }
              }}
              onMouseLeave={(e) => {
                if (!e.currentTarget.classList.contains("active")) {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "#000000";
                }
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(90deg, rgba(21, 72, 125, 0.2), transparent)",
                  opacity: 0,
                  transition: "opacity 0.3s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = 0)}
              ></div>
              <User style={{ width: "1.25rem", height: "1.25rem" }} />
              <span style={{ position: "relative" }}>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="quiz"
              style={({ isActive }) => ({
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "0.75rem 1rem",
                fontSize: "1rem",
                fontWeight: 500,
                color: isActive ? "#ffffff" : "#000000",
                background: isActive ? "linear-gradient(90deg, #15487d, #15487d)" : "transparent",
                borderRadius: "0.5rem",
                textDecoration: "none",
                transition: "all 0.3s ease",
                position: "relative",
                overflow: "hidden",
              })}
              onMouseEnter={(e) => {
                if (!e.currentTarget.classList.contains("active")) {
                  e.currentTarget.style.background = "rgba(21, 72, 125, 0.10)";
                  e.currentTarget.style.color = "#000000";
                }
              }}
              onMouseLeave={(e) => {
                if (!e.currentTarget.classList.contains("active")) {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "#000000";
                }
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(90deg, rgba(21, 72, 125, 0.2), transparent)",
                  opacity: 0,
                  transition: "opacity 0.3s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = 0)}
              ></div>
              <Book style={{ width: "1.25rem", height: "1.25rem" }} />
              <span style={{ position: "relative" }}>Quiz</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="certificate"
              style={({ isActive }) => ({
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "0.75rem 1rem",
                fontSize: "1rem",
                fontWeight: 500,
                color: isActive ? "#ffffff" : "#000000",
                background: isActive ? "linear-gradient(90deg, #15487d, #15487d)" : "transparent",
                borderRadius: "0.5rem",
                textDecoration: "none",
                transition: "all 0.3s ease",
                position: "relative",
                overflow: "hidden",
              })}
              onMouseEnter={(e) => {
                if (!e.currentTarget.classList.contains("active")) {
                  e.currentTarget.style.background = "rgba(21, 72, 125, 0.10)";
                  e.currentTarget.style.color = "#000000";
                }
              }}
              onMouseLeave={(e) => {
                if (!e.currentTarget.classList.contains("active")) {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "#000000";
                }
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(90deg, rgba(21, 72, 125, 0.2), transparent)",
                  opacity: 0,
                  transition: "opacity 0.3s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = 0)}
              ></div>
              <Award style={{ width: "1.25rem", height: "1.25rem" }} />
              <span style={{ position: "relative" }}>Certificate</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="services"
              style={({ isActive }) => ({
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "0.75rem 1rem",
                fontSize: "1rem",
                fontWeight: 500,
                color: isActive ? "#ffffff" : "#000000",
                background: isActive ? "linear-gradient(90deg, #15487d, #15487d)" : "transparent",
                borderRadius: "0.5rem",
                textDecoration: "none",
                transition: "all 0.3s ease",
                position: "relative",
                overflow: "hidden",
              })}
              onMouseEnter={(e) => {
                if (!e.currentTarget.classList.contains("active")) {
                  e.currentTarget.style.background = "rgba(21, 72, 125, 0.10)";
                  e.currentTarget.style.color = "#000000";
                }
              }}
              onMouseLeave={(e) => {
                if (!e.currentTarget.classList.contains("active")) {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "#000000";
                }
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(90deg, rgba(21, 72, 125, 0.2), transparent)",
                  opacity: 0,
                  transition: "opacity 0.3s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = 0)}
              ></div>
              <Briefcase style={{ width: "1.25rem", height: "1.25rem" }} />
              <span style={{ position: "relative" }}>Services</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="career"
              style={({ isActive }) => ({
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "0.75rem 1rem",
                fontSize: "1rem",
                fontWeight: 500,
                color: isActive ? "#ffffff" : "#000000",
                background: isActive ? "linear-gradient(90deg, #15487d, #15487d)" : "transparent",
                borderRadius: "0.5rem",
                textDecoration: "none",
                transition: "all 0.3s ease",
                position: "relative",
                overflow: "hidden",
              })}
              onMouseEnter={(e) => {
                if (!e.currentTarget.classList.contains("active")) {
                  e.currentTarget.style.background = "rgba(21, 72, 125, 0.10)";
                  e.currentTarget.style.color = "#000000";
                }
              }}
              onMouseLeave={(e) => {
                if (!e.currentTarget.classList.contains("active")) {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "#000000";
                }
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(90deg, rgba(21, 72, 125, 0.2), transparent)",
                  opacity: 0,
                  transition: "opacity 0.3s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = 0)}
              ></div>
              <Briefcase style={{ width: "1.25rem", height: "1.25rem" }} />
              <span style={{ position: "relative" }}>Career</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="team"
              style={({ isActive }) => ({
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "0.75rem 1rem",
                fontSize: "1rem",
                fontWeight: 500,
                color: isActive ? "#ffffff" : "#000000",
                background: isActive ? "linear-gradient(90deg, #15487d, #15487d)" : "transparent",
                borderRadius: "0.5rem",
                textDecoration: "none",
                transition: "all 0.3s ease",
                position: "relative",
                overflow: "hidden",
              })}
              onMouseEnter={(e) => {
                if (!e.currentTarget.classList.contains("active")) {
                  e.currentTarget.style.background = "rgba(21, 72, 125, 0.10)";
                  e.currentTarget.style.color = "#000000";
                }
              }}
              onMouseLeave={(e) => {
                if (!e.currentTarget.classList.contains("active")) {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "#000000";
                }
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(90deg, rgba(21, 72, 125, 0.2), transparent)",
                  opacity: 0,
                  transition: "opacity 0.3s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = 0)}
              ></div>
              <Users style={{ width: "1.25rem", height: "1.25rem" }} />
              <span style={{ position: "relative" }}>Team</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="testimonials"
              style={({ isActive }) => ({
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "0.75rem 1rem",
                fontSize: "1rem",
                fontWeight: 500,
                color: isActive ? "#ffffff" : "#000000",
                background: isActive ? "linear-gradient(90deg, #15487d, #15487d)" : "transparent",
                borderRadius: "0.5rem",
                textDecoration: "none",
                transition: "all 0.3s ease",
                position: "relative",
                overflow: "hidden",
              })}
              onMouseEnter={(e) => {
                if (!e.currentTarget.classList.contains("active")) {
                  e.currentTarget.style.background = "rgba(21, 72, 125, 0.10)";
                  e.currentTarget.style.color = "#000000";
                }
              }}
              onMouseLeave={(e) => {
                if (!e.currentTarget.classList.contains("active")) {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "#000000";
                }
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(90deg, rgba(21, 72, 125, 0.2), transparent)",
                  opacity: 0,
                  transition: "opacity 0.3s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = 0)}
              ></div>
              <Star style={{ width: "1.25rem", height: "1.25rem" }} />
              <span style={{ position: "relative" }}>Testimonials</span>
            </NavLink>
          </li>
           <li>
            <NavLink
              to="profile"
              style={({ isActive }) => ({
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "0.75rem 1rem",
                fontSize: "1rem",
                fontWeight: 500,
                color: isActive ? "#ffffff" : "#000000",
                background: isActive ? "linear-gradient(90deg, #15487d, #15487d)" : "transparent",
                borderRadius: "0.5rem",
                textDecoration: "none",
                transition: "all 0.3s ease",
                position: "relative",
                overflow: "hidden",
              })}
              onMouseEnter={(e) => {
                if (!e.currentTarget.classList.contains("active")) {
                  e.currentTarget.style.background = "rgba(21, 72, 125, 0.10)";
                  e.currentTarget.style.color = "#000000";
                }
              }}
              onMouseLeave={(e) => {
                if (!e.currentTarget.classList.contains("active")) {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "#000000";
                }
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(90deg, rgba(21, 72, 125, 0.2), transparent)",
                  opacity: 0,
                  transition: "opacity 0.3s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = 0)}
              ></div>
              <User style={{ width: "1.25rem", height: "1.25rem" }} />
              <span style={{ position: "relative" }}>Profile</span>
            </NavLink>
          </li>
          <li>
            <button
              onClick={handleLogout}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "0.75rem 1rem",
                fontSize: "1rem",
                fontWeight: 500,
                color: "#000000",
                background: "transparent",
                border: "1px solid rgba(21, 72, 125, 0.2)",
                borderRadius: "0.5rem",
                cursor: "pointer",
                transition: "all 0.3s ease",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(21, 72, 125, 0.10)";
                e.currentTarget.style.color = "#000000";
                e.currentTarget.style.borderColor = "#15487d";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#000000";
                e.currentTarget.style.borderColor = "rgba(21, 72, 125, 0.2)";
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(90deg, rgba(21, 72, 125, 0.2), transparent)",
                  opacity: 0,
                  transition: "opacity 0.3s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = 0)}
              ></div>
              <LogOut style={{ width: "1.25rem", height: "1.25rem" }} />
              <span style={{ position: "relative" }}>Logout</span>
            </button>
          </li>
        </ul>
      </nav>

      {/* Inline CSS Animations */}
      <style>
        {`
          @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 0.8; }
            50% { transform: scale(1.2); opacity: 1; }
          }
        `}
      </style>
    </aside>
  );
};

export default Sidebar;