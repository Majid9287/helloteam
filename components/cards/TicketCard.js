"use client"

import React, { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { User, Edit } from 'lucide-react'
import axios from 'axios'
import { toast} from 'react-hot-toast'

export default function TicketCard({ ticket: initialTicket, organizationId, token }) {
  const [ticket, setTicket] = useState(initialTicket)
  const [showAgentList, setShowAgentList] = useState(false)
  const [showStatusDropdown, setShowStatusDropdown] = useState(false)
  const [showPriorityDropdown, setShowPriorityDropdown] = useState(false)
  const [agents, setAgents] = useState([])
  const [loading, setLoading] = useState(false)
  const agentListRef = useRef(null)
  const statusDropdownRef = useRef(null)
  const priorityDropdownRef = useRef(null)

  const statusOptions = ["new", "in_progress", "resolved", "closed"]
  const priorityOptions = ["low", "medium", "high", "urgent"]
  const statusColors = {
    new: "bg-blue-400",
    in_progress: "bg-orange-400",
    resolved: "bg-green-400",
    closed: "bg-gray-400"
  }

  useEffect(() => {
    setTicket(initialTicket)
  }, [initialTicket])

  useEffect(() => {
    if (showAgentList) {
      fetchAgents()
    }
  }, [showAgentList])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (agentListRef.current && !agentListRef.current.contains(event.target)) {
        setShowAgentList(false)
      }
      if (statusDropdownRef.current && !statusDropdownRef.current.contains(event.target)) {
        setShowStatusDropdown(false)
      }
      if (priorityDropdownRef.current && !priorityDropdownRef.current.contains(event.target)) {
        setShowPriorityDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const fetchAgents = async () => {
    setLoading(true)
    try {
      const response = await axios.get(
        `https://helloteam-backend.vercel.app/api/users/${organizationId}?role=agent&page=1&limit=10`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      )
      setAgents(response.data.docs.users)
    } catch (error) {
      console.error("Error fetching agents:", error)
      toast.error("Failed to fetch agents. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const assignAgent = async (agentId) => {
    try {
      const response = await axios.put(
        `https://helloteam-backend.vercel.app/api/tickets/${ticket._id}/assign`,
        { agentId },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      )
      const updatedTicket = response.data.docs
      setTicket(updatedTicket)
      setShowAgentList(false)
      toast.success(`Agent assigned successfully: ${updatedTicket.assigned_agent.name}`)
    } catch (error) {
      console.error("Error assigning agent:", error)
      toast.error("Failed to assign agent. Please try again.")
    }
  }

  const updateStatus = async (newStatus) => {
    try {
      const response = await axios.patch(
        `https://helloteam-backend.vercel.app/api/tickets/${ticket._id}/status`,
        { status: newStatus },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      )
      const updatedTicket = response.data.docs
      setTicket(updatedTicket)
      setShowStatusDropdown(false)
      toast.success(`Status updated to ${newStatus}`)
    } catch (error) {
      console.error("Error updating status:", error)
      toast.error("Failed to update status. Please try again.")
    }
  }

  const updatePriority = async (newPriority) => {
    try {
      const response = await axios.patch(
        `https://helloteam-backend.vercel.app/api/tickets/${ticket._id}/priority`,
        { priority: newPriority },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      )
      const updatedTicket = response.data.docs
      setTicket(updatedTicket)
      setShowPriorityDropdown(false)
      toast.success(`Priority updated to ${newPriority}`)
    } catch (error) {
      console.error("Error updating priority:", error)
      toast.error("Failed to update priority. Please try again.")
    }
  }

  return (
    <>
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
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2 relative">
            {ticket.assigned_agent ? (
              <>
                {ticket.assigned_agent.profilePicture ? (
                  <Image
                    src={ticket.assigned_agent.profilePicture}
                    alt={ticket.assigned_agent.name}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-600 text-xs">{ticket.assigned_agent.name.charAt(0).toUpperCase()}</span>
                  </div>
                )}
                <span className="text-sm font-medium">{ticket.assigned_agent.name}</span>
                <button
                  onClick={() => setShowAgentList(!showAgentList)}
                  className="ml-2 text-gray-500 hover:text-gray-700"
                >
                  <Edit size={16} />
                </button>
              </>
            ) : (
              <button
                onClick={() => setShowAgentList(!showAgentList)}
                className="flex items-center gap-2 text-orange-500 hover:text-orange-600"
              >
                <User size={16} />
                <span className="text-sm font-medium">Assign Agent</span>
              </button>
            )}
            {showAgentList && (
              <div ref={agentListRef} className="absolute top-full left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                <div className="py-1">
                  {loading ? (
                    <div className="px-4 py-2 text-sm text-gray-700">Loading...</div>
                  ) : (
                    agents.map((agent) => (
                      <button
                        key={agent._id}
                        onClick={() => assignAgent(agent._id)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                      >
                        {agent.name}
                      </button>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <button
                onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                className="text-sm font-medium text-gray-700 bg-gray-100 px-2 py-1 rounded hover:bg-gray-200"
              >
                Status: {ticket.status}
              </button>
              {showStatusDropdown && (
                <div ref={statusDropdownRef} className="absolute top-full left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                  {statusOptions.map((status) => (
                    <button
                      key={status}
                      onClick={() => updateStatus(status)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                    >
                      {status}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="relative">
              <button
                onClick={() => setShowPriorityDropdown(!showPriorityDropdown)}
                className="text-sm font-medium text-gray-700 bg-gray-100 px-2 py-1 rounded hover:bg-gray-200"
              >
                Priority: {ticket.priority}
              </button>
              {showPriorityDropdown && (
                <div ref={priorityDropdownRef} className="absolute top-full left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                  {priorityOptions.map((priority) => (
                    <button
                      key={priority}
                      onClick={() => updatePriority(priority)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                    >
                      {priority}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <Link 
              href={`/dashboard/client/ticket/${ticket._id}`}
              className="text-sm font-medium text-orange-500 hover:text-orange-600"
            >
              Open Ticket
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
