import React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col">
      {/* Top nav */}
      <header className="border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-8 w-8 rounded-lg bg-indigo-500 flex items-center justify-center text-sm font-bold">
              B
            </span>
            <span className="text-sm font-semibold tracking-tight">
              DevBlog
            </span>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <Link
              to="/login"
              className="px-3 py-1.5 rounded-full border border-slate-700 text-slate-200 hover:border-indigo-500 hover:text-indigo-300 transition"
            >
              Log in
            </Link>
            <Link
              to="/signup"
              className="px-3 py-1.5 rounded-full bg-indigo-500 text-white text-xs font-medium hover:bg-indigo-600 shadow-lg shadow-indigo-500/30 transition"
            >
              Sign up
            </Link>
          </div>
        </div>
      </header>

      {/* Hero section */}
      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 py-12 md:py-20 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-indigo-400 mb-2">
              Cloud • Security • Dev
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight mb-4">
              Share your ideas.  
              <span className="block text-indigo-400">
                Learn from the community.
              </span>
            </h1>
            <p className="text-sm md:text-[13px] text-slate-400 max-w-md mb-6">
              A minimal blog platform where developers post articles, discuss
              projects, and get feedback using likes, dislikes, and comments.
            </p>
            <div className="flex flex-wrap gap-3 text-xs">
              <Link
                to="/signup"
                className="px-4 py-2 rounded-full bg-indigo-500 text-white font-medium hover:bg-indigo-600 shadow-lg shadow-indigo-500/30 transition"
              >
                Get started for free
              </Link>
              <Link
                to="/login"
                className="px-4 py-2 rounded-full border border-slate-700 text-slate-200 hover:border-indigo-500 hover:text-indigo-300 transition"
              >
                Already a member? Log in
              </Link>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 shadow-xl">
              <p className="text-xs text-slate-400 mb-3">
                Example post preview
              </p>
              <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-xs font-semibold">
                    JD
                  </div>
                  <div className="text-[11px]">
                    <p className="text-slate-200 font-medium">john_dev</p>
                    <p className="text-slate-500">Cloud Security Engineer</p>
                  </div>
                </div>
                <h2 className="text-sm font-semibold text-slate-50">
                  5 tips to secure your next MERN deployment
                </h2>
                <p className="text-[11px] text-slate-400 line-clamp-3">
                  From environment variables to HTTPS and JWT hardening, here
                  are some practical steps to keep your full‑stack apps safe in
                  production.
                </p>
                <div className="flex items-center gap-4 text-[10px] text-slate-500 pt-1">
                  <span>24 likes</span>
                  <span className="h-3 w-px bg-slate-700" />
                  <span>3 dislikes</span>
                  <span className="h-3 w-px bg-slate-700" />
                  <span>12 comments</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
