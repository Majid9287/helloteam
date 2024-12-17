"use client"

import React from "react"
import Link from "next/link"

export default function TicketCard({ ticket }) {
  const statusColors = {
    new: "bg-blue-400",
    in_progress: "bg-orange-400",
    resolved: "bg-green-400"
  }

  return (
    <div className="border rounded-lg p-6 space-y-4 my-2">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${statusColors[ticket.status]}`} />
          <h2 className="text-sm font-medium">Ticket# {ticket.tree_id}</h2>
        </div>
        <span className="text-sm text-gray-500">Created at {new Date(ticket.createdAt).toLocaleString()}</span>
      </div>
      
      <div className="space-y-2">
        <h3 className="font-medium">{ticket.tree_name}</h3>
        <p className="text-gray-600 text-sm">{ticket.notes || "No description available."}</p>
      </div>

      <hr className="border-gray-200" />

      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
            <span className="text-gray-600 text-xs">{ticket.tree_name.charAt(0).toUpperCase()}</span>
          </div>
          <span className="text-sm font-medium">Priority: {ticket.priority}</span>
        </div>
        <Link 
          href={`/tickets/${ticket._id}`}
          className="text-sm font-medium text-orange-500 hover:text-orange-600"
        >
          Open Ticket
        </Link>
      </div>
    </div>
  )
}