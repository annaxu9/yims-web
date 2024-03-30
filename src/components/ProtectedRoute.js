// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, user, allowedRoles }) {
  if (!user || !allowedRoles.includes(user.role)) {
    // User is not logged in or doesn't have the required role
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;
