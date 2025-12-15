import React, { useState, useEffect } from 'react';
import { apiConnector } from '../apiconnector';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const user = localStorage.getItem("user");
  const userid= JSON.parse(user);

  useEffect(() => {
    const getPosts = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await apiConnector('GET', '/posts/getposts');
        const list = Array.isArray(res.data) ? res.data : res.data?.data;
        setPosts(Array.isArray(list) ? list : []);
        toast.success('Posts loaded successfully!');
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError('Failed to load posts. Please try again later.');
        setPosts([]);
        toast.error('Error loading posts.');
      } finally {
        setLoading(false);
      }
    };

    getPosts();
  }, []);

  const handleLikeClick = async (post,type) => {
    try {
        console.log("UserID:", userid);
          const response = await apiConnector("POST", "/likes/createlikes", {
          userID :userid._id,
          postID:post._id,
          type,
        });
        toast.success(`You have ${type}d the post!`);
        console.log('Like clicked for post:', post._id);
    } catch (error) {
        toast.error(error.response?.data?.message || 'Error liking the post.');
        console.error('Error liking post:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-slate-950">
        <div className="text-slate-300 text-lg">Loading posts...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-slate-950">
        <div className="bg-slate-900 border border-red-500/40 text-red-200 text-sm p-6 rounded-xl shadow-lg max-w-md w-full">
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 rounded-lg bg-red-500 text-white text-xs font-semibold hover:bg-red-600 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // split posts
  const postsWithImage = posts.filter((p) => !!p.image);
  const postsWithoutImage = posts.filter((p) => !p.image);

  const renderCard = (post, hasImage) => (
    <article
      key={post._id}
      className="group bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col hover:border-indigo-500/60 hover:shadow-lg hover:shadow-indigo-500/10 transition"
    >
      {hasImage ? (
        <div className="h-40 w-full overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      ) : (
        <div className="h-32 w-full bg-slate-800 flex items-center justify-center">
          <div className="text-center text-xs text-slate-400">
            <div className="mb-1 text-slate-200 font-medium">
              {post.title || 'Untitled post'}
            </div>
            <div className="text-[11px]">No cover image</div>
          </div>
        </div>
      )}

      <div className="p-4 flex flex-col flex-1">
        <h2 className="text-base md:text-lg font-semibold mb-2 line-clamp-2">
          {post.title}
        </h2>
        <p className="text-xs text-slate-400 mb-4 line-clamp-3">
          {post.content}
        </p>

        <div className="mt-auto flex items-center justify-between pt-3 border-t border-slate-800">
          <div className="flex gap-2">
            <button
              onClick={() => handleLikeClick(post, "like")}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 text-[11px] text-slate-100 hover:bg-emerald-500/20 hover:text-emerald-300 transition"
            >
              <span>👍</span>
              <span>Like</span>
            </button>
            <button
              onClick={() => handleLikeClick(post, "dislike")}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 text-[11px] text-slate-100 hover:bg-rose-500/20 hover:text-rose-300 transition"
            >
              <span>👎</span>
              <span>Dislike</span>
            </button>
          </div>

          <Link
            to={`/post/${post._id}`}
            className="text-[11px] font-semibold text-indigo-400 hover:text-indigo-300"
          >
            Read more →
          </Link>
        </div>
      </div>
    </article>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">

      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl md:text-2xl font-semibold tracking-tight">
            Blog<span className="text-indigo-400">Hub</span>
          </h1>
          <div className="text-sm text-slate-300 flex flex-row gap-4 mr-4">
            <p >Name : {userid.username}</p>
            <p>Email : {userid.email}</p>
            <p>Role : {userid.role}</p>
          </div>
          <Link
            to="/create"
            className="px-3 py-1.5 rounded-lg bg-indigo-600 text-xs font-semibold hover:bg-indigo-500 transition"
          >
            New Post
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-10">
        {/* Section 1: posts with images */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-slate-200 uppercase tracking-wide">
              Posts with images
            </h2>
            <span className="text-[11px] text-slate-500">
              {postsWithImage.length} posts
            </span>
          </div>

          {postsWithImage.length === 0 ? (
            <div className="text-xs text-slate-500 bg-slate-900 border border-slate-800 rounded-xl p-4">
              No posts with images yet.
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {postsWithImage.map((post) => renderCard(post, true))}
            </div>
          )}
        </section>

        {/* Section 2: posts without images */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-slate-200 uppercase tracking-wide">
              Posts without images
            </h2>
            <span className="text-[11px] text-slate-500">
              {postsWithoutImage.length} posts
            </span>
          </div>

          {postsWithoutImage.length === 0 ? (
            <div className="text-xs text-slate-500 bg-slate-900 border border-slate-800 rounded-xl p-4">
              All posts currently have images.
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {postsWithoutImage.map((post) => renderCard(post, false))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default HomePage;
