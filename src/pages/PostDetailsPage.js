import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchPost, createComment } from '../api';

const PostDetailsPage = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [userName, setUserName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalError, setModalError] = useState(null);
  const [commentError, setCommentError] = useState(null);
  const [commentSuccess, setCommentSuccess] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);
  const { id } = useParams();

  const getPost = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await fetchPost(id);
      setPost(data.data);
    } catch (err) {
      setError('Failed to load post. Please try again later.');
      console.error('Error fetching post:', err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    getPost();
  }, [getPost]);

  const handleCommentFormSubmit = (e) => {
    e.preventDefault();
    setCommentError(null);
    setCommentSuccess(null);
    if (!commentText.trim()) {
      setCommentError('Comment cannot be empty.');
      return;
    }
    setShowModal(true);
  };

  const handleModalSubmit = async (e) => {
    e.preventDefault();
    setModalError(null);
    if (!userName.trim()) {
      setModalError('Name is required.');
      return;
    }
    setModalLoading(true);
    try {
      await createComment({ text: commentText, postName: post.title, userName });
      setCommentText('');
      setUserName('');
      setCommentSuccess('Comment added successfully!');
      setShowModal(false);
      getPost();
    } catch (err) {
      setModalError('Failed to add comment. Please try again.');
    } finally {
      setModalLoading(false);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setUserName('');
    setModalError(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg text-gray-600">Loading post...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <div className="text-red-600 text-lg mb-4">{error}</div>
          <Link 
            to="/" 
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors duration-200"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <div className="text-center text-gray-500">Post not found</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Back Navigation */}
      <div className="mb-6">
        <Link 
          to="/" 
          className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Posts
        </Link>
      </div>

      {/* Post Content */}
      <article className="bg-white rounded-lg shadow-md p-8 mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">{post.title}</h1>
        <div className="prose max-w-none">
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{post.content}</p>
        </div>
      </article>

      {/* Comments Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">
          Comments ({post.comments ? post.comments.length : 0})
        </h3>
        
        {post.comments && post.comments.length > 0 ? (
          <div className="space-y-4 mb-8">
            {post.comments.map((comment) => (
              <div key={comment._id} className="border-l-4 border-blue-500 pl-4 py-2">
                <div className="flex items-center mb-2">
                  <span className="font-medium text-gray-900">{comment.userName}</span>
                  <span className="text-gray-500 text-sm ml-2">•</span>
                  <span className="text-gray-500 text-sm ml-2">
                    {comment.createdAt ? new Date(comment.createdAt).toLocaleDateString() : 'Recently'}
                  </span>
                </div>
                <p className="text-gray-700">{comment.text}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-gray-500 text-center py-8 mb-8 bg-gray-50 rounded">
            No comments yet. Be the first to comment!
          </div>
        )}

        {/* Comment Box and Submit Button */}
        {commentError && <div className="mb-2 text-red-500 text-sm">{commentError}</div>}
        {commentSuccess && <div className="mb-2 text-green-600 text-sm">{commentSuccess}</div>}
        <form onSubmit={handleCommentFormSubmit}>
          <label className="block text-gray-700 text-sm font-medium mb-2">Add a comment</label>
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-2"
            placeholder="Add a comment"
            rows={2}
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors duration-200"
          >
            Submit
          </button>
        </form>

        {/* Modal for user name input */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-80 max-w-md mx-4 shadow-xl relative">
              <button
                onClick={handleModalClose}
                className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 text-xl font-bold"
                aria-label="Close"
              >
                ×
              </button>
              <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">Enter Your Name</h2>
              <form onSubmit={handleModalSubmit}>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                  placeholder="Your name"
                  disabled={modalLoading}
                />
                {modalError && <div className="mb-2 text-red-500 text-sm">{modalError}</div>}
                <button
                  type="submit"
                  disabled={modalLoading}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded transition-colors duration-200"
                >
                  {modalLoading ? 'Submitting...' : 'Submit'}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostDetailsPage;
