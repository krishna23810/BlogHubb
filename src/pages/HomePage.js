import React, { useState, useEffect } from 'react';
import { fetchPosts } from '../api';
import { Link } from 'react-router-dom';
import UserSet from '../components/userSeter';

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [showUserSet, setShowUserSet] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [likeType, setLikeType] = useState('');

  useEffect(() => {
    const getPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        const { data } = await fetchPosts();
        setPosts(data.data);
      } catch (err) {
        setError('Failed to load posts. Please try again later.');
        console.error('Error fetching posts:', err);
      } finally {
        setLoading(false);
      }
    };

    getPosts();
  }, []);

  const handleLikeClick = (post) => {
    setSelectedPost(post);
    setLikeType('like');
    setShowUserSet(true);
  };

  const handleDislikeClick = (post) => {
    setSelectedPost(post);
    setLikeType('dislike');
    setShowUserSet(true);
  };

  const handleUserSetClose = () => {
    setShowUserSet(false);
    setSelectedPost(null);
    setLikeType('');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg text-gray-600">Loading posts...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-red-50 border border-red-200 text-red-600 text-lg p-6 rounded-lg shadow">
          {error}
          <button
            onClick={() => window.location.reload()}
            className="ml-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors duration-200"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <UserSet
        postName={selectedPost ? selectedPost.title : ''}
        type={likeType}
        visible={showUserSet}
        onClose={handleUserSetClose}
        onSuccess={() => {
          // Refresh posts after like/dislike
          setLoading(true);
          setError(null);
          fetchPosts().then(({ data }) => setPosts(data.data)).catch(() => setError('Failed to load posts. Please try again later.')).finally(() => setLoading(false));
        }}
      />
      
      <h1 className="text-3xl font-bold mb-6 text-center">Blog Posts</h1>
      
      {posts.length === 0 ? (
        <div className="text-center text-gray-500 flex flex-col items-center">
          <span>No posts available</span>
          <a
            href="/create"
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors duration-200"
          >
            Create a Post
          </a>
        </div>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <div key={post._id} className="bg-white rounded-lg shadow-md p-6 border">
              <h2 className="text-xl font-semibold mb-3 text-gray-800">{post.title}</h2>
              <p className="text-gray-600 mb-4 line-clamp-3">{post.content}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex space-x-3">
                  <button 
                    onClick={() => handleLikeClick(post)}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors duration-200 flex items-center space-x-1"
                  >
                    <span>👍</span>
                    <span>Like</span>
                  </button>
                  <button 
                    onClick={() => handleDislikeClick(post)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors duration-200 flex items-center space-x-1"
                  >
                    <span>👎</span>
                    <span>Dislike</span>
                  </button>
                </div>
                
                <Link 
                  to={`/post/${post._id}`}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors duration-200"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
