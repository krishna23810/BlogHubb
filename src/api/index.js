import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
});

export const fetchPosts = () => API.get('/posts');
export const fetchPost = (id) => API.get(`/posts/${id}`);
export const createPost = (newPost) => API.post('/posts', newPost);

export const fetchComments = () => API.get('/comments');
export const createComment = (newComment) => API.post('/comments', newComment);

export const fetchLikes = () => API.get('/likes');
export const createLike = (newLike) => API.post('/likes', newLike);

export const fetchUsers = () => API.get('/users');
export const createUser = (newUser) => API.post('/users', newUser);

export default API;