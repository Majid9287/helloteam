"use client";

import { Bell, ChevronDown, LayoutDashboard, Menu, Search, Ticket, Users } from 'lucide-react';
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { useSelector } from 'react-redux';
import TicketCard from "@/components/cards/TicketCard";
import TicketPageSkeleton from "@/components/skeleton/Ticketpage";
import { TokenService } from '@/lib/tokenService';
export default function Component() {
  const token = TokenService.getAccessToken();
  const [activeTab, setActiveTab] = React.useState("all");
  const [tickets, setTickets] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [priority, setPriority] = React.useState("");
  const [timeFilter, setTimeFilter] = React.useState("");

  const user = useSelector((state) => state.auth.user);
  console.log("user redux",user);
  const organizationId = user?.organizationId;
console.log("organizationId by me",organizationId);
  React.useEffect(() => {
    if (organizationId) {
      fetchTickets();
    }
  }, [organizationId]);

  const fetchTickets = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://helloteam-backend.onrender.com/api/tickets/organization/${organizationId}`
      );
      const data = await response.json();
      console.log(data.data.tickets)
      if (data.status === "success") {
        setTickets(data.data.tickets);
      } else {
       // throw new Error("Failed to fetch tickets");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const isWithinTimeFilter = (date, filter) => {
    const ticketDate = new Date(date);
    const now = new Date();
    switch (filter) {
      case "This Week":
        return ticketDate >= new Date(now.setDate(now.getDate() - 7));
      case "Last Week":
        return (
          ticketDate >= new Date(now.setDate(now.getDate() - 14)) &&
          ticketDate < new Date(now.setDate(now.getDate() - 7))
        );
      case "This Month":
        return (
          ticketDate.getMonth() === now.getMonth() &&
          ticketDate.getFullYear() === now.getFullYear()
        );
      case "Last Month":
        const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        return (
          ticketDate >= lastMonth &&
          ticketDate < new Date(now.getFullYear(), now.getMonth(), 1)
        );
      default:
        return true;
    }
  };

  const filteredTickets = tickets.filter((ticket) => {
    return (
      (activeTab === "all" || ticket.status === activeTab) &&
      (searchTerm === "" ||
        ticket.tree_name.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (priority === "" || ticket.priority === priority) &&
      (timeFilter === "" || isWithinTimeFilter(ticket.createdAt, timeFilter))
    );
  });

  if (loading)
    return (
      <div>
        <TicketPageSkeleton />
      </div>
    );
  if (error) return <div>Error: {error}</div>;

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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-4">
            <select
              className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="">Select Priority</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <select
              className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
            >
              <option value="">All Time</option>
              <option value="This Week">This Week</option>
              <option value="Last Week">Last Week</option>
              <option value="This Month">This Month</option>
              <option value="Last Month">Last Month</option>
            </select>
            <button className="rounded-md bg-orange-500 px-4 py-2 text-white hover:bg-orange-600">
              New Ticket
            </button>
          </div>
        </div>
        <div className="border-b">
          <div className="flex">
            {["all", "new", "in_progress", "resolved"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center gap-2 px-4 py-2 ${
                  activeTab === tab
                    ? "border-b-2 border-orange-500 text-orange-500"
                    : "text-gray-500"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1).replace("_", " ")}
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-100">
                  {
                    tickets.filter(
                      (ticket) => tab === "all" || ticket.status === tab
                    ).length
                  }
                </span>
              </button>
            ))}
          </div>
        </div>
        <div className="divide-y">
          {filteredTickets.map((ticket, index) => (
            <TicketCard
              key={`${ticket._id}-${ticket.tree_id}-${index}`}
              ticket={ticket}
              organizationId={organizationId}
              token={token}
            />
          ))}
        </div>
      </div>
      {/* <div className="flex items-center justify-end gap-2">
        <button className="rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100">
          Previous
        </button>
        <button className="h-8 w-8 rounded-md bg-orange-500 text-white">
          1
        </button>
        <button className="h-8 w-8 rounded-md text-gray-500 hover:bg-gray-100">
          2
        </button>
        <button className="rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100">
          Next
        </button>
      </div> */}
    </main>
  );
}