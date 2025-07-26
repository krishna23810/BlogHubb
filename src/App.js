import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PostDetailsPage from './pages/PostDetailsPage';
import CreatePostPage from './pages/CreatePostPage';

function Navigation() {
  const location = useLocation();
  
  return (
    <nav className="bg-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex space-x-8">
            <Link 
              to="/" 
              className={`inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors duration-200 ${
                location.pathname === '/' 
                  ? 'text-white border-b-2 border-blue-500' 
                  : 'text-gray-300 hover:text-white hover:border-gray-300'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/create" 
              className={`inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors duration-200 ${
                location.pathname === '/create' 
                  ? 'text-white border-b-2 border-blue-500' 
                  : 'text-gray-300 hover:text-white hover:border-gray-300'
              }`}
            >
              Create Post
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/post/:id" element={<PostDetailsPage />} />
            <Route path="/create" element={<CreatePostPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
