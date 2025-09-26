// API service for handling all server requests
const API_BASE_URL = `${import.meta.env.VITE_API_URL}`

// Helper function to get auth token from cookies
const getAuthToken = () => {
    // First try to get from cookies
    const cookieToken = document.cookie
        .split('; ')
        .find(row => row.startsWith('token=')) ?
        .split('=')[1];

    // If not in cookies, try localStorage as fallback
    const localToken = localStorage.getItem('token');

    return cookieToken || localToken;
};

// Helper function to make authenticated requests
const makeRequest = async(url, options = {}) => {
    const token = getAuthToken();

    console.log('Token found:', token ? 'Yes' : 'No');
    console.log('LocalStorage token:', localStorage.getItem('token'));
    console.log('Cookie token:', document.cookie);

    if (!token) {
        console.error('No authentication token found. Please login first.');
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
            console.error('API Error:', errorData);
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('API request failed:', error);
        throw error;
    }
};

// Career API functions
export const careerAPI = {
    // Get all jobs
    getJobs: () => makeRequest('/career/get'),

    // Apply for a job
    applyForJob: (formData) => {
        const token = getAuthToken();
        return fetch(`${API_BASE_URL}/application/apply`, {
            method: 'POST',
            headers: {
                ...(token && { 'Authorization': `Bearer ${token}` }),
                // Don't set Content-Type for FormData - browser will set it automatically with boundary
            },
            credentials: 'include',
            body: formData, // FormData for file upload
        }).then(async(response) => {
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }
            return response.json();
        });
    },

    // Get my applications
    getMyApplications: () => makeRequest('/application/my'),

    // Get job details
    getJobDetails: (jobId) => makeRequest(`/career/apply/${jobId}`),
};

// User API functions
export const userAPI = {
    // Get user profile
    getProfile: () => makeRequest('/user/profile'),

    // Update profile
    updateProfile: (data) => makeRequest('/user/profile', {
        method: 'PUT',
        body: JSON.stringify(data),
    }),
};

// Quiz API functions
export const quizAPI = {
    // Get quiz results
    getResults: () => makeRequest('/result/my'),

    // Get latest result
    getLatestResult: () => makeRequest('/result/latest'),
};

export default {
    careerAPI,
    userAPI,
    quizAPI,
};