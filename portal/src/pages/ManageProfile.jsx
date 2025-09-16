import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card'
import { Button } from '../ui/Button'
import { ArrowLeft, User, Mail, Phone, MapPin, Camera, Save, Lock } from 'lucide-react'
import { useState, useEffect } from 'react'
import axios from 'axios'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

export default function ManageProfile({ onBack }) {
  const [profile, setProfile] = useState({
    username: '',
    email: '',
    phone: '',
    location: '',
    bio: ''
  })
  const [passwords, setPasswords] = useState({ currentPassword: '', newPassword: '' })

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/user/profile', { withCredentials: true })
        setProfile(res.data.user)
      } catch (err) {
        console.error(err)
      }
    }
    fetchProfile()
  }, [])

  const handleProfileChange = e => setProfile({ ...profile, [e.target.name]: e.target.value })
  const handlePasswordChange = e => setPasswords({ ...passwords, [e.target.name]: e.target.value })

  const handleSaveProfile = async () => {
    try {
      const res = await axios.put('http://localhost:5000/api/user/update-profile', {
        username: profile.username,
        email: profile.email
      }, { withCredentials: true })
      alert(res.data.message)
    } catch (err) {
      alert(err.response?.data?.message || 'Error updating profile')
    }
  }

  const handleChangePassword = async () => {
    try {
      const res = await axios.put('http://localhost:5000/api/user/change-password', passwords, { withCredentials: true })
      alert(res.data.message)
      setPasswords({ currentPassword: '', newPassword: '' })
    } catch (err) {
      alert(err.response?.data?.message || 'Error changing password')
    }
  }

  return (
    <motion.div className="p-4 p-lg-5" style={{ background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)', minHeight: '100vh' }} variants={containerVariants} initial="hidden" animate="visible">
      
      {/* Header */}
      <motion.div className="d-flex align-items-center gap-3 mb-5" variants={itemVariants}>
        <motion.button className="btn btn-outline-primary d-flex align-items-center gap-2" onClick={onBack} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <ArrowLeft size={16} /> Back
        </motion.button>
        <div>
          <h1 className="display-6 fw-bold text-dark mb-0">👤 Manage Profile</h1>
          <p className="text-muted mb-0">Update your personal information & password</p>
        </div>
      </motion.div>

      <div className="row g-4">
        {/* Profile Form */}
        <motion.div className="col-12 col-lg-8" variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle className="text-dark">Personal Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="d-flex flex-column gap-4" onSubmit={e => e.preventDefault()}>
                <div>
                  <label className="form-label text-dark">Username</label>
                  <input type="text" className="form-control" name="username" value={profile.username} onChange={handleProfileChange} />
                </div>
                <div>
                  <label className="form-label text-dark">Email</label>
                  <input type="email" className="form-control" name="email" value={profile.email} onChange={handleProfileChange} />
                </div>

                <motion.div className="d-flex gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                  <Button onClick={handleSaveProfile} className="d-flex align-items-center gap-2"><Save size={16} /> Save Changes</Button>
                  <Button variant="outline" className="d-flex align-items-center gap-2" onClick={onBack}>Cancel</Button>
                </motion.div>

                {/* Password Update */}
                <hr />
                <h6>Change Password</h6>
                <div>
                  <label className="form-label text-dark">Current Password</label>
                  <input type="password" className="form-control" name="currentPassword" value={passwords.currentPassword} onChange={handlePasswordChange} />
                </div>
                <div>
                  <label className="form-label text-dark">New Password</label>
                  <input type="password" className="form-control" name="newPassword" value={passwords.newPassword} onChange={handlePasswordChange} />
                </div>
                <Button onClick={handleChangePassword} className="d-flex align-items-center gap-2 mt-2"><Lock size={16} /> Update Password</Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}
