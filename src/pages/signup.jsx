import React from "react";
import { toast } from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    const form = e.target;
    const payload = {
      username: form.username.value,
      email: form.email.value,
      password: form.password.value,
      role: form.role.value,
    };

    try {
      const res = await apiConnector("POST", "/users/signup", payload);
      console.log("Signup success:", res.data);
      toast.success("Signup successful!");
      navigate("/login");
    } catch (error) {
      console.error("Signup error:", error);
      toast.error(
        error.response?.data?.message || "Signup failed. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-slate-900/80 border border-slate-800 rounded-2xl shadow-2xl p-8">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-semibold text-slate-50">Create account</h2>
          <p className="mt-1 text-sm text-slate-400">
            Join the blog community in a few seconds.
          </p>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          {/* Username */}
          <div>
            <label
              className="block text-xs font-medium text-slate-300 mb-1"
              htmlFor="username"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your username"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label
              className="block text-xs font-medium text-slate-300 mb-1"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label
              className="block text-xs font-medium text-slate-300 mb-1"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Role */}
          <div>
            <label
              className="block text-xs font-medium text-slate-300 mb-1"
              htmlFor="role"
            >
              Role
            </label>
            <select
              id="role"
              name="role"
              className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              defaultValue="user"
              required
            >
              <option value="user" className="bg-slate-900">
                User
              </option>
              <option value="admin" className="bg-slate-900">
                Admin
              </option>
            </select>
          </div>

          {/* Primary submit */}
          <button
            type="submit"
            className="w-full mt-2 bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2.5 px-4 rounded-lg text-sm shadow-lg shadow-indigo-500/30 transition-colors"
          >
            Sign up
          </button>

          {/* Secondary link */}
          <p className="mt-3 text-center text-xs text-slate-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-indigo-400 hover:text-indigo-300 font-medium"
            >
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
