"use client"

import { Bell, ChevronDown, LayoutDashboard, Menu, Search, Ticket, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import * as React from "react"
import TicketCard from "@/components/cards/TicketCard";
export default function Component() {
  const [activeTab, setActiveTab] = React.useState("all")
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
  ]



  return (
   
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-semibold">Tickets</h1>
          </div>
          
          <div className="rounded-lg border bg-white shadow-sm p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex w-full items-center gap-4 md:w-[300px]">
              <Search className="h-4 w-4 text-gray-400" />
              <input
                className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Search for ticket"
                type="search"
              />
            </div>
            <div className="flex gap-4">
              <select className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500">
                <option>Select Priority</option>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
              <select className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500">
                <option>This Week</option>
                <option>Last Week</option>
                <option>This Month</option>
                <option>Last Month</option>
              </select>
              <button className="rounded-md bg-orange-500 px-4 py-2 text-white hover:bg-orange-600">
                New Ticket
              </button>
            </div>
          </div>
            <div className="border-b">
              <div className="flex">
                <button
                  onClick={() => setActiveTab("all")}
                  className={`flex items-center gap-2 px-4 py-2 ${
                    activeTab === "all" ? "border-b-2 border-orange-500 text-orange-500" : "text-gray-500"
                  }`}
                >
                  All Tickets
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-100">
                    {tickets.length}
                  </span>
                </button>
                <button
                  onClick={() => setActiveTab("new")}
                  className={`flex items-center gap-2 px-4 py-2 ${
                    activeTab === "new" ? "border-b-2 border-orange-500 text-orange-500" : "text-gray-500"
                  }`}
                >
                  New
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-100">
                    21
                  </span>
                </button>
                <button
                  onClick={() => setActiveTab("ongoing")}
                  className={`flex items-center gap-2 px-4 py-2 ${
                    activeTab === "ongoing" ? "border-b-2 border-orange-500 text-orange-500" : "text-gray-500"
                  }`}
                >
                  On-Going
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-100">
                    10
                  </span>
                </button>
                <button
                  onClick={() => setActiveTab("resolved")}
                  className={`flex items-center gap-2 px-4 py-2 ${
                    activeTab === "resolved" ? "border-b-2 border-orange-500 text-orange-500" : "text-gray-500"
                  }`}
                >
                  Resolved
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-100">
                    7
                  </span>
                </button>
              </div>
            </div>
            <div className="divide-y">
            {tickets.map((ticket) => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))}
            </div>
          </div>
          <div className="flex items-center justify-end gap-2">
            <button className="rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100">Previous</button>
            <button className="h-8 w-8 rounded-md bg-orange-500 text-white">1</button>
            <button className="h-8 w-8 rounded-md text-gray-500 hover:bg-gray-100">2</button>
            <button className="rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100">Next</button>
          </div>
        </main>
      
  )
}