const API_URL = import.meta.env.VITE_API_URL;

export const getPosts = `${API_URL}/api/posts`;
export const createPost = `${API_URL}/api/posts/create`;
export const generateImage = `${API_URL}/api/dalle`;
