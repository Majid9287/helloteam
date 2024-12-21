import React from "react";
import { User } from "lucide-react";

const SupervisorTable = ({ supervisors }) => {
  const truncateTicket = (ticket) => {
    return ticket.length > 10 ? `${ticket.substring(0, 10)}...` : ticket;
  };

  return (
    <div className="bg-white rounded-lg border">
      {/* Table Header */}
      <div className="grid grid-cols-5 gap-4 p-4 border-b text-sm font-medium text-gray-500">
        <div>Profile</div>
        <div>Name</div>
        <div>Role</div>
        <div>From</div>
        <div>Tickets</div>
      </div>

      {/* Table Body */}
      <div className="divide-y">
        {supervisors.map((supervisor, id) => (
          <div
            key={id}
            className="grid grid-cols-5 gap-4 p-4 items-center hover:bg-gray-50"
          >
            <div>
              {supervisor.profilePicture ? (
                <img
                  src="/placeholder.svg?height=40&width=40"
                  alt={supervisor.name}
                  className="h-10 w-10 rounded-full object-cover"
                />
              ) : (
                <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <User className="text-gray-500 h-6 w-6" />
                </div>
              )}
            </div>

            <div>
              <div className="font-medium">{supervisor.name}</div>
              <div className="text-sm text-gray-500">{supervisor.email}</div>
            </div>
            <div className="text-gray-600">{supervisor.role}</div>
            <div className="text-gray-600">{supervisor.createdAt}</div>
            <div className="flex gap-2 flex-wrap">
              {supervisor.tickets.map((ticket, index) => (
                <span
                  key={index}
                  title={ticket} // Show full ticket ID on hover
                  className="px-2 py-1 bg-gray-100 rounded text-sm text-gray-600"
                >
                  {truncateTicket(ticket)}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SupervisorTable;