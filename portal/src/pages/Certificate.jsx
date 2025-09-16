
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaDownload } from "react-icons/fa";
import "./Certificate.css";
import { toast } from "react-toastify";
    const path =  import.meta.env.VITE_API_URL

const Certificate = () => {
  const [certificateUrl, setCertificateUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [quizPending, setQuizPending] = useState(false);

  useEffect(() => {
     const fetchCertificate = async () => {
    try {
      const userId = localStorage.getItem("userId");
      console.log("User ID:", userId);

      if (!userId) {
        console.warn("No userId found in localStorage!");
        toast.warn("Please log in to view your certificate.");
        return;
      }

      // Send userId as query param
      const res = await axios.get(`${path}/api/certificate/my?userId=${userId}`, {
        withCredentials: true,
      });

      if (res.data.success && res.data.certificate) {
        setCertificateUrl(res.data.certificate.certificateUrl);
      } else {
        // No certificate yet → quiz not passed
        setQuizPending(true);
      }
    } catch (error) {
      console.error("Error fetching certificate:", error);
      toast.error("Failed to load certificate. Please try again later.");
      setQuizPending(true); // treat error as certificate not ready
    } finally {
      setLoading(false);
    }
  };

    fetchCertificate();
  }, []);

  const handleDownload = () => {
    if (!certificateUrl) return;
    const link = document.createElement("a");
    link.href = `${path}${certificateUrl}`;
    link.download = "certificate.pdf";
    link.click();
  };

  if (loading) return <div className="certificate-page"><p>Loading certificate...</p></div>;

  if (quizPending)
    return (
      <div className="certificate-page">
        <div className="certificate-container">
          <div className="certificate-card">
            <h2 className="certificate-title">Certificate not ready</h2>
            <p className="certificate-text">You need to complete the quiz first to generate your certificate.</p>
            <p className="certificate-description">
              Head over to the quiz section and complete it to unlock your certificate.
            </p>
            <a className="download-button" href="/quiz" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              Go to Quiz
            </a>
          </div>
        </div>
      </div>
    );

  return (
    <div className="certificate-page">
      <div className="certificate-container">
        <div className="certificate-card">
          <h1 className="certificate-title">Your Certificate</h1>
          <p className="certificate-text">Preview your certificate below or download it as a PDF.</p>

          <button className="download-button" onClick={handleDownload}>
            <FaDownload className="button-icon" /> Download Certificate
          </button>

          {/* Responsive preview wrapper */}
          <div style={{ width: '100%', marginTop: 20 }}>
            <div style={{ position: 'relative', width: '100%', height: '0', paddingBottom: '75%', borderRadius: 8, overflow: 'hidden', boxShadow: '0 6px 20px rgba(0,0,0,0.12)' }}>
              <iframe
                src={`${path}${certificateUrl}`}
                title="Certificate Preview"
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: '0' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certificate;
