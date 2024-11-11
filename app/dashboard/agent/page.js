//ticket dashboard
"use client";

import { useState } from "react";
import { Bell, ChevronDown, Menu, Search } from "lucide-react";
import TicketCard from "@/components/cards/TicketCard";
export default function Component() {
  const [activeTab, setActiveTab] = useState("all");

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
  return (
    <main className="p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Tickets</h2>
      </div>
      <div className="rounded-lg border bg-white shadow-sm p-8">
        {/* Search and Filters */}
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search for ticket"
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
            />
          </div>
          <div className="relative">
            <select className="appearance-none bg-white border rounded-lg px-4 py-2 pr-10">
              <option>Select Priority</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
            <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-gray-500" />
          </div>
          <div className="relative">
            <select className="appearance-none bg-white border rounded-lg px-4 py-2 pr-10">
              <option>This Week</option>
              <option>This Month</option>
              <option>This Year</option>
            </select>
            <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-gray-500" />
          </div>
          <button className="bg-orange-500 text-white px-4 py-2 rounded-lg flex items-center gap-2">
            <span>New Ticket</span>
          </button>
        </div>
        {/* Tabs */}
        <div className="flex gap-6 border-b mb-6">
          <button
            onClick={() => setActiveTab("all")}
            className={`pb-4 flex items-center gap-2 ${
              activeTab === "all"
                ? "border-b-2 border-orange-500 text-orange-500"
                : "text-gray-500"
            }`}
          >
             All Tickets <span className="bg-gray-100 px-2 rounded-full text-sm">{tickets.length}</span>
          </button>
          <button
            onClick={() => setActiveTab("new")}
            className={`pb-4 flex items-center gap-2 ${
              activeTab === "new"
                ? "border-b-2 border-orange-500 text-orange-500"
                : "text-gray-500"
            }`}
          >
            New{" "}
            <span className="bg-gray-100 px-2 rounded-full text-sm">21</span>
          </button>
          <button
            onClick={() => setActiveTab("ongoing")}
            className={`pb-4 flex items-center gap-2 ${
              activeTab === "ongoing"
                ? "border-b-2 border-orange-500 text-orange-500"
                : "text-gray-500"
            }`}
          >
            On-Going{" "}
            <span className="bg-gray-100 px-2 rounded-full text-sm">10</span>
          </button>
          <button
            onClick={() => setActiveTab("resolved")}
            className={`pb-4 flex items-center gap-2 ${
              activeTab === "resolved"
                ? "border-b-2 border-orange-500 text-orange-500"
                : "text-gray-500"
            }`}
          >
            Resolved{" "}
            <span className="bg-gray-100 px-2 rounded-full text-sm">7</span>
          </button>
        </div>
        {/* Tickets List */}
        <div className="space-y-4">
          {tickets.map((ticket) => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))}
        </div>
        {/* Pagination */}
        <div className="flex justify-center gap-2 mt-6">
          <button className="px-4 py-2 border rounded text-gray-500">
            Previous
          </button>
          <button className="px-4 py-2 bg-orange-500 text-white rounded">
            1
          </button>
          <button className="px-4 py-2 border rounded text-gray-500">2</button>
          <button className="px-4 py-2 border rounded text-gray-500">
            Next
          </button>
        </div>{" "}
      </div>
    </main>
  );
}
