import User from "../models/User.js";
import Certificate from "../models/Certificate.js";
import Result from "../models/Result.js";
import Quiz from '../models/Quiz.js'
import Services from '../models/Services.js'
import Career from '../models/Career.js'
import Application from '../models/Application.js'
class DashboardController {
    // portal get Stats with enhanced data
    async getStats(req, res) {
            try {
                const userId = req.user.id;

                const user = await User.findById(userId);
                if (!user) return res.status(404).json({ message: "User not found", success: false });

                // Get quiz results
                const result = await Result.findOne({ userId });
                const quizScore = result ? result.obtainNumber : 0;
                const totalScore = result ? result.totalNumber : 0;
                const percentage = totalScore > 0 ? Math.round((quizScore / totalScore) * 100) : 0;

                // Certificate status
                const certificate = await Certificate.findOne({ userId });
                const hasCertificate = !!certificate;

                // Get user's applications count
                const applicationsCount = await Application.countDocuments({ userId });

                // Get total available jobs
                const totalJobs = await Career.countDocuments();

                // Get services count (for services used metric)
                const servicesCount = await Services.countDocuments();

                // Calculate trend data (mock data based on user activity)
                const userCreatedDate = new Date(user.createdAt);
                const monthsActive = Math.min(6, Math.ceil((Date.now() - userCreatedDate.getTime()) / (1000 * 60 * 60 * 24 * 30)));
                
                const trendData = [];
                const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
                for (let i = 0; i < 6; i++) {
                    const monthProgress = i < monthsActive ? (i + 1) / monthsActive : 0;
                    trendData.push({
                        month: months[i],
                        quizzes: Math.floor(quizScore * monthProgress),
                        applications: Math.floor(applicationsCount * monthProgress),
                        progress: Math.floor(percentage * monthProgress)
                    });
                }

                // Performance data for charts
                const performanceData = [
                    { name: 'Quizzes', value: quizScore, total: totalScore, percentage: percentage },
                    { name: 'Applications', value: applicationsCount, total: Math.max(totalJobs, 1), percentage: Math.round((applicationsCount / Math.max(totalJobs, 1)) * 100) },
                    { name: 'Certificates', value: hasCertificate ? 1 : 0, total: 1, percentage: hasCertificate ? 100 : 0 },
                    { name: 'Services', value: Math.min(servicesCount, 5), total: servicesCount || 5, percentage: Math.round((Math.min(servicesCount, 5) / Math.max(servicesCount, 5)) * 100) }
                ];

                // Recent activities for the user
                const recentActivities = [];
                
                // Helper function to calculate time ago (moved inside the function)
                const getTimeAgo = (date) => {
                    const now = new Date();
                    const diffTime = Math.abs(now - new Date(date));
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                    
                    if (diffDays === 1) return '1 day ago';
                    if (diffDays < 7) return `${diffDays} days ago`;
                    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
                    return `${Math.ceil(diffDays / 30)} months ago`;
                };

                if (result) {
                    recentActivities.push({
                        type: 'quiz',
                        description: `Completed quiz with score ${quizScore}/${totalScore}`,
                        time: getTimeAgo(result.createdAt),
                        icon: 'BookOpen'
                    });
                }

                if (certificate) {
                    recentActivities.push({
                        type: 'certificate',
                        description: 'Certificate earned successfully!',
                        time: getTimeAgo(certificate.createdAt),
                        icon: 'Award'
                    });
                }

                const userApplications = await Application.find({ userId }).sort({ createdAt: -1 }).limit(3);
                userApplications.forEach(app => {
                    recentActivities.push({
                        type: 'application',
                        description: 'Job application submitted',
                        time: getTimeAgo(app.createdAt),
                        icon: 'Briefcase'
                    });
                });

                // Add general activity
                recentActivities.push({
                    type: 'service',
                    description: 'Accessed career services',
                    time: getTimeAgo(user.createdAt),
                    icon: 'Activity'
                });

                return res.status(200).json({
                    success: true,
                    data: {
                        // Basic stats
                        quizScore,
                        totalScore,
                        percentage,
                        hasCertificate,
                        username: user.username,
                        
                        // Enhanced stats
                        applicationsCount,
                        totalJobs,
                        servicesUsed: hasCertificate ? 3 : 2,
                        
                        // Chart data
                        performanceData,
                        trendData,
                        
                        // Progress data for pie chart
                        progressData: [
                            { name: 'Completed', value: percentage, color: '#15487D' },
                            { name: 'Remaining', value: 100 - percentage, color: '#E5E7EB' }
                        ],
                        
                        // Recent activities
                        recentActivities: recentActivities.slice(0, 4)
                    },
                });
            } catch (err) {
                console.error(err);
                return res.status(500).json({ message: "Internal server error", success: false });
            }
        }

        //  to admin getStat 
    async getAdminStats(req, res) {
        try {
            const userId = req.user.id;

            const admin = await User.findById(userId);
            if (!admin) {
                return res.status(400).json({
                    message: "User not Found",
                    success: false
                });
            }

            if (admin.role !== 'admin') {
                return res.status(403).json({
                    message: "You are not authorized to get data",
                    success: false
                });
            }

            // Get counts properly
            const userCount = await User.countDocuments();
            const quizCount = await Quiz.countDocuments();
            const servicesCount = await Services.countDocuments();
            const certificateCount = await Certificate.countDocuments();
            const jobCount = await Career.countDocuments();
            const applicantCount = await Application.countDocuments();

            return res.status(200).json({
                message: "Data fetched successfully",
                data: {
                    userCount,
                    quizCount,
                    servicesCount,
                    certificateCount,
                    jobCount,
                    applicantCount
                }
            });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: "Internal server error", success: false });
        }
    }

    // Get recent activities for admin dashboard
    async getRecentActivities(req, res) {
        try {
            const userId = req.user.id;

            const admin = await User.findById(userId);
            if (!admin || admin.role !== 'admin') {
                return res.status(403).json({
                    message: "You are not authorized to access this data",
                    success: false
                });
            }

            const activities = [];

            // Get recent user registrations (last 10)
            const recentUsers = await User.find({ role: 'user' })
                .sort({ createdAt: -1 })
                .limit(5)
                .select('username createdAt');

            recentUsers.forEach(user => {
                activities.push({
                    type: 'user_registered',
                    description: `New user "${user.username}" registered`,
                    createdAt: user.createdAt
                });
            });

            // Get recent job applications (last 10)
            const recentApplications = await Application.find()
                .populate('userId', 'username')
                .populate('jobId', 'title')
                .sort({ createdAt: -1 })
                .limit(5);

            recentApplications.forEach(app => {
                activities.push({
                    type: 'job_applied',
                    description: `${app.userId?.username || 'User'} applied for "${app.jobId?.title || 'Job'}"`,
                    createdAt: app.createdAt
                });
            });

            // Get recent job postings (last 5)
            const recentJobs = await Career.find()
                .sort({ createdAt: -1 })
                .limit(5)
                .select('title createdAt');

            recentJobs.forEach(job => {
                activities.push({
                    type: 'job_posted',
                    description: `New job "${job.title}" was posted`,
                    createdAt: job.createdAt
                });
            });

            // Get recent quiz completions (last 5)
            const recentResults = await Result.find()
                .populate('userId', 'username')
                .sort({ createdAt: -1 })
                .limit(5);

            recentResults.forEach(result => {
                activities.push({
                    type: 'quiz_completed',
                    description: `${result.userId?.username || 'User'} completed a quiz with score ${result.obtainNumber}/${result.totalNumber}`,
                    createdAt: result.createdAt
                });
            });

            // Get recent certificates issued (last 5)
            const recentCertificates = await Certificate.find()
                .populate('userId', 'username')
                .sort({ createdAt: -1 })
                .limit(5);

            recentCertificates.forEach(cert => {
                activities.push({
                    type: 'certificate_issued',
                    description: `Certificate issued to ${cert.userId?.username || 'User'}`,
                    createdAt: cert.createdAt
                });
            });

            // Sort all activities by date (most recent first) and limit to 15
            activities.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            const limitedActivities = activities.slice(0, 15);

            return res.status(200).json({
                message: "Recent activities fetched successfully",
                success: true,
                activities: limitedActivities
            });

        } catch (err) {
            console.error('Error fetching recent activities:', err);
            return res.status(500).json({ 
                message: "Internal server error", 
                success: false 
            });
        }
    }

}

export default new DashboardController();