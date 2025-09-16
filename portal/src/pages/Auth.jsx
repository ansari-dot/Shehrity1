import React, { useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import "./Auth.css";
import { toast } from "react-toastify";
    const path =  import.meta.env.VITE_API_URL

export default function Auth({ onLogin }) {
  const [tab, setTab] = useState("login"); // login | register | forgot | reset
  const [form, setForm] = useState({});
  const [resetToken, setResetToken] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e, type) => {
    e.preventDefault();
    try {
      let res;
      if (type === "login") {
        res = await axios.post(`${path}/api/user/login`, form, {
          withCredentials: true,
        });
         const userId =  res.data.userId;

        // ✅ Save user data from backend into localStorage
        localStorage.setItem("userId", userId);
        if (res.data?.user) {
          localStorage.setItem("user", JSON.stringify(res.data.user));
        }
        // ✅ Save token for API authentication
        if (res.data?.token) {
          localStorage.setItem("token", res.data.token);
        }

        toast.success("Welcome back! You are now logged in.");
        onLogin(); // Call onLogin prop after successful login
      } else if (type === "register") {
        res = await axios.post(`${path}/api/user/register`, form);
        toast.success(res.data?.message || "Registration successful. You can now login.");
      } else if (type === "forgot") {
        res = await axios.post(`${path}/api/user/forgot-password`, {
          email: form.email,
        });
        toast.success(res.data?.message || "Password reset email sent! Check your inbox.");
        setTab("reset"); // Switch to reset password form
      } else if (type === "reset") {
        if (!resetToken) {
          toast.error("Reset token is required");
          return;
        }
        if (form.password !== form.confirmPassword) {
          toast.error("Passwords do not match");
          return;
        }
        if (form.password.length < 6) {
          toast.error("Password must be at least 6 characters long");
          return;
        }
        res = await axios.post(`${path}/api/user/reset-password/${resetToken}`, {
          password: form.password,
        });
        toast.success(res.data?.message || "Password reset successful. Please login.");
        setTab("login"); // Switch back to login
        setForm({}); // Clear form
        setResetToken(""); // Clear reset token
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-grid">
          {/* Left: Form */}
          <div className="auth-form">
            <div className="auth-header">
              <h2 className="auth-title">Welcome back</h2>
              <p className="auth-subtitle">Sign in or create your account to access the portal</p>
            </div>

            {/* Tabs */}
            <div className="auth-tabs">
              <button
                className={`auth-tab-btn ${tab === 'login' ? 'active' : ''}`}
                type="button"
                onClick={() => setTab('login')}
              >
                Login
              </button>
              <button
                className={`auth-tab-btn ${tab === 'register' ? 'active' : ''}`}
                type="button"
                onClick={() => setTab('register')}
              >
                Register
              </button>
            </div>

            {/* ========== LOGIN FORM ========== */}
            {tab === "login" && (
              <Form onSubmit={(e) => handleSubmit(e, "login")}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" name="email" onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" name="password" onChange={handleChange} required />
                </Form.Group>
                <Button type="submit" className="auth-primary-btn mb-2">Login</Button>
                <div className="auth-links">
                  <Button variant="link" onClick={() => setTab("register")}>Create account</Button>
                  <Button variant="link" onClick={() => setTab("forgot")}>Forgot Password?</Button>
                </div>
              </Form>
            )}

            {/* ========== REGISTER FORM ========== */}
            {tab === "register" && (
              <Form onSubmit={(e) => handleSubmit(e, "register")}>
                <Form.Group className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control type="text" name="username" onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" name="email" onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" name="password" onChange={handleChange} required />
                </Form.Group>
                <Button type="submit" className="auth-primary-btn mb-2">Register</Button>
                <Button variant="link" onClick={() => setTab("login")}>Back to Login</Button>
              </Form>
            )}

            {/* ========== FORGOT PASSWORD FORM ========== */}
            {tab === "forgot" && (
              <Form onSubmit={(e) => handleSubmit(e, "forgot")}>
                <div className="auth-header">
                  <h3>Forgot Password</h3>
                  <p>Enter your email address and we'll send you a reset link</p>
                </div>
                <Form.Group className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control 
                    type="email" 
                    name="email" 
                    placeholder="Enter your email address"
                    onChange={handleChange} 
                    required 
                  />
                </Form.Group>
                <Button type="submit" className="auth-primary-btn mb-3">Send Reset Link</Button>
                <div className="auth-links">
                  <Button variant="link" onClick={() => setTab("login")}>Back to Login</Button>
                  <Button variant="link" onClick={() => setTab("reset")}>Already have reset token?</Button>
                </div>
              </Form>
            )}

            {/* ========== RESET PASSWORD FORM ========== */}
            {tab === "reset" && (
              <Form onSubmit={(e) => handleSubmit(e, "reset")}>
                <div className="auth-header">
                  <h3>Reset Password</h3>
                  <p>Enter your reset token and new password</p>
                </div>
                <Form.Group className="mb-3">
                  <Form.Label>Reset Token</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="Enter reset token from email"
                    value={resetToken}
                    onChange={(e) => setResetToken(e.target.value)}
                    required 
                  />
                  <Form.Text className="text-muted">
                    Check your email for the reset token
                  </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control 
                    type="password" 
                    name="password" 
                    placeholder="Enter your new password"
                    onChange={handleChange} 
                    required 
                    minLength="6"
                  />
                  <Form.Text className="text-muted">
                    Password must be at least 6 characters long
                  </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Confirm New Password</Form.Label>
                  <Form.Control 
                    type="password" 
                    name="confirmPassword" 
                    placeholder="Confirm your new password"
                    onChange={handleChange} 
                    required 
                  />
                </Form.Group>
                <Button type="submit" className="auth-primary-btn mb-3">Reset Password</Button>
                <div className="auth-links">
                  <Button variant="link" onClick={() => setTab("login")}>Back to Login</Button>
                  <Button variant="link" onClick={() => setTab("forgot")}>Resend Reset Link</Button>
                </div>
              </Form>
            )}
          </div>

          {/* Right: Visual/brand area */}
          <div className="auth-visual">
            <div className="auth-visual-inner">
              <h3>Your Light Navy Portal</h3>
              <p>
                Streamlined access to quizzes, certificates and career tools. Sign in to continue
                your journey.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
