import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { Button } from "../ui/Button";
import { Mail, Phone, MapPin, MessageCircle, Send } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Contact.css";
const path = import.meta.env.VITE_API_URL;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // get today's date
  const today = new Date().toISOString().split("T")[0];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${path}/add/feedback`,
        { ...formData, date: today },
        { headers: { "Content-Type": "application/json" } }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <motion.div
      className="p-4 p-lg-5"
      style={{
        background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
        minHeight: "100vh",
      }}
      variants={containerVariants}
      initial="hidden"
      animate="visible">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Header */}
      <motion.div className="mb-5" variants={itemVariants}>
        <h1 className="display-5 fw-bold text-dark mb-2">📞 Contact Us</h1>
        <p className="text-muted fs-5">Get in touch with our support team</p>
      </motion.div>

      <div className="row g-4">
        {/* Contact Info */}
        <motion.div className="col-12 col-lg-4" variants={itemVariants}>
          <Card className="h-100">
            <CardHeader>
              <CardTitle className="text-dark">Get in Touch</CardTitle>
            </CardHeader>
            <CardContent className="d-flex flex-column gap-4">
              {[
                {
                  icon: Mail,
                  label: "Email",
                  value: "support@learningportal.com",
                },
                { icon: Phone, label: "Phone", value: "+1 (555) 123-4567" },
                {
                  icon: MapPin,
                  label: "Address",
                  value: "123 Learning St, Education City, EC 12345",
                },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  className="d-flex align-items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}>
                  <motion.div
                    className="bg-primary bg-opacity-10 p-2 rounded-circle"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}>
                    <item.icon className="text-primary" size={20} />
                  </motion.div>
                  <div>
                    <small className="text-muted d-block">{item.label}</small>
                    <span className="text-dark">{item.value}</span>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Contact Form */}
        <motion.div className="col-12 col-lg-8" variants={itemVariants}>
          <Card className="h-100">
            <CardHeader>
              <CardTitle className="text-dark d-flex align-items-center gap-2">
                <MessageCircle size={24} />
                Send us a Message
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form
                className="d-flex flex-column gap-4"
                onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-12 col-md-6">
                    <label className="form-label text-dark">Name</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label text-dark">Email</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="form-label text-dark">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    className="form-control"
                    placeholder="What's this about?"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label className="form-label text-dark">Message</label>
                  <textarea
                    name="message"
                    className="form-control"
                    rows={5}
                    placeholder="Tell us how we can help you..."
                    value={formData.message}
                    onChange={handleChange}
                    required></textarea>
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}>
                  <Button
                    type="submit"
                    className="d-flex align-items-center gap-2">
                    <Send size={16} />
                    Send Message
                  </Button>
                </motion.div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
