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
import * as React from "react";
import UserCard from "@/components/cards/UserCard";
export default function Component() {
  const [activeTab, setActiveTab] = React.useState("agents");
  const [counts, setCounts] = React.useState({
    agents: 3,
    supervisors: 0,
    clients: 0,
  });
  const users = [
    {
      id: 1,
      name: "John snow",
      avatar: "/placeholder.svg?height=40&width=40",
      description: "Agent's profile description (Lorem Ipsum is a dummy text)",
      email: "Agent098@gmail.com",
      tickets: ["2023-CS123", "2023-CS123", "2023-CS123", "2023-CS123","2023-CS13","2023-CS12"],
      created: "06-09-2024",
    },
    {
      id: 2,
      name: "John snow",
      avatar: "/placeholder.svg?height=40&width=40",
      description: "Agent's profile description (Lorem Ipsum is a dummy text)",
      email: "Agent098@gmail.com",
      tickets: ["2023-CS123", "2023-CS123", "2023-CS123", "2023-CS123"],
      created: "06-09-2024",
    },
    {
      id: 3,
      name: "John snow",
      avatar: "/placeholder.svg?height=40&width=40",
      description: "Agent's profile description (Lorem Ipsum is a dummy text)",
      email: "Agent098@gmail.com",
      tickets: ["2023-CS123", "2023-CS123", "2023-CS123", "2023-CS123"],
      created: "06-09-2024",
    },
  ];

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-semibold">Users</h1>
      </div>

      <div className="rounded-lg border bg-white shadow-sm p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex w-full items-center gap-4 md:w-[300px]">
            <Search className="h-4 w-4 text-gray-400" />
            <input
              className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Search for User"
              type="search"
            />
          </div>
          <button className="rounded-md bg-orange-500 px-4 py-2 text-white hover:bg-orange-600">
            Create User
          </button>
        </div>
        <div className="p-0">
          <div className="border-b">
            <div className="flex">
              {["agents", "supervisors", "clients"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative rounded-none border-b-2 px-4 pb-3 pt-2 font-semibold flex items-center ${
                    activeTab === tab
                      ? "border-orange-500 text-orange-500"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  <span className="ml-2 flex items-center justify-center rounded-full bg-gray-200 px-2 py-1 text-xs font-medium text-gray-800">
                    {counts[tab]}
                  </span>
                </button>
              ))}
            </div>
          </div>
          <div className="p-0">
            {activeTab === "agents" && (
              <div className="divide-y">
                {users.map((user) => (
                  <UserCard key={user.id} user={user} />
                ))}
              </div>
            )}
            {activeTab === "supervisors" && (
              <div className="p-4 text-center text-sm text-gray-500">
                {counts.supervisors > 0
                  ? `${counts.supervisors} supervisors found`
                  : "No supervisors found"}
              </div>
            )}
            {activeTab === "clients" && (
              <div className="p-4 text-center text-sm text-gray-500">
                {counts.clients > 0
                  ? `${counts.clients} clients found`
                  : "No clients found"}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-end gap-2">
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
      </div>
    </main>
  );
}
