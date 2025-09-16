import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Lock, Shield, Eye, EyeOff, Sparkles, Check } from "lucide-react";

const AdminRegister = () => {
  const navigate = useNavigate();
  const [register, setRegister] = useState({
    username: "",
    password: "",
    email: "",
    role: "",
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleLoginClick = () => {
    navigate("/admin-login");
  };

  const handleChange = (e) => {
    setRegister({ ...register, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/user/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(register),
        }
      );
      
      const data = await res.json();

      if (res.ok) {
        alert(data.message || "User registered successfully!");
        setRegister({
          username: "",
          password: "",
          email: "",
          role: "",
        });
        // Redirect to Admin Login after successful registration
        navigate('/admin-login');
      } else {
        alert(data.message || "Something went wrong!");
      }
    } catch (err) {
      console.error(err);
      alert("Network error - please try again!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, rgba(21,72,125,0.05) 0%, rgba(21,72,125,0.08) 50%, rgba(21,72,125,0.10) 100%)",
        position: "relative",
        overflow: "hidden",
        padding: "1.5rem",
      }}
    >
      {/* Animated Background Elements */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "10%",
            left: "20%",
            width: "24rem",
            height: "24rem",
            background: "linear-gradient(90deg, rgba(21, 72, 125, 0.20), rgba(21, 72, 125, 0.30))",
            borderRadius: "50%",
            filter: "blur(4rem)",
            animation: "pulse 8s infinite",
          }}
        ></div>
        <div
          style={{
            position: "absolute",
            bottom: "15%",
            right: "25%",
            width: "20rem",
            height: "20rem",
            background: "linear-gradient(90deg, rgba(21, 72, 125, 0.15), rgba(21, 72, 125, 0.25))",
            borderRadius: "50%",
            filter: "blur(3rem)",
            animation: "pulse 10s infinite 2s",
          }}
        ></div>
      </div>

      {/* Floating Particles */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: "0.5rem",
            height: "0.5rem",
            background: "linear-gradient(90deg, #15487d, #15487d)",
            borderRadius: "50%",
            opacity: 0.4,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `float ${4 + Math.random() * 3}s ease-in-out infinite`,
            animationDelay: `${i * 0.3}s`,
          }}
        ></div>
      ))}
      <div
        style={{
          width: "100%",
          maxWidth: "28rem", 
          position: "relative",
          zIndex: 10,
        }}
      >
        {/* Main Card */}
        <div
          style={{
            background: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(12px)",
            borderRadius: "1.5rem",
            boxShadow: "0 10px 30px rgba(21, 72, 125, 0.12)",
            border: "1px solid rgba(21, 72, 125, 0.20)",
            padding: "2.5rem",
            transform: "translateY(0)",
            transition: "all 0.5s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-5px) scale(1.02)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0) scale(1)")}
        >
          {/* Glowing Border */}
          <div
            style={{
              position: "absolute",
              inset: "-2px",
              background: "linear-gradient(90deg, #15487d, #15487d, #15487d)",
              borderRadius: "1.5rem",
              filter: "blur(4px)",
              zIndex: -1,
              opacity: 0.3,
            }}
          ></div>

          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "5rem",
                height: "5rem",
                position: "relative",
                marginBottom: "1.5rem",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(90deg, #15487d, #15487d)",
                  borderRadius: "1rem",
                  boxShadow: "0 4px 15px rgba(21, 72, 125, 0.30)",
                  animation: "pulse 6s infinite",
                }}
              ></div>
              <div
                style={{
                  position: "relative",
                  background: "#15487d",
                  borderRadius: "0.75rem",
                  padding: "1rem",
                  boxShadow: "inset 0 2px 5px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Shield style={{ width: "2rem", height: "2rem", color: "#ffffff" }} />
              </div>
              <Sparkles
                style={{
                  position: "absolute",
                  top: "-0.25rem",
                  right: "-0.25rem",
                  width: "1rem",
                  height: "1rem",
                  color: "#ffffff",
                  animation: "spin 4s linear infinite",
                }}
              />
            </div>
            <h2
              style={{
                fontSize: "2.25rem",
                fontWeight: 800,
                background: "linear-gradient(90deg, #15487d, #15487d)",
                WebkitBackgroundClip: "text",
                color: "transparent",
                marginBottom: "0.75rem",
              }}
            >
              Admin Portal
            </h2>
            <p style={{ color: "#475569", fontSize: "1rem", fontWeight: 500 }}>
              Register to manage your platform
            </p>
            <div
              style={{
                width: "4rem",
                height: "0.125rem",
                background: "#000000",
                borderRadius: "9999px",
                margin: "0.75rem auto 0",
              }}
            ></div>
          </div>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {/* Email Input */}
            <div style={{ position: "relative" }}>
              <Mail
                style={{
                  position: "absolute",
                  left: "1rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: "1.25rem",
                  height: "1.25rem",
                  color: "#000000",
                  transition: "all 0.3s ease",
                  transform: focusedField === "email" ? "translateY(-50%) scale(1.1)" : "translateY(-50%)",
                }}
              />
              <input
                type="email"
                placeholder="Enter your email"
                value={register.email}
                onChange={handleChange}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                name="email"
                required
                style={{
                  width: "100%",
                  padding: "1rem 1rem 1rem 3rem",
                  background: "rgba(255, 255, 255, 0.7)",
                  border: "1px solid rgba(21, 72, 125, 0.20)",
                  borderRadius: "0.75rem",
                  fontSize: "1rem",
                  color: "#15487d",
                  outline: "none",
                  transition: "all 0.3s ease",
                  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.05)",
                  fontWeight: 500,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 4px 15px rgba(21, 72, 125, 0.20)")}
                onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.05)")}
              />
              {register.email && (
                <Check
                  style={{
                    position: "absolute",
                    right: "1rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: "1.25rem",
                    height: "1.25rem",
                    color: "#15487d",
                  }}
                />
              )}
            </div>

            {/* Username Input */}
            <div style={{ position: "relative" }}>
              <User
                style={{
                  position: "absolute",
                  left: "1rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: "1.25rem",
                  height: "1.25rem",
                  color: "#000000",
                  transition: "all 0.3s ease",
                  transform: focusedField === "username" ? "translateY(-50%) scale(1.1)" : "translateY(-50%)",
                }}
              />
              <input
                type="text"
                placeholder="Choose a username"
                value={register.username}
                onChange={handleChange}
                onFocus={() => setFocusedField("username")}
                onBlur={() => setFocusedField(null)}
                name="username"
                required
                style={{
                  width: "100%",
                  padding: "1rem 1rem 1rem 3rem",
                  background: "rgba(255, 255, 255, 0.7)",
                  border: "1px solid rgba(21, 72, 125, 0.20)",
                  borderRadius: "0.75rem",
                  fontSize: "1rem",
                  color: "#15487d",
                  outline: "none",
                  transition: "all 0.3s ease",
                  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.05)",
                  fontWeight: 500,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 4px 15px rgba(21, 72, 125, 0.20)")}
                onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.05)")}
              />
              {register.username && (
                <Check
                  style={{
                    position: "absolute",
                    right: "1rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: "1.25rem",
                    height: "1.25rem",
                    color: "#15487d",
                  }}
                />
              )}
            </div>

            {/* Password Input */}
            <div style={{ position: "relative" }}>
              <Lock
                style={{
                  position: "absolute",
                  left: "1rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: "1.25rem",
                  height: "1.25rem",
                  color: "#000000",
                  transition: "all 0.3s ease",
                  transform: focusedField === "password" ? "translateY(-50%) scale(1.1)" : "translateY(-50%)",
                }}
              />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                value={register.password}
                onChange={handleChange}
                onFocus={() => setFocusedField("password")}
                onBlur={() => setFocusedField(null)}
                name="password"
                required
                style={{
                  width: "100%",
                  padding: "1rem 3rem 1rem 3rem",
                  background: "rgba(255, 255, 255, 0.7)",
                  border: "1px solid rgba(21, 72, 125, 0.20)",
                  borderRadius: "0.75rem",
                  fontSize: "1rem",
                  color: "#15487d",
                  outline: "none",
                  transition: "all 0.3s ease",
                  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.05)",
                  fontWeight: 500,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 4px 15px rgba(21, 72, 125, 0.20)")}
                onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.05)")}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "1rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#000000",
                  transition: "color 0.3s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#000000")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#000000")}
              >
                {showPassword ? (
                  <EyeOff style={{ width: "1.25rem", height: "1.25rem" }} />
                ) : (
                  <Eye style={{ width: "1.25rem", height: "1.25rem" }} />
                )}
              </button>
            </div>

            {/* Role Select */}
            <div style={{ position: "relative" }}>
              <Shield
                style={{
                  position: "absolute",
                  left: "1rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: "1.25rem",
                  height: "1.25rem",
                  color: "#000000",
                  transition: "all 0.3s ease",
                  transform: focusedField === "role" ? "translateY(-50%) scale(1.1)" : "translateY(-50%)",
                }}
              />
              <select
                value={register.role}
                onChange={handleChange}
                onFocus={() => setFocusedField("role")}
                onBlur={() => setFocusedField(null)}
                name="role"
                required
                style={{
                  width: "100%",
                  padding: "1rem 1rem 1rem 3rem",
                  background: "rgba(255, 255, 255, 0.7)",
                  border: "1px solid rgba(21, 72, 125, 0.20)",
                  borderRadius: "0.75rem",
                  fontSize: "1rem",
                  color: "#15487d",
                  outline: "none",
                  transition: "all 0.3s ease",
                  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.05)",
                  fontWeight: 500,
                  appearance: "none",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 4px 15px rgba(21, 72, 125, 0.20)")}
                onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.05)")}
              >
                <option value="">Select your role</option>
                <option value="admin">System Administrator</option>
                <option value="user">Standard User</option>
              </select>
              <svg
                style={{
                  position: "absolute",
                  right: "1rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: "1.25rem",
                  height: "1.25rem",
                  color: "#94a3b8",
                  pointerEvents: "none",
                }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: "100%",
                padding: "1rem",
                background: "linear-gradient(90deg, #15487d, #15487d)",
                color: "#ffffff",
                fontSize: "1.125rem",
                fontWeight: 600,
                borderRadius: "0.75rem",
                boxShadow: "0 4px 15px rgba(21, 72, 125, 0.30)",
                transition: "all 0.3s ease",
                position: "relative",
                overflow: "hidden",
                cursor: isLoading ? "not-allowed" : "pointer",
                opacity: isLoading ? 0.7 : 1,
              }}
              onMouseEnter={(e) =>
                !isLoading && (e.currentTarget.style.boxShadow = "0 6px 20px rgba(21, 72, 125, 0.40)")
              }
              onMouseLeave={(e) =>
                !isLoading && (e.currentTarget.style.boxShadow = "0 4px 15px rgba(21, 72, 125, 0.30)")
              }
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(90deg, rgba(255, 255, 255, 0.2), transparent)",
                  opacity: 0,
                  transition: "opacity 0.3s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = 0)}
              ></div>
              {isLoading ? (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem" }}>
                  <div
                    style={{
                      width: "1.25rem",
                      height: "1.25rem",
                      border: "2px solid rgba(255, 255, 255, 0.3)",
                      borderTopColor: "#ffffff",
                      borderRadius: "50%",
                      animation: "spin 1s linear infinite",
                    }}
                  ></div>
                  <span>Creating Account...</span>
                </div>
              ) : (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
                  <span>Create Admin Account</span>
                  <Sparkles style={{ width: "1.25rem", height: "1.25rem", color: "#15487d" }} />
                </div>
              )}
            </button>

            {/* Login Button */}
            <button
              type="button"
              onClick={handleLoginClick}
              style={{
                width: "100%",
                padding: "1rem",
                background: "rgba(255, 255, 255, 0.8)",
                color: "#15487d",
                fontSize: "1rem",
                fontWeight: 600,
                borderRadius: "0.75rem",
                border: "1px solid rgba(21, 72, 125, 0.20)",
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.05)",
                transition: "all 0.3s ease",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.9)";
                e.currentTarget.style.boxShadow = "0 6px 20px rgba(21, 72, 125, 0.20)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.8)";
                e.currentTarget.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.05)";
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(90deg, rgba(21, 72, 125, 0.10), transparent)",
                  opacity: 0,
                  transition: "opacity 0.3s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = 0)}
              ></div>
              <span style={{ position: "relative" }}>Already have an account? Sign In</span>
            </button>
          </form>

          {/* Footer */}
          <div style={{ marginTop: "2rem", textAlign: "center" }}>
            <p style={{ fontSize: "0.75rem", color: "#64748b", lineHeight: "1.5" }}>
              By creating an account, you agree to our{" "}
              <span
                style={{ color: "#15487d", cursor: "pointer", transition: "color 0.3s ease" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#15487d")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#15487d")}
              >
                Terms of Service
              </span>{" "}
              and{" "}
              <span
                style={{ color: "#15487d", cursor: "pointer", transition: "color 0.3s ease" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#15487d")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#15487d")}
              >
                Privacy Policy
              </span>
            </p>
          </div>
        </div>

        {/* Floating Decorations */}
        <div
          style={{
            position: "absolute",
            top: "-2rem",
            left: "-2rem",
            width: "3rem",
            height: "3rem",
            background: "linear-gradient(90deg, rgba(21, 72, 125, 0.30), rgba(21, 72, 125, 0.30))",
            borderRadius: "50%",
            filter: "blur(1rem)",
            animation: "pulse 7s infinite",
          }}
        ></div>
        <div
          style={{
            position: "absolute",
            bottom: "-1.5rem",
            right: "-1.5rem",
            width: "2.5rem",
            height: "2.5rem",
            background: "linear-gradient(90deg, rgba(21, 72, 125, 0.20), rgba(21, 72, 125, 0.20))",
            borderRadius: "50%",
            filter: "blur(0.75rem)",
            animation: "pulse 8s infinite 1s",
          }}
        ></div>
      </div>

      {/* Inline CSS Animations */}
      <style>
        {`
          @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 0.8; }
            50% { transform: scale(1.2); opacity: 1; }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default AdminRegister;