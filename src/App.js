import React from 'react';
import { Router, Route, Routes} from 'react-router-dom';
import Deshboard from './pages/deshboard';
import CreatePostPage from './pages/CreatePostPage';
import Login from './pages/login';
import Signup from './pages/signup';
import Home from './pages/home';
import DetailPage from './pages/detailpage';


function App() {
  return (
    <div className="w-screen min-h-screen flex flex-col">
      <div className="flex-1 flex">
        <div className="w-full h-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/deshboard" element={<Deshboard />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/post/:id" element={<DetailPage />} />
            <Route path="/create" element={<CreatePostPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
