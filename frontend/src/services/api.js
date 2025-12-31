import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

// 인증 API
export const authAPI = {
  login: (name) => api.post('/api/auth/login', { name }),
  logout: () => api.post('/api/auth/logout'),
  getCurrentUser: () => api.get('/api/auth/me')
};

// 게시글 API
export const postsAPI = {
  getPosts: () => api.get('/api/posts'),
  getPost: (id) => api.get(`/api/posts/${id}`),
  createPost: (data) => api.post('/api/posts', data),
  updatePost: (id, data) => api.put(`/api/posts/${id}`, data),
  deletePost: (id) => api.delete(`/api/posts/${id}`)
};

export default api;

