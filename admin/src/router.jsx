import React from 'react'
import AdminLogin from './AdminPages/AdminLogin.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
//import AdminRegister from './AdminPages/AdminRegister.jsx'
import AdminDashboard from './AdminPages/AdminDashboard.jsx'
import AdminProfile from './AdminPages/AdminProfile.jsx'
import AdminQuiz from './AdminPages/AdminQuiz.jsx'
import AdminCertificate from './AdminPages/AdminCertificate.jsx'
import AdminServices from './AdminPages/AdminServices.jsx'
import AdminCareer from './AdminPages/AdminCareer.jsx'
import AdminTeam from './AdminPages/AdminTeam.jsx'
import AdminTestimonials from './AdminPages/AdminTestimonials.jsx'
import ProtectedRoute from './ProtectedRoute.jsx'
import AdminDashboardContent from './AdminPages/AdminDashboardContent.jsx'

const router = () => {
    return (
        <>
            <BrowserRouter>
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
            </BrowserRouter>
        </>
    )
}

export default router
