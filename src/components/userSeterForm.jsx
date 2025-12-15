// src/components/userSeterForm.jsx
import React, { useState } from "react";
import { apiConnector } from "../apiconnector";
import toast from "react-hot-toast";

export default function UserSet({ postName, postID , type, visible, onClose, onSuccess }) {
  const [userName, setUser] = useState("");
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!visible) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Example comment API – adjust URL/body to your backend
      const raw = localStorage.getItem("user");
      const user = raw ? JSON.parse(raw) : null;

      await apiConnector("POST", "/comments/createcomments", {
        userID: user?._id || user?.userdata?._id,
        postID: postID,
        text: commentText,
      });

      setLoading(false);
      toast.success("Comment submitted successfully!");
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error("Comment submit error:", err);
      toast.error("Failed to submit comment. Please try again.");
      setError("Failed to submit. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 max-w-md mx-4 shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Comment on post
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl font-bold"
          >
            ×
          </button>
        </div>

        <p className="text-gray-600 mb-4">
          You are commenting on: <strong>"{postName}"</strong>
        </p>

        <form onSubmit={handleSubmit}>
         
          <div className="mb-3">
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Comment
            </label>
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="w-full border border-gray-300  text-black rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              placeholder="Write your comment..."
              disabled={loading}
            />
          </div>

          {error && (
            <div className="mb-3 text-red-500 text-xs">
              {error}
            </div>
          )}

          <div className="flex space-x-3">
            <button
              type="submit"
              disabled={loading}
              className={
                "flex-1 py-2 px-4 rounded-md text-white text-sm font-medium transition " +
                (loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-indigo-500 hover:bg-indigo-600")
              }
            >
              {loading ? "Submitting..." : "Submit comment"}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
