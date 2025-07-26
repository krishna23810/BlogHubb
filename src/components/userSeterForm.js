// import React from "react";
import React, { useState, useEffect } from 'react';
import { fetchPosts } from '../api';
import { Link } from 'react-router-dom';
import UserSet from '../components/userSeter';

const useSeterForm = ({ postName, type, visible, onClose, onSuccess})=>{

    return(
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg p-6 w-96 max-w-md mx-4 shadow-xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
            Commenting on Post
        </h2>   
        <button
          onClick={handleClose}
          className="text-gray-500 hover:text-gray-700 text-xl font-bold"
        >
          ×
        </button>
      </div>

      <p className="text-gray-600 mb-4">
        You're about to comment on  : <strong>"{postName}"</strong>
      </p>

      {success ? (
        <div className="text-center">
          <div className="text-green-500 text-lg mb-2">
            ✅ {type === 'liked' ? 'Liked' : 'Disliked'} successfully!
          </div>
          <p className="text-gray-500">Closing...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Enter your username:
            </label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUser(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Your username"
              disabled={loading}
            />
          </div>
           

          {error && (
            <div className="mb-4 text-red-500 text-sm">{error}</div>
          )}

          <div className="flex space-x-3">
            <button
              type="submit"
              disabled={loading}
              className={`flex-1 py-2 px-4 rounded-md text-white font-medium transition-colors duration-200 ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : type === 'liked'
                  ? 'bg-green-500 hover:bg-green-600'
                  : 'bg-red-500 hover:bg-red-600'
              }`}
            >
              {loading ? 'Submitting...' : `${type === 'liked' ? 'Like' : 'Dislike'} Post`}
            </button>
            <button
              type="button"
              onClick={handleClose}
              disabled={loading}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  </div>
 );
};

export default useSeterForm;