import React, { type ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

interface RedirectAuthenticatedUserProps {
  children: ReactNode;
}

const RedirectAuthenticatedUser: React.FC<RedirectAuthenticatedUserProps> = ({ children }) => {
  const { isAuthenticated, user } = useSelector((state: any) => state.user);

  if (isAuthenticated && user?.isVerified) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default RedirectAuthenticatedUser;
