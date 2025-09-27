import { motion } from "framer-motion";
import {
  LayoutDashboard,
  BookOpen,
  Award,
  Briefcase,
  MessageCircle,
  User,
  LogOut,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import "./SideBar.css";
import img1 from "../assets/logo.png";
import { toast } from "react-toastify";

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: "/" },
  { id: "quiz", label: "Quizzes", icon: BookOpen, path: "/quiz" },
  { id: "certificate", label: "Certificates", icon: Award, path: "/certificate" },
  { id: "career", label: "Career", icon: Briefcase, path: "/career" },
  { id: "contact", label: "Contact", icon: MessageCircle, path: "/contact" },
 // { id: "profile", label: "Profile", icon: User, path: "/profile" },
];

const Sidebar = ({ onLogout, isOpen = false, onClose = () => {} }) => {
  const navigate = useNavigate();
  const path =  import.meta.env.VITE_API_URL

  const handleLogout = async () => {
    try {
      await axios.post(`${path}/user/logout`, {}, { withCredentials: true });

      // ✅ Remove user data from localStorage
      localStorage.removeItem("user");
      localStorage.removeItem("userId");

      // Call the onLogout prop from App.jsx
      onLogout();
      onClose();
      toast.success("You have been logged out.");
    } catch (err) {
      console.error("Logout failed", err);
      toast.error("Failed to logout. Please try again.");
    }
  };

  // ✅ Load username from localStorage
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const username = storedUser?.username || "John Doe";

  return (
    <motion.div
      className={`sidebar ${isOpen ? "open" : ""}`}
    >
      
      {/* Header */}
      <motion.div
        className="sidebar-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}>
        
        <div className="sidebar-user">
          <img
            src={img1}
            alt="User Avatar"
            className="sidebar-avatar"
            onClick={() => { navigate("/profile"); onClose(); }}
          />
          <h5 className="sidebar-username" style={{ color: "white" }}>
            {username}
          </h5>
        </div>
      </motion.div>

      {/* Navigation Menu */}
      <nav className="sidebar-nav">
        <ul className="list-unstyled">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.li
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * (index + 3), duration: 0.3 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `sidebar-link ${isActive ? "active" : ""}`
                  }
                  onClick={onClose}
                >
                  <Icon className="me-3" size={18} />
                  <span>{item.label}</span>
                </NavLink>
              </motion.li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <motion.div
        className="sidebar-footer"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.4 }}>
        
        {/* Manage Profile now navigates to /profile */}
        <motion.button
          className="sidebar-btn profile-btn"
          onClick={() => { navigate("/profile"); onClose(); }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}>
          <User className="me-3" size={18} />
          <small>Manage Profile</small>
        </motion.button>

        <motion.button
          className="sidebar-btn logout-btn"
          onClick={handleLogout}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}>
          <LogOut className="me-3" size={16} />
          <small>Logout</small>
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default Sidebar;

