'use client';

import React from 'react';
import Sidebar from '@/components/layouts/Sidebar';
import Navbar from '@/components/layouts/Navbar';

export default function MainLayout({ children }) {
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar role='agent' />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto">
          <Navbar />
          <main className="p-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}