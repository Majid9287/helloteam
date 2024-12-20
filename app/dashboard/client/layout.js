'use client';

import React from 'react';
import Sidebar from '@/components/layouts/Sidebar';
import Navbar from '@/components/layouts/Navbar';
import { useSelector } from 'react-redux';
export default function MainLayout({ children }) {
  const user = useSelector((state) => state.auth.user);
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar role='client' />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto">
          <Navbar user={user} />
          <main className="p-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}