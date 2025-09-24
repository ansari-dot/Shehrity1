

import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"; // ✅ added useNavigate
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "/assets/Images/Asset5.png";
import CallSection from "./CallSection/CallIcons";


const NavBar = ({ handleSecuritySwitch, isDigitalSecurityActive }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);

  const location = useLocation();
  const navigate = useNavigate(); // ✅ hook for navigation

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isSpecialPage = [
    "/about",
    "/digital-security",
    "/physical-security",
    "/career",
    "/contact",
  ].includes(location.pathname);

  return (
    <>
      {/* Navbar */}
      <nav
        className={`!fixed left-0 right-0 z-50 flex items-center justify-center px-6 py-2 whitespace-nowrap transition-all duration-300 h-[90px]
          ${isScrolled || isSpecialPage
            ? "bg-white border-b border-gray-200 text-black top-8"
            : "backdrop-blur-md bg-white/10 border-b border-white/20 text-white top-8"
          }`}
      >
        {/* Logo */}
        <div className="absolute left-12 flex items-center top-4">
          <Link to="/">
            <img
              src={logo}
              alt="Shehrity Logo"
              className="h-16 w-auto transition-transform duration-300 hover:scale-110 hover:opacity-90"
            />
          </Link>
        </div>

        {/* Desktop Menu */}
        <ul
          className={`hidden md:flex items-center gap-8 !font-bold !mt-4 text-sm  transition-colors duration-300  
            ${isScrolled ? "text-black" : "text-gray-800"}`}
          style={{ fontFamily: "Arial, sans-serif" }}
        >
          {["Home", "About", "Services", "Contact", "Career"].map((item, idx) => (
            <li key={idx}>
              {item === "Services" ? (
                <div className="relative group">
                  <button
                    className={`relative py-3 hover:after:w-full !no-underline after:content-[''] after:absolute after:w-0 after:h-[2px] after:left-0 after:bottom-1 after:transition-all after:duration-300 ${isScrolled || isSpecialPage ? "text-black after:bg-black" : "text-white after:bg-white"}`}
                    style={{ fontFamily: "Arial, sans-serif" }}
                    onMouseEnter={() => setServicesDropdown(true)}
                    onMouseLeave={() => setServicesDropdown(false)}
                  >
                    Services
                  </button>
                  {servicesDropdown && (
                    <div
                      className="absolute top-[90%] left-0 mt-0 w-48 bg-gray-200 shadow-lg rounded-md border border-gray-200 py-2 z-50"
                      onMouseEnter={() => setServicesDropdown(true)}
                      onMouseLeave={() => setServicesDropdown(false)}
                    >
                      <Link to="/physical-security" className="block px-4 py-2 text-black hover:bg-gray-300 !no-underline !font-bold">Physical Security</Link>
                      <Link to="/digital-security" className="block px-4 py-2 text-black hover:bg-gray-300 !no-underline !font-bold">Digital Security</Link>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  className={`relative py-3 hover:after:w-full !no-underline after:content-[''] after:absolute after:w-0 after:h-[2px] after:left-0 after:bottom-1 after:transition-all after:duration-300 ${isScrolled || isSpecialPage ? "text-black after:bg-black" : "text-white after:bg-white"}`}
                >
                  {item}
                </Link>
              )}
            </li>
          ))}
        </ul>

        {/* Desktop Buttons */}
        <div className="absolute right-6 hidden md:flex gap-4">
        

        <CallSection isDigitalSecurityActive={isDigitalSecurityActive}/>
        
          <Link
            to="/enroll"
            className={`px-4 py-2 rounded-full text-white !font-bold shadow-md !no-underline transform hover:scale-105 transition-all duration-300 ${isDigitalSecurityActive ? "bg-[#702829]" : "bg-[#15487d]"}`
          
          }
          style={{fontFamily: "Arial, sans-serif" }}
          >
        
            Get a Quate
          </Link>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden absolute top-[24px] right-6 transition-colors text-[#15487d]"
          onClick={() => setMenuOpen(true)}
        >
          <FaBars className="text-3xl" />
        </button>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed top-10 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-50 ${menuOpen ? "translate-x-0" : "translate-x-full"}`}>
        <button className="absolute top-4 right-4 text-sm text-gray-700" onClick={() => setMenuOpen(false)}>
          <FaTimes className="text-3xl" />
        </button>

        <ul className="flex flex-col mt-16 px-6 1font-bold text-sm ">
          {["Home", "About", "Contact", "Career"].map((item, idx) => (
            <li key={idx}>
              <Link
                to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className="relative py-3 block !text-gray-800  transition !font-bold !no-underline"
                onClick={() => setMenuOpen(false)}
              >
                {item}
              </Link>
            </li>
          ))}
          <li className="border-t border-gray-200 pt-4">
            <h3 className="text-md !font-bold text-gray-800 mb-2 border-b border-gray-200 pb-2">Services</h3>
            <div className="pl-4 space-y-2">
              <Link to="/physical-security" className="block py-2 text-black !font-bold !no-underline" onClick={() => setMenuOpen(false)}>Physical Security</Link>
              <Link to="/digital-security" className="block py-2 text-black !font-bold !no-underline" onClick={() => setMenuOpen(false)}>Digital Security</Link>
            </div>
          </li>
        </ul>

        {/* 🔹 Mobile Switch Button */}
        <div className="mt-6 px-6">
          {isDigitalSecurityActive ? (
            // 🔹 Digital → Physical
            <button
              onClick={() => {
                handleSecuritySwitch(false); // ✅ correctly switch to Physical
                setMenuOpen(false);
              }}
              className="w-full text-white px-6 py-2 transition-all duration-300 bg-[#15487d] hover:bg-blue-900"
              style={{ borderRadius: "9999px" }}
            >
              Switch to Physical Security
            </button>
          ) : (
            // 🔹 Physical → Digital
            <button
              onClick={() => {
                setMenuOpen(false);
                window.location.href = "/transition"; // ✅ go through video page
              }}
              className="w-full text-white px-6 py-2 transition-all duration-300 bg-[#15487d] hover:bg-blue-900"
              style={{ borderRadius: "9999px" }}
            >
              Switch to Digital Security
            </button>
          )}


        </div>
      </div>
    </>
  );
};

export default NavBar;
