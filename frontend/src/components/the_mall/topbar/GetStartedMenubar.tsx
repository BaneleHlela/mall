import React from 'react';
import { useNavigate } from 'react-router-dom';

const GetStartedMenubar = () => {
  const navigate = useNavigate();

  return (
    <div className="sticky top-0 w-full h-[10vh] min-h-[10vh] bg-white shadow-sm flex items-center justify-between px-4 lg:px-[5vh] z-10">
      {/* Logo */}
       <div className="w-fit h-[60%] flex items-center">
            <p
              style={{ fontFamily: "Bebas Neue" }}
              className="text-black font-bold text-[3vh]"
            >
              The Mall
            </p>
        </div>

      {/* Navigation Links */}
      <div className="hidden md:flex items-center space-x-8">
        <button
          onClick={() => navigate('/')}
          className="text-gray-700 hover:text-gray-900 font-medium"
        >
          Home
        </button>
        <button
          onClick={() => navigate('/explore')}
          className="text-gray-700 hover:text-gray-900 font-medium"
        >
          Explore
        </button>
        <button
          onClick={() => navigate('/about')}
          className="text-gray-700 hover:text-gray-900 font-medium"
        >
          About
        </button>
        <button
          onClick={() => navigate('/contact')}
          className="text-gray-700 hover:text-gray-900 font-medium"
        >
          Contact
        </button>
      </div>

      {/* Auth Buttons */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate('/login')}
          className="text-gray-700 hover:text-gray-900 font-medium"
        >
          Login
        </button>
        <button
          onClick={() => navigate('/signup')}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 font-medium"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default GetStartedMenubar;