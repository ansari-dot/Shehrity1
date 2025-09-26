import React from "react";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardTitle } from "../ui/Card";
import { BookOpen, Award, Target, TrendingUp, Users, Briefcase, BarChart3, PieChart as LucidePieChart, Activity } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import axios from "axios";
import './Dashboard.css'

const path = import.meta.env.VITE_API_URL;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const StatCard = ({ icon, title, value, color = 'var(--brand)', isLoading }) => {
  return (
    <div className="stat-card">
      <div
        className="stat-icon"
        style={{
          background: `linear-gradient(135deg, ${color}, var(--brand-dark))`,
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '12px',
          width: '48px',
          height: '48px',
          flexShrink: 0
        }}
      >
        {React.cloneElement(icon, {
          size: 24,
          color: 'white'
        })}
      </div>
      <div className="stat-info">
        <h3 style={{ 
          color: 'var(--text-2)',
          margin: 0,
          fontSize: '0.875rem',
          fontWeight: 500,
          opacity: 0.8
        }}>{title}</h3>
        <p style={{ 
          color: 'var(--brand)',
          margin: '4px 0 0',
          fontSize: '1.5rem',
          fontWeight: 700
        }}>{isLoading ? "Loading..." : value}</p>
      </div>
    </div>
  );
};

export default function Dashboard() {
  const [stats, setStats] = useState({
    quizScore: 0,
    totalScore: 0,
    percentage: 0,
    hasCertificate: false,
    applicationsCount: 0,
    totalJobs: 0,
    servicesUsed: 0,
  });
  const [username, setUsername] = useState("John Doe");
  const [chartData, setChartData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [trendData, setTrendData] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(`${path}/dashboard/portal/stats`, { withCredentials: true });
        if (res.data.success) {
          const data = res.data.data;

          setUsername(data.username);
          setStats({
            quizScore: data.quizScore,
            totalScore: data.totalScore,
            percentage: data.percentage,
            hasCertificate: data.hasCertificate,
            applicationsCount: data.applicationsCount,
            totalJobs: data.totalJobs,
            servicesUsed: data.servicesUsed,
          });

          // Use backend performance data for charts
          setChartData(data.performanceData || []);

          // Use backend progress data for pie chart
          setPieData(data.progressData || []);

          // Use backend trend data
          setTrendData(data.trendData || []);

          // Use backend recent activities with icon mapping
          const iconMap = {
            'BookOpen': BookOpen,
            'Award': Award,
            'Briefcase': Briefcase,
            'Activity': Activity
          };

          const mappedActivities = (data.recentActivities || []).map(activity => ({
            ...activity,
            icon: iconMap[activity.icon] || Activity
          }));

          setRecentActivities(mappedActivities);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, []);

  const COLORS = ["#15487D", "#1E5A96", "#2563EB", "#3B82F6"];

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
      {/* Header */}
      <header className="dashboard-header">
        <h1>Welcome Back, {username} 👋</h1>
        <p>Here's your personal learning and career progress overview.</p>
      </header>

      {/* Stat Cards */}
      <div className="stats-grid">
        <StatCard
          icon={<BookOpen />}
          title="Quiz Score"
          value={`${stats.quizScore} / ${stats.totalScore}`}
          isLoading={isLoading}
          color="var(--brand)"
        />
        <StatCard
          icon={<Award />}
          title="Certificate Status"
          value={stats.hasCertificate ? "Earned" : "In Progress"}
          isLoading={isLoading}
          color="var(--brand-600)"
        />
        <StatCard
          icon={<Target />}
          title="Completion Rate"
          value={`${stats.percentage}%`}
          isLoading={isLoading}
          color="var(--brand-500)"
        />
        <StatCard
          icon={<Briefcase />}
          title="Applications"
          value={stats.applicationsCount}
          isLoading={isLoading}
          color="var(--brand-700)"
        />
        <StatCard
          icon={<TrendingUp />}
          title="Jobs Available"
          value={stats.totalJobs}
          isLoading={isLoading}
          color="var(--brand-400)"
        />
        <StatCard
          icon={<Activity />}
          title="Services Used"
          value={stats.servicesUsed}
          isLoading={isLoading}
          color="var(--brand-800)"
        />
      </div>

      {/* Chart + Activity */}
      <div className="dashboard-grid">
        <div className="chart-container">
          <h3>Performance Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="var(--brand)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="activity-feed">
          <h3>Recent Activity</h3>
          <ul>
            {recentActivities.length > 0 ? (
              recentActivities.map((activity, index) => {
                const Icon = activity.icon;
                return (
                  <li key={index}>
                    <div className="activity-icon">
                      <Icon size={20} />
                    </div>
                    <div className="activity-content">
                      <span>{activity.description}</span>
                      <small>{activity.time}</small>
                    </div>
                  </li>
                );
              })
            ) : (
              <li className="no-activity">
                <div className="activity-icon">
                  <Activity size={20} />
                </div>
                <span>No recent activities</span>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
    </div>
  );
}
