// src/components/AuthGuard.js
'use client';

import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const AuthGuard = ({ 
  children, 
  allowedRoles = ['admin', 'supervisor', 'agent', 'client'] 
}) => {
  const { isAuthenticated, role } = useSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    // Not authenticated, redirect to login
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    // Check if user's role is allowed
    if (!allowedRoles.includes(role)) {
      // Redirect to unauthorized page or dashboard
      router.push('/unauthorized');
    }
  }, [isAuthenticated, role, router, allowedRoles]);

  // Render children if authenticated and role is allowed
  return isAuthenticated && allowedRoles.includes(role) ? children : null;
};

// Usage example:
export const AdminRoute = ({ children }) => (
  <AuthGuard allowedRoles={['admin']}>
    {children}
  </AuthGuard>
);

export const SupervisorRoute = ({ children }) => (
  <AuthGuard allowedRoles={['admin', 'supervisor']}>
    {children}
  </AuthGuard>
);