"use client";

import React, { useState } from "react";

export default function UserCard({ user }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="my-2 w-full border border-gray-200 rounded-lg p-6 hover:bg-gray-50 transition-colors">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="relative h-10 w-10 rounded-full overflow-hidden">
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="object-cover w-full h-full"
              onError={(e) => {
                e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`;
              }}
            />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="font-medium leading-none">{user.name}</h3>
            </div>
            <p className="text-sm text-gray-600">{user.description}</p>
            <p className="text-sm text-gray-600">{user.email}</p>
          </div>
        </div>
        <span className="text-xs text-gray-500 whitespace-nowrap">
          {user.created}
        </span>
      </div>
      
      <hr className="my-4 border-gray-200" />
      
      <div className="space-y-2">
        {(expanded ? user.tickets : user.tickets.slice(0, 4)).map((ticket, index) => (
          <span
            key={index}
            className="inline-block mr-2 mb-2 px-2 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded"
          >
            {ticket}
          </span>
        ))}
        {user.tickets.length > 4 && (
          <button 
            onClick={() => setExpanded(!expanded)} 
            className="text-xs font-medium text-orange-500 hover:underline"
          >
            {expanded ? 'See less' : 'See more'}
          </button>
        )}
      </div>
    </div>
  );
}