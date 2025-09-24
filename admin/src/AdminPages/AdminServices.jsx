import React, { useEffect, useState } from "react";
import axios from "axios";
import { PlusCircle, X, Trash2 } from "lucide-react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/AdminServices.css';

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newService, setNewService] = useState({
    name: "",
    description: "",
    serviceType: "physical", // Changed to match backend enum
    highlights: ["", "", ""] // Default to 3 empty highlights
  });
  const [file, setFile] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState(null);

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

  const handleHighlightChange = (index, value) => {
    const updatedHighlights = [...newService.highlights];
    updatedHighlights[index] = value;
    setNewService({ ...newService, highlights: updatedHighlights });
  };

  const addHighlightField = () => {
    setNewService({
      ...newService,
      highlights: [...newService.highlights, ""]
    });
  };

  const removeHighlightField = (index) => {
    if (newService.highlights.length <= 1) return;
    const updatedHighlights = newService.highlights.filter((_, i) => i !== index);
    setNewService({
      ...newService,
      highlights: updatedHighlights
    });
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) setFile(e.target.files[0]);
  };

  const handleDelete = async (serviceId) => {
    if (!window.confirm('Are you sure you want to delete this service? This action cannot be undone.')) {
      return;
    }

    try {
      setIsDeleting(true);
      await axios.delete(`${API_URL}/api/service/${serviceId}`, {
        withCredentials: true,
      });
      // Show success message
      toast.success('Service deleted successfully!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      // Refresh the services list
      fetchServices();
    } catch (err) {
      console.error('Error deleting service:', err.response?.data || err.message);
      toast.error(err.response?.data?.message || 'Error deleting service', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setIsDeleting(false);
    }
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
    formData.append("type", newService.serviceType); // Changed from serviceType to type
    
    // Handle highlights - filter out empty strings and send as array
    const validHighlights = newService.highlights.filter(h => h && h.trim() !== '');
    formData.append("highlights", JSON.stringify(validHighlights));
    
    formData.append("image", file);

    try {
      await axios.post(`${API_URL}/api/service/add`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      
      // Show success message
      toast.success('Service added successfully!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      
      // Reset form and refresh list
      fetchServices();
      setShowModal(false);
      setNewService({ 
        name: "", 
        description: "", 
        serviceType: "physical",
        highlights: ["", "", ""]
      });
      setFile(null);
    } catch (err) {
      console.error("Error adding service:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Error adding service", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <div className="services-page-container">
      <ToastContainer />
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
              <div className="service-card-header">
                <h3>{service.name}</h3>
                <button 
                  className="btn-icon" 
                  onClick={(e) => {
                    e.stopPropagation();
                    if (window.confirm('Are you sure you want to delete this service?')) {
                      handleDelete(service._id);
                    }
                  }}
                  disabled={isDeleting}
                  title="Delete service"
                >
                  <Trash2 size={18} className="icon-danger" />
                </button>
              </div>
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
                  <option value="physical">Physical Service</option>
                  <option value="digital">Digital Service</option>
                  <option value="other">Other Service</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="image">Image</label>
                <input type="file" id="image" onChange={handleFileChange} className="input-theme" accept="image/*" required />
                {file && <img src={URL.createObjectURL(file)} alt="preview" className="image-preview" />}
              </div>
              
              <div className="form-group">
                <label>Highlights</label>
                {newService.highlights.map((highlight, index) => (
                  <div key={index} className="highlight-input-group">
                    <input
                      type="text"
                      value={highlight}
                      onChange={(e) => handleHighlightChange(index, e.target.value)}
                      className="input-theme"
                      placeholder={`Highlight ${index + 1}`}
                    />
                    {newService.highlights.length > 1 && (
                      <button 
                        type="button" 
                        onClick={() => removeHighlightField(index)}
                        className="btn-icon"
                        style={{ marginLeft: '8px' }}
                        title="Remove highlight"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                ))}
                <button 
                  type="button" 
                  onClick={addHighlightField}
                  className="btn-text"
                  style={{ marginTop: '8px' }}
                >
                  + Add another highlight
                </button>
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
