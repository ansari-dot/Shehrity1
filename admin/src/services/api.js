// API service for admin panel
const API_BASE_URL = `${import.meta.env.VITE_API_URL}`;

// Helper function to get auth token
const getAuthToken = () => {
    // Check localStorage for token
    const localToken = localStorage.getItem('token');

    // Also check cookies as fallback
    const cookieTokenRow = document.cookie
        .split('; ')
        .find(row => row.startsWith('token='));

    const cookieToken = cookieTokenRow ? cookieTokenRow.split('=')[1] : null;

    return localToken || cookieToken;
};

// Helper function to make authenticated requests
const makeRequest = async(url, options = {}) => {
    const token = getAuthToken();

    if (!token) {
        throw new Error('Please login first');
    }

    const defaultHeaders = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    };

    const config = {
        ...options,
        credentials: 'include',
        headers: {
            ...defaultHeaders,
            ...options.headers,
        },
    };

    try {
        const response = await fetch(`${API_BASE_URL}${url}`, config);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(
                errorData.message || `HTTP error! status: ${response.status}`
            );
        }

        return await response.json();
    } catch (error) {
        console.error('API request failed:', error);
        throw error;
    }
};

// Career API functions for admin
export const adminCareerAPI = {
    // Get all jobs
    getJobs: () => makeRequest('/career/get'),

    // Add new job
    addJob: (jobData) =>
        makeRequest('/career/add', {
            method: 'POST',
            body: JSON.stringify(jobData),
        }),

    // Delete job
    deleteJob: (jobId) =>
        makeRequest(`/career/delete/${jobId}`, {
            method: 'DELETE',
        }),

    // Get all applications (admin only)
    getAllApplications: () => makeRequest('/application/all'),

    // Get applications for specific job
    getJobApplications: (jobId) =>
        makeRequest(`/application/job/${jobId}`),

    // Update application status and send email
    updateApplicationStatus: (applicationId, status) =>
        makeRequest(`/application/status/${applicationId}`, {
            method: 'PUT',
            body: JSON.stringify({ status }),
        }),
};

// User API functions for admin
export const adminUserAPI = {
    // Get all users
    getAllUsers: () => makeRequest('/user/all'),

    // Placeholder for user profile (to add later)
    getUserProfile: (userId) =>
        makeRequest(`/user/${userId}`),
};

// Quiz API functions for admin
export const adminQuizAPI = {
    // Get all quiz results
    getAllResults: () => makeRequest('/admin/quiz/results'),

    // Get results for specific user
    getUserResults: (userId) =>
        makeRequest(`/admin/quiz/results/${userId}`),
};

// Services API functions for admin
export const adminServicesAPI = {
    // Get all services
    getServices: () => makeRequest('/service/get'),

    // Delete service
    deleteService: (serviceId) =>
        makeRequest(`/service/${serviceId}`, {
            method: 'DELETE',
        }),
};

export default {
    adminCareerAPI,
    adminUserAPI,
    adminQuizAPI,
    adminServicesAPI,
};