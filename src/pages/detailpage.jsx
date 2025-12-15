import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { apiConnector } from "../apiconnector";
import UserSet from "../components/userSeterForm";
import {toast} from "react-hot-toast";

export default function DetailPage() {
  const location = useLocation();
  const [post, setPost] = useState(null);
  const [role, setRole] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [postID, setPostID] = useState(null);

  // modal / form state
  const [formType, setFormType] = useState(""); // "comment"
  const [formVisible, setFormVisible] = useState(false);
  const [formPostName, setFormPostName] = useState("");

  const getPostData = async () => {
    try {
      setLoading(true);
      setError(null);

      const Id = location.pathname.split("/post/")[1];
      const res = await apiConnector("GET", `/posts/getpostsbyID/${Id}`);
      setPost(res.data.data);
      setPostID(Id);
      toast.success("Post loaded successfully");
    } catch (err) {
      console.error("Error fetching post data:", err);
      setError("Failed to load post. Please try again later.");
      toast.error("Failed to load post. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const raw = localStorage.getItem("user");
    if (raw) {
      try {
        const stored = JSON.parse(raw);
        const effectiveRole =
          stored?.role || stored?.userdata?.role || null;
        const effectiveId =
          stored?._id || stored?.userdata?._id || null;

        setRole(effectiveRole);
        setUserId(effectiveId);
      } catch (e) {
        console.error("Error parsing stored user:", e);
        setRole(null);
        setUserId(null);
      }
    } else {
      setRole(null);
      setUserId(null);
    }

    getPostData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <p className="text-slate-300 text-sm">Loading post...</p>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="bg-slate-900 border border-red-500/40 text-red-200 px-4 py-3 rounded-xl text-sm">
          {error || "Post not found."}
        </div>
      </div>
    );
  }

  // likes structure: [{ postId, user: [{ type: "like"|"dislike", user: "<id>" }], _id }, ...]
  const likeDocs = Array.isArray(post.likes) ? post.likes : [];

  let likesCount = 0;
  let dislikesCount = 0;


  for (const ld of likeDocs) {
    if (Array.isArray(ld.user)) {
      for (const u of ld.user) {
        if (u.type === "like") likesCount += 1;
        if (u.type === "dislike") dislikesCount += 1;
      }
    }
  }

  const comments = post.comments || [];
  const commentsCount = comments.length;

  // current user's reaction
  let userReaction = null;
  if (userId && Array.isArray(likeDocs)) {
    for (const ld of likeDocs) {
      if (Array.isArray(ld.user)) {
        const entry = ld.user.find((u) => u.user === userId);
        if (entry) {
          userReaction = entry.type;
          break;
        }
      }
    }
  }

  const isLiked = userReaction === "like";
  const isDisliked = userReaction === "dislike";

  const openCommentForm = () => {
    setFormPostName(post.title);
    setFormType("comment");
    setFormVisible(true);
  };

  const handleFormClose = () => {
    setFormVisible(false);
  };

  const handleFormSuccess = () => {
    setFormVisible(false);
    getPostData(); // reload to show new comment
  };

  const handleLikeDislike = async (type) => {
    if (!userId) return;
    try {
      const response = await apiConnector("POST", "/likes/createlikes", {
      userID :userId,
      postID,
      type,
    });
    toast.success(`You have ${type}d the post.`);
      console.log("Like/Dislike response:", response.data);
      await getPostData(); // refresh likes/dislikes and userReaction
    } catch (e) {
      toast.error(e.response?.data?.message || "Failed to register your reaction.");
      console.error("Like/Dislike error:", e);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-50">
      {/* comment modal */}
      <UserSet
        postName={formPostName}
        postID={post._id}
        type={formType}
        visible={formVisible}
        onClose={handleFormClose}
        onSuccess={handleFormSuccess}
      />

      <div className="max-w-5xl mx-auto px-4 py-6 md:py-10">
        {/* Top nav */}
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-slate-100"
          >
            <span>←</span>
            <span>Back to posts</span>
          </Link>
          <div className="flex items-center gap-3 text-[11px] text-slate-500">
            <span>{likesCount} likes</span>
            <span className="w-px h-3 bg-slate-700" />
            <span>{dislikesCount} dislikes</span>
            <span className="w-px h-3 bg-slate-700" />
            <span>{commentsCount} comments</span>
          </div>
        </div>

        {/* Main card */}
        <article className="bg-slate-950/90 border border-slate-800 rounded-3xl shadow-xl overflow-hidden">
          {/* Image */}
          {post.image && (
            <div className="w-full bg-black flex justify-center">
              <img
                src={post.image}
                alt={post.title}
                className="max-w-full max-h-[70vh] object-contain"
              />
            </div>
          )}

          <div className="p-6 md:p-8 lg:p-10 space-y-6">
            {/* Title + author */}
            <header className="space-y-3">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-xs font-semibold">
                    {post.userID?.username
                      ? post.userID.username.charAt(0).toUpperCase()
                      : "U"}
                  </div>
                  <div className="text-xs">
                    <div className="text-slate-200 font-semibold">
                      {post.userID?.username || "Unknown author"}
                    </div>
                    <div className="text-slate-500">
                      {post.userID?.email || "No email"}
                    </div>
                  </div>
                </div>

                {post.userID?.role && (
                  <span className="rounded-full bg-slate-900 border border-slate-700 px-3 py-1 text-[11px] uppercase tracking-wide text-slate-400">
                    {post.userID.role}
                  </span>
                )}
              </div>
            </header>

            {/* Content */}
            <section className="pt-2 border-t border-slate-800">
              <div className="prose prose-invert max-w-none text-sm leading-relaxed">
                <p className="whitespace-pre-line">{post.content}</p>
              </div>
            </section>

            {/* Comments */}
            <section className="pt-4 border-t border-slate-800">
              <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-3">
                Comments ({commentsCount})
              </h2>
              {commentsCount === 0 ? (
                <p className="text-[11px] text-slate-500">
                  No comments yet. Be the first to comment.
                </p>
              ) : (
                <div className="space-y-3">
                  {comments.map((c) => (
                    <div
                      key={c._id}
                      className="rounded-xl border border-slate-800 bg-slate-900/80 px-3 py-2 text-xs"
                    >
                      <p className="text-slate-200 mb-1 break-words">
                        {c.text}
                      </p>
                      <p className="text-[10px] text-slate-500">
                        by {c.userID?.username || "anonymous"}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Footer meta + actions */}
            <footer className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-500">
              <div className="flex items-center gap-3">
                <span>Likes: {likesCount}</span>
                <span className="w-px h-3 bg-slate-700" />
                <span>Dislikes: {dislikesCount}</span>
                <span className="w-px h-3 bg-slate-700" />
                <span>Comments: {commentsCount}</span>
              </div>

              {role === "admin" ? null : (
                <div className="flex gap-2">
                  {role === "user" && (
                    <>
                      <button
                        className={
                          "px-3 py-1 rounded-full border text-[11px] transition " +
                          (isLiked
                            ? "bg-emerald-500/20 border-emerald-400 text-emerald-200"
                            : "bg-slate-900 border-slate-700 hover:border-emerald-500 hover:text-emerald-300")
                        }
                        onClick={() => handleLikeDislike("like")}
                      >
                        👍 Like
                      </button>
                      <button
                        className={
                          "px-3 py-1 rounded-full border text-[11px] transition " +
                          (isDisliked
                            ? "bg-rose-500/20 border-rose-400 text-rose-200"
                            : "bg-slate-900 border-slate-700 hover:border-rose-500 hover:text-rose-300")
                        }
                        onClick={() => handleLikeDislike("dislike")}
                      >
                        👎 Dislike
                      </button>
                      <button
                        onClick={openCommentForm}
                        className="px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-[11px] hover:border-indigo-500 hover:text-indigo-300 transition"
                      >
                        💬 Comment
                      </button>
                    </>
                  )}
                </div>
              )}
            </footer>
          </div>
        </article>
      </div>
    </div>
  );
}
