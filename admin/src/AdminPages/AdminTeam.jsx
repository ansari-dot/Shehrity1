import React, { useEffect, useState } from "react";
import axios from "axios";
import { PlusCircle, X, Trash2, Twitter, Linkedin, Facebook } from "lucide-react";
import '../styles/AdminTeam.css';

const API_URL = import.meta.env.VITE_API_URL;

export default function AdminTeam() {
  const [members, setMembers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    type: "physical",
    twitter: "",
    linkedin: "",
    facebook: "",
  });
  
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setFormData({ 
      name: "", 
      role: "",
      type: "physical",
      twitter: "", 
      linkedin: "", 
      facebook: "" 
    });
    setFile(null);
  };

  const fetchMembers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/api/team/get`);
      setMembers(res.data.data || []);
    } catch (err) {
      console.error("Error fetching members:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file) {
      alert("Please upload an image");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("role", formData.role);
    formDataToSend.append("type", formData.type);
    formDataToSend.append("twitter", formData.twitter);
    formDataToSend.append("linkedin", formData.linkedin);
    formDataToSend.append("facebook", formData.facebook);
    formDataToSend.append("image", file);

    try {
      await axios.post(`${API_URL}/api/team/add`, formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      
      setShowModal(false);
      resetForm();
      fetchMembers();
    } catch (err) {
      console.error("Error adding member:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Error adding member");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this member?")) return;
    
    try {
      await axios.delete(`${API_URL}/api/team/delete/${id}`, { 
        withCredentials: true 
      });
      fetchMembers();
    } catch (err) {
      console.error("Error deleting member:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Error deleting member");
    }
  };

  return (
    <div className="team-page-container">
      <header className="team-header">
        <h1>Team Management</h1>
        <button 
          className="btn-primary-theme" 
          onClick={() => setShowModal(true)}
        >
          <PlusCircle size={18} style={{ marginRight: '0.5rem' }} />
          Add Member
        </button>
      </header>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="team-grid">
          {members.map((member) => (
            <div key={member._id} className="team-card">
              <div 
                className="team-type-badge" 
                data-type={member.type || 'physical'}
              >
                {member.type === 'digital' ? 'Digital' : 'Physical'}
              </div>
              <button 
                className="delete-btn" 
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(member._id);
                }}
              >
                <Trash2 size={18} />
              </button>
              <img 
                src={`${API_URL}${member.image.startsWith('/') ? '' : '/'}${member.image}`} 
                alt={member.name} 
                className="team-card-image" 
                onError={(e) => {
                  console.error('Error loading image:', member.image);
                  e.target.src = 'https://via.placeholder.com/150?text=No+Image';
                }}
              />
              <div className="team-card-content">
                <h3>{member.name}</h3>
                <p>{member.role}</p>
                <div className="social-links">
                  {member.socialLinks?.twitter && (
                    <a href={member.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                      <Twitter size={16} />
                    </a>
                  )}
                  {member.socialLinks?.linkedin && (
                    <a href={member.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                      <Linkedin size={16} />
                    </a>
                  )}
                  {member.socialLinks?.facebook && (
                    <a href={member.socialLinks.facebook} target="_blank" rel="noopener noreferrer">
                      <Facebook size={16} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <header className="modal-header">
              <h2>Add New Team Member</h2>
              <button className="btn-action" onClick={() => setShowModal(false)}>
                <X size={24} />
              </button>
            </header>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  className="input-theme" 
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="role">Role</label>
                <input 
                  type="text" 
                  id="role" 
                  name="role" 
                  value={formData.role} 
                  onChange={handleChange} 
                  className="input-theme" 
                  required 
                />
              </div>

              <div className="form-group">
                <label htmlFor="type">Team Type</label>
                <select 
                  id="type" 
                  name="type" 
                  value={formData.type} 
                  onChange={handleChange}
                  className="input-theme"
                  required
                >
                  <option value="physical">Physical Team</option>
                  <option value="digital">Digital Team</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="twitter">Twitter URL</label>
                <input 
                  type="url" 
                  id="twitter" 
                  name="twitter" 
                  value={formData.twitter} 
                  onChange={handleChange} 
                  className="input-theme" 
                  placeholder="https://twitter.com/username"
                />
              </div>

              <div className="form-group">
                <label htmlFor="linkedin">LinkedIn URL</label>
                <input 
                  type="url" 
                  id="linkedin" 
                  name="linkedin" 
                  value={formData.linkedin} 
                  onChange={handleChange} 
                  className="input-theme" 
                  placeholder="https://linkedin.com/in/username"
                />
              </div>

              <div className="form-group">
                <label htmlFor="facebook">Facebook URL</label>
                <input 
                  type="url" 
                  id="facebook" 
                  name="facebook" 
                  value={formData.facebook} 
                  onChange={handleChange} 
                  className="input-theme" 
                  placeholder="https://facebook.com/username"
                />
              </div>

              <div className="form-group">
                <label htmlFor="image">Profile Image</label>
                <input 
                  type="file" 
                  id="image" 
                  onChange={handleFileChange} 
                  className="input-theme" 
                  accept="image/*" 
                  required 
                />
                {file && (
                  <img 
                    src={URL.createObjectURL(file)} 
                    alt="preview" 
                    className="image-preview" 
                    style={{ 
                      width: '100px', 
                      height: '100px', 
                      borderRadius: '50%',
                      marginTop: '10px',
                      objectFit: 'cover'
                    }} 
                  />
                )}
              </div>

              <div className="modal-actions">
                <button 
                  type="button" 
                  className="btn-secondary-theme" 
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn-primary-theme"
                  disabled={loading}
                >
                  {loading ? 'Saving...' : 'Save Member'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
