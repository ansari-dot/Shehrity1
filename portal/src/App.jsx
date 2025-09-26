import React, { useState, useEffect, Suspense, lazy } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
// import "./App.css";

import Sidebar from "./components/SideBar";
import ProtectedRoute from "./ProtectedRoute.jsx";
import { RxHamburgerMenu } from "react-icons/rx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaBars } from "react-icons/fa";
import logo from "./assets/logo.png";

// Lazy imports for pages
const Dashboard = lazy(() => import("./pages/Dashboard.jsx"));
const Quiz = lazy(() => import("./pages/Quiz.jsx"));
const Certificate = lazy(() => import("./pages/Certificate.jsx"));
const Career = lazy(() => import("./pages/Career.jsx"));
const Contact = lazy(() => import("./pages/Contact.jsx"));
const ManageProfile = lazy(() => import("./pages/ManageProfile.jsx"));
const Auth = lazy(() => import("./pages/Auth.jsx"));

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated");
    if (authStatus === "true") {
      setIsAuthenticated(true);
      if (location.pathname === "/auth" || location.pathname === "/") {
        navigate("/dashboard");
      }
    } else {
      navigate("/auth");
    }
  }, [navigate, location.pathname]);

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", "true");
    navigate("/dashboard");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
    navigate("/auth");
  };

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isSidebarOpen]);

  return (
    <>
      <div className="d-flex vh-100 bg-light position-relative">
        {isAuthenticated && (
          <Sidebar
            onLogout={handleLogout}
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />
        )}

        <motion.main
          className="flex-grow-1 overflow-auto"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}>
          {isAuthenticated && (
            <div
              className="d-lg-none"
              style={{
                position: "sticky",
                top: 0,
                zIndex: 5,
                background: "var(--navy-100)",
                borderBottom: "1px solid var(--navy-200)",
                padding: "10px 12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 8,
              }}>
              <button
                onClick={() => navigate("/dashboard")}
                aria-label="Go to dashboard"
                style={{
                  background: "transparent",
                  border: "none",
                  padding: 0,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                }}>
                <img
                  src={logo}
                  alt="Company Logo"
                  style={{
                    height: 28,
                    width: 28,
                    objectFit: "contain",
                    borderRadius: 6,
                    boxShadow: "0 1px 2px rgba(0,0,0,0.06)",
                  }}
                />
                <span
                  style={{ fontWeight: 700, color: "#243b53", fontSize: 14 }}>
                  Shehrity
                </span>
              </button>

              <button
                aria-label="Open menu"
                onClick={() => setIsSidebarOpen(true)}
                className="btn border"
                style={{
                  width: 40,
                  height: 40,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 9999,
                  boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
                  backgroundColor: "gray",
                  borderColor: "rgba(0,0,0,0.08)",
                  color: "#000",
                }}>
                <FaBars size={20} color="black" />
              </button>
            </div>
          )}

          {/* Suspense for lazy loaded routes */}
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/auth" element={<Auth onLogin={handleLogin} />} />
              <Route
                path="/*"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/quiz" element={<Quiz />} />
                      <Route path="/certificate" element={<Certificate />} />
                      <Route path="/career" element={<Career />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/profile" element={<ManageProfile />} />
                    </Routes>
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Suspense>
        </motion.main>

        {isAuthenticated && isSidebarOpen && (
          <div
            className="sidebar-overlay d-lg-none"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
