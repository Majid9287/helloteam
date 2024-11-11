"use client";

import {
  Bell,
  ChevronDown,
  LayoutDashboard,
  Menu,
  Search,
  Ticket,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import TicketCard from "@/components/cards/TicketCard";

import ActivityItem from "@/components/cards/ActivityItem";
export default function TicketDashboard() {
  const [activeTab, setActiveTab] = useState("assigned");

  const tickets = [
    {
      id: "2023-CS123",
      title: "How to deposit money to my portal?",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      status: "new",
      user: {
        name: "John Snow",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      postedAt: "12:45 AM",
    },
    {
      id: "2023-CS124",
      title: "How to deposit money to my portal?",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      status: "ongoing",
      user: {
        name: "John Snow",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      postedAt: "12:45 AM",
    },
    {
      id: "2023-CS125",
      title: "How to deposit money to my portal?",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      status: "resolved",
      user: {
        name: "John Snow",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      postedAt: "12:45 AM",
    },
  ];

  const activities = [
    {
      name: "John snow",
      action: "move (Ticket 2023 CS12) from On-going to Resolved",
      timestamp: "10 Nov 2024, 12:45 AM",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      name: "John snow",
      action: "move (Ticket 2023 CS12) from On-going to Resolved",
      timestamp: "10 Nov 2024, 12:45 AM",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      name: "John snow",
      action: "move (Ticket 2023 CS12) from On-going to Resolved",
      timestamp: "10 Nov 2024, 12:45 AM",
      avatar: "/placeholder.svg?height=32&width=32",
    },
  ];

  return (
    <div className="flex">
      {/* Tickets Section */}
      <div className="flex-1 p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-6">Tickets</h2>
          <div className="flex gap-1">
            <div className="rounded-lg border bg-white shadow-sm p-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
                <div className="flex gap-4">
                  <select className="rounded-md border border-gray-300 px-3 py-2 text-sm">
                    <option>This Week</option>
                    <option>Last Week</option>
                    <option>This Month</option>
                  </select>
                  <select className="rounded-md border border-gray-300 px-3 py-2 text-sm">
                    <option>Select Priority</option>
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="search"
                    placeholder="Search for ticket"
                    className="pl-10 pr-4 py-2 border rounded-md w-full md:w-[300px]"
                  />
                </div>
              </div>

              <div className="border-b mb-6">
                <div className="flex gap-4">
                  <button
                    onClick={() => setActiveTab("assigned")}
                    className={`relative px-4 py-2 ${
                      activeTab === "assigned"
                        ? "text-orange-500"
                        : "text-gray-600"
                    }`}
                  >
                    Assigned
                    <span className="ml-2 rounded-full bg-gray-100 px-2 py-1 text-xs">
                      7
                    </span>
                    {activeTab === "assigned" && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500" />
                    )}
                  </button>
                  <button
                    onClick={() => setActiveTab("unassigned")}
                    className={`relative px-4 py-2 ${
                      activeTab === "unassigned"
                        ? "text-orange-500"
                        : "text-gray-600"
                    }`}
                  >
                    Unassigned
                    <span className="ml-2 rounded-full bg-gray-100 px-2 py-1 text-xs">
                      2
                    </span>
                    {activeTab === "unassigned" && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500" />
                    )}
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {tickets.map((ticket, index) => (
                  <TicketCard key={index} ticket={ticket} />
                ))}
              </div>

              <div className="flex items-center justify-end gap-2 mt-6">
                <button className="px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 rounded-md">
                  Previous
                </button>
                <button className="h-8 w-8 rounded-md bg-orange-500 text-white">
                  1
                </button>
                <button className="h-8 w-8 rounded-md text-gray-500 hover:bg-gray-100">
                  2
                </button>
                <button className="px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 rounded-md">
                  Next
                </button>
              </div>
            </div>
              <div className="rounded-md  bg-white p-6">
                <h3 className="font-semibold mb-2">Recent Activity</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Agent's recent activities.
                </p>
                <div className="divide-y">
                  {activities.map((activity, index) => (
                    <ActivityItem key={index} activity={activity} />
                  ))}
                
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Sidebar */}
    </div>
  );
}
