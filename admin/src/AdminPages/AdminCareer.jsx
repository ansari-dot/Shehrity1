import React, { useEffect, useState } from "react";
import axios from "axios";
import { PlusCircle, X, Trash2, Eye, Download, Calendar, MapPin, DollarSign, CheckCircle, XCircle } from "lucide-react";
import '../styles/AdminCareer.css';
import { adminCareerAPI } from '../services/api';

export default function AdminCareer() {
  const [careers, setCareers] = useState([]);
  const [applications, setApplications] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showApplicationsModal, setShowApplicationsModal] = useState(false);
  const [selectedCareerApplications, setSelectedCareerApplications] = useState([]);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [newCareer, setNewCareer] = useState({
    title: "",
    company: "",
    location: "",
    type: "Full-time",
    salary: "",
    posted: "Today",
    applyLink: "https://www.google.com"
  });
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL;

  const fetchCareers = async () => {
    try {
      const data = await adminCareerAPI.getJobs();
      console.log('Fetched careers:', data);
      setCareers(data.data || data || []);
    } catch (err) {
      console.error("Error fetching careers:", err.message);
      // Fallback data for testing
      setCareers([
        {
          _id: '1',
          title: "Frontend Developer",
          company: "Tech Corp",
          location: "Remote",
          type: "Full-time",
          salary: "$70,000 - $90,000",
          posted: "2 days ago",
        },
        {
          _id: '2',
          title: "React Developer",
          company: "Startup Inc",
          location: "New York, NY",
          type: "Full-time",
          salary: "$80,000 - $100,000",
          posted: "1 week ago",
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const fetchApplications = async () => {
    try {
      const data = await adminCareerAPI.getAllApplications();
      console.log('Fetched applications:', data);
      setApplications(data.data || data || []);
    } catch (err) {
      console.error("Error fetching applications:", err.message);
      // Add test data to see buttons
      setApplications([
        {
          _id: 'test1',
          jobId: { _id: '1', title: 'Frontend Developer', company: 'Tech Corp' },
          userId: { username: 'John Doe', email: 'john@example.com' },
          name: 'John Doe',
          email: 'john@example.com',
          cv: '/uploads/cvs/john-cv.pdf',
          coverLetter: 'I am very interested in this position and have 3 years of experience...',
          status: 'pending',
          createdAt: new Date().toISOString()
        },
        {
          _id: 'test2',
          jobId: { _id: '2', title: 'Backend Developer', company: 'Dev Solutions' },
          userId: { username: 'Jane Smith', email: 'jane@example.com' },
          name: 'Jane Smith',
          email: 'jane@example.com',
          cv: '/uploads/cvs/jane-cv.pdf',
          coverLetter: 'I have 5 years of backend development experience with Node.js...',
          status: 'pending',
          createdAt: new Date().toISOString()
        },
        {
          _id: 'test3',
          jobId: { _id: '3', title: 'Full Stack Developer', company: 'Startup Inc' },
          userId: { username: 'Mike Johnson', email: 'mike@example.com' },
          name: 'Mike Johnson',
          email: 'mike@example.com',
          cv: '/uploads/cvs/mike-cv.pdf',
          coverLetter: 'Full stack developer with React and Express expertise...',
          status: 'approved',
          createdAt: new Date().toISOString()
        }
      ]);
    }
  };

  useEffect(() => {
    fetchCareers();
    fetchApplications();
  }, []);

  const handleChange = (e) => {
    setNewCareer({ ...newCareer, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newCareer.title || !newCareer.company || !newCareer.location || !newCareer.salary) {
      alert("Please fill all required fields!");
      return;
    }

    try {
      await adminCareerAPI.addJob(newCareer);
      fetchCareers();
      setShowModal(false);
      setNewCareer({
        title: "",
        company: "",
        location: "",
        type: "Full-time",
        salary: "",
        posted: "Today",
        applyLink: "https://www.google.com"
      });
      alert("Career added successfully!");
    } catch (err) {
      console.error("Error adding career:", err.message);
      alert(err.message || "Error adding career");
    }
  };

  const handleDelete = async (careerId) => {
    if (!window.confirm("Are you sure you want to delete this career?")) return;

    try {
      await adminCareerAPI.deleteJob(careerId);
      fetchCareers();
      alert("Career deleted successfully!");
    } catch (err) {
      console.error("Error deleting career:", err.message);
      alert(err.message || "Error deleting career");
    }
  };

  const viewApplications = (careerId) => {
    const careerApplications = applications.filter(app => 
      app.jobId?._id === careerId || app.jobId === careerId
    );
    setSelectedCareerApplications(careerApplications);
    setShowApplicationsModal(true);
  };

  const downloadCV = (cvPath) => {
    // Create proper download URL
    const fullUrl = `http://localhost:5000/${cvPath}`;
    console.log('Downloading CV from:', fullUrl);
    
    // Create a temporary link element for download
    const link = document.createElement('a');
    link.href = fullUrl;
    link.download = cvPath.split('/').pop(); // Get filename from path
    link.target = '_blank';
    
    // Append to body, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const openPreview = (application) => {
    setSelectedApplication(application);
    setShowPreviewModal(true);
  };

  const closePreview = () => {
    setShowPreviewModal(false);
    setSelectedApplication(null);
  };

  // Update application status and send email
  const updateApplicationStatus = async (applicationId, status) => {
    try {
      const result = await adminCareerAPI.updateApplicationStatus(applicationId, status);
      
      // Update local state
      setApplications(prev => 
        prev.map(app => 
          app._id === applicationId 
            ? { ...app, status } 
            : app
        )
      );
      
      // Update selected career applications if modal is open
      setSelectedCareerApplications(prev => 
        prev.map(app => 
          app._id === applicationId 
            ? { ...app, status } 
            : app
        )
      );
      
      // Show success message with email status
      const emailStatus = result.emailSent ? "Email sent successfully!" : "Email failed to send.";
      alert(`Application ${status} successfully! ${emailStatus}`);
      
    } catch (err) {
      console.error("Error updating application status:", err.message);
      alert(`Error updating application status: ${err.message}`);
    }
  };

  if (loading) {
    return (
      <div className="career-page-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading careers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="career-page-container">
      <header className="career-header">
        <h1>Career Management</h1>
        <button className="btn-primary-theme" onClick={() => setShowModal(true)}>
          <PlusCircle size={18} style={{ marginRight: '0.5rem' }} />
          Add Career
        </button>
      </header>

      {/* Careers Section */}
      <div className="careers-section">
        <h2>Available Careers ({careers.length})</h2>
        <div className="careers-grid">
          {careers.map((career) => (
            <div key={career._id} className="career-card">
              <div className="career-card-header">
                <h3>{career.title}</h3>
                <div className="career-actions">
                  <button 
                    className="btn-view" 
                    onClick={() => viewApplications(career._id)}
                    title="View Applications">
                    <Eye size={16} />
                  </button>
                  <button 
                    className="btn-delete" 
                    onClick={() => handleDelete(career._id)}
                    title="Delete Career">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <div className="career-card-content">
                <p className="company">{career.company}</p>
                <div className="career-details">
                  <span className="detail-item">
                    <MapPin size={14} />
                    {career.location}
                  </span>
                  <span className="detail-item">
                    <Calendar size={14} />
                    {career.type}
                  </span>
                  <span className="detail-item salary">
                    <DollarSign size={14} />
                    {career.salary}
                  </span>
                </div>
                <p className="posted-date">Posted {career.posted}</p>
                <div className="applications-count">
                  Applications: {applications.filter(app => 
                    app.jobId?._id === career._id || app.jobId === career._id
                  ).length}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Applications Section */}
      <div className="applications-section">
        <h2>All Applications ({applications.length})</h2>
        {applications.length === 0 ? (
          <div className="no-applications">
            <p>No applications found. Applications will appear here once users apply for jobs.</p>
          </div>
        ) : (
          <div className="applications-grid">
            {applications.map((application) => (
              <div key={application._id} className="application-card">
                <div className="application-header">
                  <div className="applicant-info">
                    <h3>{application.name || application.userId?.username}</h3>
                    <p className="email">{application.email || application.userId?.email}</p>
                  </div>
                  <span className={`status-badge status-${application.status || 'pending'}`}>
                    {application.status || 'pending'}
                  </span>
                </div>
                
                <div className="application-details">
                  <div className="job-info">
                    <p><strong>Position:</strong> {application.jobId?.title || 'N/A'}</p>
                    <p><strong>Company:</strong> {application.jobId?.company || 'N/A'}</p>
                    <p><strong>Applied:</strong> {new Date(application.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="application-actions">
                  <button 
                    className="btn-preview"
                    onClick={() => openPreview(application)}>
                    <Eye size={16} />
                    Preview
                  </button>
                  
                  {application.status === 'pending' && (
                    <>
                      <button 
                        className="btn-approve"
                        onClick={() => updateApplicationStatus(application._id, 'approved')}
                        title="Approve Application">
                        <CheckCircle size={16} />
                        Accept
                      </button>
                      <button 
                        className="btn-reject"
                        onClick={() => updateApplicationStatus(application._id, 'rejected')}
                        title="Reject Application">
                        <XCircle size={16} />
                        Reject
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Career Modal */}
      {showModal && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <header className="modal-header">
              <h2>Add New Career</h2>
              <button className="btn-action" onClick={() => setShowModal(false)}>
                <X size={24} />
              </button>
            </header>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="title">Job Title *</label>
                  <input 
                    type="text" 
                    id="title" 
                    name="title" 
                    value={newCareer.title} 
                    onChange={handleChange} 
                    className="input-theme" 
                    placeholder="e.g. Frontend Developer"
                    required 
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="company">Company *</label>
                  <input 
                    type="text" 
                    id="company" 
                    name="company" 
                    value={newCareer.company} 
                    onChange={handleChange} 
                    className="input-theme" 
                    placeholder="e.g. Tech Corp"
                    required 
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="location">Location *</label>
                  <input 
                    type="text" 
                    id="location" 
                    name="location" 
                    value={newCareer.location} 
                    onChange={handleChange} 
                    className="input-theme" 
                    placeholder="e.g. Remote, New York"
                    required 
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="type">Job Type *</label>
                  <select 
                    id="type" 
                    name="type" 
                    value={newCareer.type} 
                    onChange={handleChange} 
                    className="input-theme" 
                    required>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="salary">Salary *</label>
                  <input 
                    type="text" 
                    id="salary" 
                    name="salary" 
                    value={newCareer.salary} 
                    onChange={handleChange} 
                    className="input-theme" 
                    placeholder="e.g. $70,000 - $90,000"
                    required 
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="posted">Posted</label>
                  <input 
                    type="text" 
                    id="posted" 
                    name="posted" 
                    value={newCareer.posted} 
                    onChange={handleChange} 
                    className="input-theme" 
                    placeholder="e.g. Today, 2 days ago"
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="applyLink">Apply Link</label>
                <input 
                  type="url" 
                  id="applyLink" 
                  name="applyLink" 
                  value={newCareer.applyLink} 
                  onChange={handleChange} 
                  className="input-theme" 
                  placeholder="https://company.com/apply"
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-secondary-theme" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary-theme">
                  Add Career
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Applications Modal */}
      {showApplicationsModal && (
        <div className="modal-backdrop">
          <div className="modal-content large-modal">
            <header className="modal-header">
              <h2>Applications ({selectedCareerApplications.length})</h2>
              <button className="btn-action" onClick={() => setShowApplicationsModal(false)}>
                <X size={24} />
              </button>
            </header>
            <div className="applications-modal-content">
              {selectedCareerApplications.length === 0 ? (
                <p className="no-applications">No applications found for this career.</p>
              ) : (
                <div className="applications-list">
                  {selectedCareerApplications.map((application) => (
                    <div key={application._id} className="application-item">
                      <div className="application-header">
                        <h4>{application.name || application.userId?.username}</h4>
                        <span className="application-date">
                          {new Date(application.createdAt).toLocaleDateString()}
                        </span>
                        <span className={`status-badge status-${application.status || 'pending'}`}>
                          {application.status || 'pending'}
                        </span>
                      </div>
                      <p className="application-email">{application.email || application.userId?.email}</p>
                      {application.coverLetter && (
                        <div className="cover-letter">
                          <strong>Cover Letter:</strong>
                          <p>{application.coverLetter}</p>
                        </div>
                      )}
                      <div className="application-item-actions">
                        {application.cv && (
                          <button 
                            className="btn-download"
                            onClick={() => downloadCV(application.cv)}>
                            <Download size={14} />
                            Download CV
                          </button>
                        )}
                        <button 
                          className="btn-approve"
                          onClick={() => updateApplicationStatus(application._id, 'approved')}
                          title="Approve Application">
                          <CheckCircle size={14} />
                          Approve
                        </button>
                        <button 
                          className="btn-reject"
                          onClick={() => updateApplicationStatus(application._id, 'rejected')}
                          title="Reject Application">
                          <XCircle size={14} />
                          Reject
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Application Preview Modal */}
      {showPreviewModal && selectedApplication && (
        <div className="modal-backdrop">
          <div className="modal-content preview-modal">
            <header className="modal-header">
              <h2>Application Preview</h2>
              <button className="btn-action" onClick={closePreview}>
                <X size={24} />
              </button>
            </header>
            
            <div className="preview-content">
              <div className="applicant-section">
                <h3>Applicant Information</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <label>Name:</label>
                    <span>{selectedApplication.name || selectedApplication.userId?.username}</span>
                  </div>
                  <div className="info-item">
                    <label>Email:</label>
                    <span>{selectedApplication.email || selectedApplication.userId?.email}</span>
                  </div>
                  <div className="info-item">
                    <label>Position:</label>
                    <span>{selectedApplication.jobId?.title || 'N/A'}</span>
                  </div>
                  <div className="info-item">
                    <label>Company:</label>
                    <span>{selectedApplication.jobId?.company || 'N/A'}</span>
                  </div>
                  <div className="info-item">
                    <label>Applied Date:</label>
                    <span>{new Date(selectedApplication.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="info-item">
                    <label>Status:</label>
                    <span className={`status-badge status-${selectedApplication.status || 'pending'}`}>
                      {selectedApplication.status || 'pending'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="cv-section">
                <h3>CV Information</h3>
                <div className="cv-info">
                  <div className="cv-name">
                    <label>CV File:</label>
                    <span>{selectedApplication.cv ? selectedApplication.cv.split('/').pop() : 'No CV uploaded'}</span>
                  </div>
                  {selectedApplication.cv && (
                    <button 
                      className="btn-download"
                      onClick={() => downloadCV(selectedApplication.cv)}>
                      <Download size={16} />
                      Download CV
                    </button>
                  )}
                </div>
              </div>

              <div className="cover-letter-section">
                <h3>Cover Letter</h3>
                <div className="cover-letter-content">
                  {selectedApplication.coverLetter ? (
                    <p>{selectedApplication.coverLetter}</p>
                  ) : (
                    <p className="no-cover-letter">No cover letter provided</p>
                  )}
                </div>
              </div>

              {selectedApplication.status === 'pending' && (
                <div className="preview-actions">
                  <button 
                    className="btn-approve"
                    onClick={() => {
                      updateApplicationStatus(selectedApplication._id, 'approved');
                      closePreview();
                    }}>
                    <CheckCircle size={16} />
                    Accept Application
                  </button>
                  <button 
                    className="btn-reject"
                    onClick={() => {
                      updateApplicationStatus(selectedApplication._id, 'rejected');
                      closePreview();
                    }}>
                    <XCircle size={16} />
                    Reject Application
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
