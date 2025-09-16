import React, { useEffect, useState } from "react";
import axios from "axios";
import { PlusCircle, X, Trash2 } from "lucide-react";
import '../styles/AdminTestimonials.css';

const API_URL = import.meta.env.VITE_API_URL;

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    message: "",
    image: null,
  });

  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${API_URL}/api/testimonial/get`);
      setTestimonials(data);
    } catch (err) {
      console.error("Error fetching testimonials:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const fd = new FormData();
      fd.append("name", formData.name);
      fd.append("message", formData.message);
      if (formData.image) fd.append("image", formData.image);

      await axios.post(`${API_URL}/api/testimonial/add`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      setShowModal(false);
      setFormData({ name: "", message: "", image: null });
      fetchTestimonials();
    } catch (err) {
      console.error("Error adding testimonial:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Error adding testimonial");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this testimonial?")) return;
    try {
      await axios.delete(`${API_URL}/api/testimonial/delete/${id}`, { withCredentials: true });
      fetchTestimonials();
    } catch (err) {
      console.error("Error deleting testimonial:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Error deleting testimonial");
    }
  };

  return (
    <div className="testimonials-page-container">
      <header className="testimonials-header">
        <h1>Testimonials</h1>
        <button className="btn-primary-theme" onClick={() => setShowModal(true)}>
          <PlusCircle size={18} style={{ marginRight: '0.5rem' }} />
          Add Testimonial
        </button>
      </header>

      {loading ? <p>Loading...</p> : (
        <div className="testimonials-grid">
          {testimonials.map((t) => (
            <div key={t._id} className="testimonial-card">
              <button className="delete-btn" onClick={() => handleDelete(t._id)}><Trash2 size={18} /></button>
              <div className="testimonial-card-header">
                <img src={`${API_URL}${t.image}`} alt={t.name} className="testimonial-image" />
                <div className="testimonial-author">
                  <h3>{t.name}</h3>
                </div>
              </div>
              <p>"{t.message}"</p>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <header className="modal-header">
              <h2>Add New Testimonial</h2>
              <button className="btn-action" onClick={() => setShowModal(false)}><X size={24} /></button>
            </header>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="input-theme" required />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" value={formData.message} onChange={handleChange} className="input-theme" rows="4" required />
              </div>
              <div className="form-group">
                <label htmlFor="image">Image</label>
                <input type="file" id="image" name="image" onChange={handleChange} className="input-theme" accept="image/*" />
                {formData.image && <img src={URL.createObjectURL(formData.image)} alt="preview" className="image-preview" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />}
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-secondary-theme" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary-theme">Save Testimonial</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
