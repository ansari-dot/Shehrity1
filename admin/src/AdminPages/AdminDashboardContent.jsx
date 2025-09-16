import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Users,
  BookOpen,
  Award,
  Briefcase,
  UserPlus,
  FileText,
  UserCheck,
  Clock,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart,
} from "recharts";
import "../styles/AdminDashboardContent.css";

const StatCard = ({ icon, title, value, color, isLoading }) => {
  return (
    <div className="stat-card">
      <div
        className="stat-icon"
        style={{
          background: `linear-gradient(135deg, ${color}, #15487d)`,
        }}
      >
        {icon}
      </div>
      <div className="stat-info">
        <h2>{title}</h2>
        <p>{isLoading ? "Loading..." : value}</p>
      </div>
    </div>
  );
};

const AdminDashboardContent = () => {
  const [stats, setStats] = useState({
    userCount: 0,
    quizCount: 0,
    certificateCount: 0,
    serviceCount: 0,
    jobCount: 0,
    applicantCount: 0,
  });

  const [recentActivities, setRecentActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const path = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchStats = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(`${path}/api/dashboard/admin/stats`, {
          withCredentials: true,
        });
        const apiData = res.data.data; 

        setStats({
          userCount: apiData.userCount || 0,
          quizCount: apiData.quizCount || 0,
          certificateCount: apiData.certificateCount || 0,
          serviceCount: apiData.servicesCount || 0,
          jobCount: apiData.jobCount || 0,
          applicantCount: apiData.applicantCount || 0,
        });

        // Fetch recent activities
        const activitiesRes = await axios.get(`${path}/api/dashboard/admin/activities`, {
          withCredentials: true,
        });
        setRecentActivities(activitiesRes.data.activities || []);


      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, [path]);

  const chartData = [
    { name: "Users", count: stats.userCount },
    { name: "Jobs", count: stats.jobCount },
    { name: "Applicants", count: stats.applicantCount },
    { name: "Quizzes", count: stats.quizCount },
    { name: "Certificates", count: stats.certificateCount },
    { name: "Services", count: stats.serviceCount },
  ];

  // Pie chart data for key metrics
  const pieChartData = [
    { name: "Quizzes", value: stats.quizCount, color: "#ff8c00" },
    { name: "Certificates", value: stats.certificateCount, color: "#28a745" },
    { name: "Job Postings", value: stats.jobCount, color: "#dc3545" },
    { name: "Applications", value: stats.applicantCount, color: "#17a2b8" },
  ];

  // Line chart data for trends (mock data - you can replace with real trend data)
  const trendData = [
    { month: "Jan", quizzes: stats.quizCount * 0.6, jobs: stats.jobCount * 0.4, applications: stats.applicantCount * 0.3 },
    { month: "Feb", quizzes: stats.quizCount * 0.7, jobs: stats.jobCount * 0.6, applications: stats.applicantCount * 0.5 },
    { month: "Mar", quizzes: stats.quizCount * 0.8, jobs: stats.jobCount * 0.7, applications: stats.applicantCount * 0.7 },
    { month: "Apr", quizzes: stats.quizCount * 0.9, jobs: stats.jobCount * 0.8, applications: stats.applicantCount * 0.8 },
    { month: "May", quizzes: stats.quizCount * 0.95, jobs: stats.jobCount * 0.9, applications: stats.applicantCount * 0.9 },
    { month: "Jun", quizzes: stats.quizCount, jobs: stats.jobCount, applications: stats.applicantCount },
  ];

  const COLORS = ["#ff8c00", "#28a745", "#dc3545", "#17a2b8"];

  return (
    <div className="dashboard-content">
      {/* Header */}
      <header className="dashboard-header">
        <h1>Welcome Back, Admin 👋</h1>
        <p>Here’s a quick overview of your platform’s activity.</p>
      </header>

      {/* Stat Cards */}
      <div className="stats-grid">
        <StatCard
          icon={<Users size={28} />}
          title="Total Users"
          value={stats.userCount}
          isLoading={isLoading}
          color="#1e90ff"
        />
        <StatCard
          icon={<Briefcase size={28} />}
          title="Job Postings"
          value={stats.jobCount}
          isLoading={isLoading}
          color="#dc3545"
        />
        <StatCard
          icon={<UserCheck size={28} />}
          title="Total Applicants"
          value={stats.applicantCount}
          isLoading={isLoading}
          color="#17a2b8"
        />
        <StatCard
          icon={<BookOpen size={28} />}
          title="Total Quizzes"
          value={stats.quizCount}
          isLoading={isLoading}
          color="#ff8c00"
        />
        <StatCard
          icon={<Award size={28} />}
          title="Certificates Issued"
          value={stats.certificateCount}
          isLoading={isLoading}
          color="#28a745"
        />
        <StatCard
          icon={<Briefcase size={28} />}
          title="Services Offered"
          value={stats.serviceCount}
          isLoading={isLoading}
          color="#6f42c1"
        />
      </div>

      {/* Chart + Activity */}
      <div className="dashboard-grid">
        <div className="chart-container">
          <h3>Platform Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#15487d" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="activity-feed">
          <h3>Recent Activity</h3>
          <ul>
            {recentActivities.length > 0 ? (
              recentActivities.map((activity, index) => (
                <li key={index}>
                  <div className="activity-icon">
                    {activity.type === 'user_registered' && <UserPlus size={20} />}
                    {activity.type === 'job_applied' && <FileText size={20} />}
                    {activity.type === 'quiz_completed' && <BookOpen size={20} />}
                    {activity.type === 'certificate_issued' && <Award size={20} />}
                    {activity.type === 'job_posted' && <Briefcase size={20} />}
                    {!['user_registered', 'job_applied', 'quiz_completed', 'certificate_issued', 'job_posted'].includes(activity.type) && <Clock size={20} />}
                  </div>
                  <div className="activity-content">
                    <span>{activity.description}</span>
                    <small>{new Date(activity.createdAt).toLocaleDateString()}</small>
                  </div>
                </li>
              ))
            ) : (
              <li className="no-activity">
                <div className="activity-icon"><Clock size={20} /></div>
                <span>No recent activities</span>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardContent;
