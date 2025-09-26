import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute.jsx";

// Lazy imports for Admin Pages
const AdminLogin = lazy(() => import("./AdminPages/AdminLogin.jsx"));
const AdminDashboard = lazy(() => import("./AdminPages/AdminDashboard.jsx"));
const AdminProfile = lazy(() => import("./AdminPages/AdminProfile.jsx"));
const AdminQuiz = lazy(() => import("./AdminPages/AdminQuiz.jsx"));
const AdminCertificate = lazy(() => import("./AdminPages/AdminCertificate.jsx"));
const AdminServices = lazy(() => import("./AdminPages/AdminServices.jsx"));
const AdminCareer = lazy(() => import("./AdminPages/AdminCareer.jsx"));
const AdminTeam = lazy(() => import("./AdminPages/AdminTeam.jsx"));
const AdminTestimonials = lazy(() => import("./AdminPages/AdminTestimonials.jsx"));
const AdminDashboardContent = lazy(() => import("./AdminPages/AdminDashboardContent.jsx"));

const Router = () => {
  return (
    <BrowserRouter>
      {/* Suspense fallback for lazy components */}
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<AdminLogin />} />
          <Route path="/admin" element={<ProtectedRoute isAdmin={true} />}>
            <Route element={<AdminDashboard />}>
              <Route index element={<AdminDashboardContent />} />
              <Route path="profile" element={<AdminProfile />} />
              <Route path="quiz" element={<AdminQuiz />} />
              <Route path="certificate" element={<AdminCertificate />} />
              <Route path="services" element={<AdminServices />} />
              <Route path="career" element={<AdminCareer />} />
              <Route path="team" element={<AdminTeam />} />
              <Route path="testimonials" element={<AdminTestimonials />} />
              {/* Add more nested routes for admin pages here */}
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;
