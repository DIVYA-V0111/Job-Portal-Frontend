import axios from 'axios';

const API_URL = 'https://job-portal-backend-rb2i.onrender.com/api';

// Add token to every request automatically
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth APIs
export const loginUser = (data) => axios.post(`${API_URL}/auth/login`, data);
export const registerUser = (data) => axios.post(`${API_URL}/auth/register`, data);
export const forgotPassword = (email) => axios.post(`${API_URL}/auth/forgot-password?email=${email}`);
export const verifyOtp = (email, otp) => axios.post(`${API_URL}/auth/verify-otp?email=${email}&otp=${otp}`);
export const resetPassword = (email, otp, newPassword) => axios.post(`${API_URL}/auth/reset-password?email=${email}&otp=${otp}&newPassword=${newPassword}`);

// Job APIs
export const getAllJobs = (page, size) => axios.get(`${API_URL}/jobs?page=${page}&size=${size}`);
export const getJobById = (id) => axios.get(`${API_URL}/jobs/${id}`);
export const createJob = (data) => axios.post(`${API_URL}/jobs`, data);
export const updateJob = (id, data) => axios.put(`${API_URL}/jobs/${id}`, data);
export const deleteJob = (id) => axios.delete(`${API_URL}/jobs/${id}`);
export const searchJobs = (keyword) => axios.get(`${API_URL}/jobs/search?keyword=${keyword}`);
export const getMyJobs = () => axios.get(`${API_URL}/jobs/my-jobs`);

// Application APIs
// ✅ CORRECT - Sending JSON object
export const applyForJob = (jobId, coverLetter) => axios.post(`${API_URL}/applications/apply/${jobId}`, { coverLetter });
export const getMyApplications = () => axios.get(`${API_URL}/applications/my-applications`);
export const getJobApplications = (jobId) => axios.get(`${API_URL}/applications/job/${jobId}`);
export const updateApplicationStatus = (applicationId, status) => axios.put(`${API_URL}/applications/${applicationId}/status?status=${status}`);

// Saved Jobs APIs
export const saveJob = (jobId) => axios.post(`${API_URL}/saved-jobs/${jobId}`);
export const unsaveJob = (jobId) => axios.delete(`${API_URL}/saved-jobs/${jobId}`);
export const getSavedJobs = () => axios.get(`${API_URL}/saved-jobs`);

// Resume APIs
export const uploadResume = (formData) => axios.post(`${API_URL}/resume/upload`, formData);
export const downloadResume = () => axios.get(`${API_URL}/resume/download`, { responseType: 'blob' });
export const deleteResume = () => axios.delete(`${API_URL}/resume/delete`);

// Profile APIs
export const getProfile = () => axios.get(`${API_URL}/users/profile`);
export const updateProfile = (data) => axios.put(`${API_URL}/users/profile`, data);
export const changePassword = (oldPassword, newPassword) => axios.put(`${API_URL}/users/change-password?oldPassword=${oldPassword}&newPassword=${newPassword}`);

// Recommended Jobs
export const getRecommendedJobs = () => axios.get(`${API_URL}/recommended-jobs`);