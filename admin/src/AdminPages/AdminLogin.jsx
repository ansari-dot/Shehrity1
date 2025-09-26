import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Sparkles } from "lucide-react";

const AdminLogin = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [focusedField, setFocusedField] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();
  const handleRegisterClick = () => {
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/login`,
        loginData,
        { headers: { "Content-Type": "application/json" } }
      );

      alert(res.data.message || "Login successful!");
  const userId =  res.data.userId;

        localStorage.setItem("userId", userId);
      // Save token if your backend sends one
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

      // Save user role and data
      const role = res.data.user.role;
      localStorage.setItem("userRole", role);
      
      // Save complete user data for admin functionality
      if (res.data.user) {
        localStorage.setItem("adminUser", JSON.stringify(res.data.user));
      }

      // Redirect based on role
      if (role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }

      // Reset form
      setLoginData({
        email: "",
        password: "",
      });
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Login failed!");
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
          maxWidth: "28rem", // Consistent with AdminRegister
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
                <Lock style={{ width: "2rem", height: "2rem", color: "#ffffff" }} />
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
              Admin Login
            </h2>
            <p style={{ color: "#475569", fontSize: "1rem", fontWeight: 500 }}>
              Sign in to your admin account
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

          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
          >
            {/* Email Input */}
            <div style={{ position: "relative" }}>
              <Mail
                style={{
                  position: "absolute",
                  left: "1rem",
                  top: "50%",
                  transform: focusedField === "email" ? "translateY(-50%) scale(1.1)" : "translateY(-50%)",
                  width: "1.25rem",
                  height: "1.25rem",
                  color: "#000000",
                  transition: "all 0.3s ease",
                }}
              />
              <input
                type="email"
                placeholder="Enter your email"
                value={loginData.email}
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
            </div>

            {/* Password Input */}
            <div style={{ position: "relative" }}>
              <Lock
                style={{
                  position: "absolute",
                  left: "1rem",
                  top: "50%",
                  transform: focusedField === "password" ? "translateY(-50%) scale(1.1)" : "translateY(-50%)",
                  width: "1.25rem",
                  height: "1.25rem",
                  color: "#000000",
                  transition: "all 0.3s ease",
                }}
              />
              <input
                type="password"
                placeholder="Enter your password"
                value={loginData.password}
                onChange={handleChange}
                onFocus={() => setFocusedField("password")}
                onBlur={() => setFocusedField(null)}
                name="password"
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
                  <span>Signing In...</span>
                </div>
              ) : (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
                  <span>Sign In</span>
                  <Sparkles style={{ width: "1.25rem", height: "1.25rem" }} />
                </div>
              )}
            </button>

            {/* Register Button */}
            <button
              type="button"
              onClick={handleRegisterClick}
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
              <span style={{ position: "relative" }}>Need an account? Register</span>
            </button>
          </form>

          {/* Footer */}
          <div style={{ marginTop: "2rem", textAlign: "center" }}>
            <p style={{ fontSize: "0.75rem", color: "#64748b", lineHeight: "1.5" }}>
              By signing in, you agree to our{" "}
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

export default AdminLogin;
