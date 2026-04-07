import React, { type ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, user, isCheckingAuth } = useSelector((state: any) => state.user);
  const location = useLocation();

  // Wait for auth check to complete before redirecting
  if (isCheckingAuth) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-slate-50">
          <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-slate-200 border-t-gray-700 rounded-full animate-spin" />
              <p className="text-slate-500 font-medium">Loading..</p>
          </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="relative h-screen w-screen flex items-center justify-center bg-stone-100">
        <div className="flex flex-col items-center justify-center max-w-md h-full w-full bg-[#ffffff6c] rounded-lg shadow-xl p-8 text-center z-1">
          <h2 className="text-2xl font-semibold text-stone-800 mb-2">Access Restricted</h2>
          <p className="text-stone-500 mb-6">Please log in to access this page.</p>
          <a
            href={`/login?redirect=${encodeURIComponent(location.pathname)}`}
            className="inline-block px-6 py-3 bg-stone-800 text-white font-semibold rounded-lg hover:bg-stone-700 transition-colors duration-200"
          >
            Log In
          </a>
        </div>
        <img 
          src="https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/photo-collage.png%20(2).png" 
          alt="background-image" className="absolute inset-0 w-full h-full object-cover opacity-60" 
        />
      </div>
    );
  }

  if (!user?.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
