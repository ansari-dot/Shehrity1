import React, { useEffect, useState } from "react";
import axios from "axios";
import { PlusCircle, X } from "lucide-react";
import '../styles/AdminServices.css';

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newService, setNewService] = useState({
    name: "",
    description: "",
    serviceType: "Physical Service",
  });
  const [file, setFile] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

  const fetchServices = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/service/get`);
      setServices(data);
    } catch (err) {
      console.error("Error fetching services:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleChange = (e) => {
    setNewService({ ...newService, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newService.name || !newService.description || !file) {
      alert("Please fill all fields and select an image!");
      return;
    }

    const formData = new FormData();
    formData.append("name", newService.name);
    formData.append("description", newService.description);
    formData.append("serviceType", newService.serviceType);
    formData.append("image", file);

    try {
      await axios.post(`${API_URL}/api/service/add`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      fetchServices();
      setShowModal(false);
      setNewService({ name: "", description: "", serviceType: "Physical Service" });
      setFile(null);
    } catch (err) {
      console.error("Error adding service:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Error adding service");
    }
  };

  return (
    <div className="services-page-container">
      <header className="services-header">
        <h1>Our Services</h1>
        <button className="btn-primary-theme" onClick={() => setShowModal(true)}>
          <PlusCircle size={18} style={{ marginRight: '0.5rem' }} />
          Add Service
        </button>
      </header>

      <div className="services-grid">
        {services.map((service) => (
          <div key={service._id} className="service-card">
            <img src={`${API_URL}${service.image}`} alt={service.name} className="service-card-image" />
            <div className="service-card-content">
              <span className="service-type">{service.type}</span>
              <h3>{service.name}</h3>
              <p>{service.description}</p>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <header className="modal-header">
              <h2>Add New Service</h2>
              <button className="btn-action" onClick={() => setShowModal(false)}><X size={24} /></button>
            </header>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Service Name</label>
                <input type="text" id="name" name="name" value={newService.name} onChange={handleChange} className="input-theme" required />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input type="text" id="description" name="description" value={newService.description} onChange={handleChange} className="input-theme" required />
              </div>
              <div className="form-group">
                <label htmlFor="serviceType">Service Type</label>
                <select id="serviceType" name="serviceType" value={newService.serviceType} onChange={handleChange} className="input-theme" required>
                  <option value="Physical Service">Physical Service</option>
                  <option value="Digital Service">Digital Service</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="image">Image</label>
                <input type="file" id="image" onChange={handleFileChange} className="input-theme" accept="image/*" required />
                {file && <img src={URL.createObjectURL(file)} alt="preview" className="image-preview" />}
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-secondary-theme" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary-theme">Save Service</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
