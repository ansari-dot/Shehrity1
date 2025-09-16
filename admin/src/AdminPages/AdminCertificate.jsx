import React, { useEffect, useState } from "react";
import axios from "axios";
import { X, UploadCloud } from "lucide-react";
import '../styles/AdminCertificate.css';

export default function AdminCertificate() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [file, setFile] = useState(null);
  const path = import.meta.env.VITE_API_URL;

  const fetchResults = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${path}/api/result/get`, { withCredentials: true });
      if (res.data.success) {
        setResults(res.data.data);
      }
    } catch (err) {
      console.error("Error fetching results:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !selectedUser) return;

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("userId", selectedUser._id); 

      const res = await axios.post(`${path}/api/certificate/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      if (res.data.success) {
        alert("Certificate uploaded successfully!");
        setShowModal(false);
        setFile(null);
        setSelectedUser(null);
        fetchResults();
      }
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload failed!");
    }
  };

  return (
    <div className="certificate-page-container">
      <header className="certificate-header">
        <h1>Certificate Management</h1>
      </header>

      <div className="certificate-table-container">
        {loading ? (
          <div className="loading-spinner">Loading...</div>
        ) : (
          <table className="certificate-table">
            <thead>
              <tr>
                <th>#</th>
                <th>User</th>
                <th>Email</th>
                <th>Obtained</th>
                <th>Total</th>
                <th>Percentage</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {results.length > 0 ? (
                results.map((r, i) => (
                  <tr key={r._id}>
                    <td>{i + 1}</td>
                    <td>{r.userId?.name || 'N/A'}</td>
                    <td>{r.userId?.email || 'N/A'}</td>
                    <td>{r.obtainNumber}</td>
                    <td>{r.totalNumber}</td>
                    <td>{r.percentage}%</td>
                    <td>
                      <span className={`status-badge ${r.certificate === 'Received' ? 'status-received' : 'status-pending'}`}>
                        {r.certificate}
                      </span>
                    </td>
                    <td>
                      {r.certificate !== "Received" && (
                        <button
                          className="btn-primary-theme"
                          onClick={() => {
                            setSelectedUser(r.userId);
                            setShowModal(true);
                          }}
                        >
                          Upload
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center' }}>No results found</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {showModal && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <header className="modal-header">
              <h2>Upload Certificate for {selectedUser?.name}</h2>
              <button className="btn-action" onClick={() => setShowModal(false)}>
                <X size={24} />
              </button>
            </header>
            <form onSubmit={handleUpload}>
              <div className="form-group">
                <label htmlFor="certificateFile">Choose Certificate (PDF)</label>
                <input 
                  type="file" 
                  id="certificateFile"
                  className="input-theme"
                  accept="application/pdf"
                  onChange={(e) => setFile(e.target.files[0])}
                  required 
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-secondary-theme" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary-theme">
                  <UploadCloud size={18} style={{ marginRight: '0.5rem' }} />
                  Upload
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
