import React, { useState } from 'react';
import { apiConnector } from '../apiconnector';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-hot-toast';

const CreatePostPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const userdataRaw = localStorage.getItem('user');
      if (!userdataRaw) {
        setError('You must be logged in to create a post.');
        return;
      }

      const userdata = JSON.parse(userdataRaw);
      if (!userdata?._id) {
        setError('Invalid user data. Please log in again.');
        return;
      }

      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      formData.append('userID', userdata._id);
      if (image) formData.append('image', image);

      const res = await apiConnector(
        'POST',
        '/posts/createpost',
        formData,
        { 'Content-Type': 'multipart/form-data' }
      );

      console.log('Post created:', res.data);
      navigate(`/post/:id${res.data.post._id}`);
      toast.success('Post created successfully!');
      setTitle('');
      setContent('');
      setImage(null);
      setSuccess('Post created successfully!');
    } catch (err) {
      console.error('Create post error:', err);
      if(err.response && err.response.data && err.response.data.message){
        setError(err.response.data.message);
        toast.error(err.response.data.message);
        return;
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 flex items-center justify-center px-4">
      <div className="w-full max-w-xl">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-slate-50 tracking-tight">
            Write a new story
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Share your thoughts with the world. Add an optional cover image to make it stand out.
          </p>
        </div>

        <div className="relative group">
          <div className="absolute -inset-[1px] bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-500 rounded-2xl opacity-60 blur group-hover:opacity-100 transition" />
          <div className="relative bg-slate-950/90 border border-slate-800 rounded-2xl shadow-xl p-6 sm:p-7">
            {error && (
              <div className="mb-4 text-sm text-red-200 bg-red-950/60 border border-red-500/50 px-3 py-2 rounded-lg">
                {error}
              </div>
            )}
            {success && (
              <div className="mb-4 text-sm text-emerald-200 bg-emerald-950/60 border border-emerald-500/50 px-3 py-2 rounded-lg">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
              <div>
                <label className="block mb-1 text-xs font-semibold uppercase tracking-wide text-slate-300">
                  Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Give your post a catchy title"
                />
              </div>

              <div>
                <label className="block mb-1 text-xs font-semibold uppercase tracking-wide text-slate-300">
                  Content
                </label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 min-h-[140px]"
                  placeholder="Start writing your story..."
                />
                <p className="mt-1 text-[11px] text-slate-500">
                  Markdown or rich text not enabled yet – keep it simple and clear.
                </p>
              </div>

              <div>
                <label className="block mb-1 text-xs font-semibold uppercase tracking-wide text-slate-300">
                  Cover Image <span className="text-slate-500 font-normal">(optional)</span>
                </label>
                <label className="flex items-center justify-between rounded-lg border border-dashed border-slate-700 bg-slate-900/60 px-3 py-2 cursor-pointer hover:border-indigo-500/70 hover:bg-slate-900 transition">
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-200">
                      {image ? image.name : 'Click to choose an image'}
                    </span>
                    <span className="text-[11px] text-slate-500">
                      JPG, PNG, or WEBP up to ~5MB
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold text-indigo-300">
                    Browse
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files && e.target.files[0];
                      setImage(file || null);
                    }}
                  />
                </label>
              </div>

              <button
                type="submit"
                className="w-full mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-indigo-400 hover:shadow-lg transition"
              >
                Publish post
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePostPage;
