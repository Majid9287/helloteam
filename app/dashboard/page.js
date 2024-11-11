'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const roleSpecificContent = {
    admin: {
      title: "Admin Dashboard",
      url: "/dashboard/admin", // Main URL for Admin Dashboard
      features: [
        { name: "User Management", url: "/admin/user-management" },
        { name: "Create Users", url: "/admin/create-user" },
        { name: "Tickets", url: "/admin/tickets" }
      ]
    },
    supervisor: {
      title: "Supervisor Dashboard",
      url: "/dashboard/supervisor", // Main URL for Supervisor Dashboard
      features: [
        { name: "Assigned Tickets", url: "/supervisor/assigned-tickets" },
        { name: "Supervisor Agent", url: "/supervisor/agent-management" }
      ]
    },
    client: {
      title: "Client Dashboard",
      url: "/dashboard/client", // Main URL for Client Dashboard
      features: [
        { name: "Supervisor", url: "/client/supervisor" },
        { name: "Agent", url: "/client/agent" },
        { name: "Tickets", url: "/client/tickets" }
      ]
    },
    agent: {
      title: "Agent Dashboard",
      url: "/dashboard/agent", // Main URL for Agent Dashboard
      features: [
        { name: "Ticket Reply", url: "/agent/ticket-reply" },
        { name: "Create Ticket", url: "/agent/create-ticket" },
        { name: "Agent Supervisor", url: "/agent/supervisor" }
      ]
    }
  }
  

  
  export default function Dashboard() {
    const [currentRole, setCurrentRole] = useState('client');
    const router = useRouter();
  
    useEffect(() => {
      const simulatedRole = localStorage.getItem('userRole') || 'client';
      setCurrentRole(simulatedRole);
    }, []);
  
    const handleLogout = () => {
      localStorage.removeItem('userRole');
      router.push('/login');
    };
  
    const handleRoleChange = (role) => {
      setCurrentRole(role);
    };
  
    return (
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <span className="text-2xl font-bold text-gray-800">Logo</span>
                </div>
              </div>
              <div className="flex items-center">
                <button
                  onClick={handleLogout}
                  className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </nav>
  
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">Multi-Role Dashboard</h1>
          </div>
        </header>
  
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {Object.entries(roleSpecificContent).map(([role, content]) => (
                   <div
                    key={role}
                    className={`border-4 rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                      currentRole === role ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-orange-300'
                    }`}
                    onClick={() => handleRoleChange(role)}
                  ><Link href={content.url}>
                    <h2 className="text-2xl font-semibold mb-4">
                     {content.title}
                    </h2>
                    <ul className="list-disc pl-5 space-y-2">
                      {content.features.map((feature, index) => (
                        <li key={index}>
                         {feature.name}
                        </li>
                      ))}
                    </ul></Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
  
        <footer className="bg-white shadow mt-8">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <p className="text-center text-gray-500">
              Current Role: <span className="font-semibold">{currentRole.charAt(0).toUpperCase() + currentRole.slice(1)}</span>
            </p>
          </div>
        </footer>
      </div>
    );
  }
  