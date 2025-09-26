import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";
import { Upload, X, CheckCircle } from "lucide-react";
import img2 from "../assets/bg3.png";
import career from "../assets/aboutbg2.jpg";

// Application Modal Component
const ApplicationModal = ({ job, onClose, onSubmit, isSubmitting }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    coverLetter: "",
    cv: null,
    cvName: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "cv") {
      setFormData((prev) => ({
        ...prev,
        cv: files[0],
        cvName: files[0]?.name || "",
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(job, formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold">Apply for {job?.title}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            disabled={isSubmitting}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
                disabled={isSubmitting}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Resume (PDF) *
            </label>
            <label className="flex flex-col items-center px-4 py-6 bg-white text-blue-500 rounded-lg border-2 border-dashed border-blue-300 cursor-pointer hover:bg-blue-50">
              <Upload className="w-8 h-8 mb-2" />
              <span className="text-sm text-gray-600">
                {formData.cvName || "Click to upload resume (PDF, max 5MB)"}
              </span>
              <input
                type="file"
                name="cv"
                onChange={handleChange}
                accept=".pdf"
                className="hidden"
                required={!formData.cv}
                disabled={isSubmitting}
              />
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cover Letter (Optional)
            </label>
            <textarea
              name="coverLetter"
              value={formData.coverLetter}
              onChange={handleChange}
              rows="4"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Tell us why you'd be a great fit for this position..."
              disabled={isSubmitting}></textarea>
          </div>

          <div className="flex justify-end space-x-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700"
              disabled={isSubmitting}>
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center"
              disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </>
              ) : (
                "Submit Application"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      type: "spring",
      stiffness: 100,
    },
  },
};

const CareerPage = ({ isDigitalSecurityActive }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 🎨 Dynamic theme
  const primaryColor = isDigitalSecurityActive ? "#702829" : "#15487d";
  const textColor = isDigitalSecurityActive ? "#702829" : "#15487d";

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/career/get`
        );
        setJobs(response.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        // Fallback to sample data if API fails
        setJobs([
          {
            _id: "1",
            title: "Security Officer",
            company: "Shehrity Security",
            location: "Karachi",
            type: "Full-time",
            salary: "PKR 50,000 - 70,000",
            posted: "2 days ago",
          },
          {
            _id: "2",
            title: "Security Supervisor",
            company: "Shehrity Security",
            location: "Lahore",
            type: "Full-time",
            salary: "PKR 70,000 - 90,000",
            posted: "1 week ago",
          },
          {
            _id: "3",
            title: "Security Guard",
            company: "Shehrity Security",
            location: "Islamabad",
            type: "Part-time",
            salary: "PKR 30,000 - 40,000",
            posted: "3 days ago",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleApplyClick = (job) => {
    setSelectedJob(job);
    setShowApplicationModal(true);
  };

  const handleSubmitApplication = async (job, formData) => {
    setIsSubmitting(true);
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("phone", formData.phone);
      data.append("coverLetter", formData.coverLetter);
      data.append("cv", formData.cv);
      data.append("jobId", job._id);
      data.append("jobTitle", job.title);

      await axios.post(
        `${import.meta.env.VITE_API_URL}/application/apply`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Application submitted successfully!");
      setShowApplicationModal(false);
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error(
        error.response?.data?.message || "Failed to submit application"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Header Section */}
      <motion.div
        className="w-full h-[60vh] mt-2 items-center flex justify-center bg-cover relative shadow-[0_5px_10px_rgba(0,0,0,0.3)]"
        style={{ backgroundImage: `url(${career})` }}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.3 }}>
        {/* Bottom Shadow Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent pointer-events-none mt-24">
          <div className="relative text-center px-6">
            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl !font-bold drop-shadow-lg tracking-wide"
              style={{ fontFamily: "Arial, sans-serif", color: textColor }}>
              Careers
            </h1>
            <p
              className="mt-4 max-w-2xl mx-auto text-gray-800 text-sm sm:text-base md:text-lg font-semibold drop-shadow-md"
              style={{ fontFamily: "Arial Narrow" }}>
              We are dedicated to providing innovative solutions that blend
              technology, creativity, and professionalism. Our mission is to
              build digital experiences that truly inspire.
            </p>

            {/* Learn More Button */}
          </div>
        </div>
        <div className="mt-32 ">
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 8px 24px rgba(0,0,0,0.2)",
            }}
            whileTap={{ scale: 0.95 }}
            className="mt-4 px-6 py-2 !rounded-3xl text-white !font-bold text-lg shadow-lg transform transition-all duration-300"
            style={{ backgroundColor: primaryColor }}>
            Learn More
          </motion.button>
        </div>
      </motion.div>

      {/* Career Section */}
      <motion.div
        className="w-full bg-white py-16 px-6 md:px-16"
        style={{
          backgroundImage: `url(${img2})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.3 }}>
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="!text-4xl !font-bold mb-12 text-center"
            style={{ fontFamily: "Arial, sans-serif", color: textColor }}
            variants={childVariants}>
            Current Openings
          </motion.h2>

          <div className="w-full max-w-7xl mx-auto">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div
                  className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2"
                  style={{ borderColor: primaryColor }}></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {jobs.map((job, index) => (
                  <motion.div
                    key={job._id}
                    className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-opacity-0 transform hover:-translate-y-1"
                    variants={childVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: index * 0.1 }}>
                    {/* Ribbon for job type */}
                    <div className="absolute right-0 top-0 bg-gradient-to-r from-blue-600 to-blue-800 text-white text-xs font-bold px-4 py-1 transform translate-x-2 -translate-y-1 rotate-12 origin-bottom-right">
                      {job.type}
                    </div>

                    <div className="p-8">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-2xl font-extrabold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">
                            {job.title}
                          </h3>
                          <div className="flex items-center text-blue-600 font-medium mb-4">
                            <svg
                              className="w-5 h-5 mr-1.5"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg">
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span>Posted {job.posted}</span>
                          </div>
                        </div>
                        <div className="bg-blue-50 p-3 rounded-full">
                          <svg
                            className="w-6 h-6"
                            style={{ color: primaryColor }}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                              fillRule="evenodd"
                              d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                              clipRule="evenodd"
                            />
                            <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                          </svg>
                        </div>
                      </div>

                      <div className="mt-6 space-y-4">
                        <div className="flex items-center text-gray-600">
                          <svg
                            className="w-5 h-5 mr-3 text-gray-400 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          <span className="font-medium">{job.location}</span>
                        </div>

                        <div className="flex items-center text-gray-600">
                          <svg
                            className="w-5 h-5 mr-3 text-gray-400 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <span className="font-medium">{job.salary}</span>
                        </div>

                        {job.requirements && (
                          <div className="mt-4 pt-4 border-t border-gray-100">
                            <h4 className="text-sm font-semibold text-gray-700 mb-2">
                              KEY REQUIREMENTS:
                            </h4>
                            <ul className="grid grid-cols-1 gap-1 text-sm text-gray-600">
                              {job.requirements.slice(0, 3).map((req, i) => (
                                <li key={i} className="flex items-start">
                                  <svg
                                    className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0"
                                    fill="currentColor"
                                    viewBox="0 0 20 20">
                                    <path
                                      fillRule="evenodd"
                                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                  <span>{req}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="bg-blue-100 p-2 rounded-full">
                            <svg
                              className="w-5 h-5"
                              style={{ color: primaryColor }}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg">
                              <path
                                fillRule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900">
                              {job.company}
                            </p>
                            <p className="text-xs text-gray-500">
                              Security Solutions
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleApplyClick(job)}
                          className="px-5 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          style={{
                            backgroundColor: primaryColor,
                            color: "white",
                            boxShadow: `0 4px 6px -1px ${primaryColor}40, 0 2px 4px -1px ${primaryColor}20`,
                          }}>
                          Apply Now
                        </button>
                      </div>
                    </div>

                    {/* Hover effect elements */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-blue-700/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* About Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-20">
            <motion.div
              variants={childVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}>
              <motion.h2
                className="!text-3xl !font-bold mb-6"
                style={{ fontFamily: "Arial, sans-serif", color: textColor }}
                variants={childVariants}>
                Why Join Us?
              </motion.h2>
              <motion.div
                className="bg-white/90 p-6 rounded-xl shadow-sm backdrop-blur-sm border border-gray-100"
                variants={childVariants}
                whileHover={{ scale: 1.01 }}>
                <p
                  className="text-gray-700 mb-4"
                  style={{ fontFamily: "Arial Narrow" }}>
                  At Shehrity Security, we believe that our people are our
                  greatest asset. We are committed to providing a supportive and
                  inclusive work environment where every team member can thrive.
                </p>
                <ul className="space-y-3 mt-4">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Competitive salaries and benefits package</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>
                      Professional development and training opportunities
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Supportive and collaborative work environment</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Opportunities for career growth and advancement</span>
                  </li>
                </ul>
              </motion.div>
            </motion.div>

            <motion.div
              variants={childVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}>
              <motion.h2
                className="!text-3xl !font-bold mb-6"
                style={{ fontFamily: "Arial, sans-serif", color: textColor }}
                variants={childVariants}>
                Our Culture
              </motion.h2>
              <motion.div
                className="bg-white/90 p-6 rounded-xl shadow-sm backdrop-blur-sm border border-gray-100"
                variants={childVariants}
                whileHover={{ scale: 1.01 }}>
                <p
                  className="text-gray-700 mb-4"
                  style={{ fontFamily: "Arial Narrow" }}>
                  At Shehrity Security, we foster a culture of excellence,
                  integrity, and teamwork. We value diversity and believe that
                  different perspectives lead to better solutions.
                </p>
                <div className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <h4 className="font-medium text-blue-800 mb-2">
                    What We Look For:
                  </h4>
                  <ul className="space-y-2 text-sm text-blue-700">
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>Passion for security and customer service</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>Strong work ethic and reliability</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>Ability to work in a team environment</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>Commitment to continuous learning</span>
                    </li>
                  </ul>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Application Modal */}
          {showApplicationModal && selectedJob && (
            <ApplicationModal
              job={selectedJob}
              onClose={() => setShowApplicationModal(false)}
              onSubmit={handleSubmitApplication}
              isSubmitting={isSubmitting}
            />
          )}
        </div>
      </motion.div>
    </>
  );
};

export default CareerPage;
