import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import React, { useState, Suspense, lazy } from "react";

// Lazy imports for heavy components
const DigitalServices = lazy(() => import("./Components/Sections/DigitalServicesComponent"));
const DigitalHeroSection = lazy(() => import("./Components/DigitalHeroSection"));
const NavBar = lazy(() => import("./Components/NavBar"));
const NewsTicker = lazy(() => import("./Components/NewsUpdate/NewsTicker"));
const HeroSection = lazy(() => import("./Components/PhysicalSectionHeroSection"));
const WhyChooseUs = lazy(() => import("./Components/WhyChooseUs"));
const PhysicalService = lazy(() => import("./Components/Sections/PhysicalServiceComponent"));
const TestCard = lazy(() => import("./Components/TestCard"));
const Footer = lazy(() => import("./Components/Footer"));
const AboutHeader = lazy(() => import("./Components/AboutUs/AboutHeader"));
const ServiceSlider = lazy(() => import("./Components/Services/ServiceSlider"));
const PhyscialSlider = lazy(() => import("./Components/PhysicalSecurity/PhyscialSlider"));
const DigitalSlider = lazy(() => import("./Components/DigitalSecurity/DigitalSlider"));
const ContactForm = lazy(() => import("./Components/ContactPage/ContactForm"));
const CareerPage = lazy(() => import("./Components/Career/CareerPage"));
const SecuritySwitchButton = lazy(() => import("./Components/SecuritySwitchButton/SwitchButton"));
const TransitionPage = lazy(() => import("./Components/Transition/TransitionVedios"));
const AboutSlider = lazy(() => import("./Components/AboutUs/AboutSlider"));
const Preloader = lazy(() => import("./Components/Preloader/Preloader"));

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
    return (
      <Suspense fallback={<div>Loading Preloader...</div>}>
        <Preloader onFinish={() => setIsLoading(false)} />
      </Suspense>
    );
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <>
        <TickerSwitcher
          showVideo={showVideo}
          isDigitalSecurityActive={isDigitalSecurityActive}
        />

        {/* ✅ Hide NavBar & Ticker ONLY on Transition Page */}
        {!isOnTransitionPage && (
          <NavBar
            showVideo={showVideo}
            setShowVideo={setShowVideo}
            isDigitalSecurityActive={isDigitalSecurityActive}
            setIsDigitalSecurityActive={setIsDigitalSecurityActive}
          />
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

          {/* ✅ Services Page */}
          <Route
            path="/services"
            element={
              <div className="container mx-auto overflow-hidden flex justify-center pt-24">
                <ServiceSlider />
                <Footer />
              </div>
            }
          />

          {/* ✅ Physical Security */}
          <Route
            path="/physical-security"
            element={
              <div className="pt-24">
                <PhyscialSlider isDigitalSecurityActive={isDigitalSecurityActive} />
                <Footer />
              </div>
            }
          />

          {/* ✅ Digital Security */}
          <Route
            path="/digital-security"
            element={
              <div className="pt-24">
                <DigitalSlider isDigitalSecurityActive={isDigitalSecurityActive} />
                <Footer />
              </div>
            }
          />

          {/* ✅ Contact Page */}
          <Route
            path="/contact"
            element={
              <div className="pt-24">
                <ContactForm isDigitalSecurityActive={isDigitalSecurityActive} />
                <Footer />
              </div>
            }
          />

          {/* ✅ Career Page */}
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
    </Suspense>
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
