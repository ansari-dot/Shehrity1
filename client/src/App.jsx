

import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import React, { useState } from "react";
import DigitalServices from "./Components/Sections/DigitalServicesComponent";
import DigitalHeroSection from "./Components/DigitalHeroSection";
import NavBar from "./Components/NavBar";
import NewsTicker from "./Components/NewsUpdate/NewsTicker";
import HeroSection from "./Components/PhysicalSectionHeroSection";
import WhyChooseUs from "./Components/WhyChooseUs";
import PhysicalService from "./Components/Sections/PhysicalServiceComponent";
import TestCard from "./Components/TestCard";
import Footer from "./Components/Footer";
import AboutHeader from "./Components/AboutUs/AboutHeader";
import ServiceSlider from "./Components/Services/ServiceSlider";
import PhyscialSlider from "./Components/PhysicalSecurity/PhyscialSlider";
import DigitalSlider from "./Components/DigitalSecurity/DigitalSlider";
import ContactForm from "./Components/ContactPage/ContactForm";
import CareerPage from "./Components/Career/CareerPage";
import SecuritySwitchButton from "./Components/SecuritySwitchButton/SwitchButton";
import TransitionPage from "./Components/Transition/TransitionVedios"; 
import AboutSlider from "./Components/AboutUs/AboutSlider";
import Preloader from "./Components/Preloader/Preloader"






// ✅ Component to render ticker
function TickerSwitcher({ showVideo, isDigitalSecurityActive }) {
  return (
    <NewsTicker
      showVideo={showVideo}
      isDigitalSecurityActive={isDigitalSecurityActive}
    />
  );
}

function App() {
 const [isLoading, setIsLoading] = useState(true);


  const [showVideo, setShowVideo] = useState(false);
  const [isDigitalSecurityActive, setIsDigitalSecurityActive] = useState(false);

  const location = useLocation();
  const isOnTransitionPage = location.pathname === "/transition";


   if (isLoading) {
    return <Preloader onFinish={() => setIsLoading(false)} />;
  }

  return (
    <>
     <TickerSwitcher
            showVideo={showVideo}
            isDigitalSecurityActive={isDigitalSecurityActive}
          />
      {/* ✅ Hide NavBar & Ticker ONLY on Transition Page */}
      {!isOnTransitionPage && (
        <>
         
         <NavBar
  showVideo={showVideo}
  setShowVideo={setShowVideo}
  isDigitalSecurityActive={isDigitalSecurityActive}
  setIsDigitalSecurityActive={setIsDigitalSecurityActive} // 🔹 add this
/>

        </>
      )}

      <Routes>
        {/* ✅ Transition Page */}
      <Route
  path="/transition"
  element={
    <TransitionPage onFinish={() => setIsDigitalSecurityActive(true)} />
  }
/>


        {/* ✅ Home Page */}
        <Route
          path="/"
          element={
            <>
              {isDigitalSecurityActive ? (
                <DigitalHeroSection isDigitalSecurityActive={isDigitalSecurityActive} />
              ) : (
                <HeroSection isDigitalSecurityActive={isDigitalSecurityActive} />
              )}

              {/* ✅ Switch Button */}
              <div className="flex justify-center -mt-5 relative z-20">
                <SwitchWithNavigate
                  isDigitalSecurityActive={isDigitalSecurityActive}
                  setIsDigitalSecurityActive={setIsDigitalSecurityActive}
                />
              </div>

              <WhyChooseUs isDigitalSecurityActive={isDigitalSecurityActive} />

              {isDigitalSecurityActive ? (
                <DigitalServices isDigitalSecurityActive={isDigitalSecurityActive} />
              ) : (
                <PhysicalService isDigitalSecurityActive={isDigitalSecurityActive} />
              )}

              <TestCard isDigitalSecurityActive={isDigitalSecurityActive} />
              <Footer />
            </>
          }
        />

        {/* ✅ About Page */}
        <Route
          path="/about"
          element={
            <div className="pt-24">
              <AboutSlider isDigitalSecurityActive={isDigitalSecurityActive} />
              <AboutHeader isDigitalSecurityActive={isDigitalSecurityActive} />
              <Footer />
            </div>
          }
        />

        <Route
          path="/services"
          element={
            <div className="container mx-auto overflow-hidden flex justify-center pt-24">
              <ServiceSlider />
              <Footer />
            </div>
          }
        />
        <Route
          path="/physical-security"
          element={
            <div className="pt-24">
              <PhyscialSlider isDigitalSecurityActive={isDigitalSecurityActive} />
              <Footer />
            </div>
          }
        />
        <Route
          path="/digital-security"
          element={
            <div className="pt-24">
              <DigitalSlider isDigitalSecurityActive={isDigitalSecurityActive} />
              <Footer />
            </div>
          }
        />
        <Route
          path="/contact"
          element={
            <div className="pt-24">
              <ContactForm isDigitalSecurityActive={isDigitalSecurityActive} />
              <Footer />
            </div>
          }
        />
        <Route
          path="/career"
          element={
            <div className="pt-24">
              <CareerPage isDigitalSecurityActive={isDigitalSecurityActive} />
              <Footer />
            </div>
          }
        />
      </Routes>
    </>
  );
}

// ✅ Wrapper for SecuritySwitchButton so it can navigate
function SwitchWithNavigate({ isDigitalSecurityActive, setIsDigitalSecurityActive }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (isDigitalSecurityActive) {
      setIsDigitalSecurityActive(false);
    } else {
      navigate("/transition");
    }
  };

  return (
    <SecuritySwitchButton
      handleSecuritySwitch={handleClick}
      isDigitalSecurityActive={isDigitalSecurityActive}
    />
  );
}

export default App;
