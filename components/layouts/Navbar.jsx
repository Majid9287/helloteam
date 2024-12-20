"use client";

import React, { useState } from "react";
import { Bell, ChevronDown, Menu, Settings, LogOut, User } from "lucide-react";

export default function Navbar({ user }) {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  console.log("user in nav", user);
  const notifications = [
    { id: 1, message: "New message received", time: "5 min ago" },
  ];

  return (
    <header className="bg-white border-b px-8 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <h1 className="text-gray-700">
          Welcome! <span className="font-medium">{user?.docs?.name}</span>
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative">
          <button
            className="relative p-2 hover:bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={() => setIsNotificationOpen(!isNotificationOpen)}
          >
            <Bell className="h-5 w-5 text-gray-500" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          {isNotificationOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
              <div className="px-4 py-2 font-semibold text-gray-700 border-b">
                Notifications
              </div>
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  <p className="text-sm text-gray-700">
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-500">{notification.time}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="relative">
          <button
            className="flex items-center gap-2 bg-gray-100 rounded-full px-2 py-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
          >
            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
              {user?.docs?.profilePicture ? (
                <img
                  src={user.docs.profilePicture}
                  alt="Profile"
                  className="h-10 w-10 rounded-full"
                />
              ) : (
                <User className="h-6 w-6 text-gray-500" />
              )}
            </div>

            <span className="font-medium">{user?.docs?.name}</span>
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </button>
          {isUserDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
              >
                <User className="h-4 w-4 mr-2" />
                Profile
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
              >
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Log out
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
