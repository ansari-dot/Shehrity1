import { motion } from "framer-motion";
import { Card, CardContent } from "../ui/Card";
import { Button } from "../ui/Button";
import { Briefcase, MapPin, Clock, ExternalLink, X, Upload, User, Mail, FileText, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { careerAPI, quizAPI } from "../services/api";
import { toast } from "react-toastify";
import "./Career.css";

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

export default function Career() {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [quizResult, setQuizResult] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    coverLetter: '',
    cv: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch jobs and user applications on component mount
  useEffect(() => {
    fetchJobs();
    fetchApplications();
    fetchQuizResult();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await careerAPI.getJobs();
      setJobs(response);
    } catch (error) {
      console.error('Failed to fetch jobs:', error);
      // Fallback to show some sample jobs if API fails
      setJobs([
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
        },
        {
          _id: '3',
          title: "Junior Web Developer",
          company: "Digital Agency",
          location: "San Francisco, CA",
          type: "Part-time",
          salary: "$25 - $35/hour",
          posted: "3 days ago",
        },
      ]);
    }
  };

  const fetchApplications = async () => {
    try {
      const response = await careerAPI.getMyApplications();
      setApplications(response);
    } catch (error) {
      console.error('Failed to fetch applications:', error);
      // Set empty array as fallback
      setApplications([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchQuizResult = async () => {
    try {
      const response = await quizAPI.getLatestResult();
      setQuizResult(response);
    } catch (error) {
      console.error('Failed to fetch quiz result:', error);
      // Set a default quiz result for testing
      setQuizResult({ percentage: 85 });
    }
  };

  const handleApplyClick = (job) => {
    if (!quizResult || quizResult.percentage < 80) {
      toast.error('You must score at least 80% in the quiz to apply for jobs!');
      return;
    }
    setSelectedJob(job);
    setShowApplicationForm(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setFormData(prev => ({
        ...prev,
        cv: file
      }));
    } else {
      toast.error('Please select a PDF file for your CV');
    }
  };

  const handleSubmitApplication = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.cv) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const submitData = new FormData();
      submitData.append('jobId', selectedJob._id);
      submitData.append('name', formData.name);
      submitData.append('email', formData.email);
      submitData.append('coverLetter', formData.coverLetter);
      submitData.append('cv', formData.cv);

      await careerAPI.applyForJob(submitData);
      
      toast.success('Application submitted successfully!');
      setShowApplicationForm(false);
      setFormData({ name: '', email: '', coverLetter: '', cv: null });
      fetchApplications(); // Refresh applications
    } catch (error) {
      toast.error('Failed to submit application: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isJobApplied = (jobId) => {
    return applications.some(app => app.jobId === jobId || app.jobId?._id === jobId);
  };

  const closeApplicationForm = () => {
    setShowApplicationForm(false);
    setSelectedJob(null);
    setFormData({ name: '', email: '', coverLetter: '', cv: null });
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <motion.div
        className="p-4 p-lg-5"
        style={{
          background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
          minHeight: "100vh",
        }}
        variants={containerVariants}
        initial="hidden"
        animate="visible">
        {/* Header */}
        <motion.div className="mb-5 text-center" variants={itemVariants}>
          <h1 className="display-5 fw-bold text-dark mb-2">
            💼 Career Opportunities
          </h1>
          <p className="text-muted fs-5">Find your next career opportunity</p>
          {quizResult && (
            <div className="mt-3">
              <span className={`badge ${quizResult.percentage >= 80 ? 'bg-success' : 'bg-warning'} fs-6`}>
                Quiz Score: {quizResult.percentage}% 
                {quizResult.percentage >= 80 ? ' ✓ Eligible to Apply' : ' ⚠️ Need 80% to Apply'}
              </span>
            </div>
          )}
        </motion.div>

        {/* Job Cards */}
        <motion.div
          className="row g-4 career-center"
          variants={containerVariants}>
          {jobs.map((job) => {
            const applied = isJobApplied(job._id);
            return (
              <motion.div
                key={job._id}
                className="col-12"
                variants={itemVariants}
                whileHover={{ scale: 1.01 }}>
                <Card>
                  <CardContent className="p-4">
                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-start">
                      <div className="flex-grow-1">
                        <div className="d-flex align-items-center gap-3 mb-3">
                          <motion.div
                            className="bg-primary bg-opacity-10 p-2 rounded-circle"
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.6 }}>
                            <Briefcase className="text-primary" size={24} />
                          </motion.div>
                          <div>
                            <h5 className="mb-0 text-dark">{job.title}</h5>
                            <p className="text-muted mb-0">{job.company}</p>
                          </div>
                        </div>

                        <div className="d-flex flex-wrap gap-3 mb-3">
                          <small className="d-flex align-items-center gap-1 text-muted">
                            <MapPin size={14} />
                            {job.location}
                          </small>
                          <small className="d-flex align-items-center gap-1 text-muted">
                            <Clock size={14} />
                            {job.type}
                          </small>
                          <small className="text-success fw-medium">
                            {job.salary}
                          </small>
                        </div>

                        <small className="text-muted">Posted {job.posted}</small>
                      </div>

                      <div className="mt-3 mt-md-0">
                        {applied ? (
                          <Button 
                            className="d-flex align-items-center gap-2 btn-success" 
                            disabled>
                            <CheckCircle size={16} />
                            Applied
                          </Button>
                        ) : (
                          <Button 
                            className="d-flex align-items-center gap-2"
                            onClick={() => handleApplyClick(job)}>
                            <ExternalLink size={16} />
                            Apply Now
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>

      {/* Application Form Modal */}
      {showApplicationForm && selectedJob && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <motion.div 
              className="modal-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}>
              <div className="modal-header border-0 pb-0">
                <h5 className="modal-title fw-bold text-dark">
                  Apply for {selectedJob.title}
                </h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={closeApplicationForm}>
                </button>
              </div>
              
              <div className="modal-body pt-2">
                <div className="mb-4 p-3 bg-light rounded">
                  <h6 className="text-dark mb-2">{selectedJob.title}</h6>
                  <p className="text-muted mb-1">{selectedJob.company}</p>
                  <small className="text-muted">{selectedJob.location} • {selectedJob.type}</small>
                </div>

                <form onSubmit={handleSubmitApplication}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label fw-medium">
                        <User size={16} className="me-2" />
                        Full Name *
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    
                    <div className="col-md-6">
                      <label className="form-label fw-medium">
                        <Mail size={16} className="me-2" />
                        Email Address *
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                    
                    <div className="col-12">
                      <label className="form-label fw-medium">
                        <Upload size={16} className="me-2" />
                        Upload CV (PDF only) *
                      </label>
                      <input
                        type="file"
                        className="form-control"
                        accept=".pdf"
                        onChange={handleFileChange}
                        required
                      />
                      {formData.cv && (
                        <small className="text-success mt-1 d-block">
                          ✓ {formData.cv.name} selected
                        </small>
                      )}
                    </div>
                    
                    <div className="col-12">
                      <label className="form-label fw-medium">
                        <FileText size={16} className="me-2" />
                        Cover Letter (Optional)
                      </label>
                      <textarea
                        className="form-control"
                        name="coverLetter"
                        value={formData.coverLetter}
                        onChange={handleInputChange}
                        rows="4"
                        placeholder="Tell us why you're interested in this position..."
                      ></textarea>
                    </div>
                  </div>
                </form>
              </div>
              
              <div className="modal-footer border-0 pt-0">
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={closeApplicationForm}>
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  onClick={handleSubmitApplication}
                  disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                      Submitting...
                    </>
                  ) : (
                    'Submit Application'
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </>
  );
}
