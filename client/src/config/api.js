const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://learnify-4otn.onrender.com/api/v1';

export const API_ENDPOINTS = {
    USER: `${API_BASE_URL}/user`,
    COURSE: `${API_BASE_URL}/course`,
    PURCHASE: `${API_BASE_URL}/purchase`,
    PROGRESS: `${API_BASE_URL}/progress`,
    MEDIA: `${API_BASE_URL}/media`
}; 